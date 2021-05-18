import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
  import { HttpClient } from '@angular/common/http';
  import { Component, Inject, OnInit } from '@angular/core';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
  import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
  import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
  
  @Component({
    selector: 'app-edit-create-wo',
    templateUrl: './edit-create-wo.component.html',
    styleUrls: ['./edit-create-wo.component.scss']
  })
  export class EditCreateWoComponent implements OnInit {
    zone = 'West';
    circle = "Mp-Cg";
    assignedTo = "Yogeshwar.bargal@ril.com";
    dateFrom = "17-07-2020";
    dateTo = "17-07-2020";
    startTime = "05:00";
    iterations= "10";
    waitingPeriod = "1";

  
    constructor(public dialogRef: MatDialogRef<EditCreateWoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private httpClient: HttpClient, private datatable: TableAgGridService) {
    }
  
    ngOnInit(): void { }
  
    saveRow() {
      this.dialogRef.close();
    }
  
    closeDialog() {
      this.dialogRef.close();
    }
  }
  
  