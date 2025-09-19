# Gerador de Etiquetas - Acelerato

Sistema moderno para geração de etiquetas de aceleratos com interface responsiva e acessível.

## ✨ Funcionalidades

- **Interface Moderna**: Design system completo com grid de 12 colunas e componentes shadcn/ui
- **Formulário Intuitivo**: Validação inline com feedback visual e estados de carregamento
- **Lista Dinâmica**: Animações suaves com Framer Motion e estados vazios informativos
- **Notificações**: Sistema de toast para feedback do usuário
- **Responsividade**: Layout adaptativo para mobile e desktop
- **Acessibilidade**: Contraste AA, labels vinculados e navegação por teclado
- **Geração de PDF**: Exportação das etiquetas em formato PDF

## 🎨 Design System

### Layout
- **Grid**: 12 colunas com gap-6
- **Cards**: rounded-2xl, shadow-sm, border
- **Espaçamento**: p-6 em cards, space-y-6 em seções, space-y-3 em itens

### Tipografia
- **Títulos de página**: text-2xl/semibold
- **Títulos de seção**: text-lg/medium  
- **Corpo**: text-sm
- **Inputs**: text-base

### Cores
- Apenas tokens do tema (bg-background, text-foreground, muted, primary, destructive)
- Suporte completo a modo escuro

### Estados Visuais
- **Hover**: opacity-90
- **Focus**: ring-2 ring-ring ring-offset-2
- **Disabled**: opacity-50
- **Animações**: duration-200, ease-out

## 🛠️ Tecnologias

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Framer Motion** - Animações
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Como usar

1. **Adicionar Item**:
   - Preencha o número do acelerato (apenas números)
   - Ajuste o grau de reparo (1-10)
   - Selecione o tipo de problema
   - Adicione descrição opcional
   - Clique em "Adicionar Item"

2. **Gerenciar Lista**:
   - Visualize todos os itens adicionados
   - Remova itens clicando no ícone X
   - Acompanhe o contador de itens

3. **Gerar PDF**:
   - Clique em "Salvar PDF" quando houver itens
   - Aguarde o processamento
   - O arquivo será baixado automaticamente

## 🏗️ Estrutura do projeto

```
src/
├── components/
│   └── ui/              # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       ├── table.tsx
│       ├── skeleton.tsx
│       └── tabs.tsx
├── lib/
│   ├── hooks/
│   │   └── use-toast.ts # Hook para notificações
│   ├── pdf.ts           # Geração de PDF
│   ├── print.ts         # Impressão
│   ├── utils.ts         # Utilitários
│   └── zpl.ts           # Geração ZPL
├── types/
│   └── item.ts          # Definições de tipos
└── App.tsx              # Componente principal
```

## ♿ Acessibilidade

- **Contraste**: Atende padrão AA
- **Navegação**: Suporte completo ao teclado
- **Labels**: Todos os inputs possuem labels vinculados
- **ARIA**: Atributos apropriados para screen readers
- **Foco**: Indicadores visuais claros

## 📱 Responsividade

- **Mobile**: Layout em coluna única
- **Tablet**: Grid de 2 colunas
- **Desktop**: Layout otimizado com sidebar
- **Breakpoints**: sm, md, lg, xl, 2xl

## 🎯 Componentes Principais

### Formulário
- Validação em tempo real
- Estados de erro com feedback visual
- Layout responsivo em 2 colunas

### Lista de Itens
- Animações de entrada/saída
- Estados vazios informativos
- Ações contextuais

### Notificações
- Toast não intrusivo
- Diferentes tipos (sucesso, erro, info)
- Auto-dismiss configurável