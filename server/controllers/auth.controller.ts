import { Request, Response } from 'express';
import { config } from '../config';

export class AuthController {
    static async login(req: Request, res: Response) {
        const { password } = req.body;

        console.log(`[Auth] Tentativa de login. Senha recebida: ${password ? '***' : 'vazia'}`);
        console.log(`[Auth] Senha esperada (tamanho): ${config.appPassword.length}`);

        if (!password) {
            return res.status(400).json({ error: 'Senha é obrigatória.' });
        }

        if (password.trim() === config.appPassword.trim()) {
            console.log('[Auth] Login bem sucedido');
            const sessionToken = Buffer.from(`session:${config.appPassword}`).toString('base64');
            return res.json({ token: sessionToken });
        }

        console.warn(`[Auth] Falha no login. Recebido: "${password}" | Esperado: "${config.appPassword}"`);
        return res.status(401).json({ error: 'Senha incorreta.' });
    }

    static async validate(req: Request, res: Response) {
        // Just returns 200 if middleware passed
        return res.json({ valid: true });
    }
}
