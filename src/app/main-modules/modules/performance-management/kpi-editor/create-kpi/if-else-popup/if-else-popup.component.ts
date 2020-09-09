import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-if-else-popup',
  templateUrl: './if-else-popup.component.html',
  styleUrls: ['./if-else-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IfElsePopupComponent implements OnInit {
  trackByDiv(index: number, conditionDiv: any): string {
    return conditionDiv;
  }
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
