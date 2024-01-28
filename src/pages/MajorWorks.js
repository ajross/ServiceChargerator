import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const MajorWorks = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Service Charge Insights - Major Works Invoice Errors</title>
        </Helmet>
      </>
      <Header />
      <NavBar />
      <main>
      <p/>
        <div className="content-container">
          <div className="text-row">
            <h2>What are Major Works?</h2>
            <p>Major Works are large scale repairs and maintenance works performed on your block.  They may include lift refurbishment, installation of double glazing, significant repairs to a roof, or any works that would cost more than £250 for any single leaseholder.</p>
            <p>Lambeth have described more about how they handle Major Works on their <Link to="https://www.lambeth.gov.uk/housing/housing-repairs/major-works-your-home">website</Link>.  They also describe the Section 20 and Section 20B notices that they must send out as part of the process.</p>
            <p>More information about what qualifies as Major Works can be found on the <Link to="https://www.lease-advice.org/advice-guide/section-20-consultation-private-landlords-resident-management-companies-agents/#s-4">Lease Advice site</Link>.</p>
          </div>
          <div className="text-row alt-color">
            <h2>Should I pay for Major Works?</h2>
            <p>Major works are undertaken to maintain, or perform significant improvements to, the places we live.  It is only fair that everyone contributes to the upkeep of the buildings in which we live.</p>
            <p>However, as the freeholder, Lambeth has certain obligations when it undertakes major works.  It is important that they notify leaseholders correctly, undertake consultations, and provide value for money for the works that are performed.</p>
            <p>There are circumstances in which you may not be technically liable to pay some or all of a major works bill, if Lambeth have not correctly performed their obligations.</p>
            <p>For example, if Lambeth did not correctly send Section 20 or Section 20B notifications you may not be liable to pay for the works.  If Lambeth sent you the invoice over 18 months after they were billed by the contractor, you may not be liable to pay for the works.</p>
            <p>This area is a tricky subject to navigate, and you should do your own investigations to confirm whether you are legally liable for the bills.  However, this page intends to list major works invoices where leaseholders have successfully removed or reduced their bill by querying Lambeth.</p>
            <p>The Lease Advice site has <Link to="https://www.lease-advice.org/advice-guide/section-20-consultation-private-landlords-resident-management-companies-agents/#s-9">further information</Link> on potential penalties if Lambeth (or any freeholder) does not comply with the rules.</p>
          </div>
          <div className="text-row">
            <h2>What to do</h2>
            <p>Have a look through the documentation you have received regarding Major Works in your block.  Try to build a timeline of events (Section 20 received, work started, Section 20B receiveed, work completed, invoice received, ...).</p>
            <p>If you have received an invoice, check whether you have received the correct Section 20 notices and whether your invoice was within 18 months of Lambeth being billed.
               You may need to contact Lambeth to verify whether notices were sent, or when they were invoiced by the contractors doing the works.</p>
            <p>Have a look through the list below and see if any of the works have already been contested successfully by other residents.</p>
            <p>If you find you are not liable to pay some or all of the invoice, you can contact us by emailing <Link to="mailto:hello@servicechargeinsights.com?subject=Major Works">hello@servicechargeinsights.com</Link> with details of the scheme works ID, and what you have found out.</p>
          </div>
          <div className="text-row alt-color">
            <h2>Cotton Gardens Estate - Ebenezer House</h2>
            <ul>
              <li>Scheme Reference: 915305/1</li>
              <li>Actual: 2015/2016 - LIFT WORKS</li>
              <li>Approx Bill: £1000 per flat</li>
              <li>Status:
                <ul>
                  <li>Lambeth has admitted Section 20 and Section 20B notices were not correctly issued.</li>
                  <li>Leaseholders have requested their invoice be cancelled or refunded.</li>
                  <li>Contact Lambeth informing them that you are aware of this fact and request they remove the invoice from your account.</li>
                  <li>If Lambeth have contacted your mortgage provider, speak to them and tell them you are contesting the charge and that they should not pay on your behalf.</li>
                  <li>If you have already made payments towards this invoice, demand that the money be refunded immediately.</li>
                </ul>
              </li>
            </ul>
            <h2>Southwyck House Estate - Southwyck House</h2>
            <ul>
              <li>Scheme Reference: 913049/1</li>
              <li>Actual: CENTRAL AREA HEATING AND GAS WORKS</li>
              <li>Approx Bill: £18,000 per flat</li>
              <li>Status:
                <ul>
                  <li>Lambeth has admitted Section 20 and Section 20B notices were not correctly issued.</li>
                  <li>Leaseholders have successfully had their bills capped at £250 and had their money refunded.</li>
                  <li>Contact Lambeth informing them that you are aware of this fact and request they remove the invoice from your account.</li>
                  <li>If Lambeth have contacted your mortgage provider, speak to them and tell them you are contesting the charge and that they should not pay on your behalf.</li>
                  <li>If you have already made payments towards this invoice, demand that the money be refunded immediately.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MajorWorks;
