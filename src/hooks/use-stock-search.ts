import { useQuery } from "@tanstack/react-query";
import { marketstackApi } from "@/services/marketstack-api";

interface StockSearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ["stockSearch", query],
    queryFn: async () => {
      if (!query) return [];
      
      const response = await marketstackApi.get<{ data: StockSearchResult[] }>("/tickers", {
        params: {
          search: query,
          limit: 10,
        },
      });

      return response.data.data;
    },
    enabled: query.length > 1,
  });
}