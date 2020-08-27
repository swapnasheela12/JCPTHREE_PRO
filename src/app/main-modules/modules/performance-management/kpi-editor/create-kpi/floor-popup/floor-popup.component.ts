import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InfoPopupComponent } from '../info-popup/info-popup.component';

@Component({
  selector: 'app-floor-popup',
  templateUrl: './floor-popup.component.html',
  styleUrls: ['./floor-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FloorPopupComponent implements OnInit {
  public url ='assets/data/modules/performance_management/kpi-editor/floor.json';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FloorPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  FloorInfoPopup() {
    const dialogRef = this.dialog.open(InfoPopupComponent, {
      width: '750px',
      height: '460px',
      data: { url: this.url }
    });
  }
}
