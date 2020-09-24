
import { colorDropdownRendererComponent } from './../../../../core/components/ag-grid-renders/color-dropdown-renderer.component';
import { TableAgGridService } from '../../../../core/components/table-ag-grid/table-ag-grid.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from "@angular/common/http";
import { GridOptions, GridCore, } from "@ag-grid-community/all-modules";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';

declare var $: any;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-custom-legends',
  templateUrl: './custom-legends.component.html',
  styleUrls: ['./custom-legends.component.scss']
})
export class CustomLegendsComponent implements OnInit {

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
    colorDropdownRenderer: colorDropdownRendererComponent
  };
  
  
  url = "assets/data/report/my-report.json";

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


  constructor(private elRef: ElementRef, private datatable: TableAgGridService, private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CustomLegendsComponent>,) {

    this.gridOptions = <GridOptions>{};
    this.httpClientRowData();
    this.createColumnDefs();

  }

  private httpClientRowData() {
    this.httpClient
      .get("assets/data/layers/custom_legends.json")
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
        headerName: "SR .No",
        field: "srno",
        width: 115,
        pinned: 'left'
      }, {
        headerName: "Color",
        // field: "color",
        cellRenderer: 'colorDropdownRenderer',
        width: 100,
        pinned: 'left'
      }, {
        headerName: "2G",
        field: "2g",
        width: 140
      },
      {
        headerName: "3G",
        field: "3g",
        width: 140
      },
      {
        headerName: "4G",
        field: "4g",
        width: 140
      },
      {
        headerName: "Legend",
        field: "legend",
        width: 180
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

  technologySelected = "5G";
  technologyList: any = [
    { value: '5G', viewValue: '5G' },
    { value: '4G', viewValue: '4G' }
  ];

  kpiSelected = "Coverage";
  kpiList: any = [
    { value: 'Coverage', viewValue: 'Coverage' },
    { value: 'RSRP', viewValue: 'RSRP' },
    { value: 'SINR', viewValue: 'SINR' },
    { value: 'RSRQ', viewValue: 'RSRQ' },
    { value: 'UL TX Power', viewValue: 'UL TX Power' },
  ];

  bandSelected = "850 MHz";
  bandList: any = [
    { value: '850 MHz', viewValue: '850 MHz' },
    { value: '1800 MHz', viewValue: '1800 MHz' },
    { value: '2300 MHz', viewValue: '2300 MHz' },
  ];

  paletteSelected = 'NPE View';
  paletteList = [
    {
      name: 'NPE View',
      value: [
        { colorName: "#F44336" },
        { colorName: "#FF9800" },
        { colorName: "#8BC34A" },
        { colorName: "#4CAF50" },
        { colorName: "#03A9F4" },
        { colorName: "#3F51B5" },
      ]
    }
  ];

  onChange(item) {
    this.paletteSelected = item.value;
  }

  kpidisplayslist = [{
    name: 'In-Building',
    checks: [{
      staus: true,
      disabled: false,
      name: 'Atoll'
    }, {
      staus: false,
      disabled: true,
      name: 'Customer Measured Coverage'
    },
    {
      staus: true,
      disabled: false,
      name: 'Smart Network Coverage'
    },
    {
      staus: true,
      disabled: false,
      name: 'Netvelocity'
    },
    {
      staus: true,
      disabled: false,
      name: 'Live Drive/ Quick Drive'
    },
    {
      staus: false,
      disabled: true,
      name: 'Sites'
    },
    {
      staus: false,
      disabled: true,
      name: 'Indoor Coverage'
    },
    {
      staus: false,
      disabled: true,
      name: 'Indoor Coverage'
    },
    {
      staus: true,
      disabled: false,
      name: 'Accuver'
    },
    {
      staus: true,
      disabled: false,
      name: 'Competitive Coverage'
    },
    {
      staus: true,
      disabled: false,
      name: 'I-Smart Network Coverage'
    },
    {
      staus: true,
      disabled: false,
      name: 'Network Accepted Coverage'
    },
    {
      staus: false,
      disabled: true,
      name: 'GeoBond Drive'
    },
    {
      staus: true,
      disabled: false,
      name: 'GeoBond Drive'
    }]
  }];

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  addNumberRage = false;
  addNumberRageFun(){
    this.addNumberRage =! this.addNumberRage;
  }

}
