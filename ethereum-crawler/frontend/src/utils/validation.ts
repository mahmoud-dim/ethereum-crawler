export const isValidWallet = (address: string): boolean =>
  /^0x[a-fA-F0-9]{40}$/.test(address);
