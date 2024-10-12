import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Explore Service Charges Across London Boroughs</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
        <p/>
        <div className="home-content-container">
          <div className="home-block-container">
            <div className="home-content">
              <h2>Welcome to Service Charge Insights!</h2>
              <p>With this site you can compare your service charges and see whether you are getting value for money.</p>
              <p>You can see the overall charges for your block and estate, as well as the amount charged to your flat.</p>
              <p>You can also compare your block or flat charges against others in your borough.</p>
              <p>We hold data from Greenwich, Lambeth, Lewisham, Southwark, and Tower Hamlets boroughs, and more are being added soon.</p>
              <p>For each borough, there is an analysis page that shows how your charges compare against the average for the borough, and for similar sized blocks in the borough.</p>
              <p>Our goal is to help you spot anomalies in your service charge and empower you with the data to succesfully challenge these charges with your council's housing management department.</p>
              <p>See the page on <Link to="/querying-charges">Querying Charges</Link> for more advice about what to challenge, and how.</p>
            </div>
          </div>
          <div className="home-block-container">
            <Link to="/borough-analysis-2022-2023">
              <div className="analysis-content">
                <h2>Cross-Borough Analysis for 2022-2023</h2>
                <p>See an analysis of service charges across multiple boroughs in London.</p>
                <p>We compare all the data to find which borough charges the most and least for common services.</p>
                <p>Read our analysis to understand how your borough is performing.</p>
                <p>Consider using this information to lobby your local councillor to hold your council to account.</p>
              </div>
            </Link>
          </div>
          <div className="home-links-content-container">
            <Link to="/greenwich">
              <div className="block-charges-content">
                <h2 className="borough-block-title">Greenwich</h2>
              </div>
            </Link>
            <Link to="/lambeth">
              <div className="block-charges-content">
                <h2 className="borough-block-title">Lambeth</h2>
              </div>
            </Link>
            <Link to="/lewisham">
              <div className="block-charges-content">
                <h2 className="borough-block-title">Lewisham</h2>
              </div>
            </Link>
            <Link to="/southwark">
              <div className="block-charges-content">
                <h2 className="borough-block-title">Southwark</h2>
              </div>
            </Link>
            <Link to="/tower-hamlets">
              <div className="block-charges-content">
                <h2 className="borough-block-title">Tower Hamlets</h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
