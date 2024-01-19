import React, { useState, useEffect, useMemo } from 'react';
import ChargesRepository from '../services/ChargesRepository';

const PremiseChargesComparisonTable = ({
 firstEstateId, firstBlockId, firstEstateRv, firstBlockRv, firstPremiseRv,
 secondEstateId, secondBlockId, secondEstateRv, secondBlockRv, secondPremiseRv
 }) => {
  const [allYears, setAllYears] = useState([]);
  const [allPivotData, setAllPivotData] = useState([]);
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
  
    if (firstEstateId && firstBlockId && firstEstateRv && firstBlockRv && firstPremiseRv > 0
    && secondEstateId && secondBlockId && secondEstateRv && secondBlockRv && secondPremiseRv > 0) {
      const chargesRepository = new ChargesRepository();

      setIsLoading(true);
      chargesRepository.dataLoaded.then(() => {
          const firstData = chargesRepository.getCharges(firstEstateId, firstBlockId);
          const firstPivotedData = pivotData(firstData);

          const secondData = chargesRepository.getCharges(secondEstateId, secondBlockId);
          const secondPivotedData = pivotData(secondData);

          const mergedArray = firstPivotedData.pivotedData.map((item, index) => {
              const arr2Item = secondPivotedData.pivotedData[index];
              let mergedItem = {};

              for (const year in item) {
                  mergedItem[year] = {
                      first: item[year],
                      second: arr2Item[year]
                  };
              }
              return mergedItem;
          });

          setAllPivotData(mergedArray);

          const years = [...new Set([ ...firstData.map(item => item.Year_End), ...secondData.map(item => item.Year_End)])].sort();
          setAllYears(years);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [firstEstateId, firstBlockId, firstEstateRv, firstBlockRv, firstPremiseRv,
      secondEstateId, secondBlockId, secondEstateRv, secondBlockRv, secondPremiseRv, chargeTypes]);



  return (
    <div className="table-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {allYears?.length > 0 && !isLoading && !error && (
      <table>
        <thead>
          <tr>
            <th>Charge Type</th>
            {allYears.map(year => [
              <th key={`${year}-1`} className="first-block">{year}</th>,
              <th key={`${year}-2`} className="second-block">{year}</th>
            ])}
          </tr>
        </thead>
        <tbody>
          {allPivotData.map((row, index) => (
            <tr key={index}>
              <td>{chargeTypes[index].replace(/_/g, ' ')}</td>
              {allYears.map(year => ([
                <td key={`${year}-1`}>
                    £{row[year] != null ? Number(
                    chargeTypes[index].startsWith("Block") ?
                    row[year].first / firstBlockRv * firstPremiseRv :
                    row[year].first / firstEstateRv * firstPremiseRv
                    ).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>,
                <td key={`${year}-2`}>
                    £{row[year] != null ? Number(
                    chargeTypes[index].startsWith("Block") ?
                    row[year].second / secondBlockRv * secondPremiseRv :
                    row[year].second / secondEstateRv * secondPremiseRv
                    ).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
                ]
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default PremiseChargesComparisonTable;
