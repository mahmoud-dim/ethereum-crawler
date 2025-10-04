import React, { useState } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getTokenBalance, getTokenTransfers } from "../api/tokenService";

interface TokenBalance {
  token: string;
  balance: string;
}

interface TokenTransfer {
  contractAddress: string;
  blockNumber: number;
  transactionHash: string;
  from: string;
  to: string;
  value: string;
}

interface Props {
  tokens: unknown[];
  loading: boolean;
  wallet: string;
}

const TokensPage: React.FC<Props> = ({ loading, wallet }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [tokenTransfers, setTokenTransfers] = useState<TokenTransfer[]>([]);
  const [startBlock, setStartBlock] = useState("");
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState("");

  const handleTokenLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAddress || !wallet) return;

    setTokenLoading(true);
    setTokenError("");
    try {
      const [balanceResponse, transfersResponse] = await Promise.all([
        getTokenBalance(wallet, tokenAddress),
        getTokenTransfers(wallet, tokenAddress, parseInt(startBlock) || 0)
      ]);
      
      setTokenBalance(balanceResponse);
      setTokenTransfers(transfersResponse.transfers || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch token data";
      setTokenError(errorMessage);
    } finally {
      setTokenLoading(false);
    }
  };

  if (loading) {
    return (
  <div className="page">
        <h2>Token Analysis</h2>
        <Loader />
  </div>
);
  }

  if (!wallet) {
    return (
      <div className="page">
        <h2>Token Analysis</h2>
        <ErrorMessage message="Please search for a wallet address first" />
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Token Analysis</h2>
      
      {/* Token Lookup Section */}
      <div className="token-lookup-section">
        <h3>ERC-20 Token Lookup</h3>
        <p className="section-description">
          Enter a token contract address to view the wallet's token balance and transfer history.
          You can optionally specify a start block to scan transfers from a specific block.
        </p>
        
        <form onSubmit={handleTokenLookup} className="token-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tokenAddress">Token Contract Address:</label>
              <input
                type="text"
                id="tokenAddress"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                required
                className="token-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startBlock">Start Block (optional):</label>
              <input
                type="number"
                id="startBlock"
                placeholder="0"
                value={startBlock}
                onChange={(e) => setStartBlock(e.target.value)}
                min="0"
                className="block-input"
              />
            </div>
            <button 
              type="submit" 
              disabled={tokenLoading || !tokenAddress}
              className="lookup-token-btn"
            >
              {tokenLoading ? "Loading..." : "Analyze Token"}
            </button>
          </div>
        </form>

        {tokenError && (
          <ErrorMessage message={tokenError} />
        )}
      </div>

      {/* Token Balance Result */}
      {tokenBalance && (
        <div className="token-balance-section">
          <h3>Token Balance</h3>
          <div className="token-balance-display">
            <div className="token-info">
              <div className="token-symbol">{tokenBalance.token}</div>
              <div className="token-balance-amount">{tokenBalance.balance}</div>
            </div>
            <div className="token-details">
              <p><strong>Contract:</strong> <code>{tokenAddress}</code></p>
              <p><strong>Wallet:</strong> <code>{wallet}</code></p>
            </div>
          </div>
        </div>
      )}

      {/* Token Transfers */}
      {tokenBalance && (
        <div className="token-transfers-section">
          <h3>Token Transfer History</h3>
          <div className="transfers-header">
            <span className="transfers-count">
              {tokenTransfers.length} transfer{tokenTransfers.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="table-container">
            <table className="transfers-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Transaction Hash</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                  <th>Block</th>
                </tr>
              </thead>
              <tbody>
                {tokenTransfers.map((transfer) => {
                  const isIncoming = transfer.to.toLowerCase() === wallet.toLowerCase();
                  const isOutgoing = transfer.from.toLowerCase() === wallet.toLowerCase();
                  const type = isIncoming ? 'IN' : isOutgoing ? 'OUT' : 'INTERNAL';
                  const typeColor = isIncoming ? '#10b981' : isOutgoing ? '#ef4444' : '#6b7280';
                  
                  return (
                    <tr key={transfer.transactionHash} className="transfer-row">
                      <td className="type-cell">
                        <span 
                          className="type-badge" 
                          style={{ backgroundColor: typeColor }}
                        >
                          {type}
                        </span>
                      </td>
                      <td className="hash-cell">
                        <div className="hash-container">
                          <span className="hash-text" title={transfer.transactionHash}>
                            {transfer.transactionHash.slice(0, 10)}...{transfer.transactionHash.slice(-8)}
                          </span>
                          <button 
                            className="copy-btn" 
                            onClick={() => navigator.clipboard.writeText(transfer.transactionHash)}
                            title="Copy hash"
                          >
                            📋
                          </button>
                        </div>
                      </td>
                      <td className="address-cell">
                        <div className="address-container">
                          <span className="address-text" title={transfer.from}>
                            {transfer.from.slice(0, 6)}...{transfer.from.slice(-4)}
                          </span>
                          <button 
                            className="copy-btn" 
                            onClick={() => navigator.clipboard.writeText(transfer.from)}
                            title="Copy address"
                          >
                            📋
                          </button>
                        </div>
                      </td>
                      <td className="address-cell">
                        <div className="address-container">
                          <span className="address-text" title={transfer.to}>
                            {transfer.to.slice(0, 6)}...{transfer.to.slice(-4)}
                          </span>
                          <button 
                            className="copy-btn" 
                            onClick={() => navigator.clipboard.writeText(transfer.to)}
                            title="Copy address"
                          >
                            📋
                          </button>
                        </div>
                      </td>
                      <td className="amount-cell">
                        <div className="amount-container">
                          <span className="amount-value">{transfer.value}</span>
                          <span className="amount-token">{tokenBalance?.token || 'TOKENS'}</span>
                        </div>
                      </td>
                      <td className="block-cell">
                        <span className="block-number">{transfer.blockNumber.toLocaleString()}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {tokenTransfers.length === 0 && (
            <div className="no-transfers">
              <div className="no-transfers-icon">📭</div>
              <h4>No Token Transfers Found</h4>
              <p>No token transfers were found for this wallet and token in the specified block range.</p>
              <div className="transfer-info">
                <p><strong>Wallet:</strong> {wallet}</p>
                <p><strong>Token:</strong> {tokenAddress}</p>
                <p><strong>Start Block:</strong> {startBlock || '0 (from genesis)'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Token Examples */}
      <div className="token-examples-section">
        <h3>Popular Token Examples</h3>
        <div className="token-examples-grid">
          <div className="token-example">
            <h4>USDC (USD Coin)</h4>
            <code>0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</code>
            <p>Stablecoin pegged to USD</p>
          </div>
          <div className="token-example">
            <h4>USDT (Tether)</h4>
            <code>0xdAC17F958D2ee523a2206206994597C13D831ec7</code>
            <p>Stablecoin pegged to USD</p>
          </div>
          <div className="token-example">
            <h4>WETH (Wrapped ETH)</h4>
            <code>0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2</code>
            <p>Wrapped Ethereum token</p>
          </div>
        </div>
      </div>

      {/* Token Information */}
      <div className="token-info-section">
        <h3>About ERC-20 Tokens</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>Token Balance</h4>
            <p>Current balance of the specified ERC-20 token in the wallet.</p>
          </div>
          <div className="info-card">
            <h4>Transfer History</h4>
            <p>All token transfers (incoming and outgoing) from the specified start block.</p>
          </div>
          <div className="info-card">
            <h4>Contract Address</h4>
            <p>Each token has a unique contract address on the Ethereum blockchain.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensPage;
