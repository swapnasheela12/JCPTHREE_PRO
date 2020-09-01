import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownComponent } from '../renderer/wostatus/dropdown.component';
import { TextfieldComponent } from '../renderer/wostatus/textfield.component';
import { Route, ActivatedRoute } from '@angular/router';
import { SubmitWorkordedPopupComponent } from '../submit-workorded-popup.component';
import { Router } from '@angular/router';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import {  AgGridAngular } from 'ag-grid-angular';

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
  @ViewChild('agGrid') agGrid: AgGridAngular;

 
 
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsImpl: GridOptions;
  public gridOptionsSite: GridOptions;
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

  constructor(
    public flexlayout: FlexLayoutModule, 
    private http: HttpClient,
    private router: Router, 
    private httpClient: HttpClient,
    public dialog: MatDialog) {

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
      cellRendererFramework: DeleteRendererComponent
     
    }
  ]
  

}


// onGridReady(params) {
//   this.gridApi = params.api;
//   this.gridColumnApi = params.columnApi;
// }
// onAddRowimpl()
//    {
//      this.agGrid.api.addItems([{ siteparameter: '', newvalue: '', delete: '' }]);
  
//    }


private createImplRowdata() {
  this.http.get("assets/data/layers/workorders/impl-details.json")
    .subscribe(data => {
      console.log(data);
      this.implnRowdata = data;
  });
}

taskclosures: taskclosures[] = [
  {value: '0', viewValue: 'Antenna Pole Mount Uptilt corrected'},
  {value: '1', viewValue: 'Site Access Issues'},
  {value: '2', viewValue: 'Space Constraint'},
  {value: '3', viewValue: 'Material Required'},
  {value: '4', viewValue: 'Implementation Done'}
];

  // gotoPrevview(details) {
  
  //   this.route.navigate(['/Overshooting-Cell/WO-Overshooting-Cell'], { relativeTo: this.route });
  // }
  openSuccessPopup() {
    const dialogRef = this.dialog.open(SubmitWorkordedPopupComponent, {
      width: '700px',
      height: '290px',
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      //console.log(data);
    });
  }
  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell/WO-Overshooting-Cell'])
  }

  // fileName;
  // uploadFile(file) {
  //   this.fileName = file.name;
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   let obj;
  //   if (file) {
  //     //this.uploadedImg = [];
  //     this.showFileUploadwidget = true;
  //     let url = `../../../../../../../assets/images/logo/${this.fileName}`
  //     obj = {
  //       src: url
  //     }
  //     this.uploadedImg.push(obj);
  //   }
  // }



  // onClick() {
  //   const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
  //     const file = fileUpload.files[0];
  //     this.files = file;
  //     //this.files.push({ data: file });
  //     this.uploadFiles();
  //   };
  //   fileUpload.click();
  // }

  // private uploadFiles() {
  //   this.fileUpload.nativeElement.value = '';
  //   this.uploadFile(this.files);
  // }
}

