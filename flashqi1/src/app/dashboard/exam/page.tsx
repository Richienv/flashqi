'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { LESSON_FLASHCARDS } from "@/data/flashcardData";
import { generateExamQuestions } from "@/utils/examUtils";
import './exam.css';

// Question types
type QuestionType = 'flashcard' | 'multiple-choice' | 'complete-sentence' | 'tone-selection' | 
                   'matching' | 'translation' | 'character-components';

interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  hanzi?: string;
  pinyin?: string;
  english?: string;
  context?: string;
  matchPairs?: { hanzi: string; pinyin: string }[];
}

// Add this interface for matching pairs
interface MatchingPair {
  hanzi: string;
  pinyin: string;
  matched?: boolean;
  selectedAnswer?: string;
}

// Add this helper function
const convertToNumberedTone = (pinyin: string): string => {
  const toneMarks = {
    'ā': 'a1', 'á': 'a2', 'ǎ': 'a3', 'à': 'a4',
    'ē': 'e1', 'é': 'e2', 'ě': 'e3', 'è': 'e4',
    'ī': 'i1', 'í': 'i2', 'ǐ': 'i3', 'ì': 'i4',
    'ō': 'o1', 'ó': 'o2', 'ǒ': 'o3', 'ò': 'o4',
    'ū': 'u1', 'ú': 'u2', 'ǔ': 'u3', 'ù': 'u4',
    'ǖ': 'ü1', 'ǘ': 'ü2', 'ǚ': 'ü3', 'ǜ': 'ü4',
  };

  return pinyin.split('').map(char => toneMarks[char as keyof typeof toneMarks] || char).join('');
};

// Add proper types for the state
interface ExamState {
  questions: ExamQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  userAnswers: (string | null)[];
  examCompleted: boolean;
  examStarted: boolean;
  score: number;
  showAnswer: boolean;
  timeRemaining: number;
  matchingPairs: MatchingPair[];
  selectedPair: {hanzi?: string; pinyin?: string};
}

