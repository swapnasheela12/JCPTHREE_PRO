export const TWAMP_COLUMN_DEFS = [
  {
    headerName: 'Node',
    field: 'node',
    width: 150,
    pinned: 'left',
    tooltipField: 'node',
    headerClass: 'parent-header'
  },
  {
    headerName: 'Provisioned',
    field: 'provision',
    width: 170,
    pinned: 'left',
    headerClass: 'parent-header',
    cellRendererParams: {
      footerValueGetter: (params) => 'Text (' + params.value + ')'
    },
    aggFunc: "sum"
  },
  {
    headerName: 'Live',
    field: 'liveSiteCount',
    width: 120,
    pinned: 'left',
    headerClass: 'parent-header'
  },
  {
    headerName: 'Delta',
    field: 'delta',
    width: 120,
    pinned: 'left',
    headerClass: 'parent-header'
  },
  {
    headerName: 'Direction',
    field: 'direction',
    width: 150,
    pinned: 'left',
    tooltipField: 'direction',
    headerClass: 'parent-header'
  },
  {
    headerName: "06:00 P.M",
    headerClass: "text-align-group-header",
    children: [{
        headerName: "00",
        field: "0",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header',
        tooltipField: '0',
        tooltipComponentParams: { color: '#ececec' },
    }, {
        headerName: "05",
        field: "5",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header',
        tooltipField: '5',
        tooltipComponentParams: { color: '#ececec' },
    },{
      headerName: "10",
      field: "10",
      width: 110,
      suppressMenu: true,
      headerClass: 'child-header',
      tooltipField: '10',
      tooltipComponentParams: { color: '#ececec' },
    },{
      headerName: "15",
      field: "15",
      width: 110,
      suppressMenu: true,
      tooltipField: '15',
      tooltipComponentParams: { color: '#ececec' },
      headerClass: 'child-header'
    },{
      headerName: "20",
      field: "20",
      width: 110,
      suppressMenu: true,
      tooltipField: '20',
      tooltipComponentParams: { color: '#ececec' },
      headerClass: 'child-header'
    },{
      headerName: "25",
      field: "25",
      width: 110,
      suppressMenu: true,
      tooltipField: '25',
      tooltipComponentParams: { color: '#ececec' },
      headerClass: 'child-header'
    },
    {
      headerName: "30",
      field: "30",
      width: 110,
      suppressMenu: true,
      tooltipField: '30',
      tooltipComponentParams: { color: '#ececec' },
      headerClass: 'child-header'
    }]
  }
];

export const TWAMP_LIVE_VIOLATION_REPORT = [
  {
    headerName: 'Zone',
    field: 'zone',
    pinned: 'left',
    width: 140,
    tooltipField: 'zone',
    headerClass: 'parent-header'
  },
  {
    headerName: 'R4GState',
    field: 'r4gstate',
    width: 140,
    pinned: 'left',
    tooltipField: 'r4gstate',
    headerClass: 'parent-header'
  },
  {
    headerName: 'End-SapID',
    field: 'sapid',
    width: 170,
    pinned: 'left',
    tooltipField: 'sapid',
    headerClass: 'parent-header'
  },
  {
    headerName: 'Direction',
    field: 'slaviodirection',
    width: 140,
    pinned: 'left',
    tooltipField: 'slaviodirection',
    headerClass: 'parent-header'
  },
  {
    headerName: 'Type',
    field: 'slaviotype',
    width: 140,
    pinned: 'left',
    tooltipField: 'slaviotype',
    headerClass: 'parent-header'
  },
  {
    headerName: "Package Loss %",
    headerClass: "text-align-group-header",
    children: [{
        headerName: "Avg",
        field: "packetlossavg",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header'
    }, {
        headerName: "Max",
        field: "packetlossmax",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header'
    },{
      headerName: "95th",
      field: "packetloss95",
      width: 110,
      suppressMenu: true,
      headerClass: 'child-header'
    }]
  },
  {
    headerName: "Latency(ms)",
    headerClass: "text-align-group-header",
    children: [{
        headerName: "Avg",
        field: "latencyavg",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header'
    }, {
        headerName: "Max",
        field: "latencymax",
        width: 110,
        suppressMenu: true,
        headerClass: 'child-header'
    },{
      headerName: "95th",
      field: "latency95",
      width: 110,
      suppressMenu: true,
      headerClass: 'child-header'
    }]
  }
];

export const GEOGRAPHY = [
  { geography_name: 'Maharashtra' },
  { geography_name: 'Chattisgarh' },
  { geography_name: 'Gujarat' },
  { geography_name: 'Andhra Pradesh' },
  { geography_name: 'Bihar' },
  { geography_name: 'Karnataka' },
  { geography_name: 'West Bengal' },
  { geography_name: 'Orissa' },
];

export const NODE_LIST = [
  { node_name: 'eNodeB' },
  { node_name: 'CSS-ESR' },
  { node_name: 'AG1-PAR' },
  { node_name: 'AG2-AAR' },
  { node_name: 'AG2-AA' },
  { node_name: 'AG3-CCR' },
  { node_name: 'SAR-CSR' }
];

export const DSCP_LIST = [
  { dscp_name: '00' },
  { dscp_name: '05' },
  { dscp_name: '10' },
  { dscp_name: '15' },
  { dscp_name: '20' },
  { dscp_name: '25' },
  { dscp_name: '30' }
];

export const KPI_LIST = [
  { kpi_name: 'Packet Loss' },
  { kpi_name: 'Latency' },
  { kpi_name: 'Jitter' },
  { kpi_name: 'VOLTE Outage Simulation' },
  { kpi_name: 'VOLTE Outage Simulation1' },
  { kpi_name: 'VOLTE Outage Simulation2' },
  { kpi_name: 'VOLTE Outage Simulation3' }
];

export interface type_dropdown {
  type_name: string;
}
export const TYPE_LIST = [
  {type_name: 'Two Way-eNode'},
  {type_name: 'EPC to eNodeB'},
  {type_name: 'eNodeB to EPC'}
];

export const DIRECTION_LIST = [
  {direction_name: 'Metro'},
  {direction_name: 'NLD'},
];

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};