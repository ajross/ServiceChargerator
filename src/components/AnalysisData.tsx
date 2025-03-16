import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import EstatesRepository from '../services/EstatesRepository';
import BlocksRepository from '../services/BlocksRepository';
import AnalysisContent from './AnalysisContent';
import ScrollToTopButton from './ScrollToTopButton';
import ReactGA4 from 'react-ga4';

const AnalysisData = ({ borough }) => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [estates, setEstates] = useState([]);
  const [blocks, setBlocks] = useState([]);

  // Fetch estates data
  useEffect(() => {
    const estatesRepository = new EstatesRepository(borough);
    estatesRepository.dataLoaded.then(() => {
        setEstates(estatesRepository.getEstates());
    })
      .catch(error => console.error('Error:', error));
  }, [borough]);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (selectedEstate) {
      const blocksRepository = new BlocksRepository(borough);
      blocksRepository.dataLoaded.then(() => {
          setBlocks(blocksRepository.getBlocks(selectedEstate));
      })
      .catch(error => console.error('Error:', error));
    } else {
      setBlocks([]); // Reset blocks if no estate is selected
    }
  }, [borough, selectedEstate]);

  const handleEstateSelect = (id) => {
    console.log('Selected Estate ID:', id); // Debugging
    setSelectedEstate(id);
    setSelectedBlock(null); // Reset block selection when estate changes
    ReactGA4.event({
      category: 'Block Charges',
      action: 'Estate Selection',
      label: 'BC Estate',
      value: parseInt(id)
    });
  };

  const handleBlockSelect = (id) => {
    console.log('Selected Block ID:', id); // Debugging
    setSelectedBlock(id);
    ReactGA4.event({
      category: 'Block Charges',
      action: 'Block Selection',
      label: 'BC Block',
      value: parseInt(id)
    });
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info'>
            <h2>Step 1: Choose Your Estate</h2>
            <EstateDropdown borough={borough} estates={estates} onEstateSelect={handleEstateSelect} />
            {estates && (
              <ul>
                <li>Estate Name: {estates?.find(item => item.ID === selectedEstate)?.Estate_Name}</li>
                <li>Estate Rateable Value: {estates?.find(item => item.ID === selectedEstate)?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info'>
            <h2>Step 2: Choose Your Block</h2>
            <BlockDropdown borough={borough} blocks={blocks} onBlockSelect={handleBlockSelect} />
            {blocks && (
              <ul>
                <li>Block Name: {blocks?.find(item => item.ID === selectedBlock)?.Block_Name}</li>
                <li>Block Rateable Value: {blocks?.find(item => item.ID === selectedBlock)?.Block_RV}</li>
              </ul>
            )}
          </div>
      </div>
      <AnalysisContent borough={borough} estateId={selectedEstate} blockId={selectedBlock} estateRv={estates?.find(item => item.ID === selectedEstate)?.Estate_RV} blockRv={blocks?.find(item => item.ID === selectedBlock)?.Block_RV} />
      <ScrollToTopButton />
    </div>
  );
};

export default AnalysisData;
