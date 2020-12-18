import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Chart } from "angular-highcharts";
import * as Highcharts from 'highcharts';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/main-modules/reports-dashboards/reports-wizard/create-report/create-report.component';

declare var $: any;
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {
  selectAlpha = ["I-MU-NVMB-ENB-1007", "I-MU-NVMB-ENB-1007- (ALPHA)", "I-MU-NVMB-ENB-1007- (BETA)", "I-MU-NVMB-ENB-1007- (GAMMA)",
    "I-MU-NVMB-ENB-1007- (ALPHA ADDITIONAL)", "I-MU-NVMB-ENB-1007- (BETA ADDITIONAL)", "I-MU-NVMB-ENB-1007- (GAMMA ADDITIONAL)"];
  selectAccessibility = ["Accessibility", "RRC Connection Success Rate", "E-RAB SSR", "Call Drop Rate"];
  selectChart = ["Line Chart", "Non-Zero Data", "Bar Chart"];
  selectDaily = ["Daily", "Weekly", "Monthly"];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  divWidthTraffic;
  divHeightTraffic;
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
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<KpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    dialogRef.disableClose = true;
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


  ngOnInit(): void {
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        spacingTop: 10,
        height: 300,
        width: 980,
        backgroundColor: null
      },
      title: {
        text: null
      },
      tooltip: {
        shared: true,
        // crosshairs: {
        //   dashStyle: 'solid',
        //   width: 1,
        //   color: '#C0C0C0'
        // }
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec',
          '6 Dec', '7 Dec', '8 Dec', '9 Dec', '10 Dec', '11 Dec',
          '12 Dec', '13 Dec', '14 Dec', '15 Dec', '16 Dec', '17 Dec',
          '18 Dec', '19 Dec', '20 Dec', '21 Dec', '22 Dec', '23 Dec',
          '24 Dec', '25 Dec', '26 Dec', '27 Dec', '28 Dec', '29 Dec',
          '30 Dec'
        ],
        //autoRotation: [80],
        plotLines: [{
          color: '#EA1F2E',
          width: 2,
          value: 2,
          zIndex: 2,
        }, {
          color: '#EA1F2E',
          width: 2,
          zIndex: 2,
          value: 4
        }, {
          color: '#EA1F2E',
          width: 2,
          zIndex: 2,
          value: 5
        }]
      },
      yAxis: [{ // Primary yAxis
        min: 0,
        max: 7,
        tickInterval: 1,
        labels: {
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        },
        title: {
          text: 'Accessibility (%)',
          x: 0,
          rotation: 269,
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '14px',
            //opacity: '0.6'
          },
        }

      }],

      series: [
        {
          color: "#f7931e",
          type: 'line',
          name: 'Overall',
          data: [3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 5, 4, 5,
            4, 3, 2, 1, 3, 2, 1, 2, 3, 5, 4, 3
          ],
          marker: {
            lineWidth: 2,
            symbol: 'diamond',
            lineColor: '#f7931e',
            fillColor: '#f7931e'
          }
        },
        {
          color: "#29abe2",
          type: 'line',
          name: '2300(C1)',
          data: [1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 5, 4, 4, 3, 2, 3, 5, 4,
            4, 3, 3, 2, 3, 4, 5, 4, 2, 3, 4, 6
          ],
          marker: {
            lineWidth: 2,
            symbol: 'circle',
            lineColor: '#29abe2',
            fillColor: '#29abe2'
          }
        }, {
          color: "#39b54a",
          type: 'line',
          name: '2300(C2)',
          data: [7, 6, 5, 4, 3, 2, 3, 2, 4, 5, 6, 7, 5, 4, 3, 3, 4, 5,
            4, 3, 2, 1, 3, 2, 2, 4, 3, 5, 7, 6
          ],
          marker: {
            lineWidth: 2,
            symbol: 'circle',
            lineColor: '#39b54a',
            fillColor: '#39b54a'
          }
        },
        // {
        //     color: "#f7931e",
        //     type: 'line',
        //     name: '1800',
        //     data: [3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 5, 4, 5,
        //         4, 3, 2, 1, 3, 2, 1, 2, 3, 5, 4, 3
        //     ],
        //     marker: {
        //         lineWidth: 2,
        //         symbol: 'circle',
        //         lineColor: '#f7931e',
        //         fillColor: '#f7931e'
        //     }
        // }, 
        {
          type: 'line',
          name: '1800 (C1)',
          color: "#662d91",
          data: [4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 5, 4, 5,
            4, 3, 3, 4, 4, 2, 3, 3, 5, 5, 5, 6
          ],
          marker: {
            symbol: 'circle',
            lineWidth: 2,
            lineColor: '#662d91',
            fillColor: '#662d91'
          }
        }, {
          type: 'line',
          name: '850 (C1)',
          color: "#fcee21",
          data: [5, 6, 4, 3, 2, 1, 3, 3, 2, 2, 2, 1, 3, 3, 4, 4, 5, 5,
            4, 4, 2, 2, 3, 3, 4, 4, 4, 1, 1, 1
          ],
          marker: {
            symbol: 'circle',
            lineWidth: 2,
            lineColor: '#fcee21',
            fillColor: '#fcee21'
          }
        }],

      // loading: false
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
