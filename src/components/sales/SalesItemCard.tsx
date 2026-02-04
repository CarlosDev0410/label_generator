import { type SalesItem } from "@/types/sales-item";
import { Button } from "@/components/ui/button";
import { X, Tag, Barcode as BarcodeIcon, Layers } from "lucide-react";

interface SalesItemCardProps {
    item: SalesItem;
    onRemove: (id: number) => void;
}

export function SalesItemCard({ item, onRemove }: SalesItemCardProps) {
    return (
        <div className="group relative bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold tracking-wider uppercase text-primary/70">
                            SKU: {item.sku}
                        </span>
                    </div>
                    <h4 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {item.productName}
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                        <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">De:</span>
                            <p className="text-xs line-through text-muted-foreground/70 font-medium">R$ {item.priceFrom}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] text-primary/70 uppercase font-bold">Por:</span>
                            <p className="text-sm font-bold text-foreground">R$ {item.priceTo}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">Parcelas:</span>
                            <p className="text-xs font-semibold text-foreground">{item.installmentCount}x R$ {item.installments}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">Qtd Etiquetas:</span>
                            <div className="flex items-center gap-1.5">
                                <Layers className="w-3 h-3 text-muted-foreground" />
                                <p className="text-xs font-bold text-foreground">{item.quantity}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <BarcodeIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[10px] font-mono text-muted-foreground/80">{item.barcode}</span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
