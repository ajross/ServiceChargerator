import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const About = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - About This Site</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
      <p/>
        <div className="content-container">
          <div className="text-row">
            <h2>About</h2>
            <p>This tool has been created by a Lambeth leaseholder, fed up with being overcharged for poorly delivered services, and charged for services that were never even provided.</p>
            <p>It is entirely independent of Lambeth Council and is powered by data obtained through FOI requests and provided by other residents.</p>
            <p>Lambeth Council has a duty to provide services to maintain the buildings in which we live, and to charge a <strong>reasonable</strong> amount for doing so.</p>
            <p>Unfortunately, they frequently make errors by charging for services that were not delivered, miscalculating charges, and overcharging for poor quality services.</p>
            <p>This has a real impact on our lives and livelihoods.  Horrendous service charges are driving residents to try to sell up and move from their homes and communities.
               Sadly, high service charges often make it difficult to find a buyer.</p>
            <p>Lambeth does not seem to be making much effort to improve their management of the housing stock, or the way they manage service charges, so it is up to residents to
               hold them to account for the quality and cost of services that are provided.</p>
            <p>If you have any feedback on this site, a feature idea, or would like to help out, please send an email to: <a href="mailto:hello@servicechargeinsights.com?subject=Service Chargerator Feedback">hello@servicechargeinsights.com</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
