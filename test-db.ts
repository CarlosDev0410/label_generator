// Script para testar a conexão com o banco de dados via Prisma
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        // Testar conexão
        await prisma.$connect()
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso!')

        // Listar tabelas
        const result = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `
        console.log('📋 Tabelas encontradas:', result)

    } catch (error) {
        console.error('❌ Erro ao conectar ao banco:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
