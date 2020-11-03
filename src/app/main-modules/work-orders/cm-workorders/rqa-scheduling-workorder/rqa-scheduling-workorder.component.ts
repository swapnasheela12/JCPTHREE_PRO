import { VerticaldotRendererComponent } from './../../../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { StatusRendererComponent } from './../../../modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { takeUntil } from 'rxjs/operators';
import { executionStatus, executionStatusDropdown } from './../../../../core/components/common-elements/type-dropdown-modulelist';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { ButtonRendererComponent } from './../../../reports-dashboards/my-reports/button-renderer.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { ISector_Grid } from './../../rf-oc-workorders/Irf-oc';
// import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { ViewChild, Input, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';
// import { GridOptions, GridCore, SelectionChangedEvent } from "@ag-grid-community/all-modules";
import { GridOptions, GridCore, SelectionChangedEvent, RowNode, Column } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';


declare var $: any;
// const PATHS = [
//   { createReport: "JCP/Modules/Performance-Management/Report-Builder/Create-Report" }
// ]
@Component({
  selector: 'app-rqa-scheduling-workorder',
  templateUrl: './rqa-scheduling-workorder.component.html',
  styleUrls: ['./rqa-scheduling-workorder.component.scss']
})
export class RqaSchedulingWorkorderComponent implements OnInit {

  @Input() commonTableAggrid: TemplateRef<any>;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  messageSubscription: Subscription;
  public gridFilterValueServices = {​​}​​;
  public frameworkComponentsReportBuilder = {
    statusFlagRenderer: StatusRendererComponent,
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public showGlobalOperation: Boolean = false;
  public rowSelection;

  executionStatusFormControl: FormGroup;
  ///////report measure/////////////
  public reportMeasureSelected = "Cancelled";
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  
  ///////report measure/////////////

  public durationType: string = "15 Mins";
  public opens = 'right';
  public drops = 'down';
  public todaysDay = new Date();
  public selectedDateTime: any;
  public selectedDateTimeValue: boolean = false;
  public selectDurationFrequency: FormGroup;
  public invalidDates: moment.Moment[] = [];
  public tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' },
  ];
  public ranges = {
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

  // executionStatus Dropdown 
  protected _onDestroy = new Subject<void>();
  @ViewChild('executionStatusControlSelect') executionStatusControlSelect: MatSelect;
  protected executionStatusData = executionStatus;
  public executionStatusControl: FormControl = new FormControl();
  public executionStatusFilterControl: FormControl = new FormControl();
  public executionStatusFilter: ReplaySubject<executionStatusDropdown[]> = new ReplaySubject<executionStatusDropdown[]>(1);
  // executionStatus Dropdown 


  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  public onReady(params) {
    console.log(params, "onReady");
    this.gridApi = params.api;
    this.calculateRowCount();
  }




  constructor(private _formBuilder: FormBuilder, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => console.log(url));

    router.events.subscribe((url: any) => console.log(url));
    // this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    console.log(this.gridOptions, " this.gridOptions");
    this.rowSelection = 'multiple';
    this.createColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get('assets/data/workorder/rqa-scheduling.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });

  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Work Order ID",
        field: "workorder",
        width: 250,
        pinned: 'left',
      }, 
      {
        headerName: "Actual Start Date & Time",
        field: "starttime",
        width: 180
      }, 
      {
        headerName: "Actual End Date & Time",
        field: "endttime",
        width: 180
      }, 
      {
        headerName: "Requested By",
        field: "request",
        width: 180
      },
      {
        headerName: "Approve Status",
        field: "status",
        width: 180
      },
       {
        headerName: "Execution Status",
        field: "execution",
        width: 180
      },
      {
        headerName: "",
        cellRenderer: 'dropDownThreeDotRenderer',
        width: 90,
        pinned: 'right',
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };


  shareStatus(params) {
    if (!params.data)
      return '';
    var status = params.data.status;
    var barColor = '';
    if (status == "Shared") {
      barColor = '#4188de';
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">' + status + '</div> <div class="shared_count">+' + params.data.sharecount + '</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
    ;
    return template;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  searchGrid = '';
  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {​​
    console.log(evt,"evt");
    this.gridFilterValueServices["filter"] = evt;
    this.eventsSubject.next(this.gridFilterValueServices);

  }​​;
  
  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
  };

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }




  ngOnInit(): void {
    this.selectDurationFrequency = this._formBuilder.group({
      recurEveryControl: '10',
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
    // ///////mat seletec report measure////////////
    this._mySelect.openedChange
      .subscribe((opened) => {
        if (!opened) {
          this.overlayContainer.getContainerElement().classList.remove('select-overlay');
        }
      });
    // ///////mat seletec report measure////////////
    this.executionStatusFormControl = this._formBuilder.group({

    });
    // executionStatus Dropdown 
    this.executionStatusControl.setValue([this.executionStatusData[1]]);
    this.executionStatusFilter.next(this.executionStatusData.slice());
    this.executionStatusFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.executionStatusData,
          this.executionStatusFilterControl,
          this.executionStatusFilter
        );
      });
    // executionStatus Dropdown 

  }

  public selectedLayerSearchValue;
  openedChange(sda) {
    this.selectedLayerSearchValue = '';
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
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





















}
