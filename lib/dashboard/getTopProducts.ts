import { createClient } from "@supabase/supabase-js";

type TopProduct = {
  productId: string;
  productName: string;
  clicks: number;
};

type TopProductRow = {
  product_id: string | null;
  product_name: string | null;
  clicks: number | string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getTopProducts(
  profileId: string,
  limit = 5
): Promise<TopProduct[]> {
  const { data, error } = await supabase.rpc("get_top_products", {
    p_profile_id: profileId,
    p_limit: limit,
  });

  if (error) {
    throw new Error(
      [
        "Erro ao executar RPC get_top_products:",
        `message=${error.message ?? "sem message"}`,
        `details=${error.details ?? "sem details"}`,
        `hint=${error.hint ?? "sem hint"}`,
        `code=${error.code ?? "sem code"}`,
      ].join(" | ")
    );
  }

  const rows = (data ?? []) as TopProductRow[];

  return rows.map((row) => ({
    productId: row.product_id ?? "",
    productName: row.product_name ?? "Produto sem nome",
    clicks: Number(row.clicks ?? 0),
  }));
}