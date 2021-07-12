import { GridCore, GridOptions } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { ThreeDotDeleteRenderer } from '../../renderer/threedot-delete-renderer';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent {
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public sidenavBarStatus;
  public tableWidth;
  public gridPinned = false;
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  public frameworkComponentsTaskDetails = {
    threedotrenderer: ThreeDotDeleteRenderer,
  };
  public searchGrid = '';


  public opens = 'right';
  public drops = 'down';
  constructor(public dialogRef: MatDialogRef<ViewTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, 
    public dialog: MatDialog,private httpClient: HttpClient) {
    router.events.subscribe((url: any) => console.log(url));

    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();
    this.getMyTaskDetails();
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/workorder/nv-workorder/view-task.json')
      .subscribe(data => {
        this.rowData = data;
      });
  }

  onChange(event) {
    console.log(event)
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 140,
        pinned: 'left'
      },
      {
        headerName: "Task Id",
        field: "workorder",
        width: 200,
        cellRenderer: function(params) {
          let template = '<div>'+
          '<div style="line-height: 2.8;">'+ params.data.taskName +'</div>'+
          '<div style="line-height: 2px; color:#676767">'+ params.data.taskCreated +'</div>'+
          '</div>';
          return template;
        }
      },
      {
        headerName: "Assigned By",
        field: "assignedBy",
        width: 250,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 150,
      },
      {
        headerName: "Due Date",
        field: "dueDate",
        width: 180
      },
      // {
      //   headerName: "Created By",
      //   field: "createdBy",
      //   width: 160
      // },
      {
        headerName: "Last Updated",
        field: "lastUpdatedDate",
        width: 180,
        cellRenderer: function(params) {
          let template = '<div>'+
          '<div style="line-height: 2.8;">'+params.data.lastUpdatedDate+'</div>'+
          '<div style="line-height: 2px; color: #676767">'+params.data.lastUpdatedTime+'</div>'+
          '</div>';
          return template;
        }
      },
      {
        headerName: "Reason",
        field: "reason",
        width: 180
      },
      {
        headerName: "",
        cellRenderer: 'threedotrenderer',
        width: 90,
        pinned: 'right'
      }
    ];
  }

  statusFunc(params) {
    var status = params.value;
    var barColor = '';
    if (status == "Completed") {
      barColor = '#60DD5C';
    } else if (status == "In Progress" || status == "Started") {
      barColor = '#F8C93A';
    } else if (status == "Rejected") {
      barColor = '#F8C93A';
    } else if (status == "Re-Assigned") {
      barColor = '#5D97E6';
    } else {
      barColor = '#8A8A8A';
    }
    return '<span class="status-bar" style="font-size: 13px; font-family: lato Regular; background-color: ' +
      barColor +
      ';">' +
      status + '</span>';
  }


  dateFunc(params) {
    var status = params.value;
    console.log("status", status);
    return '<input type="date" style="border: transparent; border-bottom: 1px solid gray;width: 100%;height: 32px;" value="' + status + '">';
  }


  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);
  }


  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
    this.eventsSubject.subscribe((data) => {
      this.gridOptions.api.setQuickFilter(data.filter);
    });
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
  }

}

