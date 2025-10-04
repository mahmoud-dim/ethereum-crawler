// import { ethers } from "ethers";
// import dotenv from "dotenv";

// dotenv.config();

// const RPC = process.env.INFURA_URL;
// if (!RPC) {
//   console.error("Missing INFURA_URL in .env");
//   process.exit(1);
// }

// const provider = new ethers.JsonRpcProvider(RPC);

// export default provider;


import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const RPC = process.env.INFURA_URL;
if (!RPC) {
  console.error("❌ Missing INFURA_URL in .env");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC);

// Check connection
(async () => {
  try {
    const network = await provider.getNetwork();
    console.log(`✅ Connected to Ethereum via Infura: ${network.name} (chainId: ${network.chainId})`);
  } catch (err) {
    console.error("❌ Failed to connect to Infura:", err.message);
  }
})();

export default provider;
