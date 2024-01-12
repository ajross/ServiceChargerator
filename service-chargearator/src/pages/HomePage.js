import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>Welcome to the Lambeth Service Chargerator!</h2>
        {/* Add content specific to the home page */}
      </main>
    </div>
  );
};

export default HomePage;
