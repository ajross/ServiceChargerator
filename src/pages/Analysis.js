import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AnalysisData from '../components/AnalysisData';
import Footer from '../components/Footer';

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
              <p>You can download the raw data that powers this page <a href="Dataset.xlsx">here</a>.</p>
            </div>
            <div className="home-content">
              <h2>How costs are calculated</h2>
              <p>Your service charge invoice shows you the total costs charged for each service for your estate and block, as well as the proportion you need to pay for your flat's contribution.</p>
              <p>Charges are calculated using "Rateable Values".  An Estate has a Rateable Value.  All the blocks on an estate have their own rateable value, and if you add the RVs for all the blocks on an estate, they will add up to the Estate Rateable Value.</p>
              <p>Similarly, each flat has a "Dwelling Rateable Value", and if you add up all the flats in a block you'll get the Block Rateable Value.</p>
              <p>Let's take Block Cleaning as an example service to see how charges are calculated, using Clare House 1-6 on the Bonham Estate.</p>
              <p>Bonham Estate has an Estate Rateable Value of 26308.  The block Clare House 1-6 has a Block Rateable Value of 1232.  We'll imagine a 2 bed flat has a Dwelling Rateable Value of 200.</p>
              <p>The total block cleaning charge is £1,103.32.  To work out the amount our flat will be charged we do: Total_Charge / Block_RV X Dwelling RV.</p>
              <p>£1,103.32 / 1232 X 200 = £179.11 charged for cleaning to our flat.</p>
              <p>Another way to think of this is that the charges will be divided into 1232 "units" and our flat will be charged for 200 of these "units".</p>
              <p>In this example a single unit of cleaning costs £0.8955 per "unit".</p>
              <p>If we use this method of dividing the total cost by the block rateable value to get a notional "unit cost" for each service, we can compare this cost across blocks and estates to spot anomalies.</p>
            </div>
            <div className="home-content">
              <h2>What does this page show?</h2>
              <p>This page will help you see how your latest invoice charges for 22/23 compare to other blocks and estates of a similar size.</p>
              <p>For each service charge item for which your block is charged, you will see 2 tables.</p>
              <p>The first shows all the blocks in Lambeth with a rateable value within 500 higher or lower of your block, how much the block is charged, and the effective "unit cost" for the service at that block.</p>
              <p>The second table shows the min, max, mean, and median costs for the charge (having excluded blocks that are not charged for the service).</p>
              <p>With this information you can start to question whether your charges look reasonable given the service that was provided, and when compared with blocks of a similar size.</p>
              <p>You will need to exercise some judgement as there are legitimate reasons for charges to differ between blocks (e.g. total area to be cleaned, size of the building, etc), but if you are at all unsure you should contact the home ownership department and query your invoice.</p>
            </div>
            <AnalysisData />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
