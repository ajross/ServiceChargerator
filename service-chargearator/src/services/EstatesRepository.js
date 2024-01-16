import Papa from 'papaparse';

class EstatesRepository {
    constructor() {
        this.csvFilePath = "./estates.csv";
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
    }

    loadData() {
        return new Promise ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = result.data;
                resolve();
            },
            error: (error) => reject(error)
          });
        });
    }

    getEstates() {
        return this.data;
    }
}

export default EstatesRepository;