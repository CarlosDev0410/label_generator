// Função de impressão via WebUSB
export async function printViaWebUSB(zplCode: string) {
  try {
    const device = await (navigator as any).usb.requestDevice({
      filters: [{ vendorId: 0x0a5f }],
    });

    // 2. Abre a conexão com o dispositivo
    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);

    // 3. Encontra o endpoint de saída (OUT) para enviar dados
    const endpoint = device.configuration?.interfaces[0].alternate.endpoints.find(
      (e: any) => e.direction === "out"
    );

    if (!endpoint) {
      throw new Error("Não foi possível encontrar o endpoint da impressora.");
    }

    // 4. Converte o código ZPL para o formato correto (Uint8Array) e envia
    const encoder = new TextEncoder();
    const data = encoder.encode(zplCode);
    await device.transferOut(endpoint.endpointNumber, data);

    console.log("Impressão enviada com sucesso!");
    alert("Etiquetas enviadas para a impressora!");

    // 5. Fecha a conexão
    await device.close();

  } catch (error) {
    console.error("Erro ao imprimir com WebUSB:", error);
    alert("Erro ao conectar com a impressora. Verifique se ela está conectada e se você deu a permissão no navegador.");
  }
}
