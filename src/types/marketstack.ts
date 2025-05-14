export interface MarketstackResponse<T> {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: T[];
}

export interface StockData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high: number | null;
  adj_low: number | null;
  adj_close: number | null;
  adj_open: number | null;
  adj_volume: number | null;
  split_factor: number | null;
  dividend: number | null;
  name: string | null;
  exchange_code: string | null;
  asset_type: string | null;
  price_currency: string | null;
  symbol: string;
  exchange: string;
  date: string;
}
