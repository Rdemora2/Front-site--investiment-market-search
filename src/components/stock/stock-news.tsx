import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface StockNewsProps {
  symbol: string;
}

export function StockNews({ symbol }: StockNewsProps) {
  if (!symbol) {
    return (
      <div className="text-center text-muted-foreground">
        Selecione uma ação para ver as notícias
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner />
    </div>
  );
}