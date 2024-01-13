import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const QueryingCharges = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
      <p/>
        <div className="content-container">
          <div className="text-row">
            <h2>Querying Charges</h2>
            <p>Some info about querying charges.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueryingCharges;
