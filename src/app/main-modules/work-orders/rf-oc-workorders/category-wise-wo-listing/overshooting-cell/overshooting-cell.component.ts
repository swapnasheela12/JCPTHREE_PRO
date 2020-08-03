import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { WoRanPopupComponent} from "./ran-popup/wo-ran-popup/wo-ran-popup.component"

@Component({
  selector: 'app-overshooting-cell',
  templateUrl: './overshooting-cell.component.html',
  styleUrls: ['./overshooting-cell.component.scss']
})
export class OvershootingCellComponent implements OnInit {
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  //public rowData: any;
  public columnDefswo;
  public rowDatawo;
  //public columnrt;
  public rowrt;
  constructor(public flexlayout: FlexLayoutModule, private http: HttpClient) {

  }

  ngOnInit(): void {

    this.gridOptions = <GridOptions>{};
    //this.httpClientRowData();
  
    this.createColumndata();
    this.createRowdata();
  }
  private createColumndata() {
this.columnDefswo = [

  {
    headerName: "Date",
    field: "date",
   width: 320
   
  }, {
    headerName: "Reason for Reassignmenet",
    field: "reasonforreassignment",
    width: 320
   
  }, {
    headerName: "Remarks",
    field: "remarks",
    width: 320
    
  }
]
  }

   


  
  private createRowdata() {
    this.http.get("assets/data/layers/randata.json")
      .subscribe(data => {
        console.log(data);
        this.rowrt = data;
    });
  }

  

}
