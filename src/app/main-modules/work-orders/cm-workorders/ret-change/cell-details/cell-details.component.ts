import { takeUntil } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
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
import { dropdown, executionStatus, executionStatusDropdown } from 'src/app/core/components/common-elements/type-dropdown-modulelist';
import { CELL_DETAILS_COLUMN_DEFS, Status, Category } from './cell-details.column.constant';
import { JioCenter } from 'src/app/main-modules/modules/performance-management/report-builder/create-report/create-report-dropdown';
declare var $: any;

@Component({
  selector: 'app-cell-details',
  templateUrl: './cell-details.component.html',
  styleUrls: ['./cell-details.component.scss']
})
export class CellDetailsComponent implements OnInit {
  @Input() commonTableAggrid: TemplateRef<any>;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @ViewChild('jioCenterControlSelect') jioCenterControlSelect: MatSelect;
  public jioCenterControl: FormControl = new FormControl();
  public jioCenterFilterControl: FormControl = new FormControl();
  public jioCenterFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  /////
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[] = CELL_DETAILS_COLUMN_DEFS;
  public rowCount: string;
  public messageSubscription: Subscription;
  public gridFilterValueServices = {};
  public defaultColDef = { resizable: true };

  protected categoryData = Category;
  public frameworkComponentsReportBuilder = {
    dropDownThreeDotRenderer: dropDownThreeDotRendererComponent
  };
  public workOrderId;
  public rowSelection;
  public executionStatusFormControl: FormGroup;
  // executionStatus Dropdown 
  protected _onDestroy = new Subject<void>();
  protected statusData = Status;
  public statusControl: FormControl = new FormControl();
  public statusFilterControl: FormControl = new FormControl();
  public statusFilter: ReplaySubject<any[]> = new ReplaySubject<executionStatusDropdown[]>(1);
  public categoryControl: FormControl = new FormControl();
  public categoryFilterControl: FormControl = new FormControl();
  public categoryFilter: ReplaySubject<any[]> = new ReplaySubject<executionStatusDropdown[]>(1);


  constructor(private _formBuilder: FormBuilder, private datatable: TableAgGridService,
    private datashare: DataSharingService, private router: Router,
    private overlayContainer: OverlayContainer, private httpClient: HttpClient) {

    this.gridOptions = <GridOptions>{};
    this.rowSelection = 'multiple';
    this.createColumnDefs();
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get('assets/data/configuration-management/ret-change/cell-details/cell-details.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });

    this.datashare.currentMessage.subscribe((data) => {
      console.log("data", data);
      this.workOrderId = data
    })
  }

  onChange(event) {
    console.log(event)
  }

  private createColumnDefs() {
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

    this.categoryControl.setValue([this.categoryData[1]]);
    this.categoryFilter.next(this.categoryData.slice());
    this.categoryFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.categoryData,
          this.categoryFilter,
          this.categoryFilterControl
        );
      });
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

  tabChanged(event) { }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Cm-Workorders/Ret-Change']);
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


}

