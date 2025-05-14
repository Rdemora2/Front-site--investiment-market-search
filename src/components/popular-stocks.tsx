import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POPULAR_STOCK_SYMBOLS } from "@/constants/stocks";
import { Button } from "@/components/ui/button";

interface PopularStocksProps {
  onSelectStock: (symbol: string) => void;
}

const PopularStocks = ({ onSelectStock }: PopularStocksProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ações Populares</CardTitle>
        <CardDescription>
          Clique em uma ação para ver seus dados históricos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {POPULAR_STOCK_SYMBOLS.map((stock) => (
            <Button
              key={stock.symbol}
              variant="outline"
              className="justify-start h-auto py-3 px-4 flex flex-col items-start text-left"
              onClick={() => onSelectStock(stock.symbol)}
            >
              <span className="font-bold">{stock.symbol}</span>
              <span className="text-xs text-muted-foreground">
                {stock.name}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularStocks;
