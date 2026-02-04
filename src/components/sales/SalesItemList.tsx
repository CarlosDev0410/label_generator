import { motion, AnimatePresence } from "framer-motion";
import { type SalesItem } from "@/types/sales-item";
import { SalesItemCard } from "./SalesItemCard";
import { FileText } from "lucide-react";

interface SalesItemListProps {
    items: SalesItem[];
    onRemove: (id: number) => void;
}

export function SalesItemList({ items, onRemove }: SalesItemListProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">Sua lista está vazia</h3>
                    <p className="text-sm text-muted-foreground">Adicione itens para gerar suas etiquetas de venda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SalesItemCard item={item} onRemove={onRemove} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
