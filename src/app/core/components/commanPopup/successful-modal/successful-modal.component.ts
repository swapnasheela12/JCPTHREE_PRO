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
  selector: 'app-successful-modal',
  templateUrl: './successful-modal.component.html',
  styleUrls: ['./successful-modal.component.scss']
})
export class SuccessfulModalComponent {
  message
  constructor(public dialogRef: MatDialogRef<SuccessfulModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log("data", data);
    this.message = data;
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
