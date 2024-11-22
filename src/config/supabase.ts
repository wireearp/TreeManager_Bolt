import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjY5NjAwMCwiZXhwIjoxOTMyMDU2MDAwfQ.1234567890';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Tree {
  id: number;
  created_at: string;
  location: [number, number];
  common_name: string;
  botanical_name: string;
  dbh: number;
  height: number;
  crown_spread: number;
  tag_number: string;
  condition: string;
  maintenance: string;
  photos: string[];
  documents: string[];
}