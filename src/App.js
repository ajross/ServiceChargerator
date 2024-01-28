import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlockCharges from './pages/BlockCharges';
import BlockChargeComparison from './pages/BlockChargeComparison';
import PremiseCharges from './pages/PremiseCharges';
import PremiseChargeComparison from './pages/PremiseChargeComparison';
import QueryingCharges from './pages/QueryingCharges';
import SubmittingData from './pages/SubmittingData';
import About from './pages/About';
import ReactGA4 from 'react-ga4';

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA4.initialize('G-86GSPYM5EK');
  }, []);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    ReactGA4.send({ hitType: "pageview", page: currentPath });
  }, [location]);

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/block-charges" element={<BlockCharges />} />
        <Route path="/block-charge-comparison" element={<BlockChargeComparison />} />
        <Route path="/premise-charges" element={<PremiseCharges />} />
        <Route path="/premise-charge-comparison" element={<PremiseChargeComparison />} />
        <Route path="/querying-charges" element={<QueryingCharges />} />
        <Route path="/submitting-data" element={<SubmittingData />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
}

export default App;
