import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import { Inject } from '@angular/core';

interface DataObject {
  [key: string]: any;
}

@Component({
  selector: 'app-alarm-summary-chart-expand',
  templateUrl: './alarm-summary-chart-expand.component.html',
  styleUrls: ['./alarm-summary-chart-expand.component.scss']
})
export class AlarmSummaryChartExpandComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlarmSummaryChartExpandComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
  onApply(): void {
    this.dialogRef.close(false);
  }


  public panindiachart: DataObject = new Chart({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      spacingTop: 20,
      spacingBottom: 20,
      spacingRight: 20,
      spacingLeft: 20,
      height: 400
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    // legend: {
    //   align: 'center',
    //   verticalAlign: 'bottom',
    //   floating: false,
    //   shadow: false
    // },
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
      symbolRadius: 0,
      align: 'center',
      verticalAlign: 'bottom',
      shadow: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return '<div>' + (this as any).y + '%</div>';
          },
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          distance: -18,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -180,
        endAngle: 180,
        center: ["50%", "50%"],
        size: "100%",
        showInLegend: true
      }
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "70%",
        data: [
          {
            name: "SA",
            color: "#FC5F5F",
            y: 15
          },
          {
            name: "NSA",
            color: "#4BB2F4",
            y: 60
          },
          {
            name: "Performance Degrading",
            color: "#F8C93A",
            y: 25
          }
        ]
      }
    ]
  });

  public activeAlarmAgingChart = new Chart({
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    chart: {
      type: 'bar',
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      spacingTop: 20,
      spacingBottom: 20,
      spacingRight: 20,
      spacingLeft: 20,
      height: 400
    },
    title: {
      text: null
    },
    xAxis: {
      gridLineColor: '#e6e6e6',
      categories: ['>24 Hrs', '12-24 Hrs', '8-12 Hrs', '4-8 Hrs', '0-4 Hrs']
    },
    yAxis: {
      min: 0,
      max: 700,
      gridLineColor: '#e6e6e6',
      title: {
        text: null
      }
    },
    legend: {
      floating: false,
      itemStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "14px"
      },
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 0,
      align: 'center',
      verticalAlign: 'bottom',
      shadow: false
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        dataLabels: {
          enabled: false
        }
      },
      series: {
        stacking: 'normal',
      }
    },
    series: [
      {
        type: 'bar',
        name: 'SA',
        stack: 'Tasks',
        color: "#FC5F5F",
        pointWidth: 12,
        // borderRadius: 6,
        // borderRadiusTopLeft: '50%',
        // borderRadiusTopRight: '50%',
        data: [100, 150, 200, 75, 130]
      }
      , {
        type: 'bar',
        name: 'NSA',
        stack: 'Tasks',
        color: "#4BB2F4",
        pointWidth: 12,
        // borderRadius: 6,
        data: [145, 59, 200, 150, 100]
      }, {
        type: 'bar',
        name: 'Performance Degrading',
        stack: 'Tasks',
        color: "#F8C93A",
        pointWidth: 12,
        // borderRadius: 6,
        // borderRadiusBottomLeft: '50%',
        // borderRadiusBottomRight: '50%',
        data: [175, 200, 250, 125, 80]
      }
    ]
  });

  public alarmsOutageMinutesChart: DataObject = new Chart(
    {
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column',
        zoomType: "xy",
        backgroundColor: "transparent",
        spacingTop: 20,
        spacingBottom: 20,
        spacingRight: 20,
        spacingLeft: 20,
        height: 400,

      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['AP', 'Assam', 'Bihar', 'CG', 'Delhi', 'Guj', 'HP', 'JK', 'MP']
      },
      yAxis: [{ // Primary yAxis
        min: 100,
        max: 500,
        tickInterval: 100,
        title: {
          text:'Outage Minutes'
        },
        labels: {
          // format: '{value}',
          formatter: function (param) {
            // // console.log(param,"param");
            // console.log(this.value,"this.value");
            var secondYaxis = {100:'30',200:'60', 300:'90', 400:'120', 500:'>120'}
            var value = secondYaxis[this.value];
            return value;
          },
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        }
        
      }, { // Secondary yAxis
        min: 100,
        max: 500,
        tickInterval: 100,
        // categories: ['>24 Hrs', '12-24 Hrs', '8-12 Hrs', '4-8 Hrs', '0-4 Hrs'],
        title: {
          text:'No. of Alarms'
        },
        labels: {
          format: '{value}',
          style: {
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '12px'
          },
        },
        opposite: true
        
      }],
      legend: {
        floating: false,
        itemStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "14px"
        },
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 0,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          // borderRadius: 6,
          pointWidth: 12,
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        type: 'column',
        name: 'SA',
        color: "#FC5F5F",
        data: [150, 130, 140, 170, 135, 130, 140, 170, 130]
      }, {
        type: 'column',
        name: 'NSA',
        color: "#4BB2F4",
        data: [120, 160, 190, 120, 125, 160, 150, 120, 140]
      }, {
        type: 'column',
        name: 'Performance Degrading',
        color: "#F8C93A",
        data: [130, 140, 140, 170, 150, 140, 180, 170, 150]
      }, {
        type: 'spline',
        name: 'Outage Minute',
        color: "#1278D7",
        data: [400, 430, 470, 450, 410, 430, 470, 460, 425]
      }]

    });

  public sitesWithChart: DataObject = new Chart({
    chart: {
      type: 'column',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 20,
      spacingBottom: 20,
      spacingRight: 20,
      spacingLeft: 20,
      height: 400

    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: [
        'Site_18',
        'Site_17',
        'Site_16',
        'Site_15',
        'Site_14',
        'Site_13',
        'Site_12',
        'Site_11',
        'Site_10',
        'Site_9',
        'Site_8',
        'Site_7',
        'Site_6',
        'Site_5',
        'Site_4',
        'Site_3',
        'Site_2',
        'Site_1'
      ],
      title: {
        text: 'Single Circle view'
      },
      crosshair: true
    },
    yAxis: {
      min: 0,
      max: 120,
      tickInterval: 20,
      title: {
        text: null
      }
    },
    tooltip: {
      shared: true,
      // valueSuffix: ' PB'
    },
    legend: {
      floating: false,
      itemStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "14px"
      },
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 0,
      align: 'center',
      verticalAlign: 'bottom',
      shadow: false
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        pointWidth: 12,
        dataLabels: {
          enabled: false
        }
      },
      series: {
        marker: {
          enabled: true,
          symbol: "circle",
          lineWidth: 1,
          radius: 5,
          lineColor: "#ed1c24",
          fillColor: "#FFFFFF",
          states: {
            hover: {
              enabled: true
            }
          }
        },

      }

    },
    series: [{
      type: 'column',
      name: 'Sites with > 24 Hr Outage (Till 8 AM)',
      color: "#FC5F5F",
      data: [50, 20, 30, 18, 70, 22, 15, 80, 20,35,50, 20, 30, 18, 70, 22, 15, 80]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
          maxHeight: 200
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          },
          credits: {
            enabled: false
          }
        }
      }]
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    }

  });

  public circleWiseAlarmsChart: DataObject = new Chart(
    {
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      chart: {
        type: 'bar',
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: "transparent",
        spacingTop: 20,
        spacingBottom: 20,
        spacingRight: 20,
        spacingLeft: 20,
        height: 400
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['circle_9', 'circle_8', 'circle_7', 'circle_6', 'circle_5', 'circle_4', 'circle_3', 'circle_2', 'circle_1']
      },
      yAxis: {
        min: 0,
        max: 250,
        tickInterval: 50,
        title: {
          text: null
        }
      },
      legend: {
        floating: false,
        itemStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "14px"
        },
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 0,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      plotOptions: {
        column: {
          borderRadius: 6,
          pointWidth: 12,
          dataLabels: {
            enabled: false
          }
        },
        series: {
          stacking: 'normal',
        }
      },
      series: [
        {
          type: 'bar',
          name: '0-4 Hrs',
          color: "#4471c3",
          pointWidth: 12,
          data: [50, 30, 140, 70, 20,50, 30, 140, 70]
        }, {
          type: 'bar',
          name: '4-8 Hrs',
          color: "#ed7c30",
          pointWidth: 12,
          data: [20, 60, 30, 20, 35,20, 60, 30, 20]
        }, {
          type: 'bar',
          name: '8-12 Hrs',
          color: "#a4a4a5",
          pointWidth: 12,
          data: [30, 40, 25, 70, 50,30, 40, 25, 70]
        }, {
          type: 'bar',
          name: '12-24 Hrs',
          color: "#ffbf00",
          pointWidth: 12,
          data: [70, 50, 10, 10, 57,70, 50, 10, 10]
        }, {
          type: 'bar',
          name: '>24 Hrs',
          color: "#5a9ad5",
          pointWidth: 12,
          data: [47, 15, 20, 30, 57,47, 15, 20, 30]
        }
      ]
    });

}
