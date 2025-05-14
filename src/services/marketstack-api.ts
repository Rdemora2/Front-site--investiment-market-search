import axios from "axios";
import type { MarketstackResponse, StockData } from "@/types/marketstack";
import { StockResponseSchema } from "@/lib/schemas";

// Definindo a chave da API
const API_KEY = "48f0a76154c2af6b9195c4005ce5cc98";
const BASE_URL = "https://api.marketstack.com/v2";

// Criação da instância do Axios com configuração básica
const marketstackApi = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

// Interface para os parâmetros da requisição EOD
export interface EndOfDayParams {
  symbols: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
  sort?: "ASC" | "DESC";
}

// Interface para os parâmetros da requisição Intraday
export interface IntradayParams extends EndOfDayParams {
  interval?:
    | "1min"
    | "5min"
    | "10min"
    | "15min"
    | "30min"
    | "1hour"
    | "3hour"
    | "6hour"
    | "12hour"
    | "24hour";
}

// Função para buscar dados EOD (End of Day)
export const getEndOfDayData = async (
  params: EndOfDayParams
): Promise<MarketstackResponse<StockData>> => {
  try {
    const response = await marketstackApi.get<MarketstackResponse<StockData>>(
      "/eod",
      {
        params,
      }
    );

    // Validando a resposta com Zod
    const validatedData = StockResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro na API Marketstack:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};

// Função para buscar dados intraday
export const getIntradayData = async (
  params: IntradayParams
): Promise<MarketstackResponse<StockData>> => {
  try {
    const response = await marketstackApi.get<MarketstackResponse<StockData>>(
      "/intraday",
      {
        params,
      }
    );

    // Validando a resposta com Zod
    const validatedData = StockResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro na API Marketstack:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erro inesperado:", error);
    }
    throw error;
  }
};
