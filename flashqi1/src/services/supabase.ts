import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Game room types
export interface GameRoom {
  id: string;
  code: string;
  host_id: string;
  status: 'waiting' | 'playing' | 'finished';
  max_players: number;
  created_at: string;
  updated_at: string;
}

export interface GamePlayer {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  email: string | null;
  is_host: boolean;
  is_ready: boolean;
  avatar_url: string | null;
  score: number;
  created_at: string;
  updated_at: string;
}

// Game room services
export const gameRoomService = {
  // Create a new game room
  async createRoom(hostId: string, maxPlayers: number = 2): Promise<GameRoom | null> {
    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data, error } = await supabase
      .from('game_rooms')
      .insert({
        code,
        host_id: hostId,
        status: 'waiting',
        max_players: maxPlayers
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating game room:', error);
      return null;
    }
    
    return data as GameRoom;
  },
  
  // Find a game room by code
  async findRoomByCode(code: string): Promise<GameRoom | null> {
    const { data, error } = await supabase
      .from('game_rooms')
      .select('*')
      .eq('code', code)
      .single();
    
    if (error) {
      console.error('Error finding game room:', error);
      return null;
    }
    
    return data as GameRoom;
  },
  
  // Join a game room
  async joinRoom(roomId: string, userId: string, username: string, email: string | null = null, avatarUrl: string | null = null): Promise<GamePlayer | null> {
    // Check if the room is full
    const { data: roomData, error: roomError } = await supabase
      .from('game_rooms')
      .select('*, game_players(*)')
      .eq('id', roomId)
      .single();
    
    if (roomError) {
      console.error('Error checking room capacity:', roomError);
      return null;
    }
    
    const room = roomData as GameRoom & { game_players: GamePlayer[] };
    if (room.game_players.length >= room.max_players) {
      console.error('Room is full');
      return null;
    }
    
    // Check if user is already in the room
    const existingPlayer = room.game_players.find(player => player.user_id === userId);
    if (existingPlayer) {
      return existingPlayer;
    }
    
    // Add player to the room
    const isHost = room.host_id === userId;
    const { data, error } = await supabase
      .from('game_players')
      .insert({
        room_id: roomId,
        user_id: userId,
        username,
        email,
        is_host: isHost,
        avatar_url: avatarUrl
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error joining game room:', error);
      return null;
    }
    
    return data as GamePlayer;
  },
  
  // Leave a game room
  async leaveRoom(roomId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('game_players')
      .delete()
      .eq('room_id', roomId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error leaving game room:', error);
      return false;
    }
    
    // Check if there are any players left in the room
    const { data, error: countError } = await supabase
      .from('game_players')
      .select('id')
      .eq('room_id', roomId);
    
    if (countError) {
      console.error('Error counting players:', countError);
      return true;
    }
    
    // If no players left, delete the room
    if (data.length === 0) {
      const { error: deleteError } = await supabase
        .from('game_rooms')
        .delete()
        .eq('id', roomId);
      
      if (deleteError) {
        console.error('Error deleting empty room:', deleteError);
      }
    }
    
    return true;
  },
  
  // Set player ready status
  async setPlayerReady(roomId: string, userId: string, isReady: boolean): Promise<boolean> {
    const { error } = await supabase
      .from('game_players')
      .update({ is_ready: isReady })
      .eq('room_id', roomId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error setting player ready status:', error);
      return false;
    }
    
    return true;
  },
  
  // Start the game
  async startGame(roomId: string): Promise<boolean> {
    const { error } = await supabase
      .from('game_rooms')
      .update({ status: 'playing' })
      .eq('id', roomId);
    
    if (error) {
      console.error('Error starting game:', error);
      return false;
    }
    
    return true;
  },
  
  // End the game
  async endGame(roomId: string): Promise<boolean> {
    const { error } = await supabase
      .from('game_rooms')
      .update({ status: 'finished' })
      .eq('id', roomId);
    
    if (error) {
      console.error('Error ending game:', error);
      return false;
    }
    
    return true;
  },
  
  // Subscribe to room updates
  subscribeToRoom(roomId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'game_rooms',
        filter: `id=eq.${roomId}`
      }, callback)
      .subscribe();
  },
  
  // Subscribe to player updates in a room
  subscribeToPlayers(roomId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`room-players:${roomId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'game_players',
        filter: `room_id=eq.${roomId}`
      }, callback)
      .subscribe();
  }
}; 