"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlan() {
      const { data, error } = await supabase.rpc("get_current_user_plan");

      console.log("PLANO DO USUÁRIO:", data);
      console.log("ERRO DO PLANO:", error);
    }

    fetchPlan();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            PlataformaCard
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Área autenticada do cliente para gestão do perfil, catálogo e
            analytics.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">Perfil</p>
            <h2 className="mt-2 text-lg font-semibold text-neutral-900">
              Configurações do cartão
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Nome, bio, avatar, WhatsApp, slug e mensagem do botão.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">Catálogo</p>
            <h2 className="mt-2 text-lg font-semibold text-neutral-900">
              Gestão do catálogo
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Ativar ou desativar produtos e controlar o catálogo exibido.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">Analytics</p>
            <h2 className="mt-2 text-lg font-semibold text-neutral-900">
              Métricas comerciais
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Visitas, cliques, conversas iniciadas e desempenho dos produtos.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Próximos módulos
            </p>
            <h2 className="mt-2 text-lg font-semibold text-neutral-900">
              Evolução do SaaS
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Base pronta para recursos futuros com arquitetura multi-tenant.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}