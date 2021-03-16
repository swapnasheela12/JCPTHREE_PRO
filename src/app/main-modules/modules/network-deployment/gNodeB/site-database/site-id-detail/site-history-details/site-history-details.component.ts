import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-site-history-details',
  templateUrl: './site-history-details.component.html',
  styleUrls: ['./site-history-details.component.scss']
})
export class SiteHistoryDetailsComponent implements OnDestroy {
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
  public frameworkComponentsTaskDetails = {
    statusFlagRenderer: StatusRendererComponent,
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


  panelOpenState = false;

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
  }

  getMyTaskDetails() {
    this.httpClient.get('assets/data/modules/network_deployment/gNodeB/site-database/site-status.json')
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
        width: 200,
      },
      {
        headerName: "Status",
        field: "status",
        width: 200,
      },
      {
        headerName: "Task Name",
        field: "taskName",
        width: 300,
      },
      {
        headerName: "Assign Date",
        field: "assignDate",
        width: 170,
      },
      {
        headerName: "Completion Date",
        field: "completionDate",
        width: 170,
      },
      {
        headerName: 'Photos',
        field: 'photos',
        width: 250,
        cellRenderer: params => {
          return '<span class="ic ic-image">' +
            "  " + params.data.photos.length + '</span>'
        }
      },
      {
        headerName: 'Documents',
        field: 'documents',
        width: 250,
        cellRenderer: params => {
          // console.log(params, "params");
          return '<span class="ic ic-file-pdf">' +
            "  " + params.data.photos.length + '</span>'
        }
      },
      {
        headerName: 'Digital Forms',
        field: 'digitalForms',
        width: 250,
        cellRenderer: params => {
          //console.log(params, "params");
          // return `<span class="ic ic-file-pdf"> params.data.photos</span>`;
          return '<span class="ic ic-file-pdf">' +
            "  " + params.data.photos.length + '</span>'
        }
      },
      {
        headerName: 'Task Owner',
        field: 'taskOwner',
        width: 250
      },
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(value) {
    console.log("value", value)
    this.gridOptions.api.setQuickFilter(value);
  };


  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
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

  navigateToSiteHistory() {
    // this.router.navigate(["/JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details/Site-History-Details"])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}


