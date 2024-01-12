import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlockCharges from './pages/BlockCharges';
import BlockChargeComparison from './pages/BlockChargeComparison';
import PremiseCharges from './pages/PremiseCharges';
import PremiseChargeComparison from './pages/PremiseChargeComparison';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/block-charges" element={<BlockCharges />} />
        <Route path="/block-charge-comparison" element={<BlockChargeComparison />} />
        <Route path="/premise-charges" element={<PremiseCharges />} />
        <Route path="/premise-charge-comparison" element={<PremiseChargeComparison />} />
      </Routes>
    </Router>
  );
}

export default App;
