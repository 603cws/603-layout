import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwxzfwsoxwtzhjbzbdzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHpmd3NveHd0emhqYnpiZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODg5MDAsImV4cCI6MjA0NjM2NDkwMH0.-KI-PwdX57jsu7ONfgQXDBFPv3AY5uFdQZlHcHdUzDg';
export const supabase = createClient(supabaseUrl, supabaseKey);
