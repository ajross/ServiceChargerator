import React, { useState } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';

const EstateBlockDropdowns = () => {
  const [selectedEstate, setSelectedEstate] = useState(null);

  const handleEstateSelect = (id) => {
    console.log('Selected Estate ID:', id); // Debugging
    setSelectedEstate(id);
  };

  return (
    <div>
      <EstateDropdown onEstateSelect={handleEstateSelect} />
      <BlockDropdown estateId={selectedEstate} />
    </div>
  );
};

export default EstateBlockDropdowns;
