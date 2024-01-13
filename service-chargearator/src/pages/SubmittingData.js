import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const SubmittingData = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <div className="text-content-container">
          <h2>Submitting Data</h2>
          {/* Add content specific to the home page */}
        </div>
      </main>
    </div>
  );
};

export default SubmittingData;
