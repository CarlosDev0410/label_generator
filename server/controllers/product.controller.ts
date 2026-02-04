import { Request, Response } from 'express';
import { WakeService } from '../services/wake.service';

export class ProductController {
    static async getBySku(req: Request, res: Response) {
        const sku = req.params.sku as string;

        if (!sku) {
            return res.status(400).json({ error: 'SKU é obrigatório.' });
        }

        try {
            console.log(`Buscando produto SKU: ${sku}...`);
            const product = await WakeService.getProductBySku(sku);
            return res.json(product);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error(`Erro no controller [ProductController.getBySku]: ${message}`);

            const status = message.includes('não encontrado') ? 404 : 500;
            return res.status(status).json({
                error: message,
                details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
            });
        }
    }
}
