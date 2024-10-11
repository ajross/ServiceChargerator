import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoroughHomePage from './pages/BoroughHomePage';
import BlockCharges from './pages/BlockCharges';
import BlockChargeComparison from './pages/BlockChargeComparison';
import PremiseCharges from './pages/PremiseCharges';
import PremiseChargeComparison from './pages/PremiseChargeComparison';
import QueryingCharges from './pages/QueryingCharges';
import MajorWorks from './pages/MajorWorks';
import SubmittingData from './pages/SubmittingData';
import Analysis from './pages/Analysis';
import About from './pages/About';
import ReactGA4 from 'react-ga4';

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/:borough" element={<PageWrapper Component={BoroughHomePage} />} />
        <Route path="/:borough/block-charges" element={<PageWrapper Component={BlockCharges} />} />
        <Route path="/:borough/block-charge-comparison" element={<PageWrapper Component={BlockChargeComparison} />} />
        <Route path="/:borough/premise-charges" element={<PageWrapper Component={PremiseCharges} />} />
        <Route path="/:borough/premise-charge-comparison" element={<PageWrapper Component={PremiseChargeComparison} />} />
        <Route path="/:borough/querying-charges" element={<PageWrapper Component={QueryingCharges} />} />
        <Route path="/:borough/major-works" element={<PageWrapper Component={MajorWorks} />} />
        <Route path="/:borough/submitting-data" element={<PageWrapper Component={SubmittingData} />} />
        <Route path="/:borough/analysis" element={<PageWrapper Component={Analysis} />} />
      </Routes>
    </Router>
  );
}

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA4.initialize('G-86GSPYM5EK');
  }, []);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    ReactGA4.send({ hitType: "pageview", page: currentPath });
  }, [location]);

  return null;
}

function PageWrapper({ Component }) {
  const { borough } = useParams();
  return <Component borough={borough} />;
}

export default App;
