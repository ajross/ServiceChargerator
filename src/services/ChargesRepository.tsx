import Papa from 'papaparse';
import { ChargeData } from '../interfaces/ChargeData';

class ChargesRepository {
    csvFilePath: string;
    data: ChargeData[];
    dataLoaded: Promise<unknown>;
    columnNames: string[];
    constructor(borough: string) {
        this.csvFilePath = `./${borough}/charges.csv`;
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
        this.columnNames = [];
    }

    loadData() {
        return new Promise<void> ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = result.data as ChargeData[];
                this.columnNames = result.meta.fields || [];
                resolve();
            },
            error: (error) => reject(error)
          });
        });
    }

    getCharges(estate_id: string, block_id: string) {
        const charges = this.data.filter(item => item.Estate_ID === estate_id && item.Block_ID === block_id)
                        .sort((a, b) => a.Year_End - b.Year_End); // TODO: Can this be moved into the complete method?

        return charges;
    }
}

export default ChargesRepository;
