import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-mml-command-result',
  templateUrl: './mml-command-result.component.html',
  styleUrls: ['./mml-command-result.component.scss']
})
export class MmlCommandResultComponent {
  parameter: string;
  jio_centerID: string;

  constructor(
    public dialogRef: MatDialogRef<MmlCommandResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log("data", data)
    this.parameter = data.parameter;
    this.jio_centerID = data.jio_centerID;
  }


  closeDialog(): void {
    this.dialogRef.close(true);
  }
}