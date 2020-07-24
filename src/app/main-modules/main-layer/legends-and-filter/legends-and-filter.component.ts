import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';

import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';

// declare var $: any;

@Component({
  selector: 'app-legends-and-filter',
  templateUrl: './legends-and-filter.component.html',
  styleUrls: ['./legends-and-filter.component.scss']
})
export class LegendsAndFilterComponent implements OnInit {

  value: number = 10;
  minValue: number = 40;
  maxValue: number = 80;
  // highValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true,
    showTicksValues: true,
    stepsArray: [
      { value: -140, legend: '' },
      { value: -113, legend: '' },
      { value: -105, legend: '' },
      { value: -100, legend: '' },
      { value: -95, legend: '' },
      { value: -90, legend: '' },
      { value: -40, legend: '' },
    ],
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + value;
        case LabelType.High:
          return '' + value;
        default:
          return '' + value;
      }
    }
  };
  items = [
    { value: 1, legend: '#F44336' },
    { value: 3, legend: '#FF9800' },
    { value: 5, legend: '#8BC34A' },
    { value: 7, legend: '#4CAF50' },
    { value: 8, legend: '#3F51B5' },
    { value: 9, legend: '#03A9F4' }
  ];

  // ///////datepicker//////////
  form = this.fb.group({
    selected: [
      {
        startDate: '2019-12-11T18:30:00.000Z',
        endDate: '2019-12-12T18:29:59.000Z',
      },
      Validators.required,
    ],
  });
  locale: LocaleConfig = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'YYYY-MM-DD',
    applyLabel: 'Ok',
    clearLabel:'Clear'

  };
  // isLinear = false;
  // thirdFormGroup: FormGroup;
  // opens = 'center';
  // drops = 'up';
  // public todaysDay = new Date();
  // selectedDateTime: any;
  // selectedDateTimeValue: boolean = false;
  // invalidDates: moment.Moment[] = [];
  // tooltips = [
  //   { date: moment(), text: 'Today is just unselectable' },
  //   { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  // ];
  // ranges = {
  //   Today: [moment(), moment()],
  //   Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  //   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  //   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  //   'This Month': [moment().startOf('month'), moment().endOf('month')],
  //   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  //   'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  // };

  // isInvalidDate = (m: moment.Moment) => {
  //   return this.invalidDates.some((d) => d.isSame(m, 'day'));
  // };

  // isTooltipDate = (m: moment.Moment) => {
  //   const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
  //   if (tooltip) {
  //     return tooltip.text;
  //   } else {
  //     return false;
  //   }
  // };

  // rangeClicked(range): void {
  //   console.log('[rangeClicked] range is : ', range);
  //   this.selectedDateTimeValue = true;
  //   console.log(this.selectedDateTimeValue, "this.selectedDateTimeValue???????");
  // }

  // datesUpdated(range): void {
  //   console.log('[datesUpdated] range is : ', range);
  //   this.selectedDateTimeValue = true;
  //   console.log(this.selectedDateTimeValue, "this.selectedDateTimeValue???????");
  // }

  // //////////////////////////////////////

  private inited;

  layers: any = [
    { value: 'Analytics - RF In Bulding', viewValue: 'Analytics - RF In Bulding' },
    { value: 'Analytics - RF In Bding', viewValue: 'Analytics - RF In Bding' },
    { value: 'Analytics - RF In B', viewValue: 'Analytics - RF In B' },
  ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LegendsAndFilterComponent>) { }

  ngOnInit(): void {

    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })

  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }


}
