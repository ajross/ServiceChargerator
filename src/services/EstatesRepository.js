import Papa from 'papaparse';

class EstatesRepository {
    constructor(borough) {
        this.csvFilePath = `./${borough}/estates.csv`;
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
    }

    loadData() {
        return new Promise ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = result.data.sort((a, b) => {
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

    getEstates() {
        return this.data;
    }
}

export default EstatesRepository;