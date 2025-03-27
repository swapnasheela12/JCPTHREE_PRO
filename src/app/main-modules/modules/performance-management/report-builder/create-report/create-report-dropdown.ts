
export interface dropdown {
    name: string;
}

export const Geography: dropdown[] = [
    {name: 'All Zone'},
    {name: '5.0.0'},
    {name: '6.0.0'},
    {name: '1.3.1'},
    {name: '6.1.0'},
    {name: '7.9.0'},
    {name: '5.0.1'}
];

export const City: dropdown[] = [
    {name: 'None'},
    {name: 'All Cities-Aggregated'},
    {name: 'All Cities-Individual'},
    {name: 'Amritsar'},
    {name: 'Barnala'},
    {name: 'Baithinda'},
    {name: 'Faridkot'}
];

export const JioCenter: dropdown[] = [
    {name: 'PAN India'},
    {name: 'All R4G States-Individual'},
    {name: 'Andhra Pradesh'},
    {name: 'Arunachal Pradesh'},
    {name: 'Bihar'}
];

export const JioCluster: dropdown[] = [
    {name: 'All Bands-Aggregated'},
    {name: 'All R4G States-Individual'},
    {name: 'PB-ABHR-0099'},
    {name: 'PB-ABHR-1000'},
    {name: 'PB-ABHR-1001'}
];

export const NodeAggregation: dropdown[] = [
    {name: 'All Cell Individual'},
    {name: 'All ENB Individual'},
    {name: 'All Sectors Individual'},
    {name: 'All Small Cell Individual'},
    {name: 'All ISC Individual'}
];

export const Band: dropdown[] = [
    {name: 'All'},
    {name: '2300'},
    {name: '2300_C1'},
    {name: '2300_C2'},
    {name: '1800'}
];

export const  vendorList: dropdown[] = [
    { 'name': 'Samsung' },
    { 'name': 'Airspan' },
    { 'name': 'NetScout' }
  ]