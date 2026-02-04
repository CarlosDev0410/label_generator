import { useState } from "react";
import { Plus, FileSpreadsheet } from "lucide-react";
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
import { generateSalesZpl } from "@/lib/zpl";
import { saveZplAsPdf } from "@/lib/pdf";
import * as XLSX from "xlsx";

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

    const handleImportSpreadsheet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, string | number>[];

                const importedItems = jsonData.map((row) => ({
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
            } catch (error) {
                toast({ title: "Erro na importação", description: "Verifique o formato da planilha.", variant: "destructive" });
            }
        };
        reader.readAsArrayBuffer(file);
    };

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

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <Toaster />

            {/* Form Section */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 text-primary/10 pointer-events-none">
                    <FileSpreadsheet className="w-32 h-32" />
                </div>

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
                    isItemCount={items.length}
                    isLoading={isGenerating}
                />

                <div className="bg-muted/30 rounded-2xl p-6 min-h-[300px]">
                    <SalesItemList items={items} onRemove={removeItem} />
                </div>
            </div>
        </div>
    );
}
