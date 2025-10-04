import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>Ethereum Dashboard</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/balance">Balance</Link>
        <Link to="/tokens">Tokens</Link>
      </div>
    </nav>
  );
};

export default Navbar;
