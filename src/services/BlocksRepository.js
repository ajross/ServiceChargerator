import Papa from 'papaparse';

class BlocksRepository {
    constructor() {
        this.csvFilePath = "./blocks.csv";
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
                  if (a.Block_Name < b.Block_Name) {
                    return -1;
                  }
                  if (a.Block_Name > b.Block_Name) {
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

    getBlocks(estate_id) {
        return this.data.filter(item => item.Estate_ID === estate_id);
    }
}

export default BlocksRepository;