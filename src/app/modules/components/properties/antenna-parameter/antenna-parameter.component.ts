import { Component, ViewChild, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { SelectionChangedEvent } from 'ag-grid-community';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-antenna-parameter',
  templateUrl: './antenna-parameter.component.html',
  styleUrls: ['./antenna-parameter.component.scss']
})
export class AntennaParameterComponent implements OnChanges {
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

  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;

  public url: string = "assets/data/modules/properties/antenna-parameter.json";

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

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => { });
  }
  ngOnChanges() {
    if (this.selectedTab === "ANTENNA PARAMETER") {
      this.showTab = true;
      this.gridOptions = <GridOptions>{};
      this.createColumnDefs();

      this.datashare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
      });

      this.httpClient.get(this.url)
        .subscribe(data => {
          this.rowData = data;
          this.datatable.rowDataURLServices = this.url;
          this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
          this.datatable.rowDataServices = this.rowData;
          this.datatable.gridOptionsServices = this.gridOptions;
          this.datatable.defaultColDefServices = this.defaultColDef;
        });

    }
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
  }

  private createColumnDefs() {
    this.columnDefs = [{
      headerName: "Parameter",
      field: "Parameter",
      width: 150
    }, {
      headerName: "Alpha",
      field: "Alpha",
      width: 195
    }, {
      headerName: "Beta",
      field: "Beta",
      width: 195
    }, {
      headerName: "Gamma",
      field: "Gamma",
      width: 195
    }, {
      headerName: "Alpha Additional",
      field: "AlphaAdditional",
      enableRowGroup: true,
      width: 195
    }];
    this.datatable.columnDefsServices = this.columnDefs;
  }

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


