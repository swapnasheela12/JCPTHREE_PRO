import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';

declare var $: any;

export interface NominalGenerationPerformance {
  level: string;
  prePercentArea: string;
  postPercentArea: string;
  preSquareKilo: string;
  postSquareKilo: string;
  operator: string;
  postPercentAreaStatus: string;
  postSquareKiloStatus: string;
}

export interface NominalGenerationPerformancePercentile {
  percentile: string;
  predbm: string;
  postdbm: string;
  postdmStatus: string;
}

@Component({
  selector: 'app-nominal-generation-performance-summary',
  templateUrl: './nominal-generation-performance-summary.component.html',
  styleUrls: ['./nominal-generation-performance-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalGenerationPerformanceSummaryComponent implements OnInit {
  nominalGenerationSummaryData = {
    "name": 'Maharashtra-NP-CV-121020_V1',
    "type": 'R4G',
    "state": 'Maharashtra'
  };
  summaryOf = 'RSRP';
  selectedIndex = 3;
  pdfChartSpline: Highcharts.Chart;
  cdfChartSpline: Highcharts.Chart;
  pdfChartBar: Highcharts.Chart;
  cdfChartBar: Highcharts.Chart;
  showBar = false;
  showToggle = false;
  data=[];
  performanceLevel: NominalGenerationPerformance[] = [
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'increase',
      postSquareKiloStatus: 'decrease'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'decrease',
      postSquareKiloStatus: 'increase'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'increase',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: 'decrease'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'increase',
      postSquareKiloStatus: 'decrease'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'increase',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: 'decrease'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'increase',
      postSquareKiloStatus: 'decrease'
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: '',
      postSquareKiloStatus: ''
    },
    {
      level: '-75',
      prePercentArea: '23.077',
      postPercentArea: '33.077',
      preSquareKilo: '30',
      postSquareKilo: '55',
      operator: '>',
      postPercentAreaStatus: 'decrease',
      postSquareKiloStatus: 'increase'
    }
  ];

  performancePercentile: NominalGenerationPerformancePercentile[] = [
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'increase'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'decrease'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'increase'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: ''
    },{
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: ''
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'decrease'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'increase'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'decrease'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: 'increase'
    },
    {
      percentile: '5',
      predbm: '-60',
      postdbm: '-55',
      postdmStatus: ''
    }
  ];

  dataExt: any[] = [];
  dataPercentile: any[] = [];
  dataSourcePerformanceLevel = new MatTableDataSource(this.performanceLevel);
  dataSourcePerformancePercentile = new MatTableDataSource(this.performancePercentile);
  displayedColumns: string[] = ['level', 'preArea', 'postArea', 'preSquareArea', 'postSquareArea'];
  displayedColumnsPercentile: string[] = ['percentileTitle', 'predbmTitle', 'postdbmTitle'];
  showSearchInput: boolean;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.data = history.state.data;
    if ('undefined' != this.data['row']) {
      this.summaryOf = this.data['row'].display;
    }
    this.processPerformanceLevel();
    this.processPerformancePercentile();
  }


  private processPerformanceLevel() {
    const statesSeen = {};

    this.dataExt = this.performanceLevel.sort((a, b) => {
      const stateComp = a.prePercentArea.localeCompare(b.prePercentArea);
      return stateComp ? stateComp : a.prePercentArea.localeCompare(b.prePercentArea);
    }).map(x => {
      const stateSpan = statesSeen[x.prePercentArea] ? 0 :
        this.performanceLevel.filter(y => y.prePercentArea === x.prePercentArea).length;

      statesSeen[x.prePercentArea] = true;
      return { ...x, stateSpan };
    });
    this.dataSourcePerformanceLevel = new MatTableDataSource(this.dataExt);
  }

  private processPerformancePercentile() {
    const statesSeen = {};

    this.dataPercentile = this.performancePercentile.sort((a, b) => {
      const stateComp = a.predbm.localeCompare(b.predbm);
      return stateComp ? stateComp : a.predbm.localeCompare(b.predbm);
    }).map(x => {
      const stateSpan = statesSeen[x.predbm] ? 0 :
        this.performanceLevel.filter(y => y.prePercentArea === x.predbm).length;

      statesSeen[x.predbm] = true;
      return { ...x, stateSpan };
    });
    this.dataSourcePerformancePercentile = new MatTableDataSource(this.dataPercentile);
  }

  createBarChart() {
    //@ts-ignore
    this.pdfChartBar = Highcharts.chart('cdfChartBarId', {
      chart: {
        type: 'column',
        marginTop: 40
      },
      title: {
        text: null
      },
      subtitle: {
          text: null
      },
      credits: {
          enabled: false
      },
      xAxis: {
        reversed: true,
        type: 'category',
          categories: [
            '-119.909', '-109.909' , '-79.909', '-59.909'
          ],
          title: {
              text: 'RSRP (dBm)',
              x: 0,
              y: 10,
              style: {
                  color: '#000000',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '12px'
              },
          },
          labels: {
              useHTML: true,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      yAxis: {
          min: 5,
          max: 100,
          tickinterval: 25,
          style: {
              color: 'rgba(35, 31, 32, 0.54)',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          title: {
              text: 'Probability Statistics',
              x: 0,
              y: 10,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '14px'
              },
          },
          labels: {
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          },
          series: {
            lineWidth: 1,
            pointStart: 15
          }
      },
      legend: {
        enabled: true,
        x: 30,
        y: -30,
          itemStyle: {
              color: '#000000',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          align: 'center',
          verticalAlign: 'bottom',
          symbolHeight: 14,
          symbolWidth: 14,
          symbolRadius: 0
      },
      series: [
        {
          name: 'Pre',
          visible: true,
          color: '#ea6767',
          marker: {
              symbol: 'circle',
              lineColor: '#ea6767'
          },
          data: [[0.5, 25], [0.7, 50], [1.3, 75], [2.5, 100]]
        },
        {
          name: 'Post',
          visible: true,
          color: '#52dc72',
          marker: {
              symbol: 'circle',
              lineColor: '#52dc72'
          },
          data: [[1, 25], [1.5, 50], [2.2, 75], [3, 100]]
        }
      ],
      exporting: {
          enabled: false
      }
    });
    //@ts-ignore
    this.cdfChartBar = Highcharts.chart('pdfChartBarId', {
      chart: {
        type: 'column',
        marginTop: 40
      },
      title: {
        text: null
      },
      subtitle: {
          text: null
      },
      credits: {
          enabled: false
      },
      xAxis: {
        reversed: true,
        type: 'category',
          categories: [
            '-119.909', '-109.909' , '-79.909', '-59.909'
          ],
          title: {
              text: 'RSRP (dBm)',
              x: 0,
              y: 10,
              style: {
                  color: '#000000',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '12px'
              },
          },
          labels: {
              useHTML: true,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      yAxis: {
          min: 5,
          max: 100,
          tickinterval: 25,
          style: {
              color: 'rgba(35, 31, 32, 0.54)',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          title: {
              text: 'Probability Statistics',
              x: 0,
              y: 10,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '14px'
              },
          },
          labels: {
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          },
          series: {
            lineWidth: 1,
            pointStart: 15
          }
      },
      legend: {
        enabled: true,
        x: 30,
        y: -30,
          itemStyle: {
              color: '#000000',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          align: 'center',
          verticalAlign: 'bottom',
          symbolHeight: 14,
          symbolWidth: 14,
          symbolRadius: 0
      },
      series: [
        {
          name: 'Pre',
          visible: true,
          color: '#ea6767',
          marker: {
              symbol: 'circle',
              lineColor: '#ea6767'
          },
          data: [[0.5, 25], [0.7, 50], [1.3, 75], [2.5, 100]]
        },
        {
          name: 'Post',
          visible: true,
          color: '#52dc72',
          marker: {
              symbol: 'circle',
              lineColor: '#52dc72'
          },
          data: [[1, 25], [1.5, 50], [2.2, 75], [3, 100]]
        }
      ],
      exporting: {
          enabled: false
      }
    });
  }
  createChart() {
    //@ts-ignore
    this.pdfChartSpline = Highcharts.chart('pdfChartSplineId', {
        chart: {
          type: 'spline',
          marginTop: 40
        },
        title: {
          text: null
        },
        subtitle: {
            text: null
        },
        credits: {
            enabled: false
        },
        xAxis: {
          type: 'category',
            categories: [
              '-119.909', '-109.909' , '-79.909', '-59.909'
            ],
            title: {
                text: 'RSRP (dBm)',
                x: 0,
                y: 10,
                style: {
                    color: '#000000',
                    fontFamily: 'Roboto',
                    fontWeight: 'normal',
                    fontSize: '12px'
                },
            },
            labels: {
                useHTML: true,
                style: {
                    color: 'rgba(35, 31, 32, 0.54)',
                    fontFamily: 'Roboto',
                    fontWeight: 'normal',
                    fontSize: '11px'
                },
            },
        },
        yAxis: {
            min: 5,
            max: 100,
            tickinterval: 25,
            style: {
                color: 'rgba(35, 31, 32, 0.54)',
                fontFamily: 'Roboto',
                fontWeight: 'normal',
                fontSize: '12px'
            },
            title: {
                text: 'Probability Statistics',
                x: 0,
                y: 10,
                style: {
                    color: 'rgba(35, 31, 32, 0.54)',
                    fontFamily: 'Roboto',
                    fontWeight: 'normal',
                    fontSize: '14px'
                },
            },
            labels: {
                style: {
                    color: 'rgba(35, 31, 32, 0.54)',
                    fontFamily: 'Roboto',
                    fontWeight: 'normal',
                    fontSize: '11px'
                },
            },
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            },
            series: {
              lineWidth: 1,
              pointStart: 15
            }
        },
        legend: {
          enabled: true,
          x: 30,
          y: -30,
            itemStyle: {
                color: '#000000',
                fontFamily: 'Roboto',
                fontWeight: 'normal',
                fontSize: '12px'
            },
            align: 'center',
            verticalAlign: 'bottom',
            symbolHeight: 14,
            symbolWidth: 14,
            symbolRadius: 0
        },
        series: [
          {
            type: 'spline',
            name: 'Pre',
            visible: true,
            color: '#ea6767',
            marker: {
                symbol: 'circle',
                lineColor: '#ea6767'
            },
            data: [[0.5, 25], [0.7, 50], [1.3, 75], [2.5, 100]]
          },
          {
            type: 'spline',
            name: 'Post',
            visible: true,
            color: '#52dc72',
            marker: {
                symbol: 'circle',
                lineColor: '#52dc72'
            },
            data: [[1, 25], [1.5, 50], [2.2, 75], [3, 100]]
          }
        ],
        exporting: {
            enabled: false
        }
    });
    //@ts-ignore
    this.cdfChartSpline = Highcharts.chart('cdfChartSplineId', {
      chart: {
        type: 'spline',
        marginTop: 40
      },
      title: {
        text: null
      },
      subtitle: {
          text: null
      },
      credits: {
          enabled: false
      },
      xAxis: {
        type: 'category',
          categories: [
            '-119.909', '-109.909' , '-79.909', '-59.909'
          ],
          title: {
              text: 'RSRP (dBm)',
              x: 0,
              y: 10,
              style: {
                  color: '#000000',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '12px'
              },
          },
          labels: {
              useHTML: true,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      yAxis: {
          min: 5,
          max: 100,
          tickinterval: 25,
          style: {
              color: 'rgba(35, 31, 32, 0.54)',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          title: {
              text: 'Probability Statistics',
              x: 0,
              y: 10,
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '14px'
              },
          },
          labels: {
              style: {
                  color: 'rgba(35, 31, 32, 0.54)',
                  fontFamily: 'Roboto',
                  fontWeight: 'normal',
                  fontSize: '11px'
              },
          },
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          },
          series: {
            lineWidth: 1,
            pointStart: 15
          }
      },
      legend: {
        enabled: true,
        x: 30,
        y: -30,
          itemStyle: {
              color: '#000000',
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: '12px'
          },
          align: 'center',
          verticalAlign: 'bottom',
          symbolHeight: 14,
          symbolWidth: 14,
          symbolRadius: 0
      },
      series: [
        {
          type: 'spline',
          name: 'Pre',
          visible: true,
          color: '#ea6767',
          marker: {
              symbol: 'circle',
              lineColor: '#ea6767'
          },
          data: [[0.5, 25], [0.7, 50], [1.3, 75], [2.5, 100]]
        },
        {
          type: 'spline',
          name: 'Post',
          visible: true,
          color: '#52dc72',
          marker: {
              symbol: 'circle',
              lineColor: '#52dc72'
          },
          data: [[1, 25], [1.5, 50], [2.2, 75], [3, 100]]
        }
      ],
      exporting: {
          enabled: false
      }
  });
  }
  ngOnInit(): void {
  }



  async backToSummary() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Summary']);
  }

  async displayNominalGenerationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalGenerationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-generation-coverage/nominal-generation-layer/nominal-generation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalGenerationLayerComponent)
    );

  }

  onLinkClick(event: MatTabChangeEvent) {
    if (event.index == 4) {
      $('#mat-tab-label-1-2').css({ 'border-right': '1px solid #e9ecec' });
      this.showToggle = true;
    } else {
      $('#mat-tab-label-1-2').css({ 'border-right': 'none' });
      this.showToggle = false;
    }
    this.createChart();
    this.createBarChart();
  }

  changeChart($event: MatSlideToggleChange) {
    this.selectedIndex = 4;
    this.showBar = $event.checked;
  }
}
