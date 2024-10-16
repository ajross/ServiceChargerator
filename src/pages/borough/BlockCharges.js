import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import BoroughNavBar from '../../components/BoroughNavBar';
import EstateBlockDropdowns from '../../components/EstateBlockDropdowns';
import Footer from '../../components/Footer';

const BlockCharges = ({ borough }) => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore Block Charges</title>
        </Helmet>
      </>
      <Header />
      <BoroughNavBar borough={borough}/>
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Block Charges</h2>
              <p>Select your estate and block from the drop-downs to see the charges applied to the estate/block.</p>
              <p>You can use this to spot trends and anomalies such as large cost differences from year to year, or steady increases far above inflation.</p>
              <p>If you don't see your estate or block listed, please get in touch by sending an email to: <a href="mailto:hello@servicechargeinsights.com?subject=Service Chargerator Feedback">hello@servicechargeinsights.com</a>.</p>
              <p>If a cell is <span className="error-text">highlighted</span>, then it means we have seen evidence that your council has miscalculated the premise charges for this service.
              <br/>You should compare the value on the invoice that your council sent you against the value shown on the <Link to="/premise-charges">Premise Charges</Link> page.
              <br/>If there is a difference then you should contact your council and ask them to fix their mistake and refund you any over-payment.</p>
            </div>
            <EstateBlockDropdowns borough={borough}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlockCharges;
