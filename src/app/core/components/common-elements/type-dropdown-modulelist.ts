
export interface dropdown {
    name: string;
}

export const GraphType: dropdown[] = [
    {name: 'Active Alarm Classification Pie-chart'},
    {name: 'Active Alarm Ageing'},
    {name: 'Circles wise SA Active Alarms with Ageing distribution'},
    {name: 'Alarms vs Outage Minutes'},
    {name: 'Sites with > 24Hr Outage'}
];

export const Node: dropdown[] = [
    {name: 'Macro'},
    {name: 'Small Cell'}
];

export const R4GState: dropdown[] = [
    {name: 'Delhi'},
    {name: 'Rajasthan'},
    {name: 'Uttar Pradesh (East)'},
    {name: 'Uttarakhand'}
];

export const City: dropdown[] = [
    {name: 'MU-MUMB'},
    {name: 'MU-MUMB'},
    {name: 'MU-MUMB'},
    {name: 'MU-MUMB'}
];

export const dataSourceOutdoor: dropdown[] = [
    {name: 'Landmark'},
    {name: 'Major institutes/corporates'},
    {name: 'Building information'},
    {name: 'Rail and Road vectors'},
    {name: 'Traffic junctions'}
];
export const dataSourceIndoor: dropdown[] = [
    {name: 'Landmark'},
    {name: 'Major institutes/corporates'},
    {name: 'Building information'},
    {name: 'Rail and Road vectors'},
    {name: 'Traffic junctions'}
];
export const dataSourceMacro: dropdown[] = [
    {name: 'Landmark'},
    {name: 'Major institutes/corporates'},
    {name: 'Building information'},
    {name: 'Rail and Road vectors'},
    {name: 'Traffic junctions'}
];

export const JC: dropdown[] = [
    {name: 'Mumbai'},
    {name: 'Pune'},
    {name: 'Gujarat'},
    {name: 'Kolkata'}
];

export const JioCluster : dropdown[] = [
    {name: 'MU-NVMB-JC24-0024'},
    {name: 'MU-NVMB-JC24-0025'},
    {name: 'MU-NVMB-JC24-0026'},
    {name: 'MU-NVMB-JC24-0027'}
];

export const SapId : dropdown[] = [
    {name: 'I-DL-GRGN-ENB-6081'},
    {name: 'I-DL-GRGN-ENB-6082'},
    {name: 'I-DL-GRGN-ENB-6083'},
    {name: 'I-DL-GRGN-ENB-6084'}
];

export interface executionStatusDropdown {
    value: string;
  }

export const executionStatus : executionStatusDropdown[] = [
    { value: 'All Status'},
    { value: 'Executed'},
    { value: 'Cancelled'},
    { value: 'Expired'}
  ];

export interface executionStatusDropdown {
    value: string;
  }

