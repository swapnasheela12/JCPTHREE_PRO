import { AlarmSummaryChartExpandComponent } from './../alarm-summary-chart-expand/alarm-summary-chart-expand.component';
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
  selector: 'app-alarm-summary-chart',
  templateUrl: './alarm-summary-chart.component.html',
  styleUrls: ['./alarm-summary-chart.component.scss']
})
export class AlarmSummaryChartComponent implements OnInit {
  public parentDataGet;
  @Input('data')
  set data(data: any) {
    console.log(data, "child");
    this.parentDataGet = data;
    //do whatever you want with your data here, this data will be passed from parent component
  }
  public parentDataGetAll;
  @Input('dataTransferToChildAllTable')
  set dataTransferToChildAllTable(dataTransferToChildAllTable: any) {
    console.log(dataTransferToChildAllTable, "dataTransferToChildAllTable");
    this.parentDataGetAll = dataTransferToChildAllTable;
    this.tableViewWidget(this.parentDataGetAll)
    //do whatever you want with your data here, this data will be passed from parent component
  }
  constructor(public matDialog: MatDialog, private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    // this.table1Title.setValue('Active Alarm Classification Pie-chart');
    // this.table2Title.setValue('Active Alarm Ageing');
  }

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 4, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 3, rows: 1, color: '#DDBDF1' },
    { text: 'Five', cols: 3, rows: 1, color: '#DDBDF1' },
  ];
  public eachGraphSelected = "";
  expandViewWidget(graphType) {
    console.log(graphType, "graphType");

    // graphType.forEach(res => {
    //   // this.eachGraphSelected += res.name + ", ";
    //   this.eachGraphSelected = res.name;
    //   console.log(this.eachGraphSelected,"this.eachGraphSelected");
    //   return this.eachGraphSelected;
    // })
    this.openFlagConf(graphType)
  }
  public dataTransferTableToChild;
  public tableViewShow: boolean = false;
  public tableViewShow2: boolean = false;
  public tableViewShow3: boolean = false;
  public tableViewShow4: boolean = false;
  public tableViewShow5: boolean = false;
  public tableViewShowAll: boolean = false;
  public table1Title ='Active Alarm Classification Pie-chart';
  // public table1Title : FormControl = new FormControl();
  public table2Title ='Active Alarm Ageing';
  public table3Title ='Circles wise SA Active Alarms with Ageing distribution';
  public table4Title ='Alarms vs Outage Minutes';
  public table5Title ='Sites with > 24Hr Outage';
  // public table2Title : FormControl = new FormControl();
  // stateForm: FormGroup = this._formBuilder.group({
  //   table1Title: 'Active Alarm Classification Pie-chart',
  //   table2Title: 'Active Alarm Ageing',
  // });

  tableViewWidget(tableView) {
    console.log(tableView, "tableView");

    if (tableView == 'Active Alarm Classification Pie-chart') {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild :)");
        this.tableViewShow = !this.tableViewShow;
        this.tableViewShow2 = false;
        this.tableViewShow3 = false;
        this.tableViewShow4 = false;
        this.tableViewShow5 = false;
      }, 500);
     
    }else if (tableView == 'Active Alarm Ageing') {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild 2 :)");
        this.tableViewShow2 = !this.tableViewShow2;
        this.tableViewShow = false;
        this.tableViewShow3 = false;
        this.tableViewShow4 = false;
        this.tableViewShow5 = false;
      }, 500);
    }else if (tableView == 'Circles wise SA Active Alarms with Ageing distribution') {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild 2 :)");
        this.tableViewShow3 = !this.tableViewShow3;
        this.tableViewShow2 = false;
        this.tableViewShow = false;
        this.tableViewShow4 = false;
        this.tableViewShow5 = false;
      }, 500);
    }else if (tableView == 'Alarms vs Outage Minutes') {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild 2 :)");
        this.tableViewShow4 = !this.tableViewShow4;
        this.tableViewShow2 = false;
        this.tableViewShow3 = false;
        this.tableViewShow = false;
        this.tableViewShow5 = false;
      }, 500);
    }else if (tableView == 'Sites with > 24Hr Outage') {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild 2 :)");
        this.tableViewShow5 = !this.tableViewShow5;
        this.tableViewShow2 = false;
        this.tableViewShow3 = false;
        this.tableViewShow4 = false;
        this.tableViewShow = false;
      }, 500);
    }else {
      setTimeout(() => {
        this.dataTransferTableToChild = tableView;
        console.log(this.dataTransferTableToChild, "this.dataTransferTableToChild 2 :)");
        this.tableViewShowAll = !this.tableViewShowAll;
        this.tableViewShow5 = true;
        this.tableViewShow2 = true;
        this.tableViewShow3 = true;
        this.tableViewShow4 = true;
        this.tableViewShow = true;
      }, 500);
    }

  }
 
  openFlagConf(selectedGraph) {
    const dialogRef = this.matDialog.open(AlarmSummaryChartExpandComponent, {
      width: "700px",
      height: '500px',
      data: selectedGraph,
      panelClass: "material-dialog-container"
    });
  }

  public panindiachart: DataObject = new Chart({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      // spacingTop: 30,
      width: 300,
      height: 350
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

  // chart1: Chart;
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
      spacingRight: 20,
      spacingLeft: 20,
      width:675,
      height: 350
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
        spacingRight: 20,
        spacingLeft: 20,
        height: 350,
        width: 500
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['RAJ', 'HP', 'KER', 'MP', 'MAH', 'AP', 'TN', 'KAR', 'MUM']
      },
      yAxis: {
        min: 0,
        max: 250,
        tickInterval: 50,
        title: {
          text: 'No. of Alarms'
        },
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
          data: [50, 30, 140, 70, 20, 50, 30, 140, 70]
        }, {
          type: 'bar',
          name: '4-8 Hrs',
          color: "#ed7c30",
          pointWidth: 12,
          data: [20, 60, 30, 20, 35, 20, 60, 30, 20]
        }, {
          type: 'bar',
          name: '8-12 Hrs',
          color: "#a4a4a5",
          pointWidth: 12,
          data: [30, 40, 25, 70, 50, 30, 40, 25, 70]
        }, {
          type: 'bar',
          name: '12-24 Hrs',
          color: "#ffbf00",
          pointWidth: 12,
          data: [70, 50, 10, 10, 57, 70, 50, 10, 10]
        }, {
          type: 'bar',
          name: '>24 Hrs',
          color: "#5a9ad5",
          pointWidth: 12,
          data: [47, 15, 20, 30, 57, 47, 15, 20, 30]
        }
      ]

    });

  // secondYaxis = ['>24 Hrs', '12-24 Hrs', '8-12 Hrs', '4-8 Hrs', '0-4 Hrs']
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
      spacingRight: 20,
      spacingLeft: 20,
      width: 500,
      height: 300
      // spacingTop: 30,
      // marginLeft: 60,
      // marginRight: 130,
      // marginBottom: 180,
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












}
