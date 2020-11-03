
export interface dropdown {
    name: string;
}

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