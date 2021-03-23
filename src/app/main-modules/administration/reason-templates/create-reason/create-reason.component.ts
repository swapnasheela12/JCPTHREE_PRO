import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-reason',
  templateUrl: './create-reason.component.html',
  styleUrls: ['./create-reason.component.scss']
})
export class CreateReasonComponent implements OnInit {
  trackByDiv(index: number, conditionDiv: any): string {
    return conditionDiv;
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
  constructor(public dialogRef: MatDialogRef<CreateReasonComponent>,) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}

