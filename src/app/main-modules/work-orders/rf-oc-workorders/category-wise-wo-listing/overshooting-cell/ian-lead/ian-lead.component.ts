import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { WoRanPopupComponent} from "./ran-popup/wo-ran-popup/wo-ran-popup.component"
interface sitep {
  value: string;
  viewValue: string;
}
interface taskclosures {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ian-lead',
  templateUrl: './ian-lead.component.html',
  styleUrls: ['./ian-lead.component.scss']
})
export class IanLeadComponent implements OnInit {

 
 
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  //public rowData: any;
  public columnDefswo;
  public rowDatawo;
  //public columnrt;
  public rowExecutionTask;
  public spdetailsColumndata;
  public spdetailsRowdata;

  constructor(public flexlayout: FlexLayoutModule, private http: HttpClient) {

  }

  ngOnInit(): void {

    this.gridOptions = <GridOptions>{};
    //this.httpClientRowData();
  
    this.createColumndata();
    this.createRowdata();
    this.createspdetailsColumndata();
    this.createspdetailsRowdata();
  }
  private createColumndata() {
this.columnDefswo = [

  {
    headerName: "Date",
    field: "date",
   width: 500
   
  }, {
    headerName: "Reason for Reassignmenet",
    field: "reasonforreassignment",
    width: 500
   
  }, {
    headerName: "Remarks",
    field: "remarks",
    width: 500
    
  }
]
  }
  private createRowdata() {
    this.http.get("assets/data/layers/workorders/execution-task.json")
      .subscribe(data => {
        console.log(data);
        this.rowExecutionTask = data;
    });
  }

  private createspdetailsColumndata() {
    this.spdetailsColumndata = [
      {
        headerName: "Site Paraameter",
        field: "siteparameter",
        width: 700
       
      },
      {
        headerName: "Current Value",
        field: "currentvalue",
        width: 700
       
      }
    ]
    

}
private createspdetailsRowdata() {
  this.http.get("assets/data/layers/workorders/site-parameter-data.json")
    .subscribe(data => {
      console.log(data);
      this.spdetailsRowdata = data;
  });
}

siteps: sitep[] = [
  {value: 'p-0', viewValue: 'E-Tilt(deg)'},
  {value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)'},
  {value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)'}
];
sitepos: sitep[] = [
  {value: 'p-0', viewValue: 'E-Tilt(deg)'},
  {value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)'},
  {value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)'},
  {value: 'p-3', viewValue: 'Tx-Atenuation-Port2(db)'}
];
cloneformelements: any = [1];
addRow(){
 
  
     this.cloneformelements.push(this.cloneformelements.length + 1)
  }
  taskclosures: taskclosures[] = [
    {value: 'Antenna Pole Mount Uptilt corrected', viewValue: 'Antenna Pole Mount Uptilt corrected'},
    {value: 'Site Access Issues', viewValue: 'Site Access Issues'},
    {value: 'Space Constraint', viewValue: 'Space Constraint'},
    {value: 'Implementation Done', viewValue: 'Implementation Done'},
    {value: 'Material Required', viewValue: 'Material Required'}
  ];
  selectedRemarks = this.taskclosures[2].value;
  
}
