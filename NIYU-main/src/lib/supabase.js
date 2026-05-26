import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://txtpaipweweyshpglfca.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHBhaXB3ZXdleXNocGdsZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTgxMzIsImV4cCI6MjA5NTM3NDEzMn0.pCTA-s-Egjt4v4zTiLdLpJtDAGyOBQHVK2d6NeWPY_E'

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
