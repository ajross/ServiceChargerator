import React, { useState, useEffect } from 'react';

const EstateDropdown = ({ onEstateSelect }) => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    fetch('/estates')
      .then(response => response.json())
      .then(data => setEstates(data))
      .catch(error => console.error('Error:', error));
  }, []);

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
