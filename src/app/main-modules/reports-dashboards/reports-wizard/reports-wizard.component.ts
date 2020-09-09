import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VERSION } from "@angular/material/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateReportComponent } from './create-report/create-report.component';
import { SuccessfulComponent } from 'src/app/core/components/commanPopup/successful/successful.component';

export interface DialogData {
  animal: string;
  name: string;
}
export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
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
  public isLinear = false;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  ///////////stepar//////////////


  //////////breadcrums///////////////
  public  breadcrumbLinksList: string;
  public urlPathPage: string;
  //////////breadcrums///////////////

  ///////datepicker//////////
  public opens = 'center';
  public  drops = 'up';
  public todaysDay = new Date();
  public  selectedDateTime: any;
  public selectedDateTimeValue: boolean = false;
  public  invalidDates: moment.Moment[] = [];
  public tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
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

  constructor( private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog,) {
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
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }
  ///////datepicker//////////

  ngOnInit() {
    this.stepperReportW();
    setTimeout(() => {
      this.openDialog();
    }, 200);
  }

  stepperReportW() {
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
        },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });

  }

  public animal: string;
  public name: string;
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

  public gotomyreport: string;
  public createnewreport: string;
  openDialogSuccessful(): void {
    const dialogRef = this.dialog.open(SuccessfulComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { newreportInterface: this.createnewreport, gotomyreportInterface: this.gotomyreport }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.gotomyreport = result;
    });
  };


}
