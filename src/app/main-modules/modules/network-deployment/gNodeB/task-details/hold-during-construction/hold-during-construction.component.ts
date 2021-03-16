import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hold-during-construction',
  templateUrl: './hold-during-construction.component.html',
  styleUrls: ['./hold-during-construction.component.scss']
})
export class HoldDuringConstructionComponent implements OnInit {
  message;
  showActionBtn: boolean = true;
  showMyTasks: boolean = true;
  showEmp: boolean = true;
  listOfOptions = [
    { "name": "Yes", ID: "1", "checked": true },
    { "name": "No", ID: "2", "checked": false }
  ]
  constructor(public dialogRef: MatDialogRef<HoldDuringConstructionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  radioChange(evt) {
    console.log("event", evt);
    if (evt.value === "1") {
      this.showEmp = true;
      // this.showOther = false;
    } else {
      this.showEmp = false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  clickYes() {
    this.dialogRef.close();
  }

  clickNo() {
    this.dialogRef.close();
  }

}
