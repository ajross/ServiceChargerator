import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const BoroughAnalysisTwTwTwTh = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Cross Borough Analysis for 2022-2023</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
      <p/>
        <div className="content-container">
          <div className="text-row">
            <h2>Borough Analysis 2022 2023</h2>
            <p>An analysis of charges across multiple boroughs.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BoroughAnalysisTwTwTwTh;
