import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, TWAMP_LIVE_VIOLATION_REPORT, TYPE_LIST, DIRECTION_LIST, type_dropdown } from '../twamp-live-dashboard/twamp-live-dashboard.constant';
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
  url = 'assets/data/report/reports-and-dashboard/intercircle.json';
  //url_sla_voilation = 'assets/data/report/reports-and-dashboard/sla-violation.json'

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
  chartConfig;
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
    this.displayName = history.state.display_name;
    this.displaySapIDName = "hello";
    this.jsonUrl = history.state.json_url;


    this.columnDefs = [{
      headerName: "From/To",
      field: "fromTo",
      width: 200,
    }, {
      headerName: "Agra",
      field: "Agra",
      width: 200
    },
    {
      headerName: "Ambala",
      field: "Ambala",
      width: 200

    },
    {
      headerName: "Ahmedabad",
      field: "Ahmedabad",
      width: 200

    },
    {
      headerName: "Assansol",
      field: "Assansol",
      width: 200

    },
    {
      headerName: "Bhubneshwar",
      field: "Bhubneshwar",
      width: 200

    },
    {
      headerName: "Bangalore",
      field: "Bangalore",
      width: 200

    },
    {
      headerName: "Bhopal",
      field: "Bhopal",
      width: 100

    },
    {
      headerName: "Chennai",
      field: "Chennai",
      width: 100

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
      width: 100

    }
    ]

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

  fitColumns() {
    if (this.twampGridOptions.api && this.rowData) {
      setTimeout(() => {
        this.twampGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }
  onReady(event) {
    this.fitColumns();
  }

  onCellClicked(event: any) {
    this.showSLAConformance = "sla-voilation";
    console.log(event.data);
    // this.slaGridOptions.api.showLoadingOverlay();
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