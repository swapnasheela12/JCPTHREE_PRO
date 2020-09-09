import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';

@Component({
  selector: 'app-submit-workorded-popup',
  template: `
  <div mat-dialog-content style="margin: 0 auto;
  width: 500px;
  height: 300px;
  text-align: center;">
<p>Are you sure want to submit the workorder?</p>
<div mat-dialog-actions style="display: flex;justify-content: center;align-items: center;">
<button mat-stroked-button color="primary" (click)="onNoClick()">No</button>
<button mat-stroked-button color="primary"  (click)="onNoClick()"cdkFocusInitial>Yes</button>
</div>
  `
})
export class SubmitWorkordedPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<SubmitWorkordedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick() {
    this.dialogRef.close('closed');
  }

}
