import Papa from 'papaparse';
import { BlockData } from '../interfaces/BlockData';

class BlocksRepository {
    csvFilePath: string;
    data: BlockData[];
    dataLoaded: Promise<unknown>;
    constructor(borough: string) {
        this.csvFilePath = `./${borough}/blocks.csv`;
        this.data = [];
        this.dataLoaded = this.loadData(); // Returns a promise
    }

    loadData() {
        return new Promise<void> ((resolve, reject) => {
          Papa.parse(this.csvFilePath, {
            download: true,
            header: true,
            complete: (result: any) => {
                this.data = result.data.sort((a: { Block_Name: string; }, b: { Block_Name: string; }) => {
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
            error: (error: any) => reject(error)
          });
        });
    }

    getBlocks(estate_id: string): BlockData[] {
        return this.data.filter(item => item.Estate_ID === estate_id);
    }
}

export default BlocksRepository;