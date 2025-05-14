import { useQuery } from "@tanstack/react-query";
import { getEndOfDayData, getIntradayData } from "@/services/marketstack-api";
import type {
  EndOfDayParams,
  IntradayParams,
} from "@/services/marketstack-api";

export function useEndOfDayData(params: EndOfDayParams) {
  return useQuery({
    queryKey: ["endOfDayData", params],
    queryFn: () => getEndOfDayData(params),
    enabled: !!params.symbols,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useIntradayData(params: IntradayParams) {
  return useQuery({
    queryKey: ["intradayData", params],
    queryFn: () => getIntradayData(params),
    enabled: !!params.symbols,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
