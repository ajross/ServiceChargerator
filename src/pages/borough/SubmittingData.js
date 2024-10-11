import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Page1 from '../../static/page1.jpg';
import Page2 from '../../static/page2.jpg';
import Footer from '../../components/Footer';

const SubmittingData = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Contribute Your Data</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
      <p/>
      <div className="content-container">
        <div className="text-row">
            <h2>Submitting Data</h2>
            <p>This site is only as good as the data we have available.  We need your help to provide service charge data across the borough.</p>
            <p>Only one person from each block needs to send us their data, and we can calculate the charges per flat using the same formula as Lambeth uses.</p>
            <p>To submit your data, scan or take a photo of the <strong>Actual</strong> (not the estimate) service charge invoice that you were sent by Lambeth in September.</p>
            <p>Email these images to <Link to="mailto:hello@servicechargeinsights.com?subject=Service Charge Data">hello@servicechargeinsights.com</Link>.</p>
            <p>You are welcome to mask off the Property Address, Invoice Number, Account Number, and Property Reference Number.</p>
            <p>Below is an example of the pictures to send in.</p>
            <p>The sections in the red boxes must be clearly visible or we will not be able to use the data.</p>
        </div>
        <div className="image-row">
            <img src={Page1} alt="Front page of the service charge invoice." />
            <img src={Page2} alt="Back page of the service charge invoice." />
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmittingData;
