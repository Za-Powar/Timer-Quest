import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tspuhbpauftvxoqytezd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHVoYnBhdWZ0dnhvcXl0ZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjYzNDIsImV4cCI6MjA3ODcwMjM0Mn0.t2wNIZruPGeuILfeplVxtFc6tWmyTF1hL3LhpggWNGs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
