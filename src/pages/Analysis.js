import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AnalysisData from '../components/AnalysisData';

const Analysis = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Analysis</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>2022-2023 Analysis</h2>
              <p>Select your estate and block from the drop-downs to see an analysis of the charges applied to the estate/block.</p>
              <p>If you don't see your estate or block listed, please get in touch by sending an email to: <a href="mailto:hello@servicechargeinsights.com?subject=Service Chargerator Feedback">hello@servicechargeinsights.com</a>.</p>
            </div>
            <AnalysisData />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
