import { FileUploadService } from './../../../../../../../_services/file-upload.service';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
// import { FileUploadService } from 'src/app/_services/file-upload.service';
import { FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
// import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commanPopup/file-upload-popup/file-upload-popup.component';
import { CustomFlagPopupComponent } from './../../../../../../../core/components/commonPopup/custom-flag-popup/custom-flag-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { statusflagiconRenderComponent } from './../../../../../../../core/components/ag-grid-renders/statusflagicon.component';
import { layerlayerDropDownDotRendererComponent } from './../../../../../../../core/components/ag-grid-renders/layerDropDownThreeDot-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { VerticaldotRendererComponent } from './../../../../../performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { CustomLegendsComponent } from './../../../../../../main-layer/legends-and-filter/custom-legends/custom-legends.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { inputRendererComponent } from './../../../../../../../core/components/ag-grid-renders/input-renderer.component';
import { colorDropdownRendererComponent } from './../../../../../../../core/components/ag-grid-renders/color-dropdown-renderer.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { GridOptions, GridCore, } from "@ag-grid-community/all-modules";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, ViewEncapsulation, OnInit, Inject, ElementRef } from '@angular/core';
import { fileUploadPopupModel } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { of } from 'rxjs';
declare var $: any;

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-candidates-acp',
  templateUrl: './candidates-acp.component.html',
  styleUrls: ['./candidates-acp.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CandidatesACPComponent implements OnInit {

  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsMyReport = {
    statusFlagRenderer: statusflagiconRenderComponent,
    layerDropDownThreeDotRenderer: layerlayerDropDownDotRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };


  url = "assets/data/modules/network-planning/staterge-map-nominal/candidateacp.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;
    this.calculateRowCount();
  }


  constructor(private fileUploadService: FileUploadService, public dialog: MatDialog, private elRef: ElementRef, private datatable: TableAgGridService, private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CustomLegendsComponent>,) {

    this.gridOptions = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    this.httpClientRowData();
    this.createColumnDefs();

  }

  private httpClientRowData() {
    this.httpClient
      .get("assets/data/modules/network-planning/staterge-map-nominal/candidateacp.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Sites",
        field: "acpcandidate",
        width: 230,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
         headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerClass: 'hide-header',
      }, {
        headerName: "",
        // field: "flag",
        cellClass: function (params) { return (params.value === 'completed' ? 'red' : 'green'); },
        cellRenderer: 'statusFlagRenderer',
        width: 40,
      }, {
        headerName: "",
        suppressMenu: true,
        suppressSorting: true,
        width: 90,
        cellRenderer: 'layerDropDownThreeDotRenderer'
      }
    ];

    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };

  private inited;
  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  cellClickedDetails(evt) {
    console.log(evt, "evt");

  }

  openFileUploadPopup(): void {
    const title = `Upload Nodes`;
    var showExample = false;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '250px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
  }


  @ViewChild("fileUploadSAP", { static: false }) fileUploadSAP: ElementRef; filesSAP = [];
 
  title: string;
  showExample: boolean;
  fileNameSAP: string;
 
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    this.fileUploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError(() => {
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
        }
      });
  }

  private uploadFiles() {
    this.fileUploadSAP.nativeElement.value = '';
    this.filesSAP.forEach(file => {
      this.fileNameSAP = file.data.name;

      this.uploadFile(file);
    });
  }
 
  onClick() {
    const fileUploadSAP = this.fileUploadSAP.nativeElement; fileUploadSAP.onchange = () => {
      const file = fileUploadSAP.files[0];
      this.filesSAP.push({ data: file });
      this.uploadFiles();
    };
    fileUploadSAP.click();
  }
  





}
