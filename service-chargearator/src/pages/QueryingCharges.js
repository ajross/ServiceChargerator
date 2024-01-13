import React from 'react';
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
            <p>As your freeholder, Lambeth is obligated under the terms of your lease to charge a "reasonable" amount for the services it provides.</p>
            <p>If you look at your service charge bill, can you honestly say you are clear what service is being provided for the amount you are being charged?</p>
            <p>Do you have any idea how Lambeth justifies the prices it charges?</p>
            <p>Unless you know the answer to these questions, you should be querying Lambeth to ensure you have been charged correctly.
            This is your money, your livelihood, and if you do not know how it is being spent, then how do you know it is not being wasted?</p>
          </div>
          <div className="text-row">
            <h2>What to Query?</h2>
            <p>Some info about querying charges.</p>
          </div>
          <div className="text-row">
            <h2>How to Query?</h2>
            <p>Some info about querying charges.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueryingCharges;
