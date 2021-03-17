import { takeUntil } from 'rxjs/operators';
import { executionStatus, executionStatusDropdown } from '../../../../../core/components/common-elements/type-dropdown-modulelist';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { ViewChild, Input, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GridOptions, GridCore } from 'ag-grid-community';
import * as _ from 'lodash';
import { ThreeDotRETRenderer } from '../threedot-ret-renderer.component';
import { DIRECTION_LIST, TYPE_LIST, DSCP_LIST } from 'src/app/main-modules/reports-dashboards/custom-dashboard/twamp-live-dashboard/twamp-live-dashboard.constant';
import { Status } from '../cell-details/cell-details.column.constant';
declare var $: any;

@Component({
  selector: 'app-wo-assignment',
  templateUrl: './wo-assignment.component.html',
  styleUrls: ['./wo-assignment.component.scss']
})
export class WoAssignmentComponent implements OnInit {

  public workorders:any = {};



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
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  public defaultColDef = { resizable: true };
  public frameworkComponentsReportBuilder = {
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public rowSelection;
  public executionStatusFormControl: FormGroup;
  liveViolationReportForm: FormGroup;
  searchDscpListValue;
  typeListValue = TYPE_LIST[0].type_name;
  dscpList = DSCP_LIST;
  directionListValue: string = DIRECTION_LIST[0].direction_name;

  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;

  protected statusData = executionStatus;
  public statusControl: FormControl = new FormControl();
  public statusFilterControl: FormControl = new FormControl();
  public statusFilter: ReplaySubject<any[]> = new ReplaySubject<executionStatusDropdown[]>(1);


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


  constructor(private location: Location,private _formBuilder: FormBuilder, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    this.router.events.subscribe((val) => {
      console.log(val,"val");

    });
    this.gridOptions = <GridOptions>{};
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

  routeLinkPage(pageName:string){
    console.log(pageName,"pageName");
    this.router.navigate(['JCP/Work-Orders/Cm-Workorders/RET-Change/Detail-View']);
    // this.router.events.subscribe((val) => {
    //   console.log(val,"val");

    // });

  }

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selected = -1;


  onChange(event) {
    console.log(event)
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Work Order ID",
        field: "workorder",
        width: 250,
        pinned: 'left',
        cellRenderer: function (params) {
          console.log(params, "params");
          let template = '<div>' +
            '<div style="line-height: 30px;color:#f28926">' + params.data.workorder + '</div>' +
            '<div style="line-height: 2px;">' + params.data.schedule + '</div>' +
            '</div>';
          return template;
          // return moment(params.data.creationTime).format('DD MMM, YYYY');
        }
      },
      {
        headerName: "Actual Start Date & Time",
        field: "starttime",
        width: 200
      },
      {
        headerName: "Actual End Date & Time",
        field: "endttime",
        width: 200
      },
      {
        headerName: "Requested By",
        field: "request",
        width: 180
      },
      {
        headerName: "Approval Status",
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
        cellRenderer: 'threeDotRetRenderer',
        width: 90,
        pinned: 'right',
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }


  searchGrid = '';
  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    console.log(evt, "evt");
    this.gridFilterValueServices["filter"] = evt;
    this.eventsSubject.next(this.gridFilterValueServices);

  };

  showInputField: boolean;
  toggleSearch() {
    this.showInputField = !this.showInputField;
  };


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
    // this._mySelect.openedChange
    //   .subscribe((opened) => {
    //     if (!opened) {
    //       this.overlayContainer.getContainerElement().classList.remove('select-overlay');
    //     }
    //   });
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
    this.liveViolationReportForm = new FormGroup({
      'typeMultiCtrl': new FormControl(''),
      'directionList': new FormControl('')
    });
    this.liveViolationReportForm.setValue({
      'typeMultiCtrl': this.typeListValue,
      'directionList': this.directionListValue
    });

    this.statusControl.setValue([this.statusData[1]]);
    this.statusFilter.next(this.statusData.slice());
    this.statusFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.statusData,
          this.statusFilterControl,
          this.statusFilter
        );
      });


      this.httpClient.get<any>('assets/data/workorder/ret-workorder/ret-workorder.json').subscribe({
        next: data => {
          console.log(data,"data>>???");

          var data = data;
          this.workorders.woassignment = _.filter(data, function(item) { return item.status == 'WO Assignment'; });
          console.log(this.workorders,"this.workorders");

          this.workorders.history = _.filter(data, function(item) { return item.status == 'History'; });
          this.workorders.pendingreviews = _.filter(data, function(item) { return item.status == 'Pending Reviews'; });
          this.workorders.completed = _.filter(data, function(item) { return item.status == 'Completed'; });

            // this.postId = data.id;
        },
        error: error => {
            // this.errorMessage = error.message;
            // console.error('There was an error!', error);
        }
    })





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

  public selectedLayerSearchValue;
  openedChange(sda) {
    this.selectedLayerSearchValue = '';


    this.searchDscpListValue = '';

  }

  tabChanged(event) {

  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
