import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SuccessfulModalComponent } from '../successful-modal/successful-modal.component';
import { SuccessfulComponent } from '../successful/successful.component';

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
  showDefaultContent: boolean = true;
  showContentForCSV: boolean = false;
  constructor(public dialogRef: MatDialogRef<CommonPopupComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogModel, private _snackBar: MatSnackBar
  ) {
    this.title = data.title;
    this.message = data.message;
    this.image = data.image;
    if(data.showContentForCSV) {
      this.showContentForCSV = true;
      this.showDefaultContent = false;
    }
    this.snackbarMode = data.snackbarMode;
    this.snackbarText = data.snackbarText;
  }

  onCancel(): void {
    this.dialogRef.close(true);
  };

  onConfirm(): void {
    if(this.data.module === "REGULATORY") {
      this.dialogRef.close(true);
      this.renderModule();
      } else {
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

  renderModule() {
    if(this.data.module === "REGULATORY") {
      this.dialogRef.close(true);
      const message = {
          message: `Workorder assigned Successfully.`,
          showDefaultActionBar: true,
          navigation: "REGULATORY"
        }
        this.dialog.open(SuccessfulModalComponent, {
          data: message,
        });
    }
  }
}

export class CommonDialogModel {
  constructor(
    public title: string,
    public message: string,
    public image: string,
    public snackbarMode: string,
    public snackbarText: string,
    public showContentForCSV?: boolean,
    public module?
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