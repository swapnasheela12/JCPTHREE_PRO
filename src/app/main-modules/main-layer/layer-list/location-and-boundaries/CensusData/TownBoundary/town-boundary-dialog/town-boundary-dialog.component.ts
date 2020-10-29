import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { LABEL_LIST } from 'src/app/core/components/leftside-settings-popup/leftside-settings-popup.constant';
import { Options } from 'ng5-slider/options';
import { ColorPickerService, Cmyk } from 'ngx-color-picker'

@Component({
  selector: 'town-boundary-dialog',
  templateUrl: './town-boundary-dialog.component.html',
  styleUrls: ['./town-boundary-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class TownBoundaryDialogComponent implements OnInit {
  dialog: NavigationSettingsService;
  clickEventsubscription:Subscription;
  labelList = LABEL_LIST;
  labelListValue: string = LABEL_LIST[0].label_name;
  searchLabelListValue;
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
  @Input() colorFill: string;

  title = 'dialog-example';
  @ViewChild('censusDataLayerSettings', { static: true }) censusDataLayerSettings: TemplateRef<any>;

  macroDialogForm:FormGroup;
  
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
    // private cpService: ColorPickerService
  ) {
    this.macroDialogForm = new FormGroup({
      'outlineCoding':new FormControl(''),
      'fillCoding':new FormControl(''),
      'opacity': new FormControl(''),
      'label': new FormControl('')
    });
  }
  
  ngOnInit(): void {
    this.dispatchDialog();
  }

  openedChange(sda) {
    this.searchLabelListValue = '';
   }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Boundaries: Census Data Layer Settings',
      template: this.censusDataLayerSettings
    }, {
      width: 536,
      height:325,
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
