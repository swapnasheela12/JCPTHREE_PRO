
export interface selectedLayer {
    id: string;
    name: string;
  }
  
  export interface selectedLayerGroup {
    name: string;
    selectedLayers: selectedLayer[];
  }
  
  
  /** list of selectedLayers */
  export const selectedLayerS: selectedLayer[] = [
    {name: 'Analytics - RF - In building', id: 'A'},
    {name: 'Analytics - RF - Session', id: 'B'},
    {name: 'Analytics - RF - DL Throughput', id: 'C'},
    {name: 'Analytics - RF - RSRP', id: 'D'},
    // {name: 'selectedLayer E (France)', id: 'E'},
    // {name: 'selectedLayer F (Italy)', id: 'F'},
    // {name: 'selectedLayer G (Italy)', id: 'G'},
    // {name: 'selectedLayer H (Italy)', id: 'H'},
    // {name: 'selectedLayer I (Italy)', id: 'I'},
    // {name: 'selectedLayer J (Italy)', id: 'J'},
    // {name: 'selectedLayer Kolombia (United States of America)', id: 'K'},
    // {name: 'selectedLayer L (Germany)', id: 'L'},
    // {name: 'selectedLayer M (Germany)', id: 'M'},
    // {name: 'selectedLayer N (Germany)', id: 'N'},
    // {name: 'selectedLayer O (Germany)', id: 'O'},
    // {name: 'selectedLayer P (Germany)', id: 'P'},
    // {name: 'selectedLayer Q (Germany)', id: 'Q'},
    // {name: 'selectedLayer R (Germany)', id: 'R'}
  ];
  
  /** list of selectedLayer groups */
  export const selectedLayerGROUPS: selectedLayerGroup[] = [
    {
      name: 'Switzerland',
      selectedLayers: [
        {name: 'selectedLayer A', id: 'A'},
        {name: 'selectedLayer B', id: 'B'}
      ]
    },
    {
      name: 'France',
      selectedLayers: [
        {name: 'selectedLayer C', id: 'C'},
        {name: 'selectedLayer D', id: 'D'},
        {name: 'selectedLayer E', id: 'E'},
      ]
    },
    {
      name: 'Italy',
      selectedLayers: [
        {name: 'selectedLayer F', id: 'F'},
        {name: 'selectedLayer G', id: 'G'},
        {name: 'selectedLayer H', id: 'H'},
        {name: 'selectedLayer I', id: 'I'},
        {name: 'selectedLayer J', id: 'J'},
      ]
    },
    {
      name: 'United States of America',
      selectedLayers: [
        {name: 'selectedLayer Kolombia', id: 'K'},
      ]
    },
    {
      name: 'Germany',
      selectedLayers: [
        {name: 'selectedLayer L', id: 'L'},
        {name: 'selectedLayer M', id: 'M'},
        {name: 'selectedLayer N', id: 'N'},
        {name: 'selectedLayer O', id: 'O'},
        {name: 'selectedLayer P', id: 'P'},
        {name: 'selectedLayer Q', id: 'Q'},
        {name: 'selectedLayer R', id: 'R'}
      ]
    }
  ];
  