import { type SalesItem } from '@/types/sales-item';
import { useToast } from '@/lib/hooks/use-toast';
import { useState } from 'react';

export function useSalesItems() {
    const [items, setItems] = useState<SalesItem[]>([]);
    const { toast } = useToast();

    const addItem = (item: Omit<SalesItem, 'id'>) => {
        const newItem: SalesItem = {
            ...item,
            id: Date.now()
        };

        setItems(prev => [newItem, ...prev]);

        toast({
            title: "Item adicionado",
            description: "O item foi adicionado à lista com sucesso.",
        });
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearAll = () => {
        setItems([]);
    };

    return {
        items,
        setItems,
        addItem,
        removeItem,
        clearAll
    };
}
