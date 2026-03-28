import { createClient } from "@/lib/supabase/server";

export async function getProductConversion(profileId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_product_conversion",
    { input_profile_id: profileId }
  );

  if (error) {
    console.error("Erro ao buscar conversão:", error);
    return [];
  }

  return data;
}