# Configuração do Prisma + Supabase

## ✅ Configuração Concluída

### Banco de Dados Supabase
- **Projeto ID**: `gnglbyoevqzlggjfgrwe`
- **URL**: https://gnglbyoevqzlggjfgrwe.supabase.co
- **Host database**: `db.gnglbyoevqzlggjfgrwe.supabase.co`
- **Status**: ACTIVE_HEALTHY
- **Região**: sa-east-1 (São Paulo)

### Tabela Criada
- ✅ **produtos**: Tabela criada com sucesso
  - Colunas: `id` (UUID), `created_at` (TIMESTAMPTZ), `updated_at` (TIMESTAMPTZ)
  - RLS (Row Level Security): **Habilitado**
  - Políticas de segurança: Acesso para usuários autenticados (SELECT, INSERT, UPDATE, DELETE)
  - Trigger: `updated_at` atualizado automaticamente

### Arquivos Criados
- ✅ `prisma/schema.prisma` - Schema do Prisma configurado
- ✅ `.env` - Variáveis de ambiente (precisa configurar a senha)
- ✅ `src/lib/prisma.ts` - Cliente Prisma com singleton pattern
- ✅ `.gitignore` - Atualizado para ignorar `.env`
- ✅ `package.json` - Scripts do Prisma adicionados

## ⚠️ Problema Conhecido

O comando `prisma generate` está falhando devido a um conflito entre:
- O tipo de módulo do projeto (`"type": "module"` no package.json)
- A dependência `effect` do Prisma 7.3.0

### ✅ Solução Recomendada

Você precisa configurar a senha do banco de dados no arquivo `.env`:

```bash
# Edite o arquivo .env e substitua [YOUR-PASSWORD] pela sua senha do Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.gnglbyoevqzlggjfgrwe.supabase.co:5432/postgres"
```

Para obter a senha:
1. Acesse o painel do Supabase: https://supabase.com/dashboard/project/gnglbyoevqzlggjfgrwe
2. Vá em **Settings** → **Database**
3. Copie a **Connection string** ou crie uma nova senha

### Scripts Disponíveis

```bash
npm run db:generate   # Gerar cliente Prisma
npm run db:push       # Push do schema para o banco
npm run db:migrate    # Criar migração
npm run db:studio     # Abrir Prisma Studio
```

### Como Usar

```typescript
// Importe o cliente Prisma
import prisma from './src/lib/prisma'

// Exemplo de uso
const produtos = await prisma.produtos.findMany()
const novoProduto = await prisma.produtos.create({
  data: {
    // Adicione campos aqui quando você definir as colunas
  }
})
```

## 🔐 Segurança (RLS Policies)

As seguintes políticas foram configuradas na tabela `produtos`:

1. **SELECT**: Usuários autenticados podem ler
2. **INSERT**: Usuários autenticados podem inserir
3. **UPDATE**: Usuários autenticados podem atualizar
4. **DELETE**: Usuários autenticados podem deletar

Você pode ajustar essas políticas conforme necessário usando o MCP do Supabase ou diretamente no painel do Supabase.
