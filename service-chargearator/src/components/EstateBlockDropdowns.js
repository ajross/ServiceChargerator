import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import BlockChargesTable from './BlockChargesTable';

const EstateBlockDropdowns = () => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [estates, setEstates] = useState([]);
  const [blocks, setBlocks] = useState([]);

  // Fetch estates data
  useEffect(() => {
    fetch('/estates')
      .then(response => response.json())
      .then(data => setEstates(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (selectedEstate) {
      fetch(`/blocks/${selectedEstate}`)
        .then(response => response.json())
        .then(data => setBlocks(data))
        .catch(error => console.error('Error:', error));
    } else {
      setBlocks([]); // Reset blocks if no estate is selected
    }
  }, [selectedEstate]);

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
      <div className='estate-block-info-container'>
          <div className='estate-info'>
            <EstateDropdown estates={estates} onEstateSelect={handleEstateSelect} />
            {estates && (
              <ul>
                <li>Estate Name: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info'>
            <BlockDropdown blocks={blocks} onBlockSelect={handleBlockSelect} />
            {blocks && (
              <ul>
                <li>Block Name: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <BlockChargesTable estateId={selectedEstate} blockId={selectedBlock} />
    </div>
  );
};

export default EstateBlockDropdowns;
