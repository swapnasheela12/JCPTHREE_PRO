export const COLUMN_DEFS = [
  {
    headerName: 'Vendor',
    field: 'vendor',
    pinned: 'left',
    cellRenderer: getValue
  },
  {
    headerName: 'Backhaul',
    children: [
      {
        headerName: '',
        field: 'backhaultotal',
        columnGroupShow: 'closed',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Embedded Services Router (ESR)',
        field: 'css',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Pre-Aggregation Router (PAR)',
        field: 'ag1',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Aggregation Router (AAR)',
        field: 'ag2',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Cloud Core Router (CCR)',
        field: 'ag3',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Cloud Service Router (CSR)',
        field: 'sar',
        columnGroupShow: 'open',
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
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Data Center WAN (DCWAN)',
        field: 'dcwan',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'L3 Aggregator (Nexus)',
        field: 'nexus',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'TOR Switch (TOR)',
        field: 'tor',
        columnGroupShow: 'open',
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
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Network Performance Management (CNR)',
        field: 'cnpm',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Unicast Route Reflector (URR)',
        field: 'urr',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Router Reflector (CRR)',
        field: 'crr',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Gateway Router (IGR)',
        field: 'igr',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Border Router (IBR)',
        field: 'ibr',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Internet Router Reflector (IRR)',
        field: 'irr',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Core Blackholing Router (CBR)',
        field: 'cbr',
        columnGroupShow: 'open',
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
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'L2 Swicthes',
        field: 'swicthes',
        columnGroupShow: 'open',
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
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Edge',
        field: 'dcnedge',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Aggregat',
        field: 'dcnaggregat',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'DCN Core',
        field: 'dcncore',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      },
      {
        headerName: 'Utility Aggregation',
        field: 'ua',
        columnGroupShow: 'open',
        headerClass: 'text-right childHeader',
        cellClass: 'text-right'
      }
    ]
  }
];

/**
 *
 * Returns material icons corresponding to expand field.
 *
 * @author Gayatri Ganesh
 *
 */
function getValue(params: any) {
  if (params['data'].expand === false) {
    return (
      getspace(params.data) +
      '<span><i class="material-icons">add_circle_outline</i>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else if (params['data'].expand === true) {
    return (
      getspace(params.data) +
      '<span><i class="material-icons">remove_circle_outline</i>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else {
    return getspace(params.data) + params.value;
  }
}

/**
 *
 * Returns whitespace before icon corresponding to group level.
 *
 * @author Gayatri Ganesh
 *
 */
function getspace(item: { level: any }) {
  const level = item.level;
  let count: number;
  let i = 0;
  let spaceString = '&nbsp;';

  if (level === 1) {
    return '';
  }
  count = level;

  for (i; i < count * 3; i++) {
    spaceString = spaceString + '&nbsp;';
  }
  return spaceString;
}