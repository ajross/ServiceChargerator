import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link><span className="separator">|</span>
      <Link to="/block-charges">Block Charges</Link><span className="separator">|</span>
      <Link to="/block-charge-comparison">Block Charge Comparison</Link><span className="separator">|</span>
      <Link to="/premise-charges">Premise Charges</Link><span className="separator">|</span>
      <Link to="/premise-charge-comparison">Premise Charge Comparison</Link><span className="separator">|</span>
      <Link to="/querying-charges">Querying Charges</Link><span className="separator">|</span>
      <Link to="/submitting-data">Submitting Data</Link><span className="separator">|</span>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default NavBar;
