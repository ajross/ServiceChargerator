import React from 'react';
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
        <BlockComparisonData />
      </main>
    </div>
  );
};

export default BlockChargeComparison;
