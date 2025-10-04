import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import BalancePage from './pages/BalancePage';
import TokensPage from './pages/TokensPage';
import { useWalletData } from './hooks/useWalletData';
import './styles/variables.css';
import './styles/layout.css';
import './styles/components.css';

function App() {
  const [currentWallet, setCurrentWallet] = useState<string>('');
  const { transactions, balance, loading, error, fetchWalletData } = useWalletData();

  const handleWalletSearch = async (wallet: string, startBlock?: number) => {
    setCurrentWallet(wallet);
    await fetchWalletData(wallet, startBlock);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          {error && (
            <div className="error" style={{ margin: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onSearch={handleWalletSearch} />} 
            />
            <Route 
              path="/transactions" 
              element={
                <TransactionsPage 
                  data={transactions} 
                  loading={loading}
                  wallet={currentWallet}
                />
              } 
            />
            <Route 
              path="/balance" 
              element={
                <BalancePage 
                  balance={balance} 
                  loading={loading}
                  wallet={currentWallet}
                />
              } 
            />
            <Route 
              path="/tokens" 
              element={
                <TokensPage 
                  tokens={[]} 
                  loading={loading}
                  wallet={currentWallet}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
