import Papa from 'papaparse';
import { EstateData } from '../interfaces/EstateData';

class EstatesRepository {
    csvFilePath: string;
    data: EstateData[];
    dataLoaded: Promise<unknown>;
    constructor(borough: string) {
        this.csvFilePath = `./${borough}/estates.csv`;
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
    }

    loadData() {
        return new Promise<void> ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = (result.data as EstateData[]).sort((a, b) => {
                  if (a.Estate_Name < b.Estate_Name) {
                    return -1;
                  }
                  if (a.Estate_Name > b.Estate_Name) {
                    return 1;
                  }
                  return 0;
                });
                resolve();
            },
            error: (error) => reject(error)
          });
        });
    }

    getEstates(): EstateData[] {
        return this.data;
    }
}

export default EstatesRepository;