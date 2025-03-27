import { FormControl } from '@angular/forms';
import { dropDownThreeDotRendererComponent } from './../ag-grid-renders/dropDownThreeDot-renderer.component';
import { DataSharingService } from './../../../_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { ButtonRendererComponent } from './../../../main-modules/reports-dashboards/my-reports/button-renderer.component';
import { MultipleTableAgGridService } from './multiple-table-ag-grid.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { GridOptions, SelectionChangedEvent } from "@ag-grid-community/all-modules";
import { viewHistoryRendererComponent } from '../ag-grid-renders/view-history-renderer.component';


@Component({
  selector: 'app-multiple-table-ag-grid',
  templateUrl: './multiple-table-ag-grid.component.html',
  styleUrls: ['./multiple-table-ag-grid.component.scss']
})
export class MultipleTableAgGridComponent {

  public gridApi;
  public gridOptions: GridOptions;
  columnDefs;
  rowData;
  gridOptionsObj;
  defaultColDef;
  typeOfAgGridTable;
  paginationRequired: boolean = true;
  autoPageSizeRequired: boolean = true;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent,
    viewHistroyRenderer: viewHistoryRendererComponent
  };
  public paginationValues: number[] = [10, 20, 30, 40];
  public selected = this.paginationValues[0];
  public formControlPageCount = new FormControl();
  details;
  sidenavBarStatus;
  showGlobalOperation;
  @Output() cellClicked = new EventEmitter()

  constructor(public data: MultipleTableAgGridService, private datashare: DataSharingService, private httpClient: HttpClient,) {
    console.log("data from exe", data);

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.gridOptions = <GridOptions>{};
    this.details = data.dataServices;
    this.paginationRequired = data.paginationRequired;
    this.autoPageSizeRequired = data.autoPageSizeRequired;
    this.gridOptionsObj = this.data.gridOptionsServices;
    this.defaultColDef = this.data.defaultColDefServices;
    this.typeOfAgGridTable = this.data.typeOfAgGridTable;
  }

  public onReady(params) {
    this.gridApi = params.api;
    params.api.paginationGoToPage(4);
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
      this.showGlobalOperation = true;
    } else {
      this.showGlobalOperation = false;
    }
  }
  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  onRowSelected(event) {
    console.log(event, " row clicked event>>>");
  }

  onCellClicked(event) {
    console.log(event, "e");
    this.cellClicked.emit(event);
  }

  onRowClicked(event) {
    console.log(event, " row clicked event>>>");

  }
}
