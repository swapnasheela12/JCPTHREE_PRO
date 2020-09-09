import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent {

  constructor(public matDialog: MatDialog, public datashare: DataSharingService, public dialogRef: MatDialogRef<InfoPopupComponent>) { }

  openDialogInfo(): void {
    const dialogRef = this.matDialog.open(InfoPopupComponent, {
      width: "500px",
      panelClass: "material-dialog-container",
    });
  };

  close() {
    this.dialogRef.close();
  }
}
