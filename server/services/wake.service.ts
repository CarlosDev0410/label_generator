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
            // Rota conforme OpenAPI: /produtos/{identificador}?tipoIdentificador=Sku
            const response = await axios.get(`${this.BASE_URL}/produtos/${sku}?tipoIdentificador=Sku`, {
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
        const precoOriginal = (data.precoPor as number) || (data.priceTo as number) || 0;
        const precoComDesconto = precoOriginal * 0.93; // 7% de desconto
        const valorParcela = precoComDesconto / 12;

        return {
            sku: (data.sku as string) || (data.referencia as string) || sku,
            nome: (data.nome as string) || (data.productName as string) || "Produto sem nome",
            precoDe: (data.precoDe as number) || (data.priceFrom as number) || 0,
            precoPor: precoComDesconto,
            ean: (data.ean as string) || (data.barcode as string) || (data.gtin as string) || "",
            urlProduto: (data.urlProduto as string) || (data.productUrl as string) || "",
            parcela: valorParcela,
            vezes: 12
        };
    }
}
