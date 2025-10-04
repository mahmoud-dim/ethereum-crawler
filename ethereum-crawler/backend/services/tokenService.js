import { ethers } from "ethers";
import provider from "./ethersProvider.js";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

/**
 * Return { token: symbol, balance: string } or null on error
 */
export async function getTokenBalance(tokenAddress, walletAddress) {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const [rawBalance, decimals, symbol] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
      contract.symbol()
    ]);

    const balance = ethers.formatUnits(rawBalance, decimals);
    return { token: symbol, balance };
  } catch (err) {
    console.error("getTokenBalance error:", err?.message || err);
    return null;
  }
}
