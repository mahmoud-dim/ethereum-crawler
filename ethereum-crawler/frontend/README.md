# Ethereum Crawler Frontend

A modern React application for exploring Ethereum blockchain data including wallet transactions, balances, and token information.

## Features

- 🔍 **Wallet Search**: Enter any Ethereum wallet address to explore its data
- 📊 **Transaction History**: View all transactions for a wallet from a specific block
- 💰 **Balance Lookup**: Check current ETH balance for any wallet
- 🪙 **Token Support**: Explore ERC-20 token balances and transfers
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Data**: Live data from Ethereum blockchain via backend API

## Technology Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with CSS variables

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Enter Wallet Address**: Input a valid Ethereum wallet address (0x...)
2. **Optional Start Block**: Specify a block number to start scanning from
3. **Navigate**: Use the navigation bar to view different data:
   - **Transactions**: All ETH transactions for the wallet
   - **Balance**: Current ETH balance
   - **Tokens**: Token-related functionality (coming soon)

## Example

Try searching for wallet: `0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f` starting from block `9000000`

## API Integration

The frontend communicates with the backend API endpoints:

- `GET /transactions/:wallet/:startBlock` - Get transactions
- `GET /balance/:wallet` - Get current balance
- `GET /balance/:wallet/:date` - Get historical balance
- `GET /tokens/:wallet/:tokenAddress` - Get token balance
- `GET /tokens/:wallet/:tokenAddress/:startBlock/transfers` - Get token transfers

## Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── styles/        # CSS styling
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details