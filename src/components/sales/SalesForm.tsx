import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface SalesFormProps {
    productName: string;
    setProductName: (v: string) => void;
    sku: string;
    setSku: (v: string) => void;
    priceFrom: string;
    setPriceFrom: (v: string) => void;
    priceTo: string;
    setPriceTo: (v: string) => void;
    installments: string;
    setInstallments: (v: string) => void;
    installmentCount: string;
    setInstallmentCount: (v: string) => void;
    barcode: string;
    setBarcode: (v: string) => void;
    qrcode: string;
    setQrcode: (v: string) => void;
    quantity: string;
    setQuantity: (v: string) => void;
    isLoadingProduct: boolean;
    onSkuSearch: (sku: string) => void;
}

export function SalesForm(props: SalesFormProps) {
    const {
        productName, setProductName,
        sku, setSku,
        priceFrom, setPriceFrom,
        priceTo, setPriceTo,
        installments, setInstallments,
        installmentCount, setInstallmentCount,
        barcode, setBarcode,
        qrcode, setQrcode,
        quantity, setQuantity,
        isLoadingProduct,
        onSkuSearch
    } = props;

    return (
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
            <div className="col-span-6 md:col-span-3 space-y-3 relative">
                <Label htmlFor="sku">SKU / REF</Label>
                <Input
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onSkuSearch(sku);
                        }
                    }}
                    onBlur={() => {
                        if (sku && sku.trim() !== "") {
                            onSkuSearch(sku);
                        }
                    }}
                    disabled={isLoadingProduct}
                    placeholder="Ex: CAD-001"
                    className={isLoadingProduct ? "animate-pulse border-primary/50" : ""}
                />
                {isLoadingProduct && (
                    <div className="absolute right-3 top-9 flex items-center">
                        <Clock className="w-4 h-4 animate-spin text-primary" />
                    </div>
                )}
            </div>
            <div className="col-span-6 md:col-span-3 space-y-3">
                <Label htmlFor="barcode">Código de Barras</Label>
                <Input
                    id="barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="789..."
                />
            </div>
            <div className="col-span-6 md:col-span-3 space-y-3">
                <Label htmlFor="installments">Valor da Parcela (R$)</Label>
                <Input
                    id="installments"
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    placeholder="0,00"
                />
            </div>
            <div className="col-span-6 md:col-span-3 space-y-3">
                <Label htmlFor="installmentCount">Qtd Parcelas</Label>
                <Input
                    id="installmentCount"
                    value={installmentCount}
                    onChange={(e) => setInstallmentCount(e.target.value)}
                    placeholder="Ex: 10"
                />
            </div>

            {/* Row 3: QR and Quantity */}
            <div className="col-span-12 md:col-span-9 space-y-3">
                <Label htmlFor="qrcode">Link QR Code (Opcional)</Label>
                <Input
                    id="qrcode"
                    value={qrcode}
                    onChange={(e) => setQrcode(e.target.value)}
                    placeholder="https://..."
                />
            </div>
            <div className="col-span-12 md:col-span-3 space-y-3">
                <Label htmlFor="quantity">Etiquetas por Item</Label>
                <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
        </div>
    );
}
