import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const QueryingCharges = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
      <p/>
        <div className="content-container">
          <div className="text-row">
            <h2>Why Query Your Service Charge?</h2>
            <p>Every April Lambeth sends you an estimate for your service charge bill for the year, and expects you to either pay it all at once, or make monthly installments.
            18 Months later you get an "actual" bill once Lambeth have worked out how much they actually spent, and they will either credit you back any over-payment, or (more likely)
            they will ask for more money from you.</p>
            <p>You have very little control over what services are provided to your block, and have very little control over how much the council decides to spend.</p>
            <p>As your freeholder, Lambeth is obliged under the terms of your lease to charge a "reasonable" amount for the services it provides.</p>
            <p>If you look at your service charge bill, can you honestly say you are clear what service is being provided for the amount you are being charged?</p>
            <p>Do you have any idea how Lambeth justifies the prices it charges?</p>
            <p>Unless you know the answer to these questions, you should be querying Lambeth to ensure you have been charged correctly.</p>
            <p><strong>This is your money, your livelihood, and if you do not know how it is being spent, then how do you know it is not being wasted?</strong></p>
          </div>
          <div className="text-row alt-color">
            <h2>What to Query?</h2>
            <p>Service charge invoices are not simple, and a lot of information is witheld or obscured by Lambeth.  Do not worry if it seems complicated - just take it step by step.</p>
            <p><Link to="https://youtu.be/sGygJZQz6Eo">This talk</Link> (given at the AGM of the Lambeth Homeowners Association) will talk you through a practical example of things you can look for in your invoice that you may want to query.</p>

            <div className="video-responsive">
              <iframe
                src="https://www.youtube.com/embed/sGygJZQz6Eo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
          <div className="text-row">
            <h2>An Example</h2>
            <p>Below is a subset of the data for the last 2 years at Southwyck House.  If we look at the figures, we can spot some unusual charges that we might want to query.</p>
            <p>The notes in the table could form a numbered list of questions that you could send to housing management.</p>
            <p>The goal is to either get a reasonable explanation as to why the costs are high, or to have the costs corrected to reasonable values.</p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Charge Type</th><th>2022</th><th>2023</th><th>What could be queried?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Block Boiler Repairs and Maintenance</td><td>£0.00</td><td>£60,351.48</td><td>There was no charge last year, so why such a massive increase this year?</td></tr>
                  <tr><td>Block Cleaning</td><td>£40,238.55</td><td>£53,203.48</td><td>This increase looks to be greater than inflation.  What caused the increase if there was no change to the service?</td></tr>
                  <tr><td>Block Communal Electricity</td><td>£64,868.52</td><td>£76,404.18</td><td>Although energy costs are generally high, this is a lot of money for communal lights and lifts.  It would be worth requesting the meter data including consumption, unit rates, and standing charges.</td></tr>
                  <tr><td>Block Communal Electrical Maintenance</td><td>£0.00</td><td>£8,472.29</td><td>There was no charge last year, so why such a massive increase this year?</td></tr>
                  <tr><td>Block Communal Ventilation Maintenance</td><td>£2,207.18</td><td>£8,478.37</td><td>Why has this increased 4-fold?  In this block there is no communal ventilation system, so what work was actually done?</td></tr>
                  <tr><td>Block Concierge</td><td>£244,295.79</td><td>£254,692.01</td><td>A concierge is an expensive service, but the increase is unusual given the hours are fixed.  What caused this increase?</td></tr>
                  <tr><td>Block Dry Riser</td><td>£3,760.47</td><td>£6,898.87</td><td>Why has the cost for this doubled?  What work was done?</td></tr>
                  <tr><td>Block Repairs and Maintenance</td><td>£61,646.87</td><td>£99,399.64</td><td>This is a huge increase in ad-hoc repairs.  Request further details of the jobs and then look through to spot work that should not have been recharged.  In the case of Southwyck House it was found that residents were being charged over £7000 for servicing car barriers which have not functioned for 6 years!</td></tr>
                  <tr><td>Block TV Aerial</td><td>£1,054.62</td><td>£2,097.39</td><td>Why did this cost double?  What work was done?</td></tr>
                  <tr><td>Estate Communal Electricity</td><td>£0.00</td><td>£19,101.04</td><td>Why is there such a massive increase in communal electricity on the estate?  Is this an accounting error?</td></tr>
                  <tr><td>Estate Grounds Maintenance</td><td>£16,005.26</td><td>£10,353.87</td><td>Although the cost has reduced, the grass was only cut around 5 times during the year.  How is this cost justified?</td></tr>
                  <tr><td>Estate Tree Maintenance</td><td>£453.49</td><td>£1,345.63</td><td>What tree maintenance was performed during the year?</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-row alt-color">
            <h2>How to Query?</h2>
            <p>Email is your best route, as Lambeth does not have a good case management system in which you could raise a ticket.</p>
            <p>Send your email to <a href="mailto:HMhomeownership@lambeth.gov.uk?subject=Service Charge Query">HMhomeownership@lambeth.gov.uk</a>.</p>
            <p>Try to keep your email clear and to the point.  It will be helpful to try and deal with just one or 2 issues at a time or the email chain will get confusing.</p>
            <p>If you use numbered lists in your email, it will make it easier to refer back to your points at a later date.</p>
            <p>Lambeth are not very prompt responding to these queries, so patience is a virtue.  However, you should chase them if you have not had a response within 10 working days.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueryingCharges;
