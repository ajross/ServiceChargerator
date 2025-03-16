import Papa from 'papaparse';

interface UnitChargeData {
    Year_Start: number,
    Year_End: number,
    Estate_ID: string,
    Estate_Name: string,
    Estate_RV: number,
    Block_ID: string,
    Block_Name: string,
    Block_RV: number,
    Block_Boiler_Repairs_and_Maintenance: string,
    Block_Cleaning: string,
    Block_Communal_Electricity: string,
    Block_Communal_Electrical_Maintenance: string,
    Block_Communal_Ventilation_Maintenance: string,
    Block_Communal_Water_Quality: string,
    Block_Communal_Window_Cleaning: string,
    Block_Concierge: string,
    Block_CCTV: string,
    Block_Disinfestation: string,
    Block_Door_Entry_System: string,
    Block_Dry_Riser: string,
    Block_Lightning_Protection: string,
    Block_Lift_Services_and_Repairs: string,
    Block_Fire_Ventilation_Maintenance: string,
    Block_Repairs_and_Maintenance: string,
    Block_TV_Aerial: string,
    Block_Ext_Cleaning: string,
    Block_Ext_External_Tree_Maintenance: string,
    Block_Ext_Grounds_Maintenance: string,
    Block_Ext_Repairs_and_Maintenance: string,
    Estate_Cleaning: string,
    Estate_CCTV: string,
    Estate_Communal_Electricity: string,
    Estate_Grounds_Maintenance: string,
    Estate_Repairs_and_Maintenance: string,
    Estate_Tree_Maintenance: string
}

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
    calculateMedian(values: any[]) {
        values.sort((a: number, b: number) => a - b);
        const mid = Math.floor(values.length / 2);
        if (values.length % 2 === 0) {
            return (values[mid - 1] + values[mid]) / 2;
        } else {
            return values[mid];
        }
    }

    calculateStats(columns: any[], data: any[]) {
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

    loadData() {
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

    getUnitCharges(estate_id: string, block_id: string) {
        const charges = this.data.find((item: { Estate_ID: any; Block_ID: any; }) => item.Estate_ID === estate_id && item.Block_ID === block_id); // Finds the first row, assuming there is only 1 year of data

        return charges;
    }

    // This assumes there is only one year's worth of data in the dataset
    getSimilarBlockCharges(block_rv: number) {
        const charges = this.data.filter((item: { Block_RV: number; }) => item.Block_RV >= Math.max((block_rv - 500), 0) && item.Block_RV <= (block_rv + 500))
                        .sort((a: { Block_RV: number; }, b: { Block_RV: number; }) => b.Block_RV - a.Block_RV); // Sort in descending order
        return charges;
    }

    getSimilarEstateCharges(estate_rv: number) {
        const estatesSeen = new Set();
        const charges = this.data.filter((item: { Estate_ID: unknown; }) => {
                                    if(!estatesSeen.has(item.Estate_ID)) {
                                        estatesSeen.add(item.Estate_ID);
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                })
                                 .filter((item: { Estate_RV: number; }) => item.Estate_RV >= Math.max((estate_rv - (estate_rv / 10)), 0) && item.Estate_RV <= (estate_rv + (estate_rv / 10)))
                        .sort((a: { Estate_RV: number; }, b: { Estate_RV: number; }) => b.Estate_RV - a.Estate_RV); // Sort in descending order
        return charges;
    }

    getSimilarBlockStats(block_rv: number) {
        const charges = this.data.filter((item: { Block_RV: number; }) => item.Block_RV >= Math.max((block_rv - 500), 0) && item.Block_RV <= (block_rv + 500))
                        .sort((a: { Block_RV: number; }, b: { Block_RV: number; }) => b.Block_RV - a.Block_RV); // Sort in descending order
        return this.calculateStats(this.columnNames, charges);
    }

    getSimilarEstateStats(estate_rv: number) {
        const estatesSeen = new Set();
        const charges = this.data.filter((item: { Estate_ID: unknown; }) => {
                                    if(!estatesSeen.has(item.Estate_ID)) {
                                        estatesSeen.add(item.Estate_ID);
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                })
                                 .filter((item: { Estate_RV: number; }) => item.Estate_RV >= Math.max((estate_rv - (estate_rv / 10)), 0) && item.Estate_RV <= (estate_rv + (estate_rv / 10)))
                        .sort((a: { Estate_RV: number; }, b: { Estate_RV: number; }) => b.Estate_RV - a.Estate_RV); // Sort in descending order
        return this.calculateStats(this.columnNames, charges);
    }
}

export default UnitChargesRepository;