export default function ExamPage() {
  const router = useRouter();
  
  // Group all state declarations together with proper types
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<{hanzi?: string; pinyin?: string}>({});

  // Add proper type for the current question
  const getCurrentQuestion = useCallback((): ExamQuestion | undefined => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  // Update isMatchingComplete with proper typing
  const isMatchingComplete = useCallback((): boolean => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion?.type === 'matching') {
      return matchingPairs.every(pair => pair.matched);
    }
    return !!selectedAnswer;
  }, [getCurrentQuestion, matchingPairs, selectedAnswer]);

  // Update checkAnswer with proper typing
  const checkAnswer = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    if (currentQuestion.type === 'matching') {
      const allMatched = matchingPairs.every(pair => pair.matched);
      if (!allMatched) return;
    }

    setShowAnswer(true);
    let isCorrect = false;

    if (currentQuestion.type === 'matching') {
      isCorrect = matchingPairs.every(pair => pair.selectedAnswer === pair.pinyin);
      setSelectedAnswer(JSON.stringify(matchingPairs.map(p => p.selectedAnswer)));
    } else {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    }

    if (isCorrect) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'fixed top-20 right-4 bg-green-100 border border-green-500 text-green-800 rounded-lg px-4 py-2 z-50 animate-fadeIn';
      messageDiv.textContent = 'Correct! ✓';
      document.body.appendChild(messageDiv);
      
      setTimeout(() => {
        messageDiv.remove();
      }, 2000);
    }
  }, [getCurrentQuestion, matchingPairs, selectedAnswer]);

  // Define handlers before useEffect
  const handleExamCompletion = useCallback(() => {
    // Save the last answer if not already saved
    const finalUserAnswers = [...userAnswers];
    finalUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(finalUserAnswers);
    
    // Calculate score
    const correctAnswers = finalUserAnswers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;
    
    setScore(correctAnswers);
    setExamCompleted(true);
  }, [currentQuestionIndex, questions, selectedAnswer, userAnswers]);

  // Timer effect
  useEffect(() => {
    if (!examStarted || examCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleExamCompletion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examCompleted, handleExamCompletion]);

  // Initialize exam questions
  useEffect(() => {
    const examQuestions = generateExamQuestions(30);
    setQuestions(examQuestions);
    setUserAnswers(new Array(examQuestions.length).fill(null));
  }, []);

  // Handle matching pairs initialization
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion?.type === 'matching' && currentQuestion.matchPairs) {
      setMatchingPairs(currentQuestion.matchPairs.map(pair => ({
        ...pair,
        matched: false,
        selectedAnswer: undefined
      })));
    }
  }, [currentQuestionIndex, questions]);

  // Handle matching pair selection
  useEffect(() => {
    if (selectedPair.hanzi && selectedPair.pinyin) {
      setMatchingPairs(prev => prev.map(pair => {
        if (pair.hanzi === selectedPair.hanzi) {
          return {
            ...pair,
            selectedAnswer: selectedPair.pinyin,
            matched: true
          };
        }
        return pair;
      }));
      setSelectedPair({});
    }
  }, [selectedPair]);

  const startExam = () => {
    setExamStarted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save the current answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    
    // Reset selected answer
    setSelectedAnswer(null);
    setShowAnswer(false);
    
    // Move to next question or complete exam
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleExamCompletion();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save the current answer
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newUserAnswers);
      
      // Go to previous question
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      setShowAnswer(false);
    }
  };

  const normalizePinyin = (pinyin: string) => {
    return pinyin.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };

  const restartExam = () => {
    // Generate new questions
    const newExamQuestions = generateExamQuestions(30);
    setQuestions(newExamQuestions);
    
    // Reset exam state
    setUserAnswers(new Array(newExamQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setExamCompleted(false);
    setShowAnswer(false);
    setTimeRemaining(30 * 60);
  };

  const renderFlashcardQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">{question.prompt}</h3>
        
        <div className="mb-6">
          <div className="text-6xl font-bold text-center">{question.hanzi}</div>
          {showAnswer && (
            <div className="mt-2 text-center text-gray-500">
              {question.pinyin}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`w-full border rounded-lg p-3 cursor-pointer transition-colors text-left
                ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'} 
                ${showAnswer && option === question.correctAnswer ? 'correct-answer' : ''}
                ${showAnswer && selectedAnswer === option && option !== question.correctAnswer ? 'incorrect-answer' : ''}
              `}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
              disabled={showAnswer}
              aria-pressed={selectedAnswer === option}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">
              {selectedAnswer === question.correctAnswer ? 
                '✓ Correct!' : 
                '✗ The correct answer is: ' + question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMultipleChoiceQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-4">{question.prompt}</h3>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedAnswer === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              } ${
                showAnswer && option === question.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : showAnswer && selectedAnswer === option && option !== question.correctAnswer
                  ? 'border-red-500 bg-red-50'
                  : ''
              }`}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border mr-3 ${
                  selectedAnswer === option 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : 'border-gray-300'
                } ${
                  showAnswer && option === question.correctAnswer
                    ? 'border-green-500 bg-green-500 text-white'
                    : ''
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium">Correct answer: {question.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCompleteSentenceQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="font-bold text-xl mb-4">{question.prompt}</h3>
        
        <div className="mb-4">
          <p className="text-gray-700">{question.context}</p>
        </div>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedAnswer === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              } ${
                showAnswer && option === question.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : showAnswer && selectedAnswer === option && option !== question.correctAnswer
                  ? 'border-red-500 bg-red-50'
                  : ''
              }`}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">{option}</div>
              </div>
            </div>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium">Correct answer: {question.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderToneSelectionQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">{question.prompt}</h3>
        
        <div className="mb-6">
          <div className="text-6xl font-bold text-center">{question.hanzi}</div>
          <div className="mt-2 text-center text-gray-500">
            (Select the correct tone)
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`w-full border rounded-lg p-3 text-center cursor-pointer transition-colors text-xl
                ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'} 
                ${showAnswer && option === question.correctAnswer ? 'correct-answer' : ''}
                ${showAnswer && selectedAnswer === option && option !== question.correctAnswer ? 'incorrect-answer' : ''}
              `}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">
              {selectedAnswer === question.correctAnswer ? 
                '✓ Correct!' : 
                `✗ The correct tone is: ${question.correctAnswer}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMatchingQuestion = (question: ExamQuestion) => {
    const handleMatch = (type: 'hanzi' | 'pinyin', value: string) => {
      if (showAnswer) return;

      if (type === 'hanzi') {
        setSelectedPair(prev => ({ ...prev, hanzi: value }));
      } else {
        setSelectedPair(prev => ({ ...prev, pinyin: value }));
      }
    };

    // Check if all pairs are matched
    const allMatched = matchingPairs.every(pair => pair.matched);

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-center">{question.prompt}</h3>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left column - Characters */}
            <div className="space-y-3">
              <div className="text-center mb-2 text-gray-500">Characters</div>
              {matchingPairs.map((pair, index) => (
                <button
                  key={`hanzi-${index}`}
                  type="button"
                  className={`w-full border rounded-lg p-3 text-center text-2xl transition-colors relative
                    ${selectedPair.hanzi === pair.hanzi ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}
                    ${pair.matched ? 'border-green-500 bg-green-50' : ''}
                    ${showAnswer && pair.selectedAnswer !== pair.pinyin ? 'border-red-500 bg-red-50' : ''}
                  `}
                  onClick={() => handleMatch('hanzi', pair.hanzi)}
                  disabled={pair.matched || showAnswer}
                >
                  {/* Add number indicator */}
                  <span className="absolute left-2 top-2 text-sm text-gray-500">
                    {index + 1}.
                  </span>
                  {pair.hanzi}
                </button>
              ))}
            </div>
            
            {/* Right column - Pinyin */}
            <div className="space-y-3">
              <div className="text-center mb-2 text-gray-500">Pronunciation</div>
              {question.options?.map((option, index) => {
                // Check if option is already matched
                const isMatched = matchingPairs.some(p => p.selectedAnswer === option);
                
                return (
                  <button
                    key={`pinyin-${index}`}
                    type="button"
                    className={`w-full border rounded-lg p-3 text-center transition-colors relative
                      ${selectedPair.pinyin === option ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'} 
                      ${matchingPairs.find(p => p.selectedAnswer === option && p.pinyin === option) ? 'border-green-500 bg-green-50' : ''}
                      ${matchingPairs.find(p => p.selectedAnswer === option && p.pinyin !== option) ? 'border-red-500 bg-red-50' : ''}
                      ${isMatched ? 'opacity-50' : ''}
                    `}
                    onClick={() => !showAnswer && handleMatch('pinyin', option)}
                    disabled={isMatched || showAnswer}
                  >
                    {/* Add letter indicator */}
                    <span className="absolute left-2 top-2 text-sm text-gray-500">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Show matching instructions */}
          <div className="mt-4 text-center text-gray-500">
            Click a character on the left, then click its matching pronunciation on the right
          </div>

          {/* Show current matches */}
          <div className="mt-4 space-y-2">
            {matchingPairs.map((pair, index) => (
              pair.selectedAnswer && (
                <div key={`match-${index}`} className="text-sm text-gray-600 text-center">
                  {`${index + 1}. ${pair.hanzi} → ${pair.selectedAnswer}`}
                </div>
              )
            ))}
          </div>
          
          {showAnswer && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-center">Correct Matches:</p>
              <div className="mt-2 space-y-2">
                {matchingPairs.map((pair, index) => (
                  <div key={`answer-${index}`} className="flex items-center justify-center gap-4">
                    <span className="font-medium">{`${index + 1}. ${pair.hanzi}`}</span>
                    <span className="text-gray-600">→</span>
                    <span className={`font-medium ${pair.selectedAnswer === pair.pinyin ? 'text-green-600' : 'text-red-600'}`}>
                      {pair.pinyin}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTranslationQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-center">{question.prompt}</h3>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xl text-center">{question.context}</p>
          {showAnswer && <p className="text-base text-gray-500 mt-2 text-center">{question.pinyin}</p>}
        </div>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`w-full border rounded-lg p-3 cursor-pointer transition-colors text-left
                ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'} 
                ${showAnswer && option === question.correctAnswer ? 'correct-answer' : ''}
                ${showAnswer && selectedAnswer === option && option !== question.correctAnswer ? 'incorrect-answer' : ''}
              `}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">
              {selectedAnswer === question.correctAnswer ? 
                '✓ Your translation is correct!' : 
                '✗ Correct translation: ' + question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCharacterComponentQuestion = (question: ExamQuestion) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">{question.prompt}</h3>
        
        <div className="mb-6">
          <div className="text-6xl font-bold text-center">{question.hanzi}</div>
          {showAnswer && (
            <div className="mt-2 text-center text-gray-500">
              {question.pinyin} - {question.english}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {question.options?.map((option, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 text-center cursor-pointer transition-colors
                ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'} 
                ${showAnswer && option === question.correctAnswer ? 'border-green-500 bg-green-50 !text-green-800' : ''}
                ${showAnswer && selectedAnswer === option && option !== question.correctAnswer ? 'border-red-500 bg-red-50 !text-red-800' : ''}
              `}
              onClick={() => !showAnswer && handleAnswerSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
        
        {showAnswer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium">
              {selectedAnswer === question.correctAnswer ? 
                '✓ Correct! This component is part of the character.' : 
                '✗ Incorrect. The correct component is: ' + question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderQuestion = () => {
    if (questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    switch (currentQuestion.type) {
      case 'flashcard':
        return renderFlashcardQuestion(currentQuestion);
      case 'multiple-choice':
        return renderMultipleChoiceQuestion(currentQuestion);
      case 'complete-sentence':
        return renderCompleteSentenceQuestion(currentQuestion);
      case 'tone-selection':
        return renderToneSelectionQuestion(currentQuestion);
      case 'matching':
        return renderMatchingQuestion(currentQuestion);
      case 'translation':
        return renderTranslationQuestion(currentQuestion);
      case 'character-components':
        return renderCharacterComponentQuestion(currentQuestion);
      default:
        return null;
    }
  };

  const renderExamResults = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-blue-600 text-2xl font-bold">{Math.round((score / questions.length) * 100)}%</span>
        </div>
        <h2 className="text-2xl font-bold">Exam Completed!</h2>
        <p className="text-gray-600">You scored {score} out of {questions.length}</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Performance Summary</h3>
          <p>Correct answers: {score}</p>
          <p>Incorrect answers: {questions.length - score}</p>
          <p>Time used: {formatTime(30*60 - timeRemaining)}</p>
        </div>
        
        <div className="space-y-2">
          <Button 
            variant="primary" 
            className="w-full"
            onClick={restartExam}
          >
            Start New Exam
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push('/dashboard/flashcards')}
          >
            Return to Flashcards
          </Button>
        </div>
      </div>
    </div>
  );

  const renderExamStartScreen = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Chinese Language Exam</h2>
        <p className="text-gray-600 mt-2">Test your knowledge with 30 random questions</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Exam Details</h3>
          <ul className="space-y-2">
            <li>• 30 questions covering all lessons</li>
            <li>• Question types include flashcards, multiple choice, completing sentences, and tone selection</li>
            <li>• Time limit: 30 minutes</li>
            <li>• You can review your answers before submitting</li>
          </ul>
        </div>
        
        <Button 
          variant="primary" 
          className="w-full"
          onClick={startExam}
        >
          Start Exam
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {!examStarted ? (
          renderExamStartScreen()
        ) : examCompleted ? (
          renderExamResults()
        ) : (
          <>
            {/* Exam Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
              <div>
                <h2 className="font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                <div className="text-sm text-gray-500">
                  {questions[currentQuestionIndex]?.type === 'flashcard' ? 'Flashcard Question' : 
                   questions[currentQuestionIndex]?.type === 'multiple-choice' ? 'Multiple Choice' :
                   questions[currentQuestionIndex]?.type === 'complete-sentence' ? 'Complete the Sentence' :
                   questions[currentQuestionIndex]?.type === 'tone-selection' ? 'Tone Selection' :
                   questions[currentQuestionIndex]?.type === 'matching' ? 'Matching' :
                   questions[currentQuestionIndex]?.type === 'translation' ? 'Translation' :
                   'Character Component'}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">Time Remaining</div>
                <div className={`text-sm ${timeRemaining < 300 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
            
            {/* Question Card */}
            <div className="mb-6">
              {renderQuestion()}
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="space-x-3">
                {!showAnswer ? (
                  <Button
                    variant="primary"
                    onClick={checkAnswer}
                    disabled={!isMatchingComplete()}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Exam'}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      
      <MobileNav />
    </div>
  );
} 