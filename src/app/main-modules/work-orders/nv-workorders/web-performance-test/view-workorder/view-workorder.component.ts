import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { GridCore, GridOptions } from '@ag-grid-community/core';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { WptModalComponent } from '../wpt-modal/wpt-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-workorder',
  templateUrl: './view-workorder.component.html',
  styleUrls: ['./view-workorder.component.scss']
})
export class ViewWorkorderComponent implements OnInit, AfterViewInit {
  templateType = ["Page Load Test", "Web Performance Test"];

  simType = ["Single Sim WO", "Dual Sim WO"]
  
  selectDaily = ["Daily", "Weekly", "Monthly"];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  thirdFormGroup: FormGroup;
  selected: {
    startDate: '2019-12-11T18:30:00.000Z',
    endDate: '2019-12-12T18:29:59.000Z',
  }

  selectedDeviceCount = 0;

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

  //ag-grid
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public sidenavBarStatus;
  public tableWidth;
  public gridPinned = false;
  public gridFilterValueServices = {};
  public frameworkComponentsTaskDetails = {
    dropdownRenderer: dropDownThreeDotRendererComponent,
    inputRenderer: inputRendererComponent,
  };


  showFileUploadwidget: boolean = false;
  uploadedImg = [];

  //imei
  imeiValue: string = "";
  selectDevice = [];

    //selectdevices grid
    public gridApiSelectDevice;
    public gridColumnApiSelectDevice;
    public gridCoreSelectDevice: GridCore;
    public gridOptionsSelectDevice: GridOptions;
    public rowDataSelectDevice: any;
    public columnDefsSelectDevice: any[];
    tooltipShowDelay:number = 0;

    // 
    minutes:any = [
      "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
            "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34",
            "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
            "52", "53", "54", "55", "56", "57", "58", "59", "60"
    ];
    sec:any = [
      "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
            "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34",
            "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
            "52", "53", "54", "55", "56", "57", "58", "59", "60"
    ];
    hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    ampm = ["AM", "PM"];

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService,
     private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {
    this.stepperReportW();
    this.gridOptions = <GridOptions>{};
    //this.rowSelection = 'multiple';
    this.createColumnDefs();
    this.httpClient.get("assets/data/workorder/nv-workorder/create-new-wo.json").subscribe((data) => {
      this.rowData = data;
    })
    this.httpClient.get("assets/data/workorder/nv-workorder/create-select-add-device.json").subscribe((data) => {
      this.rowDataSelectDevice = data;
    })
  }

  stepperReportW() {
    this.thirdFormGroup = this.fb.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days'),
        endDate: moment().subtract(1, 'days'),
        // startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        // endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }
  ngOnInit(): void {
    this.thirdFormGroup.controls['selectedDateTime'].disable();
  }

  ngAfterViewInit() {
    if(typeof(this.gridOptionsSelectDevice.api.getDisplayedRowCount()) == undefined) {
      this.selectedDeviceCount = 0;
    } else {
      this.selectedDeviceCount = this.gridOptionsSelectDevice.api.getDisplayedRowCount();
    }
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "URL Name",
        field: "urlName",
        width: 190,
        pinned: 'left'
      },
      {
        headerName: "Traceroute",
        field: "traceroute",
        width: 130
      },
      {
        headerName: "Ping",
        field: "ping",
        width: 100,
      },
      {
        headerName: "Location",
        field: "location",
        width: 150,
      },
      {
        headerName: "",
        width: 100,
        pinned: 'right'
      },
    ];

    this.columnDefsSelectDevice = [
      {
        headerName: "Select Device",
        field: "imei",
        width: '500'
      }
    ]
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);
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

  fileName: string;
  uploadFile(file) {
    this.fileName = file.data.name;
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
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      console.log("file", file)
      this.uploadFile(file);
    });
  }

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      console.log("file", file)
      this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }

  fitColumns() {
    if (this.gridOptionsSelectDevice.api && this.rowDataSelectDevice) {
      setTimeout(() => {
        this.gridOptionsSelectDevice.api.sizeColumnsToFit();
      }, 0);
    } 
  }
  onReady(event) {
    this.fitColumns();
  }

  onManualReady(event) {
    this.fitColumns();
  }

  addToSelectedDevice() {
    if(this.imeiValue) {
      this.selectDevice.push(this.imeiValue)
    }
  }

  addToGrid() {
    this.gridOptionsSelectDevice.api.addItems([{ imei: this.imeiValue}]);
  }

  assignWorkorder() {
    this.dialog.open(WptModalComponent, {
      width: "635px",
      height: "350px",
      panelClass: "material-dialog-container",
    } );
  }

  navigateBack() {
    this.router.navigate(["/JCP/Work-Orders/Nv-Workorders/Web-Performance-Test/"])
  }
}

