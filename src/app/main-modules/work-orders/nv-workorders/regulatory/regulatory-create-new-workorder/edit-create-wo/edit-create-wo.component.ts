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
    alarmId: string = "2149442";
    alarmName: string = "RRH_OPTIC_DELAY_EXCEED";
    technology = ["LTE"];
    domain = ["RAN", "RAN"];
    vendor = ["Samsung", "Samsung"];
    swVersion: string = "9.0.0";
    deviceType = ["eNodeB"];
    alarmWoType = ["Parent Group"];
    severity = ["Major", "Minor"];
    emsSource = ["Samsung LSMR"];
    emsRelease: string = "9.0.0";
    relatedTo = ["Hardware", "Software"];
    eventType = "Equipment";
    portableCost = "";
    objectIdentifier = "";
    finalJCPClassification = ["Outage"];
  
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
  
  