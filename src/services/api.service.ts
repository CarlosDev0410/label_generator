const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class ApiService {
    static async get<T>(path: string): Promise<T> {
        try {
            const token = localStorage.getItem('auth_token');
            const fullUrl = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
            
            const response = await fetch(fullUrl, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                }
            });

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

    static async post<T>(path: string, body: any): Promise<T> {
        try {
            const token = localStorage.getItem('auth_token');
            const fullUrl = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
            
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erro na requisição: ${response.statusText}`);
            }

            return await response.json();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error(`Erro no ApiService [POST ${path}]:`, message);
            throw error;
        }
    }

    // Abstração específica para autenticação
    static async login(password: string) {
        return this.post<{ token: string }>('/api/auth/login', { password });
    }

    static async validateToken() {
        return this.get<{ valid: true }>('/api/auth/validate');
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
