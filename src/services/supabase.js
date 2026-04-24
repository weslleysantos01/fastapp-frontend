import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glbjcaefrfnyyigyiokx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYmpjYWVmcmZueXlpZ3lpb2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjYzNzYsImV4cCI6MjA5MTE0MjM3Nn0.aCGeJEcB_-URLhuy9iD_Qz0IvyQ6_k-j_xUqiU4_jkw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);