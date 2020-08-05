export const COLUMN_DEFS = [
  {
    headerName: 'Vendor',
    field: 'vendor',
    pinned: 'left',
    width: 150
  },
  {
    headerName: 'Backhaul',
    children: [
      {
        headerName: '',
        field: 'backhaultotal',
        columnGroupShow: 'closed',
        width: 150,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Embedded Services Router (ESR)',
        field: 'css',
        columnGroupShow: 'open',
        width: 280,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Pre-Aggregation Router (PAR)',
        field: 'ag1',
        columnGroupShow: 'open',
        width: 250,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Aggregation Router (AAR)',
        field: 'ag2',
        columnGroupShow: 'open',
        width: 250,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Cloud Core Router (CCR)',
        field: 'ag3',
        columnGroupShow: 'open',
        width: 250,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Cloud Service Router (CSR)',
        field: 'sar',
        columnGroupShow: 'open',
        width: 250,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  },
  {
    headerName: 'Data Center',
    children: [
      {
        headerName: '',
        field: 'datacentertotal',
        columnGroupShow: 'closed',
        width: 150,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Data Center WAN (DCWAN)',
        field: 'dcwan',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'L3 Aggregator (Nexus)',
        field: 'nexus',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'TOR Switch (TOR)',
        field: 'tor',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  },
  {
    headerName: 'Internet',
    children: [
      {
        headerName: '',
        field: 'internettotal',
        columnGroupShow: 'closed',
        width: 150,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Network Performance Management (CNR)',
        field: 'cnpm',
        columnGroupShow: 'open',
        width: 350,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Unicast Route Reflector (URR)',
        field: 'urr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Router Reflector (CRR)',
        field: 'crr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Gateway Router (IGR)',
        field: 'igr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Border Router (IBR)',
        field: 'ibr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Router Reflector (IRR)',
        field: 'irr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Blackholing Router (CBR)',
        field: 'cbr',
        columnGroupShow: 'open',
        width: 240,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  },
  {
    headerName: 'L2 Switch',
    children: [
      {
        headerName: '',
        field: 'l2total',
        columnGroupShow: 'closed',
        width: 150,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'L2 Swicthes',
        field: 'swicthes',
        columnGroupShow: 'open',
        width: 200,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  },
  {
    headerName: 'Data Communication Network',
    children: [
      {
        headerName: '',
        field: 'datacommunicationtotal',
        columnGroupShow: 'closed',
        width: 250,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Edge',
        field: 'dcnedge',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Aggregat',
        field: 'dcnaggregat',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Core',
        field: 'dcncore',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Utility Aggregation',
        field: 'ua',
        columnGroupShow: 'open',
        width: 180,
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  }
];