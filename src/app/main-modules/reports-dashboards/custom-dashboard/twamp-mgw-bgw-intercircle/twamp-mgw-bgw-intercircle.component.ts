import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ApplicationRef, Injector, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { GEOGRAPHY, NODE_LIST, DSCP_LIST, KPI_LIST, DATE_FORMATS, TWAMP_MGW_INTER_CIRCLE, TWAMP_PROBE_CIRCLEAB, TYPE_LIST, DIRECTION_LIST, type_dropdown } from '../twamp-live-dashboard/twamp-live-dashboard.constant';
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
  selector: 'app-twamp-mgw-bgw-intercircle',
  templateUrl: './twamp-mgw-bgw-intercircle.component.html',
  styleUrls: ['./twamp-mgw-bgw-intercircle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ]
})
export class TwampMgwBgwIntercircleComponent implements OnInit {
  public jsonUrl;
  columnDefs;
  columnDef: any;
  columnDefsTwampProbe: any;
  columnDefsTwampCircleB: any;

  twampGridOptions: GridOptions;
  twampProbeGridOptions: GridOptions;
  twampCircleBGridOptions: GridOptions;

  rowData = [];
  rowDataTwampProbe = [];
  rowDataTwampCircleB = [];

  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};

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
  url = 'assets/data/report/reports-and-dashboard/twamp-mgw-intercircle.json';
  url_twamp_intercircle = 'assets/data/report/reports-and-dashboard/twamp-probe-circle.json'
  url_twamp_circleb = 'assets/data/report/reports-and-dashboard/twamp-circleb.json'

  geographyList = GEOGRAPHY;
  nodeList = NODE_LIST;
  dscpList = DSCP_LIST;
  kpiList = KPI_LIST;
  typeList = TYPE_LIST;
  directionList = DIRECTION_LIST;

  date = moment();
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
  rowDataViolationReport: any;
  showSLAConformance = "sla-conformance";
  chart;
  chartConfig;
  options;
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

  @ViewChild('graphViolationChart', { static: true }) graphViolationChart: ElementRef;
  private _chart: any;
  constructor(
    private httpService: HttpClient,
    private dataShare: DataSharingService,
  ) {
    this.frameworkComponentsTWAMP = {
      'AllExpandRenderer': AllExpandRendererComponent,
      customTooltip: CustomTooltip
    };
    this.displaySapIDName = "hello";
    this.jsonUrl = history.state.json_url;
    this.columnDefs = TWAMP_MGW_INTER_CIRCLE;

    this.columnDefsTwampProbe = TWAMP_PROBE_CIRCLEAB;
    this.columnDefsTwampCircleB = TWAMP_MGW_INTER_CIRCLE;
    this.twampGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponentsTWAMP,
      context: {
        componentParent: this
      }
    };
    this.twampProbeGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponentsTWAMP,
      context: {
        componentParent: this
      }
    };
    this.twampCircleBGridOptions = <GridOptions>{
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
  }

  ngOnInit(): void {
    this.httpService.get(this.url).subscribe((data: any[]) => {
      this.rowData = data;
    });

    this.httpService.get(this.url_twamp_intercircle).subscribe((voilationResult: any) => {
      this.rowDataTwampProbe = voilationResult;
    });

    this.httpService.get(this.url_twamp_circleb).subscribe((voilationResult: any) => {
      this.rowDataTwampCircleB = voilationResult;
    });
  }

  fitColumns() {
    if (this.twampGridOptions.api && this.rowData) {
      setTimeout(() => {
        this.twampGridOptions.api.sizeColumnsToFit();
      }, 0);
    } else if (this.twampProbeGridOptions.api && this.rowDataTwampProbe) {
      setTimeout(() => {
        this.twampProbeGridOptions.api.sizeColumnsToFit();
      }, 0);
    } else if (this.twampCircleBGridOptions.api && this.rowDataTwampCircleB) {
      setTimeout(() => {
        this.twampCircleBGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }
  onReady(event) {
    this.fitColumns();
  }

  protected filterData(listData, filterCtrl, filterSubject) {
    let search = filterCtrl.value;
    if (!listData) {
      return;
    }
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
  onSubmit() {
    console.log(this.twampForm.value);
  }

}