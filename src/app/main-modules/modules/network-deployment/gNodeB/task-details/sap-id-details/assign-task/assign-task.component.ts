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
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent {
  message;
  showActionBtn: boolean = true;
  showMyTasks: boolean = true;
  constructor(public dialogRef: MatDialogRef<AssignTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));

    // if (!data.showActionBtn) {
    //   this.showActionBtn = false;
    //   this.message = data.message;
    // } else if (!data.showMyTasks) {
    //   this.showMyTasks = false;
    // }
    // this.message = data.message;

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

