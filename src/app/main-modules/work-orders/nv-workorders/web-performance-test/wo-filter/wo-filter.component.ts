import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-wo-filter',
  templateUrl: './wo-filter.component.html',
  styleUrls: ['./wo-filter.component.scss']
})
export class WoFilterComponent implements OnInit {
   //daterange
   selectDaily = ["Daily", "Weekly", "Monthly"];
   range = new FormGroup({
     start: new FormControl(),
     end: new FormControl()
   });
   thirdFormGroup: FormGroup;
   selected: {
     startDate: '2019-12-11T18:30:00.000Z',
     endDate: '2019-12-12T18:29:59.000Z',
   }
 
    ///////datepicker//////////
    opens = 'center';
    drops = 'up';
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

    templateType = ["Target Area", "Target Area"];
  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<WoFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, public fb: FormBuilder) {
    router.events.subscribe((url: any) => console.log(url));
    this.stepperReportW();
  }

  
  stepperReportW() {
    this.thirdFormGroup = this.fb.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
        // startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        // endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
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

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  clickReset(): void {
    this.dialogRef.close();
  }

  clickApply(): void {
    this.dialogRef.close();
  }

}

