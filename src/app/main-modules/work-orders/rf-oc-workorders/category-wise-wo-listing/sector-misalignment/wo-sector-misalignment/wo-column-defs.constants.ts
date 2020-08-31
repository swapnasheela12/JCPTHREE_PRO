export const COLUMN_DEFS = [
    {
        headerName: " ",
        field: "grouplist",
        // rowGroup: true,
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
        width: 140
    },
    {
        headerName: 'Task Id',
        field: 'taskid',
        pinned: 'left',
        width: 180
    },
    {
        headerName: 'Task',
        field: 'taskid',
        width: 180
    },

    {
        headerName: 'Due Date',
        field: 'duedate',
        width: 160
    },
    {
        headerName: 'Assigned To',
        field: 'assignedto',
        cellRenderer: function (params) {
            var assignedbyname = params.data.assignedto;
            var assignedby = params.data.assignedby;
            // if (assignedbyname) {
            //     return '<div class="md-two-lines-cell"><div class="values color-54">' + assignedbyname + '</div></div>';
            // } else {
            return '<div class="md-two-lines-cell"><div class="values color-54">' + assignedbyname + '</div><div class="values color-54">' + assignedby + '</div></div>';
            // }
        },
        width: 170
    },
    {
        headerName: 'last Modified Date',
        field: 'lastmodified',
        width: 180,
        pinned: "right"
    }

];