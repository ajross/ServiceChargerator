import Papa from 'papaparse';

class ChargesRepository {
    constructor(borough) {
        this.csvFilePath = `./${borough}/charges.csv`;
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
        this.columnNames = [];
    }

    loadData() {
        return new Promise ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result) => {
                this.data = result.data;
                this.columnNames = result.meta.fields;
                resolve();
            },
            error: (error) => reject(error)
          });
        });
    }

    getCharges(estate_id, block_id) {
        const charges = this.data.filter(item => item.Estate_ID === estate_id && item.Block_ID === block_id)
                        .sort((a, b) => a.Year_End - b.Year_End); // TODO: Can this be moved into the complete method?

        return charges;
    }
}

export default ChargesRepository;
