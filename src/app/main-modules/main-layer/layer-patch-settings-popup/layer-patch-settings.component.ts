import { Component, Inject, TemplateRef, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-layer-patch-settings',
  templateUrl: './layer-patch-settings.component.html',
  styleUrls: ['./layer-patch-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayerPatchSettingsPopupComponent<T> {

 /**
   * Initializes the component.
   *
   * @param dialogRef - A reference to the dialog opened.
   */
  constructor(
    public dialogRef: MatDialogRef<LayerPatchSettingsPopupComponent<T>>,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
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
  
  async openSettingsDialog() {
      const { NcLayerSettingsDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/nominal-capacity/nc-layer-settings-dialog/nc-layer-settings-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(NcLayerSettingsDialogComponent)
      );
  }

  onCloseClick() {
    $('.active-button').removeClass(['active-button']);
    this.dialogRef.close();
  }
}
