import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txtpaipweweyshpglfca.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHBhaXB3ZXdleXNocGdsZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTgxMzIsImV4cCI6MjA5NTM3NDEzMn0.pCTA-s-Egjt4v4zTiLdLpJtDAGyOBQHVK2d6NeWPY_E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
