import { TableAgGridService } from './../../../../core/components/table-ag-grid/table-ag-grid.service';
import { dropDownThreeDotRendererComponent } from './../../../../core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { StatusRendererComponent } from './../kpi-editor/renderer/status-renderer.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
import { GridOptions, GridCore, SelectionChangedEvent } from "@ag-grid-community/all-modules";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';

declare var $: any;
const PATHS = [
  { createReport: "JCP/Modules/Performance-Management/Report-Builder/Create-Report" }
]
interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss'],
})
export class ReportBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridPinned = true;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  messageSubscription: Subscription;
  
  public frameworkComponentsReportBuilder = {
    statusFlagRendererBar: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public showGlobalOperation: Boolean = false;
  public rowSelection;

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.rowSelection = 'multiple';
    this.createColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get('assets/data/modules/performance_dashboard/report_builder.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Name",
        field: "reportName",
        width: 250,
        pinned: 'left',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
      }, {
        headerName: "Type",
        field: "reportType",
        width: 150
      },
      {
        headerName: "Status",
        field: "status",
        width: 180,
        cellRenderer: 'statusFlagRendererBar'
      },
      {
        headerName: "Generation",
        field: "generation",
        width: 150
      }, {
        headerName: "Domain",
        field: "domain",
        width: 120
      }, {
        headerName: "Vendor",
        field: "vendor",
        width: 120
      },
      {
        headerName: "Created By",
        field: "creatorFirstName",
        width: 150
      }, {
        headerName: "Created Date",
        field: "creationTime",
        cellRenderer: function (params) {
          return moment(params.data.creationTime).format('DD MMM, YYYY');
        },
        width: 150
      }, {
        headerName: "Modified By",
        field: "modifierFirstName",
        width: 160
      }, {
        headerName: "Modified Date",
        field: "modificationTime",
        cellRenderer: function (params) {
          return moment(params.data.modificationTime).format('DD MMM, YYYY');
        },
        width: 180
      }, {
        headerName: "Status",
        width: 180,
        cellRenderer: this.shareStatus,
        suppressSorting: true,
        suppressMenu: true,
      }, {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
        width: 90,
        pinned: 'right',
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };
  searchGrid = '';
  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };
  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
  };

  shareStatus(params) {
    if (!params.data)
      return '';
    var status = params.data.status1;
    var barColor = '';
    if (status == "Shared") {
      barColor = '#4188de';
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">' + status + '</div> <div class="shared_count">+' + params.data.sharecount + '</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
    ;
    return template;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  ngOnInit() { }
  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
      this.showGlobalOperation = true;
    } else {
      this.showGlobalOperation = false;
    }
  }

  openBulkDeleteDialog(): void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText); const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
