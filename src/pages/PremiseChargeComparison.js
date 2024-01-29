import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PremiseComparisonData from '../components/PremiseComparisonData';

const PremiseChargeComparison = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Compare Premise Charges</title>
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
                 Repeat this for another estate, block, and Dwelling Rateable Value.</p>
              <p>You will see the property charges side by side.  This allows you to compare property charges across the borough.</p>
              <p>If you enter the same Dwelling Rateable Value for 2 different blocks you can see roughly what you would be charged if your flat was in a different block/estate.</p>
              <p>If you know someone on another estate with a similar property to yours, you could use their Dwelling Rateable Value as well as your own to compare your charges.</p>
              <p>You can also use this data to spot how trends and anomolies impact residents across estates.  For example whether communal energy costs disproportionately impact residents in one flat compared to another.</p>
              <p>If you sent the Dwelling Rateable Value to "1", you can get a sense of the "unit cost" for a service in each block/estate.  e.g. How much does a unit of Cleaning compare between blocks?</p>
              <p>If a cell is highlighted <span className="error-text">pink</span>, then it means we have seen evidence has miscalculated the premise charges for this service.</p>
              <p>If you spot a difference between these figures and the ones on your invoice, you should get in touch with Lambeth and query the difference.</p>
              <p>If you do not see your estate/block listed, it means we need more data.  Check out <Link to="/submitting-data">Submitting Data</Link> to see how you can help.</p>
            </div>
            <PremiseComparisonData />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PremiseChargeComparison;
