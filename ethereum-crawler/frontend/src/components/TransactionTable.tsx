import React from "react";
import { formatDate, formatHash, formatAddress } from "../utils/formatters";

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
  transactions: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  const getTransactionType = (from: string, to: string, currentWallet: string) => {
    const wallet = currentWallet.toLowerCase();
    if (from.toLowerCase() === wallet) return { type: 'OUT', label: 'OUT', color: '#ef4444' };
    if (to.toLowerCase() === wallet) return { type: 'IN', label: 'IN', color: '#10b981' };
    return { type: 'INTERNAL', label: 'INTERNAL', color: '#6b7280' };
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3>Transaction History</h3>
        <div className="transaction-count">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
        </div>
      </div>
      
      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Transaction Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Block</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const txType = getTransactionType(tx.from, tx.to, ''); // We'll need to pass current wallet
              return (
                <tr key={tx.hash} className="transaction-row">
                  <td className="type-cell">
                    <span 
                      className="type-badge" 
                      style={{ backgroundColor: txType.color }}
                    >
                      {txType.label}
                    </span>
                  </td>
                  <td className="hash-cell">
                    <div className="hash-container">
                      <span className="hash-text" title={tx.hash}>
                        {formatHash(tx.hash)}
                      </span>
                      <button 
                        className="copy-btn" 
                        onClick={() => navigator.clipboard.writeText(tx.hash)}
                        title="Copy hash"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td className="address-cell">
                    <div className="address-container">
                      <span className="address-text" title={tx.from}>
                        {formatAddress(tx.from)}
                      </span>
                      <button 
                        className="copy-btn" 
                        onClick={() => navigator.clipboard.writeText(tx.from)}
                        title="Copy address"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td className="address-cell">
                    <div className="address-container">
                      <span className="address-text" title={tx.to}>
                        {formatAddress(tx.to)}
                      </span>
                      <button 
                        className="copy-btn" 
                        onClick={() => navigator.clipboard.writeText(tx.to)}
                        title="Copy address"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td className="value-cell">
                    <div className="value-container">
                      <span className="value-amount">{tx.value}</span>
                      <span className="value-currency">ETH</span>
                    </div>
                  </td>
                  <td className="block-cell">
                    <span className="block-number">{tx.blockNumber.toLocaleString()}</span>
                  </td>
                  <td className="date-cell">
                    <span className="date-text">{formatDate(tx.timestamp.toString())}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="no-transactions">
          <div className="no-transactions-icon">📭</div>
          <h3>No transactions found</h3>
          <p>This wallet has no transactions in the specified block range.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
