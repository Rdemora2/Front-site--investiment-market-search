import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatDateUTC(dateStr: string): string {
  const date = new Date(dateStr);
  return `${String(date.getUTCDate()).padStart(2, "0")}/${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}/${date.getUTCFullYear()}`;
}

export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
