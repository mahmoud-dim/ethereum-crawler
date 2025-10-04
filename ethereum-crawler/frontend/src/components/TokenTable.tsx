import React from "react";

interface Token {
  symbol: string;
  name: string;
  balance: number;
}

interface Props {
  tokens: Token[];
}

const TokenTable: React.FC<Props> = ({ tokens }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {tokens.map((token) => (
        <tr key={token.symbol}>
          <td>{token.symbol}</td>
          <td>{token.name}</td>
          <td>{token.balance}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TokenTable;
