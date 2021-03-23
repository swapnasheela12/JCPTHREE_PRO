import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-reason',
  templateUrl: './create-reason.component.html',
  styleUrls: ['./create-reason.component.scss']
})
export class CreateReasonComponent implements OnInit {
  showStatusLabel = false;
  showReasonLabel = false;
  trackByDiv(index: number, conditionDiv: any): string {
    return conditionDiv;
  }
  constructor(public dialogRef: MatDialogRef<CreateReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    if (data.type === "STATUS") {
      this.showStatusLabel = true;
      this.showReasonLabel = false;
    }  else if (data.type === "REASON") {
      this.showReasonLabel = true;
       this.showStatusLabel= false;
    }
  }

  milestone = ["Nominal Finalisation", "Nominal Finalisation"];
  task = ["Assignment of Proposed Nominal", "Assignment of Proposed Nominal"];
  reason = ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"];
  conditionArray = [];
  addCondition() {
    this.conditionArray.push(this.conditionArray.length);
  }
  deleteCondition() {
    this.conditionArray.pop();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}

