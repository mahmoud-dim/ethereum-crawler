import axiosClient from "./axiosClient";

export const getTokenBalance = async (walletAddress: string, tokenAddress: string) => {
  const response = await axiosClient.get(`/tokens/${walletAddress}/${tokenAddress}`);
  return response.data;
};

export const getTokenTransfers = async (walletAddress: string, tokenAddress: string, startBlock: number = 0) => {
  const response = await axiosClient.get(`/tokens/${walletAddress}/${tokenAddress}/${startBlock}/transfers`);
  return response.data;
};
