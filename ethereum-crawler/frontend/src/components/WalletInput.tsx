import React, { useState } from "react";
import { isValidWallet } from "../utils/validation";

interface Props {
  onSubmit: (wallet: string, startBlock?: number) => void;
}

const WalletInput: React.FC<Props> = ({ onSubmit }) => {
  const [wallet, setWallet] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!wallet.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    if (!isValidWallet(wallet)) {
      setError("Please enter a valid Ethereum wallet address");
      return;
    }

    const blockNumber = startBlock ? parseInt(startBlock, 10) : 0;
    if (startBlock && (isNaN(blockNumber) || blockNumber < 0)) {
      setError("Please enter a valid block number");
      return;
    }

    onSubmit(wallet, blockNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="wallet-input">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter wallet address (0x...)"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className={error && !isValidWallet(wallet) ? "error" : ""}
        />
        <input
          type="number"
          placeholder="Start block (optional)"
          value={startBlock}
          onChange={(e) => setStartBlock(e.target.value)}
          min="0"
        />
        <button type="submit">Search</button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default WalletInput;
