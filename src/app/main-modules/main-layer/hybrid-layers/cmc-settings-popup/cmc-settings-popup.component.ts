import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';

@Component({
  selector: 'app-cmc-settings-popup',
  templateUrl: './cmc-settings-popup.component.html',
  styleUrls: ['./cmc-settings-popup.component.scss']
})
export class CmcSettingsPopupComponent implements OnInit {

  dialog: NavigationSettingsService;
  title = 'dialog-example';
  @ViewChild('hybridLayerCmcSettingsPopup', { static: true }) hybridLayerCmcSettingsPopup: TemplateRef<any>;
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
    // private cpService: ColorPickerService
  ) {
  }
  
  ngOnInit(): void {
    this.dispatchDialog();
  }

  openedChange(sda) {
   
   }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Hybird: CMC Layer Settings',
      template: this.hybridLayerCmcSettingsPopup
    }, {
      width: 536,
      height:350,
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
