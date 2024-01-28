import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import EstateBlockDropdowns from '../components/EstateBlockDropdowns';

const BlockCharges = () => {
  return (
    <div>
      <Helmet>
        <title>Service Charge Insights - Explore Block Charges</title>
      </Helmet>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Block Charges</h2>
              <p>Select your estate and block from the drop-downs to see the charges applied to the estate/block.</p>
              <p>You can use this to spot trends and anomolies such as large cost differences from year to year, or steady increases far above inflation.</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
            </div>
            <EstateBlockDropdowns />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlockCharges;
