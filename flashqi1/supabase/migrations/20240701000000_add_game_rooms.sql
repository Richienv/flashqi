-- Create game_rooms table
CREATE TABLE IF NOT EXISTS public.game_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(6) NOT NULL UNIQUE,
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('waiting', 'playing', 'finished')),
  max_players INT NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create game_players table
CREATE TABLE IF NOT EXISTS public.game_players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES public.game_rooms(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL, -- This can be auth.users.id or a guest ID
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  is_host BOOLEAN NOT NULL DEFAULT FALSE,
  is_ready BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url TEXT,
  score INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Create RLS policies for game_rooms
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view game_rooms"
  ON public.game_rooms FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert game_rooms"
  ON public.game_rooms FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Host can update own game_rooms"
  ON public.game_rooms FOR UPDATE
  USING (auth.uid() = host_id);

CREATE POLICY "Host can delete own game_rooms"
  ON public.game_rooms FOR DELETE
  USING (auth.uid() = host_id);

-- Create RLS policies for game_players
ALTER TABLE public.game_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view game_players"
  ON public.game_players FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert game_players"
  ON public.game_players FOR INSERT
  USING (true);

CREATE POLICY "Players can update their own records"
  ON public.game_players FOR UPDATE
  USING (
    (auth.uid() = user_id) OR 
    (auth.uid() IN (
      SELECT host_id FROM public.game_rooms 
      WHERE id = room_id
    ))
  );

CREATE POLICY "Players can delete their own records"
  ON public.game_players FOR DELETE
  USING (
    (auth.uid() = user_id) OR 
    (auth.uid() IN (
      SELECT host_id FROM public.game_rooms 
      WHERE id = room_id
    ))
  );

-- Set up real-time subscriptions
ALTER TABLE public.game_rooms REPLICA IDENTITY FULL;
ALTER TABLE public.game_players REPLICA IDENTITY FULL;

-- Create triggers to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_game_rooms_updated_at
BEFORE UPDATE ON public.game_rooms
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_game_players_updated_at
BEFORE UPDATE ON public.game_players
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 