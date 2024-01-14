import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import BlockChargesComparisonTable from './BlockChargesComparisonTable';

const BlockComparisonData = () => {
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
    setSelectedEstate(id);
    setSelectedBlock(null); // Reset block selection when estate changes
  };

  const handleBlockSelect = (id) => {
    setSelectedBlock(id);
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info first-block'>
            <h2>First Estate</h2>
            <EstateDropdown estates={estates} onEstateSelect={handleEstateSelect} />
            {estates && (
              <ul>
                <li>Estate Name: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info first-block'>
            <h2>First Block</h2>
            <BlockDropdown blocks={blocks} onBlockSelect={handleBlockSelect} />
            {blocks && (
              <ul>
                <li>Block Name: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <div className='estate-block-info-container'>
          <div className='estate-info second-block'>
            <h2>Second Estate</h2>
            <EstateDropdown estates={estates} onEstateSelect={handleEstateSelect} />
            {estates && (
              <ul>
                <li>Estate Name: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info second-block'>
            <h2>Second Block</h2>
            <BlockDropdown blocks={blocks} onBlockSelect={handleBlockSelect} />
            {blocks && (
              <ul>
                <li>Block Name: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <BlockChargesComparisonTable estateId={selectedEstate} blockId={selectedBlock} />
    </div>
  );
};

export default BlockComparisonData;
