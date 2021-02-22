import { TemplateRef, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AdditionalCandidateSettingsPopupComponent } from 'src/app/main-modules/main-layer/additional-candidate-settings-popup/additional-candidate-settings.component';

type DialogRef<T> = MatDialogRef<AdditionalCandidateSettingsPopupComponent<T>>

export class AdditionalCandidateSettingsService<T = undefined> {
  opened$ = this.dialogRef.afterOpened().pipe(first())

  constructor(private dialogRef: DialogRef<T>) {}

  get context() {
    return this.dialogRef.componentInstance.data.context;
  }

  close() {
    this.dialogRef.close()
  }

  setHeaderText(headerText: string): void {
    this.dialogRef.componentInstance.data.headerText = headerText;
  }

  setTemplate(template: TemplateRef<any>): void {
    this.dialogRef.componentInstance.data.template = template;
  }
}
