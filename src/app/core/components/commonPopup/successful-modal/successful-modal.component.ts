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
  message;
  showActionBtn: boolean = true;
  constructor(public dialogRef: MatDialogRef<SuccessfulModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log("data", data);
    if (!data.showActionBtn) {
      this.showActionBtn = false;
      this.message = data.message;
    }
    this.message = data.message;

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
