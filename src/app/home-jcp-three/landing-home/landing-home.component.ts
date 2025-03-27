import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import * as _ from 'lodash';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

declare let $: any;

type siteList = {
  iconsite: string,
  namesite: string,
  countsite: string
}


type siteListObject = {
  [key: string]: siteList;
}


interface DataObject {
  [key: string]: any;
}

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})


export class LandingHomeComponent  {
  public chartDivWidth: number;
  public chartDivHeight: number;
  public chartDivWidthTraffic: number;
  public chartDivHeightTraffic: number;
  public testValueHeight: number;
  public testValueWidth: number;

  constructor(private datashare: DataSharingService) {
    this.datashare.currentMessage.subscribe((message) => {

      let divWidth: number;
      let divHeight: number;
      let divWidthTraffic: number;
      let divHeightTraffic: number;

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
      } else {
        this.chartDivWidth = divWidth - 186.656;
        this.chartDivHeight = divHeight;
        this.chartDivWidthTraffic = divWidthTraffic - 186.656;
        this.chartDivHeightTraffic = divHeightTraffic;
        this.resizeChart();
      }
    });
  }


  public sitesListArr: siteList[] = [
    {
      iconsite: "ic ic-Macro-Sites",
      namesite: "Macro Sites",
      countsite: "289137"
    },
    {
      iconsite: "ic ic-indoor-small-cell",
      namesite: "Indoor Small Cells",
      countsite: "293456"
    },
    {
      iconsite: "ic ic-ESC",
      namesite: "ESC",
      countsite: "2345"
    },
    {
      iconsite: "ic ic-outdoor-small-cell",
      namesite: "Outdoor Small Cells",
      countsite: "2345"
    },
    {
      iconsite: "ic ic-FTTX",
      namesite: "FTTX ONTs",
      countsite: "122345"
    },
    {
      iconsite: "ic ic-Wifi",
      namesite: "Wi-Fi Access Points",
      countsite: "271420"
    },
  ];


  public hsiItemSelected: string = "HSI";
  public lteItemSelected: string = "LTE";
  public panIndiaItemSelected: string = "PAN India";
  public hsiList: string[] = ["HSI", "VoLTE"]
  public lteList: string[] = ["LTE", "Wi-FI"]
  public panIndiaList: string[] = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  public hsiItemSelecteddaily: string = "HSI";
  public lteItemSelecteddaily: string = "LTE";
  public panIndiaItemSelecteddaily: string = "PAN India";
  public hsiListdaily: string[] = ["HSI", "VoLTE"]
  public lteListdaily: string[] = ["LTE", "Wi-FI"]
  public panIndiaListdaily = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  public panIndiaItemSelectedsites: string = "PAN India";
  public panIndiaListsites: string[] = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]
  public panIndiaItemSelectedusage: string = "PAN India";
  public panIndiaListusage: string[] = ["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  
  public dailyTrafficChart:DataObject = new Chart({
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
      categories: ["23-Mar", "24-Mar", "25-Mar", "26-Mar", "27-Mar", "28-Mar", "29-Mar", "30-Mar", "31-Mar", "01-Apr", "02-Apr", "03-Apr", "04-Apr", "05-Apr"],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '11px'
        }
      },
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
      min: 100,
      max: 140,
      tickInterval: 10,
      allowDecimals: true,
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
      title: {
        text: "Traffic in Petabytes",
        align: 'high',
        style: {
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '10px'
        },
        rotation: 0,
        y: -20,
        x: 60
      },

    },
    legend: {
      enabled: false,
    },
    tooltip: {
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
        name: "(Traffic in Petabytes)",
        type: "column",
        color: "#FC5F5F",
        data: [120.48, 121.11, 121.10, 120.58, 120.34, 120.23, 122.34, 120.39, 121.27, 123.71, 130.51, 117.19, 121.93, 119.84]
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


  public chartTotalSubscriber:DataObject = new Chart({
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
      categories: ["23-Mar", "24-Mar", "25-Mar", "26-Mar", "27-Mar", "28-Mar", "29-Mar", "30-Mar", "31-Mar", "01-Apr", "02-Apr", "03-Apr", "04-Apr", "05-Apr"],
      labels: {
        style: {
          color: '#000000',
          fontFamily: 'Lato Regular',
          fontWeight: 'normal',
          fontSize: '11px'
        }
      },

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
      min: 250,
      max: 290,
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
      allowDecimals: true,
      title: {
        text: "Users in Millions",
        align: 'high',
        style: {
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '10px'
        },
        rotation: 0,
        y: -20,
        x: 50
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
        data: [270.1, 270.1, 270.1, 270.2, 270.5, 271.1, 271.1, 270.9, 270.8, 270.9, 270.9, 270.8, 270.9, 271.1]
      }
    ],
  });


  resizeChart() {
    let chartTotalSubscriberRef = this.chartTotalSubscriber.ref$.source;
    chartTotalSubscriberRef.subscribe((response) => {
      response.chartWidth = this.chartDivWidth;
      response.chartHeight = this.chartDivHeight;
      this.chartTotalSubscriber.ref.setSize(response.chartWidth, response.chartHeight);
    });

    let dailyTrafficrRef = this.dailyTrafficChart.ref$.source;
    dailyTrafficrRef.subscribe((response) => {
      response.chartWidth = this.chartDivWidthTraffic;
      response.chartHeight = this.chartDivHeightTraffic;
      this.dailyTrafficChart.ref.setSize(response.chartWidth, response.chartHeight);
    });
  }
}
