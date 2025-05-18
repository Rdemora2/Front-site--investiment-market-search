import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

interface FavoriteStock {
  id: string;
  symbol: string;
  name: string;
  user_id: string;
}

export function useFavoriteStocks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["favoriteStocks", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorite_stocks")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      return data as FavoriteStock[];
    },
    enabled: !!user,
  });

  const toggleFavorite = async (stock: { symbol: string; name: string }) => {
    if (!user) return;

    const existing = data?.find((f) => f.symbol === stock.symbol);

    if (existing) {
      await supabase
        .from("favorite_stocks")
        .delete()
        .eq("id", existing.id);
    } else {
      await supabase.from("favorite_stocks").insert({
        user_id: user.id,
        symbol: stock.symbol,
        name: stock.name,
      });
    }

    queryClient.invalidateQueries({ queryKey: ["favoriteStocks", user.id] });
  };

  return {
    data,
    isLoading,
    toggleFavorite,
  };
}