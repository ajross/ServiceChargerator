import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import EstateDropdown from '../components/EstateDropdown'

const BlockCharges = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>Block Charges</h2>
        <EstateDropdown />
        {/* Add content specific to the home page */}
      </main>
    </div>
  );
};

export default BlockCharges;
