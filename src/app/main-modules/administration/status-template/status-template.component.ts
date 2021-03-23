  import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
  import { HttpClient } from '@angular/common/http';
  import { Component, OnDestroy, ViewChild } from '@angular/core';
  import { FormControl } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { SelectionChangedEvent } from 'ag-grid-community';
  import { Subject, Subscription } from 'rxjs';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
  import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
  import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
  import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
  import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CreateReasonComponent } from '../reason-templates/create-reason/create-reason.component';
import { ThreeDotP2BRenderer } from '../renderer/threedot-p2b-renderer.component';
import {  dropdownMilestoneRendererComponent } from './dropdown-milestone-renderer.component';
import {  dropdownTaskRendererComponent } from './dropdown-task-renderer.component';
import { inputP2BRendererComponent } from './input-p2b-renderer.component';
  @Component({
    selector: 'app-status-template',
    templateUrl: './status-template.component.html',
    styleUrls: ['./status-template.component.scss']
  })
  export class StatusTemplateComponent implements OnDestroy {
    url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
    // @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
    /////
    public gridApi;
    public gridColumnApi;
    public gridCore: GridCore;
    public gridOptions: GridOptions;
    public rowData: any;
    public columnDefs: any[];
    public digitalFormColDefs: any[];
    public frameworkComponentsStatus = {
      statusFlagRenderer: StatusRendererComponent,
      threeDots: ThreeDotP2BRenderer,
      inputRenderer: inputP2BRendererComponent,
      dropdownRenderer: dropdownMilestoneRendererComponent,
      dropdownTaskRenderer: dropdownTaskRendererComponent
    };
    public searchGrid = '';
    public paginationValues: number[] = [10, 20, 30, 40];
    public formControlPageCount = new FormControl();
    public gridFilterValueServices = {};
    public showGlobalOperation: boolean = true;
    public messageSubscription: Subscription;
    public sidenavBarStatus;
    public defaultColDef = { resizable: true };
    public tableWidth;
    public gridPinned = false;
  
    woHeader: Array<any> = [
      {
        id: 1,
        "label": "Site Type",
        "value": "gNodeB"
      },
      {
        id: 2,
        "label": "Last Modified Date",
        "value": "29 Nov 2020"
      },
      {
        id: 3,
        "label": "Modified by",
        "value": "Navneet Kaushik"
      }
    ];
    public destroySubscription: Subscription = new Subscription();
    trackHero(index, woHeader) {
      return woHeader ? woHeader.id : undefined;
    }
  
    onReadyModeUpdate(params) {
      this.calculateRowCount();
    }
  
    public onReady(params) {
      this.gridApi = params.api;
      this.calculateRowCount();
    }
    public calculateRowCount() {
      if (this.gridOptions.api && this.rowData) {
        setTimeout(() => {
          this.gridOptions.api.sizeColumnsToFit();
        }, 1000);
      }
    }
  
    constructor(public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router,
      private httpClient: HttpClient) {
  
      this.gridOptions = <GridOptions>{};
      //this.rowSelection = 'multiple';
      this.createColumnDefs();
  
      this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
      });
      this.getMyTaskDetails();

      this.datashare.currentMessage.subscribe((evt: any) => {
        console.log("edit or delete", evt)
          if(evt.type === "delete") {
          this.gridOptions.api.applyTransaction(
            {
              remove: [evt.rowIndex.node.data]
            }
          );
          this.gridOptions.api.refreshCells({ force: true })
        }
      });
    }
  
    getMyTaskDetails() {
      this.httpClient.get('assets/data/administration/reason-template/reason-template.json')
        .subscribe(data => {
          this.rowData = data;
          this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
          this.datatable.gridPinnedServices = this.gridPinned;
          this.datatable.rowDataServices = this.rowData;
          this.datatable.gridOptionsServices = this.gridOptions;
          this.datatable.defaultColDefServices = this.defaultColDef;
        });
    }
  
    onChange(event) {
      console.log(event)
    }
  
    public createColumnDefs() {
      this.columnDefs = [
        {
          headerName: "Milestone",
          field: "milestone",
          width: 250,
          pinned: "left",
          cellRenderer: 'dropdownRenderer',
        },
        {
          headerName: "Task",
          field: "task",
          width: 300,
          cellRenderer: 'dropdownTaskRenderer',
        },
        {
          headerName: "Reason",
          field: "reason",
          width: 402,
          cellRenderer: 'inputRenderer',
        },
        {
          headerName: "",
          cellRenderer: 'threeDots',
          width: 100,
          pinned: 'right'
  
        }
      ];
      this.datatable.columnDefsServices = this.columnDefs;
    }

    editRow(event) {
      console.log("event", event)
      // this.gridOptions.api.startEditingCell({
      //   rowIndex: 0,
      //   colKey: 'lastName'
      // });
      this.gridApi.setFocusedCell(2, "milestone");
      this.gridApi.startEditingCell({
        rowIndex: 1,
        colKey: "milestone"
      });
    }
  
    public eventsSubject: Subject<any> = new Subject();
    onFilterChanged(value) {
      console.log("value", value)
      this.gridOptions.api.setQuickFilter(value);
    };
  
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
  
    taskStatus(params) {
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
      return '<span class="status-bar" style="width: 7px; height: 31px; border-radius: 0;margin-top: 9px; background-color: ' +
        barColor +
        ';">' + '</span>' + '<mat-icon class="mx-2 file-img" fxFlex="5" style="color: #1278D7; font-size: 17px; position: relative; bottom: 7px" aria-label="search">' +
        '<span class="ic ic-files-empty">' + '</span>' +
        ' </mat-icon>';
    }
  
  
    show: boolean;
    toggleSearch() {
      this.show = !this.show;
    };
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
    }
  
  
    onSelectionChanged(event: SelectionChangedEvent) {
      let lengthOfSelectedRow = event.api.getSelectedRows().length;
      if (1 < lengthOfSelectedRow) {
      }
    }
  
    selectionChanged(event: SelectionChangedEvent) {
      let lengthOfSelectedRow = event.api.getSelectedRows().length;
      if (1 < lengthOfSelectedRow) {
      }
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.calculateRowCount();
      params.api.paginationGoToPage(4);
    }
  
    onPageSizeChanged(newPageSize) {
      this.gridApi.paginationSetPageSize(Number(newPageSize.value));
    }
  
    autoAssign() {
      const message = {
        message: `Task Completed successfully.`,
        showMyTasks: true
      }
      this.dialog.open(SuccessfulModalComponent, {
        data: message,
      });
    }
  
    onCellClicked(evt) {
      // if (evt.value) {
      //   this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment/Execution-Task"]);
      // }
    }
  
    createSLA() {
      var message = {
        type: "STATUS"
      }
      this.dialog.open(CreateReasonComponent, {
        height: '310px',
        width: '65vw',
        data: message
      });
      //this.router.navigate(["/JCP/Administration/Plan-To-Build/gNodeB/Site-SLA-Configuration/Create-Site-Sla-Configuration"]);
    }
  
    ngOnDestroy() {
      this.destroySubscription.unsubscribe();
    }
  }
  
  
  
