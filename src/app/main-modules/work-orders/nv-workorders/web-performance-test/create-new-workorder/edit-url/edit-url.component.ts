import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { snackBarToastComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';

@Component({
  selector: 'app-edit-url',
  templateUrl: './edit-url.component.html',
  styleUrls: ['./edit-url.component.scss']
})
export class EditUrlComponent implements OnInit {
  urlName = 'https://m.snapdeal.com';
  traceroute = "N";
  ping = "N";
  location = "Mumbai";

  constructor(public dialogRef: MatDialogRef<EditUrlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog,
    private httpClient: HttpClient, private datatable: TableAgGridService,
    public _snackBar: MatSnackBar) {
  }

  ngOnInit(): void { }

  saveRow() {
    this.dialogRef.close();
    const snackbarMode = 'success';
    const snackbarText = 'Parameter value changed successfully';
    this._snackBar.openFromComponent(snackBarToastComponent, {
      duration: 4000,
      data: {
        snackbarMode: snackbarMode,
        snackbarText: snackbarText,
      },
      panelClass: [snackbarMode]
    });

  }

  closeDialog() {
    this.dialogRef.close();
  }
}


