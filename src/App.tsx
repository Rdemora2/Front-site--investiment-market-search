import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StockSearch from '@/components/stock-search'
import PopularStocks from '@/components/popular-stocks'

// Criando o cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function App() {
  const [selectedStock, setSelectedStock] = useState<string>('')
  
  // Função para selecionar ação das populares
  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol)
    
    // Rola a página para o componente de pesquisa
    const searchElement = document.getElementById('stock-search-form')
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Marketstack Explorer</h1>
            <p className="mt-2">Pesquise e analise dados históricos de ações</p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          <PopularStocks onSelectStock={handleSelectStock} />
            <div id="stock-search-form">
            <StockSearch selectedStock={selectedStock} />
          </div>
        </main>
        
        <footer className="bg-muted py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Dados fornecidos pela API Marketstack &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}

export default App
