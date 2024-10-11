import React from 'react';
import { Link } from 'react-router-dom';

const BoroughNavBar = ({ borough }) => {
  return (
    <nav>
      <Link to={"/"}>Home</Link><span className="separator">|</span>
      <Link to={`/${borough}/analysis`}>2022-2023 Analysis</Link><span className="separator">|</span>
      <Link to={`/${borough}/block-charges`}>Block Charges</Link><span className="separator">|</span>
      <Link to={`/${borough}/block-charge-comparison`}>Block Charge Comparison</Link><span className="separator">|</span>
      <Link to={`/${borough}/premise-charges`}>Premise Charges</Link><span className="separator">|</span>
      <Link to={`/${borough}/premise-charge-comparison`}>Premise Charge Comparison</Link><span className="separator">|</span>
      <Link to={`/${borough}/querying-charges`}>Querying Charges</Link><span className="separator">|</span>
      <Link to={`/${borough}/major-works`}>Major Works</Link>
    </nav>
  );
};

export default BoroughNavBar;
