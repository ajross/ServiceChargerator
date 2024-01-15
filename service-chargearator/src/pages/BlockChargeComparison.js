import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import BlockComparisonData from '../components/BlockComparisonData';

const BlockChargeComparison = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>Block Charge Comparison</h2>
        If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.
        <BlockComparisonData />
      </main>
    </div>
  );
};

export default BlockChargeComparison;
