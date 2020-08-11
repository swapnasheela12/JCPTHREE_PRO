import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";

import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-kpi-details-chart',
  templateUrl: './kpi-details-chart.component.html',
  styleUrls: ['./kpi-details-chart.component.scss']
})
export class KpiDetailsChartComponent implements OnInit {

  public chartDivWidth;
  public chartDivHeight;
  public chartDivWidthTraffic;
  public chartDivHeightTraffic;

  constructor(private datashare: DataSharingService) {
    this.datashare.currentMessage.subscribe((message) => {

      var divWidth;
      var divHeight;
      var divWidthTraffic;
      var divHeightTraffic;

      setTimeout(() => {
        divWidth = $("#chartTotalSubscriberIdDiv").width();
        divHeight = $("#chartTotalSubscriberIdDiv").height();
        divWidthTraffic = $("#kpiDetailsChartIdDiv").width();
        divHeightTraffic = $("#kpiDetailsChartIdDiv").height();
        this.chartDivWidth = divWidth;
        this.chartDivHeight = divHeight;
        this.chartDivWidthTraffic = divWidth;
        this.chartDivHeightTraffic = divHeight;
        this.resizeChart();
      }, 1000);

      if (!message) {

        this.chartDivWidth = divWidth + 186.656;
        this.chartDivHeight = divHeight;
        this.chartDivWidthTraffic = divWidthTraffic + 186.656;
        this.chartDivHeightTraffic = divHeightTraffic;
        this.resizeChart();
      } else {
        this.chartDivWidth = divWidth - 186.656;
        this.chartDivHeight = divHeight;
        this.chartDivWidthTraffic = divWidthTraffic - 186.656;
        this.chartDivHeightTraffic = divHeightTraffic;
        this.resizeChart();
      }

    });

  }




  ngOnInit(): void {
  }

  resizeChart() {
    // var chartTotalSubscriberRef = this.chartTotalSubscriber.ref$.source;
    // chartTotalSubscriberRef.subscribe((response) => {
    //   response.chartWidth = this.chartDivWidth;
    //   response.chartHeight = this.chartDivHeight;
    //   this.chartTotalSubscriber.ref.setSize(response.chartWidth, response.chartHeight);
    // });

    var dailyTrafficrRef = this.kpiDetailsChart.ref$.source;
    dailyTrafficrRef.subscribe((response) => {
      response.chartWidth = this.chartDivWidthTraffic;
      response.chartHeight = this.chartDivHeightTraffic;
      this.kpiDetailsChart.ref.setSize(response.chartWidth, response.chartHeight);
    });

  }

  // chart1: Chart;
  kpiDetailsChart = new Chart(
    {
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column',
        backgroundColor: "transparent",
        height: 178,
        spacingTop: 20
      },
      title: {
        text: null,
      },
      yAxis: [{
        min: 0,
        max: 100,
        tickInterval: 50,
        title: {
          text: '% Area covered wrt DL <br> Throughput range(CDF)',
          rotation: 270,
          x: 5,
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        },
        labels: {
          format: '{value}%',
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        },
        opposite: true
      }, {
        min: 0,
        max: 100,
        tickInterval: 50,
        title: {
          text: '% Area covered wrt DL <br> Throughput range(PDF)',
          x: -15,
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        },
        labels: {
          format: '{value}%',
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        }
      }],
      xAxis: {
        categories: ['0 <= <br>THP<br>< 2', '2 <= <br>THP<br>< 6',
          '6 <= <br>THP<br>< 10', '10 <= <br>THP<br>< 20',
          '20 <= <br>THP<br>< 26', '26 <= <br>THP<br>< 100'
        ],
        labels: {
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '10px'
          },
          rotation: 0,
        }
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          color: 'yellow',
          marker: {
            enabled: true
          },
          events: {
            legendItemClick: function (event) {
              if (!this.visible) return true;
              var seriesIndex = this.index;
              var series = this.chart.series;
              for (var i = 0; i < series.length; i++) {
                if (series[i].index != seriesIndex) {
                  series[i].visible ? series[i].hide() : series[i].show();
                }
              }
              return false;
            }
          },
          // pointPadding: 0,
          // pointWidth: 30
        },
        column: {
          dataLabels: {
            enabled: true,
            style: {
              color: '#000000',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
            },
          }
        }

      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Brands',
        type: 'column',
        yAxis: 1,
        data: [{
          name: '0 <= <br>THP<br>< 2',
          y: 0.01,
          color: '#fa151b'
        }, {
          name: '2 <= <br>THP<br>< 6',
          y: 3.05,
          color: '#FC9337'
        }, {
          name: '6 <= <br>THP<br>< 10',
          y: 3.70,
          color: '#96ce58'
        }, {
          name: '10 <= <br>THP<br>< 20',
          y: 34.08,
          color: '#3eaf1e'
        }, {
          name: '20 <= <br>THP<br>< 26',
          y: 5.03,
          color: '#3aa4f2'
        }, {
          name: '26 <= <br>THP<br>< 100',
          y: 54.13,
          color: '#0f73bd'
        }]


      }, {
        name: 'Temperature',
        type: 'spline',
        data: [0, 3.05, 3.07, 40, 48, 100],
        // tooltip: {
        //     valueSuffix: '°C'
        // }
      }]
      // series: [{
      //     // name: 'Brands',
      //     // colorByPoint: true,
      //     // data: [{
      //     //     name: '0 <= <br>THP<br>< 2',
      //     //     y: 0.01,
      //     //     color: '#fa151b'
      //     // }, {
      //     //     name: '2 <= <br>THP<br>< 6',
      //     //     y: 3.05,
      //     //     color: '#FC9337'
      //     // }, {
      //     //     name: '6 <= <br>THP<br>< 10',
      //     //     y: 3.70,
      //     //     color: '#96ce58'
      //     // }, {
      //     //     name: '10 <= <br>THP<br>< 20',
      //     //     y: 34.08,
      //     //     color: '#3eaf1e'
      //     // }, {
      //     //     name: '20 <= <br>THP<br>< 26',
      //     //     y: 5.03,
      //     //     color: '#3aa4f2'
      //     // }, {
      //     //     name: '26 <= <br>THP<br>< 100',
      //     //     y: 54.13,
      //     //     color: '#0f73bd'
      //     // }]
      // }, {
      //     type: 'spline',
      //     name: 'Average',
      //     data: [0, 3.05, 3.07, 40, 48, 100],
      //     marker: {
      //         lineWidth: 2,
      //         lineColor: 'yellow',
      //         fillColor: 'yellow'
      //     }
      // }],
      // loading: false,
    }

  );

  public kpiDetailsValSelected = "Atoll Planned RSRP ALL";

  kpiDetailsList = [
    'Atoll Planned RSRP ALL',
    'Atoll Planned RSRP 2300',
    'Atoll Planned RSRP 1800',
    'Atoll Planned RSRP 850'
  ];

  kpiDetailsCartPopFun(){}


}
