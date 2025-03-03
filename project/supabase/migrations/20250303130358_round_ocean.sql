/*
  # Create resources and articles tables

  1. New Tables
    - `resources`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `file_url` (text)
      - `file_type` (text)
      - `file_size` (number)
      - `downloads` (number)
      - `user_id` (uuid, foreign key)
    - `articles`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `category` (text)
      - `image_url` (text)
      - `published` (boolean)
      - `author_id` (uuid, foreign key)
    - `topics`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `color` (text)
      - `image_url` (text)
      - `article_count` (integer)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
*/

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  downloads INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT 'blue',
  image_url TEXT,
  article_count INTEGER DEFAULT 0
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER set_resources_updated_at
BEFORE UPDATE ON resources
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_topics_updated_at
BEFORE UPDATE ON topics
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Create policies for resources
-- Everyone can read published resources
CREATE POLICY "Anyone can read resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert resources
CREATE POLICY "Admins can insert resources"
  ON resources
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update resources
CREATE POLICY "Admins can update resources"
  ON resources
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete resources
CREATE POLICY "Admins can delete resources"
  ON resources
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policies for articles
-- Everyone can read published articles
CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (published = true);

-- Admins can read all articles
CREATE POLICY "Admins can read all articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can insert articles
CREATE POLICY "Admins can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update articles
CREATE POLICY "Admins can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete articles
CREATE POLICY "Admins can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create policies for topics
-- Everyone can read topics
CREATE POLICY "Anyone can read topics"
  ON topics
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert topics
CREATE POLICY "Admins can insert topics"
  ON topics
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update topics
CREATE POLICY "Admins can update topics"
  ON topics
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete topics
CREATE POLICY "Admins can delete topics"
  ON topics
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create storage buckets for resources and images
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('articles', 'articles', true);

-- Set up storage policies
-- Anyone can read from the resources bucket
CREATE POLICY "Anyone can read resources"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resources');

-- Only admins can upload to the resources bucket
CREATE POLICY "Admins can upload resources"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resources' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update resources
CREATE POLICY "Admins can update resources"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resources' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete resources
CREATE POLICY "Admins can delete resources"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resources' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Anyone can read from the articles bucket
CREATE POLICY "Anyone can read article images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'articles');

-- Only admins can upload to the articles bucket
CREATE POLICY "Admins can upload article images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can update article images
CREATE POLICY "Admins can update article images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete article images
CREATE POLICY "Admins can delete article images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'articles' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );