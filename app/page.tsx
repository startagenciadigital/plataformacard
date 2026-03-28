import { createClient } from "@/lib/supabase/client";

interface PageProps {
  params: { slug: string }
}

export default async function PublicCardPage({ params }: PageProps) {
  const { slug } = params

  const supabase = createClient()

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const { data, error } = await supabase
    .from('profiles')
    .select('id, slug, role, subscription_status')
    .eq('slug', slug)

  return (
    <pre style={{ padding: 24, whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(
        {
          slug,
          env: {
            url: envUrl,
            anonKey_prefix: envKey ? envKey.slice(0, 20) : null,
            anonKey_len: envKey ? envKey.length : 0,
          },
          supabase: {
            error,
            rows: data?.length ?? 0,
            data,
          },
        },
        null,
        2
      )}
    </pre>
  )
}