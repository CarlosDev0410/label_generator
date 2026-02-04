import { useState } from 'react';
import { ApiService } from '@/services/api.service';
import { useToast } from '@/lib/hooks/use-toast';

export function useWakeProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const fetchProduct = async (sku: string) => {
        if (!sku || sku.trim() === '') return null;

        setIsLoading(true);
        try {
            const data = await ApiService.fetchWakeProduct(sku);

            toast({
                title: "Produto encontrado",
                description: `Dados de "${data.nome}" carregados com sucesso.`,
            });

            return data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            toast({
                title: "Busca falhou",
                description: message,
                variant: "destructive",
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fetchProduct,
        isLoading
    };
}
