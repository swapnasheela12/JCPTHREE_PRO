import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.scss']
})
export class CommonPopupComponent{
  title: string;
  message: string;
  image: string;
  
    constructor(
      public dialogRef: MatDialogRef<CommonPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CommonDialogModel
    ) {
      this.title = data.title;
      this.message = data.message;
      this.image = data.image;
    }
  
    onCancel(): void {
      this.dialogRef.close(true);
    }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class CommonDialogModel {

  constructor(
    public title: string, 
    public message: string,
    public image: string
    ) {
  }
}