const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class ApiService {
    static async get<T>(path: string): Promise<T> {
        try {
            // Remove a barra inicial do path se o API_BASE_URL já terminar com uma, ou vice-versa
            const fullUrl = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
            const response = await fetch(fullUrl);

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erro na requisição: ${response.statusText}`);
            }

            return await response.json();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error(`Erro no ApiService [GET ${path}]:`, message);
            throw error;
        }
    }

    // Abstração específica para produtos da Wake
    static async fetchWakeProduct(sku: string) {
        return this.get<{
            sku: string;
            nome: string;
            precoDe: number;
            precoPor: number;
            ean: string;
            urlProduto: string;
            parcela: number;
            vezes: number;
        }>(`/api/consultar-produto/${sku.trim()}`);
    }
}
