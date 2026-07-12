-- Create the quiz_responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  answers JSONB NOT NULL,
  personality_type VARCHAR(4) NOT NULL,
  scores JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for the quiz taker)
CREATE POLICY "Anyone can insert responses"
  ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read by ID (for the results page)
CREATE POLICY "Anyone can read responses"
  ON quiz_responses
  FOR SELECT
  USING (true);

-- Create an index on created_at for chronological queries
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at
  ON quiz_responses (created_at DESC);

-- Create an index on personality_type for aggregate queries
CREATE INDEX IF NOT EXISTS idx_quiz_responses_type
  ON quiz_responses (personality_type);
