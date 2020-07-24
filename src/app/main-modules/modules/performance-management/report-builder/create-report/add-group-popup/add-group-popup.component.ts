import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-group-popup',
  templateUrl: './add-group-popup.component.html',
  styleUrls: ['./add-group-popup.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class AddGroupPopupComponent implements OnInit {
  conditionArray = [];

  kpiGroupFormControl: FormGroup;
  addCondition() {
    this.conditionArray.push(this.conditionArray.length);
  }
  deleteCondition() {
    this.conditionArray.pop();
  }
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddGroupPopupComponent>,) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.kpiGroupFormControl = this._formBuilder.group({
      groupName: ['', Validators.required],
      fromKpi: ['', Validators.required],
      toKpi: ['', Validators.required],
    });
  }

}
