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
        <a href="https://ko-fi.com/W7W1WJXQC" target="_blank" rel="noreferrer" className="kofiButton"><img height="36" style={{border:'0px', height:'36px'}} src="https://storage.ko-fi.com/cdn/kofi1.png?v=3" border="0" alt="Buy Me a Coffee at ko-fi.com" /></a>
      </header>
    </>
  );
};

export default Header;
