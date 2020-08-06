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

            return '<span class="md-line-status" style="background-color: ' +
                barColor +
                ';"></span><div class="md-two-lines-cell align-v-middle"><div class="values color-87">' +
                status + '</div></div>';
        },
        pinned: 'left',
        width: 150
    },
    {
        headerName: 'Task Id',
        field: 'taskid',
        width: 150
    },
    {
        headerName: 'Task Category',
        field: 'taskcategory',
        width: 150
    },
    {
        headerName: 'Priority',
        field: 'Priority',
        width: 150
    },
    {
        headerName: 'Due Date',
        field: 'duedate',
        width: 150
    },
    {
        headerName: 'Assigned To',
        field: 'assignedtoname',
        cellRenderer: function (params) {
            var assignedbyname = params.data.assignedtoname;
            var assignedby = params.data.assignedby;
            if (assignedbyname == "Pending") {
                return '<div class="md-two-lines-cell"><div class="values color-54">' + assignedbyname + '</div></div>';
            } else {
                return '<div class="md-two-lines-cell"><div class="values color-54">' + assignedbyname + '</div><div class="values color-54">' + assignedby + '</div></div>';
            }
        },
        width: 150
    },
    {
        headerName: 'last Modified',
        field: 'lastmodified',
        width: 150
    },
    {
        headerName: 'Task Completion',
        field: 'taskCompletion',
        cellRenderer: function (params) {
            var taskcompletion = params.data.progressby;
            var taskprogress = params.data.progressbar;
            // var taskprogresscolor = params.data.taskColor;

            var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
                ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

            var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
                ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

            var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
                ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
            if (taskcompletion == "Generated") {
                return template1;
            } else if (taskcompletion == "#5 in Queue") {
                return template2;
            } else {
                return template3;
            }
        },
        width: 150
    }, {
        headerName: "",
        cellRenderer: 'viewHistroyRenderer',
        pinned: 'right',
        width: 90
    }

];