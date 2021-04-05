import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DOMAIN, NODE, dropdown, NodeAggr, AddFormula, subcatAggr, hierarchical } from './create-kpi-constant';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { HttpClient } from '@angular/common/http';
import { GridOptions, SelectionChangedEvent, RowNode, Column } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { DeleteCreatedKpiRendererComponent } from '../renderer/delete-renderer.component';
import { createKpiDropdownRendererComponent } from '../renderer/dropdown-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { ComputationSettingsPoupComponent } from './computation-settings-poup/computation-settings-poup.component';
import { IfElsePopupComponent } from './if-else-popup/if-else-popup.component';
import { HextodocPopupComponent } from './hextodoc-popup/hextodoc-popup.component';
import * as _ from "lodash";
import { CeilingPopupComponent } from './ceiling-popup/ceiling-popup.component';
import { FloorPopupComponent } from './floor-popup/floor-popup.component';
import * as moment from 'moment';
import { MatOption } from '@angular/material/core';

const PATHS = [
  { goBack: "JCP/Modules/Performance-Management/KPI-Editor" }
]
@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CreateKpiComponent implements OnInit {
  public paths;
  selectNodeCtrl: FormGroup;
  counterKPICtrl: FormGroup;
  defineFormulaCtrl: FormGroup;
  protected _onDestroy = new Subject<void>();
  stepperLabelText = 'Select Node & Counter';
  searchGrid = "";
  searchSecondGrid = "";
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = AllCommunityModules;
  public leftColumnDefs;
  public rowData;
  public rowDataFormula;
  public rowSelection;
  public leftGridOptions: GridOptions;
  public rightGridOptions: GridOptions;
  public rightColumnDefs;
  public leftColumnFormulaDefs;
  public rightColumnFormulaDefs;
  formulaSearch = "";
  formula = "";
  public pageData;

  @ViewChild('nodeAggrControlSelect') nodeAggrControlSelect: MatSelect;
  protected nodeAggrData = NodeAggr;
  public nodeAggrControl: FormControl = new FormControl();
  public nodeAggrFilterControl: FormControl = new FormControl();
  public nodeAggrFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('subcatAggrControlSelect') subcatAggrControlSelect: MatSelect;
  protected subcatData = subcatAggr;
  public subcatAggrControl: FormControl = new FormControl();
  public subcatAggrFilterControl: FormControl = new FormControl();
  public subcatAggrFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('hierarchicalControlSelect') hierarchicalControlSelect: MatSelect;
  protected hierarchicalData = hierarchical;
  public hierarchicalControl: FormControl = new FormControl();
  public hierarchicalFilterControl: FormControl = new FormControl();
  public hierarchicalFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('domainCtrlSelect') domainCtrlSelect: MatSelect;

  protected domainListData = DOMAIN;
  public domainCtrl: FormControl = new FormControl();
  public domainFilterCtrl: FormControl = new FormControl();
  public domainFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('formulaCtrlSelect') formulaCtrlSelect: MatSelect;
  protected formulaData = AddFormula;
  public formulaCtrl: FormControl = new FormControl();
  public formulaFilterCtrl: FormControl = new FormControl();
  public formulaFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('nodeMultiCtrlSelect') nodeMultiCtrlSelect: MatSelect;
  protected nodeMultiListData = NODE;
  public nodeMultiCtrl: FormControl = new FormControl();
  public nodeMultiFilterCtrl: FormControl = new FormControl();
  public nodeMultiFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  public frameworkComponentsCreateKPIEditor;
  public showGlobalDeleteOperation;
  kpiGridSearch = '';
  nodeAggrValue = '';
  timeAggrValue = '';
  TimeAggr = [
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'SUM'
  ];

  domain = 'RAN';
  createKPIForm = new FormGroup({
    nodeAggr: new FormControl(null, Validators.required),
    timeAggr: new FormControl(null, Validators.required)
  });

  addFormulaForm = new FormGroup({
    Formula: new FormControl(null, Validators.required),
    percentageOfNodes: new FormControl(),
    countNodes: new FormControl()
  });
  @ViewChild('allSelected') private allSelected: MatOption;

  selectedNodesDetails = [];
  formGroup: FormGroup = new FormGroup({});
  formGroupFormula: FormGroup = new FormGroup({});
  overlayLoadingTemplate;
  overlayNoRowsTemplate;
  selectedRow;
  rowClassRules;
  getRowStyle;
  fifteenMinsKpiGridOptions: GridOptions;
  dataFifteen;
  dataFormula;
  fifteenMinsKpiColumnDefs;
  leftGridOptionsFormula: GridOptions;
  percentageNodesChecked: false;
  countNodesChecked: false;
  rightGridOptionsFormula: GridOptions;
  gridConditionValue1: '';
  tooltipShowDelay: number;
  status: string;
  disabledGenerate: boolean = true;
  disabledHierachy: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    public dialog: MatDialog

  ) {
    this.paths = PATHS;
    this.datashare.chechboxChangeMessage(this.leftGridOptions);
    this.frameworkComponentsCreateKPIEditor = {
      'deleteFlagRenderer': DeleteCreatedKpiRendererComponent,
      'dropDownCellRenderer': createKpiDropdownRendererComponent
    };
  }

  ngOnInit() {
    if (this.domain !== 'RAN') {
      this.disabledHierachy = true;
    } else {
      this.disabledHierachy = false;
    }

    if (this.nodeAggrData.some(hierAggr => hierAggr.name === 'None' )){
      this.nodeAggrData.pop();
    }
    if (this.domain !== 'RAN') {
      // this.disabledHierachy = true;
      this.nodeAggrData.push({name: 'None', abbr:'None'});
      this.nodeAggrFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeAggrData,
          this.nodeAggrFilterControl,
          this.nodeAggrFilter
        );
      });
    }
   
    //this.createKPItriggered();
    this.nodeAggrControl.setValue(this.nodeAggrData[1]);
    this.nodeAggrFilter.next(this.nodeAggrData.slice());
    this.nodeAggrFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeAggrData,
          this.nodeAggrFilterControl,
          this.nodeAggrFilter
        );
      });

      this.subcatAggrControl.setValue(this.subcatData[3]);
      this.subcatAggrFilter.next(this.subcatData.slice());
      this.subcatAggrFilterControl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterData(
            this.subcatData,
            this.subcatAggrFilterControl,
            this.subcatAggrFilter
          );
        });

      this.hierarchicalControl.setValue([this.hierarchicalData[0], this.hierarchicalData[1], this.hierarchicalData[2]]);
      this.hierarchicalFilter.next(this.hierarchicalData.slice());
      this.hierarchicalFilterControl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterData(
            this.hierarchicalData,
            this.hierarchicalFilterControl,
            this.hierarchicalFilter
          );
        });
    this.tooltipShowDelay = 0;
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
    this.leftColumnFormulaDefs = [
      {
        field: "Name",
        suppressMenu: true,
        tooltipField: 'Name',
        rowDrag: true,
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
        headerName: 'Counter/KPI',
        tooltipField: 'Name',
        field: "Name"
      },
      {
        headerName: 'Hierarchical Aggr',
        field: "nodeAggr",
        cellRenderer: 'dropDownCellRenderer'
      },
      {
        headerName: 'Time Aggr',
        field: "timeAggr",
        cellRenderer: 'dropDownCellRenderer'
      },
      {
        headerName: '',
        suppressMenu: true,
        maxWidth: 30,
        cellRenderer: 'deleteFlagRenderer',
        pinned: 'right'
      }
    ];

    this.rightColumnFormulaDefs = [
      {
        headerName: 'Sr No.',
        field: "id",
        maxWidth: 120,
        cellRenderer: function (params) {
          return '<div>' + (params.rowIndex + 1) + '</div>'
        }
      },
      {
        headerName: 'Formula',
        field: "Name",
        valueGetter: function (params) {
          return '(' + params.data.Name + ')';
        },
      }
    ];
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
        cellClass: 'first-draw-column'
      },
    ];
    this.rowData = this.createKPIData();
    this.dataFifteen = this.fifteenMinsData();
    this.dataFormula = this.createFormulaData();

    this.leftGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.leftColumnDefs,
      animateRows: true
    };
    this.datashare.leftGridOptionMessage(this.leftGridOptions, this.rightGridOptions);
    this.leftGridOptionsFormula = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.leftColumnFormulaDefs,
      animateRows: true
    };

    this.rightGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      frameworkComponents: this.frameworkComponentsCreateKPIEditor,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.rightColumnDefs,
      suppressMoveWhenRowDragging: true,
      animateRows: true
    };
    this.rightGridOptionsFormula = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.rightColumnFormulaDefs,
      suppressMoveWhenRowDragging: true,
      animateRows: true,
      suppressRowDrag: true
    };
    this.rowClassRules = {
      'green': function (params) {
        if (params.data.statusFormula == 'success') {
          return true;
        }
      },
      'red': function (params) {
        if (params.data.statusFormula == 'error') {
          return true;
        }
      }
    }
    this.fifteenMinsKpiGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
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
      suppressHorizontalScroll: true,
      suppressMoveWhenRowDragging: true,
      columnDefs: this.fifteenMinsKpiColumnDefs,
      animateRows: true
    };
    this.datashare.fifteenMinsKpiOptionMessage(this.fifteenMinsKpiGridOptions, this.rightGridOptions);
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

    this.selectNodeCtrl = this._formBuilder.group({
      keyName: ['key_name', Validators.required]
    });
    this.counterKPICtrl = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.defineFormulaCtrl = this._formBuilder.group({})

    this.domainCtrl.setValue(this.domainListData[1]);
    this.domainFilter.next(this.domainListData.slice());
    this.domainFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.domainListData,
          this.domainFilterCtrl,
          this.domainFilter
        );
      });

    this.nodeMultiCtrl.setValue([this.nodeMultiListData[1]]);
    this.nodeMultiFilter.next(this.nodeMultiListData.slice());
    this.nodeMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeMultiListData,
          this.nodeMultiFilterCtrl,
          this.nodeMultiFilter
        );
      });

    this.formulaCtrl.setValue([this.formulaData[1]]);
    this.formulaFilter.next(this.formulaData.slice());
    this.formulaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.formulaData,
          this.formulaFilterCtrl,
          this.formulaFilter
        );
      });

  }
  
  //POP UP PAGE HAS TRIGGERED
  createKPItriggered() {
    let pageId = {
      id: 703,
      time: this.setCurrentTimestamp(),
      type: "other",
      page: "popup"
    }
    this.pageData = pageId;
    this.datashare.sendTimestampPopupOpenFn(pageId.time);
  }

  //TERMINATE THE CURRENT TIME OF THE PAGE
  closeCreateKPIPopup(){
    //this.terminateRunningTime();
  }
  
  setCurrentTimestamp() {
    const currentdate = Date.now();
    const timestamp = moment(currentdate);
    timestamp.format('h:mm:ss');
    return timestamp;
  }


  // CALCULATE TIME A ND SEND IT TO HOME JCP COMPONENT
  terminateRunningTime() {
    let currentTime = this.setCurrentTimestamp();
    let pageTime = this.pageData.time;
    let timeSpent = this.calculateTimeDifference(currentTime, pageTime);
    let timeObject = {
      timeSpent: timeSpent,
      screenId: 703,
      userId: 7722778
    };
    this.datashare.sendCalcuateTimeToHomeJcpPageFn(timeObject)
  }

  calculateTimeDifference(endTime, startTime) {
    let totalHours = endTime.diff(startTime, 'hours');
    let totalMinutes = endTime.diff(startTime, 'minutes');
    let totalSeconds = endTime.diff(startTime, 'seconds');
    let clearMinutes = totalMinutes % 60;
    let clearSeconds = totalSeconds % 60;

    let hours = `${totalHours}`.length == 1 ? "0" + `${totalHours}` : totalHours
    let minutes = `${clearMinutes}`.length == 1 ? "0" + `${clearMinutes}` : clearMinutes;
    let seconds = `${clearSeconds}`.length == 1 ? "0" + `${clearSeconds}` : clearSeconds

    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  kpiFilterChange(value) {
    this.leftGridOptions.api.setQuickFilter(value);
  }

  secondGridChange(value) {
    this.fifteenMinsKpiGridOptions.api.setQuickFilter(value);
  }

  searchFormulaGrid(value) {
    this.leftGridOptionsFormula.api.setQuickFilter(value);
  }

  getRowNodeId(data: any) {
    return data.id;
  }

  createKPIData() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/create-kpi-list.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }

  validateFormula() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/kpi-status-formula.json")
      .subscribe(data => {
        this.status = (data[0].statuskpi == 'success') ? 'green' : 'red';
      });
  }
  onChangeFormula(conditionValue) {
    if ('If-Else' == conditionValue) {
      const dialogRef = this.dialog.open(IfElsePopupComponent, {
        width: '980',
        height: '400px'
      });
    } else if ('HextoDec' == conditionValue) {
      const dialogRef = this.dialog.open(HextodocPopupComponent, {
        width: '460px',
        height: '320px'
      });
    } else if ('Ceiling' == conditionValue) {
      const dialogRef = this.dialog.open(CeilingPopupComponent, {
        width: '460px',
        height: '320px'
      });
    } else if ('Floor' == conditionValue) {
      const dialogRef = this.dialog.open(FloorPopupComponent, {
        width: '460px',
        height: '320px'
      });
    }
  }
  clearList() {
    document.querySelector('#textareaFormula').innerHTML = ''
  }

  clearListCounter(leftGridOptions, rightGridOptions, fifteenMinsKpiGridOptions) {
    let selectedNodes = this.rightGridOptions.api.getRenderedNodes();
    selectedNodes.forEach(function (node) {
      if (node.data["KPIValue"] == "Yes") {
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
      if (node.data["KPIValue"] == "No") {
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
    });
  }
  // addGridDropFormulaLeftZone(rightGridOptionsFormula) {
  //   let allRightNodes = this.rightGridOptionsFormula.api.forEachNode(
  //     (node) => {
  //       this.leftGridOptionsFormula.api.applyTransaction(
  //         {
  //           add: [node.data]
  //         }
  //       );
  //       this.rightGridOptionsFormula.api.applyTransaction(
  //         {
  //           remove: [node.data]
  //         }
  //       );
  //     }
  //   )
  // }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.addGridDropZone(
      params,
      this.leftGridOptions,
      this.rightGridOptions,
      this.formGroup
    );
  }

  onGridReadyFifteenMinsKpi(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.addGridDropZone(
      params,
      this.fifteenMinsKpiGridOptions,
      this.rightGridOptions,
      this.formGroup
    );
  }

  onGridleftReadyFormula(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.addGridDropFormulaZone(
      params,
      this.leftGridOptionsFormula
    )
  }

  fifteenMinsData() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/create-counter-list.json")
      .subscribe(data => {
        this.dataFifteen = data;
      });
  }

  createFormulaData() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/kpi-formula.json")
      .subscribe(data => {
        this.dataFormula = data;
      });
  }

  onApply() {
    this.rightGridOptions.getRowStyle = function (params) {
      if (params.data.statusFormula == 'success') {
        return { backround: 'green' }
      }
      if (params.data.statusFormula == 'error') {
        return { backround: 'red' }
      }
    }
    this.selectedNodesDetails.length = 0;
    this.nodeAggrValue = this.createKPIForm.value.nodeAggr;
    this.timeAggrValue = this.createKPIForm.value.timeAggr;
    let selectedNodes = this.rightGridOptions.api.getSelectedNodes();
    let columns = this.rightGridOptions.columnApi.getAllColumns();
    selectedNodes.forEach((node) => {
      this.selectedRow = 'AVG';
      this.selectedNodesDetails.push(node.id)
      var data = node.data;
      node.data.timeAggr = this.timeAggrValue;
      node.data.nodeAggr = this.nodeAggrValue;

      this.rightGridOptions.api.refreshCells({ force: true });
    });
  }

  onGridRightReady(params) {
    this.addGridDropLeftZone(params, this.rightGridOptions);
    this.addGridFifteenMiDropZone(params, this.fifteenMinsKpiGridOptions)
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
      if (node.data["KPIValue"] == "Yes") {
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
      if (node.data["KPIValue"] == "No") {
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
    });
  }

  selectNodeStepper(event) {
    if (event.selectedIndex == 1) {
      this.stepperLabelText = 'Counter KPI List ';
      this.disabledGenerate = true;
    } else if (event.selectedIndex == 2) {
      this.stepperLabelText = 'Define Formula';
      this.disabledGenerate = false;
    } else {
      this.stepperLabelText = 'Select Node & Counter';
      this.disabledGenerate = true;
    }
  }

  repostModeValue(domain) {
    if (this.nodeAggrData.some(hierAggr => hierAggr.name === 'None' )){
      this.nodeAggrData.pop();
    }
    if (domain.name !== 'RAN') {
      // this.disabledHierachy = true;
      this.nodeAggrData.push({name: 'None', abbr:'None'});
    } else {
      // this.disabledHierachy = false;
    }
    this.nodeAggrFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeAggrData,
          this.nodeAggrFilterControl,
          this.nodeAggrFilter
        );
      });

  }

  tosslePerOne(selected, domain){
    console.log(this.allSelected.selected)
    let allSelected = [true, true, true];
    for(let i = 0;i < this.hierarchicalData.length; i++) {
        allSelected[i] = (this.allSelected.selected);
    }

    if (this.nodeAggrData.some(hierAggr => hierAggr.name === 'None' )){
      this.nodeAggrData.pop();
    }
    if(!allSelected.includes(true) && this.domain != 'RAN'){
      this.nodeAggrData.push({name: 'None', abbr:'None'});
    }
  }

  openComputationSetting() {
    const dialogRef = this.dialog.open(ComputationSettingsPoupComponent, {
      width: '550px',
      height: '550px',
      panelClass: 'computation-setting-popup'
    });
  }

  addGridDropFormulaZone(
    params,
    leftGridOptionsFormula
  ) {
    var removedNode = [];
    var tileContainer = document.querySelector('#textareaFormula'),
      dropZone = {
        getContainer: function () {
          return tileContainer;
        },
        onDragStop: function (params) {
          var tile = params.node.data.Name;
          tileContainer.append(tile);

          let node = document.getElementById("textareaFormula");
          node.focus();
          node.innerHTML = node.innerHTML.replace(/['"]+/g, '');
          let textNode = node.firstChild;
          let range = document.createRange();
          range.setStart(textNode, node.innerHTML.length);
          range.setEnd(textNode, node.innerHTML.length);
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        },
      };
    params.api.addRowDropZone(dropZone);

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

  getContext() {
    return {
      formGroup: this.formGroup,
      createKey: this.createKey,
      selectedNodeData: this.selectedNodesDetails,
      selectedRow: this.selectedRow
    }
  }

  createKey(rowId: string, column: Column): string {
    return `${column.getColId()}`;
  }
}