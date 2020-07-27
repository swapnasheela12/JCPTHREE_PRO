import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  name:string;
  animal:string;
  openDialogAlarms(): void {
    const dialogRef = this.dialog.open(CapacityComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
    });
  };

  column = [
    {field: 'SiteID' },
    {field: 'CellID' },
    {field: 'Band'},
    {field: 'AlarmID'},
    {field: 'Severity'},
    {field: 'StartDate'},
    {field: 'StartTime'},
    {field: 'JCPClassification'},
];

row= [
    { SiteID: 'Toyota', CellID: 'Celica', Band: 35000, AlarmID: 'AlarmID', Severity: 'Severity', StartDate: 'StartDate', StartTime: 'StartTime', JCPClassification: 'JCP Class' }
  
];

}
