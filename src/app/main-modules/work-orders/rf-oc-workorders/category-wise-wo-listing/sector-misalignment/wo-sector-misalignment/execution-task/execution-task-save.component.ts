import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-execution-task-save',
    template: `
    <div mat-dialog-content>
  <p>Are you sure want to submit the workorder?</p>
<div mat-dialog-actions>
  <button mat-stroked-button color="primary" (click)="onNoClick()">No</button>
  <button mat-stroked-button color="primary"  (click)="onNoClick()"cdkFocusInitial>Yes</button>
</div>
    `,
})
export class ExecutionTaskSaveComponent {

    constructor(
        public dialogRef: MatDialogRef<ExecutionTaskSaveComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick() {
        this.dialogRef.close('closed');
    }

}