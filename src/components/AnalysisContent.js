import React, { useState, useEffect, useMemo } from 'react';
import UnitChargesRepository from '../services/UnitChargesRepository';

const AnalysisContent = ({ estateId, blockId, estateRv, blockRv }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitChargesData, setUnitChargesData] = useState([]);
  const [similarBlockCharges, setSimilarBlockCharges] = useState([]);
  const [similarEstateCharges, setSimilarEstateCharges] = useState([]);

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

  useEffect(() => {
    if (estateId && blockId && estateRv && blockRv) {
      setIsLoading(true);
      unitChargesRepository.dataLoaded.then(() => {
        setUnitChargesData(unitChargesRepository.getUnitCharges(estateId, blockId));
        setSimilarBlockCharges(unitChargesRepository.getSimilarBlockCharges(blockRv));
        setSimilarEstateCharges(unitChargesRepository.getSimilarEstateCharges(estateRv));
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [estateId, blockId, estateRv, blockRv, unitChargesRepository, chargeTypes]);

  return (
    <div className="home-content-container">
    <div className="home-block-container">

      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        chargeTypes.map(type => (
          parseFloat(unitChargesData[type]) > 0 ?
            <div className="home-content">
            <div className="table-container">
              <div key={type}>
                <h2>{type.replace(/_/g, ' ')}</h2>
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
                                  <td>£{parseFloat(item[type + "_Unit"]).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
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
                                  <td>£{parseFloat(item[type + "_Unit"]).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                                </tr>
                              );
                            }
                            return null;
                          })
                    }
                  </tbody>
                </table>
                <h3>Statistics</h3>
                <table>
                  <thead>
                    <tr>
                        <th></th>
                        <th>Cost</th>
                        <th>Unit Cost</th>
                        <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Your Charge</td>
                      <td>£{Math.round(unitChargesData[type]).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>£{parseFloat(unitChargesData[type + "_Unit"]).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                      <td>The amount your block was charged for {type.replace(/_/g, ' ')}</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>£{Math.round(unitChargesRepository.stats[type]?.min).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>£{parseFloat(unitChargesRepository.stats[type + "_Unit"]?.min).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                      <td>The minimum cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Max</td>
                      <td>£{Math.round(unitChargesRepository.stats[type]?.max).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>£{parseFloat(unitChargesRepository.stats[type + "_Unit"]?.max).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                      <td>The maximum cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Mean</td>
                      <td>£{Math.round(unitChargesRepository.stats[type]?.mean).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>£{parseFloat(unitChargesRepository.stats[type + "_Unit"]?.mean).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                      <td>The average cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                    <tr>
                      <td>Median</td>
                      <td>£{Math.round(unitChargesRepository.stats[type]?.median).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>£{parseFloat(unitChargesRepository.stats[type + "_Unit"]?.median).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                      <td>The middle cost of {type.replace(/_/g, ' ')} across all blocks charged for this service</td>
                    </tr>
                  </tbody>
                </table>
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
