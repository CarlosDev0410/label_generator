import { useState, useRef } from "react";
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
    const [installmentCount, setInstallmentCount] = useState("10");
    const [barcode, setBarcode] = useState("");
    const [qrcode, setQrcode] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0, action: "" });

    // Helper to sleep between requests
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // List state
    const [items, setItems] = useState<SalesItem[]>([]);
    const { toast } = useToast();

    const handleAddItem = async () => {
        if (!productName || !sku || !priceFrom || !priceTo || !barcode) {
            toast({
                title: "Erro de validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const newItem: SalesItem = {
                id: Date.now(),
                productName,
                sku,
                priceFrom,
                priceTo,
                installments,
                installmentCount: parseInt(installmentCount) || 10,
                barcode,
                quantity: parseInt(quantity) || 1,
                qrcode,
            };

            setItems([newItem, ...items]);

            setProductName("");
            setSku("");
            setPriceFrom("");
            setPriceTo("");
            setInstallments("");
            setInstallmentCount("10");
            setBarcode("");
            setQrcode("");
            setQuantity("1");

            toast({
                title: "Item adicionado",
                description: "O item foi adicionado à lista com sucesso.",
            });
        } catch (error) {
            toast({
                title: "Erro ao adicionar",
                description: "Não foi possível processar o item.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
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
            // Expand items based on quantity
            const expandedItems = items.flatMap(item => Array(item.quantity).fill(item));
            const totalLabels = expandedItems.length;
            const CHUNK_SIZE = 50;
            const totalChunks = Math.ceil(totalLabels / CHUNK_SIZE);

            for (let i = 0; i < totalChunks; i++) {
                const chunkStart = i * CHUNK_SIZE;
                const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, totalLabels);
                const chunkItems = expandedItems.slice(chunkStart, chunkEnd);
                const chunkZpl = chunkItems.map(generateSalesZpl);

                setProgress({
                    current: 0,
                    total: totalChunks,
                    action: `Preparando PDFs...`
                });

                await saveZplAsPdf(
                    chunkZpl,
                    2.36,
                    3.15,
                    `etiquetas_venda_parte_${i + 1}.pdf`,
                    (curr, tot) => {
                        setProgress({
                            current: i + 1,
                            total: totalChunks,
                            action: `Gerando parte ${i + 1} de ${totalChunks} (Etiqueta ${curr}/${tot})...`
                        });
                    }
                );

                // Small delay between PDF downloads to avoid browser/API block
                if (i < totalChunks - 1) await sleep(1000);
            }

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
                Parcela: "119,00",
                Vezes: 10,
                CodigoBarras: "7891234567890",
                Quantidade: 1,
                QRCode: "https://seulink.com"
            }
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Modelo");
        XLSX.writeFile(wb, "modelo_etiquetas_venda.xlsx");
    };

    const handleImportSpreadsheet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
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

                const processItems = async () => {
                    const newItems: SalesItem[] = [];
                    const errors: string[] = [];

                    for (let index = 0; index < data.length; index++) {
                        const row: any = data[index];
                        const rowNum = index + 2;

                        setProgress({
                            current: index + 1,
                            total: data.length,
                            action: `Processando item ${index + 1} de ${data.length}...`
                        });

                        if (!row.Produto || !row.SKU || !row.PrecoDe || !row.PrecoPor || !row.CodigoBarras) {
                            errors.push(`Linha ${rowNum}: Dados incompletos.`);
                            continue;
                        }

                        newItems.push({
                            id: Date.now() + index,
                            productName: String(row.Produto || ""),
                            sku: String(row.SKU || ""),
                            priceFrom: String(row.PrecoDe || "0,00"),
                            priceTo: String(row.PrecoPor || "0,00"),
                            installments: String(row.Parcela || "0,00"),
                            installmentCount: parseInt(row.Vezes) || 10,
                            barcode: String(row.CodigoBarras || ""),
                            quantity: parseInt(row.Quantidade) || 1,
                            qrcode: row.QRCode ? String(row.QRCode) : ""
                        });
                    }

                    if (newItems.length > 0) {
                        setItems((prev) => [...newItems, ...prev]);
                        toast({
                            title: "Importação concluída",
                            description: `${newItems.length} itens importados com sucesso.`,
                        });
                    }

                    if (errors.length > 0) {
                        const errorMsg = errors.slice(0, 3).join("\n") + (errors.length > 3 ? `\n...e mais ${errors.length - 3} erros.` : "");
                        toast({
                            title: `Houve erros em ${errors.length} linhas`,
                            description: errorMsg,
                            variant: "destructive",
                            duration: 5000
                        });
                    }
                    setIsLoading(false);
                };

                processItems();

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
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    <span className="text-sm font-medium">{progress.action}</span>
                                                </div>
                                                {progress.total > 0 && (
                                                    <span className="text-[10px] text-muted-foreground mr-1">
                                                        {progress.current} de {progress.total}
                                                    </span>
                                                )}
                                            </div>
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

                    {/* PROGRESS BAR - Show when loading */}
                    {isLoading && progress.total > 0 && (
                        <div className="col-span-12 -mt-4">
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(progress.current / progress.total) * 100}%` }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                />
                            </div>
                        </div>
                    )}

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
                                <div className="grid grid-cols-12 gap-6">
                                    {/* Row 1: Identification and Main Prices */}
                                    <div className="col-span-12 md:col-span-6 space-y-3">
                                        <Label htmlFor="productName">Nome do Produto</Label>
                                        <Input
                                            id="productName"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            placeholder="Ex: Cadeira Gamer..."
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="priceFrom">Preço DE (R$)</Label>
                                        <Input
                                            id="priceFrom"
                                            value={priceFrom}
                                            onChange={(e) => setPriceFrom(e.target.value)}
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="priceTo">Preço POR (R$)</Label>
                                        <Input
                                            id="priceTo"
                                            value={priceTo}
                                            onChange={(e) => setPriceTo(e.target.value)}
                                            placeholder="0,00"
                                        />
                                    </div>

                                    {/* Row 2: Logic and Installments */}
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="sku">SKU / REF</Label>
                                        <Input
                                            id="sku"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                            placeholder="Ex: CAD-001"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="barcode">Código de Barras</Label>
                                        <Input
                                            id="barcode"
                                            value={barcode}
                                            onChange={(e) => setBarcode(e.target.value)}
                                            placeholder="Ex: 789..."
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="installments">Parcela (R$)</Label>
                                        <Input
                                            id="installments"
                                            value={installments}
                                            onChange={(e) => setInstallments(e.target.value)}
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3 space-y-3">
                                        <Label htmlFor="installmentCount">Vezes</Label>
                                        <Input
                                            id="installmentCount"
                                            type="number"
                                            min="1"
                                            value={installmentCount}
                                            onChange={(e) => setInstallmentCount(e.target.value)}
                                            placeholder="10"
                                        />
                                    </div>

                                    {/* Row 3: QR Code and Print Quantity */}
                                    <div className="col-span-12 md:col-span-9 space-y-3">
                                        <Label htmlFor="qrcode">Link do QR Code (Opcional)</Label>
                                        <Input
                                            id="qrcode"
                                            value={qrcode}
                                            onChange={(e) => setQrcode(e.target.value)}
                                            placeholder="https://exemplo.com.br"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-3 space-y-3">
                                        <Label htmlFor="quantity">Etiquetas</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder="1"
                                        />
                                    </div>

                                    {/* Row 4: Action Button */}
                                    <div className="col-span-12 flex justify-end pt-2">
                                        <Button onClick={handleAddItem} disabled={isLoading} className="w-full md:w-auto">
                                            {isLoading && progress.total <= 1 ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    Processando...
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Adicionar Item
                                                </>
                                            )}
                                        </Button>
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
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-semibold text-base pr-4 truncate flex-1" title={item.productName}>{item.productName}</h3>
                                                            {item.quantity > 1 && (
                                                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                                                    x{item.quantity}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex justify-between text-sm text-muted-foreground">
                                                            <span>SKU: {item.sku}</span>
                                                            <span>{item.barcode}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-2 border-t mt-2">
                                                            <div className="flex flex-col">
                                                                <span className="line-through text-xs text-muted-foreground">R$ {item.priceFrom}</span>
                                                                <span className="font-bold text-green-600">R$ {item.priceTo}</span>
                                                                <span className="text-[10px] text-muted-foreground">{item.installmentCount}x de R$ {item.installments}</span>
                                                            </div>
                                                            {item.qrcode && (
                                                                <div className="bg-muted p-1 rounded" title={item.qrcode}>
                                                                    <div className="w-8 h-8 flex items-center justify-center bg-white border border-black/10 rounded-sm">
                                                                        <div className="w-6 h-6 border-2 border-black rounded-sm relative">
                                                                            <div className="absolute top-0 left-0 w-1 h-1 bg-black"></div>
                                                                            <div className="absolute top-0 right-0 w-1 h-1 bg-black"></div>
                                                                            <div className="absolute bottom-0 left-0 w-1 h-1 bg-black"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
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
