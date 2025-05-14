import { useState, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { 
  LazyStockSearch as StockSearch, 
  LazyPopularStocks as PopularStocks,
  LoadingFallback 
} from "@/components/lazy";

function App() {
  const [selectedStock, setSelectedStock] = useState<string>("");

  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol);

    const searchElement = document.getElementById("stock-search-form");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Marketstack Explorer</h1>
            <p className="mt-2">Pesquise e analise dados históricos de ações</p>
          </div>
        </header>        <main className="container mx-auto px-4 py-8 space-y-8">
          <Suspense fallback={<LoadingFallback />}>
            <PopularStocks onSelectStock={handleSelectStock} />
          </Suspense>
          <div id="stock-search-form">
            <Suspense fallback={<LoadingFallback />}>
              <StockSearch selectedStock={selectedStock} />
            </Suspense>
          </div>
        </main>

        <footer className="bg-muted py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              Dados fornecidos pela API Marketstack &copy;{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
