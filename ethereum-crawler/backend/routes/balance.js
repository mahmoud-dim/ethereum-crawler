import express from "express";
import { ethers } from "ethers";
import provider from "../services/ethersProvider.js";

const router = express.Router();

/**
 * GET /balance/:wallet
 * Returns current ETH balance
 */
router.get("/:wallet", async (req, res) => {
  try {
    const wallet = req.params.wallet;
    if (!ethers.isAddress(wallet)) return res.status(400).json({ error: "Invalid wallet address" });

    const balance = await provider.getBalance(wallet);
    return res.json({ wallet, balance: ethers.formatEther(balance) });
  } catch (err) {
    console.error("balance current error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /balance/:wallet/:date
 * Historical ETH balance at given date's 00:00 UTC.
 * date must be YYYY-MM-DD
 */
// router.get("/:wallet/:date", async (req, res) => {
//   try {
//     const wallet = req.params.wallet;
//     const dateStr = req.params.date;

//     if (!ethers.isAddress(wallet)) return res.status(400).json({ error: "Invalid wallet address" });
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return res.status(400).json({ error: "Date must be YYYY-MM-DD" });

//     const targetTimestamp = Math.floor(new Date(dateStr + "T00:00:00Z").getTime() / 1000);

//     // Binary search for block with timestamp >= targetTimestamp
//     let low = 0;
//     let high = await provider.getBlockNumber();
//     let foundBlock = null;

//     while (low <= high) {
//       const mid = Math.floor((low + high) / 2);
//       const block = await provider.getBlock(mid);
//       if (!block) break;

//       if (block.timestamp === targetTimestamp) {
//         foundBlock = block;
//         break;
//       } else if (block.timestamp < targetTimestamp) {
//         low = mid + 1;
//       } else {
//         foundBlock = block;
//         high = mid - 1;
//       }
//     }

//     if (!foundBlock) {
//       return res.status(404).json({ error: "No block found near that date" });
//     }

//     // We want the block at or immediately before targetTimestamp:
//     let chosenBlock = foundBlock;
//     if (foundBlock.timestamp > targetTimestamp) {
//       // step back one block if possible
//       const prev = await provider.getBlock(foundBlock.number - 1);
//       if (prev && prev.timestamp <= targetTimestamp) chosenBlock = prev;
//     }

//     const balance = await provider.getBalance(wallet, chosenBlock.number);
//     return res.json({
//       wallet,
//       date: dateStr,
//       blockNumber: chosenBlock.number,
//       blockTimestamp: chosenBlock.timestamp,
//       balance: ethers.formatEther(balance)
//     });
//   } catch (err) {
//     console.error("balance historical error:", err?.message || err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


router.get("/:wallet/:date", async (req, res) => {
  try {
    const { wallet, date } = req.params;
    if (!ethers.isAddress(wallet)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const targetTs = Math.floor(new Date(date).getTime() / 1000);
    if (!targetTs) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    let low = 0;
    let high = await provider.getBlockNumber();
    let blockNumber = null;

    // Binary search for block closest to timestamp
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const block = await provider.getBlock(mid);
      if (!block) break;

      if (block.timestamp < targetTs) {
        low = mid + 1;
      } else {
        blockNumber = mid;
        high = mid - 1;
      }
    }

    if (!blockNumber) {
      return res.status(404).json({ error: "No block found for given date" });
    }

    const block = await provider.getBlock(blockNumber);
    const balance = await provider.getBalance(wallet, blockNumber);

    res.json({
      wallet,
      date,
      blockNumber,
      blockTimestamp: block.timestamp,
      balance: ethers.formatEther(balance)
    });
  } catch (err) {
    console.error("historical balance error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
