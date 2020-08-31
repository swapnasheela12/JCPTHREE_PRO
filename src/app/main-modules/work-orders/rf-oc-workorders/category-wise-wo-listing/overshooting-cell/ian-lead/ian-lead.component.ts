import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownComponent } from '../renderer/wostatus/dropdown.component';
import { TextfieldComponent } from '../renderer/wostatus/textfield.component';
import { Route, ActivatedRoute } from '@angular/router';

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
public frameworkComponentsos;
  impParameterDetailsColumndata;

public  imppdetailsRowdata;
public imppdetailsColumndata;
  public implnRowdata;
  public physicalParameterColumndata;
public physicalParameterrowdata;
  public pspRowdata: any;

  constructor(private router: ActivatedRoute, public flexlayout: FlexLayoutModule, private http: HttpClient) {

    this.frameworkComponentsos = {
      "dropdownrender": DropdownComponent,
      "textfieldrender": TextfieldComponent
    }

  }

  ngOnInit(): void {

    this.gridOptions = <GridOptions>{};
    //this.httpClientRowData();
  
    this.createColumndata();
    this.createRowdata();
    this.createspdetailsColumndata();
    this.createspdetailsRowdata();
    this.createimppdetailsColumndata();
    this.createImplRowdata();
   
  }
  private createColumndata() {
this.columnDefswo = [

  {
    headerName: "Date",
    field: "date",
   width: 400
   
  }, {
    headerName: "Reason for Reassignmenet",
    field: "reasonforreassignment",
    width: 400
   
  }, {
    headerName: "Remarks",
    field: "remarks",
    width: 400
    
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

private createimppdetailsColumndata() {
  this.impParameterDetailsColumndata = [
    {
      headerName: "Site Paraameter*",
      field: "siteparameter",
      width: 400,
      cellRendererFramework: DropdownComponent
     
    },
    {
      headerName: "New Value*",
      field: "newvalue",
      width: 400,
      cellRendererFramework: TextfieldComponent

     
    },
    {
      headerName: "",
      field: "",
      width: 300,
      template: '<mat-icon style="line-height: 0;color: rgba(0,0,0,0.54);"><span class="delete-trash-icon fas fa-trash-alt"></span></mat-icon>'
     
    }
  ]
  

}


private createImplRowdata() {
  this.http.get("assets/data/layers/workorders/impl-details.json")
    .subscribe(data => {
      console.log(data);
      this.implnRowdata = data;
  });
}



  // gotoPrevview(details) {
  
  //   this.route.navigate(['/Overshooting-Cell/WO-Overshooting-Cell'], { relativeTo: this.route });
  // }
}
