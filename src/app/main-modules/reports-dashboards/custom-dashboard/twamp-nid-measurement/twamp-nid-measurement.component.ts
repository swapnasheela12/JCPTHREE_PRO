import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { MGW_VOILATION_REPORT, GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, TWAMP_LIVE_VIOLATION_REPORT, TYPE_LIST, DIRECTION_LIST, type_dropdown, DIRECTION } from '../twamp-live-dashboard/twamp-live-dashboard.constant';
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
  selector: 'app-twamp-nid-measurement',
  templateUrl: './twamp-nid-measurement.component.html',
  styleUrls: ['./twamp-nid-measurement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ],
})

export class TwampNidMeasurementComponent implements OnInit {
  public displayName;
  public jsonUrl;
  columnDefs: any;
  columnDefMGWVoilation: any;
  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};
  rowData = [];
  rowDataMGWVoilation = [];
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
  directionListValue: string = DIRECTION_LIST[0].direction_name;
  searchGeographyListValue;
  searchNodeListValue;
  searchDscpListValue;
  searchKpiListValue;
  searchTypeListValue;
  searchDirectionListValue;
  url = 'assets/data/report/reports-and-dashboard/sla-conformance.json';
  url_mgw_voilation = 'assets/data/report/reports-and-dashboard/mgw_voilation_report.json'
  liveViolationReportForm: FormGroup;
  geographyList = GEOGRAPHY;
  nodeList = NODE_LIST;
  dscpList = DSCP_LIST;
  kpiList = KPI_LIST;
  typeList = TYPE_LIST;
  directionList = DIRECTION_LIST;
  direction = DIRECTION[0];
  selectedEnode = "Two Way-eNodeB";
  date = moment();
  twampGridOptions: GridOptions;
  slaMGWGridOptions: GridOptions;
  public sidenavBarStatus;
  public frameworkComponentsTWAMP;

  public countProvision: number = 0;
  public countLive: number = 0;
  public countDelta: number = 0;
  twampForm: FormGroup;
  jsonUrlLiveViolationReport: string = "bye";
  showLiveDashboard = "live-dashboard";
  @ViewChild('recursiveListTmpl') recursiveListTmpl;
  liveViolationReport = "eNodeB";
  twampLiveViolationReportGridOptions: GridOptions;
  rowDataViolationReport: any;
  showSLAConformance = "MGW SLA Conformance";
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
  constructor(
    private httpService: HttpClient,
    private datePipe: DatePipe,
    private dataShare: DataSharingService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
    this.frameworkComponentsTWAMP = {
      'AllExpandRenderer': AllExpandRendererComponent,
      customTooltip: CustomTooltip
    };

    this.columnDefs = [
      {
        headerName: "R4G State",
        field: "r4g_state",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Direction",
        field: "direction",
        width: 200,
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
            width: 250,
            headerClass: 'child-header',
          },
          {
            headerName: "Live",
            field: "twamp.live",
            width: 150,
            headerClass: 'child-header',
          },
          {
            headerName: "Delta",
            field: "twamp.delta",
            width: 150,
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
                width: 270,
                headerClass: 'child-header',
              },
              {
                headerName: "Nld,2 Way < 1%,1 Way < 0.5%",
                field: "packetloss.nld",
                width: 270,
                suppressMenu: true,
                headerClass: 'child-header',
              }]
          }, {
            headerName: "Latency",
            children: [{
              headerName: "Metro,2 Way < 40 ms,1 Way < 20 ms",
              field: "latency.metro",
              width: 290
            },
            {
              headerName: "Nld,2 Way < 40 ms,1 Way < 20 ms",
              field: "latency.nld",
              width: 150
            }]
          }, {
            headerName: "Jitter",
            children: [{
              headerName: "Metro,2 Way < 5 ms,1 Way < 2.5 ms",
              field: "jitter.metro",
              width: 150,
            },
            {
              headerName: "Nld,2 Way < 5 ms,1 Way < 2.5 ms",
              field: "jitter.nld",
              width: 150
            }]
          }]
      }
    ];

    this.columnDefMGWVoilation = [
      {
        headerName: "Zone",
        field: "zone",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "R4GState",
        field: "r4gstate",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Node Location",
        field: "nodelocation",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "TOR Switch Name",
        field: "torswitch",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "TOR Port",
        field: "torport",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "IPv4",
        field: "ipv4",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Direction",
        field: "slaviodirection",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Type",
        field: "slaviotype",
        width: 200,
        pinned: "left",
        headerClass: 'parent-header'
      },
      {
        headerName: "Packet Loss",
        children: [
          {
            headerName: "Avg",
            field: "packetlossavg",
            width: 140,
            headerClass: 'child-header'
          },
          {
            headerName: "Max",
            field: "packetlossmax",
            width: 140,
            suppressMenu: true,
            headerClass: 'child-header'
          },
          {
            headerName: "95th",
            field: "packetloss95",
            width: 140,
            suppressMenu: true,
            headerClass: 'child-header'
          }
        ]
      }, {
        headerName: "Latency (ms)",
        children: [
          {
            headerName: "Avg",
            field: "latencyavg",
            width: 130,
            headerClass: 'child-header'
          },
          {
            headerName: "Max",
            field: "latencymax",
            width: 130,
            suppressMenu: true,
            headerClass: 'child-header'
          },
          {
            headerName: "95th",
            field: "latency95",
            width: 130,
            suppressMenu: true,
            headerClass: 'child-header'
          }
        ]
      }, {
        headerName: "Jitter (ms)",
        children: [{
          headerName: "Avg",
          field: "jitteravg",
          width: 130,
          headerClass: 'child-header'
        },
        {
          headerName: "Max",
          field: "jittermax",
          width: 130,
          suppressMenu: true,
          headerClass: 'child-header'
        },
        {
          headerName: "95th",
          field: "jitter95",
          width: 130,
          suppressMenu: true,
          headerClass: 'child-header'
        }]
      }
    ]

    this.twampGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponentsTWAMP,
      context: {
        componentParent: this
      }
    };
    this.slaMGWGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponentsTWAMP,
      context: {
        componentParent: this
      }
    };

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

  ngOnInit(): void {
    this.showSLAConformance = "MGW SLA Conformance";
    this.httpService.get(this.url).subscribe((data: any[]) => {
      this.rowData = data;
    });
    this.httpService.get(this.url_mgw_voilation).subscribe((data: any[]) => {
      console.log("rowDataMGWVoilation", data);
      console.log("columnDefMGWVoilation", this.columnDefMGWVoilation);
      this.rowDataMGWVoilation = data;
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
    } else if (this.slaMGWGridOptions.api && this.rowDataMGWVoilation) {
      setTimeout(() => {
        this.slaMGWGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }
  onReady(event) {
    this.fitColumns();
  }

  onCellClicked(event: any) {
    if (event.colDef.field === "r4g_state") {
      this.showSLAConformance = "mgw-voilation";
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
        marginTop: 30,
        height: 350,
        width: 1000,
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
    if (currentPage === 'SLA-Conformance-Node-Wise') {
      this.twampLiveViolationReportGridOptions.api.showLoadingOverlay();
      this.showLiveDashboard = "MGW SLA Conformance";
    }
  }

  openedChange(sda) {
    this.searchGeographyListValue = '';
    this.searchNodeListValue = '';
    this.searchDscpListValue = '';
    this.searchKpiListValue = '';
    this.searchTypeListValue = '';
    this.searchDirectionListValue = '';
  }

  onSubmit() {
    console.log(this.twampForm.value);
  }
}