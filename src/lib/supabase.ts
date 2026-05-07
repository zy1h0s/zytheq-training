/*
 * Supabase Client Configuration
 * Server and client instances for database operations
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Environment variables - set these in Vercel dashboard
const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-key';

function getEnv(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

// Lazy client-side Supabase instance — initialized on first access so module
// import doesn't crash when env vars aren't present (e.g. during build).
let _supabase: SupabaseClient | null = null;
function getClient(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      getEnv('NEXT_PUBLIC_SUPABASE_URL', PLACEHOLDER_URL),
      getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', PLACEHOLDER_KEY),
    );
  }
  return _supabase;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return Reflect.get(getClient(), prop, getClient());
  },
});

// Server-side helper - creates client with service role for admin operations
export function createServerClient(): SupabaseClient {
  return createClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL', PLACEHOLDER_URL),
    getEnv('SUPABASE_SERVICE_ROLE_KEY', PLACEHOLDER_KEY),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
