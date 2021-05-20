import { Component, Input, OnInit,TemplateRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { Options } from 'ng5-slider/options';
import { LABEL_LIST } from 'src/app/core/components/leftside-settings-popup/leftside-settings-popup.constant';
import { Subscription } from 'rxjs';
import { ColorPickerService, Cmyk } from 'ngx-color-picker'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nc-layer-settings-dialog',
  templateUrl: './nc-layer-settings-dialog.component.html',
  styleUrls: ['./nc-layer-settings-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class NcLayerSettingsDialogComponent implements OnInit {
  clickEventsubscription:Subscription;
  labelList = LABEL_LIST;
  sitePriorityValue: string = 'aa';
  gnbCandidatesValue: string = 'vv';
  odscCandidatesValue: string = '4G Fiberized Macro';
  candidates: boolean = true;
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
  macroDialogForm:FormGroup;
  title = 'dialog-example';
  dialog: NavigationSettingsService;
  @ViewChild('NcLayerSettingsDialog', { static: true }) NcLayerSettingsDialog: TemplateRef<any>;
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
  ) { 
    this.macroDialogForm = new FormGroup({
      'sitePriority':new FormControl(''),
      'gnbCandidates':new FormControl(''),
      'odscCandidates':new FormControl(''),
      'candidates':new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.dispatchDialog();
  }
  dispatchDialog() {
    this.openDialog({
      headerText: 'Capacity Based 5G Planning : Layer Settings',
      template: this.NcLayerSettingsDialog
    }, {
      width: 536,
      height:415,
      backdropClass: 'light-white-backdrop',
      disableClose: false
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  openedChange(sda) {
    // this.searchLabelListValue = '';
   }
  private openDialog(dialogData: LeftsideSettingsModelsData, options: LeftsideSettingsModelsOptions): void {
    this.dialog = this.navigationFactoryService.open(dialogData, options);
  }

}
