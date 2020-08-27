import { colorDropdownRendererComponent } from './../ag-grid-renders/color-dropdown-renderer.component';
import { FormControl } from '@angular/forms';
import { dropDownThreeDotRendererComponent } from './../ag-grid-renders/dropDownThreeDot-renderer.component';
import { DataSharingService } from './../../../_services/data-sharing.service';
import { DataSharHttpService } from './../../../modules/components/data-shar-http.service';
import { HttpClient } from '@angular/common/http';
import { ButtonRendererComponent } from './../../../main-modules/reports-dashboards/my-reports/button-renderer.component';
import { TableAgGridService } from './table-ag-grid.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

import { GridOptions, GridCore, GridApi, ColumnApi, SelectionChangedEvent } from "@ag-grid-community/all-modules";
import { viewHistoryRendererComponent } from '../ag-grid-renders/view-history-renderer.component';


@Component({
  selector: 'app-table-ag-grid',
  templateUrl: './table-ag-grid.component.html',
  styleUrls: ['./table-ag-grid.component.scss']
})
export class TableAgGridComponent implements OnInit, OnChanges {

  public gridApi;
  public gridOptions: GridOptions;
  columnDefs;
  rowData;
  gridOptionsObj;
  defaultColDef;
  typeOfAgGridTable;
  // paginationRequired: boolean = true;
  // autoPageSizeRequired: boolean = true;
  public frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent,
    viewHistroyRenderer: viewHistoryRendererComponent,
    colorDropdownRenderer:colorDropdownRendererComponent
  };
  public paginationValues: number[] = [10, 20, 30, 40];
  public selected = this.paginationValues[0];
  public formControlPageCount = new FormControl();

  sidenavBarStatus;
  showGlobalOperation;
  @Input('events') public filterChange;
  @Output() cellClicked = new EventEmitter();

  constructor(public data: TableAgGridService, private datashare: DataSharingService, private httpClient: HttpClient) {
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;

      // if(this.sidenavBarStatus == false){
      //   setTimeout(() => {
      //     this.gridOptions.api.sizeColumnsToFit();
      //   }, 1000);
      // }else{
      //   setTimeout(() => {
      //     this.gridOptions.api.sizeColumnsToFit();
      //   }, 1000);
      // }

    });

    this.gridOptions = <GridOptions>{};
    this.columnDefs = data.columnDefsServices;
    this.rowData = data.rowDataServices;
    // this.paginationRequired = data.paginationRequired;
    // this.autoPageSizeRequired = data.autoPageSizeRequired;
    this.gridOptionsObj = this.data.gridOptionsServices;
    this.defaultColDef = this.data.defaultColDefServices;
    this.typeOfAgGridTable = this.data.typeOfAgGridTable;
  }

  ngOnInit() { }

  ngOnChanges() {
    this.filterChange.subscribe((data) => {
      this.gridOptions.api.setQuickFilter(data.filter);
    });
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

  // searchGrid = '';
  // onFilterChanged(value) {

  //   this.gridOptions.api.setQuickFilter(value);
  // };
  // show: any;
  // toggleSearch() {
  //   this.show = !this.show;
  // };



}
