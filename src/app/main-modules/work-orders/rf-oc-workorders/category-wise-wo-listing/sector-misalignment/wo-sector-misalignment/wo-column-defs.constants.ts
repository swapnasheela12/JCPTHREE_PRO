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
        width: 130
    },
    {
        headerName: 'Task Id',
        field: 'taskid',
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
        width: 140
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
        width: 150
    },
    {
        headerName: 'last Modified Date',
        field: 'lastmodified',
        width: 140
    },
    {
        headerName: 'Task Completion',
        field: 'taskCompletion',
        cellRenderer: function (params) {
           var taskcompletion = params.data.taskcompletion;
            var taskprogress = params.data.progressbar;
            // var taskprogresscolor = params.data.taskColor;

            var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskprogress + '%</div>' +
                ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

            var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskprogress + '%</div>' +
                ' <div class="progress"> <div class="progress-bar bg-in-progress" style="width:' + taskprogress + '%"></div> </div></div>';

            var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskprogress + '%</div>' +
                ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
            if (taskcompletion == "Successful") {
                return template1;
            } else if (taskcompletion == "In Progress") {
                return template2;
            } else {
                return template3;
            }
        },
        pinned: 'right',
        width: 170
    }
    // , {
    //     headerName: "",
    //     cellRenderer: 'viewHistroyRenderer',
    //     pinned: 'right',
    //     width: 90
    // }

];