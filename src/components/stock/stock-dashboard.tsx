import { useState } from "react";
import { StockSearch } from "@/components/stock/stock-search";
import { FavoriteStocks } from "@/components/stock/favorite-stocks";
import { StockChart } from "@/components/stock/stock-chart";
import { StockNews } from "@/components/stock/stock-news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StockDashboard() {
  const [selectedStock, setSelectedStock] = useState<string>("");

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitore suas ações favoritas e explore novas oportunidades de investimento
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stock Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Mercado</CardTitle>
            </CardHeader>
            <CardContent>
              <StockChart symbol={selectedStock} />
            </CardContent>
          </Card>

          {/* Stock Search and Details */}
          <Card>
            <CardHeader>
              <CardTitle>Pesquisa de Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <StockSearch onSelectStock={setSelectedStock} selectedStock={selectedStock} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Favorite Stocks */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Favoritas</CardTitle>
            </CardHeader>
            <CardContent>
              <FavoriteStocks onSelectStock={setSelectedStock} />
            </CardContent>
          </Card>

          {/* Market News */}
          <Card>
            <CardHeader>
              <CardTitle>Notícias do Mercado</CardTitle>
            </CardHeader>
            <CardContent>
              <StockNews symbol={selectedStock} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}