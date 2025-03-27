import { ViewChild } from '@angular/core';
import { statusflagiconRenderComponent } from './../../ag-grid-renders/statusflagicon.component';
import { GridOptions, GridCore } from 'ag-grid-community';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from '../../table-ag-grid/table-ag-grid.service';
import { DeleteButtonRenderComponent } from '../../ag-grid-renders/deleteButtonRender.component';

@Component({
  selector: 'app-view-attributes',
  templateUrl: './view-attributes.component.html',
  styleUrls: ['./view-attributes.component.scss']
})
export class ViewAttributesComponent implements OnInit {

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
    deleteButtonRenderer: DeleteButtonRenderComponent,
    statusFlagRenderer: statusflagiconRenderComponent,
  };

  @ViewChild('agGridFlag', { static: true }) agGridFlag: GridOptions;

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

  viewAttributList = [
    'Jio State : Jio State name, Example Mumbai, Gujarat',
    'Jio Center : Jio Center name, Example MU-MUMB-JC001-0001',
    'District : District name, Example Thane, Junagadh',
    'Taluka : Taluka name, Example Mumbai, Gujarat',
    'City : City Name, Example Mumbai, Rajkot',
    'Village : Village name, Example Sanpada',
    'Pin code: Area Pin code number, Example 400705',
    'Building Class: Building classification in terms of residential, commercial, etc.',
    'Building Size : Structure height in terms of number of floor, Example G+1, G+2',
    'No. of Flats : Number of flats in building, example 22, 25, etc.',
    'No.of Shops: Number of Shop in building, example 10, 14',
    'FTTx Status : Fiber rollout status for building, example RFS'
  ]

  constructor(private datatable: TableAgGridService, private httpClient: HttpClient, private datashare: DataSharingService, public dialogRef: MatDialogRef<ViewAttributesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {

    this.gridOptions = <GridOptions>{
      suppressHorizontalScroll: true,
    };
    // this.gridOptions = <GridOptions>{};
    this.httpClientRowData();
    this.createColumnDefs();

  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
  }

  clickNo(): void {
    this.dialogRef.close();
  }

  url = "assets/data/modules/network-planning/staterge-map-nominal/flagList.json";

  private httpClientRowData() {
    this.httpClient
      .get("assets/data/modules/network-planning/staterge-map-nominal/flagList.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.gridOptions.rowData = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }
  selected = "all";
  private createColumnDefs() {
    this.columnDefs = [{
      headerName: "Select",
      field: "radioSelect",
      width: 120,
      cellRenderer: params => {
        console.log(params, "params");

        return "<input type='radio' name='radio5' id='radio4' class='css-checkbox' value='all' [checked]='!isSpecial' [(ngModel)]='selectedRadioButn = " + params.value + "' name='radioModel'/>";
      }
    }, {
      headerName: "Flag",
      field: "flagtype",
      cellRenderer: 'statusFlagRenderer',
      cellStyle: function (params: any) {
        return { color: params.value };
      },
      width: 110,
    }, {
      headerName: "Name",
      field: "flagname",
      width: 170,
    }, {
      headerName: "Delete",
      field: "enableButton",
      suppressMenu: true,
      suppressSorting: true,
      width: 130,
      cellRenderer: 'deleteButtonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Click 1'
      }
    }
    ];

    this.datatable.columnDefsServices = this.columnDefs;
    this.gridOptions.columnDefs = this.columnDefs;

  }

  defaultColDef = { resizable: true };


  onBtnClick1(e) {
    console.log(e, "MMMMMMMMM");

    // this.rowDataClicked1 = e.rowData;
  }

  getColor(mycolor: string): string {
    switch (mycolor) {
      case 'Not completed': return '#D80000';
      case 'completed': return '#11D800';
      case 'In Process': return '#002AD8';
      case 'Other 1': return '#BF00D8';
      case 'Other 2': return '#DE7001';
      case 'Other 3': return '#01DEAB'
    }
  }

  public customFlagName;

  mark: MarkDTO = null;
  marks: MarkDTO[] = [
    new MarkDTO({ id: 1, name: 'test1', number: 1 }),
    new MarkDTO({ id: 2, name: 'test2', number: 2 }),
    new MarkDTO({ id: 3, name: 'test3', number: 3 }),
    new MarkDTO({ id: 4, name: 'test4', number: 4 }),
    new MarkDTO({ id: 5, name: 'test5', number: 5 }),
    new MarkDTO({ id: 6, name: 'test6', number: 6 }),
  ];


  addRow() {

    let row = {
      radioSelect: true,
      flagtype: this.mark.color,
      flagname: this.customFlagName,
      enableButton: true
    }

    this.gridOptions.rowData.push(row)
    this.gridApi.setRowData(this.gridOptions.rowData)

  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }


}


class MarkDTO {
  id: number;
  name: string;
  number: number;
  constructor(mark?: any) {
    this.id = mark && mark.id || null;
    this.name = mark && mark.name || null;
    this.number = mark && mark.number || null;
  }
  get color(): string {
    let color = '';
    switch (this.number) {
      case 1: color = 'lightgray'; break;
      case 2: color = 'lightblue'; break;
      case 3: color = 'orange'; break;
      case 4: color = 'yellow'; break;
      case 5: color = 'green'; break;
      case 6: color = 'purple'; break;
      case 7: color = 'gray'; break;
      case 8: color = 'blue'; break;
      case 9: color = 'red'; break;
      case 10: color = 'black'; break;
    }
    return color;
  }

}
