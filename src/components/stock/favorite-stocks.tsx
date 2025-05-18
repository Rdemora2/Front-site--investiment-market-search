import { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoriteStocks } from "@/hooks/use-favorite-stocks";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface FavoriteStocksProps {
  onSelectStock: (symbol: string) => void;
}

export function FavoriteStocks({ onSelectStock }: FavoriteStocksProps) {
  const { data: favorites, isLoading, toggleFavorite } = useFavoriteStocks();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!favorites?.length) {
    return (
      <div className="text-center py-8">
        <StarOff className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-sm text-muted-foreground">
          Você ainda não tem ações favoritas.
          <br />
          Adicione algumas para acompanhar aqui!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {favorites.map((stock) => (
        <div
          key={stock.symbol}
          className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
        >
          <button
            className="flex-1 text-left"
            onClick={() => onSelectStock(stock.symbol)}
          >
            <div className="font-medium">{stock.symbol}</div>
            <div className="text-sm text-muted-foreground">{stock.name}</div>
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(stock)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <Star className="h-4 w-4 fill-current" />
          </Button>
        </div>
      ))}
    </div>
  );
}