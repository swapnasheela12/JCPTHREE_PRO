import { AlarmSummaryTableExpandComponent } from './table-view/alarm-summary-table-expand/alarm-summary-table-expand.component';
import { AlarmSummaryChartExpandComponent } from './chart-view/alarm-summary-chart-expand/alarm-summary-chart-expand.component';
import { FmDataSharingService } from './../../../../_services/fm-data-sharing.service';
import { dropdown, R4GState, JC, City, Node, GraphType, dataSourceOutdoor, dataSourceIndoor, dataSourceMacro } from './../../../../core/components/common-elements/type-dropdown-modulelist';

import { take, takeUntil, map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ReplaySubject, Subject, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewEncapsulation, Type, ɵNG_COMP_DEF } from '@angular/core';
import * as moment from 'moment';
declare let $: any;
import { MatSelect } from '@angular/material/select';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-alarm-summary',
  templateUrl: './alarm-summary.component.html',
  styleUrls: ['./alarm-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlarmSummaryComponent implements OnInit {

  selectDaily = ["Daily", "Weekly", "Monthly"];
  range = new FormGroup({
    start: new FormControl(Validators.required),
    end: new FormControl(Validators.required)
  });
  thirdFormGroup: FormGroup;

  ///////datepicker//////////
  opens = 'center';
  drops = 'up';
  public todaysDay = new Date();
  selectedDateTime: any;
  selectedDateTimeValue: boolean = false;
  invalidDates: moment.Moment[] = [];
  tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  ];
  ranges = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  rangeClicked(range): void {
    this.selectedDateTimeValue = true;
  }

  datesUpdated(range): void {
    this.selectedDateTimeValue = true;
  }


  tiles: Tile[] = [];
  public vendor = 'Samsung';
  public zoneType: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  // R4G Circle Dropdown
  @ViewChild('cityControlSelect') cityControlSelect: MatSelect;
  protected circleData = R4GState;
  public r4gCircleControl: FormControl = new FormControl();
  public r4gFilterControl: FormControl = new FormControl();
  public r4gFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // R4G Circle Dropdown

  // City Dropdown
  @ViewChild('cityNameControlSelect') cityNameControlSelect: MatSelect;
  protected cityData = City;
  public cityControl: FormControl = new FormControl();
  public cityFilterControl: FormControl = new FormControl();
  public cityFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // City Dropdown

  // Node Aggregation Dropdown
  @ViewChild('NodeTypeFilterControlSelect') NodeTypeFilterControlSelect: MatSelect;
  protected NodeTypeData = Node;
  public NodeTypeControl: FormControl = new FormControl();
  public NodeTypeFilterControl: FormControl = new FormControl();
  public NodeTypeFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Node Aggregation Dropdown

  // selectGraph Dropdown
  @ViewChild('selectGraphFilterControlSelect') selectGraphFilterControlSelect: MatSelect;
  protected selectGraphData = GraphType;
  public selectGraphControl: FormControl = new FormControl();
  public selectGraphFilterControl: FormControl = new FormControl();
  public selectGraphFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // selectGraph Dropdown

  // Select JC Dropdown
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Select JC Dropdown

  @ViewChild('dataSourceIndoorCtrlSelect') dataSourceIndoorCtrlSelect: MatSelect;
  protected dataSourceIndoorListData = dataSourceIndoor;
  public dataSourceIndoorCtrl: FormControl = new FormControl();
  public dataSourceIndoorFilterCtrl: FormControl = new FormControl();
  public dataSourceIndoorFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    public dataShareFM: FmDataSharingService,
    private router: Router,
    private location: Location,
    private overlayContainer: OverlayContainer,
  ) {
    // router.events.subscribe((url: any) => console.log(url));
    this.thirdFormGroup = this._formBuilder.group({
      selectedDateTime: [{
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
        // startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        // endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },Validators.required],
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }


  public projectName;
  ngOnInit(): void {

    this.zoneType.setValue("West");
    // R4G Circle Dropdown
    this.r4gCircleControl.setValue(this.circleData[1]);
    this.r4gFilter.next(this.circleData.slice());
    this.r4gFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.circleData,
          this.r4gFilterControl,
          this.r4gFilter
        );
      });
    // R4G Circle Dropdown

    // City Dropdown
    this.cityControl.setValue(this.cityData[1]);
    this.cityFilter.next(this.cityData.slice());
    this.cityFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.cityData,
          this.cityFilterControl,
          this.cityFilter
        );
      });
    // City Dropdown

    // Node Aggregation Dropdown
    this.NodeTypeControl.setValue(this.NodeTypeData[0]);
    this.NodeTypeFilter.next(this.NodeTypeData.slice());
    this.NodeTypeFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.NodeTypeData,
          this.NodeTypeFilterControl,
          this.NodeTypeFilter
        );
      });
    // Node Aggregation Dropdown

    // selectGraph Dropdown
    this.selectGraphControl.setValue([this.selectGraphData[0], this.selectGraphData[1], this.selectGraphData[2], this.selectGraphData[3], this.selectGraphData[4]]);
    this.selectGraphFilter.next(this.selectGraphData.slice());
    this.selectGraphFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.selectGraphData,
          this.selectGraphFilterControl,
          this.selectGraphFilter
        );
      });
    // selectGraph Dropdown

    // Select JC Dropdown
    this.selectJcControl.setValue(this.jcData[1]);
    this.selectJcFilter.next(this.jcData.slice());
    this.selectJcFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jcData,
          this.selectJcFilterControl,
          this.selectJcFilter
        );
      });
    // Select JC Dropdown

    this.dataSourceIndoorCtrl.setValue([this.dataSourceIndoorListData[0]]);
    this.dataSourceIndoorFilter.next(this.dataSourceIndoorListData.slice());
    this.dataSourceIndoorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.dataSourceIndoorListData,
          this.dataSourceIndoorFilterCtrl,
          this.dataSourceIndoorFilter
        );
      });

    let selectgraphArr = this.selectGraphControl.value;

    selectgraphArr.map(item => {
      return { text: item.name, cols: item.cols, rows: item.rows }
    }).forEach(item => this.tiles.push(item));

  }


  protected filterData(listData, filterCtrl, filterSubject) {
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
        data => data.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public toggleVersion;
  onChangeToggleVersion(item) {
  }

  public dataTransferToChild;
  getToolTipDEata(item) {
    let data = item.value;
    if (data && data.length) {
      let msg = "";
      data.forEach(res => {
        msg += res.name + ", ";
      })
      return msg;
    } else {
      return "please select graph";
    }
  }

  public isShownChartOrTable: boolean = false; // hidden by default
  public dataTransferToChart; // hidden by default

  toggleShow() {
    this.isShownChartOrTable = !this.isShownChartOrTable;
    if (this.isShownChartOrTable == false) {
      let objSendTable = {
        tableName: null,
        statusSingleView: null,
        chartOrTable: this.isShownChartOrTable
      }
      this.dataShareFM.changeMessageTitle(objSendTable);
    } else {
      let objSendTable = {
        tableName: null,
        statusSingleView: null,
        chartOrTable: this.isShownChartOrTable
      }
      this.dataShareFM.changeMessageTitle(objSendTable);
    }

  }

  expandViewWidget(graphType , viewType) {
    console.log(graphType, "graphType");
    this.openFlagConf(graphType,viewType)
  }

  openFlagConf(selectedGraph,viewType) {
    if (viewType == false) {
      const dialogRef = this.dialog.open(AlarmSummaryChartExpandComponent, {
        width: "700px",
        height: '500px',
        data: selectedGraph,
        panelClass: "material-dialog-container"
      });
    } else {
      const dialogRef = this.dialog.open(AlarmSummaryTableExpandComponent, {
        width: "750px",
        height: '500px',
        data: selectedGraph,
        panelClass: "material-dialog-container"
      });
    }

  }

  public tableWidget: boolean = true;

  tableViewWidget(tableView, viewVal, chartOrTable) {

    if (this.isShownChartOrTable == false) {
      this.isShownChartOrTable = true;
      let objSendTable = {
        tableName: tableView,
        statusSingleView: viewVal,
        chartOrTable: this.isShownChartOrTable
      }
      this.dataShareFM.changeMessageTitle(objSendTable);
    } else {
      this.isShownChartOrTable = false;
      let objSendTable = {
        tableName: tableView,
        statusSingleView: viewVal,
        chartOrTable: this.isShownChartOrTable
      }
      this.dataShareFM.changeMessageTitle(objSendTable);
    }
  }



}
