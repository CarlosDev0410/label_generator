import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/lib/hooks/use-toast";

import { SalesForm } from "./sales/SalesForm";
import { SalesItemList } from "./sales/SalesItemList";
import { SalesActions } from "./sales/SalesActions";

import { useWakeProduct } from "@/hooks/use-wake-product";
import { useSalesItems } from "@/hooks/use-sales-items";
import { ApiService } from "@/services/api.service";
import { generateSalesZpl } from "@/lib/zpl";
import { saveZplAsPdf } from "@/lib/pdf";
import * as XLSX from "xlsx";
import type { SalesItem } from "@/types/sales-item";

export function SalesLabelGenerator() {
    // Hooks para lógica separada
    const { fetchProduct, isLoading: isLoadingProduct } = useWakeProduct();
    const { items, setItems, addItem, removeItem, clearAll } = useSalesItems();
    const { toast } = useToast();

    // Estados locais do formulário
    const [productName, setProductName] = useState("");
    const [sku, setSku] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [installments, setInstallments] = useState("");
    const [installmentCount, setInstallmentCount] = useState("12");
    const [barcode, setBarcode] = useState("");
    const [qrcode, setQrcode] = useState("");
    const [quantity, setQuantity] = useState("1");

    const [isGenerating, setIsGenerating] = useState(false);
    const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, isProcessing: false });

    // Handlers
    const handleSkuSearch = async (val: string) => {
        const product = await fetchProduct(val);
        if (product) {
            const formatCurrency = (v: number) =>
                v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            setProductName(product.nome || "");
            setPriceFrom(formatCurrency(product.precoDe || 0));
            setPriceTo(formatCurrency(product.precoPor || 0));
            setBarcode(product.ean || "");
            setQrcode(product.urlProduto || "");
            setInstallments(formatCurrency(product.parcela || 0));
            setInstallmentCount(String(product.vezes || 12));
        }
    };

    const handleAddItemManual = () => {
        if (!productName || !sku || !priceFrom || !priceTo || !barcode) {
            toast({
                title: "Erro de validação",
                description: "Por favor, preencha todos os campos obrigatórios (Nome, SKU, Preços e Código de Barras).",
                variant: "destructive",
            });
            return;
        }

        addItem({
            productName,
            sku,
            priceFrom,
            priceTo,
            installments,
            installmentCount: parseInt(installmentCount) || 12,
            barcode,
            quantity: parseInt(quantity) || 1,
            qrcode,
        });

        // Limpa campos
        setProductName("");
        setSku("");
        setPriceFrom("");
        setPriceTo("");
        setInstallments("");
        setBarcode("");
        setQrcode("");
        setQuantity("1");
    };

    const handlePrint = async () => {
        if (items.length === 0) return;
        setIsGenerating(true);
        try {
            const labels = items.flatMap(item =>
                Array(item.quantity).fill(generateSalesZpl(item))
            );
            await saveZplAsPdf(labels, undefined, undefined, "etiquetas-vendas.pdf");
            toast({ title: "PDF Gerado", description: "O download das etiquetas começará em breve." });
        } catch (error) {
            toast({ title: "Erro na geração", description: "Falha ao gerar o PDF de etiquetas.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    // Utilitário: formata número para moeda BR
    const formatCurrency = useCallback(
        (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        []
    );

    // Utilitário: divide um array em chunks de tamanho N
    const chunkArray = <T,>(arr: T[], size: number): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    // Utilitário: aguarda N milissegundos
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Detecta se a planilha é "simplificada" (só SKU) ou "completa"
    const isSimplifiedSheet = (row: Record<string, string | number>): boolean => {
        // Se tem nome/produto e preço preenchido, é planilha completa
        const hasName = !!(row.nome || row.produto);
        const hasPrice = !!(row.preco_por || row.por);
        return !hasName || !hasPrice;
    };

    // Importação inteligente: detecta tipo de planilha e processa adequadamente
    const handleImportSpreadsheet = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reseta o input para poder reimportar o mesmo arquivo
        e.target.value = "";

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, string | number>[];

                if (jsonData.length === 0) {
                    toast({ title: "Planilha vazia", description: "Nenhum dado encontrado na planilha.", variant: "destructive" });
                    return;
                }

                // Detecta o tipo pela primeira linha com dados
                const needsApiLookup = isSimplifiedSheet(jsonData[0]);

                if (needsApiLookup) {
                    // MODO BATCH: Planilha simplificada → busca dados na API
                    await processBatchImport(jsonData);
                } else {
                    // MODO CLÁSSICO: Planilha completa → importa direto
                    const importedItems: SalesItem[] = jsonData.map((row) => ({
                        id: Date.now() + Math.random(),
                        productName: String(row.nome || row.produto || ""),
                        sku: String(row.sku || row.ref || ""),
                        priceFrom: String(row.preco_de || row.de || "0,00"),
                        priceTo: String(row.preco_por || row.por || "0,00"),
                        installments: String(row.parcela || "0,00"),
                        installmentCount: parseInt(String(row.vezes || "12")),
                        barcode: String(row.ean || row.barcode || ""),
                        quantity: parseInt(String(row.quantidade || row.qtd || "1")),
                        qrcode: String(row.link || row.qrcode || ""),
                    }));

                    setItems([...importedItems, ...items]);
                    toast({ title: "Importação concluída", description: `${importedItems.length} itens importados.` });
                }
            } catch (error) {
                toast({ title: "Erro na importação", description: "Verifique o formato da planilha.", variant: "destructive" });
                setBatchProgress({ current: 0, total: 0, isProcessing: false });
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // Processamento em lotes: busca dados da API para cada SKU
    const processBatchImport = async (rows: Record<string, string | number>[]) => {
        const BATCH_SIZE = 5;
        const DELAY_BETWEEN_BATCHES_MS = 500;

        const skuRows = rows
            .filter(row => row.sku || row.ref)
            .map(row => ({
                sku: String(row.sku || row.ref).trim(),
                quantity: parseInt(String(row.quantidade || row.qtd || "1")),
            }));

        if (skuRows.length === 0) {
            toast({ title: "Nenhum SKU encontrado", description: "A planilha não contém a coluna 'sku'.", variant: "destructive" });
            return;
        }

        setBatchProgress({ current: 0, total: skuRows.length, isProcessing: true });
        const successItems: SalesItem[] = [];
        let errorCount = 0;

        const chunks = chunkArray(skuRows, BATCH_SIZE);

        for (const chunk of chunks) {
            // Processa cada item do lote em paralelo
            const results = await Promise.allSettled(
                chunk.map(async ({ sku, quantity }) => {
                    const product = await ApiService.fetchWakeProduct(sku);
                    return {
                        id: Date.now() + Math.random(),
                        productName: product.nome || "Produto sem nome",
                        sku: product.sku || sku,
                        priceFrom: formatCurrency(product.precoDe || 0),
                        priceTo: formatCurrency(product.precoPor || 0),
                        installments: formatCurrency(product.parcela || 0),
                        installmentCount: product.vezes || 12,
                        barcode: product.ean || "",
                        quantity,
                        qrcode: product.urlProduto || "",
                    } as SalesItem;
                })
            );

            // Coleta os que deram certo
            for (const result of results) {
                if (result.status === "fulfilled") {
                    successItems.push(result.value);
                } else {
                    errorCount++;
                }
            }

            // Atualiza progresso
            setBatchProgress(prev => ({
                ...prev,
                current: prev.current + chunk.length,
            }));

            // Atualiza a lista progressivamente para feedback visual
            setItems(prev => [...successItems, ...prev.filter(p => !successItems.some(s => s.id === p.id))]);

            // Delay entre lotes para não sobrecarregar a API
            await delay(DELAY_BETWEEN_BATCHES_MS);
        }

        setBatchProgress({ current: 0, total: 0, isProcessing: false });

        const message = errorCount > 0
            ? `${successItems.length} itens importados com sucesso. ${errorCount} SKUs não encontrados.`
            : `${successItems.length} itens importados com sucesso!`;

        toast({
            title: "Importação em massa concluída",
            description: message,
            variant: errorCount > 0 ? "destructive" : undefined,
        });
    };

    // Download do modelo completo (com todos os campos)
    const handleDownloadTemplate = () => {
        const templateData = [{
            nome: "Exemplo Produto",
            sku: "EX-001",
            preco_de: "100,00",
            preco_por: "89,90",
            parcela: "8,99",
            vezes: "10",
            ean: "7891234567890",
            link: "https://exemplo.com",
            quantidade: "1"
        }];
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Etiquetas");
        XLSX.writeFile(wb, "exemplo-vendas.xlsx");
    };

    // Download do modelo simplificado (só SKU e Quantidade)
    const handleDownloadSimplifiedTemplate = () => {
        const templateData = [
            { sku: "EX-001", quantidade: 1 },
            { sku: "EX-002", quantidade: 2 },
            { sku: "EX-003", quantidade: 1 },
        ];
        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SKUs");
        XLSX.writeFile(wb, "modelo-importacao-massa.xlsx");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <Toaster />

            {/* Form Section */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/30 overflow-hidden relative">
                <CardHeader className="pb-8">
                    <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Gerador de Etiquetas de Venda
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Preencha os dados manualmente ou utilize a busca automática por SKU via API Wake.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    <SalesForm
                        productName={productName}
                        setProductName={setProductName}
                        sku={sku}
                        setSku={setSku}
                        priceFrom={priceFrom}
                        setPriceFrom={setPriceFrom}
                        priceTo={priceTo}
                        setPriceTo={setPriceTo}
                        installments={installments}
                        setInstallments={setInstallments}
                        installmentCount={installmentCount}
                        setInstallmentCount={setInstallmentCount}
                        barcode={barcode}
                        setBarcode={setBarcode}
                        qrcode={qrcode}
                        setQrcode={setQrcode}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        isLoadingProduct={isLoadingProduct}
                        onSkuSearch={handleSkuSearch}
                    />

                    <div className="pt-6 border-t border-border/50">
                        <Button
                            onClick={handleAddItemManual}
                            className="w-full h-12 text-lg font-semibold gap-2 shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Adicionar Item à Lista
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* List Section */}
            <div className="space-y-4">
                <SalesActions
                    onPrint={handlePrint}
                    onClear={clearAll}
                    onImport={handleImportSpreadsheet}
                    onDownloadTemplate={handleDownloadTemplate}
                    onDownloadSimplifiedTemplate={handleDownloadSimplifiedTemplate}
                    isItemCount={items.length}
                    isLoading={isGenerating}
                    batchProgress={batchProgress}
                />

                <div className="bg-muted/30 rounded-2xl p-6 min-h-[300px]">
                    <SalesItemList items={items} onRemove={removeItem} />
                </div>
            </div>
        </div>
    );
}
