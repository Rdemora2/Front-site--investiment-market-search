import { z } from "zod";

export const StockDataSchema = z.object({
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
  adj_high: z.number().nullable(),
  adj_low: z.number().nullable(),
  adj_close: z.number().nullable(),
  adj_open: z.number().nullable(),
  adj_volume: z.number().nullable(),
  split_factor: z.number().nullable(),
  dividend: z.number().nullable(),
  name: z.string().nullable(),
  exchange_code: z.string().nullable(),
  asset_type: z.string().nullable(),
  price_currency: z.string().nullable(),
  symbol: z.string(),
  exchange: z.string(),
  date: z.string(),
});

export const MarketstackResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    pagination: z.object({
      limit: z.number(),
      offset: z.number(),
      count: z.number(),
      total: z.number(),
    }),
    data: z.array(schema),
  });

export const StockResponseSchema = MarketstackResponseSchema(StockDataSchema);
