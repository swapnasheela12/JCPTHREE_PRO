import { Component, OnInit, Optional } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from "angular-highcharts";
import { first } from 'rxjs/operators';
import { Options } from 'highcharts';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.innerWidth = window.innerWidth;
  //   this.chartOptions.chart.width = this.innerWidth - 50;
  //   this.chart = new Chart(this.chartOptions);
  // }

  constructor() { }

 
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
  hsiList=["HSI", "VoLTE"]
  lteList=["LTE", "Wi-FI"]
  panIndiaList=["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]
  
  hsiItemSelecteddaily = "HSI";
  lteItemSelecteddaily = "LTE";
  panIndiaItemSelecteddaily = "PAN India";
  hsiListdaily=["HSI", "VoLTE"]
  lteListdaily=["LTE", "Wi-FI"]
  panIndiaListdaily=["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]
  
  panIndiaItemSelectedsites = "PAN India";
  panIndiaListsites=["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]
  panIndiaItemSelectedusage = "PAN India";
  panIndiaListusage=["PAN India", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu", "Jharkhand", "Karnataka", "Kashmir", "Kerala", "Kolkata", " Madhya Pradesh", "Maharashtra", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh (East)", "Uttar Pradesh (West)", "Uttarakhand", " West Bengal"]

  // chart1: Chart;
  dailyTraffic = new Chart({
    chart: {
      type: 'column',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 30,
      marginLeft: 35,
      // height: (4/ 16 * 100) + '%'
      // width:"50%",
      height: '30%'
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [
        "3/11",
        "3/12",
        "3/13",
        "3/14",
        "3/15",
        "3/16",
        "3/17",
        "3/18",
        "3/19",
        "3/20",
        "3/21",
        "3/22",
        "3/23",
        "3/24",
        "3/25",
        "3/26",
        "3/27",
      ],
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
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
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


  totalSubscribers = new Chart({
    chart: {
      type: 'areaspline',
      zoomType: "xy",
      backgroundColor: "transparent",
      spacingTop: 30,
      marginLeft: 35,
      // height: (4/ 16 * 100) + '%'
      // width:"50%",
      height: '30%'
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    
    xAxis: {
      categories: [
        "3/11",
        "3/12",
        "3/13",
        "3/14",
        "3/15",
        "3/16",
        "3/17",
        "3/18",
        "3/19",
        "3/20",
        "3/21",
        "3/22",
        "3/23",
        "3/24",
        "3/25",
        "3/26",
        "3/27",
      ],
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
      valueSuffix: ' units'
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



  ngOnInit() {
    // this.innerWidth = window.innerWidth;

    // setTimeout(() => {

    //   this.chart1.ref.chartWidth = 800;
    // }, 300);
    // $(window).resize(this.doResize);
    this.doResize();
  }
  doResize() {
    console.log(this.dailyTraffic, "this.chart1");
    // this.chart1.reflow();
    // this.chart1.update({
    //   chart: {
    //     width: newWidth
    //   }
    // });
    // var chart = $('#container').highcharts();
    // console.log(chart, "chart");

    // var w = $('#container').closest(".wrapper").width()
    // // setsize will trigger the graph redraw 

    // console.log('redraw');
    // chart.setSize(
    //   w, w * (3 / 4), false
    // );

    // chart.title.update({
    //   style: {
    //     fontSize: Math.round(chart.containerWidth / 30) + "px"
    //   }
    // });
  };






}
