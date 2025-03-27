import { Injectable ,ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { LayerSettingsSettingsService } from './layer-patch-settings.service';
import { from, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayerPatchSettingsModelsOptions } from 'src/app/main-modules/main-layer/layer-patch-settings-popup/layer-patch-settings-model/layer-patch-settings-options.model';
import { LayerPatchSettingsModelsData } from 'src/app/main-modules/main-layer/layer-patch-settings-popup/layer-patch-settings-model/layer-patch-settings-data.model';
import { LayerPatchSettingsPopupComponent } from 'src/app/main-modules/main-layer/layer-patch-settings-popup/layer-patch-settings.component';

export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class LayerSettingsFactoryService<T = undefined> {
  private subject = new Subject<any>();
  constructor(
    private dialog: MatDialog,
    private cfr: ComponentFactoryResolver
  ) {}

  forChild(vcr: ViewContainerRef, cl: ComponentLoader) {
    return from(cl.loadChildren()).pipe(
      map((component: any) => this.cfr.resolveComponentFactory(component)),
      map(componentFactory => vcr.createComponent(componentFactory))
    );
  }

  open(
    dialogData: LayerPatchSettingsModelsData<T>,
    options: LayerPatchSettingsModelsOptions = { width: 500, height: 500, disableClose: true, backdropClass: '' },
  ): LayerSettingsSettingsService<T> {
    // this.dialog.closeAll();
    const dialogRef = this.dialog.open<LayerPatchSettingsPopupComponent<T>, LayerPatchSettingsModelsData<T>>(
      LayerPatchSettingsPopupComponent,
      {
        ...this.fetchOptions(options),
        data: dialogData
      }
    );

    dialogRef.afterClosed().pipe(first());

    return new LayerSettingsSettingsService(dialogRef);
  }

  private fetchOptions({
    width,
    height,
    backdropClass,
    disableClose,
    position,
    hasBackdrop,
    panelClass
  }: LayerPatchSettingsModelsOptions): Pick<
    MatDialogConfig<LayerPatchSettingsModelsData<T>>,
    'width' | 'height' | 'backdropClass' | 'disableClose' |'position' | 'hasBackdrop' | 'panelClass'
  > {
    return {
      width: `${width}px`,
      height:  `${height}px`,
      backdropClass: `${backdropClass}`,
      position: position,
      disableClose,
      hasBackdrop,
      panelClass: `${panelClass}`
    };
  }

  openLayerSettingsDialog(node, event) {
    this.subject.next();
    return this.open(node.component);
  }

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
