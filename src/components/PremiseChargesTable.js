import React, { useState, useEffect } from 'react';
import ChargesRepository from '../services/ChargesRepository';
import ChargeErrorsRepository from '../services/ChargeErrorsRepository';

const PremiseChargesTable = ({ borough, estateId, blockId, estateRv, blockRv, premiseRv }) => {
  const [chargesData, setChargesData] = useState([]);
  const [chargeErrors, setChargeErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chargeTypes, setChargeTypes] = useState([]);

  useEffect(() => {
    if (borough && estateId && blockId) {
      const chargesRepository = new ChargesRepository(borough);
      chargesRepository.dataLoaded.then(() => {
        const charges = chargesRepository.getCharges(estateId, blockId);
        setChargeTypes(Object.keys(charges[0]).slice(5));
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [borough, estateId, blockId]);

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

    if (estateId && blockId && estateRv && blockRv && premiseRv > 0 && chargeTypes.length > 0) {
      const chargesRepository = new ChargesRepository(borough);
      const chargeErrorsRepository = new ChargeErrorsRepository(borough);
      setIsLoading(true);
      chargesRepository.dataLoaded.then(() => {
        setChargesData(pivotData(chargesRepository.getCharges(estateId, blockId)));
        chargeErrorsRepository.dataLoaded.then(() => {
            setChargeErrors(pivotData(chargeErrorsRepository.getCharges(estateId, blockId)));
            setIsLoading(false);
        }).catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [borough, estateId, blockId, estateRv, blockRv, premiseRv, chargeTypes]);

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
                    £{row[year] != null ? Number(
                    row.chargeType.startsWith("Block") ?
                    Math.round(row[year] / blockRv * premiseRv * 100) / 100 :
                    Math.round(row[year] / estateRv * premiseRv * 100) / 100
                    ).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
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

export default PremiseChargesTable;
