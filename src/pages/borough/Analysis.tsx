import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import BoroughNavBar from '../../components/BoroughNavBar';
import AnalysisData from '../../components/AnalysisData';
import Footer from '../../components/Footer';

const Analysis = ({ borough }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Analysis</title>
        </Helmet>
      </>
      <Header />
      <BoroughNavBar borough={borough}/>
      <main>
        <div className="borough-analysis-content-container">
          <div className="home-block-container">
            <p/>
            <div className="borough-analysis-page-content">
              <h2>2022-2023 Analysis</h2>
              <h3>See how your latest invoice charges for 2022/2023 compare to the whole borough, and to other blocks and estates of a similar size.</h3>
              <p>Select your estate and block from the drop-downs to see an analysis of the charges applied to the estate/block.</p>
              <p>If you don't see your estate or block listed, please get in touch by sending an email to: <a href="mailto:hello@servicechargeinsights.com?subject=Service Chargerator Feedback">hello@servicechargeinsights.com</a>.</p>
              <p>For each service charge item for which your block is charged, you will see statistics showing the total cost of the service, and the charge per "unit" of service.
              <br/>You will find these statistics comparing your block against the average across the whole borough, and against similar sized blocks.</p>
              <p>You can download the raw data that powers this page <Link to={`/${borough}/Dataset.xlsx`}>here</Link>.</p>
            </div>
            <div className="expandable-container borough-analysis-page-content alt-color">
              <h2>How are costs calculated</h2>
              <div class="expand-button" onClick={toggleContent}>
                {isExpanded ? 'Hide this section' : 'Click to see how your costs are calculated.'}
              </div>
              {isExpanded && (
              <div className="expandable-content">
                  <p>Your service charge invoice shows you the total costs charged for each service for your estate and block, as well as the proportion you need to pay for your flat's contribution.</p>
                  <p>Charges are calculated using "Rateable Values".  An Estate has a Rateable Value (RV).  All the blocks on an estate have their own rateable value, and if you add the RVs for all the blocks on an estate, they will add up to the Estate Rateable Value.</p>
                  <p>Similarly, each flat has a "Dwelling Rateable Value", and if you add up all the flats in a block you'll get the Block Rateable Value.</p>
                  <p>Let's take Block Cleaning as an example service to see how charges are calculated, using Clare House 1-6 on the Bonham Estate.</p>
                  <p>Bonham Estate has an Estate Rateable Value of 26308.  The block Clare House 1-6 has a Block Rateable Value of 1232.  We'll imagine a 2 bed flat has a Dwelling Rateable Value of 200.</p>
                  <p>The total block cleaning charge is £1,103.32.  To work out the amount our flat will be charged we do: Total_Charge / Block_RV X Dwelling RV.</p>
                  <p>£1,103.32 / 1232 X 200 = £179.11 charged for cleaning to our flat.</p>
                  <p>Another way to think of this is that the charges will be divided into 1232 "units" and our flat will be charged for 200 of these "units".</p>
                  <p>In this example a single unit of cleaning costs £0.8955 per "unit".</p>
                  <p>If we use this method of dividing the total cost by the block rateable value to get a notional "unit cost" for each service, we can compare this cost across blocks and estates to spot anomalies.</p>
              </div>)}
            </div>
            <AnalysisData borough={borough}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
