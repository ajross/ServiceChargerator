import React, { useState, useEffect, useMemo } from 'react';
import ChargesRepository from '../services/ChargesRepository';
import ChargeErrorsRepository from '../services/ChargeErrorsRepository';

const BlockChargesTable = ({ estateId, blockId }) => {
  const [chargesData, setChargesData] = useState([]);
  const [chargeErrors, setChargeErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const chargeTypes = useMemo(() => {
      return [
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
  }, []);

  useEffect(() => {
    const pivotData = (data) => {
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

    if (estateId && blockId) {
      const chargesRepository = new ChargesRepository();
      const chargeErrorsRepository = new ChargeErrorsRepository();
      setIsLoading(true);
      chargesRepository.dataLoaded.then(() => {
        setChargesData(pivotData(chargesRepository.getCharges(estateId, blockId)));
        chargeErrorsRepository.dataLoaded.then(() => {
            setChargeErrors(pivotData(chargeErrorsRepository.getCharges(estateId, blockId)));
        }).catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [estateId, blockId, chargeTypes]);

  return (
    <div className="table-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {chargesData.years && chargesData?.years.length > 0 && !isLoading && !error && (
      <table>
        <thead>
          <tr>
            <th>Charge Type/Year Ending</th>
            {chargesData.years.map(year => <th key={year}>{year}</th>)}
          </tr>
        </thead>
        <tbody>
          {chargesData.pivotedData.map((row, index) => (
            <tr key={index}>
              <td>{row.chargeType.replace(/_/g, ' ')}</td>
              {chargesData.years.map(year => (
                <td key={year} className={chargeErrors.pivotedData[index][year] === true ? "error-cell" : "no-error"}>
                    £{row[year] != null ? Number(row[year]).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default BlockChargesTable;
