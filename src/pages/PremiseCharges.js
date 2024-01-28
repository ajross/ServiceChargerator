import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PremiseData from '../components/PremiseData'

const PremiseCharges = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore Premise Charges</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
        <div className="home-content-container">
          <div className="home-block-container">
            <p/>
            <div className="home-content">
              <h2>Premise Charges</h2>
              <p>Select your estate and block from the drop-downs, and then enter the Dwelling Rateable Value found on your service charge invoice.
                 This will show you the charges that should have been applied to your property.</p>
              <p>Make sure to compare this data against the values in the invoice that Lambeth sent you.  They have made mistakes calculating the charges before.
                 If you spot a difference, you should get in touch with Lambeth and query the difference.</p>
              <p>You can also use this to spot trends and anomolies such as large cost differences from year to year, or steady increases far above inflation.</p>
              <p>If you use this data alongside the <Link to="/block-charges">Block Charges</Link> data, you can see how changes in block costs impact your property charges over time.</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
              <p>If a cell is highlighted red, then it means we have seen evidence has miscalculated the premise charges for this service.  You should compare the value on the invoice that Lambeth sent you against the value shown here.
                 If there is a difference then you should contact Lambeth and ask them to fix their mistake and refund you any over-payment.</p>
            </div>
            <PremiseData />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PremiseCharges;
