import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-golden-config',
  templateUrl: './edit-golden-config.component.html',
  styleUrls: ['./edit-golden-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditGoldenConfigComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditGoldenConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
