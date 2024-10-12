import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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
            <p>This tool has been created by a leaseholder who is fed up with being overcharged for poorly delivered services, and charged for services that were never even provided.</p>
            <p>It is entirely independent of any council and is powered by data obtained through FOI requests and provided by other residents.</p>
            <p>As landlords, councils have a duty to provide services to maintain the buildings in which we live, and to charge a <strong>reasonable</strong> amount for doing so.</p>
            <p>Unfortunately, they frequently make errors by charging for services that were not delivered, miscalculating charges, and overcharging for poor quality services.</p>
            <p>This has a real impact on our lives and livelihoods.  Horrendous service charges are driving residents to try to sell up and move from their homes and communities.
               Sadly, high service charges often make it difficult to find a buyer.</p>
            <p>Experiences of leaseholders show that the councils do not seem to be making much effort to improve their management of the housing stock, or the way they manage service charges, so it is up to residents to
               hold them to account for the quality and cost of services that are provided.</p>
            <p>If you have any feedback on this site, a feature idea, or would like to help out, please send an email to: <a href="mailto:hello@servicechargeinsights.com?subject=Service Charge Insights Feedback">hello@servicechargeinsights.com</a></p>
          </div>
          <div className="text-row">
            <h2>Is your borough missing?</h2>
            <p>I have started with London boroughs, beginning in the south with Lambeth and then the neighbouring boroughs.</p>
            <p>It can take over a month for councils to respond to FOI requests and provide data in a usable format, and that's on top of the work to integrate the data into the website.</p>
            <p>If your borough isn't available yet, please drop me an email at <a href="mailto:hello@servicechargeinsights.com?subject=Add my borough next please">hello@servicechargeinsights.com</a>
            to tell me which borough you live in, and (if you like) some of the problems you face.</p>
            <p>Currently I am only focusing on London borough councils, but it may be possible to expand outside London if they have similar methods of calculating charges.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
