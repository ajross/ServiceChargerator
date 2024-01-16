import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Page1 from '../static/page1.jpg';
import Page2 from '../static/page2.jpg';

const SubmittingData = () => {
  return (
    <div>
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
            <p>Email these images to <a href="mailto:hello@servicechargeinsights.com?subject=Service Charge Data">hello@servicechargeinsights.com</a>.</p>
            <p>You are welcome to mask off the Property Address, Invoice Number, Account Number, and Property Reference Number.</p>
            <p>The sections in the red boxes must be clearly visible or we will not be able to use the data.</p>
        </div>
        <div className="image-row">
            <img src={Page1} alt="Front page of the service charge invoice." />
            <img src={Page2} alt="Back page of the service charge invoice." />
        </div>
        <div className="text-row">
           <h2>What will happen to my data/images?</h2>
            <ul>
              <li>We will enter the block level data into our database which will make it available on this site.</li>
              <li>We will <strong>NOT</strong> store your name, address, or any personally identifiable information.</li>
              <li>We will email you back to let you know that your data is available in the tool.</li>
              <li>Any images you sent us will be deleted.</li>
            </ul>
        </div>
      </div>
      </main>
    </div>
  );
};

export default SubmittingData;
