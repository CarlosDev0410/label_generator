import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Circle, Square, Triangle, X } from "lucide-react";

// Define the type for a single item in our list
type Item = {
  id: number;
  acelerato: string;
  grau: number;
  avaria: boolean;
  defeito: boolean;
  pendencia: boolean;
};

const generateZplForItem = (item: Item): string => {
  let optionLabel = "";
  let shapeZpl = "";

  if (item.avaria) {
    optionLabel = "AVARIA";
    // Draw a triangle with graphic lines
    shapeZpl = `^FO350,40^GD80,80,4,B,L^FS^FO350,40^GD80,80,4,B,R^FS^FO312,120^GB154,4,4,B^FS`;
  } else if (item.defeito) {
    optionLabel = "DEFEITO";
    // Draw a square (Graphic Box)
    shapeZpl = `^FO350,40^GB100,100,4^FS`;
  } else if (item.pendencia) {
    optionLabel = "PENDENCIA";
    // Draw a circle (Graphic Circle)
    shapeZpl = `^FO400,90^GC100,4^FS`;
  }

  // A simple ZPL template
  const zpl = `
^XA
^PW800
^LL200
^FO50,50^A0N,40,40^FDACELERATO: ${item.acelerato}^FS
^FO50,100^A0N,40,40^FDGRAU: ${item.grau}^FS
^FO50,150^A0N,40,40^FD${optionLabel}^FS
${shapeZpl}
^XZ
`;

  return zpl;
};

function App() {
  // Form state
  const [acelerato, setAcelerato] = useState("");
  const [grau, setGrau] = useState([5]);
  const [selectedOption, setSelectedOption] = useState("");

  // List state
  const [items, setItems] = useState<Item[]>([]);

  const handleAceleratoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAcelerato(value);
    }
  };

  const handleAddItem = () => {
    if (!acelerato) {
      alert("Por favor, preencha o número do Acelerato.");
      return;
    }
    if (!selectedOption) {
      alert("Por favor, selecione uma opção (Avaria, Defeito ou Pendência).");
      return;
    }
    const newItem: Item = {
      id: Date.now(),
      acelerato,
      grau: grau[0],
      avaria: selectedOption === "avaria",
      defeito: selectedOption === "defeito",
      pendencia: selectedOption === "pendencia",
    };
    setItems([newItem, ...items]);
    setAcelerato("");
    setGrau([5]);
    setSelectedOption("");
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    if (items.length === 0) {
      alert("Não há itens na lista para imprimir.");
      return;
    }

    const allZpl = items.map(generateZplForItem).join("\n");

    // Create a blob with the ZPL content
    const blob = new Blob([allZpl], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "etiquetas.zpl";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gerador de Etiquetas</h1>
        <Button onClick={handlePrint}>IMPRIMIR</Button>
      </header>

      {/* --- FORM --- */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Adicionar Novo Item</CardTitle>
          <CardDescription>
            Preencha os dados e clique em Adicionar para incluir na lista.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="acelerato">Número do Acelerato</Label>
                <Input
                  id="acelerato"
                  placeholder="Digite o número"
                  value={acelerato}
                  onChange={handleAceleratoChange}
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Grau de Reparo</Label>
                  <span className="font-medium">{grau[0]}</span>
                </div>
                <Slider
                  value={grau}
                  onValueChange={setGrau}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4 md:pt-8">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="avaria" id="avaria" />
                  <Label htmlFor="avaria">Avaria</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="defeito" id="defeito" />
                  <Label htmlFor="defeito">Defeito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pendencia" id="pendencia" />
                  <Label htmlFor="pendencia">Pendência</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button onClick={handleAddItem} className="w-full mt-6">ADICIONAR</Button>
        </CardContent>
      </Card>

      {/* --- LIST --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Lista para Impressão</h2>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="flex flex-col">
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acelerato</p>
                    <p className="text-xl font-bold">{item.acelerato}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="-mt-2 -mr-2" onClick={() => handleRemoveItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grau de Reparo: {item.grau}</p>
                  <div className="flex gap-3 mt-2">
                    {item.avaria && <div className="flex items-center gap-1 text-sm"><Triangle className="h-4 w-4 text-yellow-500" /> Avaria</div>}
                    {item.defeito && <div className="flex items-center gap-1 text-sm"><Square className="h-4 w-4 text-red-500" /> Defeito</div>}
                    {item.pendencia && <div className="flex items-center gap-1 text-sm"><Circle className="h-4 w-4 text-blue-500" /> Pendência</div>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Nenhum item adicionado ainda.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
