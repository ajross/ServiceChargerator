import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PremiseData from '../components/PremiseData'

const PremiseCharges = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>Premise Charges</h2>
        <PremiseData />
      </main>
    </div>
  );
};

export default PremiseCharges;
