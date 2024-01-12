import React, { useState, useEffect } from 'react';

const EstateDropdown = () => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    fetch('/estates')
      .then(response => response.json())
      .then(data => setEstates(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <select>
      {estates.map((estate, index) => (
        <option key={index} value={estate[0]}>
          {estate[1]}
        </option>
      ))}
    </select>
  );
};

export default EstateDropdown;
