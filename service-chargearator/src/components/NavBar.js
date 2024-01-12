import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/block-charges">Block Charges</Link>
      <Link to="/block-charge-comparison">Block Charge Comparison</Link>
      <Link to="/premise-charges">Premise Charges</Link>
      <Link to="/premise-charge-comparison">Premise Charge Comparison</Link>
    </nav>
  );
};

export default NavBar;
