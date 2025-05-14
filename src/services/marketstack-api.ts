import axios from "axios";
import type { MarketstackResponse, StockData } from "@/types/marketstack";
import { StockResponseSchema } from "@/lib/schemas";

const API_KEY = import.meta.env.VITE_MARKETSTACK_API_KEY || '';
const BASE_URL = import.meta.env.VITE_MARKETSTACK_API_URL || '';
const API_TIMEOUT = 10000

const marketstackApi = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  params: {
    access_key: API_KEY,
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

marketstackApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return marketstackApi.request(error.config);
    }
    return Promise.reject(error);
  }
);

export interface EndOfDayParams {
  symbols: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
  sort?: "ASC" | "DESC";
}

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
