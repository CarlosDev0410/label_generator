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

const MIN_INSTALLMENT_VALUE = 4.99;
const MAX_INSTALLMENTS = 12;

/**
 * Calcula a quantidade de parcelas e o valor de cada parcela,
 * garantindo que o valor mínimo por parcela seja R$4,99.
 *
 * Regra: padrão é 12x. Se o preço não comportar 12 parcelas de R$4,99,
 * a quantidade é reduzida até encontrar um número que funcione.
 *
 * @param priceTo - Preço "POR" do produto (string BR ou número)
 * @returns { count: number; value: string } - Qtd de parcelas e valor formatado em PT-BR
 */
export function calculateInstallments(priceTo: string | number): { count: number; value: string } {
  const price = parseFormattedAmount(priceTo);

  if (price <= 0) {
    return { count: 1, value: formatCurrency(0) };
  }

  // Testa de 12x até 1x, retorna a primeira quantidade onde parcela >= R$4,99
  for (let n = MAX_INSTALLMENTS; n >= 1; n--) {
    const installmentValue = price / n;
    if (installmentValue >= MIN_INSTALLMENT_VALUE) {
      return { count: n, value: formatCurrency(installmentValue) };
    }
  }

  // Se nem 1x cabe (preço < R$4,99), retorna 1x com o valor total
  return { count: 1, value: formatCurrency(price) };
}
