import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { dropdown, Geography, City, JioCenter, JioCluster, NodeAggregation, Band } from './create-report-dropdown';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { HttpClient } from '@angular/common/http';
import { GridOptions, SelectionChangedEvent, RowNode, Column } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { DeleteRendererComponent } from './renderer/delete-renderer.component';
import { dropdownRendererComponent } from './renderer/dropdown-renderer.component';
import { conditionalDropdownRendererComponent } from './renderer/conditional-dropdown-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupPopupComponent } from './add-group-popup/add-group-popup.component';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';

const PATHS = [
  {goBack: "JCP/Modules/Performance-Management/Report-Builder"}
]

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateReportComponent implements OnInit {
  trackByCheckbox(index: number, checkboxSelect: any): string {
    return checkboxSelect.name;
  }
  trackByRadioButton(index: number, frequency: any): string {
    return frequency.name;
  }
  public paths;
  public disabled: boolean = false;
  // Geography Dropdown 
  @ViewChild('geographyControlSelect') geographyControlSelect: MatSelect;
  protected geographyData = Geography;
  public geographyControl: FormControl = new FormControl();
  public geographyFilterControl: FormControl = new FormControl();
  public geographyFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Geography Dropdown 

  // City Dropdown
  @ViewChild('cityControlSelect') cityControlSelect: MatSelect;
  protected cityData = City;
  public cityControl: FormControl = new FormControl();
  public cityFilterControl: FormControl = new FormControl();
  public cityFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // City Dropdown 

  // Jio Center Dropdown
  @ViewChild('jioCenterControlSelect') jioCenterControlSelect: MatSelect;
  protected jioCenterData = JioCenter;
  public jioCenterControl: FormControl = new FormControl();
  public jioCenterFilterControl: FormControl = new FormControl();
  public jioCenterFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Jio Center Dropdown 

  // Jio Cluster Dropdown
  @ViewChild('jioClusterFilterControlSelect') jioClusterFilterControlSelect: MatSelect;
  protected jioClusterData = JioCluster;
  public jioClusterControl: FormControl = new FormControl();
  public jioClusterFilterControl: FormControl = new FormControl();
  public jioClusterFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Jio Cluster Dropdown 

  // Node Aggregation Dropdown
  @ViewChild('nodeAggregationFilterControlSelect') nodeAggregationFilterControlSelect: MatSelect;
  protected nodeAggregationData = NodeAggregation;
  public nodeAggregationControl: FormControl = new FormControl();
  public nodeAggregationFilterControl: FormControl = new FormControl();
  public nodeAggregationFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Node Aggregation Dropdown 

  // Band Dropdown
  @ViewChild('bandFilterControlSelect') bandFilterControlSelect: MatSelect;
  protected bandData = Band;
  public bandControl: FormControl = new FormControl();
  public bandFilterControl: FormControl = new FormControl();
  public bandFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Band Dropdown 

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
  public modules: Module[] = AllCommunityModules;
  public leftColumnDefs;
  public fifteenMinsKpiColumnDefs;
  private gridApi;
  private gridColumnApi;
  public rowData;
  public dataFifteen;
  public rowSelection;
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
  protected _onDestroy = new Subject<void>();
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
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private http: HttpClient,
    public datashare: DataSharingService) {
    this.paths = PATHS;
    this.frameworkComponentsCreateKPIEditor = {
      'deleteFlagRenderer': DeleteRendererComponent,
      'dropDownCellRenderer': dropdownRendererComponent,
      'conditionalDropdownRenderer': conditionalDropdownRendererComponent
    };
  }

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };
  addGroupPopup(): void {
    const dialogRef = this.dialog.open(AddGroupPopupComponent, {
      width: '700px',
      height: 'auto',
      maxHeight: '500px',
      minHeight: '240px'
    });
  }
  openFileUploadPopup(): void {
    const title = `Upload Nodes`;
    var showExample = false;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '250px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
  }
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
  onKpiInput(value) {
    this.leftGridOptions.api.setQuickFilter(value);
  };
  onFiteenMinsKpiInput(value) {
    this.fifteenMinsKpiGridOptions.api.setQuickFilter(value);
  };
  ngOnInit() {
    // Geography Dropdown 
    this.geographyControl.setValue([this.geographyData[1]]);
    this.geographyFilter.next(this.geographyData.slice());
    this.geographyFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.geographyData,
          this.geographyFilterControl,
          this.geographyFilter
        );
      });
    // Geography Dropdown 

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

    // Jio Center Dropdown 
    this.jioCenterControl.setValue([this.jioCenterData[1]]);
    this.jioCenterFilter.next(this.jioCenterData.slice());
    this.jioCenterFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jioCenterData,
          this.jioCenterFilterControl,
          this.jioCenterFilter
        );
      });
    // Jio Center Dropdown 

    // Jio Cluster Dropdown 
    this.jioClusterControl.setValue([this.jioClusterData[4]]);
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
    // Jio Cluster Dropdown 

    // Node Aggregation Dropdown 
    this.nodeAggregationControl.setValue(this.nodeAggregationData[2]);
    this.nodeAggregationFilter.next(this.nodeAggregationData.slice());
    this.nodeAggregationFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeAggregationData,
          this.nodeAggregationFilterControl,
          this.nodeAggregationFilter
        );
      });
    // Node Aggregation Dropdown 

    // Band Dropdown 
    this.bandControl.setValue([this.bandData[2]]);
    this.bandFilter.next(this.bandData.slice());
    this.bandFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.bandData,
          this.bandFilterControl,
          this.bandFilter
        );
      });
    // Band Dropdown 

    this.overlayLoadingTemplate = `
      <span class="ag-overlay-loading-center no-data">
        Drag Here
      </span>
    `;
    this.overlayNoRowsTemplate = `
    <span class="ag-overlay-loading-center no-data">
      Drag Here
    </span>
  `;
    this.tooltipShowDelay = 0;
    this.fifteenMinsKpiColumnDefs = [
      {
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: false
      },
      {
        field: "Name",
        suppressMenu: true,
        rowDrag: true,
        tooltipField: 'Name',
        cellClass: 'first-draw-column'
      },
    ];
    this.leftColumnDefs = [
      {
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: false
      },
      {
        field: "Name",
        suppressMenu: true,
        rowDrag: true,
        tooltipField: 'Name',
        cellClass: 'first-draw-column'
      },
    ];
    this.rightColumnDefs = [
      {
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true
      },
      {
        headerName: 'Sr No.',
        maxWidth: 130,
        minWidth:130,
        cellRenderer: function (params) {
          return '<div>' + (params.rowIndex + 1) +'</div>'
        }
      },
      {
        headerName: 'KPI Name',
        field: "Name",
        tooltipField: 'Name',
        minWidth: 250,
      },
      {
        headerName: 'Threshold Condition',
        field: "thresholdCondition",
        minWidth: 240,
        cellRenderer: 'conditionalDropdownRenderer'
      },
      {
        headerName: 'Condition',
        field: "gridConditionValue",
        cellRenderer: 'dropDownCellRenderer',
        minWidth: 200,
      },
      {
        suppressMenu: true,
        cellRenderer: 'deleteFlagRenderer',
        width: 70,
        pinned: 'right',
      }
    ];

    this.rowData = this.createReportData();
    this.dataFifteen = this.fifteenMinsData();

    this.fifteenMinsKpiGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressCellSelection: true,
      suppressMoveWhenRowDragging: true,
      columnDefs: this.fifteenMinsKpiColumnDefs,
      animateRows: true
    };
    this.leftGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressCellSelection: true,
      suppressMoveWhenRowDragging: true,
      columnDefs: this.leftColumnDefs,
      animateRows: true
    };
    this.datashare.leftGridOptionMessage(this.leftGridOptions, this.rightGridOptions);
    this.datashare.fifteenMinsKpiOptionMessage(this.fifteenMinsKpiGridOptions, this.rightGridOptions);
    this.rightGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      frameworkComponents: this.frameworkComponentsCreateKPIEditor,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressHorizontalScroll: false,
      columnDefs: this.rightColumnDefs,
      suppressMoveWhenRowDragging: true,
      animateRows: true
    };

    this.selectKpiCtrl = this._formBuilder.group({
      keyName: ['', Validators.required]
    });
    this.selectNodeAndAggregationCtrl = this._formBuilder.group({
    });
    this.selectDurationFrequency = this._formBuilder.group({
      selectedDateTime: {
        startDate: moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 }),
      },
      alwaysShowCalendars: true,
      keepCalendarOpeningWithRange: true,
      showRangeLabelOnInput: true,
    });
  }

  kpiFilterChange(value) {
    this.leftGridOptions.api.setQuickFilter(value);
  }
  getRowNodeId(data: any) {
    return data.id;
  }
  createReportData() {
    this.http.get("assets/data/modules/performance_management/report-builder/create-kpi/kpi-list.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }
  fifteenMinsData() {
    this.http.get("assets/data/modules/performance_management/report-builder/create-kpi/15-mins-kpi-list.json")
      .subscribe(data => {
        this.dataFifteen = data;
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.addGridDropZone(
      params,
      this.leftGridOptions,
      this.rightGridOptions,
      this.rightAgGridFormGroup
    );
  }
  onGridReadyFifteenMinsKpi(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.addGridDropZone(
      params,
      this.fifteenMinsKpiGridOptions,
      this.rightGridOptions,
      this.rightAgGridFormGroup
    );
  }

  onGridRightReady(params) {
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setColumnsVisible(['thresholdCondition', 'gridConditionValue'], false);
    this.addGridDropLeftZone(params, this.rightGridOptions)
    this.addGridFifteenMiDropZone(params, this.fifteenMinsKpiGridOptions)
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
  kpiSearch(value) {
    this.leftGridOptions.api.setQuickFilter(value);
  };
  fifteenMinsKpiSearch(value) {
    this.fifteenMinsKpiGridOptions.api.setQuickFilter(value);
  };
  selectionChanged(event: SelectionChangedEvent) {
    if (1 <= event.api.getSelectedRows().length) {
      this.showGlobalDeleteOperation = true;
    } else {
      this.showGlobalDeleteOperation = false;
    }
    this.datashare.chechboxChangeMessage(this.showGlobalDeleteOperation);
  }

  bulkDelete(leftGridOptions, rightGridOptions, fifteenMinsKpiGridOptions) {
    let selectedNodes = this.rightGridOptions.api.getSelectedNodes();
    selectedNodes.forEach(function (node) {
      if (node.data["15MinValue"] == "No") {
        leftGridOptions.api.applyTransaction(
          {
            add: [node.data]
          }
        );
        rightGridOptions.api.applyTransaction(
          {
            remove: [node.data]
          }
        );
      }
      if (node.data["15MinValue"] == "Yes") {
        fifteenMinsKpiGridOptions.api.applyTransaction(
          {
            add: [node.data]
          }
        );
        rightGridOptions.api.applyTransaction(
          {
            remove: [node.data]
          }
        );
      }
      rightGridOptions.api.refreshCells({force: true});
    });
  }

  addGridDropZone(
    params,
    leftGridOptions,
    rightGridOptions,
    formGroup
  ) {
    let keyData = this.createKey;
    let dropZoneParams = this.rightGridOptions.api.getRowDropZoneParams({
      onDragStop: function (params) {
        var nodes = params.nodes;
        rightGridOptions.api.refreshCells({force: true});
        leftGridOptions.api.applyTransaction({
          remove: nodes.map(function (node) {
            return node.data;
          })
        });
        let columns = rightGridOptions.columnApi.getAllColumns();
        rightGridOptions.api.forEachNode((rowNode: RowNode) => {
          columns.filter(column => column.getColDef().field)
            .forEach((column: Column) => {
              rightGridOptions.api.refreshCells({ force: true, columns: [column] });
              const key = keyData(rowNode.id, column);
              formGroup.addControl(key, new FormControl())
              rightGridOptions.api.refreshCells({ force: true, columns: [column] });
              this.formGroup = formGroup;
            })
        });
      }
    });
    params.api.addRowDropZone(dropZoneParams);
  }

  addGridDropLeftZone(params, rightGridOptions) {
    let dropZoneParams = this.leftGridOptions.api.getRowDropZoneParams({
      onDragStop: function (params) {
        var nodes = params.nodes;
        rightGridOptions.api.applyTransaction({
          remove: nodes.map(function (node) {
            return node.data;
          })
        });
      }
    });
    params.api.addRowDropZone(dropZoneParams);
  }
  addGridFifteenMiDropZone(params, rightGridOptions) {
    let dropZoneParams = this.fifteenMinsKpiGridOptions.api.getRowDropZoneParams({
      onDragStop: function (params) {
        var nodes = params.nodes;
        rightGridOptions.api.applyTransaction({
          remove: nodes.map(function (node) {
            return node.data;
          })
        });
      }
    });
    params.api.addRowDropZone(dropZoneParams);
  }

  getContext() {
    return {
      formGroup: this.rightAgGridFormGroup,
      createKey: this.createKey
    }
  }

  createKey(rowId: string, column: Column): string {
    return `${column.getColId()}`;
  }

  selectNodeStepper(event) {
    if (event.selectedIndex == 3) {
      this.generateDisabled = false;
    } else {
      this.generateDisabled = true;
    }
  }
  reportTypeSelectValue(value, params) {
    if (value == "Exception Report") {
      this.gridColumnApi = params.columnApi;
      this.rightGridOptions.api.redrawRows();
      this.gridColumnApi.setColumnsVisible(['thresholdCondition', 'gridConditionValue'], true);
    }
    else {
      this.gridColumnApi = params.columnApi;

      this.rightGridOptions.api.redrawRows();
      this.gridColumnApi.setColumnsVisible(['thresholdCondition', 'gridConditionValue'], false);
    }
  }

}

