import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/lib/hooks/use-toast";
import { X, Plus, FileText, CheckCircle, Clock, Download, Upload, FileSpreadsheet } from "lucide-react";
import type { SalesItem } from "@/types/sales-item";
import { generateSalesZpl } from "@/lib/zpl";
import { saveZplAsPdf } from "@/lib/pdf";
import * as XLSX from "xlsx";

export function SalesLabelGenerator() {
    // Form state
    const [productName, setProductName] = useState("");
    const [sku, setSku] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [installments, setInstallments] = useState("");
    const [barcode, setBarcode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // List state
    const [items, setItems] = useState<SalesItem[]>([]);
    const { toast } = useToast();

    // Auto-calculate installments when priceTo changes
    useEffect(() => {
        if (priceTo) {
            const price = parseFloat(priceTo.replace(",", "."));
            if (!isNaN(price)) {
                const val = (price / 12).toFixed(2).replace(".", ",");
                setInstallments(val);
            }
        }
    }, [priceTo]);

    const handleAddItem = () => {
        if (!productName || !sku || !priceFrom || !priceTo || !barcode) {
            toast({
                title: "Erro de validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        const newItem: SalesItem = {
            id: Date.now(),
            productName,
            sku,
            priceFrom,
            priceTo,
            installments,
            barcode,
        };

        setItems([newItem, ...items]);

        setProductName("");
        setSku("");
        setPriceFrom("");
        setPriceTo("");
        setInstallments("");
        setBarcode("");

        toast({
            title: "Item adicionado",
            description: "O item foi adicionado à lista com sucesso.",
        });
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
        toast({
            title: "Item removido",
            description: "O item foi removido da lista.",
        });
    };

    const handlePrint = async () => {
        if (items.length === 0) {
            toast({
                title: "Lista vazia",
                description: "Não há itens na lista para imprimir.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const allZpl = items.map(generateSalesZpl);
            await saveZplAsPdf(allZpl);
            toast({
                title: "PDF gerado",
                description: "O arquivo PDF foi gerado com sucesso.",
            });
        } catch (error) {
            toast({
                title: "Erro ao gerar PDF",
                description: "Ocorreu um erro ao gerar o arquivo PDF.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            {
                Produto: "Ex: Cadeira Gamer",
                SKU: "CAD-001",
                PrecoDe: "1200,00",
                PrecoPor: "999,00",
                CodigoBarras: "7891234567890"
            }
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Modelo");
        XLSX.writeFile(wb, "modelo_etiquetas_venda.xlsx");
    };

    const handleImportSpreadsheet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                if (data.length === 0) {
                    toast({
                        title: "Planilha vazia",
                        description: "Não foram encontrados dados na planilha.",
                        variant: "destructive"
                    });
                    return;
                }

                const newItems: SalesItem[] = [];
                const errors: string[] = [];

                data.forEach((row: any, index: number) => {
                    const rowNum = index + 2; // +2 considering header and 0-index
                    if (!row.Produto || !row.SKU || !row.PrecoDe || !row.PrecoPor || !row.CodigoBarras) {
                        errors.push(`Linha ${rowNum}: Dados incompletos.`);
                        return;
                    }

                    // Auto calculate installments from imported price
                    let installmentsVal = "";
                    const priceStr = String(row.PrecoPor);
                    const price = parseFloat(priceStr.replace(",", "."));
                    if (!isNaN(price)) {
                        installmentsVal = (price / 12).toFixed(2).replace(".", ",");
                    }

                    newItems.push({
                        id: Date.now() + index, // unique id offset
                        productName: String(row.Produto),
                        sku: String(row.SKU),
                        priceFrom: String(row.PrecoDe),
                        priceTo: String(row.PrecoPor),
                        installments: installmentsVal,
                        barcode: String(row.CodigoBarras)
                    });
                });

                if (newItems.length > 0) {
                    setItems((prev) => [...newItems, ...prev]);
                    toast({
                        title: "Importação concluída",
                        description: `${newItems.length} itens importados com sucesso.`,
                    });
                }

                if (errors.length > 0) {
                    // Show first 3 errors to avoid huge toast
                    const errorMsg = errors.slice(0, 3).join("\n") + (errors.length > 3 ? `\n...e mais ${errors.length - 3} erros.` : "");
                    toast({
                        title: `Houve erros em ${errors.length} linhas`,
                        description: errorMsg,
                        variant: "destructive",
                        duration: 5000
                    });
                }

            } catch (error) {
                console.error(error);
                toast({
                    title: "Erro na leitura",
                    description: "Não foi possível ler o arquivo. Verifique o formato.",
                    variant: "destructive"
                });
            }
        };
        reader.readAsBinaryString(file);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    const handleClearAll = () => {
        setItems([]);
        toast({
            title: "Lista limpa",
            description: "Todos os itens foram removidos da lista.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-6">

                    {/* HEADER */}
                    <div className="col-span-12">
                        <header className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-foreground">
                                <FileText className="inline-block w-6 h-6 mr-3" />
                                Gerador de Etiquetas - Vendas
                            </h1>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleDownloadTemplate}
                                    className="hover:opacity-90"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Modelo
                                </Button>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImportSpreadsheet}
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="hover:opacity-90"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Importar Planilha
                                    </Button>
                                </div>
                                <Button
                                    onClick={handlePrint}
                                    disabled={isLoading || items.length === 0}
                                    className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <>
                                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                                            Gerando...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4 mr-2" />
                                            Salvar PDF
                                        </>
                                    )}
                                </Button>
                            </div>
                        </header>
                    </div>

                    {/* FORM - Full Width */}
                    <div className="col-span-12">
                        <Card className="rounded-2xl shadow-sm border p-6">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-lg font-medium text-foreground">
                                    <Plus className="inline-block w-5 h-5 mr-2" />
                                    Adicionar Novo Produto
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    Adicione manualmente ou importe via planilha.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column Fields */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="productName">Nome do Produto</Label>
                                            <Input
                                                id="productName"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="Ex: Cadeira Gamer..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="sku">SKU / REF</Label>
                                                <Input
                                                    id="sku"
                                                    value={sku}
                                                    onChange={(e) => setSku(e.target.value)}
                                                    placeholder="Ex: CAD-001"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="barcode">Código de Barras</Label>
                                                <Input
                                                    id="barcode"
                                                    value={barcode}
                                                    onChange={(e) => setBarcode(e.target.value)}
                                                    placeholder="Ex: 789..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column Fields */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <Label htmlFor="priceFrom">Preço DE (R$)</Label>
                                                <Input
                                                    id="priceFrom"
                                                    value={priceFrom}
                                                    onChange={(e) => setPriceFrom(e.target.value)}
                                                    placeholder="0,00"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="priceTo">Preço POR (R$)</Label>
                                                <Input
                                                    id="priceTo"
                                                    value={priceTo}
                                                    onChange={(e) => setPriceTo(e.target.value)}
                                                    placeholder="0,00"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="installments">Valor da Parcela (12x)</Label>
                                            <Input
                                                id="installments"
                                                value={installments}
                                                onChange={(e) => setInstallments(e.target.value)}
                                                placeholder="Calculado automaticamente..."
                                            />
                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <Button onClick={handleAddItem}>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Adicionar Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* LIST - Full Width below form */}
                    <div className="col-span-12">
                        <Card className="rounded-2xl shadow-sm border p-6">
                            <CardHeader className="p-0 mb-6 w-full flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-medium text-foreground">
                                        <CheckCircle className="inline-block w-5 h-5 mr-2" />
                                        Lista para Impressão
                                    </CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground mt-1">
                                        {items.length} {items.length === 1 ? 'item' : 'itens'} na lista
                                    </CardDescription>
                                </div>
                                {items.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearAll}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Limpar Tudo
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="p-0">
                                {items.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <AnimatePresence>
                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="rounded-lg border bg-card p-4 hover:shadow-md transition-all duration-200 relative group"
                                                >
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold text-base pr-8 truncate" title={item.productName}>{item.productName}</h3>
                                                        <div className="flex justify-between text-sm text-muted-foreground">
                                                            <span>SKU: {item.sku}</span>
                                                            <span>{item.barcode}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-2 border-t mt-2">
                                                            <span className="line-through text-xs text-muted-foreground">R$ {item.priceFrom}</span>
                                                            <span className="font-bold text-green-600">R$ {item.priceTo}</span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="text-center py-16 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-muted/20">
                                        <FileSpreadsheet className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-1">Lista Vazia</h3>
                                        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                                            Adicione itens manualmente ou importe uma planilha para começar.
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Importar Planilha Agora
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
            <Toaster />
        </div>
    );
}
