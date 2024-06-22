import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import BlockComparisonData from '../components/BlockComparisonData';
import Footer from '../components/Footer';

const BlockChargeComparison = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Compare Block Charges</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Block Charge Comparison</h2>
              <p>Select your 2 estates and blocks from the drop-downs to see the charges applied to both estate/blocks side by side.</p>
              <p>You can use this to identify large differences in costs between like-for-like blocks (e.g. 2 blocks on the same estate).</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
              <p>If a cell is highlighted <span className="error-text">pink</span>, then it means we have seen evidence Lambeth has miscalculated the premise charges for this service.</p>
              <p>You should compare the value on the invoice that Lambeth sent you against the value shown on the <Link to="/premise-charges">Premise Charges</Link> page.</p>
              <p>If there is a difference then you should contact Lambeth and ask them to fix their mistake and refund you any over-payment.</p>
            </div>
            <BlockComparisonData />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlockChargeComparison;
