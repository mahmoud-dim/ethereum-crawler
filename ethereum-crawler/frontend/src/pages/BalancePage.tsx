import React, { useState } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getHistoricalBalance } from "../api/balanceService";

interface Props {
  balance: string;
  loading: boolean;
  wallet: string;
}

const BalancePage: React.FC<Props> = ({ balance, loading, wallet }) => {
  const [historicalBalance, setHistoricalBalance] = useState<string>("");
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [historicalDate, setHistoricalDate] = useState("");
  const [historicalError, setHistoricalError] = useState("");

  const handleHistoricalLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!historicalDate || !wallet) return;

    setHistoricalLoading(true);
    setHistoricalError("");
    try {
      const response = await getHistoricalBalance(wallet, historicalDate);
      setHistoricalBalance(response.balance);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch historical balance";
      setHistoricalError(errorMessage);
    } finally {
      setHistoricalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>ETH Balance</h2>
        <Loader />
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="page">
        <h2>ETH Balance</h2>
        <ErrorMessage message="Please search for a wallet address first" />
      </div>
    );
  }

  return (
    <div className="page">
      <h2>ETH Balance Analysis</h2>
      
      {/* Current Balance */}
      <div className="balance-section">
        <h3>Current Balance</h3>
        <div className="balance-display">
          <div className="balance-amount">{balance} ETH</div>
          <div className="balance-label">Current ETH Balance</div>
        </div>
        <div className="wallet-info">
          <strong>Wallet:</strong> <code>{wallet}</code>
        </div>
      </div>

      {/* Historical Balance */}
      <div className="historical-section">
        <h3>Historical Balance Lookup</h3>
        <p className="section-description">
          Get the exact ETH balance at any specific date and time (YYYY-MM-DD format).
        </p>
        
        <form onSubmit={handleHistoricalLookup} className="historical-form">
          <div className="form-group">
            <label htmlFor="date">Date (YYYY-MM-DD):</label>
            <input
              type="date"
              id="date"
              value={historicalDate}
              onChange={(e) => setHistoricalDate(e.target.value)}
              required
              className="date-input"
            />
            <button 
              type="submit" 
              disabled={historicalLoading || !historicalDate}
              className="lookup-btn"
            >
              {historicalLoading ? "Looking up..." : "Lookup Balance"}
            </button>
          </div>
        </form>

        {historicalError && (
          <ErrorMessage message={historicalError} />
        )}

        {historicalBalance && (
          <div className="historical-result">
            <h4>Historical Balance Result</h4>
            <div className="balance-display historical">
              <div className="balance-amount">{historicalBalance} ETH</div>
              <div className="balance-label">
                Balance on {new Date(historicalDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Balance Information */}
      <div className="balance-info">
        <h3>About ETH Balances</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>Current Balance</h4>
            <p>The real-time ETH balance of the wallet at the latest block.</p>
          </div>
          <div className="info-card">
            <h4>Historical Balance</h4>
            <p>Exact ETH balance at 00:00 UTC on the specified date.</p>
          </div>
          <div className="info-card">
            <h4>Block-based Lookup</h4>
            <p>Uses binary search to find the closest block to the target timestamp.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
