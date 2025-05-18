import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface StockChartProps {
  symbol: string;
}

export function StockChart({ symbol }: StockChartProps) {
  if (!symbol) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted-foreground">
        Selecione uma ação para ver o gráfico
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}