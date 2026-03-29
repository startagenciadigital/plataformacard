import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("DEBUG NEXT_PUBLIC_SUPABASE_URL:", url);
  console.log(
    "DEBUG NEXT_PUBLIC_SUPABASE_ANON_KEY exists:",
    !!anonKey
  );

  if (!url) {
    throw new Error("ENV ERROR: NEXT_PUBLIC_SUPABASE_URL está undefined na Vercel");
  }

  if (!anonKey) {
    throw new Error("ENV ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY está undefined na Vercel");
  }

  return createBrowserClient(url, anonKey);
}