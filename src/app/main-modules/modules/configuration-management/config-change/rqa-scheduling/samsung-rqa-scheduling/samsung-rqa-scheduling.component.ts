import { FileUploadService } from './../../../../../../_services/file-upload.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { dropdown, R4GState, JC, City, JioCluster, SapId } from './../../../../../../core/components/common-elements/type-dropdown-modulelist';
import { DeleteRendererComponent } from './../../../../performance-management/change-impact-analysis/cia-module/renderer/delete-renderer.component';
import { Component, OnInit, ViewEncapsulation, ViewChild, Input, TemplateRef, ElementRef } from '@angular/core';
// import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commanPopup/file-upload-popup/file-upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { takeUntil, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
// import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs';
import { GridOptions, GridCore, SelectionChangedEvent } from "@ag-grid-community/all-modules";
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import * as moment from 'moment';

declare var $: any;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-samsung-rqa-scheduling',
  templateUrl: './samsung-rqa-scheduling.component.html',
  styleUrls: ['./samsung-rqa-scheduling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SamsungRqaSchedulingComponent implements OnInit {

  selectedRadio = "Manual Selection";
  showSuccessFailure: boolean = false;
  showSuccessKpiFailure: Boolean = false;
  selectJcCircleLevelFormControl: FormGroup;
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

  // Select JC Dropdown 
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Select JC Dropdown 

  // jio Cluster Dropdown 
  @ViewChild('jioClusterControlSelect') jioClusterControlSelect: MatSelect;
  protected jioClusterData = JioCluster;
  public jioClusterControl: FormControl = new FormControl();
  public jioClusterFilterControl: FormControl = new FormControl();
  public jioClusterFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // jio Cluster Dropdown 

  // jio Cluster Dropdown 
  @ViewChild('sapIdControlSelect') sapIdControlSelect: MatSelect;
  protected sapIdData = SapId;
  public sapIdControl: FormControl = new FormControl();
  public sapIdFilterControl: FormControl = new FormControl();
  public sapIdFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // jio Cluster Dropdown 

  trackByRadioButtonType(index: number, type: any): string {
    return type.name;
  }
  trackByChipsPost(index: number, postValue: any): string {
    return postValue;
  }
  trackByChipsPre(index: number, preValue: any): string {
    return preValue;
  }
  trackByRadioButtonFrequency(index: number, frequency: any): string {
    return frequency;
  }
  public radioTypeList: any[] = [
    { 'name': 'Bulk Upload' },
    { 'name': 'Manual Selection' }
  ];
  generateDisabled: boolean = true;

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
  public products;
  ///////report measure/////////////
  public reportMeasureSelected = "Performance Management";
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  reportsMeasureList: reportsMeasure[] = [
    { value: 'Configuration Management', viewValue: 'Configuration Management' },
    { value: 'LSMR', viewValue: 'LSMR' },
    { value: 'Performance Management', viewValue: 'Performance Management' },
    { value: 'Work Orders', viewValue: 'Work Orders' }
  ];
  ///////report measure/////////////

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

  public recurEveryControl: string = "10";
  public durationType: string = "15 Mins";
  public immediateType: boolean = false;
  public immediateTypeFunc(ev) {
    console.log(ev, "ev");
    this.immediateType = !this.immediateType;
    console.log(this.immediateType, "this.immediateType");
    if (this.immediateType) {
      this.selectDurationFrequency.controls['selectedDateTime'].disable();
      this.selectDurationFrequency.controls['recurEveryControl'].disable();
    } else {
      this.selectDurationFrequency.controls['selectedDateTime'].enable();
      this.selectDurationFrequency.controls['recurEveryControl'].enable();
    }

  }
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




  trackByCheckbox(index: number, checkboxSelect: any): string {
    return checkboxSelect.name;
  }

  public recurrencePatternCtrl: any;
  public recurrencePatternSelected = "";
  public recurrencePatternData: any[] = [
    { 'name': 'Daily' },
    { 'name': 'Weekly' },
    { 'name': 'Biweekly' },
    { 'name': 'Monthly' }
  ];

  public recurEveryTimesCtrl: any;
  public recurEveryTimesSelected = "";
  public recurEveryTimesData: any[] = [
    { 'name': 'Sunday' },
    { 'name': 'Monday' },
    { 'name': 'Tuesday' },
    { 'name': 'Wednesday' },
    { 'name': 'Thursday' },
    { 'name': 'Friday' },
    { 'name': 'Saturday' }
  ];



  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    private router: Router,
    private datatable: TableAgGridService,
    private fileUploadService: FileUploadService
  ) {
    // router.events.subscribe((url: any) => console.log(url));

    this.gridOptions = <GridOptions>{};
    this.httpClientRowData();
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.calculateRowCount();
    });



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

    this.selectJcCircleLevelFormControl = this._formBuilder.group({
    });
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

    // jio Cluster Dropdown 
    this.jioClusterControl.setValue(this.jioClusterData[1]);
    this.jioClusterFilter.next(this.jioClusterData.slice());
    this.jioClusterFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jioClusterData,
          this.jioClusterFilterControl,
          this.jioClusterFilter
        );
      });
    // jio Cluster Dropdown 

    // SAP Id Dropdown 
    this.sapIdControl.setValue(this.sapIdData[1]);
    this.sapIdFilter.next(this.sapIdData.slice());
    this.sapIdFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.sapIdData,
          this.sapIdFilterControl,
          this.sapIdFilter
        );
      });
    // SAP Id Dropdown 




  }



  @ViewChild("fileUploadSAP", { static: false }) fileUploadSAP: ElementRef; filesSAP = [];
  @ViewChild("fileUploadJC", { static: false }) fileUploadJC: ElementRef; filesJC = [];
  @ViewChild("fileUploadLSMR", { static: false }) fileUploadLSMR: ElementRef; filesLSMR = [];
  title: string;
  showExample: boolean;
  fileNameSAP: string;
  fileNameJC: string;
  fileNameLSMR: string;
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    this.fileUploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError(() => {
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
        }
      });
  }
  private uploadFiles() {
    this.fileUploadSAP.nativeElement.value = '';
    this.filesSAP.forEach(file => {
      this.fileNameSAP = file.data.name;

      this.uploadFile(file);
    });
  }
  private uploadFilesJC() {
    this.fileUploadJC.nativeElement.value = '';
    this.filesJC.forEach(file => {
      this.fileNameJC = file.data.name;

      this.uploadFile(file);
    });
  }
  private uploadFilesLSMR() {
    this.fileUploadLSMR.nativeElement.value = '';
    this.filesLSMR.forEach(file => {
      this.fileNameLSMR = file.data.name;
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUploadSAP = this.fileUploadSAP.nativeElement; fileUploadSAP.onchange = () => {
      const file = fileUploadSAP.files[0];
      this.filesSAP.push({ data: file });
      this.uploadFiles();
    };
    fileUploadSAP.click();
  }
  onClickJC() {
    const fileUploadJC = this.fileUploadJC.nativeElement; fileUploadJC.onchange = () => {
      const file = fileUploadJC.files[0];
      this.filesJC.push({ data: file });
      this.uploadFilesJC();
    };
    fileUploadJC.click();
  }
  onClickLSMR() {
    const fileUploadLSMR = this.fileUploadLSMR.nativeElement; fileUploadLSMR.onchange = () => {
      const file = fileUploadLSMR.files[0];
      this.filesLSMR.push({ data: file });
      this.uploadFilesLSMR();
    };
    fileUploadLSMR.click();
  }



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

  stepperChanged(event) {
    if (event.selectedIndex == 2) {
      this.generateDisabled = false
    } else {
      this.generateDisabled = true
    }
  }

  

  private httpClientRowData() {
    this.http
      .get("assets/data/configuration-management/rqa-scheduling/rqa-schedul.json")
      .subscribe(data => {
        this.rowData = data;
        // this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "SAP ID",
        field: "sapid",
        width: 305,
        pinned: 'left'
      }, {
        headerName: "Action",
        cellRenderer: 'deleteRenderer',
        width: 140
      }
    ];

    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };

  onFilterChanged(value) {
    console.log(value, "value");
    console.log(this.gridOptions.api.setQuickFilter(value), "valthis.gridOptions.api.setQuickFilter(value)ue");
    this.datatable.gridFilterValueServices = value;
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
  };

  //END table search
  //////////////////

  progressTaskFunc(params) {
    var taskcompletion = params.data.progressby;
    var taskprogress = params.data.progressbar;
    // var taskprogresscolor = params.data.taskColor;

    var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

    var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

    var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
    if (taskcompletion == "Generated") {
      return template1;
    } else if (taskcompletion == "#5 in Queue") {
      return template2;
    } else {
      return template3;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }













  

}
