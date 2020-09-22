import { Injectable ,ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

// Components
import { LeftsideSettingsPopupComponent } from './../../core/components/leftside-settings-popup/leftside-settings-popup.component';

// Models
import { LeftsideSettingsModelsData } from './../../core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { LeftsideSettingsModelsOptions } from './../../core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';

// Services
import { NavigationSettingsService } from './navigation-settings.service';

// import {
//   Injectable,
//   ComponentFactoryResolver,
//   ViewContainerRef
// } from '@angular/core';
import { from, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationSettingsFactoryService<T = undefined> {
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
    dialogData: LeftsideSettingsModelsData<T>,
    options: LeftsideSettingsModelsOptions = { width: 500, height: 500, disableClose: true, backdropClass: '' },
  ): NavigationSettingsService<T> {
    const dialogRef = this.dialog.open<LeftsideSettingsPopupComponent<T>, LeftsideSettingsModelsData<T>>(
        LeftsideSettingsPopupComponent,
      {
        ...this.fetchOptions(options),
        data: dialogData
      }
    );

    dialogRef.afterClosed().pipe(first());

    return new NavigationSettingsService(dialogRef);
  }

  private fetchOptions({
    width,
    height,
    backdropClass,
    disableClose
  }: LeftsideSettingsModelsOptions): Pick<
    MatDialogConfig<LeftsideSettingsModelsData<T>>,
    'width' | 'height' | 'backdropClass' | 'disableClose'
  > {
    return {
      width: `${width}px`,
      height:  `${height}px`,
      backdropClass: `${backdropClass}`,
      disableClose
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
