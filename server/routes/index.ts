import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Rota de autenticação
router.post('/auth/login', AuthController.login);
router.get('/auth/validate', authMiddleware, AuthController.validate);

// Rota para consulta de produtos na Wake Commerce - Protegida
router.get('/consultar-produto/:sku', authMiddleware, ProductController.getBySku);

export { router as routes };
