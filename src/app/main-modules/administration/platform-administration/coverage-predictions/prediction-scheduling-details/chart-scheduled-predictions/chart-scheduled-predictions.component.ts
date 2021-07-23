import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, VERSION } from '@angular/core';
// import { Chart } from "angular-highcharts";
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import xrange from "highcharts/modules/xrange";
import { Options, LabelType } from 'ng5-slider';
import * as moment from 'moment';

xrange(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'app-chart-scheduled-predictions',
  templateUrl: './chart-scheduled-predictions.component.html',
  styleUrls: ['./chart-scheduled-predictions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartScheduledPredictionsComponent implements OnInit {
  kpiDetailsChart;
  public timeType;
  public highcharts: any;
  public highchartsweekly: any;
  public highchartsyearly: any;
  public chartOptionsWeekly;
  public chartOptionsYearly;
  public chartOptions;
  public planetProject = 'All';
  public dataSourceFormGroup: FormGroup;
  @ViewChild("xRangeChart", { static: true }) xRangeChart: any;
  constructor(private location: Location, private _formBuilder: FormBuilder,) {
    // this.kpiDetailsChart = new Chart(
    //   {

    //     chart: {
    //       type: 'xrange'
    //     },
    //     title: {
    //       text: 'Highcharts X-range'
    //     },
    //     xAxis: {
    //       type: 'datetime'
    //     },
    //     yAxis: {
    //       title: {
    //         text: ''
    //       },
    //       categories: ['Prototyping', 'Development', 'Testing'],
    //       reversed: true
    //     },
    //     series: [{
    //       name: 'Project 1',
    //       // pointPadding: 0,
    //       // groupPadding: 0,
    //       borderColor: 'gray',
    //       pointWidth: 20,
    //       data: [{
    //         x: Date.UTC(2014, 10, 21),
    //         x2: Date.UTC(2014, 11, 2),
    //         y: 0,
    //         partialFill: 0.25
    //       }, {
    //         x: Date.UTC(2014, 11, 2),
    //         x2: Date.UTC(2014, 11, 5),
    //         y: 1
    //       }, {
    //         x: Date.UTC(2014, 11, 8),
    //         x2: Date.UTC(2014, 11, 9),
    //         y: 2
    //       }, {
    //         x: Date.UTC(2014, 11, 9),
    //         x2: Date.UTC(2014, 11, 19),
    //         y: 1
    //       }, {
    //         x: Date.UTC(2014, 11, 10),
    //         x2: Date.UTC(2014, 11, 23),
    //         y: 2
    //       }],
    //       dataLabels: {
    //         enabled: true
    //       }
    //     }]

    //     // exporting: {
    //     //   enabled: false
    //     // },
    //     // chart: {
    //     //   type: 'column',
    //     //   backgroundColor: "transparent",
    //     //   height: 250,
    //     //   spacingTop: 20
    //     // },
    //     // title: {
    //     //   text: null,
    //     // },
    //     // yAxis: [{
    //     //   min: 0,
    //     //   max: 100,
    //     //   tickInterval: 50,
    //     //   title: {
    //     //     text: '% Macro Area covered wrt DL <br> Throughput range(CDF)',
    //     //     rotation: 270,
    //     //     x: 5,
    //     //     style: {
    //     //       color: '#000000',
    //     //       fontFamily: 'Roboto',
    //     //       fontWeight: 'normal',
    //     //       fontSize: '12px'
    //     //     },
    //     //   },
    //     //   labels: {
    //     //     format: '{value}%',
    //     //     style: {
    //     //       color: '#000000',
    //     //       fontFamily: 'Roboto',
    //     //       fontWeight: 'normal',
    //     //       fontSize: '12px'
    //     //     },
    //     //   },
    //     //   opposite: true
    //     // }, {
    //     //   min: 0,
    //     //   max: 100,
    //     //   tickInterval: 50,
    //     //   title: {
    //     //     text: '% Area covered wrt DL Throughput range(PDF)',
    //     //     // x: -15,
    //     //     style: {
    //     //       color: '#000000',
    //     //       fontFamily: 'Roboto',
    //     //       fontWeight: 'normal',
    //     //       fontSize: '12px'
    //     //     },
    //     //   },
    //     //   labels: {
    //     //     format: '{value}%',
    //     //     style: {
    //     //       color: '#000000',
    //     //       fontFamily: 'Roboto',
    //     //       fontWeight: 'normal',
    //     //       fontSize: '12px'
    //     //     },
    //     //   }
    //     // }],
    //     // xAxis: {
    //     //   categories: ['0 <= <br>THP<br>< 2', '2 <= <br>THP<br>< 6',
    //     //     '6 <= <br>THP<br>< 10', '10 <= <br>THP<br>< 20',
    //     //     '20 <= <br>THP<br>< 26', '26 <= <br>THP<br>< 100'
    //     //   ],
    //     //   labels: {
    //     //     style: {
    //     //       color: '#000000',
    //     //       fontFamily: 'Roboto',
    //     //       fontWeight: 'normal',
    //     //       fontSize: '10px'
    //     //     },
    //     //     rotation: 0,
    //     //   }
    //     // },
    //     // legend: {
    //     //   enabled: false,
    //     // },
    //     // plotOptions: {
    //     //   series: {
    //     //     color: 'yellow',
    //     //     marker: {
    //     //       enabled: true
    //     //     },
    //     //     events: {
    //     //       legendItemClick: function (event) {
    //     //         if (!this.visible) return true;
    //     //         var seriesIndex = this.index;
    //     //         var series = this.chart.series;
    //     //         for (var i = 0; i < series.length; i++) {
    //     //           if (series[i].index != seriesIndex) {
    //     //             series[i].visible ? series[i].hide() : series[i].show();
    //     //           }
    //     //         }
    //     //         return false;
    //     //       }
    //     //     },
    //     //     // pointPadding: 0,
    //     //     // pointWidth: 30
    //     //   },
    //     //   column: {
    //     //     borderRadius: 8,
    //     //     pointWidth: 16,
    //     //     dataLabels: {
    //     //       enabled: true,
    //     //       style: {
    //     //         color: '#000000',
    //     //         fontFamily: 'Roboto',
    //     //         fontWeight: 'normal',
    //     //         fontSize: '12px'
    //     //       },
    //     //     }
    //     //   }

    //     // },
    //     // credits: {
    //     //   enabled: false
    //     // },
    //     // series: [{
    //     //   name: 'Brands',
    //     //   type: 'column',
    //     //   yAxis: 1,
    //     //   data: [{
    //     //     name: '0 <= <br>THP<br>< 2',
    //     //     y: 0.01,
    //     //     color: '#fa151b'
    //     //   }, {
    //     //     name: '2 <= <br>THP<br>< 6',
    //     //     y: 3.05,
    //     //     color: '#FC9337'
    //     //   }, {
    //     //     name: '6 <= <br>THP<br>< 10',
    //     //     y: 3.70,
    //     //     color: '#96ce58'
    //     //   }, {
    //     //     name: '10 <= <br>THP<br>< 20',
    //     //     y: 34.08,
    //     //     color: '#3eaf1e'
    //     //   }, {
    //     //     name: '20 <= <br>THP<br>< 26',
    //     //     y: 5.03,
    //     //     color: '#3aa4f2'
    //     //   }, {
    //     //     name: '26 <= <br>THP<br>< 100',
    //     //     y: 54.13,
    //     //     color: '#0f73bd'
    //     //   }]
    //     // }, {
    //     //   name: 'Temperature',
    //     //   type: 'spline',
    //     //   data: [0, 3.05, 3.07, 40, 48, 100]
    //     // }]
    //   }
    // );
  }

  value: number;
  minValue: number;
  maxValue: number;
  options: Options = {
    floor: 1,
    ceil: 3,
    showSelectionBarFromValue: 0,
    showTicks: true,
    getLegend: (value: number): string => {
      if (value == 1) {
        return "Daily";
      } else if (value == 2) {
        return "Weekly";
      } else {
        return "Monthly";
      }
    },
    getSelectionBarColor: (value: number): string => {
      return '#AFD4F2';
    },
    getPointerColor: (value: number): string => {
      return '#0078d7';
    }

  };
  chartHighcharts: any;
  chartPro: any;
  ngOnInit(): void {
    this.dataSourceFormGroup = this._formBuilder.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
    this.chartFunction();

  }

  chartFunction() {
    this.highcharts = Highcharts;
    this.highchartsyearly = Highcharts;
    this.highchartsweekly = Highcharts;

    this.chartOptions = {
      chart: {
        type: 'xrange'
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // millisecond: '%l:%M:%S.%L %P',
          // second: '%l:%M:%S %P',
          minute: '%l:%M %p',
          hour: '%l:%M %p',
          day: '(%e-%b) %l:%M %p',
        },
        plotLines: [{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 0, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 1, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 2, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 3, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 4, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 5, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 6, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 7, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 8, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 9, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 10, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 11, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 12, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 13, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 14, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 15, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 16, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 17, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 18, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 19, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 20, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 21, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 22, 0),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1, 23, 0),
          dashStyle: 'shortdashdot'
        }],
        tickInterval: 3600000,
      },
      yAxis: {
        title: {
          text: ''
        },
        categories: ['Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Proposed Nominal', 'Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Planned', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin'],
        reversed: true
      },
      legend: {
        labelFormatter: function () {
          return '<div style="min-width:165px;" class="row m-0 justify-content-start align-items-center"><div class="legend-title col p-0">' + this.name + '</div>';
          // + '<div class="legend-value">' + (this as any).y + '%</div></div>';
        },
        itemStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "14px"
        },
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 4,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      tooltip: {
        backgroundColor: '#434962',
        borderWidth: 0,
        style: {
          color: '#ffffff',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '13px'
        },
        formatter: function () {

          var totalHours
          var EndTime = this.x2
          var StartTime = this.x
          totalHours = EndTime - StartTime
          var resolutionTime = (((totalHours / 1000) / 60) / 60)
          console.log(resolutionTime)

          let from = new Date(this.x);
          let to = new Date(this.x2);

          // return 'Start : ' + from.toLocaleString() + '<br>' +
          //   ' End : ' + to.toLocaleString() + '<br>'+
          // 'Total Hours : ' + resolutionTime + ' Hours';

          return 'Start : ' + moment(from).format('DD-MMM-YY hh:mm A') + '<br>' +
            ' End : ' + moment(to).format('DD-MMM-YY hh:mm A') + '<br>' +
            'Total Hours : ' + resolutionTime + ' Hours';

        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            align: 'center',
            enabled: true,
            format: "{point.name}"
          }
        },
        xrange: {
          grouping: false,
          pointPadding: 0.4,
          groupPadding: 0,
          borderRadius: 6,
          borderWidth: 0,
        }
      },
      series: [
        {
          name: 'Completed',
          color: '#60DD5C',
          max: Date.UTC(2010, 0, 1),
          tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 0, 1, 0, 0),
            x2: Date.UTC(2010, 0, 1, 2, 0),
            y: 1,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 1, 6, 0),
            x2: Date.UTC(2010, 0, 1, 7, 0),
            y: 2,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1, 11, 0),
            x2: Date.UTC(2010, 0, 1, 13, 15),
            y: 3,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1, 20, 30),
            x2: Date.UTC(2010, 0, 1, 23, 0),
            y: 4,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1, 7, 0),
            x2: Date.UTC(2010, 0, 1, 9, 30),
            y: 5,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 1, 6, 30),
            x2: Date.UTC(2010, 0, 1, 5, 30),
            y: 6,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1, 3, 0),
            x2: Date.UTC(2010, 0, 1, 5, 30),
            y: 7,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1, 10, 0),
            x2: Date.UTC(2010, 0, 1, 13, 0),
            y: 8,
            color: '#60DD5C',
          }]
        },
        {
          name: 'Failed',
          color: '#F83E3E',
          max: Date.UTC(2010, 0, 1),
          tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 0, 1, 0, 0),
            x2: Date.UTC(2010, 0, 1, 8, 0),
            y: 0,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 1, 2, 0),
            x2: Date.UTC(2010, 0, 1, 6, 0),
            y: 3,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 1, 17, 0),
            x2: Date.UTC(2010, 0, 1, 19, 0),
            y: 8,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 1, 17, 0),
            x2: Date.UTC(2010, 0, 1, 19, 0),
            y: 5,
            color: '#F83E3E',
          }]
        },
        {
          name: 'In Progress',
          color: '#F8C93A',
          max: Date.UTC(2010, 0, 1),
          tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 0, 1, 15, 0),
            x2: Date.UTC(2010, 0, 1, 18, 45),
            y: 1,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1, 13, 15),
            x2: Date.UTC(2010, 0, 1, 16, 0),
            y: 2,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1, 18, 0),
            x2: Date.UTC(2010, 0, 1, 19, 15),
            y: 3,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1, 18, 30),
            x2: Date.UTC(2010, 0, 1, 19, 0),
            y: 4,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1, 15, 0),
            x2: Date.UTC(2010, 0, 1, 18, 45),
            y: 1,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1, 13, 15),
            x2: Date.UTC(2010, 0, 1, 16, 0),
            y: 2,
            color: '#F8C93A',
          }]
        },
        {
          name: 'Draft',
          color: '#FF8000',
          max: Date.UTC(2010, 0, 1),
          tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 0, 1, 22, 0),
            x2: Date.UTC(2010, 0, 1, 23, 0),
            y: 8,
            color: '#FF8000',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 1, 13, 15),
            x2: Date.UTC(2010, 0, 1, 16, 0),
            y: 5,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 1, 18, 0),
            x2: Date.UTC(2010, 0, 1, 19, 15),
            y: 3,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 1, 7, 30),
            x2: Date.UTC(2010, 0, 1, 9, 0),
            y: 1,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 1, 9, 0),
            x2: Date.UTC(2010, 0, 1, 12, 30),
            y: 7,
            color: '#FF8000',
            //partialFill: 0.25
          }]
        },
        {
          name: ' No Logs',
          color: '#AEAEAE',
          max: Date.UTC(2010, 0, 1),
          tickInterval: 30 * 24 * 3600 * 1000,
          data: []
        },
      ],
      exporting: {
        enabled: false
      }
    };

    this.chartOptionsWeekly = {
      chart: {
        type: 'xrange'
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        plotLines: [{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 2),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0,3),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 4),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0,5),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 6),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 7),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0,8),
          dashStyle: 'shortdashdot'
        }],
      },
      yAxis: {
        title: {
          text: ''
        },
        categories: ['Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Proposed Nominal', 'Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Planned', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin'],
        reversed: true
      },
      legend: {
        labelFormatter: function () {
          return '<div style="min-width:165px;" class="row m-0 justify-content-start align-items-center"><div class="legend-title col p-0">' + this.name + '</div>';
          // + '<div class="legend-value">' + (this as any).y + '%</div></div>';
        },
        itemStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "14px"
        },
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 4,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      tooltip: {
        backgroundColor: '#434962',
        borderWidth: 0,
        style: {
          color: '#ffffff',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '13px'
        },
        formatter: function () {

          let from = new Date(this.x);
          let to = new Date(this.x2);

          return 'Start : ' + moment(from).format('DD-MMM-YY') + '<br>' +
            ' End : ' + moment(to).format('DD-MMM-YY') + '<br>' ;
            // 'Total Hours : ' + resolutionTime + ' Hours';

        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            align: 'center',
            enabled: true,
            format: "{point.name}"
          }
        },
        xrange: {
          grouping: false,
          pointPadding: 0.4,
          groupPadding: 0,
          borderRadius: 6,
          borderWidth: 0,
        }
      },
      series: [
        {
          name: 'Completed',
          color: '#60DD5C',
          data: [{
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 3),
            y: 1,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0, 7),
            y: 2,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0,7),
            y: 3,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 1),
            x2: Date.UTC(2010, 0, 2),
            y: 4,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 4),
            x2: Date.UTC(2010, 0, 6),
            y: 5,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 5),
            x2: Date.UTC(2010, 0, 7),
            y: 6,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0, 8),
            y: 7,
            color: '#60DD5C',
          }]
        },
        {
          name: 'Failed',
          color: '#F83E3E',
          // max: Date.UTC(2010, 0, 1),
          // tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 4),
            y: 0,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 4),
            x2: Date.UTC(2010, 0, 5),
            y: 3,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 4),
            x2: Date.UTC(2010, 0, 6),
            y: 8,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 0, 7),
            x2: Date.UTC(2010, 0, 8),
            y: 5,
            color: '#F83E3E',
          }]
        },
        {
          name: 'In Progress',
          color: '#F8C93A',
          data: [{
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0,7),
            y: 0,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 4),
            x2: Date.UTC(2010, 0, 5),
            y: 2,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 1),
            x2: Date.UTC(2010, 0, 2),
            y: 3,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 4),
            y: 4,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 3),
            y: 6,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 4),
            y: 2,
            color: '#F8C93A',
          }]
        },
        {
          name: 'Draft',
          color: '#FF8000',
          data: [{
            x: Date.UTC(2010, 0, 1),
            x2: Date.UTC(2010, 0,3),
            y: 8,
            color: '#FF8000',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 0, 2),
            x2: Date.UTC(2010, 0, 3),
            y: 5,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 3),
            x2: Date.UTC(2010, 0, 5),
            y: 3,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 5),
            x2: Date.UTC(2010, 0, 6),
            y: 1,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0,8),
            y: 7,
            color: '#FF8000',
            //partialFill: 0.25
          }]
        },
        {
          name: ' No Logs',
          color: '#AEAEAE',
          data: []
        },
      ],
      exporting: {
        enabled: false
      }
    };

    this.chartOptionsYearly = {
      chart: {
        type: 'xrange'
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // millisecond: '%l:%M:%S.%L %P',
          // second: '%l:%M:%S %P',
          // minute: '%l:%M %p',
          // hour: '%l:%M %p',
          // day: '(%e-%b) %l:%M %p',
          day: '%b',
        },
        tickInterval: 1000 * 3600 * 24 *30, // 1 month
        // categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        plotLines: [{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 0, 1),
          dashStyle: 'shortdashdot'
        },{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 1, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 2, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 3,1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 4, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 5,1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 6, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 7, 1),
          dashStyle: 'shortdashdot'
        }, { // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 8,1),
          dashStyle: 'shortdashdot'
        },{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 9,1),
          dashStyle: 'shortdashdot'
        },{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 10,1),
          dashStyle: 'shortdashdot'
        },{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 11,1),
          dashStyle: 'shortdashdot'
        },{ // mark the weekend
          color: '#CCCCCC',
          width: 1,
          value: Date.UTC(2010, 12,1),
          dashStyle: 'shortdashdot'
        }
      ],
      },
      yAxis: {
        title: {
          text: ''
        },
        categories: ['Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Proposed Nominal', 'Mumbai On Air', 'Mumbai Proposed Nominal', 'Mumbai Planned', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin', 'Mumbai Approved Nomin'],
        reversed: true
      },
      legend: {
        labelFormatter: function () {
          return '<div style="min-width:165px;" class="row m-0 justify-content-start align-items-center"><div class="legend-title col p-0">' + this.name + '</div>';
          // + '<div class="legend-value">' + (this as any).y + '%</div></div>';
        },
        itemStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "14px"
        },
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 4,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      tooltip: {
        backgroundColor: '#434962',
        borderWidth: 0,
        style: {
          color: '#ffffff',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '13px'
        },
        formatter: function () {

          let from = new Date(this.x);
          let to = new Date(this.x2);

          return 'Start : ' + moment(from).format('DD-MMM-YY') + '<br>' +
            ' End : ' + moment(to).format('DD-MMM-YY') + '<br>' ;
            // 'Total Hours : ' + resolutionTime + ' Hours';

        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            align: 'center',
            enabled: true,
            format: "{point.name}"
          }
        },
        xrange: {
          grouping: false,
          pointPadding: 0.4,
          groupPadding: 0,
          borderRadius: 6,
          borderWidth: 0,
        }
      },
      series: [
        {
          name: 'Completed',
          color: '#60DD5C',
          data: [{
            x: Date.UTC(2010, 1, 2),
            x2: Date.UTC(2010, 2, 3),
            y: 1,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 4, 6),
            x2: Date.UTC(2010, 5, 7),
            y: 2,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 10, 6),
            x2: Date.UTC(2010, 11,7),
            y: 3,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 7, 1),
            x2: Date.UTC(2010, 9, 2),
            y: 4,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 12, 4),
            x2: Date.UTC(2010, 12, 26),
            y: 7,
            color: '#60DD5C',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 3, 5),
            x2: Date.UTC(2010, 4, 7),
            y: 6,
            color: '#60DD5C',
          }, {
            x: Date.UTC(2010, 0, 6),
            x2: Date.UTC(2010, 0, 8),
            y: 7,
            color: '#60DD5C',
          }]
        },
        {
          name: 'Failed',
          color: '#F83E3E',
          // max: Date.UTC(2010, 0, 1),
          // tickInterval: 30 * 24 * 3600 * 1000,
          data: [{
            x: Date.UTC(2010, 10, 2),
            x2: Date.UTC(2010, 11, 4),
            y: 0,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 8, 4),
            x2: Date.UTC(2010, 9, 5),
            y: 3,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 2, 4),
            x2: Date.UTC(2010, 3, 6),
            y: 8,
            color: '#F83E3E',
          }, {
            x: Date.UTC(2010, 10, 7),
            x2: Date.UTC(2010, 11, 8),
            y: 5,
            color: '#F83E3E',
          }]
        },
        {
          name: 'In Progress',
          color: '#F8C93A',
          data: [{
            x: Date.UTC(2010, 6, 6),
            x2: Date.UTC(2010, 7,7),
            y: 0,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 1, 4),
            x2: Date.UTC(2010, 2, 5),
            y: 2,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 5, 1),
            x2: Date.UTC(2010, 6, 2),
            y: 3,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 11, 2),
            x2: Date.UTC(2010, 12, 4),
            y: 4,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 4, 2),
            x2: Date.UTC(2010, 7, 3),
            y: 6,
            color: '#F8C93A',
          }, {
            x: Date.UTC(2010, 10, 2),
            x2: Date.UTC(2010, 11, 4),
            y: 2,
            color: '#F8C93A',
          }]
        },
        {
          name: 'Draft',
          color: '#FF8000',
          data: [{
            x: Date.UTC(2010, 8, 1),
            x2: Date.UTC(2010, 9,3),
            y: 8,
            color: '#FF8000',
            //partialFill: 0.25
          }, {
            x: Date.UTC(2010, 10, 2),
            x2: Date.UTC(2010, 12, 15),
            y: 6,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 0, 3),
            x2: Date.UTC(2010, 1, 5),
            y: 3,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 3, 5),
            x2: Date.UTC(2010, 4, 6),
            y: 1,
            color: '#FF8000',
          }, {
            x: Date.UTC(2010, 5, 6),
            x2: Date.UTC(2010, 6,8),
            y: 7,
            color: '#FF8000',
            //partialFill: 0.25
          }]
        },
        {
          name: ' No Logs',
          color: '#AEAEAE',
          data: []
        },
      ],
      exporting: {
        enabled: false
      }
    };


  }



  public valueTypeDate;
  public typeStrDate;

  listDateType = ['Daily', 'Weekly', 'Monthly'];
  public showChartType = 'Daily';
  public showChartTypeYearly;
  valueChange(value: number): void {
    console.log(value, "value");
    if (value == 2) {
      this.showChartType = 'Weekly';
      // this.showChartTypeYearly = false;
    } else if (value == 3) {
      this.showChartType = 'Monthly';
      // this.showChartTypeYearly = 'yearly';
    } else {
      this.showChartType = 'Daily';
      // this.showChartTypeYearly = false;
    }
    // this.log += `valueChanged: ${value}\n`;
  }

  invalidDates: moment.Moment[] = [];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  ];

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  public todaysDay = new Date();
  selectedDateTime: any;
  selectedDateTimeValue: boolean = false;
  opens = 'center';
  drops = 'down';
  frequencyGroup = "Per Day";

  public ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
