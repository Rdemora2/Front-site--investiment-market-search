# Marketstack Explorer

<!-- ![Marketstack Explorer]() -->

## About the Project

Marketstack Explorer is a modern web application that allows users to search and analyze historical stock data using the Marketstack API. This intuitive interface provides access to financial data for over 30,000 stocks from more than 50 countries.

## Features

- **Stock Search**: Look up stock information by symbol (e.g., AAPL, MSFT, GOOGL)
- **Date Range Selection**: Filter results by specific date ranges
- **Historical Data**: View opening, closing, high, low prices, and volume data
- **Popular Stocks**: Quick access to a selection of popular market stocks
- **UTC Data Display**: Precise information display with UTC timezone

## Technologies Used

- **Frontend**:

  - React 18
  - TypeScript
  - Vite (build tool)
  - Tailwind CSS (styling)
  - Shadcn/UI (components lib)
  - React Query (state management and caching)
  - Axios (HTTP requests)
  - Zod (data validation)

- **API**:
  - Marketstack API (financial market data)

## Project Structure

```
src/
├── components/         # Reusable components
├── hooks/              # Custom hooks
├── services/           # API services
├── types/              # Type definitions
├── constants/          # Application constants
├── lib/                # Utilities and schemas
└── assets/             # Static resources
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Front-site--investiment-market-search.git
   cd Front-site--investiment-market-search
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access `http://localhost:5173` in your browser

## Production Build

```bash
npm run build
# or
yarn build
```

## Limitations

- The Marketstack API free plan has a limit of 5 requests per second
- Some fields may return null values depending on data availability

## License

This project is licensed under the MIT License
