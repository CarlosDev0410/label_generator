import axios from 'axios';
import { config } from '../config';

export interface WakeProductResponse {
    sku: string;
    nome: string;
    precoDe: number;
    precoPor: number;
    ean: string;
    urlProduto: string;
    parcela: number;
    vezes: number;
}

export class WakeService {
    private static readonly BASE_URL = 'https://api.fbits.net';

    static async getProductBySku(sku: string): Promise<WakeProductResponse> {
        if (!config.wakeToken) {
            throw new Error('Configuração do servidor incompleta (WAKE_TOKEN ausente).');
        }

        try {
            // Rota conforme OpenAPI com campos adicionais para tabela de preço
            const response = await axios.get(`${this.BASE_URL}/produtos/${sku}?tipoIdentificador=Sku&camposAdicionais=TabelaPreco`, {
                headers: {
                    'Authorization': `Basic ${config.wakeToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`[WakeAPI] Resposta para SKU ${sku}:`, JSON.stringify(response.data, null, 2));

            if (!response.data) {
                throw new Error('Produto não encontrado.');
            }

            return this.mapToProduct(response.data, sku);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(`[WakeAPI] Erro status ${error.response?.status}:`, error.response?.data);
                if (error.response?.status === 404) {
                    throw new Error('Produto não encontrado na Wake Commerce.');
                }
            }
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            throw new Error(`Erro na API Wake: ${message}`);
        }
    }

    private static mapToProduct(data: Record<string, unknown>, sku: string): WakeProductResponse {
        // Prioridade: Preço da Tabela > Preço Padrão
        let precoDe = (data.precoDe as number) || (data.priceFrom as number) || 0;
        let precoPor = (data.precoPor as number) || (data.priceTo as number) || 0;

        // Log para debug da estrutura recebida
        // O campo correto retornado pela API é 'tabelasPreco' conforme evidência visual do JSON
        const tabelas = data.tabelasPreco;
        console.log(`[WakeAPI] Verificando tabelas para SKU ${sku}:`, JSON.stringify(tabelas, null, 2));

        if (Array.isArray(tabelas) && tabelas.length > 0) {
            const tabelaPromocional = tabelas[0] as Record<string, unknown>;

            // Força o uso se tiver preçoPor definido, independente de ser menor ou maior
            if (tabelaPromocional.precoPor !== undefined && tabelaPromocional.precoPor !== null) {
                console.log(`[WakeAPI] APLICANDO tabela de preço: ${tabelaPromocional.nome} | De: ${tabelaPromocional.precoDe} Por: ${tabelaPromocional.precoPor}`);

                // Atualiza as variáveis locais com os valores da tabela
                precoDe = Number(tabelaPromocional.precoDe);
                precoPor = Number(tabelaPromocional.precoPor);
            }
        } else {
            console.log(`[WakeAPI] Nenhuma tabela de preço encontrada ou array vazio.`);
        }

        // Regra de Negócio:
        // - Preço COM desconto (7%): Exibido como "Preço Por" (à vista)
        // - Parcelamento: Calculado sobre o "Preço Por" ORIGINAL (sem o desconto de 7%)
        const precoComDesconto = precoPor * 0.93; // 7% de desconto
        const valorParcela = precoPor / 12; // Parcela sobre o valor cheio

        return {
            sku: (data.sku as string) || (data.referencia as string) || sku,
            nome: (data.nome as string) || (data.productName as string) || "Produto sem nome",
            precoDe: precoDe,
            precoPor: precoComDesconto, // O "Preço Por" no JSON final reflete o valor à vista com desconto, conforme o front espera
            ean: (data.ean as string) || (data.barcode as string) || (data.gtin as string) || "SEM EAN",
            urlProduto: (data.urlProduto as string) || (data.productUrl as string) || "",
            parcela: valorParcela,
            vezes: 12
        };
    }
}
