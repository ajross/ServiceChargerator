import React, { useState } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import ChargesTable from './ChargesTable';

const EstateBlockDropdowns = () => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleEstateSelect = (id) => {
    console.log('Selected Estate ID:', id); // Debugging
    setSelectedEstate(id);
    setSelectedBlock(null); // Reset block selection when estate changes
  };

  const handleBlockSelect = (id) => {
    console.log('Selected Block ID:', id); // Debugging
    setSelectedBlock(id);
  };

  return (
    <div>
      <EstateDropdown onEstateSelect={handleEstateSelect} />
      <BlockDropdown estateId={selectedEstate} onBlockSelect={handleBlockSelect} />
      <ChargesTable estateId={selectedEstate} blockId={selectedBlock} />
    </div>
  );
};

export default EstateBlockDropdowns;
