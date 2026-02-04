import { Button } from "@/components/ui/button";
import { Download, Upload, X, CheckCircle } from "lucide-react";

interface SalesActionsProps {
    onPrint: () => void;
    onClear: () => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDownloadTemplate: () => void;
    isItemCount: number;
    isLoading: boolean;
}

export function SalesActions({
    onPrint,
    onClear,
    onImport,
    onDownloadTemplate,
    isItemCount,
    isLoading
}: SalesActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button
                variant="outline"
                size="sm"
                onClick={onDownloadTemplate}
                className="h-9 gap-2 border-dashed"
            >
                <Download className="w-4 h-4" />
                Planilha Exemplo
            </Button>

            <div className="relative">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2"
                    asChild
                >
                    <label className="cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Importar Planilha
                        <input
                            type="file"
                            className="hidden"
                            accept=".xlsx, .xls, .csv"
                            onChange={onImport}
                        />
                    </label>
                </Button>
            </div>

            <div className="h-4 w-[1px] bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                disabled={isItemCount === 0 || isLoading}
                className="h-9 gap-2 text-muted-foreground hover:text-destructive"
            >
                <X className="w-4 h-4" />
                Limpar Lista
            </Button>

            <Button
                onClick={onPrint}
                disabled={isItemCount === 0 || isLoading}
                className="h-9 gap-2 ml-auto bg-primary hover:bg-primary/90 shadow-sm"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Gerando Etiquetas...
                    </>
                ) : (
                    <>
                        <CheckCircle className="w-4 h-4" />
                        Gerar e Imprimir ({isItemCount})
                    </>
                )}
            </Button>
        </div>
    );
}
