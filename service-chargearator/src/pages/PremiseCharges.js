import React from 'react';
import { Link } from 'react-router-dom';
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
        If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.
        <PremiseData />
      </main>
    </div>
  );
};

export default PremiseCharges;
