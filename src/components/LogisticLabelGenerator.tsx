import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/lib/hooks/use-toast";
import { Circle, Square, Triangle, X, Plus, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import type { Item } from "@/types/item";
import { generateZplForItem } from "@/lib/zpl";
import { saveZplAsPdf } from "@/lib/pdf";

export function LogisticLabelGenerator() {
    // Form state
    const [acelerato, setAcelerato] = useState("");
    const [grau, setGrau] = useState([5]);
    const [selectedOption, setSelectedOption] = useState("");
    const [freeText, setFreeText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // List state
    const [items, setItems] = useState<Item[]>([]);
    const { toast } = useToast();

    const handleAceleratoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Permite apenas números no campo Acelerato
        if (/^\d*$/.test(value)) {
            setAcelerato(value);
        }
    };

    const handleAddItem = () => {
        if (!acelerato) {
            toast({
                title: "Erro de validação",
                description: "Por favor, preencha o número do Acelerato.",
                variant: "destructive",
            });
            return;
        }
        if (!selectedOption) {
            toast({
                title: "Erro de validação",
                description: "Por favor, selecione uma opção (Avaria, Defeito ou Pendência).",
                variant: "destructive",
            });
            return;
        }
        const newItem: Item = {
            id: Date.now(),
            acelerato,
            grau: grau[0],
            avaria: selectedOption === "avaria",
            defeito: selectedOption === "defeito",
            pendencia: selectedOption === "pendencia",
            freeText: freeText,
        };
        setItems([newItem, ...items]);
        setAcelerato("");
        setGrau([5]);
        setSelectedOption("");
        setFreeText("");
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
            const allZpl = items.map(generateZplForItem);
            await saveZplAsPdf(allZpl, 3.93701, 5.90551, 'etiquetas_logistica.pdf');
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

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6">
                {/* Grid de 12 colunas com gap-6 */}
                <div className="grid grid-cols-12 gap-6">

                    {/* HEADER - Ocupa toda a largura */}
                    <div className="col-span-12">
                        <header className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-foreground">
                                <FileText className="inline-block w-6 h-6 mr-3" />
                                Gerador de Etiquetas - Logística
                            </h1>
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
                        </header>
                    </div>

                    {/* FORM - Ocupa toda a largura em mobile, 6 colunas em md+ */}
                    <div className="col-span-12 md:col-span-6">
                        <Card className="rounded-2xl shadow-sm border p-6">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-lg font-medium text-foreground">
                                    <Plus className="inline-block w-5 h-5 mr-2" />
                                    Adicionar Novo Item
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    Preencha os dados e clique em Adicionar para incluir na lista.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-6">
                                    {/* Formulário em 2 colunas em md+ */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Coluna esquerda */}
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="acelerato" className="text-sm text-foreground">
                                                    Número do Acelerato
                                                </Label>
                                                <Input
                                                    id="acelerato"
                                                    placeholder="Digite o número"
                                                    value={acelerato}
                                                    onChange={handleAceleratoChange}
                                                    inputMode="numeric"
                                                    className="text-base hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="freeText" className="text-sm text-foreground">
                                                    Descrição do Caso (Opcional)
                                                </Label>
                                                <Textarea
                                                    id="freeText"
                                                    placeholder="Digite uma descrição"
                                                    value={freeText}
                                                    onChange={(e) => setFreeText(e.target.value)}
                                                    className="text-base hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                                                />
                                            </div>
                                        </div>

                                        {/* Coluna direita */}
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-sm text-foreground">Grau de Reparo</Label>
                                                    <span className="text-sm font-medium text-foreground">{grau[0]}</span>
                                                </div>
                                                <Slider
                                                    value={grau}
                                                    onValueChange={setGrau}
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                    className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-sm text-foreground">Tipo de Problema</Label>
                                                <RadioGroup
                                                    value={selectedOption}
                                                    onValueChange={setSelectedOption}
                                                    className="space-y-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="avaria"
                                                            id="avaria"
                                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                        />
                                                        <Label htmlFor="avaria" className="text-sm text-foreground cursor-pointer">
                                                            Avaria
                                                            <Triangle className="inline-block w-4 h-4 ml-2 mb-1" />
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="defeito"
                                                            id="defeito"
                                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                        />
                                                        <Label htmlFor="defeito" className="text-sm text-foreground cursor-pointer">
                                                            Defeito
                                                            <Square className="inline-block w-4 h-4 ml-2 mb-1" />
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="pendencia"
                                                            id="pendencia"
                                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                        />
                                                        <Label htmlFor="pendencia" className="text-sm text-foreground cursor-pointer">
                                                            Pendência
                                                            <Circle className="inline-block w-4 h-4 ml-2 mb-1" />
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botão primário em justify-end */}
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleAddItem}
                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Adicionar Item
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* LISTA - Ocupa toda a largura em mobile, 6 colunas em md+ */}
                    <div className="col-span-12 md:col-span-6">
                        <Card className="rounded-2xl shadow-sm border p-6">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-lg font-medium text-foreground">
                                    <CheckCircle className="inline-block w-5 h-5 mr-2" />
                                    Lista para Impressão
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    {items.length} {items.length === 1 ? 'item' : 'itens'} na lista
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                {items.length > 0 ? (
                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors duration-200"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-2 flex-1">
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm text-muted-foreground">Acelerato:</span>
                                                                <span className="text-base font-medium text-foreground">{item.acelerato}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm text-muted-foreground">Grau:</span>
                                                                <span className="text-sm text-foreground">{item.grau}</span>
                                                            </div>
                                                            {item.freeText && (
                                                                <div className="flex items-center space-x-3">
                                                                    <span className="text-sm text-muted-foreground">Descrição:</span>
                                                                    <span className="text-sm text-foreground">{item.freeText}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center space-x-4">
                                                                {item.avaria && (
                                                                    <div className="flex items-center space-x-1 text-sm text-foreground">
                                                                        <Triangle className="w-4 h-4" />
                                                                        <span>Avaria</span>
                                                                    </div>
                                                                )}
                                                                {item.defeito && (
                                                                    <div className="flex items-center space-x-1 text-sm text-foreground">
                                                                        <Square className="w-4 h-4" />
                                                                        <span>Defeito</span>
                                                                    </div>
                                                                )}
                                                                {item.pendencia && (
                                                                    <div className="flex items-center space-x-1 text-sm text-foreground">
                                                                        <Circle className="w-4 h-4" />
                                                                        <span>Pendência</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 text-destructive hover:text-destructive"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Nenhum item adicionado ainda.
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => document.getElementById('acelerato')?.focus()}
                                            className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Adicionar primeiro item
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Toaster para notificações */}
            <Toaster />
        </div>
    );
}
