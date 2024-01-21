import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Assuming you have a base URL that is the same for all pages
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://servicechargeinsights.com';
  const canonicalUrl = `${baseUrl}/#${location.pathname}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": canonicalUrl,
    "name": "Service Charge Insights"
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <header>
        <h1>Lambeth Service Charge Insights</h1>
      </header>
    </>
  );
};

export default Header;
