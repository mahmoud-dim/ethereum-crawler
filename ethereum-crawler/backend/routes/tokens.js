import express from "express";
import { ethers } from "ethers";
import provider from "../services/ethersProvider.js";
import { getTokenBalance } from "../services/tokenService.js";

const router = express.Router();

const ERC20_TRANSFER_TOPIC = ethers.id("Transfer(address,address,uint256)");
const ERC20_ABI = ["event Transfer(address indexed from, address indexed to, uint256 value)"];
const ERC20_IFACE = new ethers.Interface(ERC20_ABI);

/**
 * GET /tokens/:wallet/:tokenAddress
 * Return ERC-20 token balance for given token contract
 */
router.get("/:wallet/:tokenAddress", async (req, res) => {
  try {
    const { wallet, tokenAddress } = req.params;
    if (!ethers.isAddress(wallet) || !ethers.isAddress(tokenAddress)) {
      return res.status(400).json({ error: "Invalid wallet or token address" });
    }

    const tokenInfo = await getTokenBalance(tokenAddress, wallet);
    if (!tokenInfo) return res.status(500).json({ error: "Failed to fetch token info" });
    return res.json({ wallet, tokenAddress, ...tokenInfo });
  } catch (err) {
    console.error("token balance error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /tokens/:wallet/:startBlock/transfers
 * Return ERC20 Transfer logs involving wallet from startBlock -> latest
 */
// router.get("/:wallet/:startBlock/transfers", async (req, res) => {
//   try {
//     const wallet = req.params.wallet;
//     const startBlock = parseInt(req.params.startBlock, 10);
//     if (!ethers.isAddress(wallet) || Number.isNaN(startBlock)) {
//       return res.status(400).json({ error: "Invalid wallet or startBlock" });
//     }

//     const latest = await provider.getBlockNumber();

//     // Filter: topic0 = Transfer; topics 1 and 2 are indexed from/to
//     // We can't specify token contract address here (we'll search across all contracts),
//     // but provider.getLogs requires an address OR block range and topics - leaving address undefined
//     // might be heavy for large ranges. We'll query logs in chunks to be safer.
//     const WAL = wallet.toLowerCase();
//     const logsResult = [];

//     const CHUNK = 20000; // chunk size for blocks (tune as needed)
//     for (let from = startBlock; from <= latest; from += CHUNK) {
//       const to = Math.min(from + CHUNK - 1, latest);
//       const filter = {
//         fromBlock: from,
//         toBlock: to,
//         topics: [ERC20_TRANSFER_TOPIC]
//       };

//       const logs = await provider.getLogs(filter);
//       for (const log of logs) {
//         try {
//           const parsed = ERC20_IFACE.parseLog(log);
//           // parsed.args = [from, to, value]
//           const fromAddr = parsed.args.from.toLowerCase();
//           const toAddr = parsed.args.to.toLowerCase();
//           if (fromAddr === WAL || toAddr === WAL) {
//             logsResult.push({
//               contractAddress: log.address,
//               blockNumber: log.blockNumber,
//               transactionHash: log.transactionHash,
//               from: parsed.args.from,
//               to: parsed.args.to,
//               value: parsed.args.value.toString()
//             });
//           }
//         } catch (err) {
//           // ignore logs that can't be parsed by this interface
//         }
//       }
//     }

//     return res.json({
//       wallet,
//       startBlock,
//       latestBlock: latest,
//       transfersCount: logsResult.length,
//       transfers: logsResult
//     });
//   } catch (err) {
//     console.error("token transfers error:", err?.message || err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



/**
 * GET /tokens/:wallet/:tokenAddress/:startBlock/transfers
 * Return ERC20 Transfer logs involving wallet from startBlock -> latest
 */
router.get("/:wallet/:tokenAddress/:startBlock/transfers", async (req, res) => {
  try {
    const { wallet, tokenAddress } = req.params;
    const startBlock = parseInt(req.params.startBlock, 10);

    if (!ethers.isAddress(wallet) || !ethers.isAddress(tokenAddress) || Number.isNaN(startBlock)) {
      return res.status(400).json({ error: "Invalid wallet, token address or startBlock" });
    }

    const WAL = wallet.toLowerCase();
    const latest = await provider.getBlockNumber();
    const logsResult = [];

    const CHUNK = 5000; // safer block chunk
    for (let from = startBlock; from <= latest; from += CHUNK) {
      const to = Math.min(from + CHUNK - 1, latest);

      const filter = {
        address: tokenAddress,   // ✅ restrict to this token contract
        fromBlock: from,
        toBlock: to,
        topics: [ERC20_TRANSFER_TOPIC]
      };

      const logs = await provider.getLogs(filter);
      for (const log of logs) {
        try {
          const parsed = ERC20_IFACE.parseLog(log);
          const fromAddr = parsed.args.from.toLowerCase();
          const toAddr = parsed.args.to.toLowerCase();
          if (fromAddr === WAL || toAddr === WAL) {
            logsResult.push({
              contractAddress: log.address,
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash,
              from: parsed.args.from,
              to: parsed.args.to,
              value: parsed.args.value.toString()
            });
          }
        } catch (err) {
          // ignore non-ERC20 logs
        }
      }
    }

    return res.json({
      wallet,
      tokenAddress,
      startBlock,
      latestBlock: latest,
      transfersCount: logsResult.length,
      transfers: logsResult
    });
  } catch (err) {
    console.error("token transfers error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
