import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { THEMATIC_LIST, HOVER_LIST } from 'src/app/core/components/leftside-settings-popup/leftside-settings-popup.constant';
import { Options } from 'ng5-slider/options';
import { ColorPickerService, Cmyk } from 'ngx-color-picker'

@Component({
  selector: 'dense-urban-dialog',
  templateUrl: './dense-urban-dialog.component.html',
  styleUrls: ['./dense-urban-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class DenseUrbanDialogComponent implements OnInit {
  dialog: NavigationSettingsService;
  clickEventsubscription:Subscription;
  options: Options;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 75;
  vertical = false;
  tickInterval = 1;
  someValue;
  @Input() colorOutline: string;
  title = 'dialog-example';
  @ViewChild('denseUrbanLayerSettings', { static: true }) denseUrbanLayerSettings: TemplateRef<any>;

  macroDialogForm:FormGroup;
  
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
    // private cpService: ColorPickerService
  ) {
    this.macroDialogForm = new FormGroup({
      'outlineCoding':new FormControl(''),
      'opacity':new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.dispatchDialog();
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Boundaries: Morphology Data Layer Settings',
      template: this.denseUrbanLayerSettings
    }, {
      width: 536,
      height:240,
      backdropClass: 'light-white-backdrop',
      disableClose: false
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  private openDialog(dialogData: LeftsideSettingsModelsData, options: LeftsideSettingsModelsOptions): void {
    this.dialog = this.navigationFactoryService.open(dialogData, options);
  }

}
