import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { GridCore, GridOptions } from '@ag-grid-community/core';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { FileUploadPopupComponent, fileUploadPopupModel } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { ThreeDotRegulatoryRenderer } from '../renderer/threedot-regulatory-renderer';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { EventDispatcher } from 'createjs-module';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';

@Component({
  selector: 'app-regulatory-create-new-workorder',
  templateUrl: './regulatory-create-new-workorder.component.html',
  styleUrls: ['./regulatory-create-new-workorder.component.scss']
})
export class RegulatoryCreateNewWorkorderComponent implements OnInit, AfterViewInit {
  templateType = ["Page Load Test", "Web Performance Test"];

  type = ["TRAI Data QoS", "TRAI Data QoS"];
  selectZone = ["West", "East", "North", "South"];
  selectCircle = ["Mumbai", "Hydrabad", "Pune"];

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

  //checkbox
  checked: boolean = true;

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

  //Bulk Order
  public rowDataBulkOrder;
  public gridOptionsBulkOrder;
  public columnDefsBulkOrder;

  //selectdevices grid
  public gridApiSelectDevice;
  public gridColumnApiSelectDevice;
  public gridCoreSelectDevice: GridCore;
  public gridOptionsSelectDevice: GridOptions;
  public rowDataSelectDevice: any;
  public columnDefsSelectDevice: any[];
  tooltipShowDelay:number = 0;

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
    inputRenderer: inputRendererComponent,
    deleteRenderer: DeleteRendererComponent
  };
  public frameworkRegulatory = {
    threedotEditDelete : ThreeDotRegulatoryRenderer
  }


  showFileUploadwidget: boolean = false;
  uploadedImg = [];

  //imei
  imeiValue: string = "";
  selectDevice = [];
  showUploadDevices = false;
  showImei = true;

  //show copy to new
  showCopyToNewWorkorder: boolean =  false;
  showCreateNewWorkorder: boolean =  false;

  //time picker
  timeSeletedHour = "00";
  timeSeletedMin = "00";
  timeSeletedSec = "00";
  hoursSeletedAMPM = "AM";
  minutes:any = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
          "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34",
          "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
          "52", "53", "54", "55", "56", "57", "58", "59"
  ]
  sec:any = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
          "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34",
          "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51",
          "52", "53", "54", "55", "56", "57", "58", "59"
  ]
  hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  ampm = ["AM", "PM"];
  rowClassRules;
  createNewWorkorder = "CREATENEWWO";

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService,
     private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {
    this.stepperReportW();
    this.gridOptions = <GridOptions>{};
    this.gridOptionsSelectDevice = <GridOptions>{};
    this.gridOptionsBulkOrder = <GridOptions>{};
    this.createColumnDefs();
    this.nbhWo();
    this.httpClient.get("assets/data/workorder/nv-workorder/regulatory/bulk-order.json").subscribe((data) => {
      this.rowDataBulkOrder = data;
    })
  }

  stepperReportW() {
    this.thirdFormGroup = this.fb.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days'),
        endDate: moment().subtract(1, 'days')
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
      disabled: true
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    if(typeof(this.gridOptionsSelectDevice.api.getDisplayedRowCount()) === undefined) {
      this.selectedDeviceCount = 0;
    } else {
      this.selectedDeviceCount = this.gridOptionsSelectDevice.api.getDisplayedRowCount();
    }
  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "",
        width: 50,
        pinned: 'left',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
      },
      {
        headerName: "Circle",
        field: "circle",
        width: 110
      },
      {
        headerName: "Jio Center",
        field: "jioCenter",
        width: 150,
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 200
      }
    ];  

    this.columnDefsSelectDevice = [
      {
        headerName: "Selection",
        field: "jioCenter",
        width: 150,
      },
      {
        headerName: "",
        field: "assignedTo",
        width: 250,
      },
      {
        headerName: "",
        cellRenderer: "deleteRenderer",
        width: 100,
      },

    ]

    this.columnDefsBulkOrder = [
      {
        headerName: "Zone",
        field: "zone",
        width: 150,
        pinned: 'left'
      },
      {
        headerName: "Circle",
        field: "circle",
        width: 130
      },
      {
        headerName: "Assigned To",
        field: "assignedTo",
        width: 250
      },
      {
        headerName: "Date From",
        field: "dateFrom",
        width: 170
      },
      {
        headerName: "Date to",
        field: "dateTo",
        width: 160
      },
      {
        headerName: "Start Time",
        field: "startTime",
        width: 170
      },
      {
        headerName: "Iterations",
        field: "iterations",
        width: 160
      },
      {
        headerName: "Waiting Period (s)",
        field: "waitingPeriod",
        width: 230
      },
      {
        headerName: "",
        cellRenderer: "threedotEditDelete",
        width: 90,
        pinned: 'right'
      }
    ];
  }

  selectionChanged(evt) {
    let selectedNodes = evt.api.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    this.rowDataSelectDevice = selectedData;
    this.selectedDeviceCount = this.rowDataSelectDevice.length;
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
      this.uploadFile(file);
    });
  }

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }

  addToSelectedDevice() {
    if(this.imeiValue) {
      this.selectDevice.push(this.imeiValue)
    }
  }

  addToGrid() {
    this.gridOptionsSelectDevice.api.addItems([{ imei: this.imeiValue}]);
    this.gridOptionsSelectDevice.api.refreshCells({force: true});
    this.selectedDeviceCount = this.gridOptionsSelectDevice.api.getDisplayedRowCount();
  }

  showUpload(evt) {
    if(evt.value === "2" || evt.value === "3") {
      this.showUploadDevices = true;
      this.showImei = false;
    } else {
      this.showUploadDevices = false;
      this.showImei = true;
    }
    
  }

  onGridSizeChanged(params) {
    if (this.gridOptionsSelectDevice.api && this.rowDataSelectDevice) {
      this.gridOptionsSelectDevice.api.sizeColumnsToFit();
    }
    if (this.gridOptions.api && this.rowData) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApiSelectDevice = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4); 
  }

  uploadBulk() {
    this.checked= false;
    this.rowData = [];
    this.rowDataSelectDevice = [];
    this.createNewWorkorder = "BULKUPLOAD";
  }

  nbhWo() {
    if(this.checked) {
      this.httpClient.get("assets/data/workorder/nv-workorder/regulatory/create-new-wo.json").subscribe((data) => {
        this.rowData = data;
      });
      this.httpClient.get("assets/data/workorder/nv-workorder/regulatory/create-select-add-device.json").subscribe((data) => {
        this.rowDataSelectDevice = data;
      });
    }
    else {
      this.rowData = [];
      this.rowDataSelectDevice = []
    }
  }


  bulkUpload(): void {
    const title = `Upload Files`;
    let showExample = false;
    let showFileDownload = false;
    let showCSVText = true;
    const dialogData = new fileUploadPopupModel("BULK Upload", showExample, showFileDownload, showCSVText);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'uploadClicked') {
      this.createNewWorkorder = "BULKUPLOAD";
      }
    })
  }


  assignWorkorder(): void {
    const message = `1. Yogeshwar.bargal@ril.com`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const showContentForCSV = true;
    const module = "REGULATORY";
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText, showContentForCSV, module);
    this.dialog.open(CommonPopupComponent, {
    data: dialogData
    });
  }

  navigateBackToCreateWO() {
    this.createNewWorkorder = "CREATENEWWO";
  }

  navigateBack() {
    this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Regulatory-Reporting"])
  }
}
