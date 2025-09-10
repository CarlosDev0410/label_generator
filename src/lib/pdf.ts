// Função para gerar e baixar PDF a partir do ZPL
export async function saveZplAsPdf(zplCodes: string[]) {
  try {
    const zpl = zplCodes.join('\n');
    // A API do Labelary espera o ZPL no corpo da requisição
    const response = await fetch("https://api.labelary.com/v1/printers/8dpmm/labels/4x6/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/pdf', // Pede o PDF como resposta
      },
      body: zpl
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
