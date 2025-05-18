import React from 'react'

interface StockNewsProps {
  symbol: string;
}

export function StockNews({ symbol }: StockNewsProps) {
  return (
    <div className="space-y-4">
      {symbol ? (
        <p className="text-sm text-muted-foreground">
          Carregando notícias para {symbol}...
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Selecione uma ação para ver as notícias relacionadas
        </p>
      )}
    </div>
  )
}