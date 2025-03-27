import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InfoPopupComponent } from '../info-popup/info-popup.component';


@Component({
  selector: 'app-ceiling-popup',
  templateUrl: './ceiling-popup.component.html',
  styleUrls: ['./ceiling-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CeilingPopupComponent implements OnInit {
public url ='assets/data/modules/performance_management/kpi-editor/ceiling.json';
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CeilingPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ceilingInfoPopup() {
    const dialogRef = this.dialog.open(InfoPopupComponent, {
      width: '750px',
      height: '460px',
      data: { url: this.url }
    });
  }

}
