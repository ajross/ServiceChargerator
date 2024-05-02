import React, { useState, useEffect, useMemo } from 'react';
import UnitChargesRepository from '../services/UnitChargesRepository';

const AnalysisContent = ({ estateId, blockId, estateRv, blockRv }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitChargesData, setUnitChargesData] = useState([]);
  const [similarBlockCharges, setSimilarBlockCharges] = useState([]);
  const [similarBlockStats, setSimilarBlockStats] = useState({});
  const [similarEstateCharges, setSimilarEstateCharges] = useState([]);
  const [similarEstateStats, setSimilarEstateStats] = useState({});
  const [expandedTypes, setExpandedTypes] = useState(new Set());

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

  const unitChargesRepository = useMemo(() => new UnitChargesRepository(), []);

  const toggleExpand = (type) => {
    setExpandedTypes(prevExpandedTypes => {
      const newExpandedTypes = new Set(prevExpandedTypes);
      if (newExpandedTypes.has(type)) {
        newExpandedTypes.delete(type);
      } else {
        newExpandedTypes.add(type);
      }
      return newExpandedTypes;
    });
  };

  useEffect(() => {
    if (estateId && blockId && estateRv && blockRv) {
      setIsLoading(true);
      unitChargesRepository.dataLoaded.then(() => {
        setUnitChargesData(unitChargesRepository.getUnitCharges(estateId, blockId));
        setSimilarBlockCharges(unitChargesRepository.getSimilarBlockCharges(blockRv));
        setSimilarBlockStats(unitChargesRepository.getSimilarBlockStats(blockRv));
        setSimilarEstateCharges(unitChargesRepository.getSimilarEstateCharges(estateRv));
        setSimilarEstateStats(unitChargesRepository.getSimilarEstateStats(estateRv));
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [estateId, blockId, estateRv, blockRv, unitChargesRepository, chargeTypes]);

  function roundToCurrency(num) {
      return Math.round(num).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function roundToUnitPrice(num) {
      return parseFloat(num).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }

  function calcPercentageIncrease(cost, average) {
      return (100 * ((parseFloat(cost) - parseFloat(average)) / parseFloat(average))).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function percentageText(cost, average) {
      const percentageIncrease = calcPercentageIncrease(cost, average);
      return percentageIncrease + "% " + (parseFloat(percentageIncrease) > 0 ? "higher" : "lower");
  }

  return (
    <div className="home-content-container">
    <div className="home-block-container">

      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        chargeTypes.map(type => (
          parseFloat(unitChargesData[type]) > 0 ?
            <div className="home-content">
            <h2>
              {type.replace(/_/g, ' ')}
            </h2>
            <div className="table-container">
              <div key={type}>
                <h3>Statistics comparing your block to the rest of the borough</h3>
                <div className="summary-text">
                  <p>You were charged £{roundToCurrency(unitChargesData[type])} for {type.replace(/_/g, ' ')}.</p>
                  <p>This is {percentageText(unitChargesData[type], unitChargesRepository.stats[type]?.mean)} than the average paid across the borough, which is £{roundToCurrency(unitChargesRepository.stats[type]?.mean)}.</p>
                  <p>You pay an effective unit price of £{roundToUnitPrice(unitChargesData[type + "_Unit"])} per unit of {type.replace(/_/g, ' ')}.</p>
                  <p>This is % higher/lower than the average paid across the borough, which is £{roundToUnitPrice(unitChargesRepository.stats[type + "_Unit"]?.mean)} per unit.</p>
                </div>
                <div className="stats-table-container">
                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Cost</th>
                        <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Your Charge</td>
                      <td className="error-cell">£{roundToCurrency(unitChargesData[type])}</td>
                      <td className="error-cell">The amount your block was charged for {type.replace(/_/g, ' ')}</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>£{roundToCurrency(unitChargesRepository.stats[type]?.min)}</td>
                      <td>The minimum cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>£{roundToCurrency(unitChargesRepository.stats[type]?.max)}</td>
                      <td>The maximum cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Mean</td>
                      <td>£{roundToCurrency(unitChargesRepository.stats[type]?.mean)}</td>
                      <td>The average cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>£{roundToCurrency(unitChargesRepository.stats[type]?.median)}</td>
                      <td>The middle cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Unit Cost</th>
                        <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Your Charge</td>
                      <td className="error-cell">£{roundToUnitPrice(unitChargesData[type + "_Unit"])}</td>
                      <td className="error-cell">The unit cost for {type.replace(/_/g, ' ')} in your block</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>£{roundToUnitPrice(unitChargesRepository.stats[type + "_Unit"]?.min)}</td>
                      <td>The minimum unit cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>£{roundToUnitPrice(unitChargesRepository.stats[type + "_Unit"]?.max)}</td>
                      <td>The maximum unit cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Mean</td>
                      <td>£{roundToUnitPrice(unitChargesRepository.stats[type + "_Unit"]?.mean)}</td>
                      <td>The average unit cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>£{roundToUnitPrice(unitChargesRepository.stats[type + "_Unit"]?.median)}</td>
                      <td>The middle unit cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <h3>Statistics comparing your block to similar sized blocks.</h3>
                <div className="summary-text">
                  <p>Your block's rateable value is {blockRv}.  Comparable blocks would have rateable values between {parseInt(blockRv) - 500} and {parseInt(blockRv) + 500}.</p>
                  <p>Your charge of £{roundToCurrency(unitChargesData[type])} is {percentageText(unitChargesData[type], similarBlockStats[type]?.mean)} than the average paid at similar sized blocks, which is £{roundToCurrency(similarBlockStats[type]?.mean)}.</p>
                  <p>The effective unit price you pay of £{roundToUnitPrice(unitChargesData[type + "_Unit"])} is {percentageText(unitChargesData[type + "_Unit"], similarBlockStats[type + "_Unit"]?.mean)} than the average paid across similar sized blocks, which is £{roundToUnitPrice(similarBlockStats[type + "_Unit"]?.mean)} per unit.</p>
                </div>
                <div className="stats-table-container">
                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Cost</th>
                        <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Your Charge</td>
                      <td className="error-cell">£{roundToCurrency(unitChargesData[type])}</td>
                      <td className="error-cell">The amount your block was charged for {type.replace(/_/g, ' ')}</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>£{roundToCurrency(similarBlockStats[type]?.min)}</td>
                      <td>The minimum cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>£{roundToCurrency(similarBlockStats[type]?.max)}</td>
                      <td>The maximum cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Mean</td>
                      <td>£{roundToCurrency(similarBlockStats[type]?.mean)}</td>
                      <td>The average cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>£{roundToCurrency(similarBlockStats[type]?.median)}</td>
                      <td>The middle cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Unit Cost</th>
                        <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Your Charge</td>
                      <td className="error-cell">£{roundToUnitPrice(unitChargesData[type + "_Unit"])}</td>
                      <td className="error-cell">The unit cost for {type.replace(/_/g, ' ')} in your block</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>£{roundToUnitPrice(similarBlockStats[type + "_Unit"]?.min)}</td>
                      <td>The minimum unit cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>£{roundToUnitPrice(similarBlockStats[type + "_Unit"]?.max)}</td>
                      <td>The maximum unit cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Mean</td>
                      <td>£{roundToUnitPrice(similarBlockStats[type + "_Unit"]?.mean)}</td>
                      <td>The average unit cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>£{roundToUnitPrice(similarBlockStats[type + "_Unit"]?.median)}</td>
                      <td>The middle unit cost of {type.replace(/_/g, ' ')} across similar sized blocks charged for this service</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <h3 onClick={() => toggleExpand(type)}>
                  Click to expand and see {type.replace(/_/g, ' ')} charges for similar sized blocks {expandedTypes.has(type) ? '-' : '+'}
                </h3>
                {expandedTypes.has(type) && (
                <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Estate Name</th>
                          <th>Estate RV</th>
                          <th>Block Name</th>
                          <th>Block RV</th>
                          <th>Cost</th>
                          <th>Unit Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          type.startsWith('Block') ?
                              similarBlockCharges?.map((item, index) => {
                                if (item[type] > 0) {
                                  return (
                                    <tr key={index} className={item.Block_ID === blockId ? "error-cell" : "no-error"}>
                                      <td>{item.Estate_Name}</td>
                                      <td>{item.Estate_RV}</td>
                                      <td>{item.Block_Name}</td>
                                      <td>{item.Block_RV}</td>
                                      <td>£{item[type]}</td>
                                      <td>£{roundToUnitPrice(item[type + "_Unit"])}</td>
                                    </tr>
                                  );
                                }
                                return null;
                              })
                          :
                          similarEstateCharges?.map((item, index) => {
                                if (item[type] > 0) {
                                  return (
                                    <tr key={index} className={item.Block_ID === blockId ? "error-cell" : "no-error"}>
                                      <td>{item.Estate_Name}</td>
                                      <td>{item.Estate_RV}</td>
                                      <td>{item.Block_Name}</td>
                                      <td>{item.Block_RV}</td>
                                      <td>£{item[type]}</td>
                                      <td>£{roundToUnitPrice(item[type + "_Unit"])}</td>
                                    </tr>
                                  );
                                }
                                return null;
                              })
                        }
                      </tbody>
                    </table>
                </div>
                )}
              </div>
            </div>
            </div>
            :
            <div className="home-content">
            <div className="table-container">
              <div key={type}>
                <h2>{type.replace(/_/g, ' ')}</h2>
                Your block is not charged for {type.replace(/_/g, ' ')}.
              </div>
            </div>
            </div>
        ))
      )}

    </div>
    </div>
  );
};

export default AnalysisContent;
