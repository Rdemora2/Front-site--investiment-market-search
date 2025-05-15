import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEndOfDayData } from "@/hooks/use-marketstack-data";
import { formatDate, formatDateUTC, formatNumber } from "@/lib/utils";

interface StockSearchProps {
  selectedStock?: string;
}

const StockSearch = ({ selectedStock }: StockSearchProps) => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const [symbol, setSymbol] = useState<string>(selectedStock || "");
  const [dateFrom, setDateFrom] = useState<string>(formatDate(lastWeek));
  const [dateTo, setDateTo] = useState<string>(formatDate(today));
  const [searchParams, setSearchParams] = useState<{
    symbols: string;
    date_from?: string;
    date_to?: string;
  } | null>(
    selectedStock
      ? {
          symbols: selectedStock,
          date_from: formatDate(lastWeek),
          date_to: formatDate(today),
        }
      : null
  );

  useEffect(() => {
    if (selectedStock) {
      setSymbol(selectedStock);
      setSearchParams({
        symbols: selectedStock,
        date_from: dateFrom,
        date_to: dateTo,
      });
    }
  }, [selectedStock, dateFrom, dateTo]);

  const { data, isLoading, isError, error } = useEndOfDayData({
    symbols: searchParams?.symbols || "",
    date_from: searchParams?.date_from,
    date_to: searchParams?.date_to,
    sort: "DESC",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol.trim()) {
      setSearchParams({
        symbols: symbol.trim().toUpperCase(),
        date_from: dateFrom,
        date_to: dateTo,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pesquisa de Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col space-y-2">
                <label htmlFor="symbol" className="text-sm font-medium">
                  Símbolo da Ação
                </label>
                <input
                  id="symbol"
                  type="text"
                  placeholder="Ex: AAPL, MSFT, GOOGL"
                  className="border-input bg-background rounded-md border px-3 py-2"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="dateFrom" className="text-sm font-medium">
                  Data Inicial
                </label>
                <input
                  id="dateFrom"
                  type="date"
                  className="border-input bg-background rounded-md border px-3 py-2"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="dateTo" className="text-sm font-medium">
                  Data Final
                </label>
                <input
                  id="dateTo"
                  type="date"
                  className="border-input bg-background rounded-md border px-3 py-2"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Pesquisar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isError && (
        <Card className="bg-destructive/10 w-full">
          <CardContent className="pt-6">
            <p className="text-destructive font-medium">
              Erro ao buscar dados: {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Dados de {searchParams?.symbols} ({data.data.length} resultados)
            </CardTitle>
          </CardHeader>{" "}
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="px-4 py-2 text-left">Data</TableHead>
                    <TableHead className="px-4 py-2 text-right">Abertura</TableHead>
                    <TableHead className="px-4 py-2 text-right">Máxima</TableHead>
                    <TableHead className="px-4 py-2 text-right">Mínima</TableHead>
                    <TableHead className="px-4 py-2 text-right">Fechamento</TableHead>
                    <TableHead className="px-4 py-2 text-right">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((stock) => (
                    <TableRow key={stock.date}>
                      <TableCell className="px-4 py-2">{formatDateUTC(stock.date)}</TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        {stock.open.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        {stock.high.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">{stock.low.toFixed(2)}</TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        {stock.close.toFixed(2)}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        {formatNumber(stock.volume)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">
              Mostrando {data.pagination.count} de {data.pagination.total} registros
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default StockSearch;
