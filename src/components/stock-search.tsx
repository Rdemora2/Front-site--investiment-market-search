import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEndOfDayData } from "@/hooks/use-marketstack-data";

interface StockSearchProps {
  selectedStock?: string;
}

const StockSearch = ({ selectedStock }: StockSearchProps) => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const formatDateUTC = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${String(date.getUTCDate()).padStart(2, "0")}/${String(
      date.getUTCMonth() + 1
    ).padStart(2, "0")}/${date.getUTCFullYear()}`;
  };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="symbol" className="text-sm font-medium">
                  Símbolo da Ação
                </label>
                <input
                  id="symbol"
                  type="text"
                  placeholder="Ex: AAPL, MSFT, GOOGL"
                  className="rounded-md border border-input bg-background px-3 py-2"
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
                  className="rounded-md border border-input bg-background px-3 py-2"
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
                  className="rounded-md border border-input bg-background px-3 py-2"
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
        <Card className="w-full bg-destructive/10">
          <CardContent className="pt-6">
            <p className="font-medium text-destructive">
              Erro ao buscar dados:{" "}
              {error instanceof Error ? error.message : "Erro desconhecido"}
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
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border px-4 py-2 text-left">Data</th>
                    <th className="border px-4 py-2 text-right">Abertura</th>
                    <th className="border px-4 py-2 text-right">Máxima</th>
                    <th className="border px-4 py-2 text-right">Mínima</th>
                    <th className="border px-4 py-2 text-right">Fechamento</th>
                    <th className="border px-4 py-2 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((stock) => (
                    <tr key={stock.date} className="hover:bg-muted/30">
                      {" "}
                      <td className="border px-4 py-2">
                        {formatDateUTC(stock.date)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {stock.open.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {stock.high.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {stock.low.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {stock.close.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {stock.volume.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Mostrando {data.pagination.count} de {data.pagination.total}{" "}
              registros
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default StockSearch;
