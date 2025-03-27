import { layersIconRenderComponent } from './../../../../../../../core/components/ag-grid-renders/layersicon.component';
// import { dropDownList3DotRendererComponent } from './../../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
import { dropDownList3DotRendererComponent } from '../../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
import { MatDialog } from '@angular/material/dialog';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { dropdownRendererComponent } from './../../../../../performance-management/report-builder/create-report/renderer/dropdown-renderer.component';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

import { GridOptions, GridCore, SelectionChangedEvent } from 'ag-grid-community';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';

@Component({
  selector: 'app-define-data-source',
  templateUrl: './define-data-source.component.html',
  styleUrls: ['./define-data-source.component.scss']
})
export class DefineDataSourceComponent implements OnInit {
  public showMyContainer: boolean;

  public gridApi;
  public gridApiPloy;
  public gridPinned = false;
  public gridPinnedPloy = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsPloy: GridOptions;
  public rowData: any;
  public rowDataPloy: any;
  public columnDefs: any[];
  public columnDefsPloy: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public defaultColDefPloy = { resizable: true };
  public frameworkComponentsMyReport = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
  };
  public frameworkComponentsPloy = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    layersIconRender: layersIconRenderComponent,
  };


  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }
  public onReadyPloy(params) {
    console.log(params, "onReady");
    this.gridApiPloy = params.api;
    params.api.sizeColumnsToFit();
  }

  public httpClientRowData() {
    this.http
      .get("assets/data/modules/network-planning/staterge-map-nominal/definedatasource.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  public httpClientRowDataPloy() {
    this.http
      .get("assets/data/modules/network-planning/staterge-map-nominal/definedatasource.json")
      .subscribe(data => {
        this.rowDataPloy = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowDataPloy;
        this.datatable.gridPinnedServices = this.gridPinnedPloy;
        this.datatable.gridOptionsServices = this.gridOptionsPloy;
        this.datatable.defaultColDefServices = this.defaultColDefPloy;
      });
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "File Name",
        field: "filename",
        width: 250,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        // headerCheckboxSelection: function (params) {
        //   return params.columnApi.getRowGroupColumns().length === 0;
        // },
        pinned: 'left',
      },
      {
        headerName: "Uniuq ID",
        field: "uniuqid",
        width: 140,
      },
      {
        headerName: "Created By",
        field: "createdby",
        width: 140,
      },
      {
        headerName: "Creation Date",
        field: "creationdate",
        width: 150,
      },
      {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
        width: 110,
        pinned: 'right',
      }
    ];

    this.datatable.columnDefsServices = this.columnDefs;
  }

  public createColumnDefsPloy() {
    this.columnDefsPloy = [
      {
        headerName: "Polygon Name",
        field: "filename",
        width: 250,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        // headerCheckboxSelection: function (params) {
        //   return params.columnApi.getRowGroupColumns().length === 0;
        // },
        pinned: 'left',
      },
      {
        headerName: "Uniuq ID",
        field: "uniuqid",
        width: 140,
      },
      {
        headerName: "Created By",
        field: "createdby",
        width: 140,
      },
      {
        headerName: "Creation Date",
        field: "creationdate",
        width: 150,
      },
      {
        headerName: "",
        field: "creationdate",
        cellRenderer: 'layersIconRender',
        headerComponentParams: { template: '<div style="width: 100%;font-size:20px;display:flex;justify-content:center;align-items:center;color:#707070;" class="zmdi zmdi-edit"></div>' },
        cellStyle: {
          'display': 'flex ',
          'justify-content': 'center',
          'align-items': 'center ',
        },
        width: 150,
      },
      {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
        width: 110,
        pinned: 'right',
      }
    ];

    this.datatable.columnDefsServices = this.columnDefsPloy;
  }

  onFilterChanged(value) {
    console.log(value, "value");
    console.log(this.gridOptions.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };

  onFilterChangedPloy(value) {
    console.log(value, "value");
    console.log(this.gridOptionsPloy.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };

  show: any;
  toggleSearch() {
    this.show = !this.show;
  };


  constructor(
    public datashare: DataSharingService,
    public http: HttpClient,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService,
    private datatable: TableAgGridService,
    private router: Router) {
    this.gridOptions = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowData();
    this.createColumnDefs();

    this.gridOptionsPloy = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowDataPloy();
    this.createColumnDefsPloy();

  }

  ngOnInit(): void {
    this.selectedBoundaries = this.listBoundaries[0];
  }

  @Input() name: string;
  @Output() defineToggleButtonFun = new EventEmitter();

  showSelected: boolean;
  defineToggleButton() {
    this.showSelected = false;
    this.datashare.currentMessageDialog.subscribe((message: any) => {
      this.datashare.changeMessage(message.selectedIndex)
    });
    this.defineToggleButtonFun.emit(this.showSelected);
  }


  selectedBoundaries: string;
  listBoundaries: string[] = ['Tabular (CSV)', 'Polygon'];
  showDiv: boolean = false;

  radioButtonChanged(item) {
    if (item.value) {
      this.showDiv = !this.showDiv;
    }
  }

  showSuccessFailure: boolean = false;
  onClick() {
    const title = `Upload Files`;
    var showExample = true;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'uploadClicked') {
        this.showSuccessFailure = true;
      }
    })
  }













}
