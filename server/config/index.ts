import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    wakeToken: process.env.WAKE_TOKEN,
};

// Validate critical config
if (!config.wakeToken) {
    console.warn('AVISO: WAKE_TOKEN não foi configurado no arquivo .env');
}
