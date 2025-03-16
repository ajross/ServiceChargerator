import Papa from 'papaparse';

interface ChargeData {
    Year_Start: number,
    Year_End: number,
    Estate_ID: string,
    Block_ID: string,
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
