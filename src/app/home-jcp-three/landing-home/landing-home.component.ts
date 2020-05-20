import { Component, OnInit, Optional, SimpleChanges, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from "angular-highcharts";
import { first } from 'rxjs/operators';
import { Options } from 'highcharts';
import * as _ from 'lodash';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
declare var $: any;

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {
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
        divWidthTraffic = $("#dailyTrafficChartIdDiv").width();
        divHeightTraffic = $("#dailyTrafficChartIdDiv").height();
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
        // this.chartDivHeight;
      } else {
        this.chartDivWidth = divWidth - 186.656;
        this.chartDivHeight = divHeight;
        this.chartDivWidthTraffic = divWidthTraffic - 186.656;
        this.chartDivHeightTraffic = divHeightTraffic;
        this.resizeChart();
      }
      
    });

  }


  sitesListArr = [
    {
      iconsite: "ic ic-Macro-Sites",
      namesite: "Macro Sites",
      countsite: "289137"
    },
    {
      iconsite: "ic ic-small-Cells",
      namesite: "Small Cells",
      countsite: "293456"
    },
    {
      iconsite: "ic ic-ESC",
      namesite: "ESC",
      countsite: "2345"
    },
    {
      iconsite: "ic ic-COW",
      namesite: "COW",
      countsite: "2345"
    },
    {
      iconsite: "ic ic-FTTX",
      namesite: "FTTX",
      countsite: "122345"
    },
    {
      iconsite: "ic ic-Wifi",
      namesite: "WI-FI APS",
      countsite: "271420"
    },
  ];

  hsiItemSelected = "HSI";
  lteItemSelected = "LTE";
  panIndiaItemSelected = "PAN India";
  hsiList = ["HSI", "VoLTE"]
  lteList = ["LTE", "Wi-FI"]
  panIndiaList = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  hsiItemSelecteddaily = "HSI";
  lteItemSelecteddaily = "LTE";
  panIndiaItemSelecteddaily = "PAN India";
  hsiListdaily = ["HSI", "VoLTE"]
  lteListdaily = ["LTE", "Wi-FI"]
  panIndiaListdaily = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  panIndiaItemSelectedsites = "PAN India";
  panIndiaListsites = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]
  panIndiaItemSelectedusage = "PAN India";
  panIndiaListusage = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  // chart1: Chart;
  dailyTrafficChart = new Chart({
    chart: {
      type: 'column',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 30,
      marginLeft: 60,
      marginRight: 30,
      marginBottom: 60,
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ["23-Mar","24-Mar","25-Mar","26-Mar","27-Mar","28-Mar","29-Mar","30-Mar","31-Mar","01-Apr","02-Apr","03-Apr","04-Apr","05-Apr"],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '11px'
        }
      },
      allowDecimals: false,
      title: {
        text: null,
        style: {

          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '10px'
        },

      },
    },
    yAxis: {
      min: 300,
      max: 340,
      tickInterval: 10,
      labels: {
        reserveSpace: false,
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '10px'
        }
      },
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      allowDecimals: false,
      title: {
        text: "(Peta Bytes)",
        align: 'high',
        style: {
          // 'text-anchor': 'start',
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '10px'
        },
        rotation: 0,
        y: -20,
        x: 30
      },

    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // pointFormat: "{series.name}: {poin} PB"
      shared: true,
      valueSuffix: ' PB'
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
    series: [
      {
        name: "(Peta Bytes)",
        type: "column",
        color: "#FC5F5F",
        data: [328, 311, 308, 305, 315, 310, 316, 312, 335, 329, 323, 312, 333, 323]
      }
    ],
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

 
  chartTotalSubscriber = new Chart({
    chart: {
      type: 'areaspline',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 30,
      marginLeft: 60,
      marginRight: 30,
      marginBottom: 60,
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },

    xAxis: {
      categories: ["23-Mar","24-Mar","25-Mar","26-Mar","27-Mar","28-Mar","29-Mar","30-Mar","31-Mar","01-Apr","02-Apr","03-Apr","04-Apr","05-Apr"],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '11px'
        }
      },
      allowDecimals: false,
      title: {
        text: null,
        style: {

          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '10px'
        },

      },

    },
    yAxis: {
      min: 300,
      max: 340,
      tickInterval: 10,
      labels: {
        reserveSpace: false,
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '10px'
        }
      },
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      allowDecimals: false,
      title: {
        text: "(Users in Millions)",
        align: 'high',
        style: {
          // 'text-anchor': 'start',
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '10px'
        },
        rotation: 0,
        y: -20,
        x: 55
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: ' M'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [
      {
        name: "(Users in Millions)",
        type: "areaspline",
        color: "#0FD125",
        data: [328, 311, 308, 305, 315, 310, 316, 312, 335, 329, 323, 312, 333, 323]
      }
    ],
  });



  public testValueHeight;
  public testValueWidth;

  ngOnInit() {}


  resizeChart() {
   
   
    var chartTotalSubscriberRef = this.chartTotalSubscriber.ref$.source;
    chartTotalSubscriberRef.subscribe((response) => {
     
      response.chartWidth = this.chartDivWidth;
      response.chartHeight = this.chartDivHeight;
      this.chartTotalSubscriber.ref.setSize(response.chartWidth, response.chartHeight);
    });

    var dailyTrafficrRef = this.dailyTrafficChart.ref$.source;
    dailyTrafficrRef.subscribe((response) => {
     
      response.chartWidth = this.chartDivWidthTraffic;
      response.chartHeight = this.chartDivHeightTraffic;
      this.dailyTrafficChart.ref.setSize(response.chartWidth, response.chartHeight);
    });

  }

  





}
