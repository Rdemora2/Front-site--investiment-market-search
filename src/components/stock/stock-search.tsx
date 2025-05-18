import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStockSearch } from "@/hooks/use-stock-search";
import { cn } from "@/lib/utils";

interface StockSearchProps {
  onSelectStock: (symbol: string) => void;
  selectedStock?: string;
}

export function StockSearch({ onSelectStock, selectedStock }: StockSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: stocks, isLoading } = useStockSearch(search);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedStock || "Selecione uma ação..."}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Busque por símbolo ou nome..."
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
                  >
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {stock.name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedStock && (
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">{selectedStock}</h3>
          {/* Add stock details here */}
        </div>
      )}
    </div>
  );
}