import axiosClient from "./axiosClient";

export const getBalance = async (walletAddress: string) => {
  const response = await axiosClient.get(`/balance/${walletAddress}`);
  return response.data;
};

export const getHistoricalBalance = async (walletAddress: string, date: string) => {
  const response = await axiosClient.get(`/balance/${walletAddress}/${date}`);
  return response.data;
};