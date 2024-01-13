import React from 'react';

const BlockDropdown = ({ blocks, onBlockSelect }) => {
  return (
    <select onChange={(b) => onBlockSelect(b.target.value)}  disabled={!blocks.length}>
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
