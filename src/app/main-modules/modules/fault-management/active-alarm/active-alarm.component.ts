import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
// import { StatusRendererComponent } from './renderer/status-renderer.component';
// import { VerticaldotRendererComponent } from './renderer/verticaldot-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import * as moment from 'moment';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { ActiveAlarmMenuComponent } from '../active-alarm-renderer/active-alarm-menu.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';


import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-active-alarm',
  templateUrl: './active-alarm.component.html',
  styleUrls: ['./active-alarm.component.scss']
})
export class ActiveAlarmComponent implements OnInit {
public optionvalue: any;
 // selected: {startDate: Moment, endDate: Moment};
public selected = moment();


//  locale: LocaleConfig = {
//    applyLabel: 'Appliquer',
//    customRangeLabel: ' - ',
//    daysOfWeek: moment.weekdaysMin(),
//    monthNames: moment.monthsShort(),
//    firstDay: moment.localeData().firstDayOfWeek(),
//  }
  public columnDefs: any[];
  public rowData: object;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKPIEditor;
  private gridColumnApi: any;
  public rowSelection;
  show: boolean;
  searchGrid = '';
  public showGlobalOperation:Boolean = false;
  private paginationPageSize = 20;
  public paths;
  
  public frameworkComponentsActiveAlarms =    {
   // verticaldropdownMenu: ActiveAlarmMenuComponent
  };

  reportType = 'KPI Report';
  mode = 'On Demand';
  domain = "RAN";
  vendor = "Airspan";
  opens = 'center';
  drops = 'down';
  particularHour = "02:00";
  checkboxSelectGroup = "Daily";
  geographyState = "R4G State";
  carrier = "850_2";
  //public modules: Module[] = AllCommunityModules;
  public leftColumnDefs;
  public fifteenMinsKpiColumnDefs;
 // private gridApi;
 // private gridColumnApi;
  //public rowData;
  public dataFifteen;
 // public rowSelection;
  public leftGridOptions: GridOptions;
  public rightGridOptions: GridOptions;
  public fifteenMinsKpiGridOptions: GridOptions;
  public rightColumnDefs;
  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;
  searchKpi = "";
  searchFifteenMinsKpi = "";
  generateDisabled: boolean = true;
  frequencyGroup = "Per Day";
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
  domainList: any = [
    {
      'domainName': 'RAN',
    },
    {
      'domainName': 'WiFi',
    },
    {
      'domainName': 'EPC',
    },
    {
      'domainName': 'Microwave',
    },
    {
      'domainName': 'IMS',
    },
    {
      'domainName': 'Transport',
    },
    {
      'domainName': 'IP',
    },
    {
      'domainName': 'Cross Domain',
    }
  ];
  frequencyList: any = [
    { 'name': 'Per Day' },
    { 'name': 'Per Week' },
    { 'name': 'Per Hour' },
    { 'name': 'Per Month' },
    { 'name': 'Busiest Day' },
    { 'name': 'BBH' },
    { 'name': 'NBH' },
    { 'name': 'Per 15 Mins' }
  ];
  particularHourList: any = [
    { 'hour': '00:00' },
    { 'hour': '01:00' },
    { 'hour': '02:00' },
    { 'hour': '03:00' },
    { 'hour': '04:00' },
    { 'hour': '05:00' },
    { 'hour': '06:00' },
    { 'hour': '07:00' },
    { 'hour': '08:00' },
    { 'hour': '09:00' },
    { 'hour': '10:00' },
    { 'hour': '11:00' },
    { 'hour': '12:00' },
    { 'hour': '13:00' },
    { 'hour': '14:00' },
    { 'hour': '15:00' },
    { 'hour': '16:00' },
    { 'hour': '17:00' },
    { 'hour': '18:00' },
    { 'hour': '19:00' },
    { 'hour': '20:00' },
    { 'hour': '21:00' },
    { 'hour': '22:00' },
    { 'hour': '23:00' },
  ];
  checkboxSelectList: any = [
    { 'name': 'Daily' },
    { 'name': 'Weekly' },
    { 'name': 'Monthly' }
  ];
  selectKpiCtrl: FormGroup;
  selectNodeAndAggregationCtrl: FormGroup;
  selectDurationFrequency: FormGroup;
 // protected _onDestroy = new Subject<void>();
  public frameworkComponentsCreateKPIEditor;
  public showGlobalDeleteOperation;
  kpiGridSearch = '';
  conditionValue = '';
  thresholdCondition = [
    '<=',
    '==',
    '>=',
    '<',
    '>',
    'Between'
  ];
  conditionValues = [
    'NONE',
    'OR',
    'AND'
  ];
  rightAgGridFormGroup: FormGroup = new FormGroup({});
  tooltipShowDelay: number;


  header_Active_Alarms = [
    {
      headerName: "Event Time",
      field: "eventtime",
      width: 180,
      
     
    }, {
      headerName: "Event Type",
      field: "eventtype",
      width: 210,
      pinned: 'left',
      cellClass: 'lock-pinned',
    }, {
      headerName: "Severity",
      field: "severity",
      width: 110
    }, {
      headerName: "Vendor",
      field: "vendor",
      width: 120
    }, {
      headerName: "JioCenter",
      field: "jiocenter",
      width: 120
    }, {
      headerName: "Circle",
      field: 'circle',
      width: 110
    },
    {
      headerName: "SAP ID",
     field: 'sapid',
     width: 160
    },
    {
      headerName: "Alarm Description",
      field: 'alarmdescription',
      width: 160,
      
    }, 
    {
      headerName: "Alarm Name",
      field: 'alarmname',
     
      width: 160
    }, 
    { 
      headerName: "Probable Cause",
      field: 'probablecause',
      width: 160
     
    },
    { 
      headerName: "Aging",
      field: 'aging',
      width: 160
     
    },
    { 
      headerName: "Impact Classification",
      field: 'impactclassification',
      width: 160
     
    },
    {
      headerName: "",
      cellRenderer:'verticaldropdownMenu',
      width: 70,
    //  id: "dot-rendered-active-alarm",
      pinned: 'right'

    }
  ];
  replytype: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
   
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
    this.paginationPageSize = 20;
  //  this.paths = PATHS;
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getActiveAlarmsData();
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private createColumnDefs() {
    this.columnDefs = this.header_Active_Alarms;
  }

  toggleSearch() {
    this.show = !this.show;
  };

  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getActiveAlarmsData() {
    this.http.get("assets/data/modules/fault-management/active-alarm.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  // openBulkDeleteDialog():void {
  //   const message = `Are you Sure you want to perform this action?`;
  //   const image = 'warning';
  //   const snackbarMode = 'success';
  //   const snackbarText = 'Action Performed Successfully';
  //   const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
  //   const dialogRef = this.dialog.open(CommonPopupComponent, {
  //     data: dialogData
  //   });
  // }

  // selectionChanged(event: SelectionChangedEvent) {
  //   if (1 < event.api.getSelectedRows().length) {
  //     this.showGlobalOperation = true;
  //   } else {
  //     this.showGlobalOperation = false;
  //   }
  //   this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  // }



  selectedvalue: any = '';;

  onSelectOption(event) {
    this.selectedvalue = event.target.value;
  }

  setReplyTypeValue() {
    // set 'predefined' or 'opentype' based on selected value of the form
     this.replytype = this.selectedvalue;
   }

}
