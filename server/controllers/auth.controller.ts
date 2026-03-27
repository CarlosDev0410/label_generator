import { Request, Response } from 'express';
import { config } from '../config';

export class AuthController {
    static async login(req: Request, res: Response) {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Senha é obrigatória.' });
        }

        if (password === config.appPassword) {
            // Simple session token (for simplicity without extra packages like JWT)
            // In a real app we'd use JWT. Here we return a simple but masked token.
            const sessionToken = Buffer.from(`session:${config.appPassword}`).toString('base64');
            return res.json({ token: sessionToken });
        }

        return res.status(401).json({ error: 'Senha incorreta.' });
    }

    static async validate(req: Request, res: Response) {
        // Just returns 200 if middleware passed
        return res.json({ valid: true });
    }
}
