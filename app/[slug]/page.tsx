import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import ProfileViewTracker from "@/components/analytics/ProfileViewTracker";
import ProfileWhatsAppButton from "@/components/analytics/ProfileWhatsAppButton";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, slug, organization_id, full_name, bio, avatar_url, whatsapp")
    .eq("slug", slug)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <ProfileViewTracker profileId={profile.id} slug={slug} />

      <div className="w-full max-w-xl rounded-3xl border bg-white shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-neutral-900 to-neutral-700" />

        <div className="px-6 pb-10 -mt-12 text-center">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="mx-auto h-54 w-54 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="mx-auto flex h-54 w-54 items-center justify-center rounded-full border-4 border-white bg-neutral-200 text-sm text-neutral-500">
              Sem foto
            </div>
          )}

          <h1 className="mt-4 text-2xl font-bold text-neutral-900">
            {profile.full_name}
          </h1>

          {profile.bio && (
            <p className="mt-2 text-sm text-neutral-600">{profile.bio}</p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {profile.whatsapp && (
              <ProfileWhatsAppButton
                profileId={profile.id}
                slug={slug}
                whatsapp={profile.whatsapp}
              />
            )}

            <Link
              href={`/${slug}/catalogo`}
              className="rounded-xl bg-neutral-900 py-3 font-semibold text-white hover:bg-neutral-800"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}