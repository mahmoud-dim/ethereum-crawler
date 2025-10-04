import React from "react";
import WalletInput from "../components/WalletInput";

interface Props {
  onSearch: (wallet: string, startBlock?: number) => void;
}

const HomePage: React.FC<Props> = ({ onSearch }) => (
  <div className="home-page">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-icon">🔍</span>
          Ethereum Blockchain Crawler
        </h1>
        <p className="hero-subtitle">
          Explore transaction data from the Ethereum blockchain. View wallet addresses, 
          ETH amounts, and transaction history starting from any block.
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Blocks Scanned</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">0x</span>
            <span className="stat-label">Wallet Addresses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">ETH</span>
            <span className="stat-label">Transactions</span>
          </div>
        </div>
      </div>
    </section>

    {/* Task Description */}
    <section className="task-section">
      <div className="task-content">
        <h2 className="section-title">📋 Task Overview</h2>
        <div className="task-grid">
          <div className="task-card">
            <h3>🎯 Core Requirements</h3>
            <ul>
              <li>View transaction data for any wallet address</li>
              <li>Scan from a specific starting block (B)</li>
              <li>Display wallet addresses and ETH amounts</li>
              <li>Show ALL transaction data in human-readable format</li>
            </ul>
          </div>
          <div className="task-card">
            <h3>⭐ Bonus Features</h3>
            <ul>
              <li>Historical balance lookup by date (YYYY-MM-DD)</li>
              <li>Token support (ERC-20 tokens)</li>
              <li>Real-time blockchain data</li>
              <li>Professional visualization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Search Section */}
    <section className="search-section">
      <div className="search-content">
        <h2 className="section-title">🚀 Get Started</h2>
        <p className="search-description">
          Enter a wallet address to explore its transaction history. You can optionally 
          specify a start block number to begin scanning from a specific block.
        </p>
        <WalletInput onSubmit={onSearch} />
        
        <div className="example-section">
          <h3>📝 Example Usage</h3>
          <div className="example-card">
            <div className="example-item">
              <span className="example-label">Wallet Address:</span>
              <code className="example-code">0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f</code>
            </div>
            <div className="example-item">
              <span className="example-label">Start Block:</span>
              <code className="example-code">Choose</code>
            </div>
            <div className="example-item">
              <span className="example-label">Result:</span>
              <span className="example-result">All transactions from your choosen block to current block</span>
            </div>
            <div className="example-item">
              <span className="example-label">Token Example:</span>
              <code className="example-code">0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="features-section">
      <div className="features-content">
        <h2 className="section-title">✨ Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Wallet Analysis</h3>
            <p>Comprehensive analysis of any Ethereum wallet address with detailed transaction history.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⛓️</div>
            <h3>Block Scanning</h3>
            <p>Scan transactions starting from any specific block number to the current block.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>ETH Tracking</h3>
            <p>Track ETH amounts for all incoming and outgoing transactions with precise calculations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Data Visualization</h3>
            <p>Professional data presentation similar to Etherscan with clean, readable tables.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Historical Data</h3>
            <p>Look up exact ETH balance at any specific date and time (YYYY-MM-DD format).</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🪙</div>
            <h3>ERC-20 Token Support</h3>
            <p>Complete ERC-20 token analysis including balance lookup and transfer history from any start block.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
