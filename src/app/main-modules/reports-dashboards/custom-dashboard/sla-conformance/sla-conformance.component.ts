import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, DIRECTION, TYPE_LIST, DIRECTION_LIST, type_dropdown } from '../twamp-live-dashboard/twamp-live-dashboard.constant';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';

import { Chart } from "angular-highcharts";
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { GridOptions } from '@ag-grid-community/all-modules';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AllExpandRendererComponent } from '../renderer/all-expand-renderer.component';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomTooltip } from '../renderer/custom-tooltip.component';
declare var $: any;
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';

export class GroupLevel {
  level = 0;
  field = '';
}
const dateFormat = DATE_FORMATS;
@Component({
  selector: 'app-sla-conformance',
  templateUrl: './sla-conformance.component.html',
  styleUrls: ['./sla-conformance.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ],
})
export class SlaConformanceComponent implements OnInit {
  public displayName;
  public jsonUrl;
  columnDefs;
  //columnDefsViolationReport = COLUMNDEFSVIOLATIONREPORT;
  columnDef: any;
  columnDefSLAVoilation: any;
  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};
  rowData = [];
  rowDataSLAVoilation = [];
  firstHeaderGroup = [];
  groupList: GroupLevel[] = [];
  count = 0;
  public tooltipShowDelay: number;
  icons: { columnGroupClosed: string; columnGroupOpened: string };
  geographyListValue: string = GEOGRAPHY[0].geography_name;
  nodeListValue: string = NODE_LIST[0].node_name;
  dscpListValue: string = DSCP_LIST[0].dscp_name;
  kpiListValue: string = KPI_LIST[0].kpi_name;
  typeListValue = TYPE_LIST[0].type_name;
  directionListValue = TYPE_LIST[0]
  directionValue: string = DIRECTION[0].name;
  searchGeographyListValue;
  searchNodeListValue;
  searchDscpListValue;
  searchKpiListValue;
  searchTypeListValue;
  searchDirectionListValue;
  searchDirectionValue;
  url = 'assets/data/report/reports-and-dashboard/sla-conformance.json';
  url_sla_voilation = 'assets/data/report/reports-and-dashboard/sla-violation.json'

  geographyList = GEOGRAPHY;
  nodeList = NODE_LIST;
  dscpList = DSCP_LIST;
  kpiList = KPI_LIST;
  typeList = TYPE_LIST;
  directionList = DIRECTION_LIST;

  date = moment();
  twampGridOptions: GridOptions;
  slaGridOptions: GridOptions;
  public sidenavBarStatus;
  public frameworkComponentsTWAMP;
  rowData1: any;
  pinnedBottomRowData: any;
  public countProvision: number = 0;
  public countLive: number = 0;
  public countDelta: number = 0;
  twampForm: FormGroup;
  liveViolationReportForm: FormGroup;
  jsonUrlLiveViolationReport: string = "bye";
  showLiveDashboard = "live-dashboard";
  @ViewChild('recursiveListTmpl') recursiveListTmpl;
  liveViolationReport = "eNodeB";
  twampLiveViolationReportGridOptions: GridOptions;
  rowDataViolationReport: any;
  showSLAConformance = "sla-conformance";
  chart;
  secondChart;
  thirdChart;
  @ViewChild('typeMultiCtrlSelect') typeMultiCtrlSelect: MatSelect;
  protected typeMultiListData = TYPE_LIST;
  public typeMultiCtrl: FormControl = new FormControl();
  public typeMultiFilterCtrl: FormControl = new FormControl();
  public typeMultiFilter: ReplaySubject<type_dropdown[]> = new ReplaySubject<type_dropdown[]>(1);
  protected _onDestroy = new Subject<void>();
  displaySapIDName: any;
  liveChartReport: any;

  @ViewChild(CdkPortal, { static: true }) portal: CdkPortal;
  // chart;
  options;
  @ViewChild('graphViolationChart', { static: true }) graphViolationChart: ElementRef;
  private _chart: any;

  onReadyModeUpdate(params) {
   // this.calculateRowCount();
  }

  // public onReady(params) {
  //   this.gridApi = params.api;
  //   this.calculateRowCount();
  // }
  // public calculateRowCount() {
  //   if (this.gridOptions.api && this.rowData) {
  //     setTimeout(() => {
  //       this.gridOptions.api.sizeColumnsToFit();
  //     }, 1000);
  //   }
  // }
  
  constructor(
    private httpService: HttpClient,
    private dataShare: DataSharingService,
  ) {
    this.frameworkComponentsTWAMP = {
      'AllExpandRenderer': AllExpandRendererComponent,
      customTooltip: CustomTooltip
    };
    this.displayName = history.state.display_name;
    this.displaySapIDName = "hello";
    this.jsonUrl = history.state.json_url;

    this.columnDefs = [
      {
        headerName: "R4G State",
        field: "r4g_state",
        width: 270,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Direction",
        field: "direction",
        width: 270,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "TWAMP",
        headerClass: "text-align-group-header",
        children: [
          {
            headerName: "Provisioned",
            field: "twamp.provisional",
            width: 200,
            headerClass: 'child-header',
          },
          {
            headerName: "Live",
            field: "twamp.live",
            width: 200,
            headerClass: 'child-header',
          },
          {
            headerName: "Delta",
            field: "twamp.delta",
            width: 200,
            headerClass: 'child-header',
          }
        ]
      },
      {
        headerName: "% of eNodeB that have",
        headerClass: "text-align-group-header",
        children: [
          {
            headerName: "Packet Loss",
            children: [
              {
                headerName: "Metro,2 Way < 1%,1 Way < 0.5%",
                field: "packetloss.metro",
                width: 250,
                headerClass: 'child-header'
              },
              {
                headerName: "Nld,2 Way < 1%,1 Way < 0.5%",
                field: "packetloss.nld",
                width: 250,
                suppressMenu: true,
                headerClass: 'child-header'
              }]
          }, {
            headerName: "Latency",
            children: [{
              headerName: "Metro,2 Way < 40 ms,1 Way < 20 ms",
              field: "latency.metro",
              width: 250
            },
            {
              headerName: "Nld,2 Way < 40 ms,1 Way < 20 ms",
              field: "latency.nld",
              width: 250
            }]
          }, {
            headerName: "Jitter",
            children: [{
              headerName: "Metro,2 Way < 5 ms,1 Way < 2.5 ms",
              field: "jitter.metro",
              width: 250
            },
            {
              headerName: "Nld,2 Way < 5 ms,1 Way < 2.5 ms",
              field: "jitter.nld",
              width: 250
            }]
          }, {
            headerName: "MOS",
            children: [{
              headerName: "Metro,>4",
              field: "mos.metro",
              width: 250
            },
            {
              headerName: "Nld,>4",
              field: "mos.nld",
              width: 250,
              headerClass: 'marginFromTopInHeader'
            }]
          }, {
            headerName: "Best Effort Data Outage Simulation",
            children: [{
              headerName: "<500 ms",
              field: "outagesimulation.500ms",
              width: 250
            }]
          }]
      }];

    this.columnDefSLAVoilation = [{

      headerName: "Zone",
      field: "zone",
      width: 100,
      pinned: "left"
    }, {
      headerName: "R4GState",
      field: "r4gState",
      width: 150,
      pinned: "left"
    },

    {
      headerName: "eNB-SAP-ID",
      field: "sapId",
      width: 180,
      pinned: "left"
    },
    {
      headerName: "Direction",
      field: "direction",
      width: 150,
      pinned: "left"
    },
    {
      headerName: "Type",
      field: "type",
      width: 100
    },
    {
      headerName: "Packet Loss %",

      children: [{
        headerName: "Avg",
        field: "packetLoss",
        width: 80
      },
      {
        headerName: "Max",
        field: "packetLossMax",
        width: 80
      },
      {
        headerName: "95 th",
        field: "packetLossPercentile",
        width: 80
      }
      ]

    },
    {
      headerName: "Latency(ms)",

      children: [{
        headerName: "Avg",
        field: "latency",
        width: 80
      },
      {
        headerName: "Max",
        field: "latencyMax",
        width: 80
      },
      {
        headerName: "95 th",
        field: "latencyPercentile",
        width: 80
      }
      ]

    },
    {
      headerName: "Jitter(ms)",

      children: [{
        headerName: "Avg",
        field: "jitter",
        width: 80
      },
      {
        headerName: "Max",
        field: "jitterMax",
        width: 80
      },
      {
        headerName: "95 th",
        field: "jitterPercentile",
        width: 80
      }
      ]

    },
    {
      headerName: "MOS",
      children: [{
        headerName: "Avg",
        field: "mos",
        width: 80
      },
      {
        headerName: "Max",
        field: "mosMax",
        width: 80
      },
      {
        headerName: "95 th",
        field: "mosPercentile",
        width: 80
      }
      ]

    },
    {
      headerName: "Best EffortData Outage Simulation (ms)",
      children: [{
        headerName: "Avg",
        field: "bestEffortDataOutage",
        width: 105
      },
      {
        headerName: "Max",
        field: "bestEffortDataOutageMax",
        width: 105,
      },
      {
        headerName: "95 th",
        field: "bestEffortDataOutagePercentile",
        width: 105,

      }
      ]

    }
    ];
    this.twampGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponentsTWAMP,
      context: {
        componentParent: this
      }
    };
    this.slaGridOptions = <GridOptions>{};

    this.dataShare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });

    this.twampForm = new FormGroup({
      'geographyList': new FormControl(''),
      'nodeList': new FormControl(''),
      'dscpList': new FormControl(''),
      'date': new FormControl(''),
      'kpiList': new FormControl('')
    });

    this.liveViolationReportForm = new FormGroup({
      'typeMultiCtrl': new FormControl(''),
      'directionList': new FormControl('')
    });
    this.liveViolationReportForm.setValue({
      'typeMultiCtrl': this.typeListValue,
      'directionList': this.directionListValue
    });
    this.typeMultiFilter.next(this.typeMultiListData.slice());
    this.typeMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.typeMultiListData,
          this.typeMultiFilterCtrl,
          this.typeMultiFilter
        );
      });
  }

  // setFirstHeaders(columnDefs: any) {
  //   this.firstHeaderGroup = columnDefs.map((element: { [x: string]: any }) => {
  //     return element['headerName'];
  //   });
  // }

  ngOnInit(): void {
    this.showSLAConformance = "sla-conformance";
    //   this.setFirstHeaders(this.columnDefs);
    this.httpService.get(this.url).subscribe((data: any[]) => {
      this.rowData = data;
    });
    this.httpService.get(this.url_sla_voilation).subscribe((voilationResult: any) => {
      this.rowDataSLAVoilation = voilationResult;
    });
    this.createChart();
    this.createLineChart();
    this.multiLineChart();
  }

  fitColumns() {
    if (this.twampGridOptions.api && this.rowData) {
      setTimeout(() => {
        this.twampGridOptions.api.sizeColumnsToFit();
      }, 0);
    } else if (this.twampGridOptions.api && this.rowDataSLAVoilation) {
      setTimeout(() => {
        this.slaGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }
  onReady(event) {
    this.fitColumns();
  }

  onRowClicked(event: any) {
    if (event.data.r4g_state === "r4g_state") {
      this.showSLAConformance = "sla-voilation";
    } else {
      this.showSLAConformance = 'sla-chart';
    }
  }

  protected filterData(listData, filterCtrl, filterSubject) {
    console.log(listData)
    if (!listData) {
      return;
    }

    let search = filterCtrl.value;
    if (!search) {
      filterSubject.next(
        listData.slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }

    filterSubject.next(
      listData.filter(
        data => data.type_name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  createChart() {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      xAxis: [{
        categories: ['Jun10', 'Jun11', 'Jun12', 'Jun13', 'Jun14', 'Jun15', 'Jun16'],
        lineWidth: 0,

      }],
      yAxis: [{
        title: {
          text: 'Number of Violations',
        },

      }],
      tooltip: {
        formatter: function () {
          return '<span></span>' + this.point.y;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        type: 'column',
        name: '',
        color: '#0f73bd',
        data: [3, 2, 1, 5, 4, 6, 1]
      }]
    });
  }

  createLineChart() {
    this.secondChart = new Chart({
      chart: {
        type: 'line',
        marginTop: 80,
        height: 350,
        zoomType: 'xy',
        resetZoomButton: {
          theme: {
            fill: 'white',
            stroke: 'silver',
            r: 0,
            states: {
              hover: {
                fill: '#5fc75a',
                style: {
                  color: 'white'
                }
              }
            }
          },

          position: {
            x: 0,
            y: -65
          }
        },
        // panning: true,
        panKey: 'shift',
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

        formatter: function () {
          var seriesName = this.series.name;
          var unit = '';
          if (seriesName == 'PacketLoss') {
            unit = '%'
          } else {
            unit = ' ms '
          }
          return '<span>\u25CF</span>' + ' ' + seriesName + ':' + this.point.y + unit + '<b></b> <span style="color:' + this.point.color + '">\u25CF</span> Time: <b>' + this.point.x + 'Hours' + '</b>'
        }
      },
      exporting: {
        enabled: false
      },

      xAxis: [{
        title: {
          text: 'Hours',
        },
        lineWidth: 0,

      }],


      yAxis: [
        {
          min: 0,
          max: 100,
          title: {
            text: 'Value (%)',
          },

        },

        {
          min: 0,
          max: 10,
          title: {
            text: 'Value',

          },

          opposite: true

        },
        {
          min: 0,
          max: 150,
          title: {
            text: 'Value (ms)',
          },

          opposite: true
        }
      ],

      series: [{
        type: 'line',
        showInLegend: true,
        color: '#3bba35',
        name: 'PacketLoss',
        visible: true,
        data: [3, 2, 1, 5, 4]
      },

      {
        type: 'line',
        showInLegend: true,
        color: '#3eb3f3',
        name: 'MOS',
        yAxis: 1,
        data: [3, 2, 3, 1, 5]

      },
      {
        type: 'line',
        showInLegend: true,
        color: '#f4c26e',
        name: 'Jitter',
        yAxis: 2,
        data: [40, 50, 10, 20, 60]

      },

      {
        type: 'line',
        showInLegend: true,
        color: '#adff2f',
        name: 'Best Effort Data Outage Simulation',
        data: [2, 1, 1, 3, 4]



      },
      {
        type: 'line',
        showInLegend: true,
        color: '#ff0000',
        name: 'Latency',
        data: [6, 4, 1, 5, 4]
      }
      ]

    });

  }

  multiLineChart() {
    this.thirdChart = new Chart({
      chart: {
        width: 1000,
        type: 'line',
        zoomType: 'xy',
        resetZoomButton: {
          theme: {
            fill: 'white',
            stroke: 'silver',
            r: 0,
            states: {
              hover: {
                fill: '#5fc75a',
                style: {
                  color: 'white'
                }
              }
            }
          },

          position: {
            x: 0,
            y: -65
          }
        },
        panKey: 'shift',
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

        formatter: function () {
          // var seriesName = this.series.name;
          // var unit = '';
          // if (seriesName == 'PacketLoss') {
          //   unit = '%'
          // } else {
          //   unit = ' ms '
          // }
          return '<span></span>' + this.point.y
        }
      },
      exporting: {
        enabled: false
      },


      xAxis: [{
        title: {
          text: 'Hours',
        },
        lineWidth: 0,

      }],


      yAxis: [{
        title: {
          text: 'Value (ms)',
        },

      }],

      series: [{
        showInLegend: true,
        type: 'line',
        color: '#3bba35',
        name: 'I-RJ-JPUR-ENB-0030',
        data: [3, 2, 1, 5, 4]
      }],
    })
  }

  previousPage(currentPage) {
    if (currentPage === 'sla-voilation') {
      this.twampLiveViolationReportGridOptions.api.showLoadingOverlay();
      this.showSLAConformance = 'sla-conformance';
    } else {
      this.showSLAConformance = 'sla-voilation';
    }

  }
  onSubmit() {
    console.log(this.twampForm.value);
  }
}