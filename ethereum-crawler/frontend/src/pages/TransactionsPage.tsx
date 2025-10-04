import React from "react";
import TransactionTable from "../components/TransactionTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  timestamp: number;
  gasUsed?: string;
}

interface Props {
  data: Transaction[];
  loading: boolean;
  wallet: string;
}

const TransactionsPage: React.FC<Props> = ({ data, loading, wallet }) => {
  if (loading) {
    return (
      <div className="page">
        <h2>Transactions</h2>
        <Loader />
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="page">
        <h2>Transactions</h2>
        <ErrorMessage message="Please search for a wallet address first" />
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Transaction Analysis</h2>
      
      {/* Wallet Info Section */}
      <div className="wallet-info-section">
        <h3>Wallet Information</h3>
        <div className="wallet-info-display">
          <div className="wallet-address">
            <span className="wallet-label">Wallet Address:</span>
            <code className="wallet-code">{wallet}</code>
          </div>
          <div className="transaction-stats">
            <div className="stat-item">
              <span className="stat-number">{data.length}</span>
              <span className="stat-label">Total Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="transactions-analysis-section">
        <h3>Transaction History</h3>
        {data.length === 0 ? (
          <div className="no-transactions">
            <div className="no-transactions-icon">📭</div>
            <h4>No Transactions Found</h4>
            <p>No transactions were found for this wallet in the specified block range.</p>
            <div className="transaction-info">
              <p><strong>Wallet:</strong> {wallet}</p>
              <p><strong>Status:</strong> No transactions in range</p>
            </div>
          </div>
        ) : (
          <TransactionTable transactions={data} />
        )}
      </div>

      {/* Transaction Information */}
      <div className="transaction-info-section">
        <h3>About Transaction Analysis</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>ETH Transactions</h4>
            <p>All Ethereum (ETH) transfers involving this wallet address.</p>
          </div>
          <div className="info-card">
            <h4>Block Range</h4>
            <p>Transactions scanned from the specified start block to the current block.</p>
          </div>
          <div className="info-card">
            <h4>Transaction Types</h4>
            <p>IN (receiving), OUT (sending), or INTERNAL transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
