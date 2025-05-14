import { useState, Suspense, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { 
  LazyStockSearch as StockSearch, 
  LazyPopularStocks as PopularStocks,
  LoadingFallback 
} from "@/components/lazy";
import { Navbar } from "@/components/navbar";

function App() {
  const [selectedStock, setSelectedStock] = useState<string>("");
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme;
    
    document.documentElement.classList.add(theme);
  }, []);

  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol);

    const searchElement = document.getElementById("stock-search-form");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background transition-colors duration-500 ease-in-out">
        <Navbar />
        <div className="bg-primary dark:bg-primary/90 text-primary-foreground py-7 bg-gradient-to-b from-primary to-primary/95 dark:from-primary/90 dark:to-primary/80"><div className="container mx-auto max-w-7xl">
            <p className="text-lg md:text-xl font-light">Pesquise e analise dados históricos de ações utilizando a API Marketstack</p>
          </div>
        </div>
        <main className="container mx-auto py-8 space-y-10 max-w-7xl">
          <Suspense fallback={<LoadingFallback />}>
            <PopularStocks onSelectStock={handleSelectStock} />
          </Suspense>
          <div id="stock-search-form">
            <Suspense fallback={<LoadingFallback />}>
              <StockSearch selectedStock={selectedStock} />
            </Suspense>
          </div>
        </main>        <footer className="bg-muted py-6">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
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
