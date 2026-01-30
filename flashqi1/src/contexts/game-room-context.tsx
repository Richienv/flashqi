'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { gameRoomStorage, gamePlayerStorage, GameRoom, GamePlayer } from '@/lib/localStorage';

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
  refreshRoomData: () => Promise<void>;
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
  
  // Computed properties
  const isInRoom = !!currentRoom;
  const isHost = !!currentRoom && !!user && currentRoom.host_id === user.id;
  
  // Function to fetch players for the current room
  const fetchPlayers = useCallback(() => {
    if (!currentRoom) return;
    
    console.log('Fetching players for room:', currentRoom.id);
    try {
      const roomPlayers = gamePlayerStorage.getByRoomId(currentRoom.id);
      console.log('Fetched players:', roomPlayers);
      setPlayers(roomPlayers);
    } catch (err) {
      console.error('Error in fetchPlayers:', err);
    }
  }, [currentRoom]);
  
  // Function to manually refresh room data
  const refreshRoomData = useCallback(async () => {
    if (!currentRoom) return;
    
    console.log('Manually refreshing room data for room:', currentRoom.id);
    try {
      // Refresh room data
      const roomData = gameRoomStorage.getById(currentRoom.id);
      if (roomData) {
        setCurrentRoom(roomData);
      }
      
      // Refresh player data
      fetchPlayers();
    } catch (err) {
      console.error('Error in refreshRoomData:', err);
    }
  }, [currentRoom, fetchPlayers]);
  
  // Poll for updates every 3 seconds (simulating real-time)
  useEffect(() => {
    if (!currentRoom) return;
    
    console.log('Setting up polling for room:', currentRoom.id);
    
    const pollInterval = setInterval(() => {
      // Refresh room data
      const roomData = gameRoomStorage.getById(currentRoom.id);
      if (roomData) {
        if (roomData.status !== currentRoom.status) {
          console.log('Room status changed:', roomData.status);
          setCurrentRoom(roomData);
          
          // If game started, navigate to the game
          if (roomData.status === 'playing') {
            router.push(`/dashboard/battle/room?roomId=${roomData.id}`);
          }
        }
      } else {
        // Room was deleted
        setCurrentRoom(null);
        setPlayers([]);
        setError('The game room has been closed by the host.');
      }
      
      // Refresh player data
      fetchPlayers();
    }, 3000);
    
    return () => {
      console.log('Cleaning up room polling');
      clearInterval(pollInterval);
    };
  }, [currentRoom, router, fetchPlayers]);
  
  // Create a new room
  const createRoom = async (username: string): Promise<string | null> => {
    const userId = user?.id || `guest-${Math.random().toString(36).substring(2, 15)}`;
    
    setIsCreatingRoom(true);
    setError(null);
    
    try {
      // Create the room
      const room = gameRoomStorage.create(userId, 2);
      console.log('Room created:', room);
      
      // Join the room as host
      const player = gamePlayerStorage.join(
        room.id, 
        userId, 
        username, 
        user?.email || null,
        user?.user_metadata?.avatar_url || null,
        true // isHost
      );
      
      if (!player) {
        setError('Failed to join the game room.');
        gameRoomStorage.delete(room.id);
        return null;
      }
      
      setCurrentRoom(room);
      setPlayers([player]);
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
      const room = gameRoomStorage.getByCode(code);
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
      const player = gamePlayerStorage.join(
        room.id, 
        userId, 
        username, 
        user?.email || null,
        user?.user_metadata?.avatar_url || null,
        false // isHost
      );
      
      if (!player) {
        setError('Failed to join the game room. The room might be full.');
        return false;
      }
      
      setCurrentRoom(room);
      
      // Immediately fetch players after joining
      const roomPlayers = gamePlayerStorage.getByRoomId(room.id);
      setPlayers(roomPlayers);
      
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
      const success = gamePlayerStorage.leave(currentRoom.id, userId);
      
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
      const success = gamePlayerStorage.setReady(currentRoom.id, userId, isReady);
      
      if (success) {
        // Update local player state
        setPlayers(prev => prev.map(p => 
          p.user_id === userId ? { ...p, is_ready: isReady } : p
        ));
      } else {
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
      const updatedRoom = gameRoomStorage.update(currentRoom.id, { status: 'playing' });
      
      if (updatedRoom) {
        setCurrentRoom(updatedRoom);
        router.push(`/dashboard/battle/room?roomId=${updatedRoom.id}`);
        return true;
      } else {
        setError('Failed to start the game.');
        return false;
      }
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
      const updatedRoom = gameRoomStorage.update(currentRoom.id, { status: 'finished' });
      
      if (updatedRoom) {
        setCurrentRoom(updatedRoom);
        return true;
      } else {
        setError('Failed to end the game.');
        return false;
      }
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
    refreshRoomData,
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
