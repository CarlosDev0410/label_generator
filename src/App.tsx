// TypeScript augmentation for WebUSB API
interface USBDevice {
  open(): Promise<void>;
  selectConfiguration(configurationValue: number): Promise<void>;
  claimInterface(interfaceNumber: number): Promise<void>;
  transferOut(
    endpointNumber: number,
    data: BufferSource
  ): Promise<USBOutTransferResult>;
  close(): Promise<void>;
  readonly configuration: USBConfiguration | null;
}

interface USBConfiguration {
  readonly interfaces: ReadonlyArray<USBInterface>;
}

interface USBInterface {
  readonly alternate: USBAlternateInterface;
}

interface USBAlternateInterface {
  readonly endpoints: ReadonlyArray<USBEndpoint>;
}

interface USBEndpoint {
  readonly direction: "in" | "out";
  readonly endpointNumber: number;
}

interface USBOutTransferResult {
  readonly bytesWritten: number;
  readonly status: "ok" | "stall";
}

type USB = {
  requestDevice(options: { filters: Array<{ vendorId?: number }> }): Promise<USBDevice>;
};

declare global {
  interface Navigator {
    usb: USB;
  }
}

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
    shapeZpl = `
    ; =============== Triângulo (correto) ===============
    ; Apex (406,200) | Base E (246,420) | Base D (566,420)

    ^FO300,200^GD100,220,8,B,R^FS   ; lado esquerdo  (diagonal BL->TR)
    ^FO400,200^GD100,220,8,B,L^FS   ; lado direito   (diagonal TL->BR)
    ^FO300,420^GB208,0,8^FS       ; base horizontal`;
  } else if (item.defeito) {
    optionLabel = "DEFEITO";
    // Draw a square (Graphic Box)
    shapeZpl = `
    ; ============== Quadrado ==============
    ; Posição (246,200) | Largura e Altura 220 | Espessura 8

    ^FO300,208^GB220,220,8^FS`;
  } else if (item.pendencia) {
    optionLabel = "PENDENCIA";
    // Draw a circle (Graphic Circle)
    shapeZpl = `
    ; ============== Círculo ============== 
    ; Centro (406,310) | Diâmetro 220 | Espessura 8

    ^FO300,208^GC220,8,B^FS`;
  }

  // A simple ZPL template
  const zpl = `
^XA
^PW812              ; largura 4" em 203 dpi
^LL1218             ; altura 6" em 203 dpi
^CI28               ; UTF-8
^LH0,0

; =============== Moldura =================
^FO40,40^GB732,1138,8^FS   ; caixa (x,y,width,height,espessura)

${shapeZpl}

; =============== Texto "DEFEITO" ========== 
^FO0,470
^CF0,48
^FB812,1,0,C
^FD${optionLabel}^FS

; =============== Número (ACELERATO) ========== 
^FO0,610
^CF0,120
^FB812,1,0,C
^FD#${item.acelerato}^FS

; =============== Grau de Reparo ========== 
^FO0,780
^CF0,48
^FB812,1,0,C
^FDGRAU DE REPARO:^FS

^FO0,870
^CF0,60
^FB812,1,0,C
^FD${item.grau}^FS

^XZ`;

  return zpl;
};

// Função de impressão via WebUSB (comentada)
// async function printViaWebUSB(zplCode: string) {
//   try {
//     // 1. Solicita ao usuário para selecionar a impressora Zebra
//     // O vendorId 0x0A5F é comum para impressoras Zebra.
//     const device = await navigator.usb.requestDevice({
//       filters: [{ vendorId: 0x0a5f }],
//     });
//
//     // 2. Abre a conexão com o dispositivo
//     await device.open();
//     await device.selectConfiguration(1);
//     await device.claimInterface(0);
//
//     // 3. Encontra o endpoint de saída (OUT) para enviar dados
//     const endpoint = device.configuration?.interfaces[0].alternate.endpoints.find(
//       (e) => e.direction === "out"
//     );
//
//     if (!endpoint) {
//       throw new Error("Não foi possível encontrar o endpoint da impressora.");
//     }
//
//     // 4. Converte o código ZPL para o formato correto (Uint8Array) e envia
//     const encoder = new TextEncoder();
//     const data = encoder.encode(zplCode);
//     await device.transferOut(endpoint.endpointNumber, data);
//
//     console.log("Impressão enviada com sucesso!");
//     alert("Etiquetas enviadas para a impressora!");
//
//     // 5. Fecha a conexão
//     await device.close();
//
//   } catch (error) {
//     console.error("Erro ao imprimir com WebUSB:", error);
//     alert("Erro ao conectar com a impressora. Verifique se ela está conectada e se você deu a permissão no navegador.");
//   }
// }

// Função para gerar e baixar PDF a partir do ZPL
async function saveZplAsPdf(zplCode: string) {
  try {
    // A API do Labelary espera o ZPL no corpo da requisição
    const response = await fetch("https://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/pdf', // Pede o PDF como resposta
      },
      body: zplCode
    });

    if (response.ok) {
      // Converte a resposta em um blob (arquivo)
      const blob = await response.blob();
      // Cria uma URL para o blob
      const url = window.URL.createObjectURL(blob);
      // Cria um link temporário para o download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // Define o nome do arquivo
      a.download = 'etiqueta.pdf';
      // Adiciona o link ao corpo do documento
      document.body.appendChild(a);
      // Simula o clique no link para iniciar o download
      a.click();
      // Remove o link e a URL temporária
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log("PDF gerado e download iniciado!");
    } else {
      // Se a API retornar um erro, exibe no console
      const errorText = await response.text();
      throw new Error(`Erro da API Labelary: ${errorText}`);
    }
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
    alert("Ocorreu um erro ao gerar o PDF. Verifique o console para mais detalhes.");
  }
}


function App() {
  // Form state
  const [acelerato, setAcelerato] = useState("");
  const [grau, setGrau] = useState([5]);
  const [selectedOption, setSelectedOption] = useState("");

  // List state
  const [items, setItems] = useState<Item[]>([]);

  const handleAceleratoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números no campo Acelerato
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

  // Nova função handlePrint que usa impressão em rede
  const handlePrint = () => {
    if (items.length === 0) {
      alert("Não há itens na lista para imprimir.");
      return;
    }
    
    const allZpl = items.map(generateZplForItem).join("\n");

    saveZplAsPdf(allZpl);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gerador de Etiquetas</h1>
        <Button onClick={handlePrint}>SALVAR PDF</Button>
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