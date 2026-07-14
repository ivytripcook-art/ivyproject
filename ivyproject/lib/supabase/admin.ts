import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ATTENTION : ce client contourne RLS. À utiliser UNIQUEMENT côté serveur,
// dans les Route Handlers qui valident manuellement un token de partage ou
// de session d'écoute (l'invité n'a pas de compte Supabase Auth).
// Ne jamais importer ce fichier dans un composant client.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
