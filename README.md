# Ethereum Crawler

## Description
Ethereum Crawler is a full-stack application that allows users to view transaction data from the Ethereum blockchain associated with a specific wallet address. Users can input a wallet address `W` and a starting block `B` to fetch all transactions to and from that wallet. The app also displays ETH balances, historical balances for a given date, and token transfers (ERC-20) in a human-readable web interface.

**Key features:**
- View all ETH transactions associated with a wallet.  
- Fetch historical ETH balances by date.  
- View ERC-20 token transfers for a wallet.  
- User-friendly interface built with React and TailwindCSS.  
- Backend powered by Node.js and ethers.js, connecting to Infura.  

## Version
**v1.0.0**

## Technologies Used
**Backend:** Node.js (min 22), Express.js, ethers.js, Infura API  
**Frontend:** React (TypeScript) + Vite, TailwindCSS  
**Tools:** npm, Postman, Axios  

## Project Structure
**Frontend**
 ```frontend/
 src/
│
├── api/
│   ├── axiosClient.js         # Centralized HTTP client (base URL, interceptors)
│   ├── balanceService.js
│   ├── transactionService.js
│   └── tokenService.js
│
├── components/
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── WalletInput.jsx
│   ├── TransactionTable.jsx
│   ├── TokenTable.jsx
│   └── ErrorMessage.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── TransactionsPage.jsx
│   ├── BalancePage.jsx
│   └── TokensPage.jsx
│
├── hooks/
│   ├── useFetch.js
│   └── useWalletData.js
│
├── utils/
│   ├── formatters.js
│   ├── constants.js
│   └── validation.js
│
├── styles/
│   ├── variables.css
│   ├── layout.css
│   └── components.css
│
├── App.jsx
├── main.jsx
└── index.css

 ```
**Backend**
```backend/
├─ package.json
├─ server.js
├─ routes/
│ ├─ transactions.js
│ ├─ balance.js
│ └─ tokens.js
├─ services/
│ ├─ ethersProvider.js
│ └─ tokenService.js
├─ .env.example
└─ README.md 
```

## Prerequisites
- Node.js version 22 or higher  
- npm  
- Internet connection (required for Infura/Etherscan API)  

## Environment Variables
Create a `.env` file in the backend folder (copy `.env.example`) and set:
INFURA_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
PORT=5000
Replace `YOUR_PROJECT_ID` with your Infura project ID.

## Setup Instructions
**Backend**
git clone <your-repo-link>
cd backend
npm install
npm start
Backend runs at: http://localhost:5000

**Frontend**
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

## Usage

Open `http://localhost:5173` in your browser.

Enter a wallet address and start block (use latest backend block - 5 for faster results).

Navigate pages to view:

- **Transactions:** ETH transactions
- **Balance:** Current and historical balances
- **Tokens:** ERC-20 token transfers

## API Endpoints

**Base URL:** `http://localhost:5000`

| Endpoint | Description |
|----------|-------------|
| `/transactions/:address/:startBlock` | Fetch transactions from start block |
| `/balance/:address` | Fetch current ETH balance |
| `/balance/:address/:YYYY-MM-DD` | Fetch ETH balance at a specific date |
| `/tokens/:wallet/:tokenAddress` | Fetch token balance |
| `/tokens/:wallet/:tokenAddress/:startBlock/transfers` | Fetch token transfers from a start block |

**Exemples**
http://localhost:5000/transactions/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f/23491210
http://localhost:5000/balance/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f
http://localhost:5000/balance/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f/2023-01-01
http://localhost:5000/tokens/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
http://localhost:5000/tokens/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/23491151/transfers

## Limitations / Notes
- Fetching from early blocks may take time. Use latest backend block - 5 for faster testing.
- Ensure wallet addresses are valid. Invalid addresses return errors.
