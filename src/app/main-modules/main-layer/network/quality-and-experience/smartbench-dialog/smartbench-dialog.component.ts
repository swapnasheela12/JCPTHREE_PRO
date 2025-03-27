import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-smartbench-dialog',
  templateUrl: './smartbench-dialog.component.html',
  styleUrls: ['./smartbench-dialog.component.scss']
})
export class SmartbenchDialogComponent implements OnInit {
  title: string;
  message: string;
  status:boolean;
  enter:boolean = false;
  exit:boolean = false
  constructor(public dialogRef: MatDialogRef<SmartbenchDialogComponent>,
   
    @Inject(MAT_DIALOG_DATA) public data: smartBenchmarkDialogModel) {
      
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.status = data.status;

  }

  ngOnInit() {
  }

  enterOnConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  enterOnDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

export class smartBenchmarkDialogModel {

  constructor(public title: string, public message: string,public status:boolean) {
  }
}
