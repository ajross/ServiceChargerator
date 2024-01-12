import React, { useState, useEffect } from 'react';

const BlockDropdown = ({ estateId, onBlockSelect }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    if (estateId) {
      fetch(`/blocks/${estateId}`)
        .then(response => response.json())
        .then(data => setBlocks(data))
        .catch(error => console.error('Error:', error));
    }
  }, [estateId]);

  return (
    <select onChange={(b) => onBlockSelect(b.target.value)}  disabled={!estateId}>
      <option value="">Select Block</option>
      {blocks.map((block) => (
        <option key={block.ID} value={block.ID}>
          {block.Block_Name}
        </option>
      ))}
    </select>
  );
};

export default BlockDropdown;
