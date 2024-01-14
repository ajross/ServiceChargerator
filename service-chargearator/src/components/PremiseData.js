import React, { useState, useEffect } from 'react';
import EstateDropdown from './EstateDropdown';
import BlockDropdown from './BlockDropdown';
import PremiseChargesTable from './PremiseChargesTable';

const PremiseData = () => {
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [estateRv, setEstateRv] = useState('');
  const [blockRv, setBlockRv] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [estates, setEstates] = useState([]);
  const [blocks, setBlocks] = useState([]);

  // Fetch estates data
  useEffect(() => {
    fetch('/estates')
      .then(response => response.json())
      .then(data => {
        setEstates(data);
        setEstateRv(data[0].Estate_RV);
        })
      .catch(error => console.error('Error:', error));
  }, []);

  // Fetch blocks data when selectedEstate changes
  useEffect(() => {
    if (selectedEstate) {
      fetch(`/blocks/${selectedEstate}`)
        .then(response => response.json())
        .then(data => {
            setBlocks(data);
            setBlockRv(data[0].Block_RV);
        })
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

  const handleNumberInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleNumberInputSubmit = (event) => {
    setNumberInput(event.target.value);
    // Logic to update BlockChargesTable, maybe set another state or directly pass to BlockChargesTable
  };

  return (
    <div>
      <div className='estate-block-info-container'>
          <div className='estate-info'>
            <h2>Estate</h2>
            <EstateDropdown estates={estates} onEstateSelect={handleEstateSelect} />
            {estates && (
              <ul>
                <li>Estate Name: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_Name}</li>
                <li>Estate Rateable Value: {estates?.find(item => item.ID === parseInt(selectedEstate))?.Estate_RV}</li>
              </ul>
            )}
          </div>
          <div className='block-info'>
            <h2>Block</h2>
            <BlockDropdown blocks={blocks} onBlockSelect={handleBlockSelect} />
            {blocks && (
              <ul>
                <li>Block Name: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_Name}</li>
                <li>Block Rateable Value: {blocks?.find(item => item.ID === parseInt(selectedBlock))?.Block_RV}</li>
              </ul>
            )}
          </div>
          <div className='premise-info'>
            <h2>Premise</h2>
            <p>Enter the rateable value for your property.</p>
            <p>It will likely be a 3 digit number.</p>
            <input
              type="number"
              value={numberInput}
              onChange={handleNumberInputChange}
              onBlur={handleNumberInputSubmit}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleNumberInputSubmit();
                }
              }}
            />
          </div>
      </div>
      <PremiseChargesTable estateId={selectedEstate} blockId={selectedBlock} estateRv={estateRv} blockRv={blockRv} premiseRv={numberInput} />
    </div>
  );
};

export default PremiseData;
