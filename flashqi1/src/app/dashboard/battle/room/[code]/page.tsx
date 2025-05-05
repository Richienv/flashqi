'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { sampleFlashcards } from '@/utils/battleUtils';
import { use } from 'react';

interface PromptItem {
  hanzi: string;
  pinyin: string;
  english: string;
}

// Add type safety for route params
interface GameRoomParams {
  code: string;
}

export default function GameRoom({ params }: { params: GameRoomParams | Promise<GameRoomParams> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHost = searchParams.get('host') === 'true';
  const username = searchParams.get('username') || 'Player';
  // Fix for Next.js 15.2.1: Unwrap params Promise using React.use()
  const unwrappedParams = use(params as any) as GameRoomParams;
  const gameCode = unwrappedParams.code;

  // Game state
  const [gameStarted, setGameStarted] = useState(true);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState(true);
  const [opponentName, setOpponentName] = useState(isHost ? 'Challenger' : 'Host');
  const [readyToStart, setReadyToStart] = useState(true);
  const [roundNumber, setRoundNumber] = useState(1);
  const [score, setScore] = useState({ player: 0, opponent: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [submitReady, setSubmitReady] = useState(false);

  // Prompt state
  const [currentPrompt, setCurrentPrompt] = useState<PromptItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [playerFinished, setPlayerFinished] = useState(false);
  const [opponentFinished, setOpponentFinished] = useState(false);
  const [playerCorrect, setPlayerCorrect] = useState<boolean | null>(null);
  const [opponentCorrect, setOpponentCorrect] = useState<boolean | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  // Sample flashcards data - replaced with imported sample data
  const [flashcards, setFlashcards] = useState<PromptItem[]>(
    sampleFlashcards.map(card => ({
      hanzi: card.hanzi,
      pinyin: card.pinyin,
      english: card.english
    }))
  );

  // Initialize the canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match its display size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Set drawing style
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#000';
        
        setCtx(context);
      }
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && ctx) {
        const canvas = canvasRef.current;
        
        // Save current drawing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Update canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Restore drawing style
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000';
        
        // Restore drawing if dimensions match
        if (imageData.width === canvas.width && imageData.height === canvas.height) {
          ctx.putImageData(imageData, 0, 0);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ctx]);

  // Parse the lesson data and get random prompts (in a real app, this would come from your API)
  useEffect(() => {
    // In a real implementation, you'd load flashcards from your database
    // For now, we're using the sample data defined above
    
    // Select the first prompt
    if (flashcards.length > 0) {
      selectRandomPrompt();
    }
  }, []);

  // Skip the waiting effect since we're starting immediately
  useEffect(() => {
    if (isHost && waitingForOpponent) {
      // Skip waiting, game already started
      setOpponentJoined(true);
      setWaitingForOpponent(false);
      setOpponentName('Challenger');
      setReadyToStart(true);
    }
  }, [isHost, waitingForOpponent]);

  // Select a random prompt from the flashcards
  const selectRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentPrompt(flashcards[randomIndex]);
    setShowAnswer(false);
    setPlayerFinished(false);
    setOpponentFinished(false);
    setPlayerCorrect(null);
    setOpponentCorrect(null);
    setShowValidation(false);
    setSubmitReady(false);
    setHasDrawn(false);
    
    // Clear the canvas
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Drawing functions
  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!ctx || !canvasRef.current || playerFinished) return;
    
    setIsDrawing(true);
    setHasDrawn(true);
    
    let x, y;
    
    if ('touches' in e) {
      // Touch event on mobile
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event on desktop
      const rect = canvasRef.current.getBoundingClientRect();
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!isDrawing || !ctx || !canvasRef.current || playerFinished) return;
    
    let x, y;
    
    if ('touches' in e) {
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      const rect = canvasRef.current.getBoundingClientRect();
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!isDrawing || playerFinished) return;
    
    setIsDrawing(false);
    if (ctx) {
      ctx.closePath();
    }
    
    // Enable submit button if user has drawn something
    if (hasDrawn) {
      setSubmitReady(true);
    }
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current || playerFinished) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasDrawn(false);
    setSubmitReady(false);
  };

  // Handle finishing the drawing
  const handleFinish = () => {
    setPlayerFinished(true);
    
    // Simulate opponent finishing after a shorter random delay (0.5-2 seconds)
    const opponentDelay = Math.floor(Math.random() * 1500) + 500;
    setTimeout(() => {
      setOpponentFinished(true);
      // Show the validation screen more quickly (0.5 seconds)
      setTimeout(() => {
        setShowAnswer(true);
        setShowValidation(true);
      }, 500);
    }, opponentDelay);
  };

  // Handle validating answers
  const handleAnswerValidation = (isCorrect: boolean) => {
    // Prevent multiple clicks
    if (playerCorrect !== null) return;
    
    // Set immediate feedback
    setPlayerCorrect(isCorrect);
    
    // Simulate opponent validation (50% chance of getting it right)
    const isOpponentCorrect = Math.random() > 0.5;
    setOpponentCorrect(isOpponentCorrect);
    
    // Update scores immediately
    const newScore = { ...score };
    
    if (isCorrect) {
      newScore.player += 1;
    }
    
    if (isOpponentCorrect) {
      newScore.opponent += 1;
    }
    
    setScore(newScore);
    
    // Check for game over
    if (newScore.player >= 10) {
      setGameOver(true);
      setWinner(username);
    } else if (newScore.opponent >= 10) {
      setGameOver(true);
      setWinner(opponentName);
    } else {
      // Continue to next round after only 1 second (reduced from 2)
      setTimeout(() => {
        setRoundNumber(roundNumber + 1);
        selectRandomPrompt();
      }, 1000);
    }
  };

  // Auto-start the game when component loads
  useEffect(() => {
    // Small delay to ensure everything is loaded
    const startTimer = setTimeout(() => {
      if (!gameStarted) {
        handleStartGame();
      }
    }, 500);
    
    return () => clearTimeout(startTimer);
  }, []);

  // Start the game
  const handleStartGame = () => {
    setGameStarted(true);
    
    // Start first round
    startNewRound();
  };

  // Exit the game
  const handleExitGame = () => {
    router.push('/dashboard/battle');
  };

  // Add a dedicated useEffect for handling mobile orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      if (canvasRef.current && ctx) {
        const canvas = canvasRef.current;
        
        // Save current drawing if possible
        let imageData;
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {
          console.log('Could not save drawing state during orientation change');
        }
        
        // Update canvas size after a short delay to allow the resize to complete
        setTimeout(() => {
          if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Restore drawing style
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#000';
            
            // Try to restore the drawing
            if (imageData && 
                imageData.width <= canvas.width && 
                imageData.height <= canvas.height) {
              try {
                ctx.putImageData(imageData, 0, 0);
              } catch (e) {
                console.log('Could not restore drawing after orientation change');
              }
            }
          }
        }, 300);
      }
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [ctx]);

  // Start a new round
  const startNewRound = () => {
    setRoundNumber(1);
    
    // Reset game state for a new round
    setPlayerFinished(false);
    setOpponentFinished(false);
    setPlayerCorrect(null);
    setOpponentCorrect(null);
    setShowValidation(false);
    setSubmitReady(false);
    setHasDrawn(false);
    
    // Select a random prompt
    selectRandomPrompt();
    
    // Clear the canvas
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-2 md:p-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
      
      {gameOver ? (
        // Game over screen - updated to match the battle theme
        <div className="max-w-md mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700 relative z-10 animate-fadeIn">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20">
            {winner === username ? (
              <div className="animate-bounce-slow">
                <div className="text-6xl">🏆</div>
              </div>
            ) : (
              <div className="animate-shake">
                <div className="text-6xl">💥</div>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-4 text-center border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white">Game Over!</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              {winner === username ? (
                <div className="text-center bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-4 rounded-lg border border-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-2xl font-bold text-blue-300">Victory!</p>
                  <p className="text-blue-400 mt-2">Well played, champion!</p>
                </div>
              ) : (
                <div className="text-center bg-gradient-to-r from-red-900/50 to-red-800/50 p-4 rounded-lg border border-red-700 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <div className="text-6xl mb-4">😢</div>
                  <p className="text-2xl font-bold text-red-300">Defeat</p>
                  <p className="text-red-400 mt-2">Better luck next time!</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <h2 className="font-semibold text-gray-300 mb-3 text-center">Final Score</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center 
                                text-xl font-bold mx-auto mb-2 border-2 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-blue-300">{username}</p>
                  <p className="text-3xl font-bold text-blue-100">{score.player}</p>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-yellow-500 font-bold text-lg px-2">vs</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-red-600 text-white h-12 w-12 rounded-full flex items-center justify-center 
                                text-xl font-bold mx-auto mb-2 border-2 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    {opponentName.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-red-300">{opponentName}</p>
                  <p className="text-3xl font-bold text-red-100">{score.opponent}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setGameOver(false);
                  setScore({ player: 0, opponent: 0 });
                  setRoundNumber(1);
                  selectRandomPrompt();
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all hover:scale-105 shadow-lg border border-indigo-400"
              >
                Play Again
              </button>
              
              <button
                onClick={handleExitGame}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-3 px-4 rounded-lg transition-all hover:scale-105 shadow-lg border border-gray-600"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Game interface - Revamped for a battle-like experience
        <div className="max-w-lg mx-auto relative z-10">
          {/* Battle Arena Header */}
          <div className="flex justify-between items-center mb-3 relative">
            {/* Energy/Health Bars */}
            <div className="w-full h-20 flex items-center justify-between">
              {/* Your Energy Bar */}
              <div className="w-2/5 relative">
                <div className="h-6 bg-gray-800/80 rounded-full overflow-hidden border-2 border-blue-900 shadow-lg">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500"
                    style={{ width: `${(score.player / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute -bottom-6 left-2 flex items-center">
                  <div className="bg-blue-600 text-white h-10 w-10 rounded-full flex items-center justify-center 
                               text-xl font-bold border-2 border-blue-300 shadow-md">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-1">
                    <p className="text-xs text-blue-200">You</p>
                    <p className="text-md font-bold text-blue-100">{score.player}/10</p>
                  </div>
                </div>
              </div>
              
              {/* Center Round Indicator */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="bg-yellow-500 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full 
                             border-2 border-yellow-300 shadow-md animate-pulse-slow">
                  Round {roundNumber}
                </div>
                <div className="text-white text-xs mt-1">First to 10 wins!</div>
              </div>
              
              {/* Opponent Energy Bar */}
              <div className="w-2/5 relative">
                <div className="h-6 bg-gray-800/80 rounded-full overflow-hidden border-2 border-red-900 shadow-lg">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-500"
                    style={{ width: `${(score.opponent / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute -bottom-6 right-2 flex items-center">
                  <div className="mr-1 text-right">
                    <p className="text-xs text-red-200">Opponent</p>
                    <p className="text-md font-bold text-red-100">{score.opponent}/10</p>
                  </div>
                  <div className="bg-red-600 text-white h-10 w-10 rounded-full flex items-center justify-center 
                               text-xl font-bold border-2 border-red-300 shadow-md">
                    {opponentName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Battle Arena */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700 
                       transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            {/* Battle Banner */}
            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-center p-3 border-b border-gray-700">
                <h2 className="text-gray-300 text-sm">Draw this word:</h2>
                <div className="mt-1">
                  {/* Only show pinyin during gameplay, not hanzi */}
                  <p className="text-2xl font-bold text-white animate-glow">{currentPrompt?.pinyin}</p>
                  {showAnswer && (
                    <p className="text-sm text-gray-300 italic">"{currentPrompt?.english}"</p>
                  )}
                </div>
              </div>
              
              {/* Floating decoration elements */}
              <div className="absolute -top-2 left-2 text-yellow-500 text-lg animate-float-slow">✨</div>
              <div className="absolute -top-1 right-2 text-purple-500 text-lg animate-float-medium">✨</div>
            </div>

            {/* Battle Status */}
            <div className="flex justify-between px-2 py-1 bg-gray-900/80">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                playerFinished ? 'bg-blue-900 text-blue-200' : 'bg-blue-700 text-blue-100 animate-pulse'
              } flex items-center`}>
                {playerFinished ? (
                  <>
                    <span className="mr-1">✓</span> Finished
                  </>
                ) : (
                  <>
                    <span className="animate-ping mr-1">●</span> Your Turn
                  </>
                )}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                opponentFinished ? 'bg-red-900 text-red-200' : 'bg-red-700 text-red-100 animate-pulse'
              } flex items-center`}>
                {opponentFinished ? (
                  <>
                    <span className="mr-1">✓</span> Finished
                  </>
                ) : (
                  <>
                    <span className="animate-ping mr-1">●</span> Drawing
                  </>
                )}
              </div>
            </div>

            {/* Drawing Canvas - Taking most of the screen space on mobile */}
            <div className="relative border-2 border-gray-700 h-96 sm:h-[28rem] md:h-[32rem] touch-none">
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full bg-white touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={endDrawing}
                style={{ touchAction: 'none' }}
              />
              
              {playerFinished && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-lg text-center shadow-lg animate-fadeIn">
                    <div className="text-2xl mb-1">🔒</div>
                    <p className="font-bold text-gray-900">Answer Locked!</p>
                    {opponentFinished ? (
                      <p className="text-sm text-gray-600">Waiting for results...</p>
                    ) : (
                      <p className="text-sm text-gray-600">Waiting for opponent...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center p-3 bg-gray-900">
              <button
                onClick={clearCanvas}
                disabled={playerFinished}
                className={`px-5 py-2 rounded-lg text-sm font-bold ${playerFinished 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-700 text-white hover:bg-red-600 active:bg-red-800 hover:scale-105'} touch-manipulation
                    shadow-md flex items-center justify-center transition-all`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
              
              <button
                onClick={handleFinish}
                disabled={playerFinished || !submitReady}
                className={`px-6 py-2 rounded-lg text-sm font-bold ${playerFinished || !submitReady
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-500 active:bg-green-700 hover:scale-105'} touch-manipulation
                    shadow-md flex items-center justify-center transition-all ${submitReady && !playerFinished ? 'animate-pulse-slow' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Finish
              </button>
            </div>
          </div>

          {/* Exit Button */}
          <div className="text-center mt-2">
            <button
              onClick={handleExitGame}
              className="text-white/70 hover:text-white text-sm hover:underline transition-all"
            >
              Exit Game
            </button>
          </div>

          {/* Validation overlay */}
          {showValidation && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 touch-none">
              <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-4 md:p-6 max-w-md w-full shadow-2xl border border-gray-300 animate-scaleIn">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">✨</div>
                  <h2 className="text-xl font-bold mb-2 text-indigo-900">Character Revealed!</h2>
                  <p className="text-gray-600 text-sm mb-4">Was your drawing correct?</p>
                  
                  {/* Now we show both pinyin and hanzi */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 shadow-inner border border-indigo-100">
                    <p className="text-6xl font-bold mb-2 text-indigo-800">{currentPrompt?.hanzi}</p>
                    <p className="text-xl text-indigo-600">{currentPrompt?.pinyin}</p>
                    <p className="text-sm text-indigo-500 italic mt-1">"{currentPrompt?.english}"</p>
                  </div>

                  {/* Feedback message */}
                  {playerCorrect !== null && (
                    <div className={`mb-3 py-2 rounded-lg font-bold text-center ${
                      playerCorrect 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                      {playerCorrect 
                        ? 'Correct! +1 point' 
                        : 'Incorrect! No points'
                      }
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswerValidation(false)}
                    disabled={playerCorrect !== null}
                    className={`flex-1 relative bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all touch-manipulation flex items-center justify-center ${
                      playerCorrect === null ? 'hover:scale-105 shadow-lg' : 'opacity-80 cursor-not-allowed'
                    } ${playerCorrect === false ? 'ring-4 ring-red-400' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Incorrect
                    {playerCorrect === false && (
                      <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleAnswerValidation(true)}
                    disabled={playerCorrect !== null}
                    className={`flex-1 relative bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all touch-manipulation flex items-center justify-center ${
                      playerCorrect === null ? 'hover:scale-105 shadow-lg' : 'opacity-80 cursor-not-allowed'
                    } ${playerCorrect === true ? 'ring-4 ring-green-400' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Correct
                    {playerCorrect === true && (
                      <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    )}
                  </button>
                </div>
                
                {/* Next round countdown timer */}
                {playerCorrect !== null && !gameOver && (
                  <div className="mt-4 text-center text-sm text-gray-600 italic">
                    Next round starting...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 