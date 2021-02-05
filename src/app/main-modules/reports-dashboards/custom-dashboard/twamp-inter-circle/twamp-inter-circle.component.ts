import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, SELECT_TIME_SPAN, TYPE_LIST, DIRECTION_LIST, type_dropdown, METRIC, SELECT_REPORT } from '../twamp-live-dashboard/twamp-live-dashboard.constant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { MatDialog } from '@angular/material/dialog';
import { InterCircleChartComponent } from './inter-circle-chart/inter-circle-chart.component';

export class GroupLevel {
  level = 0;
  field = '';
}
const dateFormat = DATE_FORMATS;
@Component({
  selector: 'app-twamp-inter-circle',
  templateUrl: './twamp-inter-circle.component.html',
  styleUrls: ['./twamp-inter-circle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ],
})
export class TwampInterCircleComponent implements OnInit {
  public displayName;
  public jsonUrl;
  //columnDefsViolationReport = COLUMNDEFSVIOLATIONREPORT;
  public gridColumnApi;
  columnDefs: any;
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
  selectReportValue: string = SELECT_REPORT[0].report;
  searchTimeListValue: string = SELECT_TIME_SPAN[0].time;
  metricListValue: string = METRIC[0].metric_name;
  nodeListValue: string = NODE_LIST[0].node_name;
  dscpListValue: string = DSCP_LIST[0].dscp_name;
  kpiListValue: string = KPI_LIST[0].kpi_name;
  typeListValue = TYPE_LIST[0].type_name;
  directionListValue: string = DIRECTION_LIST[0].direction_name;
  searchGeographyListValue;
  searchMetricListValue;
  searchSelectTimeListValue;
  searchReportListValue;
  searchNodeListValue;
  searchDscpListValue;
  searchKpiListValue;
  searchTypeListValue;
  searchDirectionListValue;
  url = 'assets/data/report/reports-and-dashboard/intercircle.json';
  //url_sla_voilation = 'assets/data/report/reports-and-dashboard/sla-violation.json'

  geographyList = GEOGRAPHY;
  selectReportList = SELECT_REPORT;
  metricList = METRIC;
  nodeList = NODE_LIST;
  dscpList = DSCP_LIST;
  kpiList = KPI_LIST;
  typeList = TYPE_LIST;
  directionList = DIRECTION_LIST;
  selectTimeList = SELECT_TIME_SPAN;

  date = moment();
  gridApi;
  gridOptions: GridOptions;
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
  chartConfig;

  ///////datepicker//////////
  opens = 'center';
  drops = 'up';
  thirdFormGroup: FormGroup;
  ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };
  selectedDateTime: any;
  selectedDateTimeValue: boolean = false;
  invalidDates: moment.Moment[] = [];
  tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  ];
  showCustomizeDateTime: boolean = false;


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
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
    this.fitColumns();
    
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(
    private httpService: HttpClient,
    private datePipe: DatePipe,
    private dataShare: DataSharingService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.frameworkComponentsTWAMP = {
      'AllExpandRenderer': AllExpandRendererComponent,
      customTooltip: CustomTooltip
    };
    this.displayName = history.state.display_name;
    this.displaySapIDName = "hello";
    this.jsonUrl = history.state.json_url;


    this.columnDefs = [{
      headerName: "From/To",
      field: "fromTo",
      width: 150,
      pinned: 'left'
    },
    {
      headerName: "Agra",
      field: "Agra",
      width: 140
    },
    {
      headerName: "Ambala",
      field: "Ambala",
      width: 140

    },
    {
      headerName: "Ahmedabad",
      field: "Ahmedabad",
      width: 140

    },
    {
      headerName: "Assansol",
      field: "Assansol",
      width: 140

    },
    {
      headerName: "Bhubneshwar",
      field: "Bhubneshwar",
      width: 140

    },
    {
      headerName: "Bangalore",
      field: "Bangalore",
      width: 140

    },
    {
      headerName: "Bhopal",
      field: "Bhopal",
      width: 140

    },
    {
      headerName: "Chennai",
      field: "Chennai",
      width: 140
    },
    {
      headerName: "Guwhati",
      field: "Guwhati",
      width: 100

    },
    {
      headerName: "Hyderabad",
      field: "Hyderabad",
      width: 120

    },
    {
      headerName: "Jaipur",
      field: "Jaipur",
      width: 100

    },
    {
      headerName: "Kolkata",
      field: "Kolkata",
      width: 100

    },
    {
      headerName: "Kochin",
      field: "Kochin",
      width: 100

    },
    {
      headerName: "Lucknow",
      field: "Lucknow",
      width: 100

    },
    {
      headerName: "Ludhiana",
      field: "Ludhiana",
      width: 100

    },
    {
      headerName: "Mumbai",
      field: "Mumbai",
      width: 100

    },
    {
      headerName: "Nagpur",
      field: "Nagpur",
      width: 100

    },
    {
      headerName: "Noida",
      field: "Noida",
      width: 100

    },
    {
      headerName: "Patna",
      field: "Patna",
      width: 100

    },
    {
      headerName: "Shimla",
      field: "Shimla",
      width: 100

    },
    {
      headerName: "Srinagar",
      field: "Srinagar",
      width: 150,
      pinned: 'right'
    }
    ]

    this.gridOptions = <GridOptions>{
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
      'metricList': new FormControl(''),
      'geographyList': new FormControl(''),
      'nodeList': new FormControl(''),
      'dscpList': new FormControl(''),
      'date': new FormControl(''),
      'kpiList': new FormControl(''),
      'selectTime': new FormControl(''),
      'selectReport': new FormControl('')
    });

    this.liveViolationReportForm = new FormGroup({
      'typeMultiCtrl': new FormControl(''),
      'directionList': new FormControl('')
    });
    this.liveViolationReportForm.setValue({
      'typeMultiCtrl': this.typeListValue,
      'directionList': this.directionListValue
    });
    this.stepperReportW();
  }
  stepperReportW() {
    this.thirdFormGroup = this.fb.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
        // startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        // endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
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

  
  }

  changeSelection(evt) {
    if(this.searchTimeListValue === "Customize") {
      this.showCustomizeDateTime = true;
    } else {
      this.showCustomizeDateTime = false;
    }
  }

  fitColumns() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellClicked(event: any) {
    const dialogRef = this.dialog.open(InterCircleChartComponent, {
      width: "75vw",
      height: "64vh",
      maxWidth: "97vw",
      panelClass: "material-dialog-container",
    });
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

}