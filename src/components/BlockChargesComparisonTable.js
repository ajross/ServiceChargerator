import React, { useState, useEffect } from 'react';
import ChargesRepository from '../services/ChargesRepository';
import ChargeErrorsRepository from '../services/ChargeErrorsRepository';

const BlockChargesComparisonTable = ({ borough, firstEstateId, firstBlockId, secondEstateId, secondBlockId }) => {
  const [allYears, setAllYears] = useState([]);
  const [allPivotData, setAllPivotData] = useState([]);
  const [chargeErrors, setChargeErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chargeTypes, setChargeTypes] = useState([]);

  useEffect(() => {
    if (borough && firstEstateId && firstBlockId) {
      const chargesRepository = new ChargesRepository(borough);
      chargesRepository.dataLoaded.then(() => {
        const charges = chargesRepository.getCharges(firstEstateId, firstBlockId);
        setChargeTypes(Object.keys(charges[0]).slice(5));
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [borough, firstEstateId, firstBlockId]);

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

    if (borough && firstEstateId && firstBlockId && secondEstateId && secondBlockId) {
      const chargesRepository = new ChargesRepository(borough);
      const chargeErrorsRepository = new ChargeErrorsRepository(borough);


      setIsLoading(true);
      chargesRepository.dataLoaded.then(() => {
          const firstData = chargesRepository.getCharges(firstEstateId, firstBlockId);
          const firstPivotedData = pivotData(firstData);

          const secondData = chargesRepository.getCharges(secondEstateId, secondBlockId);
          const secondPivotedData = pivotData(secondData);

          const years = [...new Set([ ...firstData.map(item => item.Year_End), ...secondData.map(item => item.Year_End)])].sort();

          const mergedArray = firstPivotedData.pivotedData.map((item, index) => {
              const arr2Item = secondPivotedData.pivotedData[index];
              let mergedItem = {};

              for (const year of years) {
                  mergedItem[year] = {
                      first: item[year],
                      second: arr2Item[year]
                  };
              }
              return mergedItem;
          });

          setAllYears(years);

          setAllPivotData(mergedArray);

          chargeErrorsRepository.dataLoaded.then(() => {
            const firstErrorData = chargeErrorsRepository.getCharges(firstEstateId, firstBlockId);
            const firstErrorPivotData = pivotData(firstErrorData);

            const secondErrorData = chargeErrorsRepository.getCharges(secondEstateId, secondBlockId);
            const secondErrorPivotData = pivotData(secondErrorData);

            const mergedErrorArray = firstErrorPivotData.pivotedData.map((item, index) => {
              const arr2Item = secondErrorPivotData.pivotedData[index];
              let mergedItem = {};

              for (const year of years) {
                  mergedItem[year] = {
                      first: item[year],
                      second: arr2Item[year]
                  };
              }
              return mergedItem;
            });
            setChargeErrors(mergedErrorArray);
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
  }, [borough, firstEstateId, firstBlockId, secondEstateId, secondBlockId, chargeTypes]);

  return (
    <div className="table-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {allYears?.length > 0 && !isLoading && !error && (
      <table>
        <thead>
          <tr>
            <th>Charge Type/Year Ending</th>
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
                <td key={`${year}-1`} className={chargeErrors[index][year].first === true ? "error-cell" : "no-error"}>
                    {row[year]?.first != null ? '£' + Number(row[year].first).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'No Data'}
                </td>,
                <td key={`${year}-2`} className={chargeErrors[index][year].second === true ? "error-cell" : "no-error"}>
                    {row[year]?.second != null ? '£' + Number(row[year].second).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'No Data'}
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

export default BlockChargesComparisonTable;
