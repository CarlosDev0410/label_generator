# Gerador de Etiquetas Acelerato

Este projeto é uma aplicação web desenvolvida para facilitar e agilizar a criação de etiquetas no padrão ZPL (Zebra Programming Language), focada em processos de controle de qualidade e reparo.

## 🎯 Objetivos

O principal objetivo deste sistema é fornecer uma interface gráfica simples e intuitiva para que os usuários possam gerar etiquetas de identificação de forma rápida, sem a necessidade de conhecimento técnico em ZPL. A aplicação visa reduzir o tempo de operação e minimizar erros na criação das etiquetas.

## ✨ Funcionalidades

- **Criação de Itens:** Permite adicionar itens a uma lista de impressão, informando o número do Acelerato, o grau de reparo e o tipo de ocorrência (Avaria, Defeito ou Pendência).
- **Visualização em Lista:** Os itens adicionados são exibidos em uma lista clara e organizada.
- **Remoção de Itens:** É possível remover itens da lista antes da impressão.
- **Geração de Arquivo ZPL:** Ao clicar em "IMPRIMIR", o sistema gera um único arquivo `.zpl` contendo o código de todas as etiquetas da lista, pronto para ser enviado a uma impressora Zebra.
- **Representação Gráfica:** Cada tipo de ocorrência é representado por uma forma geométrica na etiqueta para fácil identificação visual:
    - **Avaria:** Triângulo
    - **Defeito:** Quadrado
    - **Pendência:** Círculo

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
    - [React](https://react.dev/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Vite](https://vitejs.dev/)
- **Estilização:**
    - [Tailwind CSS](https://tailwindcss.com/)
    - [shadcn/ui](https://ui.shadcn.com/)
- **Ícones:**
    - [Lucide React](https://lucide.dev/)
- **Linguagem de Impressão:**
    - ZPL (Zebra Programming Language)

## 🚀 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CarlosDev0410/label_generator.git
    cd label_generator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`.

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linter para análise de código.
- `npm run preview`: Inicia um servidor local para visualizar a build de produção.