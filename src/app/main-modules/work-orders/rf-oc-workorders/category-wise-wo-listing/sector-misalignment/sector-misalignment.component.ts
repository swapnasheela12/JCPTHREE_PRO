import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectionChangedEvent } from 'ag-grid-community';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { Subject } from 'rxjs';
import { ISector_Grid } from '../../Irf-oc';


const paths = "JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment";
@Component({
  selector: 'app-sector-misalignment',
  templateUrl: './sector-misalignment.component.html',
  styleUrls: ['./sector-misalignment.component.scss']
})
export class SectorMisalignmentComponent {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public sidenavBarStatus: boolean;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: Array<ISector_Grid>;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public gridFilterValueServices = {};
  tableCompData = {};
  public frameworkComponentsSectorMisalignment = {
    statusFlagRenderer: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent,
    viewHistroyRenderer: viewHistoryRendererComponent
  };
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  public url: string = "assets/data/report/sector-misalignment/sector-misalignment.json";


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

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message: boolean) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe((data: Array<ISector_Grid>) => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Status",
        cellRenderer: this.statusFunc,
        field: "status",
        width: 140,
        pinned: "left"
      },
      {
        headerName: "SAP ID",
        field: "sapid",
        width: 200
      },
      {
        headerName: "Zone",
        field: "zone",
        width: 100,
      },
      {
        headerName: "Circle",
        field: "circle",
        width: 120,
      },
      {
        headerName: "JC ID",
        field: "jcid",
        width: 160,
      },
      {
        headerName: "Workorder",
        field: "workorder",
        width: 260,
      },
      {
        headerName: "Created On",
        field: "createdon",
        width: 140,
      },
      {
        headerName: "Due Date",
        field: "duedate",
        width: 140,
      },
      {
        headerName: "SLA Violation",
        field: "slaviolation",
        width: 150,
        pinned: "right"
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };
  show: boolean;
  toggleSearch() {
    this.show = !this.show;
  };

  shareStatus(params) {
    if (!params.data)
      return '';
    var status = params.data.status;
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

  //END table search//////////////////
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
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  statusFunc(params) {
    var status = params.value;
    var barColor = '';
    if (status == "Completed" || status == "Successful") {
      barColor = '#60DD5C';
    } else if (status == "In Progress" || status == "Started") {
      barColor = '#F8C93A';
    } else if (status == "Not Started") {
      barColor = '#ff8000';
    } else {
      barColor = '#f21400';
    }
    return '<span class="status-bar" style="font-size: 14px; font-family: lato Regular; background-color: ' +
      barColor +
      ';">' +
      status + '</span>';
  }

  cellClickedDetails(evt) {
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment"]);
    }
  }

}
