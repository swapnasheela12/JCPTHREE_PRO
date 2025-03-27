import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker'

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class FibreRouteSettingsPopupComponent implements OnInit {
  dialog: NavigationSettingsService;
  selectedDate = new FormControl(new Date());
  // clickEventsubscription: Subscription;
  @ViewChild('select') select: MatSelect;
  @Input() colorOutline: string;
  @Input() colorFill: string;
  gridsize: number;
  @ViewChild('nominalMacroLayerSettings', { static: true }) nominalMacroLayerSettings: TemplateRef<any>;
  macroDialogForm: FormGroup;
  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService,
    // private cpService: ColorPickerService
  ) {
  }

  ngOnInit(): void {
    this.dispatchDialog();
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Fibre Route Settings Pop',
      template: this.nominalMacroLayerSettings
    }, {
      width: 536,
      height: 430,
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
