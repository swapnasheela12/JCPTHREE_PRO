import { WostatusComponent } from '../renderer/wostatus/wostatus.component';
import { IconsModule } from 'angular-bootstrap-md';

export const COLUMN_DEFS = [
    {
        headerName: " ",
        field: "grouplist",
        pinned: 'left',
        width: 70,
    },
    {
        headerName: 'Status',
        field: 'status',
        cellRenderer: function (params) {
            var status = params.value;
            var barColor = '';
            if (status == "Successful") {
                barColor = '#39b54a';
            } else if (status == "In Progress" || status == "Started") {
                barColor = '#ff8000';
            } else if (status == "Not Started") {
                barColor = '#ff8000';
            } else {
                barColor = '#f21400';
            }

            return '<span class="status-bar" style="background-color: ' +
                barColor +
                ';">' +
                status + '</span>';
        },
        pinned: 'left',
        width: 130
    },
    {
        headerName: 'Task Id',
        field: 'taskid',
        width: 180
    },
    {
        headerName: 'Task',
        field: 'task',
        width: 210
    },
    {
        headerName: 'Created Date',
        field: 'createddate',
        width: 210
    },
    {
        headerName: 'Assigned To',
        field: 'assignedto',
        width: 150
    },
    {
        headerName: 'Last Date',
        field: 'lastdate',
        width: 210
    }
];