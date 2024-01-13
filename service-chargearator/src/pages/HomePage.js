import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <p/>
        <div className="home-content-container">
          <div className="home-block-container">
            <div className="home-content">
              <h2>Welcome to the Lambeth Service Chargerator!</h2>
              <p>This tool has been created by Lambeth residents to help each other compare service charge costs across estates and blocks in the borough.</p>
              <p>You can use it to help spot anomalies in your service charge which you can then query with Lambeth Housing Management.</p>
              <p>Remember, under the terms of your lease, service charges must be "reasonable". Whilst this is subjective, you may be able to use these tools to show how you are being overcharged in your block.</p>
              <p>For example, do you live on an estate with multiple identical blocks? If so, are you all charged the same for services?</p>
            </div>
          </div>
          <div className="home-links-content-container">
            <Link to="/block-charges">
              <div className="block-charges-content">
                <h2>Block Charges</h2>
                <p>Use the Block Charges tool to see the service charge costs for estates and blocks across the borough.</p>
              </div>
            </Link>
            <Link to="/block-charge-comparison">
              <div className="block-charge-comparison-content">
                <h2>Block Charge Comparison</h2>
                <p>Select 2 different estates/blocks and compare the block level charges side by side for any year for which we have data.</p>
              </div>
            </Link>
            <Link to="/premise-charges">
              <div className="premise-charges-content">
                <h2>Premise Charges</h2>
                <p>Enter your Dwelling Rateable Value to see the charges for your flat on your estate. Alternatively, use your Dwelling Rateable Value to see what your charges would be on a different block on the same estate.</p>
              </div>
            </Link>
            <Link to="/premise-charge-comparison">
              <div className="premise-charge-comparison-content">
                <h2>Premise Charge Comparison</h2>
                <p>Enter your Dwelling Rateable Value and select 2 different estates/blocks and compare the premise level charges side by side for any year for which we have data. This would allow you to see how much you would have to pay if your flat was in a different block.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
