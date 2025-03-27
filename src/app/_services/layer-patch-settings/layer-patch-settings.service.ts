import { TemplateRef, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { LayerPatchSettingsPopupComponent } from 'src/app/main-modules/main-layer/layer-patch-settings-popup/layer-patch-settings.component';

type DialogRef<T> = MatDialogRef<LayerPatchSettingsPopupComponent<T>>

export class LayerSettingsSettingsService<T = undefined> {
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
