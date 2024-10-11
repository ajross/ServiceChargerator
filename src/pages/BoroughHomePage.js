import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import BoroughNavBar from '../components/BoroughNavBar';
import Footer from '../components/Footer';
import { formatBoroughFromProp } from '../utils/TextUtils';


const BoroughHomePage = ({ borough }) => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore {formatBoroughFromProp(borough)} Service Charges</title>
        </Helmet>
      </>
      <Header />
      <BoroughNavBar borough={borough}/>
      <main>
        <p/>
        <div className="home-content-container">
          <div className="home-block-container">
            <div className="home-content">
              <h2>Welcome to {formatBoroughFromProp(borough)} Service Charge Insights!</h2>
              <p>This tool has been created by Lambeth residents to help each other compare leasehold service charge costs across estates and blocks in the borough.</p>
              <p>You can use it to help spot anomalies in your service charge which you can then query with Lambeth Housing Management.</p>
              <p>Remember, under the terms of your lease, service charges must be "reasonable". Whilst this is subjective, you may be able to use these tools to show how you are being overcharged in your block.</p>
              <p>See the page on <Link to="/querying-charges">Querying Charges</Link> for more advice about what to challenge, and how.</p>
              <p>This site is only as good as the data we have available.  You can help!  See our page on <Link to="Submitting Data">Submitting Data</Link> to see how you can help!</p>
            </div>
          </div>
          <div className="home-block-container">
            <Link to="/analysis">
              <div className="analysis-content">
                <h2>{formatBoroughFromProp(borough)} 2022-2023 Service Charge Analysis</h2>
                <p>See how the service charge for your block compares against the rest of the blocks in the borough.</p>
                <p>Identify how each charge compares to the average cost across the borough, and to similar sized blocks.</p>
                <p>Dive into the data to see the charges for all blocks/estates of a similar size.</p>
                <p>Use this information to identify anomalies in your service charges which you can then query.</p>
              </div>
            </Link>
          </div>
          <div className="home-links-content-container">
            <Link to="/block-charges">
              <div className="block-charges-content">
                <h2>Block Charges</h2>
                <p>Use the Block Charges tool to see the service charge costs for estates and blocks across the borough.</p>
                <p>Look at trends for how costs have changed over time.</p>
                <p>Spot anomalies where costs have appeared or changed suddenly with no explanation.</p>
              </div>
            </Link>
            <Link to="/block-charge-comparison">
              <div className="block-charge-comparison-content">
                <h2>Block Charge Comparison</h2>
                <p>Select 2 different estates/blocks and compare the block level charges side by side for any year for which we have data.</p>
                <p>See whether blocks on the same estate are charged the same amount for the same service.</p>
                <p>Find other blocks you could collaborate with when querying charges.</p>
              </div>
            </Link>
            <Link to="/premise-charges">
              <div className="premise-charges-content">
                <h2>Premise Charges</h2>
                <p>Enter your Dwelling Rateable Value to see the charges for your flat on your estate.</p>
                <p>Compare the values shown here with those on the statement Lambeth sent you, and spot where they made an error!  They have made errors before and you should claim this back!</p>
                <p>Alternatively, use your Dwelling Rateable Value to see what your charges would be on a different block on the same estate.</p>
              </div>
            </Link>
            <Link to="/premise-charge-comparison">
              <div className="premise-charge-comparison-content">
                <h2>Premise Charge Comparison</h2>
                <p>Enter your Dwelling Rateable Value and select 2 different estates/blocks.</p>
                <p>Compare the premise level charges side by side for any year for which we have data.</p>
                <p>See how much you would have to pay if your flat was in a different block.</p>
                <p>Identify services for which you are disproportionately charged.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BoroughHomePage;
