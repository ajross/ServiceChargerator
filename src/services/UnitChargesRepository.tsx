import Papa from 'papaparse';
import { UnitChargeData } from '../interfaces/UnitChargeData';
import { ChargeStat } from '../interfaces/ChargeStat';

class UnitChargesRepository {
    csvFilePath: string;
    data: UnitChargeData[];
    stats: {};
    dataLoaded: Promise<unknown>;
    columnNames: string[];
    constructor(borough: string) {
        this.csvFilePath = `./${borough}/unit_charges.csv`;
        this.data = [];
        this.stats = {};
        this.dataLoaded = this.loadData(); // Returns a promise
        this.columnNames = [];
    }

    // Function to calculate median
    calculateMedian(values: number[]): number {
        values.sort((a: number, b: number) => a - b);
        const mid = Math.floor(values.length / 2);
        if (values.length % 2 === 0) {
            return (values[mid - 1] + values[mid]) / 2;
        } else {
            return values[mid];
        }
    }

    calculateStats(columns: any[], data: any[]): { [key: string]: any; } {
        let aggregateStatistics: { [key: string]: any } = {};
        let estatesSeen: { [key: string]: Set<string> } = {};

        // Iterate over the headers and initialize aggregate statistics for each column
        columns.forEach((header: string) => {
            // Ignore headers that should be ignored
            if (header === 'Year_Start' || header === 'Year_End' || header === 'Estate_ID' || header === 'Estate_Name' || header === 'Estate_RV' || header === 'Block_ID' || header === 'Block_Name' || header === 'Block_RV') {
                return;
            }

            if(header.startsWith('Estate')) {
                estatesSeen[header] = new Set();
            }

            // Initialize aggregate statistics object for the current column
            aggregateStatistics[header] = {
                max: Number.NEGATIVE_INFINITY,
                min: Number.POSITIVE_INFINITY,
                sum: 0,
                count: 0,
                values: []
            };
        });

        // Iterate over the data rows to calculate aggregate statistics
        data.forEach((row: { [x: string]: any; }) => {
            columns.forEach((header: string) => {
                // Ignore columns that should be ignored
                if (header === 'Year_Start' || header === 'Year_End' || header === 'Estate_ID' || header === 'Estate_Name' || header === 'Estate_RV' || header === 'Block_ID' || header === 'Block_Name' || header === 'Block_RV') {
                    return;
                }

                // Extract the numeric value from the current cell
                const value = parseFloat(row[header]);
                if(isNaN(value)) {
                    console.log("Value is NaN");
                }

                if(value > 0) {
                    if(header.startsWith('Estate') && !estatesSeen[header].has(row['Estate_Name'])) {
                        estatesSeen[header].add(row['Estate_Name'])
                        // Update aggregate statistics for the current column for unique estate values
                        const columnStats = aggregateStatistics[header];
                        columnStats.max = Math.max(columnStats.max, value);
                        columnStats.min = Math.min(columnStats.min, value);
                        columnStats.sum += value;
                        columnStats.count++;
                        columnStats.values.push(value);
                    }
                    else if(header.startsWith('Block')) {
                        // Update aggregate statistics for the current column
                        const columnStats = aggregateStatistics[header];
                        columnStats.max = Math.max(columnStats.max, value);
                        columnStats.min = Math.min(columnStats.min, value);
                        columnStats.sum += value;
                        columnStats.count++;
                        columnStats.values.push(value);
                    }
                }
            });
        });

        // Calculate mean and median for each column
        Object.keys(aggregateStatistics).forEach(header => {
            const columnStats = aggregateStatistics[header];
            columnStats.mean = columnStats.sum / columnStats.count;
            columnStats.median = this.calculateMedian(columnStats.values);
        });
        return aggregateStatistics;
    }

    loadData(): Promise<void> {
        return new Promise<void> ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = result.data as UnitChargeData[];
                this.columnNames = result.meta.fields || [];
                this.stats = this.calculateStats(this.columnNames, this.data);
                resolve();
            },
            error: (error: any) => reject(error)
          });
        });
    }

    getUnitCharges(estate_id: string, block_id: string): UnitChargeData | undefined {
        const charges = this.data.find((item: UnitChargeData) => item.Estate_ID === estate_id && item.Block_ID === block_id); // Finds the first row, assuming there is only 1 year of data

        return charges;
    }

    // This assumes there is only one year's worth of data in the dataset
    getSimilarBlockCharges(block_rv: number): UnitChargeData[] {
        const charges = this.data.filter((item: UnitChargeData) => item.Block_RV >= Math.max((block_rv - 500), 0) && item.Block_RV <= (block_rv + 500))
                        .sort((a: UnitChargeData, b: UnitChargeData) => b.Block_RV - a.Block_RV); // Sort in descending order
        return charges;
    }

    getSimilarEstateCharges(estate_rv: number): UnitChargeData[] {
        const estatesSeen = new Set();
        const charges = this.data.filter((item: UnitChargeData) => {
                                    if(!estatesSeen.has(item.Estate_ID)) {
                                        estatesSeen.add(item.Estate_ID);
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                })
                                 .filter((item: UnitChargeData) => item.Estate_RV >= Math.max((estate_rv - (estate_rv / 10)), 0) && item.Estate_RV <= (estate_rv + (estate_rv / 10)))
                        .sort((a: UnitChargeData, b: UnitChargeData) => b.Estate_RV - a.Estate_RV); // Sort in descending order
        return charges;
    }

    getSimilarBlockStats(block_rv: number): ChargeStat {
        const charges = this.data.filter((item: UnitChargeData) => item.Block_RV >= Math.max((block_rv - 500), 0) && item.Block_RV <= (block_rv + 500))
                        .sort((a: UnitChargeData, b: UnitChargeData) => b.Block_RV - a.Block_RV); // Sort in descending order
        return this.calculateStats(this.columnNames, charges);
    }

    getSimilarEstateStats(estate_rv: number): ChargeStat {
        const estatesSeen = new Set();
        const charges = this.data.filter((item: UnitChargeData) => {
                                    if(!estatesSeen.has(item.Estate_ID)) {
                                        estatesSeen.add(item.Estate_ID);
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                })
                                 .filter((item: UnitChargeData) => item.Estate_RV >= Math.max((estate_rv - (estate_rv / 10)), 0) && item.Estate_RV <= (estate_rv + (estate_rv / 10)))
                        .sort((a: UnitChargeData, b: UnitChargeData) => b.Estate_RV - a.Estate_RV); // Sort in descending order
        return this.calculateStats(this.columnNames, charges);
    }
}

export default UnitChargesRepository;
