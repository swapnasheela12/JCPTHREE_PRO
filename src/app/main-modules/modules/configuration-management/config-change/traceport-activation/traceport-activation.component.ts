import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { GridOptions } from 'ag-grid';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subject, ReplaySubject } from 'rxjs';
import { R4GState, dropdown, City, JC, JioCluster, SapId, TCEIPV6DATA } from 'src/app/core/components/common-elements/type-dropdown-modulelist';
import { MatSelect } from '@angular/material/select';
import { OverlayContainer } from '@angular/cdk/overlay';

interface dropDownListType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-traceport-activation',
  templateUrl: './traceport-activation.component.html',
  styleUrls: ['./traceport-activation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TraceportActivationComponent implements OnInit {
  generateDisabled: boolean = true;
  selectSchedule: FormGroup;
  scheduleDateTime: any;
  opens = 'right';
  drops = 'down';
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
  immediateType: boolean = false;
  radioTypeList: any[] = [
    { 'name': 'Bulk Upload' },
    { 'name': 'Manual Selection' }
  ];
  selectedRadio = "Manual Selection";
  fileNameSAP: string;
  @ViewChild("fileUploadSAP", { static: false }) fileUploadSAP: ElementRef; filesSAP = [];
  rowDataTracePortActivation=[];
  rowDataTracePortActivationManual = [];
  traceportGridOptions: GridOptions;
  traceportManualGridOptions: GridOptions;
  columnDefTracePortActivation: any;
  columnDefTracePortManualActivation: any;
  frameworkTraceport;
  sidenavBarStatus: {};
  tooltipShowDelay:number = 0;
  protected _onDestroy = new Subject<void>();
  selectJcCircleLevelFormControl: FormGroup;
  searchProject;
  searchElementType;
  searchVendor;
  searchVersion;
  searchImpactedList;
  searchUrgency;
  searchReasonChange;
  searchRisk;
  searchDomain;
  searchSubDomain;
  searchService;

  projectTypeList: dropDownListType[] = [
    { value: 'Cluster Optimization', viewValue: 'Cluster Optimization' },
    { value: 'City Optimization', viewValue: 'City Optimization' },
    { value: 'Customer Complain', viewValue: 'Customer Complain' },
    { value: 'ACME Testing', viewValue: 'ACME Testing' }
  ];
  projectTypeSelected = "Customer Complain";

  public networkElementTypeSelected = "ENB";
  networkElementTypeList: dropDownListType[] = [
    { value: 'ENodeB', viewValue: 'ENodeB' },
    { value: 'Small Cell', viewValue: 'Small Cell' },
    { value: 'ENB', viewValue: 'ENB' },
  ];
  public riskAssessmentSelected = "Low Risk";
  riskAssessmentList: dropDownListType[] = [
    { value: 'L1 Assurance', viewValue: 'L1 Assurance' },
    { value: 'Low Risk', viewValue: 'Low Risk' }
  ];
  public domainSelected = "Ran Operations";
  domainList: dropDownListType[] = [
    { value: 'Ran Operations', viewValue: 'Ran Operations' }
  ];
  public vendorSelected = "Samsung";
  vendorList: dropDownListType[] = [
    { value: 'Change RET info', viewValue: 'Change RET info' },
    { value: 'Samsung', viewValue: 'Samsung' }
  ];
  public versionSelected = "5.0.0-01";
  versionList: dropDownListType[] = [
    { value: '5.0.0-01', viewValue: '5.0.0-01' },
    { value: '5.0.0-02', viewValue: '5.0.0-02' }
  ];
  public subdomainSelected = "ENB";
  subdomainList: dropDownListType[] = [
    { value: 'ENB', viewValue: 'ENB' }
  ];

  public serviceSelected = "RAN eNB";
  serviceList: dropDownListType[] = [
    { value: 'RAN eNB', viewValue: 'RAN eNB' }
  ];

  public impactedSelected = "Circle";
  impactedList: dropDownListType[] = [
    { value: 'Circle', viewValue: 'Circle' },
    { value: 'JioCentre', viewValue: 'JioCentre' },
    { value: 'Cluster', viewValue: 'Cluster' },
    { value: 'eNodeB', viewValue: 'eNodeB' }
  ];

  public urgencySelected = "Catastrophe";
  urgencyList: dropDownListType[] = [
    { value: 'Catastrophe', viewValue: 'Catastrophe' },
    { value: 'High', viewValue: 'High' },
    { value: 'Low', viewValue: 'Low' },
    { value: 'Critical', viewValue: 'Critical' }
  ];

  public reasonForChangeSelected = "SW upgrade";
  reasonForChangeList: dropDownListType[] = [
    { value: 'SW upgrade', viewValue: 'SW upgrade' },
    { value: 'Testing', viewValue: 'Testing' }
  ];

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

  @ViewChild('tceIdControlSelect') tceIdControlSelect: MatSelect;
  protected tceData = TCEIPV6DATA;
  public tceipv6Control: FormControl = new FormControl();
  public tceipv6FilterControl: FormControl = new FormControl();
  public tceipv6Filter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private httpService: HttpClient,
    private datashare: DataSharingService,
    private overlayContainer: OverlayContainer
  ) {
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
  }

  ngOnInit(): void {
    this.selectSchedule = this.fb.group({
      recurEveryControl: '10',
      scheduleDateTime:  moment(),
        // endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),,
      alwaysShowCalendars: true,
      // keepCalendarOpeningWithRange: true,
      // showRangeLabelOnInput: true,
    });

    this.httpService.get('assets/data/configuration-management/traceport-activation/traceport-activation.json').subscribe((data: any[]) => {
      this.rowDataTracePortActivation = data;
      this.rowDataTracePortActivationManual = data;
    });

    
    this.columnDefTracePortActivation = this.columnDefTracePortManualActivation = [
      {
        headerName: "SAP ID",
        field: "sapid",
        width: 195,
        pinned: 'left',
        tooltipField: 'sapid',
        cellStyle:{'padding-right': 0}
      }, {
        headerName: "TCE IPv6",
        field: "ipv6",
        width: 320,
        cellStyle:{'padding-left': 0, 'padding-right': 0}
      }, {
        headerName: "Action",
        cellRenderer: 'deleteRenderer',
        width: 40,
        cellStyle:{'padding-left': 0, 'padding-right': 0},
        cellClass: 'no-border'
      }
    ];
    
    this.frameworkTraceport = {
      'deleteRenderer': DeleteRendererComponent
    };
    
    this.traceportGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkTraceport,
      defaultColDef: {
        resizable: true,
      }
    };
    this.traceportManualGridOptions = <GridOptions>{
      frameworkComponents: this.frameworkTraceport,
      defaultColDef: {
        resizable: true,
      }
    };

    this.selectJcCircleLevelFormControl = this.fb.group({
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

      // TCEIPV6 Dropdown 
    this.tceipv6Control.setValue(this.tceData[1]);
    this.tceipv6Filter.next(this.tceData.slice());
    this.tceipv6FilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.tceData,
          this.tceipv6FilterControl,
          this.tceipv6Filter
        );
      });
  }

  rangeClicked(range): void {
    this.scheduleDateTime = true;
  }

  datesUpdated(range): void {
    this.scheduleDateTime = true;
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

  public immediateTypeFunc(ev) {
    this.immediateType = !this.immediateType;
    console.log(this.immediateType, "this.immediateType");
    if (this.immediateType) {
      this.selectSchedule.controls['scheduleDateTime'].disable();
    } else {
      this.selectSchedule.controls['scheduleDateTime'].enable();
    }
  }

  trackByRadioButtonType(index: number, type: any): string {
    return type.name;
  }

  onClick() {
    const fileUploadSAP = this.fileUploadSAP.nativeElement; fileUploadSAP.onchange = () => {
      const file = fileUploadSAP.files[0];
      this.filesSAP.push({ data: file });
      this.uploadFiles();
    };
    fileUploadSAP.click();
  }

  private uploadFiles() {
    this.fileUploadSAP.nativeElement.value = '';
    this.filesSAP.forEach(file => {
      this.fileNameSAP = file.data.name;

      this.uploadFile(file);
    });
  }

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

  fitColumns() {
    if (this.traceportGridOptions.api && this.rowDataTracePortActivation) {
      setTimeout(() => {
        this.traceportGridOptions.api.sizeColumnsToFit();
      }, 0);
    } else if (this.traceportManualGridOptions.api && this.rowDataTracePortActivationManual) {
      setTimeout(() => {
        this.traceportManualGridOptions.api.sizeColumnsToFit();
      }, 0);
    }
  }
  onReady(event) {
    this.fitColumns();
  }

  onManualReady(event) {
    this.fitColumns();
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  addToGrid() {
    this.traceportManualGridOptions.api.addItems([{ sapid: this.sapIdControl.value.name, ipv6: this.tceipv6Control.value.name}]);
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
      this.generateDisabled = false;
    } else {
      this.generateDisabled = true;
    }
  }
}
