import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { FormGroup } from '@angular/forms';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'nominal-macro-dialog',
  templateUrl: './macro-dialog.component.html',
  styleUrls: ['./macro-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NominalMacroDialogComponent implements OnInit {
  dialog: NavigationSettingsService;
  title: string;
  @ViewChild('select') select: MatSelect;
  allSelected=false;
  siteStagesList: any[] = [
    {value: 'Nominals', option: 'Nominals'},
    {value: 'RFE 1 Survey', option: 'RFE1 Survey'},
    {value: 'RFE 1 Acceptance', option: 'RFE 1 Acceptance'},
    {value: 'Install eNb', option: 'Install eNb'}
  ];
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
   siteSatgesOptionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  labelValue = 'Site ID';
  towerIpValue = 'P1';
  filterDropdownValue = 'P1';
  sitePriorityValue = 'P1';
  dataTypeValue = 'P1';
  siteStagesValue = ['Nominals'];
  gridsize: number = 30;
  // updateSetting(event) {
  //   this.gridsize = event.value;
  // }
  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();
  @Output() update = new EventEmitter<any>();

  // title = 'dialog-example';
  @ViewChild('nominalMacroLayerSettings', { static: true }) nominalMacroLayerSettings: TemplateRef<any>;

  macroDialogForm:FormGroup;
  
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
  ) {
  }

  ngOnInit(): void {
    this.dispatchDialog();
  }


  dispatchDialog() {
    this.openDialog({
      headerText: 'Sites: Nominal Macro Layer Settings',
      template: this.nominalMacroLayerSettings
    }, {
      width: 540,
      height: 420,
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

