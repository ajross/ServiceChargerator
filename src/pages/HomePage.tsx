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

        <section class="home-layout">
          <div class="home-section">
            <div className="home-content">
              <h2>Welcome to Service Charge Insights!</h2>
              <h3>Compare your service charges and see whether you are getting value for money.</h3>
              <h3>See the charges for your block, estate, and your flat.</h3>
              <h3>Understand how your charges compare to the average in the borough.</h3>
            </div>
          </div>
          <div class="querying-section">
            <div className="querying-content">
              <h2>Analysis across London</h2>
              <h3>We hold data from Greenwich, Lambeth, Lewisham, Southwark, and Tower Hamlets boroughs, and more are being added soon.</h3>
              <h3>Our goal is to help you spot anomalies in your service charge and empower you with the data to succesfully challenge your charges.</h3>
              <h3>See the page on <Link to="/querying-charges">Querying Charges</Link> for more advice about what to challenge, and how.</h3>
            </div>
          </div>
          <div class="cross-borough-analysis">
            <Link to="/borough-analysis-2022-2023">
              <div className="analysis-content">
                <h2>Cross-Borough Analysis for 2022-2023</h2>
                <h3>See an analysis of service charges across multiple boroughs in London.</h3>
              </div>
            </Link>
          </div>
          <div class="borough-blocks">
            <section class="home-borough-layout">
              <div>
                <Link to="/greenwich">
                  <div className="borough-block">
                    <h2 className="borough-block-title">Greenwich</h2>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/lambeth">
                  <div className="borough-block">
                    <h2 className="borough-block-title">Lambeth</h2>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/lewisham">
                  <div className="borough-block">
                    <h2 className="borough-block-title">Lewisham</h2>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/southwark">
                  <div className="borough-block">
                    <h2 className="borough-block-title">Southwark</h2>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/tower-hamlets">
                  <div className="borough-block">
                    <h2 className="borough-block-title">Tower Hamlets</h2>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
