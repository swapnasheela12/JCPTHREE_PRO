import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { SelectionChangedEvent } from 'ag-grid-community';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-golden-parameter',
  templateUrl: './golden-parameter.component.html',
  styleUrls: ['./golden-parameter.component.scss']
})
export class GoldenParameterComponent {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public show;
  public gridFilterValueServices = {};
  // public frameworkComponentsSectorMisalignment = {
  //   viewHistroyRenderer: viewHistoryRendererComponent
  // };

  public url: string = "assets/data/modules/properties/golden-parameter.json";

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

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => { });
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-Report";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
  }

  private createColumnDefs() {
    this.columnDefs = [{
      headerName: "Enb ID",
      field: "Enbid",
      enableRowGroup: true,
      width: 100,
      pinned: "left"
    }, {
      headerName: "Cell ID",
      field: "CellID",
      enableRowGroup: true,
      width: 120
    }, {
      headerName: "Categories",
      field: "Categories",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Parameter Family",
      field: "ParameterFamily",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Parameter",
      field: "Parameter",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Current",
      field: "Current",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Jio Setting",
      field: "JioSetting",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Impact",
      field: "Impact",
      enableRowGroup: true,
      width: 250
    }, {
      headerName: "Date",
      field: "Date",
      enableRowGroup: true,
      width: 250,
      pinned: "right"
    }];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
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

  cellClickedDetails(evt) {
    console.log(evt, "evt");
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment/WO-Sector-Misalignment"]);
    }
  }

}
