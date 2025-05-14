import { lazy } from 'react';

export const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
          
          await new Promise(resolve => setTimeout(resolve, retrySecs * 1000));
          return pageRetry(retries + 1);
        }
        
        throw err;
      }
    };
    
    return pageRetry();
  });

export const LazyStockSearch = lazyWithRetry(import('@/components/stock-search'));
export const LazyPopularStocks = lazyWithRetry(import('@/components/popular-stocks'));
