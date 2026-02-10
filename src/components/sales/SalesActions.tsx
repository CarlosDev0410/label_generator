import { Button } from "@/components/ui/button";
import { Download, Upload, X, CheckCircle, Zap } from "lucide-react";

interface BatchProgress {
    current: number;
    total: number;
    isProcessing: boolean;
}

interface SalesActionsProps {
    onPrint: () => void;
    onClear: () => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDownloadTemplate: () => void;
    onDownloadSimplifiedTemplate: () => void;
    isItemCount: number;
    isLoading: boolean;
    batchProgress: BatchProgress;
}

export function SalesActions({
    onPrint,
    onClear,
    onImport,
    onDownloadTemplate,
    onDownloadSimplifiedTemplate,
    isItemCount,
    isLoading,
    batchProgress,
}: SalesActionsProps) {
    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownloadTemplate}
                    className="h-9 gap-2 border-dashed"
                >
                    <Download className="w-4 h-4" />
                    Modelo Completo
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownloadSimplifiedTemplate}
                    className="h-9 gap-2 border-dashed text-primary"
                >
                    <Zap className="w-4 h-4" />
                    Modelo Importação em Massa
                </Button>

                <div className="relative">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2"
                        disabled={batchProgress.isProcessing}
                        asChild
                    >
                        <label className="cursor-pointer">
                            <Upload className="w-4 h-4" />
                            {batchProgress.isProcessing ? "Processando..." : "Importar Planilha"}
                            <input
                                type="file"
                                className="hidden"
                                accept=".xlsx, .xls, .csv"
                                onChange={onImport}
                                disabled={batchProgress.isProcessing}
                            />
                        </label>
                    </Button>
                </div>

                <div className="h-4 w-[1px] bg-border mx-1" />

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    disabled={isItemCount === 0 || isLoading || batchProgress.isProcessing}
                    className="h-9 gap-2 text-muted-foreground hover:text-destructive"
                >
                    <X className="w-4 h-4" />
                    Limpar Lista
                </Button>

                <Button
                    onClick={onPrint}
                    disabled={isItemCount === 0 || isLoading || batchProgress.isProcessing}
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

            {/* Barra de Progresso do Batch */}
            {batchProgress.isProcessing && (
                <div className="space-y-2 animate-in fade-in duration-300">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            Buscando produtos na Wake Commerce...
                        </span>
                        <span className="font-mono font-semibold text-foreground">
                            {batchProgress.current} / {batchProgress.total}
                        </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
