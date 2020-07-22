import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DOMAIN, NODE, dropdown } from './create-kpi-constant';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi, RowNode, Column } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { DeleteRendererComponent } from '../renderer/delete-renderer.component';
import { dropdownRendererComponent } from '../renderer/dropdown-renderer.component';
// import { conditionalDropdownRendererComponent } from '../renderer/conditional-dropdown-renderer.component';
// import { ComputationSettingsPoupComponent } from './computation-settings-popup/computation-settings-popup.component'
import { MatDialog } from '@angular/material/dialog';
import { ComputationSettingsPoupComponent } from './computation-settings-poup/computation-settings-poup.component';
import { IfElsePopupComponent } from './if-else-popup/if-else-popup.component';
import { HextodocPopupComponent } from './hextodoc-popup/hextodoc-popup.component';

import * as _ from "lodash";

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CreateKpiComponent implements OnInit {
  selectNodeCtrl: FormGroup;
  counterKPICtrl: FormGroup;
  defineFormulaCtrl: FormGroup;
  protected _onDestroy = new Subject<void>();
  stepperLabelText = 'Select Node & Counter';

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

  @ViewChild('domainCtrlSelect') domainCtrlSelect: MatSelect;
  protected domainListData = DOMAIN;
  public domainCtrl: FormControl = new FormControl();
  public domainFilterCtrl: FormControl = new FormControl();
  public domainFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('nodeMultiCtrlSelect') nodeMultiCtrlSelect: MatSelect;
  protected nodeMultiListData = NODE;
  public nodeMultiCtrl: FormControl = new FormControl();
  public nodeMultiFilterCtrl: FormControl = new FormControl();
  public nodeMultiFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  public frameworkComponentsCreateKPIEditor;
  public showGlobalDeleteOperation;
  kpiGridSearch = '';
  nodeAggrValue='';
  timeAggrValue= '';

  NodeAggr = [
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'SUM'
  ];

  TimeAggr = [
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'SUM'
  ];
  formulaList=[
    'If-Else',
    'HextoDec',
    'DectoHex',
    'Ceiling',
    'Floor'
  ]

  createKPIForm = new FormGroup({
    nodeAggr: new FormControl(null, Validators.required),
    timeAggr: new FormControl(null, Validators.required)
  });

  addFormulaForm = new FormGroup({
    Formula: new FormControl(null, Validators.required),
    percentageOfNodes: new FormControl(),
    countNodes: new FormControl()
  })
  
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
  gridConditionValue1:'';
  // dataFiltered: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    public dialog: MatDialog
  ) {
    this.datashare.chechboxChangeMessage(this.leftGridOptions);
    this.frameworkComponentsCreateKPIEditor = {
      'deleteFlagRenderer': DeleteRendererComponent,
      'dropDownCellRenderer': dropdownRendererComponent
    };
  }

  ngOnInit() {
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
        cellClass:'first-draw-column'
      },
    ];
    this.leftColumnFormulaDefs = [
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
        cellClass:'first-draw-column'
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
          headerName:'Counter/KPI',
          field: "Name"
        },
        {
          headerName:'Node Aggr',
          field: "nodeAggr",
          cellRenderer: 'dropDownCellRenderer'
        },
        {
          headerName:'Time Aggr',
          field: "timeAggr",
          cellRenderer: 'dropDownCellRenderer'
        },
        // {
        //   headerName:'Threshold Condition',
        //   field: "threshold",
        //   cellRenderer: 'conditionalDropdownRenderer'
        // },
        {
          suppressMenu: true,
          maxWidth: 50,
          cellRenderer: 'deleteFlagRenderer'
      }
    ];

    this.rightColumnFormulaDefs = [
      {
        headerName:'Sr No.',
        field: "id",
        width:50
      },
      {
        headerName:'Formula',
        field: "Name",
        width:150,
        valueGetter: function(params) {
          return '('+params.data.Name+')';
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
      getRowNodeId: function(data) { return data.id; },
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
      columnDefs: this.leftColumnDefs,
      animateRows: true
    };
    console.log(this.leftGridOptions)
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
      getRowNodeId: function(data) { return data.id; },
      rowDragManaged: true,
      suppressMoveWhenRowDragging: true,
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
      getRowNodeId: function(data) { return data.id; },
      rowDragManaged: true,
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
      getRowNodeId: function(data) { return data.id; },
      rowDragManaged: true,
      columnDefs: this.rightColumnFormulaDefs,
      suppressMoveWhenRowDragging: true,
      animateRows: true
    };
    this.rowClassRules = {
      'green': function(params) {
        if (params.data.statusFormula == 'success') {
          return true;
        }
      },
      'red': function(params) {
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
    
  }

  kpiFilterChange(value) {
    this.leftGridOptions.api.setQuickFilter(value);
  }

  getRowNodeId(data: any) {
    return data.id;
  }

  createKPIData(){
    this.http.get("assets/data/modules/performance_management/kpi-editor/create-kpi-list.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  validateFormula() {
    this.rowDataFormula = [];
    var dataFiltered =[];
    this.rightGridOptionsFormula.api.forEachNode((node)=>{
    this.http.get('assets/data/modules/performance_management/kpi-editor/kpi-status-formula.json')
      .subscribe(
        data =>  {
          console.log(data)
          let result = _.filter(data, {id:node.data.id})
          console.log(result[0]);
          dataFiltered.push(result[0]);
          this.rowDataFormula = dataFiltered;
        }
      )
      console.log(dataFiltered)
    })
    
  }
  onChangeFormula(conditionValue) {
    console.log(conditionValue)
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
    }
  }

  clearList() {
    this.addGridDropFormulaLeftZone(this.rightGridOptionsFormula);
  }

  addGridDropFormulaLeftZone(rightGridOptionsFormula) {
    let allRightNodes = this.rightGridOptionsFormula.api.forEachNode(
      (node) => {
        this.leftGridOptionsFormula.api.applyTransaction(
          {
          add: [node.data]
          }
        );
        this.rightGridOptionsFormula.api.applyTransaction(
          {
          remove: [node.data]
          }
        );
      }
    )
    // let dropZoneParams = this.leftGridOptionsFormula.api.getRowDropZoneParams({
    //   onDragStop: function(params) {
    //       var nodes = params.nodes;
    //       rightGridOptionsFormula.api.applyTransaction({
    //           remove: nodes.map(function(node) {
    //             return node.data;
    //           })
    //       });
    //   }
    // });
    // this.leftGridOptionsFormula.api.addRowDropZone(dropZoneParams);
  }
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
    console.log(params)
    console.log(this.leftGridOptionsFormula)
    console.log(this.rightGridOptionsFormula)
    console.log(this.formGroupFormula)
    this.addGridDropFormulaZone(
      params,
      this.leftGridOptionsFormula,
      this.rightGridOptionsFormula
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

  changeCSS() {
    this.rightGridOptions.rowClassRules = {
      'green': function(params) {
        if (params.data.statusFormula == 'success') {
          return true;
        }
      },
      'red': function(params) {
        if (params.data.statusFormula == 'error') {
          return true;  
        }
      }
    }
  }
  onApply() {
    // this.rightGridOptions.rowClassRules = {
    //   'green': function(params) {
    //     if (params.data.statusFormula == 'success') {
    //       return true;
    //     }
    //   },
    //   'red': function(params) {
    //     if (params.data.statusFormula == 'error') {
    //       return true;


          
    //     }
    //   },
    // }
    this.rightGridOptions.getRowStyle =  function (params){
      if (params.data.statusFormula == 'success') {
        return{backround: 'green'}
      }
      if (params.data.statusFormula == 'error') {
        return{backround: 'red'}
      }
    }
    this.selectedNodesDetails.length = 0;
    this.nodeAggrValue = this.createKPIForm.value.nodeAggr;
    this.timeAggrValue = this.createKPIForm.value.timeAggr;
    let selectedNodes = this.rightGridOptions.api.getSelectedNodes();
    let columns = this.rightGridOptions.columnApi.getAllColumns();
    selectedNodes.forEach((node)=> {
      this.selectedRow='AVG';
      this.selectedNodesDetails.push(node.id)
      var data = node.data;
      node.data.timeAggr = this.timeAggrValue;
      node.data.nodeAggr = this.nodeAggrValue;
     
      this.rightGridOptions.api.refreshCells({force: true});
    });
  }

  onGridRightReady(params) {
    this.addGridDropLeftZone(params, this.rightGridOptions);
    this.addGridFifteenMiDropZone(params, this.fifteenMinsKpiGridOptions)
  }

addGridFifteenMiDropZone(params, rightGridOptions) {
    let dropZoneParams = this.fifteenMinsKpiGridOptions.api.getRowDropZoneParams({
    onDragStop:function (params) {
      var nodes = params.nodes;
      rightGridOptions.api.applyTransaction({
        remove:nodes.map(function (node) {
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

    filterSubject.next (
      listData.filter (
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
    console.log(node)
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
    if (node.data["KPIValue"] == "No"){
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
      this.stepperLabelText = 'Counter KPI List '
    } else if (event.selectedIndex == 2) {
      this.stepperLabelText = 'Define Formula';
    } else {
      this.stepperLabelText = 'Select Node & Counter';
    }
  }

  openComputationSetting(){
    const dialogRef = this.dialog.open(ComputationSettingsPoupComponent, {
      width: '550px',
      height: '550px',
      // maxHeight: '500px',
      // minHeight: '240px'
    });
  }

  addGridDropFormulaZone(
    params,
    leftGridOptionsFormula,
    rightGridOptionsFormula,
  ) {
    console.log("hello")
    let dropZoneParams = this.rightGridOptionsFormula.api.getRowDropZoneParams({
      onDragStop: function(params) {
          var nodes = params.nodes;
          leftGridOptionsFormula.api.applyTransaction({
              remove: nodes.map(function(node) {
                return node.data;
              })
          });
          let columns = rightGridOptionsFormula.columnApi.getAllColumns();
          // rightGridOptions.api.forEachNode((rowNode: RowNode)=>{
          //   console.log(rowNode);
          //   columns.filter(column => column.getColDef().field)
          //     .forEach((column: Column) => {
          //         rightGridOptions.api.refreshCells({force: true, columns: [column]});
          //         const key = keyData(rowNode.id, column);
          //         formGroup.addControl(key, new FormControl())
          //         rightGridOptions.api.refreshCells({force: true, columns: [column]});
          //         this.formGroup = formGroup;
          //         // rightGridOptions.api.refreshCells({force: true, columns: [column]});
          //         // rightGridOptions.api.sizeColumnsToFit();
          //     })
          // });
      }
    });
    params.api.addRowDropZone(dropZoneParams);
  }
  addGridDropZone(
    params,
    leftGridOptions,
    rightGridOptions,
    formGroup
  ) {
    console.log(this.createKey);
    let keyData = this.createKey;
    // let formGroup = formGroup;
    let dropZoneParams = this.rightGridOptions.api.getRowDropZoneParams({
      onDragStop: function(params) {
          var nodes = params.nodes;
          leftGridOptions.api.applyTransaction({
              remove: nodes.map(function(node) {
                return node.data;
              })
          });
          let columns = rightGridOptions.columnApi.getAllColumns();
          rightGridOptions.api.forEachNode((rowNode: RowNode)=>{
            console.log(rowNode);
            columns.filter(column => column.getColDef().field)
              .forEach((column: Column) => {
                  rightGridOptions.api.refreshCells({force: true, columns: [column]});
                  const key = keyData(rowNode.id, column);
                  formGroup.addControl(key, new FormControl())
                  rightGridOptions.api.refreshCells({force: true, columns: [column]});
                  this.formGroup = formGroup;
                  // rightGridOptions.api.refreshCells({force: true, columns: [column]});
                  // rightGridOptions.api.sizeColumnsToFit();
              })
          });
      }
    });
    params.api.addRowDropZone(dropZoneParams);
  }

  addGridDropLeftZone(params, rightGridOptions) {
    let dropZoneParams = this.leftGridOptions.api.getRowDropZoneParams({
      onDragStop: function(params) {
          var nodes = params.nodes;
          rightGridOptions.api.applyTransaction({
              remove: nodes.map(function(node) {
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