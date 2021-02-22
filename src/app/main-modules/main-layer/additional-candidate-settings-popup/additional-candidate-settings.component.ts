import { Component, Inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


declare var $: any;

@Component({
  selector: 'app-additional-candidate-settings',
  templateUrl: './additional-candidate-settings.component.html',
  styleUrls: ['./additional-candidate-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AdditionalCandidateSettingsPopupComponent<T> {

 /**
   * Initializes the component.
   *
   * @param dialogRef - A reference to the dialog opened.
   */
  constructor(
    public dialogRef: MatDialogRef<AdditionalCandidateSettingsPopupComponent<T>>,
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
    $('.active-button').removeClass(['active-button']);
    this.dialogRef.close();
  }
}
