import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PremiseComparisonData from '../components/PremiseComparisonData';

const PremiseChargeComparison = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>Premise Charge Comparison</h2>
        <PremiseComparisonData />
      </main>
    </div>
  );
};

export default PremiseChargeComparison;
