import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-prediction-scheduling',
  templateUrl: 'edit-prediction-scheduling.component.html',
  styleUrls: ['edit-prediction-scheduling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPredictionSchedulingComponent implements OnInit {

  public selectedRadio: string = 'Capacity';
  selectDurationFrequency: FormGroup;
  opens = 'center';
  drops = 'down';
  frequencyGroup = "Per Day";
  public todaysDay = new Date();
  selectedDateTime: any;
  selectedDateTimeValue: boolean = false;
  invalidDates: moment.Moment[] = [];
  tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  ];

  ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };

  frequencyList: any = [
    { 'name': 'Per Day' },
    { 'name': 'Per Week' },
    { 'name': 'Per Hour' },
    { 'name': 'Per Month' },
    { 'name': 'Busiest Day' },
    { 'name': 'BBH' },
    { 'name': 'NBH' }
  ];
  particularHourList: any = [
    { 'hour': '00:00' },
    { 'hour': '01:00' },
    { 'hour': '02:00' },
    { 'hour': '03:00' },
    { 'hour': '04:00' },
    { 'hour': '05:00' },
    { 'hour': '06:00' },
    { 'hour': '07:00' },
    { 'hour': '08:00' },
    { 'hour': '09:00' },
    { 'hour': '10:00' },
    { 'hour': '11:00' },
    { 'hour': '12:00' },
    { 'hour': '13:00' },
    { 'hour': '14:00' },
    { 'hour': '15:00' },
    { 'hour': '16:00' },
    { 'hour': '17:00' },
    { 'hour': '18:00' },
    { 'hour': '19:00' },
    { 'hour': '20:00' },
    { 'hour': '21:00' },
    { 'hour': '22:00' },
    { 'hour': '23:00' },
  ];
  checkboxSelectList: any = [
    { 'name': 'Daily' },
    { 'name': 'Weekly' },
    { 'name': 'Monthly' }
  ];



  constructor(public dialogRef: MatDialogRef<EditPredictionSchedulingComponent>,
    private router: Router,private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.selectDurationFrequency = this._formBuilder.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }

  routeAction(): void {
    // console.log(this.selectedRadio)
    if (this.selectedRadio == 'Capacity') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task']);
    } else if (this.selectedRadio == 'Coverage') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Create']);
    } else {
      this.router.navigate(['/JCP/Modules/Network-Planning/RF-Planning/Nominal-Strategic']);
    }
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }


  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }

  setCurrentTimestamp() {
    const currentdate = Date.now();
    const timestamp = moment(currentdate);
    timestamp.format('h:mm:ss');
    return timestamp;
  }


   // CALCULATE TIME A ND SEND IT TO HOME JCP COMPONENT

  terminateRunningTime() {
    let currentTime = this.setCurrentTimestamp();
    let pageTime;
    // let pageTime = this.pageData.time;
    let timeSpent = this.calculateTimeDifference(currentTime, pageTime);
    let timeObject = {
      timeSpent: timeSpent,
      screenId: 703,
      userId: 7722778
    };
    // this.datashare.sendCalcuateTimeToHomeJcpPageFn(timeObject)
  }

  calculateTimeDifference(endTime, startTime) {
    let totalHours = endTime.diff(startTime, 'hours');
    let totalMinutes = endTime.diff(startTime, 'minutes');
    let totalSeconds = endTime.diff(startTime, 'seconds');
    let clearMinutes = totalMinutes % 60;
    let clearSeconds = totalSeconds % 60;

    let hours = `${totalHours}`.length == 1 ? "0" + `${totalHours}` : totalHours
    let minutes = `${clearMinutes}`.length == 1 ? "0" + `${clearMinutes}` : clearMinutes;
    let seconds = `${clearSeconds}`.length == 1 ? "0" + `${clearSeconds}` : clearSeconds

    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  }





}


export class EditPredictionSchedulingDialogModel {
  constructor() {
  }
}