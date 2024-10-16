import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import BoroughNavBar from '../../components/BoroughNavBar';
import Footer from '../../components/Footer';
import { formatBoroughFromProp } from '../../utils/TextUtils';


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
          <div class="full-width">
            <div className="borough-home-content">
              <h2>{formatBoroughFromProp(borough)} Service Charge Insights!</h2>
              <p>Read an analysis of the service charges for your block, and see how they compare to others in the borough.</p>
              <p>Analyse the service charges for your block or flat using the sections below.</p>
            </div>
          </div>
          <div className="full-width borough-analysis-content">
            <Link to="/analysis">
              <div className="borough-analysis">
                <h2>2022-2023 Service Charge Analysis</h2>
                <h3>See how the service charges for your block compares against average costs in the borough and similar sized blocks.</h3>
                <h3>Generate a summary email which you can use to request specific information about your charges from your council.</h3>
              </div>
            </Link>
          </div>
          <div className="grid-container">
              <div className="grid-item">
                <Link to="/block-charges">
                  <div className="block-charges">
                    <h2>Block Charges</h2>
                    <h3>View the service charges for your block and how they change over time (where data is available).</h3>
                  </div>
                </Link>
              </div>
              <div className="grid-item">
                <Link to="/block-charge-comparison">
                  <div className="block-comparison">
                    <h2>Block Charge Comparison</h2>
                    <h3>Compare the service charges for your block against others in the borough.</h3>
                  </div>
                </Link>
              </div>
              <div className="grid-item">
                <Link to="/premise-charges">
                  <div className="dwelling-charges">
                    <h2>Premise Charges</h2>
                    <h3>View the service charges for your flat and how they change over time (where data is available).</h3>
                  </div>
                </Link>
              </div>
              <div className="grid-item">
                <Link to="/premise-charge-comparison">
                  <div className="dwelling-comparison">
                    <h2>Premise Charge Comparison</h2>
                    <h3>Compare the service charges for your flat against others in the borough.</h3>
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
