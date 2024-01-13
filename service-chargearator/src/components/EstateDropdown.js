import React from 'react';

const EstateDropdown = ({ estates, onEstateSelect }) => {
  return (
    <select onChange={(e) => onEstateSelect(e.target.value)}>
      <option value="">Select Estate</option>
      {estates.map((estate) => (
        <option key={estate.ID} value={estate.ID}>
          {estate.Estate_Name}
        </option>
      ))}
    </select>
  );
};

export default EstateDropdown;
