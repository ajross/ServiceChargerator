import React, { useState, useEffect } from 'react';

const ChargesTable = ({ estateId, blockId }) => {
  const [chargesData, setChargesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (estateId && blockId) {
      setIsLoading(true);
      fetch(`/charges/${estateId}/${blockId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Data not found');
          }
          return response.json();
        })
        .then(data => {
          setChargesData(pivotData(data));
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [estateId, blockId]);

  const pivotData = (data) => {
  
    const chargeTypes = [
      'Block_Boiler_Repairs_and_Maintenance',
      'Block_Cleaning',
      'Block_Communal_Electricity',
      'Block_Communal_Electrical_Maintenance',
      'Block_Communal_Ventilation_Maintenance',
      'Block_Communal_Water_Quality',
      'Block_Communal_Window_Cleaning',
      'Block_Concierge',
      'Block_CCTV',
      'Block_Disinfestation',
      'Block_Door_Entry_System',
      'Block_Dry_Riser',
      'Block_Lightning_Protection',
      'Block_Lift_Services_and_Repairs',
      'Block_Fire_Ventilation_Maintenance',
      'Block_Repairs_and_Maintenance',
      'Block_TV_Aerial',
      'Block_Ext_Cleaning',
      'Block_Ext_External_Tree_Maintenance',
      'Block_Ext_Grounds_Maintenance',
      'Block_Ext_Repairs_and_Maintenance',
      'Estate_Cleaning',
      'Estate_CCTV',
      'Estate_Communal_Electricity',
      'Estate_Grounds_Maintenance',
      'Estate_Repairs_and_Maintenance',
      'Estate_Tree_Maintenance'
    ];

      // Extract unique years
      const years = [...new Set(data.map(item => item.Year_End))].sort();

      // Create a map for each charge type with year as the key
      const pivotedData = chargeTypes.map(type => {
        const row = { chargeType: type };
        years.forEach(year => {
          const record = data.find(item => item.Year_End === year);
          row[year] = record ? record[type] : 'N/A';
        });
        return row;
      });

      return { pivotedData, years };
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {chargesData.years && chargesData?.years.length > 0 && !isLoading && !error && (
      <table>
        <thead>
          <tr>
            <th>Charge Type</th>
            {chargesData.years.map(year => <th key={year}>{year}</th>)}
          </tr>
        </thead>
        <tbody>
          {chargesData.pivotedData.map((row, index) => (
            <tr key={index}>
              <td>{row.chargeType}</td>
              {chargesData.years.map(year => (
                <td key={year}>{row[year]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default ChargesTable;
