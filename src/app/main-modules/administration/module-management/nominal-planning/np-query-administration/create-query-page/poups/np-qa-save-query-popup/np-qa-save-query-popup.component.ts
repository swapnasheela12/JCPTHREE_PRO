import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarToastComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';

@Component({
  selector: 'app-np-qa-save-query-popup',
  templateUrl: './np-qa-save-query-popup.component.html',
  styleUrls: ['./np-qa-save-query-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NpQaSaveQueryPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NpQaSaveQueryPopupComponent>, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
  saveQuery(): void {
    this.dialogRef.close(true);
    this._snackBar.openFromComponent(snackBarToastComponent, {
      duration: 4000,
      data: {
        snackbarMode: "success",
        snackbarText: "Query Saved Successfully.",
      },
      panelClass: "success"
    });
  }
  
}

export class NpQaSaveQueryPopupDialogModel {
  constructor() {
  }
}
