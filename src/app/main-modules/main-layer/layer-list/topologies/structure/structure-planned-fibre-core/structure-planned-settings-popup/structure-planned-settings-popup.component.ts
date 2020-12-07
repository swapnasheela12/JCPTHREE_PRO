import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import * as moment from 'moment';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';

@Component({
  selector: 'app-structure-planned-settings-popup',
  templateUrl: './structure-planned-settings-popup.component.html',
  styleUrls: ['./structure-planned-settings-popup.component.scss']
})
export class StructurePlannedSettingsPopupComponent implements OnInit {
  dialog: NavigationSettingsService;
  // clickEventsubscription: Subscription;
  @ViewChild('select') select: MatSelect;
  allSelected=false;
   ///////datepicker//////////
   public opens = 'center';
   public  drops = 'up';
   public todaysDay = new Date();
   public  selectedDateTime: any;
   public selectedDateTimeValue: boolean = false;
   public  invalidDates: moment.Moment[] = [];
  public thirdFormGroup: FormGroup;
  frequencyGroup = "Daily";
   public tooltips = [
     { date: moment(), text: '' },
     { date: moment().add(2, 'days'), text: '' },
   ];
   public ranges = {
     Today: [moment(), moment()],
     Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
     'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
   };
   isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  ngOnInit(): void {
    this.dispatchDialog();
    this.thirdFormGroup = this.formBuilder.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
        },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };
  // thirdFormGroup: any;
  // formBuilder: any;

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }
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
  towerIpValue = 'AG1';
  filterDropdownValue = '<';
  sitePriorityValue = 'VVIP';
  dataTypeValue = 'Default';
  siteStagesValue = ['Nominals'];
  gridsize: number;
  @ViewChild('fibreStructureLayerSettingsPopup', { static: true }) fibreStructureLayerSettingsPopup: TemplateRef<any>;

  macroDialogForm: FormGroup;

  constructor(
    private navigationFactoryService: NavigationSettingsFactoryService, 
    private formBuilder: FormBuilder,
    // private cpService: ColorPickerService
  ) {
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Structure Settings',
      template: this.fibreStructureLayerSettingsPopup
    }, {
      width: 536,
      height: 600,
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
