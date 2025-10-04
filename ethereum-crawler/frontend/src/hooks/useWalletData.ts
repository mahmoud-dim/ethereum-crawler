import { useState } from "react";
import { getTransactions } from "../api/transactionService";
import { getBalance } from "../api/balanceService";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  timestamp: number;
  gasUsed?: string;
}

export const useWalletData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async (wallet: string, startBlock: number = 0) => {
    setLoading(true);
    setError(null);
    try {
      const [txResponse, balResponse] = await Promise.all([
        getTransactions(wallet, startBlock),
        getBalance(wallet),
      ]);
      
      // Handle transaction response
      if (txResponse && txResponse.transactions) {
        setTransactions(txResponse.transactions);
      } else {
        setTransactions([]);
      }
      
      // Handle balance response
      if (balResponse && balResponse.balance) {
        setBalance(balResponse.balance);
      } else {
        setBalance("0");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch wallet data";
      setError(errorMessage);
      console.error("Error fetching wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { transactions, balance, loading, error, fetchWalletData, setError };
};
