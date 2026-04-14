-- Create invitations table
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  groom_name VARCHAR(255) NOT NULL,
  groom_father VARCHAR(255),
  groom_mother VARCHAR(255),
  groom_address TEXT,
  bride_name VARCHAR(255) NOT NULL,
  bride_father VARCHAR(255),
  bride_mother VARCHAR(255),
  bride_address TEXT,
  theme VARCHAR(50) DEFAULT 'general' CHECK (theme IN ('islamic', 'hindu', 'christian', 'general')),
  event1_name VARCHAR(255) NOT NULL,
  event1_date DATE NOT NULL,
  event1_time TIME NOT NULL,
  event1_location TEXT NOT NULL,
  event1_maps_url TEXT,
  event2_name VARCHAR(255),
  event2_date DATE,
  event2_time TIME,
  event2_location TEXT,
  event2_maps_url TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_invitations_updated_at 
    BEFORE UPDATE ON invitations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invitations"
    ON invitations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invitations"
    ON invitations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invitations"
    ON invitations FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invitations"
    ON invitations FOR DELETE
    USING (auth.uid() = user_id);

-- Public invitations are viewable by anyone
CREATE POLICY "Public invitations are viewable by anyone"
    ON invitations FOR SELECT
    USING (true);
