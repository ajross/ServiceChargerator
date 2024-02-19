import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import EstateBlockDropdowns from '../components/EstateBlockDropdowns';

const BlockCharges = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore Block Charges</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Block Charges</h2>
              <p>Select your estate and block from the drop-downs to see the charges applied to the estate/block.</p>
              <p>You can use this to spot trends and anomalies such as large cost differences from year to year, or steady increases far above inflation.</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
              <p>If a cell is highlighted <span className="error-text">pink</span>, then it means we have seen evidence Lambeth has miscalculated the premise charges for this service.</p>
              <p>You should compare the value on the invoice that Lambeth sent you against the value shown on the <Link to="/premise-charges">Premise Charges</Link> page.</p>
              <p>If there is a difference then you should contact Lambeth and ask them to fix their mistake and refund you any over-payment.</p>
            </div>
            <EstateBlockDropdowns />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlockCharges;
