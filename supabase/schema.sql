-- Create the questionnaire_responses table
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  personal_info JSONB NOT NULL,
  answers JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from the client (for the quiz taker)
CREATE POLICY "Anyone can submit responses"
  ON questionnaire_responses
  FOR INSERT
  WITH CHECK (true);

-- Create an index on created_at for chronological queries
CREATE INDEX IF NOT EXISTS idx_responses_created_at
  ON questionnaire_responses (created_at DESC);
