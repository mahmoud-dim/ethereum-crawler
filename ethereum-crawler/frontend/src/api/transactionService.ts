import axiosClient from "./axiosClient";

export const getTransactions = async (walletAddress: string, startBlock: number = 0) => {
  const response = await axiosClient.get(`/transactions/${walletAddress}/${startBlock}`);
  return response.data;
};
