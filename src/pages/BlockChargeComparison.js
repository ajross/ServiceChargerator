import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import BlockComparisonData from '../components/BlockComparisonData';

const BlockChargeComparison = () => {
  return (
    <div>
      <Helmet>
        <title>Service Charge Insights - Compare Block Charges</title>
      </Helmet>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Block ChargeComparison</h2>
              <p>Select your 2 estates and blocks from the drop-downs to see the charges applied to both estate/blocks side by side.</p>
              <p>You can use this to identify large differences in costs between like-for-like blocks (e.g. 2 blocks on the same estate).</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
            </div>
            <BlockComparisonData />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlockChargeComparison;
