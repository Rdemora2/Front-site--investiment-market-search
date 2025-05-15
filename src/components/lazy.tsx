import { lazy } from "react";

export const LoadingFallback = () => (
  <div className="flex h-full min-h-[200px] w-full items-center justify-center">
    <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
  </div>
);

export const lazyWithRetry = (componentImport: Promise<any>) =>
  lazy(async () => {
    const pageRetry = async (retries = 0): Promise<any> => {
      try {
        return await componentImport;
      } catch (err) {
        if (retries < 3) {
          const retrySecs = 2 ** retries;
          console.log(`Erro ao carregar componente. Tentando novamente em ${retrySecs}s...`);

          await new Promise((resolve) => setTimeout(resolve, retrySecs * 1000));
          return pageRetry(retries + 1);
        }

        throw err;
      }
    };

    return pageRetry();
  });

export const LazyStockSearch = lazyWithRetry(import("@/components/stock-search"));
export const LazyPopularStocks = lazyWithRetry(import("@/components/popular-stocks"));
