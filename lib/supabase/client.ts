import { createBrowserClient } from "@supabase/ssr";

// Client utilisé dans les Client Components ("use client").
// Respecte les policies RLS scopées à l'utilisateur connecté.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
