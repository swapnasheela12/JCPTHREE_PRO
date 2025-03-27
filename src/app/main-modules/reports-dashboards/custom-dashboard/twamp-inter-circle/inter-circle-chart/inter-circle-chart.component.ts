import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from "angular-highcharts";

@Component({
  selector: 'app-inter-circle-chart',
  templateUrl: './inter-circle-chart.component.html',
  styleUrls: ['./inter-circle-chart.component.scss']
})
export class InterCircleChartComponent implements OnInit {
  thirdChart;
  constructor(public dialogRef: MatDialogRef<InterCircleChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
   
    console.log("data", data);
    }

  ngOnInit(): void {
    this.multiLineChart();
  }

  multiLineChart() {

    this.thirdChart = new Chart({
       chart: {
              type: 'line',
              height: 300,
              marginTop: 50,

              backgroundColor: 'transparent'
          },
          title: {
              text: '',
              align: 'center',
              verticalAlign: 'middle',
              style: {
                  fontSize: '',
                  color: '#000000',

              }
          },
          credits: {
              enabled: false
          },
          tooltip: {

              formatter: function() {
                  var seriesName = this.series.name;
                  var unit = '';
                  if (seriesName == 'Latency') {
                      unit = 'ms'
                  } else {
                      unit = ' % '
                  }
                  return '<span>\u25CF</span>' + ' ' + seriesName + ':' + this.point.y + unit + '<b></b> <span style="color:' + this.point.color + '">\u25CF</span> Time: <b>' + this.point.x + 'Minutes' + '</b>'
              }
          },
          exporting: {
              enabled: false
          },

      xAxis: [{
          title: {
              text: 'Minute',
          },
          lineWidth: 0,

      }],
      yAxis: [{
          title: {
              text: 'Latency (ms)',
          },
          lineWidth: 0,

      }],

      series: [{
        type: 'line',
          showInLegend: false,
          name: 'Latency',
          color: '#002db2',
          data: [40, 41, 42, 38, 44, 45, 46]
      }],
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
