import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-assign-external-users',
  templateUrl: './assign-external-users.component.html',
  styleUrls: ['./assign-external-users.component.scss']
})
export class AssignExternalUsersComponent {
  message;
  showActionBtn: boolean = true;
  showMyTasks: boolean = true;
  showEmp: boolean = true;
  showOther: boolean = false

  listOfOptions = [
    { "name": "Ril Employee", ID: "1", "checked": true },
    { "name": "Others", ID: "2", "checked": false }
  ]
  constructor(public dialogRef: MatDialogRef<AssignExternalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
  }

  radioChange(evt) {
    console.log("event", evt);
    if (evt.value === "1") {
      this.showEmp = true;
      this.showOther = false;
    } else if (evt.value === "2") {
      this.showOther = true;
      this.showEmp = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
  }

  clickNo(): void {
    this.dialogRef.close();
  }
}

