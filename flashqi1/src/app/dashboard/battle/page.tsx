'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useGameRoom } from '@/contexts/game-room-context';
import { useMediaQuery } from '@/hooks/use-media-query';

// Add some CSS for animations
const BattlePageStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse-slow {
      0% { opacity: 0.4; }
      50% { opacity: 0.7; }
      100% { opacity: 0.4; }
    }
    
    @keyframes rotate-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    
    .animate-rotate-slow {
      animation: rotate-slow 20s linear infinite;
    }
    
    .battle-card {
      backdrop-filter: blur(12px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    /* Realistic glass effect with proper glare */
    .battle-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.05) 45%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.05) 55%,
        transparent 70%
      );
      transform: rotate(45deg);
      pointer-events: none;
      z-index: 1;
    }
    
    /* Additional glare effect on top */
    .battle-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.07) 0%,
        rgba(255, 255, 255, 0.03) 40%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      pointer-events: none;
      z-index: 1;
    }
    
    .battle-card:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(138, 43, 226, 0.2);
    }
    
    .battle-button {
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.4),
        0 2px 4px rgba(0, 0, 0, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    .battle-button:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.5),
        0 2px 8px rgba(0, 0, 0, 0.4),
        inset 0 1px 1px rgba(255, 255, 255, 0.15);
    }
    
    .battle-button::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%
      );
      transform: skewX(-20deg);
      transition: 0.75s;
    }
    
    .battle-button:hover::after {
      left: 100%;
    }
    
    .bg-pattern {
      background-image: 
        radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.03) 2%, transparent 0%), 
        radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.03) 2%, transparent 0%);
      background-size: 100px 100px;
    }
    
    /* Text shadows for better readability */
    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
    }
    
    .text-shadow-sm {
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }
    
    /* Glow effect for text */
    .text-glow {
      text-shadow: 0 0 10px rgba(138, 43, 226, 0.7);
    }
    
    /* Gradient for texts */
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(to right, #bb86fc, #f5f5f5);
    }
    
    /* Improve focus states for accessibility */
    input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.4);
    }
  `}</style>
);

export default function BattlePage() {
  // Get game room context
  const { 
    createRoom, 
    joinRoom, 
    isCreatingRoom, 
    isJoiningRoom, 
    error: roomError, 
    currentRoom,
    isInRoom 
  } = useGameRoom();
  
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Local state
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [gameCode, setGameCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Set initial username from user data
  useEffect(() => {
    if (user?.user_metadata?.name) {
      setUsername(user.user_metadata.name);
    }
  }, [user]);
  
  // Redirect to game room if already in a room
  useEffect(() => {
    if (currentRoom && currentRoom.status === 'playing') {
      router.push(`/dashboard/battle/room?roomId=${currentRoom.id}`);
    }
  }, [currentRoom, router]);
  
  // Handle game creation
  const handleCreateGame = async () => {
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setError(null);
    const code = await createRoom(username);
    if (code) {
      setGeneratedCode(code);
      setIsCreatingGame(true);
      setIsJoiningGame(false);
    } else {
      setError(roomError || 'Failed to create game');
    }
  };
  
  // Handle joining a game
  const handleJoinGame = async () => {
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }
    
    setError(null);
    const success = await joinRoom(gameCode, username);
    if (success) {
      // Context will handle the redirect if game is started
      setIsJoiningGame(true);
      setIsCreatingGame(false);
    } else {
      setError(roomError || 'Failed to join game');
    }
  };
  
  // CSS for animations
  const floatAnimation = "animate-float";
  const pulseAnimation = "animate-pulse-slow";
  const rotateAnimation = "animate-rotate-slow";
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-8 text-gray-300">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl"></div>
      
      {/* Animated circles */}
      <div className={`absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-purple-600/10 ${floatAnimation}`}></div>
      <div className={`absolute -right-20 top-2/3 h-60 w-60 rounded-full bg-indigo-600/10 ${pulseAnimation}`}></div>
      <div className={`absolute bottom-1/4 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-purple-500/20 ${rotateAnimation}`}></div>
      
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 py-10">
        <h1 className="bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
          Hanzi Battle Arena
        </h1>
        
        <p className="max-w-2xl text-center text-gray-300">
          Challenge friends to a Chinese character battle! Create a room or join an existing match.
        </p>
        
        <div className="relative mt-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-xl backdrop-blur-sm">
          {/* Glare effect */}
          <div className="pointer-events-none absolute -top-1/2 left-0 right-0 h-80 bg-gradient-to-b from-purple-500/5 to-transparent opacity-30"></div>
          <div className="pointer-events-none absolute -right-1/2 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Creating a Game UI */}
            {isCreatingGame && (
              <div className="flex animate-fade-in flex-col items-center space-y-6">
                <h2 className="text-2xl font-semibold text-gray-200">Room Created!</h2>
                
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-gray-300">Share this code with your friend:</p>
                  <div className="flex items-center justify-center rounded-md bg-gray-800 px-4 py-3">
                    <span className="text-2xl font-bold tracking-wider text-purple-400">{generatedCode}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Waiting for players to join...</p>
                </div>
                
                {isInRoom && (
                  <button
                    onClick={() => router.push(`/dashboard/battle/room?roomId=${currentRoom?.id}`)}
                    className="w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-3 text-center text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-800 hover:shadow-purple-900/20"
                  >
                    Go to Battle Room
                  </button>
                )}
              </div>
            )}
            
            {/* Joining a Game UI */}
            {isJoiningGame && (
              <div className="flex animate-fade-in flex-col items-center space-y-6">
                <h2 className="text-2xl font-semibold text-gray-200">Joining Game...</h2>
                
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-gray-300">Game code: {gameCode}</p>
                  <p className="text-sm text-gray-400">Connecting to battle room...</p>
                </div>
                
                {isInRoom && (
                  <button
                    onClick={() => router.push(`/dashboard/battle/room?roomId=${currentRoom?.id}`)}
                    className="w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-3 text-center text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-800 hover:shadow-purple-900/20"
                  >
                    Go to Battle Room
                  </button>
                )}
              </div>
            )}
            
            {/* Initial UI - Create or Join */}
            {!isCreatingGame && !isJoiningGame && (
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <button
                      onClick={() => {
                        setIsCreatingGame(false);
                        setIsJoiningGame(false);
                      }}
                      className={`flex items-center justify-center space-x-2 rounded-md bg-gradient-to-r px-4 py-3 text-center text-white transition-all ${
                        !isCreatingGame && !isJoiningGame
                          ? 'from-purple-600 to-indigo-700 shadow-lg hover:shadow-purple-900/20'
                          : 'from-gray-700 to-gray-800'
                      }`}
                    >
                      <span>Create or Join a Battle</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <div className="mb-3 flex justify-between">
                        <label className="block text-sm font-medium text-gray-300">
                          Game Options
                        </label>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <button
                          onClick={handleCreateGame}
                          disabled={isCreatingRoom}
                          className="group flex items-center justify-center space-x-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-purple-700 px-4 py-3 text-white shadow-lg transition-all hover:from-fuchsia-700 hover:to-purple-800 hover:shadow-fuchsia-900/20 disabled:opacity-70"
                        >
                          {isCreatingRoom ? (
                            'Creating...'
                          ) : (
                            <>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                              <span>Create Game</span>
                            </>
                          )}
                        </button>
                        
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={gameCode}
                            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="Enter code"
                            maxLength={6}
                          />
                          <button
                            onClick={handleJoinGame}
                            disabled={isJoiningRoom}
                            className="flex-shrink-0 rounded-md bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-2 text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-800 hover:shadow-purple-900/20 disabled:opacity-70"
                          >
                            {isJoiningRoom ? 'Joining...' : 'Join'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Game Feature Highlights */}
                <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4">
                  <div className="mb-2 flex items-center">
                    <span className="mr-2 rounded-full bg-purple-700 px-2 py-0.5 text-xs font-medium text-white">
                      New Feature!
                    </span>
                    <h3 className="text-lg font-medium text-gray-200">Battle Mode</h3>
                  </div>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-400">
                    <li>Challenge friends to real-time character recognition battles</li>
                    <li>Track scores and compete for the highest accuracy</li>
                    <li>Practice writing and reading in a fun, competitive environment</li>
                  </ul>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-4 rounded-md bg-red-950/60 p-3 text-center text-red-200">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 