import { useQuery } from '@tanstack/react-query';
import { getEndOfDayData, EndOfDayParams, getIntradayData, IntradayParams } from '@/services/marketstack-api';

// Hook para buscar dados EOD (End of Day)
export function useEndOfDayData(params: EndOfDayParams) {
  return useQuery({
    queryKey: ['endOfDayData', params],
    queryFn: () => getEndOfDayData(params),
    enabled: !!params.symbols, // Só executa se tiver símbolos
    staleTime: 5 * 60 * 1000, // 5 minutos de cache
    refetchOnWindowFocus: false,
  });
}

// Hook para buscar dados intraday
export function useIntradayData(params: IntradayParams) {
  return useQuery({
    queryKey: ['intradayData', params],
    queryFn: () => getIntradayData(params),
    enabled: !!params.symbols, // Só executa se tiver símbolos
    staleTime: 60 * 1000, // 1 minuto de cache para dados intraday
    refetchOnWindowFocus: false,
  });
}
