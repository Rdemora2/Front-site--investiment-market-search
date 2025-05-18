import { useState } from "react";

interface Stock {
  symbol: string;
  name: string;
}

export function useFavoriteStocks() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Stock[]>([]);

  const toggleFavorite = async (stock: Stock) => {
    // Implementation will be added later
    console.log("Toggle favorite:", stock);
  };

  return {
    data,
    isLoading,
    toggleFavorite,
  };
}