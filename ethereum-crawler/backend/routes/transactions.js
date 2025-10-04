import express from "express";
import { ethers } from "ethers";
import provider from "../services/ethersProvider.js";

const router = express.Router();

/**
 * GET /transactions/:wallet/:startBlock
 * Returns all transactions (ETH transfers) involving wallet from startBlock up to latest.
 *
 * NOTE: scanning many blocks may be slow. For production, implement caching or indexing.
 */
router.get("/:wallet/:startBlock", async (req, res) => {
  try {
    const wallet = req.params.wallet;
    const startBlock = parseInt(req.params.startBlock, 10);

    const latestBlock = await provider.getBlockNumber();
    console.log("Latest block number:", latestBlock);
    

    if (!ethers.isAddress(wallet)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }
    if (Number.isNaN(startBlock) || startBlock < 0) {
      return res.status(400).json({ error: "Invalid startBlock" });
    }

    // const latestBlock = await provider.getBlockNumber();
    // if (startBlock > latestBlock) {
    //   return res.status(400).json({ error: "startBlock is greater than latest block" });
    // }

    const result = [];
    const WAL = wallet.toLowerCase();

    // Process blocks in chunks to avoid too many sequential awaits
    // const blockPromises = [];
    // for (let blk = b; blk <= chunkEnd; blk++) {
    //   // fetch block with all transactions included
    //   blockPromises.push(provider.getBlock(blk, true));
    // }

    // const blocks = await Promise.all(blockPromises);

    // for (const block of blocks) {
    //   if (!block || !block.transactions) continue;
    //   for (const tx of block.transactions) {
    //     if (!tx) continue;
    //     const from = tx.from?.toLowerCase();
    //     const to = tx.to?.toLowerCase();
    //     if (from === WAL || to === WAL) {
    //       result.push({
    //         hash: tx.hash,
    //         blockNumber: tx.blockNumber,
    //         timestamp: block.timestamp,
    //         from: tx.from,
    //         to: tx.to,
    //         value: ethers.formatEther(tx.value),
    //         gasUsed: tx.gasLimit?.toString?.() || null
    //       });
    //     }
    //   }
    // }


    // Process blocks in chunks to avoid too many sequential awaits
    const CHUNK_SIZE = 1; // tune as needed (smaller if rate-limited)
    for (let b = startBlock; b <= latestBlock; b += CHUNK_SIZE) {
      const chunkEnd = Math.min(b + CHUNK_SIZE - 1, latestBlock);

      // fetch blocks in parallel for the chunk
      const blockPromises = [];
      for (let blk = b; blk <= chunkEnd; blk++) {
        // ✅ fetch block including full transactions
        blockPromises.push(provider.getBlock(blk, true));
      }

      const blocks = await Promise.all(blockPromises);

      for (const block of blocks) {
        if (!block || !block.transactions) continue;
        for (const tx of block.transactions) {
          if (!tx) continue;
          const from = tx.from?.toLowerCase();
          const to = tx.to?.toLowerCase();
          if (from === WAL || to === WAL) {
            result.push({
              hash: tx.hash,
              blockNumber: tx.blockNumber,
              timestamp: block.timestamp,
              from: tx.from,
              to: tx.to,
              value: ethers.formatEther(tx.value),
              gasUsed: tx.gasLimit?.toString?.() || null
            });
          }
        }
      }
    }



    res.json({
      wallet,
      startBlock,
      latestBlock,
      txCount: result.length,
      transactions: result
    });
  } catch (err) {
    console.error("transactions route error:", err?.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
