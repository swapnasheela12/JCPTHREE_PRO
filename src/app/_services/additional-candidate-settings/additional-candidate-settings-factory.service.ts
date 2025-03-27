import { Injectable ,ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AdditionalCandidateSettingsService } from './additional-candidate-settings.service';
import { from, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdditionalSettingsModelsData } from 'src/app/main-modules/main-layer/additional-candidate-settings-popup/additional-candidate-settings-model/additional-candidate-setting-data.model';
import { AdditionalSettingsModelsOptions } from 'src/app/main-modules/main-layer/additional-candidate-settings-popup/additional-candidate-settings-model/additional-candidate-settings-options.model';
import { AdditionalCandidateSettingsPopupComponent } from 'src/app/main-modules/main-layer/additional-candidate-settings-popup/additional-candidate-settings.component';

export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class AdditionalSettingsFactoryService<T = undefined> {
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
    dialogData: AdditionalSettingsModelsData<T>,
    options: AdditionalSettingsModelsOptions = { width: 500, height: 500, disableClose: true, backdropClass: '' },
  ): AdditionalCandidateSettingsService<T> {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open<AdditionalCandidateSettingsPopupComponent<T>, AdditionalSettingsModelsData<T>>(
      AdditionalCandidateSettingsPopupComponent,
      {
        ...this.fetchOptions(options),
        data: dialogData
      }
    );

    dialogRef.afterClosed().pipe(first());

    return new AdditionalCandidateSettingsService(dialogRef);
  }

  private fetchOptions({
    width,
    height,
    backdropClass,
    disableClose,
    position,
    hasBackdrop,
    panelClass
  }: AdditionalSettingsModelsOptions): Pick<
    MatDialogConfig<AdditionalSettingsModelsData<T>>,
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
