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
  const number = parseFormattedAmount(value);
  return brFormat.format(number);
}

export function parseFormattedAmount(value: string | number): number {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") return value;

  const valueStr = String(value).trim();

  // Caso 1: Formato BR completo (1.234,56)
  if (valueStr.includes(",") && valueStr.includes(".")) {
    return parseFloat(valueStr.replace(/\./g, "").replace(",", ".")) || 0;
  }

  // Caso 2: Apenas vírgula (1234,56)
  if (valueStr.includes(",")) {
    return parseFloat(valueStr.replace(",", ".")) || 0;
  }

  // Caso 3: Apenas ponto ou sem separador (1234.56 ou 1234)
  // Se houver apenas um ponto, tratamos como decimal (US format ou preguiça do usuário)
  // Se houver múltiplos pontos, tratamos como milhares (BR format incompleto, ex: 1.000)
  const dots = valueStr.split(".").length - 1;
  if (dots > 1) {
    return parseFloat(valueStr.replace(/\./g, "")) || 0;
  }

  return parseFloat(valueStr) || 0;
}
