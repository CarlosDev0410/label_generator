import express from 'express';
import cors from 'cors';
import { config } from './config';
import { routes } from './routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling basic
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(config.port, () => {
    console.log(`[BFF] Servidor rodando profissionalmente em http://localhost:${config.port}`);
});
