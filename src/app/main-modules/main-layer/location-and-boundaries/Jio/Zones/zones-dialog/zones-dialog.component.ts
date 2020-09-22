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
  selector: 'zones-dialog',
  templateUrl: './zones-dialog.component.html',
  styleUrls: ['./zones-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class ZonesJioDialogComponent implements OnInit {
  dialog: NavigationSettingsService;
  clickEventsubscription:Subscription;
  thematicList = THEMATIC_LIST;
  thematicListValue: string = THEMATIC_LIST[0].thematic_name;
  hoverList = HOVER_LIST;
  hoverListValue = HOVER_LIST[0].hover_name;
  searchThematicListValue;
  searchHoverListValue;
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
  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();

  title = 'dialog-example';
  @ViewChild('zonesJioLayerSettings', { static: true }) zonesJioLayerSettings: TemplateRef<any>;

  macroDialogForm:FormGroup;
  
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
    private cpService: ColorPickerService
  ) {
    this.macroDialogForm = new FormGroup({
      'outdoor':new FormControl(''),
      'indoor':new FormControl(''),
      'colorCoding': new FormControl(''),
      'infillShades': new FormControl(''),
      'opacity': new FormControl(''),
      'thematic': new FormControl(''),
      'hover': new FormControl('')
    });
  }

  changed(value) {
    if (this.disabled) return;
    this.color = value || this.color;
    this.colorChange.emit(this.color);
    this.update.emit();
  } 
  
  colorChanged(color) {
    console.log(color);
  }

  ngOnInit(): void {
    this.dispatchDialog();
  }

  openedChange(sda) {
    this.searchThematicListValue = '';
    this.searchHoverListValue = '';
   }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Boundaries: TAC Layer Settings',
      template: this.zonesJioLayerSettings
    }, {
      width: 536,
      height:500,
      backdropClass: 'light-white-backdrop',
      disableClose: false
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  private openDialog(dialogData: LeftsideSettingsModelsData, options: LeftsideSettingsModelsOptions): void {
    console.log(dialogData)
    this.dialog = this.navigationFactoryService.open(dialogData, options);
  }

}
