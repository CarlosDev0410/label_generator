import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const brFormat = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: string | number): string {
  if (value === undefined || value === null || value === "") return "0,00";

  const valueStr = String(value);

  // Se já tiver vírgula e ponto, assumimos formato BR (1.234,56)
  if (valueStr.includes(",") && valueStr.includes(".")) {
    const number = parseFloat(valueStr.replace(/\./g, "").replace(",", "."));
    return isNaN(number) ? "0,00" : brFormat.format(number);
  }

  // Se tiver vírgula mas não ponto (1234,56)
  if (valueStr.includes(",") && !valueStr.includes(".")) {
    const number = parseFloat(valueStr.replace(",", "."));
    return isNaN(number) ? "0,00" : brFormat.format(number);
  }

  // Fallback para número padrão (1234.56)
  const number = parseFloat(valueStr);
  if (isNaN(number)) return "0,00";

  return brFormat.format(number);
}
