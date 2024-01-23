import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import PremiseChargesComparisonTable from './PremiseChargesComparisonTable';
import EstatesRepository from '../services/EstatesRepository';
import BlocksRepository from '../services/BlocksRepository';
import ReactGA4 from 'react-ga4';

const PremiseComparisonData = () => {
  const [firstSelectedEstate, setFirstSelectedEstate] = useState(null);
  const [firstSelectedBlock, setFirstSelectedBlock] = useState(null);
  const [firstEstates, setFirstEstates] = useState([]);
  const [firstBlocks, setFirstBlocks] = useState([]);

  const [firstEstateRv, setFirstEstateRv] = useState('');
  const [firstBlockRv, setFirstBlockRv] = useState('');

  const [firstNumberInput, setFirstNumberInput] = useState('');


  const [secondSelectedEstate, setSecondSelectedEstate] = useState(null);
  const [secondSelectedBlock, setSecondSelectedBlock] = useState(null);
  const [secondEstates, setSecondEstates] = useState([]);
  const [secondBlocks, setSecondBlocks] = useState([]);

  const [secondEstateRv, setSecondEstateRv] = useState('');
  const [secondBlockRv, setSecondBlockRv] = useState('');

  const [secondNumberInput, setSecondNumberInput] = useState('');


  // Fetch estates data
  useEffect(() => {
    const estatesRepository = new EstatesRepository();
    estatesRepository.dataLoaded.then(() => {
        const estates = estatesRepository.getEstates();
        setFirstEstates(estates);
        setSecondEstates(estates);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (firstSelectedEstate) {
      const blocksRepository = new BlocksRepository();
      blocksRepository.dataLoaded.then(() => {
        const blocks = blocksRepository.getBlocks(firstSelectedEstate);
        setFirstBlocks(blocks);
      })
      .catch(error => console.error('Error:', error));
    } else {
      setFirstBlocks([]); // Reset blocks if no estate is selected
    }
  }, [firstSelectedEstate]);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (secondSelectedEstate) {
      const blocksRepository = new BlocksRepository();
      blocksRepository.dataLoaded.then(() => {
        const blocks = blocksRepository.getBlocks(secondSelectedEstate);
        setSecondBlocks(blocks);
        setSecondBlockRv(blocks[0].Block_RV);
      })
      .catch(error => console.error('Error:', error));
    } else {
      setSecondBlocks([]); // Reset blocks if no estate is selected
    }
  }, [secondSelectedEstate]);


  const handleFirstEstateSelect = (id) => {
    console.log('First Selected Estate ID:', id); // Debugging
    setFirstSelectedEstate(id);
    setFirstEstateRv(firstEstates.find(estate => estate.ID === id)?.Estate_RV);
    setFirstSelectedBlock(null); // Reset block selection when estate changes
    ReactGA4.event({
      category: 'Premise Comparison',
      action: 'First Estate Selection',
      label: 'PCmp First Estate',
      value: parseInt(id)
    });
  };

  const handleFirstBlockSelect = (id) => {
    console.log('First Selected Block ID:', id); // Debugging
    setFirstSelectedBlock(id);
    setFirstBlockRv(firstBlocks.find(block => block.ID === id)?.Block_RV);
    ReactGA4.event({
      category: 'Premise Comparison',
      action: 'First Block Selection',
      label: 'PCmp First Block',
      value: parseInt(id)
    });
  };

  const handleFirstNumberInputChange = (event) => {
    setFirstNumberInput(event.target.value);
  };

  const handleFirstNumberInputSubmit = (event) => {
    setFirstNumberInput(event.target.value);
    ReactGA4.event({
      category: 'Premise Charges',
      action: 'First Dwelling Value',
      label: 'PCmp First Dwelling',
      value: parseInt(event.target.value)
    });
  };

  const handleSecondEstateSelect = (id) => {
    console.log('Second Selected Estate ID:', id); // Debugging
    setSecondSelectedEstate(id);
    setSecondEstateRv(secondEstates.find(estate => estate.ID === id)?.Estate_RV);
    setSecondSelectedBlock(null); // Reset block selection when estate changes
    ReactGA4.event({
      category: 'Premise Comparison',
      action: 'Second Estate Selection',
      label: 'PCmp Second Estate',
      value: parseInt(id)
    });
  };

  const handleSecondBlockSelect = (id) => {
    console.log('Second Selected Block ID:', id); // Debugging
    setSecondSelectedBlock(id);
    setSecondBlockRv(secondBlocks.find(block => block.ID === id)?.Block_RV);
    ReactGA4.event({
      category: 'Premise Comparison',
      action: 'Second Block Selection',
      label: 'PCmp Second Block',
      value: parseInt(id)
    });
  };

  const handleSecondNumberInputChange = (event) => {
    setSecondNumberInput(event.target.value);
  };

  const handleSecondNumberInputSubmit = (event) => {
    setSecondNumberInput(event.target.value);
    ReactGA4.event({
      category: 'Premise Charges',
      action: 'Second Dwelling Value',
      label: 'PCmp Second Dwelling',
      value: parseInt(event.target.value)
    });
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info first-block'>
            <h2>First Estate</h2>
            <EstateDropdown estates={firstEstates} onEstateSelect={handleFirstEstateSelect} />
            {firstEstates && (
              <ul>
                <li>Estate Name: {firstEstates?.find(item => item.ID === firstSelectedEstate)?.Estate_Name}</li>
                <li>Estate Rateable Value: {firstEstateRv}</li>
              </ul>
            )}
          </div>
          <div className='block-info first-block'>
            <h2>First Block</h2>
            <BlockDropdown blocks={firstBlocks} onBlockSelect={handleFirstBlockSelect} />
            {firstBlocks && (
              <ul>
                <li>Block Name: {firstBlocks?.find(item => item.ID === firstSelectedBlock)?.Block_Name}</li>
                <li>Block Rateable Value: {firstBlockRv}</li>
              </ul>
            )}
          </div>
          <div className='premise-info first-block'>
            <h2>First Premise</h2>
            <p>Enter the rateable value for your property.</p>
            <p>It will likely be a 3 digit number.</p>
            <input
              type="number"
              value={firstNumberInput}
              onChange={handleFirstNumberInputChange}
              onBlur={handleFirstNumberInputSubmit}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleFirstNumberInputSubmit();
                }
              }}
            />
          </div>
      </div>
      <div className='estate-block-info-container'>
          <div className='estate-info second-block'>
            <h2>Second Estate</h2>
            <EstateDropdown estates={secondEstates} onEstateSelect={handleSecondEstateSelect} />
            {secondEstates && (
              <ul>
                <li>Estate Name: {secondEstates?.find(item => item.ID === secondSelectedEstate)?.Estate_Name}</li>
                <li>Estate Rateable Value: {secondEstateRv}</li>
              </ul>
            )}
          </div>
          <div className='block-info second-block'>
            <h2>Second Block</h2>
            <BlockDropdown blocks={secondBlocks} onBlockSelect={handleSecondBlockSelect} />
            {secondBlocks && (
              <ul>
                <li>Block Name: {secondBlocks?.find(item => item.ID === secondSelectedBlock)?.Block_Name}</li>
                <li>Block Rateable Value: {secondBlockRv}</li>
              </ul>
            )}
          </div>
          <div className='premise-info second-block'>
            <h2>Second Premise</h2>
            <p>Enter the rateable value for your property.</p>
            <p>It will likely be a 3 digit number.</p>
            <input
              type="number"
              value={secondNumberInput}
              onChange={handleSecondNumberInputChange}
              onBlur={handleSecondNumberInputSubmit}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleSecondNumberInputSubmit();
                }
              }}
            />
          </div>
      </div>
      <PremiseChargesComparisonTable firstEstateId={firstSelectedEstate} firstBlockId={firstSelectedBlock}
        firstEstateRv={firstEstateRv} firstBlockRv={firstBlockRv} firstPremiseRv={firstNumberInput}
        secondEstateId={secondSelectedEstate} secondBlockId={secondSelectedBlock}
        secondEstateRv={secondEstateRv} secondBlockRv={secondBlockRv} secondPremiseRv={secondNumberInput}/>
    </div>
  );
};

export default PremiseComparisonData;
