# Tivix Finmarket Explorer

<!-- ![Tivix Finmarket Explorer]() -->

## Sobre o Projeto

Tivix Finmarket Explorer é uma aplicação web moderna que permite aos usuários pesquisar e analisar dados históricos de ações utilizando a API Marketstack. Esta interface intuitiva oferece acesso a dados financeiros de mais de 30.000 ações de mais de 50 países.

## Funcionalidades

- **Pesquisa de Ações**: Busque informações de ações por símbolo (ex: AAPL, MSFT, GOOGL)
- **Seleção de Período**: Filtre os resultados por intervalo de datas específico
- **Dados Históricos**: Visualize dados de abertura, fechamento, máxima, mínima e volume
- **Ações Populares**: Acesso rápido a uma seleção de ações populares do mercado
- **Exibição de Dados em UTC**: Visualização precisa das informações com fuso horário UTC

## Tecnologias Utilizadas

- **Frontend**:

  - React 18
  - TypeScript
  - Vite (build tool)
  - Tailwind CSS (estilização)
  - Shadcn/UI (lib de componentes visuais)
  - React Query (gerenciamento de estado e cache)
  - Axios (requisições HTTP)
  - Zod (validação de dados)

- **API**:
  - Marketstack API (dados de mercado financeiro)

## Estrutura do Projeto

src/
├── components/ # Componentes reutilizáveis
├── hooks/ # Custom hooks
├── services/ # Serviços de API
├── types/ # Definição de tipos
├── constants/ # Constantes do aplicativo
├── lib/ # Utilidades e schemas
└── assets/ # Recursos estáticos

## Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/Front-site--investiment-market-search.git
   cd Front-site--investiment-market-search
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse `http://localhost:5173` no seu navegador

## Build para Produção

```bash
npm run build
# ou
yarn build
```

## Limitações

- A API Marketstack no plano gratuito tem um limite de 5 requisições por segundo
- Alguns campos podem retornar valores nulos dependendo da disponibilidade dos dados

## Licença

Este projeto está licenciado sob a licença MIT
