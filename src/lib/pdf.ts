import { PDFDocument } from 'pdf-lib';

/**
 * Gera e baixa um PDF a partir de uma lista de códigos ZPL.
 * Para garantir que o layout de cada etiqueta seja independente (evitando "drifts" ou deslocamentos),
 * cada código ZPL é enviado individualmente para o Labelary e os PDFs resultantes são mesclados.
 */
export async function saveZplAsPdf(
  zplCodes: string[],
  widthInches: number = 2.3622,
  heightInches: number = 3.14961,
  fileName: string = 'etiqueta.pdf',
  onProgress?: (current: number, total: number) => void
) {
  try {
    const total = zplCodes.length;
    const individualPdfs: Uint8Array[] = [];

    // 1. Buscar cada etiqueta individualmente para garantir isolamento total de estado
    for (let i = 0; i < total; i++) {
      if (onProgress) onProgress(i + 1, total);

      const zpl = zplCodes[i];
      const response = await fetch(`https://api.labelary.com/v1/printers/8dpmm/labels/${widthInches}x${heightInches}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/pdf',
        },
        body: zpl
      });

      if (!response.ok) {
        throw new Error(`Erro na API do Labelary (Item ${i + 1}): ${response.statusText}`);
      }

      const pdfBytes = await response.arrayBuffer();
      individualPdfs.push(new Uint8Array(pdfBytes));

      // Delay obrigatório de 400ms para respeitar o limite da API gratuita do Labelary (3 req/segundo)
      // Isso evita o erro quando geramos mais de uma etiqueta por vez.
      if (total > 1) {
        await new Promise(resolve => setTimeout(resolve, 400));
      }
    }

    // 2. Mesclar todos os PDFs individuais em um só usando pdf-lib
    const mergedPdf = await PDFDocument.create();

    for (const pdfBytes of individualPdfs) {
      const donorPdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // 3. Gerar o arquivo final e baixar
    const mergedPdfBytes = await mergedPdf.save();
    // Usamos o Uint8Array diretamente. O cast para any resolve a incompatibilidade 
    // restrita do TypeScript entre ArrayBufferLike e BlobPart.
    const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    // Limpeza
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}
