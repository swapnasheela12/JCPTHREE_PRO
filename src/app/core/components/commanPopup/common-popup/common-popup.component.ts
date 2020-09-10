import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.scss']
})
export class CommonPopupComponent {
  title: string;
  message: string;
  image: string;
  snackbarMode: string;
  snackbarText: string;

  constructor(public dialogRef: MatDialogRef<CommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogModel, private _snackBar: MatSnackBar
  ) {
    this.title = data.title;
    this.message = data.message;
    this.image = data.image;
    this.snackbarMode = data.snackbarMode;
    this.snackbarText = data.snackbarText;
  }

  onCancel(): void {
    this.dialogRef.close(true);
  };

  onConfirm(): void {
    this.dialogRef.close(true);
    this._snackBar.openFromComponent(snackBarToastComponent, {
      duration: 4000,
      data: {
        snackbarMode: this.snackbarMode,
        snackbarText: this.snackbarText,
      },
      panelClass: [this.snackbarMode]
    });
  }
}

export class CommonDialogModel {
  constructor(
    public title: string,
    public message: string,
    public image: string,
    public snackbarMode: string,
    public snackbarText: string,
  ) {
  }
}

@Component({
  selector: 'snack-bar-toast-component',
  templateUrl: '.././snackbar-toast/snackbar-toast-component.html',
  styles: [],
})
export class snackBarToastComponent {
  public mode: string
  public text: string
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.mode = data.snackbarMode;
    this.text = data.snackbarText;
  }
}