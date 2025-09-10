import type { Item } from "@/types/item";

export const generateZplForItem = (item: Item): string => {
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
