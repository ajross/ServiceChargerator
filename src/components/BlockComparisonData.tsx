import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import BlockChargesComparisonTable from './BlockChargesComparisonTable';
import EstatesRepository from '../services/EstatesRepository';
import BlocksRepository from '../services/BlocksRepository';
import ReactGA4 from 'react-ga4';

const BlockComparisonData = ({borough}) => {
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
    const estatesRepository = new EstatesRepository(borough);
    estatesRepository.dataLoaded.then(() => {
        const estates = estatesRepository.getEstates();
        setFirstEstates(estates);
        setSecondEstates(estates);
      })
      .catch(error => console.error('Error:', error));
  }, [borough]);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (firstSelectedEstate) {
      const blocksRepository = new BlocksRepository(borough);
      blocksRepository.dataLoaded.then(() => {
        setFirstBlocks(blocksRepository.getBlocks(firstSelectedEstate));
      })
      .catch(error => console.error('Error:', error));
    } else {
      setFirstBlocks([]); // Reset blocks if no estate is selected
    }
  }, [borough, firstSelectedEstate]);
  
  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (secondSelectedEstate) {
      const blocksRepository = new BlocksRepository(borough);
      blocksRepository.dataLoaded.then(() => {
          setSecondBlocks(blocksRepository.getBlocks(secondSelectedEstate));
      })
      .catch(error => console.error('Error:', error));
    } else {
      setSecondBlocks([]); // Reset blocks if no estate is selected
    }
  }, [borough, secondSelectedEstate]);

  const handleFirstEstateSelect = (id) => {
    setFirstSelectedEstate(id);
    setFirstSelectedBlock(null); // Reset block selection when estate changes
    ReactGA4.event({
      category: 'Block Comparison',
      action: 'First Estate Selection',
      label: 'BCmp First Estate',
      value: parseInt(id)
    });
  };

  const handleFirstBlockSelect = (id) => {
    setFirstSelectedBlock(id);
    ReactGA4.event({
      category: 'Block Comparison',
      action: 'First Block Selection',
      label: 'BCmp First Block',
      value: parseInt(id)
    });
  };
  
  const handleSecondEstateSelect = (id) => {
    setSecondSelectedEstate(id);
    setSecondSelectedBlock(null); // Reset block selection when estate changes
    ReactGA4.event({
      category: 'Block Comparison',
      action: 'Second Estate Selection',
      label: 'BCmp Second Estate',
      value: parseInt(id)
    });
  };

  const handleSecondBlockSelect = (id) => {
    setSecondSelectedBlock(id);
    ReactGA4.event({
      category: 'Block Comparison',
      action: 'Second Block Selection',
      label: 'BCmp Second Block',
      value: parseInt(id)
    });
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info first-block'>
            <h2>Step 1: First Estate</h2>
            <EstateDropdown estates={firstEstates} onEstateSelect={handleFirstEstateSelect} />
            {firstEstates && (
              <ul>
                <li>Estate Name: {firstEstates?.find(item => item.ID === firstSelectedEstate)?.Estate_Name}</li>
                <li>Estate Rateable Value: {firstEstates?.find(item => item.ID === firstSelectedEstate)?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info first-block'>
            <h2>Step 2: First Block</h2>
            <BlockDropdown blocks={firstBlocks} onBlockSelect={handleFirstBlockSelect} />
            {firstBlocks && (
              <ul>
                <li>Block Name: {firstBlocks?.find(item => item.ID === firstSelectedBlock)?.Block_Name}</li>
                <li>Block Rateable Value: {firstBlocks?.find(item => item.ID === firstSelectedBlock)?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <div className='estate-block-info-container'>
          <div className='estate-info second-block'>
            <h2>Step 3: Second Estate</h2>
            <EstateDropdown estates={secondEstates} onEstateSelect={handleSecondEstateSelect} />
            {secondEstates && (
              <ul>
                <li>Estate Name: {secondEstates?.find(item => item.ID === secondSelectedEstate)?.Estate_Name}</li>
                <li>Estate Rateable Value: {secondEstates?.find(item => item.ID === secondSelectedEstate)?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info second-block'>
            <h2>Step 4: Second Block</h2>
            <BlockDropdown blocks={secondBlocks} onBlockSelect={handleSecondBlockSelect} />
            {secondBlocks && (
              <ul>
                <li>Block Name: {secondBlocks?.find(item => item.ID === secondSelectedBlock)?.Block_Name}</li>
                <li>Block Rateable Value: {secondBlocks?.find(item => item.ID === secondSelectedBlock)?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <BlockChargesComparisonTable borough={borough} firstEstateId={firstSelectedEstate} firstBlockId={firstSelectedBlock} secondEstateId={secondSelectedEstate} secondBlockId={secondSelectedBlock} />
    </div>
  );
};

export default BlockComparisonData;
