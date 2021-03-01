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

  constructor() { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 4, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 3, rows: 1, color: '#DDBDF1' },
  ];




  public chart1: DataObject = new Chart({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      // spacingTop: 30,
      height: 250
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    legend: {
      labelFormatter: function () {
        return '<div style="min-width:165px;" class="row m-0 justify-content-start align-items-center"><div class="legend-title col p-0">' + this.name + '</div>'
          + '<div class="legend-value">' + (this as any).y + '%</div></div>';
      },
      itemStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "14px"
      },
      useHTML: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemMarginTop: 9,
      itemMarginBottom: 9,
      symbolHeight: 18,
      symbolWidth: 18,
      symbolRadius: 0,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white"
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
            name: "Jio Security",
            color: "#f7931e",
            y: 30
          },
          {
            name: "Jio Manhole Safety",
            color: "#29abe2",
            y: 31
          },
          {
            name: "Jio Smart Meter",
            color: "#39b54a",
            y: 20
          },
          {
            name: "Jio Smart Parking",
            color: "#ed1e79",
            y: 12
          },
          {
            name: "Jio Integrated Energy",
            color: "#7f89e6",
            y: 7
          }
        ]
      }
    ]
  });

  // chart1: Chart;
  public kpiDetailsChart: DataObject = new Chart(
    {
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column',
        zoomType: "xy",
        backgroundColor: "transparent",
        spacingTop: 30,
        marginLeft: 60,
        marginRight: 130,
        marginBottom: 180,
        // backgroundColor: "transparent",
        // height: 250,
        // spacingTop: 20
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total fruit consumption'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            // color: ( // theme
            //   Highcharts.defaultOptions.title.style &&
            //   Highcharts.defaultOptions.title.style.color
            // ) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        // backgroundColor:
        //   Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: 'column',
        name: 'John',
        data: [5, 3, 4, 7, 2]
      }, {
        type: 'column',
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      }, {
        type: 'column',
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }, {
        type: 'spline',
        name: 'Temperature',
        data: [10, 9, 11, 11, 8]
      }]

    });

  // chart1: Chart;
  public activeAlarmAging: DataObject = new Chart({
    exporting: {
      enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "transparent",
      // spacingTop: 30,
      height: 250
    },
    title: {
      text: 'Stacked bar chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      }
    },
    legend: {
      reversed: true
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
        stacking: 'normal'
      }
    },
    series: [{
      type: 'bar',
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      type: 'bar',
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      type: 'bar',
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  });

  public dailyTrafficChart: DataObject = new Chart({
    chart: {
      type: 'column',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 30,
      marginLeft: 60,
      marginRight: 130,
      marginBottom: 180,
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      type: 'column',
      name: 'Tokyo',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

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
    }


  });


}
