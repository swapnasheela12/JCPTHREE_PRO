import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-wizard',
  templateUrl: './reports-wizard.component.html',
  styleUrls: ['./reports-wizard.component.scss']
})
export class ReportsWizardComponent implements OnInit {


    //////////breadcrums///////////////
    breadcrumbLinksList: string;
    urlPathPage: string;
    //////////breadcrums///////////////
  
    ///////datepicker//////////
    selected: any;
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
    form = this.formBuilder.group({
      selected: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  
  
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
  
  
    constructor(private location: Location, private router: Router, private formBuilder: FormBuilder) {
      // router.events.subscribe((url: any) => console.log(url));
      // console.log(router.url)
      // /////////////breadcrums////////////////////
  
      // this.urlPathPage = router.url;
  
      // this.breadcrumbLinksList = this.urlPathPage.split('/').join("<i class='fa fa-chevron-right pl-1 pr-1'></i>")
      // console.log(this.breadcrumbLinksList, "this.breadcrumbLinksList");
  
      // /////////////breadcrums////////////////////
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
    }
  
    datesUpdated(range): void {
      console.log('[datesUpdated] range is : ', range);
    }
    ///////datepicker//////////


  

  ngOnInit() {
  }

}
