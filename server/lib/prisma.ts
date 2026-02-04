import { PrismaClient } from '@prisma/client'

// Singleton pattern para evitar múltiplas instâncias do Prisma Client
// Especialmente importante em ambientes de desenvolvimento onde o hot-reload pode criar várias instâncias

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma
