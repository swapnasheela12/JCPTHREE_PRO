import { FmDataSharingService } from './../../../../../../../_services/fm-data-sharing.service';
// import { FmDataSharingService } from './../../../../../../_services/fm-data-sharing.service';
// import { AlarmSummaryChartExpandComponent } from './../alarm-summary-chart-expand/alarm-summary-chart-expand.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { forEach } from 'lodash';
// import { AlarmSummaryChartExpandComponent } from './alarm-summary-chart-expand/alarm-summary-chart-expand.component';
import { MatDialog } from '@angular/material/dialog';
// import { GraphType } from './../../../../../core/components/common-elements/type-dropdown-modulelist';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface DataObject {
  [key: string]: any;
}

@Component({
  selector: 'app-history-alarm-chart',
  templateUrl: './history-alarm-chart.component.html',
  styleUrls: ['./history-alarm-chart.component.scss']
})
export class HistoryAlarmChartComponent implements OnInit {

  public parentDataGet;
  @Input('data')
  set data(data: any) {
    this.parentDataGet = data;
  }
  @Input('dataChart')
  set dataChart(dataChart: any) {
    this.parentDataGet = dataChart;
  }

  constructor(public dataShareFM: FmDataSharingService, public matDialog: MatDialog, private _formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  public panindiachart: DataObject = new Chart({
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
      spacingRight: 20,
      spacingLeft: 20,
      spacingTop: 20,
      spacingBottom: 20,
      height: 350,
      width: 500
    },
    title: {
      text: null
    },
    xAxis: {
      title: {
        text: 'Multiple Dates view'
      },
      categories: ['25-11-2020', '26-11-2020', '27-11-2020', '28-11-2020', '29-11-2020', '30-11-2020', '01-12-2020', '02-12-2020', '03-12-2020','04-12-2020','05-12-2020','06-12-2020','07-12-2020']
    },
    yAxis: { // Primary yAxis
      min: 0,
      max: 35000,
      title: {
        text: 'Alarm Statistics'
      },
      tickInterval: 5000,
      labels: {
        // format: '{value}',
        // formatter: function (param) {
        //   // // console.log(param,"param");
        //   // console.log(this.value,"this.value");
        //   var secondYaxis = { 100: '30', 200: '60', 300: '90', 400: '120', 500: '>120' }
        //   var value = secondYaxis[this.value];
        //   return value;
        // },
        style: {
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '12px'
        },
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
      data: [2250, 3330, 4140, 1170, 3135, 2130, 3140, 1170, 2130, 1170, 3135, 2130, 3140]
    }, {
      type: 'column',
      name: 'NSA',
      color: "#4BB2F4",
      data: [8120, 7160, 9190, 6120, 5125, 8160, 6150, 7120, 6140, 8160, 6150, 7120, 6140]
    }, {
      type: 'column',
      name: 'Performance Degrading',
      color: "#F8C93A",
      data: [ 8160, 6150, 7120, 6140, 8160,8120, 7160, 9190, 6120, 5125, 6150, 7120, 6140]
    }
    // , {
    //   type: 'spline',
    //   name: 'Outage Minute',
    //   color: "#1278D7",
    //   data: [400, 430, 470, 450, 410, 430, 470, 460, 425]
    // }
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
      // type: 'bar',
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      spacingRight: 20,
      spacingLeft: 20,
      spacingTop: 20,
      spacingBottom: 20,
      height: 350,
      width: 500
    },
    title: {
      text: null
    },
    xAxis: {
      title: {
        text: 'One Circle – JC wise view'
      },
      categories: ['JC_1', 'JC_2', 'JC_3', 'JC_4', 'JC_5','JC_6','JC_7','JC_8']
    },
    yAxis: {
      min: 97,
      max: 100.5,
      tickInterval: 0.5,
      title: {
        text: "JC NWA Trend"
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
        type: 'column',
        name: 'SA',
        stack: 'Tasks',
        color: "#F8C93A",
        pointWidth: 12,
        // borderRadius: 6,
        // borderRadiusTopLeft: '50%',
        // borderRadiusTopRight: '50%',
        data: [98.5, 99, 100, 98, 99.5,97.5,100,98.5]
      }
    ]
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
        // type: 'bar',
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: "transparent",
        spacingRight: 20,
        spacingLeft: 20,
        spacingTop: 20,
        spacingBottom: 20,
        height: 350,
        width: 500
      },
      title: {
        text: null
      },
      xAxis: {
        title: {
          text: 'Alarm Name'
        },
        categories: ['UMP CPU Temperature', 'RRH LNA FAIL', 'RRH CLOCK FAIL', 'RRH LNA FAIL', 'ALD Communication FAIL','UMP DISK FULL','ECP POWER FAIL']
      },
      yAxis: {
        min: 88,
        max: 100,
        tickInterval: 2,
        title: {
          text: "No. of Occurrences"
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
          type: 'column',
          name: 'Alarm Name',
          stack: 'Tasks',
          color: "#4BB2F4",
          pointWidth: 12,
          // borderRadius: 6,
          data: [98, 99, 94, 98, 99,97,95]
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
        // type: 'bar',
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: "transparent",
        spacingRight: 20,
        spacingLeft: 20,
        spacingTop: 20,
        spacingBottom: 20,
        height: 350,
        width: 500
      },
      title: {
        text: null
      },
      xAxis: {
        title: {
          text: 'Alarm Name'
        },
        categories: ['UMP CPU Temperature', 'RRH LNA FAIL', 'RRH CLOCK FAIL', 'RRH LNA FAIL', 'ALD Communication FAIL','UMP DISK FULL','ECP POWER FAIL']
      },
      yAxis: {
        min: 88,
        max: 100,
        tickInterval: 2,
        title: {
          text: "Outage Minutes"
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
          type: 'column',
          name: 'Alarm Name',
          stack: 'Tasks',
          color: "#22CE29",
          pointWidth: 12,
          // borderRadius: 6,
          data: [98, 99, 94, 98, 99,97,95]
        }
      ]

  });

  public clearanceRatioChart: DataObject = new Chart({
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
      spacingRight: 20,
      spacingLeft: 20,
      width: 500,
      height: 300
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['>24 Hrs', '12-24 Hrs', '8-12 Hrs', '4-8 Hrs', '0-4 Hrs']
    },
    yAxis: {
      min: 0,
      max: 700,
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

  public sitesWithChart: DataObject = new Chart({
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
      spacingRight: 20,
      spacingLeft: 20,
      spacingTop: 20,
      spacingBottom: 20,
      height: 350,
      width: 500
    },
    title: {
      text: null
    },
    xAxis: {
      title: {
        text: 'Circle wise'
      },
      categories: ['AP', 'Assam', 'Bihar', 'CG', 'Delhi', 'Guj', 'HP', 'JK', 'MP']
    },
    yAxis: {
      min: 0.00,
      max: 0.10,
      tickInterval: 0.01,
      title: {
        text: 'Alarms/Cell'
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
      color: "#a4a4a5",
      data: [0.01, 0.03, 0.02, 0.01, 0.02, 0.01, 0.02, 0.03, 0.03]
    }, {
      type: 'column',
      name: 'NSA',
      color: "#ed7c30",
      data: [0.01, 0.03, 0.02, 0.01, 0.03, 0.03, 0.02, 0.02, 0.02]
    }, {
      type: 'column',
      name: 'Performance Degrading',
      color: "#4471c3",
      data: [0.01, 0.03, 0.02, 0.01, 0.04, 0.01, 0.02, 0.03, 0.04]
    }]


  });

}
