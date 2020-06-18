import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmPopupComponent } from '../../../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  stateList=[
    {name: 'MUM-MUMB-JC01-0115', abbr: 'JS1'},
    {name: 'MUM-MUMB-JC01-0116', abbr: 'JS2'},
    {name: 'MUM-MUMB-JC01-0117', abbr: 'JS3'},
    {name: 'MUM-MUMB-JC01-0118', abbr: 'JS4'}
  ];

  jioCenterList = [
    {name: 'I-MU-MUMB-ENB-5678', abbr: 'JC1'},
    {name: 'I-MU-MUMB-ENB-6679', abbr: 'JC2'},
    {name: 'I-MU-MUMB-ENB-7679', abbr: 'JC3'},
    {name: 'I-MU-MUMB-ENB-1678', abbr: 'JC4'}
  ];

  panIndiaList = [
    {name: 'Maharashtra', abbr: 'MH'},
    {name: 'Gujarat', abbr: 'GJ'},
    {name: 'Bihar', abbr: 'BH'},
    {name: 'Rajasthan', abbr: 'RJ'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    public dialog: MatDialog
  ) {
    this.dialogRef.updateSize('300vw','300vw')
  }

  ngOnInit(): void {
  }

  onApplySettings(): void {
    const message = `My JCP will be reverted to the default Layout`;
    const dialogData = new ConfirmDialogModel("Revert to Default?", message);
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    this.dialogRef.close(true);
  }

}