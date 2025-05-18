import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStockSearch } from "@/hooks/use-stock-search";
import { useFavoriteStocks } from "@/hooks/use-favorite-stocks";
import { formatDate } from "@/lib/utils";

interface StockSearchProps {
  onSelectStock: (symbol: string) => void;
  selectedStock?: string;
}

export function StockSearch({ onSelectStock, selectedStock }: StockSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: stocks, isLoading } = useStockSearch(search);
  const { toggleFavorite } = useFavoriteStocks();

  // Date range state
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const [startDate, setStartDate] = useState(formatDate(lastMonth));
  const [endDate, setEndDate] = useState(formatDate(today));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesquisar Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex-1 justify-between"
              >
                {selectedStock || "Pesquisar ação..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Digite o símbolo ou nome da ação..."
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandEmpty>Nenhuma ação encontrada.</CommandEmpty>
                <CommandGroup>
                  {stocks?.map((stock) => (
                    <CommandItem
                      key={stock.symbol}
                      value={stock.symbol}
                      onSelect={() => {
                        onSelectStock(stock.symbol);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          {stock.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(stock);
                        }}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium">
              Data Inicial
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium">
              Data Final
            </label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}