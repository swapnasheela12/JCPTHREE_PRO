import { KpiDetailsChartComponent } from './kpi-details-chart/kpi-details-chart.component';
import { KpiSettingsComponent } from './kpi-settings/kpi-settings.component';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Chart } from "angular-highcharts";

@Component({
  selector: 'app-kpi-details',
  templateUrl: './kpi-details.component.html',
  styleUrls: ['./kpi-details.component.scss']
})
export class KpiDetailsComponent implements OnInit {
  public selectedLayerSearchValue;
  public layerListValue;
  public selectedLayerTableName;
  public selectedLayers = {};
  public selectedLayerCtrl: FormControl = new FormControl();
  @ViewChild('KpiViewTmpl') KpiViewTmpl;
  @ViewChild('KpiViewMacroTmpl') KpiViewMacroTmpl;
  @ViewChild('KpiViewTmplBack') KpiViewTmplBack;
  listOfKpiDetails: { title: string; color: string; value: string; }[];
  kpiDetailsChart: Chart;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<KpiDetailsComponent>,
    public dialog: MatDialog,
    private datashare: DataSharingService,
    private cd: ChangeDetectorRef
  ) {
    this.datashare.leftNavSelectedLayerMessage.subscribe((selectedLayersAll) => {
      this.selectedLayers = selectedLayersAll;
    });
  }

  private inited;
  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }


  kpiDetailsChartOther = new Chart(
    {
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column',
        backgroundColor: "transparent",
        height: 250,
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
          borderRadius: 8,
          pointWidth: 16,
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
        data: [0, 3.05, 3.07, 40, 48, 100]
      }]
    }

  );

  openedChange(sda) {
    this.selectedLayerSearchValue = '';
  }

  listOfKpiDetailsOther = [
    {
      title: "Atoll Planned RSRP ALL",
      color: "#4CAF50",
      value: "-60.54 dBm"
    },
    {
      title: "Atoll Planned RSRP 2300",
      color: "#03A9F4",
      value: "-66.39 dBm"
    },
    {
      title: "Atoll Planned RSRP 1800",
      color: "#4CAF50",
      value: "-63.01 dBm"
    },
    {
      title: "Atoll Planned RSRP 850",
      color: "#FF9800",
      value: "-61.38 dBm"
    },
    {
      title: "NetVelocity RSRP ALL",
      color: "#F44336",
      value: "-100.90 dBm"
    },
    {
      title: "NetVelocity RSRP 2300",
      color: "#FF9800",
      value: "-100.92 dBm"
    },
    {
      title: "NetVelocity RSRP 1800",
      color: "#F44336",
      value: "-100.63 dBm"
    },
    {
      title: "NetVelocity RSRP 850",
      color: "#3F51B5",
      value: "-100.38 dBm"
    },
  ]

  kpiSettingPopFun() {
    var kpiSettingListDialogRef = {
      // width: '550px',
      height: '600px',
      // position: { bottom: '60px', right: "60px" },
      panelClass: "table-view-layers-dialog-container",
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disableClose: true,
      hasBackdrop: true
    }
    const dialogRef = this.dialog.open(KpiSettingsComponent, kpiSettingListDialogRef);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });

  }

  showChart = false;
  kpiDetailsChartPopFun() {
    this.showChart = !this.showChart;
    console.log(this.showChart)
  }

  onChangeLayer(layer) {
    // if(layer.value) {

    if (this.kpiDetailsChart) {
      this.kpiDetailsChart.destroy();
    }
    this.selectedLayerTableName = layer.value;
    switch (this.selectedLayerTableName) {
      case "Sites-OnAir-Macro-Macro4G":
        this.listOfKpiDetails = [
          {
            title: "Macro Planned RSRP ALL",
            color: "#0f73bd",
            value: "-60.54 dBm"
          },
          {
            title: "Macro Planned RSRP 2300",
            color: "#0f73bd",
            value: "-66.39 dBm"
          },
          {
            title: "Macro Planned RSRP 1800",
            color: "#0f73bd",
            value: "-63.01 dBm"
          },
          {
            title: "Macro Planned RSRP 850",
            color: "#0f73bd",
            value: "-61.38 dBm"
          },
          {
            title: "NetVelocity Macro RSRP ALL",
            color: "#96ce58",
            value: "-100.90 dBm"
          },
          {
            title: "NetVelocity Macro RSRP 2300",
            color: "#96ce58",
            value: "-100.92 dBm"
          },
          {
            title: "NetVelocity Macro RSRP 1800",
            color: "#96ce58",
            value: "-100.63 dBm"
          },
          {
            title: "NetVelocity Macro RSRP 850",
            color: "#96ce58",
            value: "-100.38 dBm"
          },
        ];

        this.kpiDetailsChart = new Chart(
          {
            exporting: {
              enabled: false
            },
            chart: {
              type: 'column',
              backgroundColor: "transparent",
              height: 250,
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
                text: '% Macro Area covered wrt DL <br> Throughput range(CDF)',
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
                text: '% Area covered wrt DL Throughput range(PDF)',
                // x: -15,
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
                borderRadius: 8,
                pointWidth: 16,
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
              data: [0, 3.05, 3.07, 40, 48, 100]
            }]
          }
        );
        break;

      case "Sites-OnAir-Hpodsc-HPODSC4g":
        this.listOfKpiDetails = this.listOfKpiDetailsOther;
        this.kpiDetailsChart = this.kpiDetailsChartOther;
    }
    this.cd.detectChanges();
    // } 
    // else {
    //   this.selectedLayerTableName = 'Other';
    // }

    // if ( this.selectedLayerTableName == 'Sites-Outdoor-Macro') {
    //   this.listOfKpiDetails  = [
    //     {
    //       title: "Macro Planned RSRP ALL",
    //       color: "#0f73bd",
    //       value: "-60.54 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 2300",
    //       color: "#0f73bd",
    //       value: "-66.39 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 1800",
    //       color: "#0f73bd",
    //       value: "-63.01 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 850",
    //       color: "#0f73bd",
    //       value: "-61.38 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP ALL",
    //       color: "#96ce58",
    //       value: "-100.90 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 2300",
    //       color: "#96ce58",
    //       value: "-100.92 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 1800",
    //       color: "#96ce58",
    //       value: "-100.63 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 850",
    //       color: "#96ce58",
    //       value: "-100.38 dBm"
    //     },
    //   ];
    //   this.kpiDetailsChart.destroy();
    //   this.kpiDetailsChart = new Chart(
    //     {
    //       exporting: {
    //         enabled: false
    //       },
    //       chart: {
    //         type: 'column',
    //         backgroundColor: "transparent",
    //         height: 178,
    //         spacingTop: 20
    //       },
    //       title: {
    //         text: null,
    //       },
    //       yAxis: [{
    //         min: 0,
    //         max: 100,
    //         tickInterval: 50,
    //         title: {
    //           text: '% Macro Area covered wrt DL <br> Throughput range(CDF)',
    //           rotation: 270,
    //           x: 5,
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         labels: {
    //           format: '{value}%',
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         opposite: true
    //       }, {
    //         min: 0,
    //         max: 100,
    //         tickInterval: 50,
    //         title: {
    //           text: '% Area covered wrt DL <br> Throughput range(PDF)',
    //           x: -15,
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         labels: {
    //           format: '{value}%',
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         }
    //       }],
    //       xAxis: {
    //         categories: ['0 <= <br>THP<br>< 2', '2 <= <br>THP<br>< 6',
    //           '6 <= <br>THP<br>< 10', '10 <= <br>THP<br>< 20',
    //           '20 <= <br>THP<br>< 26', '26 <= <br>THP<br>< 100'
    //         ],
    //         labels: {
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '10px'
    //           },
    //           rotation: 0,
    //         }
    //       },
    //       legend: {
    //         enabled: false,
    //       },
    //       plotOptions: {
    //         series: {
    //           color: 'yellow',
    //           marker: {
    //             enabled: true
    //           },
    //           events: {
    //             legendItemClick: function (event) {
    //               if (!this.visible) return true;
    //               var seriesIndex = this.index;
    //               var series = this.chart.series;
    //               for (var i = 0; i < series.length; i++) {
    //                 if (series[i].index != seriesIndex) {
    //                   series[i].visible ? series[i].hide() : series[i].show();
    //                 }
    //               }
    //               return false;
    //             }
    //           },
    //           // pointPadding: 0,
    //           // pointWidth: 30
    //         },
    //         column: {
    //           dataLabels: {
    //             enabled: true,
    //             style: {
    //               color: '#000000',
    //               fontFamily: 'Roboto',
    //               fontWeight: 'normal',
    //               fontSize: '12px'
    //             },
    //           }
    //         }

    //       },
    //       credits: {
    //         enabled: false
    //       },
    //       series: [{
    //         name: 'Brands',
    //         type: 'column',
    //         yAxis: 1,
    //         data: [{
    //           name: '0 <= <br>THP<br>< 2',
    //           y: 0.01,
    //           color: '#fa151b'
    //         }, {
    //           name: '2 <= <br>THP<br>< 6',
    //           y: 3.05,
    //           color: '#FC9337'
    //         }, {
    //           name: '6 <= <br>THP<br>< 10',
    //           y: 3.70,
    //           color: '#96ce58'
    //         }, {
    //           name: '10 <= <br>THP<br>< 20',
    //           y: 34.08,
    //           color: '#3eaf1e'
    //         }, {
    //           name: '20 <= <br>THP<br>< 26',
    //           y: 5.03,
    //           color: '#3aa4f2'
    //         }, {
    //           name: '26 <= <br>THP<br>< 100',
    //           y: 54.13,
    //           color: '#0f73bd'
    //         }]


    //       }, {
    //         name: 'Temperature',
    //         type: 'spline',
    //         data: [0, 3.05, 3.07, 40, 48, 100]
    //       }]
    //   }

    //   );
    // } else {
    //   this.listOfKpiDetails = this.listOfKpiDetailsOther;
    //   this.kpiDetailsChart = this.kpiDetailsChartOther;
    // }
  }

}
