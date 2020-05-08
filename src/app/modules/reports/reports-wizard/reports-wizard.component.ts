import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, VERSION } from "@angular/material";
import { CreateReportComponent } from './create-report/create-report.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-reports-wizard',
  templateUrl: './reports-wizard.component.html',
  styleUrls: ['./reports-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportsWizardComponent implements OnInit {

  ///////////////
  public targetReport = "ODSC Planning Report";
  public zoneReport = "All Zone";
  ///////////////

  ///////////stepar//////////////
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  ///////////stepar//////////////


  //////////breadcrums///////////////
  breadcrumbLinksList: string;
  urlPathPage: string;
  //////////breadcrums///////////////

  ///////datepicker//////////
  opens = 'right';
  drops = 'down';
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



  ///////datepicker//////////
  public reportTabIndex = 0;
  public tabDisabledTab1 = false;
  public tabDisabledTab2 = false;
  public tabIndex;
  public tabCount = 3;
  tabClick(tab) {
    this.tabIndex = tab.index;
    if (tab.index == 1) {
      this.tabDisabledTab1 = true;
    } else if (tab.index == 2) {
      this.tabDisabledTab2 = true;
    }
  }

  tabNextClick(item) {
    this.reportTabIndex = (this.reportTabIndex + 1) % this.tabCount;
  }

  tabPreviousClick($event) {
    if (this.tabIndex == 1) {
      this.tabDisabledTab1 = false;
    } else if (this.tabIndex == 2) {
      this.tabDisabledTab2 = false;
    }
    this.reportTabIndex = (this.reportTabIndex - 1) % this.tabCount;

  }


  constructor(private location: Location, private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog,) {
    // router.events.subscribe((url: any) => console.log(url));
    // console.log(router.url)
    // /////////////breadcrums////////////////////

    // this.urlPathPage = router.url;

    // this.breadcrumbLinksList = this.urlPathPage.split('/').join("<i class='fa fa-chevron-right pl-1 pr-1'></i>")
    // console.log(this.breadcrumbLinksList, "this.breadcrumbLinksList");

    // /////////////breadcrums////////////////////

    ///////////////////
    ///////////////////

    console.log(this.selectedDateTimeValue, "this.selectedDateTimeValue>>>>>>>");
  }

  ///////datepicker//////////
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
    console.log('[rangeClicked] range is : ', range);
    this.selectedDateTimeValue = true;
    console.log(this.selectedDateTimeValue, "this.selectedDateTimeValue???????");
  }

  datesUpdated(range): void {
    console.log('[datesUpdated] range is : ', range);
    this.selectedDateTimeValue = true;
    console.log(this.selectedDateTimeValue, "this.selectedDateTimeValue???????");
  }
  ///////datepicker//////////




  ngOnInit() {
    this.stepperReportW();
    setTimeout(() => {
      this.openDialog();
    }, 200);
  }

  stepperReportW() {
    console.log(this.todaysDay, "todaysDay");
    console.log(this.todaysDay, "todaysDay");

    this.firstFormGroup = this.formBuilder.group({
      dataSources: ['LSR', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      zoneType: ['All Zone', Validators.required],
      jioStateType: ['-', Validators.required],
      focusTownType: ['-', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
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
    // this.selectedDateTimeValue = this.thirdFormGroup.get('selectedDateTime').value;
    console.log(this.firstFormGroup, "thirdFormGroup");
    console.log(this.secondFormGroup, "thirdFormGroup");
    console.log(this.thirdFormGroup, "thirdFormGroup");


  }

  animal: string;
  name: string;
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateReportComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
    });
  };


}
