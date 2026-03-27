import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Não autorizado. Token ausente.' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    const expectedToken = Buffer.from(`session:${config.appPassword}`).toString('base64');

    if (token === expectedToken) {
        return next();
    }

    return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
};
