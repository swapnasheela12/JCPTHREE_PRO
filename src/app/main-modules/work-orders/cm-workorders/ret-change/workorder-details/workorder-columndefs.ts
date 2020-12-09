export interface dropdown {
    name: string;
}
export const CELL_DETAILS_COLUMN_DEFS = [
    {
        headerName: 'Jio Center ID',
        field: 'jio_centerID',
        width: 150,
        pinned: 'left'
    },
    {
        headerName: 'SAP ID',
        field: 'sapId',
        width: 150,
        pinned: 'left'
    },
    {
        headerName: 'Cell ID/ENB ID',
        field: 'cellID_enbID',
        width: 150
    },
    {
        headerName: 'CNUM',
        field: 'cnum',
        width: 150
    },
    {
        headerName: 'Sector ID',
        field: 'sectorID',
        width: 150
    },
    {
        headerName: 'Band',
        field: 'band',
        width: 150
    },
    {
        headerName: 'Category',
        field: 'category',
        width: 150
    },
    {
        headerName: 'Parameter',
        field: 'parameter',
        width: 150
    },
    {
        headerName: 'Previous Value',
        field: 'previousValue',
        width: 150
    },
    {
        headerName: 'Current Value',
        field: 'currentValue',
        width: 150

    },
    {
        headerName: 'Approved Ref. Value',
        field: 'approvedRefValue',
        width: 150
    },
    {
        headerName: 'Status',
        field: 'status',
        width: 150
    },
    {
        headerName: 'PRE POST Result',
        field: 'prePostResult',
        width: 150
    },
    {
        headerName: 'PRE POST Status',
        field: 'prePostStatus',
        width: 150

    },
    {
        headerName: 'Pre KPI Date',
        field: 'preKPIDate',
        width: 150
    },
    {
        headerName: 'Post KPI Date',
        field: 'postKPIDate',
        width: 150
    },
    {
        headerName: 'PRE POST Result Date',
        field: 'prePostResultDate',
        width: 150
    },
    {
        headerName: 'Input',
        cellRenderer: 'inputRenderer',
        width: 90,
        pinned: 'right',
    },
    {
        headerName: "",
        cellRenderer: 'iconRenderer',
        width: 90,
        pinned: 'right',
    }
];

export const Status: dropdown[] = [
    { name: 'All Status' },
    { name: 'In Queue' },
    { name: 'Success' },
    { name: 'Failure' },
    { name: 'Time out' }
];
export const Category: dropdown[] = [
    { name: 'All Category' },
    { name: 'Change RET Info' }
];