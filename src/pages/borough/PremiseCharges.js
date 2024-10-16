import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import BoroughNavBar from '../../components/BoroughNavBar';
import PremiseData from '../../components/PremiseData'
import Footer from '../../components/Footer';

const PremiseCharges = ({ borough }) => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore Premise Charges</title>
        </Helmet>
      </>
      <Header />
      <BoroughNavBar borough={borough}/>
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Premise Charges</h2>
              <p>Select your estate and block from the drop-downs, and then enter the Dwelling Rateable Value found on your service charge invoice.
                 This will show you the charges that should have been applied to your property.</p>
              <p>Make sure to compare this data against the values in the invoice that Lambeth sent you.  They have made mistakes calculating the charges before.</p>
              <p>If a cell is highlighted <span className="error-text">pink</span>, then it means we have seen evidence Lambeth has miscalculated the premise charges for this service.</p>
              <p>If you spot a difference between these figures and the ones on your invoice, you should get in touch with Lambeth and query the difference.</p>
              <p>You can also use this page to spot trends and anomalies such as large cost differences from year to year, or steady increases far above inflation.</p>
              <p>If you use this data alongside the <Link to="/block-charges">Block Charges</Link> data, you can see how changes in block costs impact your property charges over time.</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
            </div>
            <PremiseData />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremiseCharges;
