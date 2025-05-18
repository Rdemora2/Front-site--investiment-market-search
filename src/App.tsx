import { useState, Suspense, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import {
  LazyStockSearch as StockSearch,
  LazyPopularStocks as PopularStocks,
  LoadingFallback,
} from "@/components/lazy";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/contexts/auth-context";

function AppContent() {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const { user, loading } = useAuth();

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

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <AuthForm mode="login" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen transition-colors duration-500 ease-in-out">
      <Navbar />
      <div className="bg-primary dark:bg-primary/90 text-primary-foreground from-primary to-primary/95 dark:from-primary/90 dark:to-primary/80 bg-gradient-to-b py-7">
        <div className="container mx-auto max-w-7xl">
          <p className="!m-0 !mt-0 !mb-0 !p-4 text-lg font-light md:text-xl" style={{ margin: 0 }}>
            Pesquise e analise dados históricos de ações utilizando nosso Finmarket Explorer
          </p>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl space-y-10 py-8">
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
        <div className="text-muted-foreground container mx-auto text-center text-sm">
          <p>Dados fornecidos pela API Marketstack &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;