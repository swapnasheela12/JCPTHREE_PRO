import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { TWAMP_COLUMN_DEFS, GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, TWAMP_LIVE_VIOLATION_REPORT, TYPE_LIST, DIRECTION_LIST, type_dropdown } from './twamp-live-dashboard.constant';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Chart } from "angular-highcharts";

import * as moment from 'moment';
import { GridOptions } from '@ag-grid-community/all-modules';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AllExpandRendererComponent } from '../renderer/all-expand-renderer.component';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomTooltip } from '../renderer/custom-tooltip.component';
declare var $: any;
import * as Highcharts from 'highcharts';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
//import { CustomTooltip } from '../../../../main-modules/modules/performance-management/my-performance-reports/custom-tooltip.component';

export class GroupLevel {
  level = 0;
  field = '';
}
interface DataObject {
  [key: string]: any;
}
const COLUMNDEFS = TWAMP_COLUMN_DEFS;
const dateFormat = DATE_FORMATS;
const COLUMNDEFSVIOLATIONREPORT = TWAMP_LIVE_VIOLATION_REPORT;

@Component({
  selector: 'app-twamp-live-dashboard',
  templateUrl: './twamp-live-dashboard.component.html',
  styleUrls: ['./twamp-live-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: dateFormat},
  ],
})
export class TwampLiveDashboardComponent implements OnInit, AfterViewInit {
  public displayName;
  public jsonUrl;
  columnDefs = COLUMNDEFS;
  columnDefsViolationReport = COLUMNDEFSVIOLATIONREPORT;
  columnDef: any;
  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};
  rowData = [];
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
  
  geographyList = GEOGRAPHY;
  nodeList = NODE_LIST;
  dscpList = DSCP_LIST;
  kpiList = KPI_LIST;
  typeList = TYPE_LIST;
  directionList = DIRECTION_LIST;

  date = moment();
  twampGridOptions: GridOptions;
  public sidenavBarStatus;
  public frameworkComponentsTWAMP;
  rowData1: any;
  pinnedBottomRowData: any;
  public countProvision:number = 0;
  public countLive:number = 0;
  public countDelta:number = 0;
  twampForm:FormGroup;
  liveViolationReportForm: FormGroup;
  jsonUrlLiveViolationReport: string = "bye";
  showLiveDashboard="live-dashboard";
  @ViewChild('recursiveListTmpl') recursiveListTmpl;
  liveViolationReport ="eNodeB";
  twampLiveViolationReportGridOptions: GridOptions;
  rowDataViolationReport: any;
  chart;

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
  @ViewChild('graphViolationChart',{ static: true })  graphViolationChart: ElementRef;

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
      this.displayName = history.state.display_name;
      this.displaySapIDName = "hello";
      this.jsonUrl = history.state.json_url;
      if (this.displayName == undefined) {
        this.displayName = 'Live Dashboard';
      }
      if (this.jsonUrl == undefined) {
      this.jsonUrl = 'assets/data/report/reports-and-dashboard/twamp-live-dashboard.json';
      }
      this.twampGridOptions = <GridOptions>{
        frameworkComponents: this.frameworkComponentsTWAMP,
        context: {
          componentParent: this
        }
      };
      this.twampLiveViolationReportGridOptions = <GridOptions>{};
      this.tooltipShowDelay = 0;
      this.dataShare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
        this.fitColumns();
      });

      this.twampForm = new FormGroup({
        'geographyList':new FormControl(''),
        'nodeList':new FormControl(''),
        'dscpList':new FormControl(''),
        'date': new FormControl(''),
        'kpiList':new FormControl('')
      });

      this.liveViolationReportForm = new FormGroup({
        'typeMultiCtrl': new FormControl(''),
        'directionList': new FormControl('')
      });
  }

  ngOnInit(): void {
    this.setGroupDetails(1, 'node');
    if(this.columnDefs[4].headerName == "Direction") {
      this.columnDefs[4]['cellRenderer'] = getValue;
      this.columnDefs[4]['headerComponent'] = 'AllExpandRenderer';
    }
    
    this.setFirstHeaders(this.columnDefs);
    this.httpService
      .get(this.jsonUrl)
      .subscribe((data: any[]) => {
        this.rowData = JSON.parse(JSON.stringify(data));
        this.getGroups(data, this.groupList[0], null, 'root');
        this.pinnedBottomRowData = this.createData(
          "Total",
          this.countProvision,
          this.countLive,
          this.countDelta
        );
    });

    this.typeMultiCtrl.setValue([this.typeMultiListData[1]]);
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


    this.twampForm.setValue({
      'geographyList': this.geographyListValue,
      'nodeList': this.nodeListValue,
      'dscpList': this.dscpListValue,
      'date': this.date,
      'kpiList': this.kpiListValue
    });

    this.liveViolationReportForm.setValue({
      'typeMultiCtrl': this.typeListValue,
      'directionList': this.directionListValue
    });

    this.violationData();
    this.options = {
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;
  
            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.floor(Math.random() * 10) + 0
                });
            }
            return data;
        }())
      }]
    };
    this.showLiveChart();
  }

  violationData() { 
      this.jsonUrlLiveViolationReport = "assets/data/report/reports-and-dashboard/twamp-live-violation-report.json";
      // /this.showLiveDashboard = "live-chart";
      this.httpService
        .get(this.jsonUrlLiveViolationReport)
        .subscribe((data: any[]) => {
          this.rowDataViolationReport = JSON.parse(JSON.stringify(data));
      });

      setTimeout(() => {
        this.dataShare.currentMessage.subscribe((message) => {
          this.sidenavBarStatus = message;
          this.fitViolationReportColumns();
        });
      }, 0);
  }

  ngAfterViewInit() {
    console.log(this.graphViolationChart);
  }

  onSubmit() {
    console.log(this.twampForm.value);
  }

  previousPage(currentPage) {
    if (currentPage == 'live-dashboard') {
      this.twampLiveViolationReportGridOptions.api.showLoadingOverlay();
      this.showLiveDashboard = 'live-dashboard';
      // this.httpService
      //   .get(this.jsonUrl)
      //   .subscribe((data: any[]) => {
      //     this.rowData = JSON.parse(JSON.stringify(data));
      //     this.getGroups(data, this.groupList[0], null, 'root');
      // });
    } else if(currentPage == 'live-violation-report') {
      this.showLiveDashboard = 'live-violation-report';
    }
  }
  createData(total, provision, live, delta) {
    var result = [];
    result.push({
      node: "Total: ",
      provision:  provision,
      liveSiteCount: live,
      delta: delta,
      direction: ''
    });
    return result;
  }

  public fitColumns() {
    if (this.twampGridOptions.api && this.rowData) {
      setTimeout(() => {
        this.twampGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }

  public fitViolationReportColumns() {
    if (this.twampLiveViolationReportGridOptions.api && this.rowDataViolationReport) {
      setTimeout(() => {
        this.twampLiveViolationReportGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }

  onViolationReportReady(event) {
    setTimeout(() => {
       this.fitViolationReportColumns();
    }, 0);
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
  
  openedChange(sda) {
    this.searchGeographyListValue = '';
    this.searchNodeListValue = '';
    this.searchDscpListValue = '';
    this.searchKpiListValue = '';
    this.searchTypeListValue = '';
    this.searchDirectionListValue = '';
   }

  onReady(event) {
    this.fitColumns();
  }
  onRowClicked(event: any) {
    this.jsonUrlLiveViolationReport = "bye";
    if(event.data.provision) {
      if (this.groupList[0].field === 'node') {
        if (event.data.expand === false) {
          this.onGroupClick(event.data, event.rowIndex, 'expand');
        } else if (event.data.expand === true) {
          this.onGroupClick(event.data, event.rowIndex, 'collapse');
        } else {
           this.liveViolationReport = event.data.node;
          this.showLiveDashboard = "live-violation-report";
        }
       
      }
    }else if (event.data.sapid && event.data.r4gstate) {
      this.showLiveDashboard = "graph-violation";
      this.displaySapIDName = event.data.sapid;
    }
  }

  setFirstHeaders(columnDefs: any) {
    this.firstHeaderGroup = columnDefs.map((element: { [x: string]: any }) => {
      return element['headerName'];
    });
  }
  setGroupDetails(level: number, field: string) {
    const item = new GroupLevel();
    item.level = level;
    item.field = field;
    this.groupList.push(item);
  }

  getGroups(
    data: any[],
    groupByLevel: GroupLevel,
    rowIndex: number,
    parent: string
  ) {
    const groupLevel = groupByLevel.field;
    const tempArray = [];

    const parentArray = JSON.parse(JSON.stringify(this.rowData));
    const groups = data.reduce((groups, item) => {
      const group = groups[item[groupLevel]] || [];
      group.push(item);
      groups[item[groupLevel]] = group;
      return groups;
    }, {});

    for (const key of Object.keys(groups)) {
      const tempItem = JSON.parse(JSON.stringify(groups[key]));
      const item = groups[key][0];
      item.zone = groups[key][0][groupLevel]; // parameter name of groupLevel should be assigned to column key
      item.expand = false;
      item.children = tempItem;
      item.level = groupByLevel.level;
      item.parent = parent;
      const obj = {};
      var i = 0;
      for (const parameter of item.children) {
        for (const index in parameter) {
          if (parameter.hasOwnProperty(index)) {
            if (!isNaN(parameter[index])) {
              if (obj[index] === undefined) {
                obj[index] = 0;
              }
              obj[index] = obj[index] + parseInt(parameter[index]);
            }
          }
        }
         i++;
      }
      for (const element in obj) {
        if (obj.hasOwnProperty(element)) {
          item[element] = obj[element];
        }
      }
      tempArray.push(item);
    }

    for (let k=0; k<tempArray.length; k++) {
      this.countProvision = parseInt(this.countProvision +tempArray[k].provision);
      this.countLive = parseInt(this.countLive +tempArray[k].liveSiteCount);
      this.countDelta = parseInt(this.countLive +tempArray[k].delta);
    }

    // arranging the chidren and parent element
    if (groupByLevel.level !== 1) {
      parentArray[rowIndex].expand = true;
      for (let i = 1; i <= tempArray.length; i++) {
        parentArray.splice(rowIndex + i, 0, tempArray[i - 1]);
      }
      this.rowData = JSON.parse(JSON.stringify(parentArray));
    } else {
      for (let i = 0; i <= tempArray.length; i++) {
        if (tempArray[i] != undefined)
        {
          for (let j = 0; j <= tempArray[i].children.length; j++) {
            if (tempArray[i].children[j] != undefined) {
              tempArray[i].children[j].node = '';
              // tempArray[i].children[j].expand = undefined;
            }
          }
        }
      }
      this.rowData = JSON.parse(JSON.stringify(tempArray));
      this.rowData1 = JSON.parse(JSON.stringify(tempArray));
    }
  }

  addToInput(event) {
    event.stopPropagation();
  }

  onGroupClick(
    row: { children: any; level: number; expand: boolean },
    index: number,
    action: string
  ) {
    const parentArray = JSON.parse(JSON.stringify(this.rowData));
    switch (action) {
      case 'expand':
        const array = row.children;
   
        if (row.level < this.groupList.length) {
          parentArray[index].expand = true;
          this.getGroups(
            array,
            this.groupList[row.level],
            index,
            parentArray[index].zone
          );
        } else {
          let i: number;
          for (i = 1; i <= array.length; i++) {
            array[i - 1].level = this.groupList.length + 1;
            array[i - 1].parent =
              array[i - 1][this.groupList[this.groupList.length - 1].field];
            parentArray.splice(index + i, 0, array[i - 1]);
          }
          parentArray[index].expand = true;
          //expansion works here
          this.rowData = JSON.parse(JSON.stringify(parentArray));
        }
        break;
      case 'collapse':
        const groupLevel = row.level;
        parentArray[index].expand = false;
        const i = ++index;
        while (
          parentArray[i] !== undefined &&
          (groupLevel < parentArray[i].level ||
            parentArray[i].level === undefined)
        ) {
          parentArray.splice(i, 1);
        }
        this.rowData = JSON.parse(JSON.stringify(parentArray));
        break;
      default:
        break;
    }
  }

  getContext() {
    return {
      twampGridOptions: this.twampGridOptions,
      onGroupClick: this.onGroupClick,
      groupList: this.groupList,
      getGroups: this.getGroups,
      rowData: this.rowData
    }
  }

  showLiveChart() {
    this.chart = new Chart({
          chart: {
              type: 'line',
              marginTop: 80,
              height: 400,
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

              formatter: function() {
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


      yAxis: [{
              min: 0,
              max: 100,
              title: {
                  text: 'PacketLoss (%)',
              },

          },

          {
              min: 0,
              max: 10,
              title: {
                  text: 'MOS',

              },

              opposite: true

          }, {
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

          { type: 'line',
              showInLegend: true,
              color: '#3eb3f3',
              name: 'MOS',
              yAxis: 1,
              visible: false,
              data: [3, 2, 3, 1, 5]

          },
          { type: 'line',
              showInLegend: true,
              color: '#f4c26e',
              name: 'Jitter',
              yAxis: 2,
              visible: false,
              data: [40, 50, 10, 20, 60]

          },

          { type: 'line',
              showInLegend: true,
              color: '#adff2f',
              visible: false,
              name: 'Best Effort Data Outage Simulation',
              data: [2, 1, 1, 3, 4]



          },
          { type: 'line',
              showInLegend: true,
              visible: false,
              color: '#ff0000',
              name: 'Latency',
              data: [6, 4, 1, 5, 4]
          }
      ]

  })
  }
}

function getValue(params: any) {
  if (params['data'].expand === false) {
    return (
      getspace(params.data) +
      '<span><span class="ic ic-circle-down grid-icon"></span>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else if (params['data'].expand === true) {
    return (
      getspace(params.data) +
      '<span><span class="ic ic-circle-up grid-icon"></span>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else {
    return '<span class="grid-space">'+params.value+'</span>';
  }
}

function getspace(item: { level: any }) {
  const level = item.level;
  let count: number;
  let i = 0;
  let spaceString = '&nbsp;';

  if (level === 1) {
    return '';
  }
  count = level;

  for (i; i < count * 3; i++) {
    spaceString = spaceString + '&nbsp;';
  }
  return spaceString;
}