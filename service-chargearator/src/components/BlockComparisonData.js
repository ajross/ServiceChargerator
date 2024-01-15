import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import BlockChargesComparisonTable from './BlockChargesComparisonTable';

const BlockComparisonData = () => {
  const [firstSelectedEstate, setFirstSelectedEstate] = useState(null);
  const [firstSelectedBlock, setFirstSelectedBlock] = useState(null);
  const [firstEstates, setFirstEstates] = useState([]);
  const [firstBlocks, setFirstBlocks] = useState([]);
  
  const [secondSelectedEstate, setSecondSelectedEstate] = useState(null);
  const [secondSelectedBlock, setSecondSelectedBlock] = useState(null);
  const [secondEstates, setSecondEstates] = useState([]);
  const [secondBlocks, setSecondBlocks] = useState([]);

  // Fetch estates data
  useEffect(() => {
    fetch('/estates')
      .then(response => response.json())
      .then(data => {
        setFirstEstates(data);
        setSecondEstates(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (firstSelectedEstate) {
      fetch(`/blocks/${firstSelectedEstate}`)
        .then(response => response.json())
        .then(data => setFirstBlocks(data))
        .catch(error => console.error('Error:', error));
    } else {
      setFirstBlocks([]); // Reset blocks if no estate is selected
    }
  }, [firstSelectedEstate]);
  
  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (secondSelectedEstate) {
      fetch(`/blocks/${secondSelectedEstate}`)
        .then(response => response.json())
        .then(data => setSecondBlocks(data))
        .catch(error => console.error('Error:', error));
    } else {
      setSecondBlocks([]); // Reset blocks if no estate is selected
    }
  }, [secondSelectedEstate]);

  const handleFirstEstateSelect = (id) => {
    setFirstSelectedEstate(id);
    setFirstSelectedBlock(null); // Reset block selection when estate changes
  };

  const handleFirstBlockSelect = (id) => {
    setFirstSelectedBlock(id);
  };
  
  const handleSecondEstateSelect = (id) => {
    setSecondSelectedEstate(id);
    setSecondSelectedBlock(null); // Reset block selection when estate changes
  };

  const handleSecondBlockSelect = (id) => {
    setSecondSelectedBlock(id);
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info first-block'>
            <h2>First Estate</h2>
            <EstateDropdown estates={firstEstates} onEstateSelect={handleFirstEstateSelect} />
            {firstEstates && (
              <ul>
                <li>Estate Name: {firstEstates?.find(item => item.ID === parseInt(firstSelectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {firstEstates?.find(item => item.ID === parseInt(firstSelectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info first-block'>
            <h2>First Block</h2>
            <BlockDropdown blocks={firstBlocks} onBlockSelect={handleFirstBlockSelect} />
            {firstBlocks && (
              <ul>
                <li>Block Name: {firstBlocks?.find(item => item.ID === parseInt(firstSelectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {firstBlocks?.find(item => item.ID === parseInt(firstSelectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <div className='estate-block-info-container'>
          <div className='estate-info second-block'>
            <h2>Second Estate</h2>
            <EstateDropdown estates={secondEstates} onEstateSelect={handleSecondEstateSelect} />
            {secondEstates && (
              <ul>
                <li>Estate Name: {secondEstates?.find(item => item.ID === parseInt(secondSelectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {secondEstates?.find(item => item.ID === parseInt(secondSelectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info second-block'>
            <h2>Second Block</h2>
            <BlockDropdown blocks={secondBlocks} onBlockSelect={handleSecondBlockSelect} />
            {secondBlocks && (
              <ul>
                <li>Block Name: {secondBlocks?.find(item => item.ID === parseInt(secondSelectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {secondBlocks?.find(item => item.ID === parseInt(secondSelectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <BlockChargesComparisonTable firstEstateId={firstSelectedEstate} firstBlockId={firstSelectedBlock} secondEstateId={secondSelectedEstate} secondBlockId={secondSelectedBlock} />
    </div>
  );
};

export default BlockComparisonData;