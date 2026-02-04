import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

// Rota para consulta de produtos na Wake Commerce
router.get('/consultar-produto/:sku', ProductController.getBySku);

export { router as routes };
