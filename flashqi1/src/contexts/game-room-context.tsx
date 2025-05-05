'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { gameRoomService, GameRoom, GamePlayer, supabase } from '@/services/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Define the context interface
interface GameRoomContextType {
  // Room states
  currentRoom: GameRoom | null;
  players: GamePlayer[];
  isHost: boolean;
  isInRoom: boolean;
  
  // Loading states
  isLoading: boolean;
  isCreatingRoom: boolean;
  isJoiningRoom: boolean;
  
  // Error states
  error: string | null;
  
  // Room functions
  createRoom: (username: string) => Promise<string | null>;
  joinRoom: (code: string, username: string) => Promise<boolean>;
  leaveRoom: () => Promise<boolean>;
  setReady: (isReady: boolean) => Promise<boolean>;
  startGame: () => Promise<boolean>;
  endGame: () => Promise<boolean>;
}

// Create context
const GameRoomContext = createContext<GameRoomContextType | undefined>(undefined);

// Context provider props
interface GameRoomProviderProps {
  children: ReactNode;
}

// Provider component
export const GameRoomProvider = ({ children }: GameRoomProviderProps) => {
  const router = useRouter();
  const { user } = useAuth();
  
  // State management
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Subscription channels
  const [roomChannel, setRoomChannel] = useState<RealtimeChannel | null>(null);
  const [playersChannel, setPlayersChannel] = useState<RealtimeChannel | null>(null);
  
  // Computed properties
  const isInRoom = !!currentRoom;
  const isHost = !!currentRoom && !!user && currentRoom.host_id === user.id;
  
  // Cleanup subscriptions on unmount
  useEffect(() => {
    return () => {
      if (roomChannel) roomChannel.unsubscribe();
      if (playersChannel) playersChannel.unsubscribe();
    };
  }, [roomChannel, playersChannel]);
  
  // Subscribe to room and player changes
  useEffect(() => {
    if (!currentRoom) return;
    
    // Subscribe to room updates
    const room = gameRoomService.subscribeToRoom(
      currentRoom.id,
      (payload) => {
        if (payload.eventType === 'DELETE') {
          // Room was deleted
          setCurrentRoom(null);
          setPlayers([]);
          setError('The game room has been closed by the host.');
          return;
        }
        
        const updatedRoom = payload.new as GameRoom;
        setCurrentRoom(updatedRoom);
        
        // If game started, navigate to the game
        if (updatedRoom.status === 'playing') {
          router.push(`/dashboard/battle/room?roomId=${updatedRoom.id}`);
        }
      }
    );
    
    // Subscribe to player updates
    const roomPlayers = gameRoomService.subscribeToPlayers(
      currentRoom.id,
      async (payload) => {
        // Refresh the entire player list
        const { data, error: playersError } = await supabase
          .from('game_players')
          .select('*')
          .eq('room_id', currentRoom.id);
          
        if (playersError) {
          console.error('Error fetching players:', playersError);
          return;
        }
        
        setPlayers(data as GamePlayer[]);
      }
    );
    
    setRoomChannel(room);
    setPlayersChannel(roomPlayers);
    
    // Initial player list fetch
    const fetchPlayers = async () => {
      const { data, error: playersError } = await supabase
        .from('game_players')
        .select('*')
        .eq('room_id', currentRoom.id);
        
      if (playersError) {
        console.error('Error fetching players:', playersError);
        return;
      }
      
      setPlayers(data as GamePlayer[]);
    };
    
    fetchPlayers();
    
    return () => {
      room.unsubscribe();
      roomPlayers.unsubscribe();
    };
  }, [currentRoom, router]);
  
  // Create a new room
  const createRoom = async (username: string): Promise<string | null> => {
    if (!user) {
      setError('You must be logged in to create a game room.');
      return null;
    }
    
    setIsCreatingRoom(true);
    setError(null);
    
    try {
      // Create the room
      const room = await gameRoomService.createRoom(user.id);
      if (!room) {
        setError('Failed to create game room.');
        return null;
      }
      
      // Join the room as host
      const player = await gameRoomService.joinRoom(
        room.id, 
        user.id, 
        username, 
        user.email || null,
        user.user_metadata?.avatar_url || null
      );
      
      if (!player) {
        setError('Failed to join the game room.');
        return null;
      }
      
      setCurrentRoom(room);
      return room.code;
    } catch (error: any) {
      setError(error.message || 'An error occurred while creating the game room.');
      return null;
    } finally {
      setIsCreatingRoom(false);
    }
  };
  
  // Join an existing room
  const joinRoom = async (code: string, username: string): Promise<boolean> => {
    setIsJoiningRoom(true);
    setError(null);
    
    try {
      // Find the room
      const room = await gameRoomService.findRoomByCode(code);
      if (!room) {
        setError('Game room not found. Please check the code and try again.');
        return false;
      }
      
      if (room.status !== 'waiting') {
        setError('This game has already started or ended.');
        return false;
      }
      
      // Join the room
      const userId = user?.id || `guest-${Math.random().toString(36).substring(2, 15)}`;
      const player = await gameRoomService.joinRoom(
        room.id, 
        userId, 
        username, 
        user?.email || null,
        user?.user_metadata?.avatar_url || null
      );
      
      if (!player) {
        setError('Failed to join the game room. The room might be full.');
        return false;
      }
      
      setCurrentRoom(room);
      return true;
    } catch (error: any) {
      setError(error.message || 'An error occurred while joining the game room.');
      return false;
    } finally {
      setIsJoiningRoom(false);
    }
  };
  
  // Leave the current room
  const leaveRoom = async (): Promise<boolean> => {
    if (!currentRoom) return true;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userId = user?.id || `guest-${Math.random().toString(36).substring(2, 15)}`;
      const success = await gameRoomService.leaveRoom(currentRoom.id, userId);
      
      if (success) {
        setCurrentRoom(null);
        setPlayers([]);
      } else {
        setError('Failed to leave the game room.');
      }
      
      return success;
    } catch (error: any) {
      setError(error.message || 'An error occurred while leaving the game room.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set player ready status
  const setReady = async (isReady: boolean): Promise<boolean> => {
    if (!currentRoom) {
      setError('You are not in a game room.');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userId = user?.id || `guest-${Math.random().toString(36).substring(2, 15)}`;
      const success = await gameRoomService.setPlayerReady(currentRoom.id, userId, isReady);
      
      if (!success) {
        setError('Failed to update ready status.');
      }
      
      return success;
    } catch (error: any) {
      setError(error.message || 'An error occurred while updating ready status.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start the game
  const startGame = async (): Promise<boolean> => {
    if (!currentRoom) {
      setError('You are not in a game room.');
      return false;
    }
    
    if (!isHost) {
      setError('Only the host can start the game.');
      return false;
    }
    
    // Check if all players are ready
    const allReady = players.every(player => player.is_ready || player.is_host);
    if (!allReady) {
      setError('Not all players are ready.');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await gameRoomService.startGame(currentRoom.id);
      
      if (!success) {
        setError('Failed to start the game.');
      }
      
      return success;
    } catch (error: any) {
      setError(error.message || 'An error occurred while starting the game.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // End the game
  const endGame = async (): Promise<boolean> => {
    if (!currentRoom) {
      setError('You are not in a game room.');
      return false;
    }
    
    if (!isHost) {
      setError('Only the host can end the game.');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await gameRoomService.endGame(currentRoom.id);
      
      if (!success) {
        setError('Failed to end the game.');
      }
      
      return success;
    } catch (error: any) {
      setError(error.message || 'An error occurred while ending the game.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value: GameRoomContextType = {
    currentRoom,
    players,
    isHost,
    isInRoom,
    isLoading,
    isCreatingRoom,
    isJoiningRoom,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    setReady,
    startGame,
    endGame,
  };
  
  return (
    <GameRoomContext.Provider value={value}>
      {children}
    </GameRoomContext.Provider>
  );
};

// Custom hook to use the context
export const useGameRoom = () => {
  const context = useContext(GameRoomContext);
  if (context === undefined) {
    throw new Error('useGameRoom must be used within a GameRoomProvider');
  }
  return context;
}; 