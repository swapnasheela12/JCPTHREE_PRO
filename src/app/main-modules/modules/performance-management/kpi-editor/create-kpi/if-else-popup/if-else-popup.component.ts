import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-if-else-popup',
  templateUrl: './if-else-popup.component.html',
  styleUrls: ['./if-else-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IfElsePopupComponent implements OnInit {

  conditionArray = [];
  addCondition() {
    this.conditionArray.push(this.conditionArray.length);
  }
  deleteCondition() {
    this.conditionArray.pop();
  }
  constructor(public dialogRef: MatDialogRef<IfElsePopupComponent>,) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
