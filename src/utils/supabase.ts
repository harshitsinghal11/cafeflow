// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js'

// 1. Validate variables immediately
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  // This error will show up in your Vercel logs clearly
  throw new Error(
    'CRITICAL ERROR: Supabase environment variables are missing. Please check your .env.local file.'
  )
}

// 2. Export the client with strict typing
export const supabase = createClient(supabaseUrl, supabaseKey)