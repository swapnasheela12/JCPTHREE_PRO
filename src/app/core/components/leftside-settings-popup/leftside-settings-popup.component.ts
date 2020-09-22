import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leftside-settings-popup',
  templateUrl: './leftside-settings-popup.component.html',
  styleUrls: ['./leftside-settings-popup.component.scss']
})
export class LeftsideSettingsPopupComponent<T> {

 /**
   * Initializes the component.
   *
   * @param dialogRef - A reference to the dialog opened.
   */
  constructor(
    public dialogRef: MatDialogRef<LeftsideSettingsPopupComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      headerText: string
      template: TemplateRef<any>
      context: T
    }
  ) {
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }
  

  onCloseClick() {
    this.dialogRef.close();
  }
}
