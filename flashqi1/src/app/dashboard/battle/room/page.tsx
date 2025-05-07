'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useGameRoom } from '@/contexts/game-room-context';
import Link from 'next/link';

export default function GameRoomPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const router = useRouter();
  const { user } = useAuth();
  const { 
    currentRoom, 
    players, 
    isHost, 
    isInRoom, 
    leaveRoom, 
    setReady, 
    startGame,
    error: gameError 
  } = useGameRoom();
  
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Redirect if not in a room
  useEffect(() => {
    if (!isInRoom && !roomId) {
      router.push('/dashboard/battle');
    }
  }, [isInRoom, router, roomId]);
  
  // Handle ready status toggle
  const handleReadyToggle = async () => {
    const newReadyStatus = !isReady;
    setIsReady(newReadyStatus);
    await setReady(newReadyStatus);
  };
  
  // Handle game start
  const handleStartGame = async () => {
    if (!isHost) {
      setError('Only the host can start the game');
      return;
    }
    
    const allPlayersReady = players.every(player => player.is_ready || player.is_host);
    if (!allPlayersReady) {
      setError('Not all players are ready');
      return;
    }
    
    setError(null);
    const success = await startGame();
    if (!success) {
      setError(gameError || 'Failed to start the game');
    }
  };
  
  // Handle leaving the room
  const handleLeaveRoom = async () => {
    await leaveRoom();
    router.push('/dashboard/battle');
  };
  
  // Find current player
  const currentPlayer = players.find(player => 
    player.user_id === (user?.id || ''));
  
  // Check if all players are ready
  const allPlayersReady = players.every(player => 
    player.is_ready || player.is_host);
  
  if (!isInRoom && !currentRoom) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8 text-white">
        <div className="animate-pulse text-center">
          <h1 className="mb-4 text-2xl font-bold">Connecting to game room...</h1>
          <p className="text-gray-300">If you are not redirected, please return to the battle page.</p>
          <Link 
            href="/dashboard/battle" 
            className="mt-8 block rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Back to Battle
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-8 text-gray-200">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-900/20 blur-3xl"></div>
      
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Battle Room</h1>
            <p className="text-gray-400">
              Code: <span className="font-mono text-purple-400">{currentRoom?.code}</span>
            </p>
          </div>
          
          <button
            onClick={handleLeaveRoom}
            className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            Leave Room
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Player List */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Players</h2>
            
            <div className="space-y-3">
              {players.map(player => (
                <div 
                  key={player.id} 
                  className={`flex items-center justify-between rounded-lg bg-gray-800/80 p-3 ${
                    player.user_id === (user?.id || '') ? 'border-l-4 border-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {player.avatar_url ? (
                      <img 
                        src={player.avatar_url} 
                        alt={player.username} 
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-lg font-bold text-white">
                        {player.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div>
                      <p className="font-medium">{player.username}</p>
                      <p className="text-sm text-gray-400">{player.email || 'Guest'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {player.is_host && (
                      <span className="mr-2 rounded-md bg-amber-900/50 px-2 py-1 text-xs font-medium text-amber-300">
                        Host
                      </span>
                    )}
                    
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${
                      player.is_ready
                        ? 'bg-green-900/50 text-green-300'
                        : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {player.is_ready ? 'Ready' : 'Not Ready'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Game Controls */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Game Status</h2>
            
            <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-800/80 p-4">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-lg font-medium text-white">
                  {currentRoom?.status === 'waiting' 
                    ? 'Waiting for players' 
                    : currentRoom?.status === 'playing'
                      ? 'Game in progress'
                      : 'Game ended'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-white">Players</p>
                <p className="text-lg font-medium">{players.length} / {currentRoom?.max_players}</p>
              </div>
            </div>
            
            {currentRoom?.status === 'waiting' && (
              <div className="space-y-4">
                {!isHost ? (
                  <button
                    onClick={handleReadyToggle}
                    className={`w-full rounded-md py-3 px-4 font-medium transition-all ${
                      isReady || (currentPlayer?.is_ready ?? false)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {isReady || (currentPlayer?.is_ready ?? false) ? 'Ready!' : 'Mark as Ready'}
                  </button>
                ) : (
                  <button
                    onClick={handleStartGame}
                    disabled={!allPlayersReady || players.length < 2}
                    className={`w-full rounded-md bg-gradient-to-r py-3 px-4 font-medium transition-all ${
                      allPlayersReady && players.length >= 2
                        ? 'from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white'
                        : 'from-gray-700 to-gray-800 text-gray-300 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    Start Game
                  </button>
                )}
                
                {isHost && !allPlayersReady && (
                  <p className="text-sm text-amber-400">
                    Waiting for all players to be ready...
                  </p>
                )}
                
                {isHost && players.length < 2 && (
                  <p className="text-sm text-amber-400">
                    Waiting for more players to join...
                  </p>
                )}
              </div>
            )}
            
            {/* Game instructions */}
            <div className="mt-6 rounded-lg border border-gray-800 bg-gray-950/50 p-4">
              <h3 className="mb-2 font-medium text-gray-300">How to Play</h3>
              <ul className="ml-5 list-disc space-y-1 text-sm text-gray-400">
                <li>A Chinese character will appear on screen</li>
                <li>Type the correct pinyin and English translation</li>
                <li>First player to answer correctly gets a point</li>
                <li>First to 10 points wins the battle!</li>
              </ul>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 rounded-md bg-red-950/60 p-3 text-center text-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 