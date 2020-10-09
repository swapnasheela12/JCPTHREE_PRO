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
import { DataSharingService } from 'src/app/_services/data-sharing.service'

@Component({
  selector: 'app-import-kml',
  templateUrl: './import-kml.component.html',
  styleUrls: ['./import-kml.component.scss'],
  providers: [ColorPickerService]
})
export class ImportKmlComponent implements OnInit {
  dialog: NavigationSettingsService;
  clickEventsubscription: Subscription;
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
  someValue = 0;
  foods = [
    { value: 'steak-0', icon: 'add', viewValue: 'Steak' },
    { value: 'pizza-1', icon: 'lock', viewValue: 'Pizza' },
    { value: 'tacos-2', icon: 'search', viewValue: 'Tacos' }
  ];
  public selected2 = { value: 'steak-0', icon: 'add', viewValue: 'Steak' };
  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();

  title = 'dialog-example';
  @ViewChild('networkTalLayerSettings', { static: true }) networkTalLayerSettings: TemplateRef<any>;

  macroDialogForm: FormGroup;

  constructor(private dataShare: DataSharingService,
    private navigationFactoryService: NavigationSettingsFactoryService,
    // private cpService: ColorPickerService
  ) {
    this.macroDialogForm = new FormGroup({
      'outdoor': new FormControl(''),
      'indoor': new FormControl(''),
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

  ngOnInit(): void {
    this.dispatchDialog();
  }

  openedChange(sda) {
    this.searchThematicListValue = '';
    this.searchHoverListValue = '';
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Pin Group Layers Settings',
      template: this.networkTalLayerSettings
    }, {
      width: 540,
      height: 450,
      backdropClass: 'light-white-backdrop',
      disableClose: false
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  compareFn(f1: any, f2: any): boolean {
    return f1 && f2 ? f1.value === f2.value : f1 === f2;
  }

  private openDialog(dialogData: LeftsideSettingsModelsData, options: LeftsideSettingsModelsOptions): void {
    // console.log(this.dialog.context)
    this.dialog = this.navigationFactoryService.open(dialogData, options);
  }

}

