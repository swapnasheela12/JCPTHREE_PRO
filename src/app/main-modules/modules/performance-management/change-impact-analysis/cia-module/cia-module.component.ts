import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commanPopup/file-upload-popup/file-upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { dropdown, R4GState, JC } from './cia-module-dropdown';
import { ReplaySubject, Subject } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DeleteRendererComponent } from './renderer/delete-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CustomHeaderComponent } from './renderer/custom-header.component';

@Component({
  selector: 'app-cia-module',
  templateUrl: './cia-module.component.html',
  styleUrls: ['./cia-module.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CiaModuleComponent implements OnInit {
  selectedRadio = "Custom";
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

  // Select JC Dropdown 
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Select JC Dropdown 

  public radioTypeList: any[] = [
    { 'name': 'Custom' },
    { 'name': 'JC Circle Level' }
  ];
  frequencySelected = "Per Day";
  public frequencyData: any[] = [
    'Per Day',
    'BBH',
    'NBH',
    'Hourly'
  ];
  public postHourlyList: any[] = [
    'All',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ];
  public selectedPostHourlyValue: any[] = [
    '1',
    '2',
    '3',
    '4',
  ];
  public preHourlyList: any[] = [
    'All',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ];
  public selectedPreHourlyValue: any[] = [
    '1',
    '2',
    '3',
    '4',
  ];
  likeToLikeChecked: false;
  public CLOSE_ON_SELECTED_PREDATEPICKER = false;
  public CLOSE_ON_SELECTED_POSTDATEPICKER = false;
  public initPreDatePicker = new Date();
  public initPostDatePicker = new Date();
  public resetModelPreDate = new Date(0);
  public resetModelPostDate = new Date(0);
  public preModel = [
  ];
  public postModel = [
  ];
  maxPreDate = new Date();
  maxPostDate = new Date();
  minPreDate = new Date(new Date().setDate(new Date().getDate() - 6));
  minPostDate = new Date(new Date().setDate(new Date().getDate() - 6));
  public leftGridKpiOptions;
  public rightGridKpiOptions;
  public leftKpiGridDefs;
  public rightKpiGridDefs;
  leftRowData: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  tooltipShowDelay: number;
  searchGrid = "";
  public frameworkComponentsCIA;
  showGlobalDeleteKpiOperation: boolean;
  @ViewChild('postPicker', { static: true }) _postPicker: MatDatepicker<Date>;
  @ViewChild('preDicker', { static: true }) _prePicker: MatDatepicker<Date>;
  generateDisabled: boolean = true;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService
  ) {
    this.frameworkComponentsCIA = {
      'deleteFlagRenderer': DeleteRendererComponent,
      'CustomHeaderComponent': CustomHeaderComponent
    };
  }

  openFileUploadPopup(): void {
    const title = `Upload Nodes`;
    var showExample = true;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data=>{
      if(data == 'uploadClicked'){
        this.showSuccessFailure = true;
      }
  })
  }

  ngOnInit(): void {
    this.leftKpiGridDefs = [
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
      }
    ];
    this.leftGridKpiOptions =  <GridOptions>{
      defaultColDef: {
        flex: 1,
        // minWidth: 100,
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
      columnDefs: this.leftKpiGridDefs,
      animateRows: true
    };
    this.rightKpiGridDefs = [
      {
        headerName: 'SR. No.',
        field: "id",
        checkboxSelection: true,
        maxWidth: 150,
        minWidth:150,
        suppressMenu: true,
        headerCheckboxSelection: true,
        cellRenderer: function (params) {
          return '<div>' + (params.rowIndex + 1) + '</div>'
        }
      },
      {
        headerName: 'KPI Name',
        field: "Name",
        suppressMenu: true,
        rowDrag: true,
        tooltipField: 'Name',
        minWidth: 250,
        cellClass: 'first-draw-column',
      },
      {
        suppressMenu: true,
        width: 70,
        pinned: 'right',
        headerComponent: 'CustomHeaderComponent',
        cellRenderer: 'deleteFlagRenderer'
      }
    ];
    this.rightGridKpiOptions =  <GridOptions>{
      defaultColDef: {
        flex: 1,
        // minWidth: 100,
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
      frameworkComponents: this.frameworkComponentsCIA,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.rightKpiGridDefs,
      animateRows: true
    };
    this.createKPIData();
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
  this.datashare.leftGridOptionMessage(
    this.leftGridKpiOptions,
    this.rightGridKpiOptions
  );
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

  preDateFilter = (d: Date): boolean => {
    return this.filterDate(d);
  }
  postDateFilter = (d: Date): boolean => {
    return this.filterDate(d);
  }
  filterDate(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  searchKPIGrid(value) {
    this.leftGridKpiOptions.api.setQuickFilter(value);
  }

  createKPIData() {
    this.http.get("assets/data/modules/performance_management/kpi-editor/create-kpi-list.json")
      .subscribe(data => {
        this.leftRowData = data;
      });
  }

  onGridLeftReady(params) {
    this.addGridDropZone(
      params,
      this.leftGridKpiOptions,
      this.rightGridKpiOptions
    );
  }

  onGridRightReady(params) {
    this.addGridDropZone(
      params,
      this.rightGridKpiOptions,
      this.leftGridKpiOptions
    )
  }

  addGridDropZone(
    params,
    leftGridKpiOptions,
    rightGridKpiOptions
  ) {
    let dropZoneParams = rightGridKpiOptions.api.getRowDropZoneParams({
      onDragStop: function (params) {
        var nodes = params.nodes;
        leftGridKpiOptions.api.applyTransaction({
          remove: nodes.map(function (node) {
            return node.data;
          })
        });
        rightGridKpiOptions.api.refreshCells({ force: true });
      }
    });
    console.log(rightGridKpiOptions.api.getDisplayedRowCount())
        if (0 < rightGridKpiOptions.api.getDisplayedRowCount()) {
          this.showGlobalDeleteKpiOperation = true;
        } else {
          this.showGlobalDeleteKpiOperation = false;
        }
        this.datashare.chechboxChangeMessage(this.showGlobalDeleteKpiOperation);
    params.api.addRowDropZone(dropZoneParams);
  }

  selectionChanged(event: SelectionChangedEvent) {
    if (1 <= event.api.getSelectedRows().length) {
      this.showGlobalDeleteKpiOperation = true;
    } else {
      this.showGlobalDeleteKpiOperation = false;
    }
    this.datashare.chechboxChangeMessage(this.showGlobalDeleteKpiOperation);
  }

  getContext() {
    return {
      leftGridKpiOptions: this.leftGridKpiOptions,
      rightGridKpiOptions: this.rightGridKpiOptions,
      showGlobalDeleteKpiOperation: this.showGlobalDeleteKpiOperation
    }
  }

  openKpiFileUploadPopup() {
    const title = `Upload Nodes`;
    const dialogData = new fileUploadPopupModel(title, false);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '250px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data=>{
      if(data == 'uploadClicked'){
        this.showSuccessKpiFailure = true;
      }
  })
  }
  public dateClassPreModel = (date: Date) => {
    if (this.preFindDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }

  public dateClassPostModel = (date: Date) => {
    if (this.postFindDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }

  public postDateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this.postFindDate(date);
      if (index === -1) {
        this.postModel.push(date);
      } else {
        this.postModel.splice(index, 1)
      }
      this.resetModelPostDate = new Date(0);
      if (!this.CLOSE_ON_SELECTED_POSTDATEPICKER) {
        const closeFn = this._postPicker.close;
        this._postPicker.close = () => { };
        this._postPicker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._postPicker.close = closeFn;
        });
      }
    }
  }

  public preDateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this.preFindDate(date);
      if (index === -1) {
        this.preModel.push(date);
      } else {
        this.preModel.splice(index, 1)
      }
      this.resetModelPreDate = new Date(0);
      if (!this.CLOSE_ON_SELECTED_PREDATEPICKER) {
        const closeFn = this._prePicker.close;
        this._prePicker.close = () => { };
        this._prePicker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._prePicker.close = closeFn;
        });
      }
    }
  }

  public preRemove(date: Date): void {
    const index = this.preFindDate(date);
    this.preModel.splice(index, 1)
  }

  private preFindDate(date: Date): number {
    return this.preModel.map((m) => +m).indexOf(+date);
  }

  public postRemove(date: Date): void {
    const index = this.postFindDate(date);
    this.postModel.splice(index, 1)
  }

  private postFindDate(date: Date): number {
    return this.postModel.map((m) => +m).indexOf(+date);
  }
}
