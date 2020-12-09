
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
import { GridOptions, GridCore } from 'ag-grid-community';
import * as _ from 'lodash';
import { template } from 'lodash';

declare var $: any;

@Component({
  selector: 'app-workorder-details',
  templateUrl: './workorder-details.component.html',
  styleUrls: ['./workorder-details.component.scss']
})
export class WorkorderDetailsComponent implements OnInit {

  @Input() commonTableAggrid: TemplateRef<any>;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////

  selectedDate = "2013-01-08";
  selectedTime = "18:40";

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

  // executionStatus Dropdown 
  protected _onDestroy = new Subject<void>();

  constructor(private _formBuilder: FormBuilder, private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {

    this.gridOptions = <GridOptions>{};
    this.rowSelection = 'multiple';
    this.createColumnDefs();

    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get('assets/data/configuration-management/ret-change/workorder-details/workorder-details.json')
      .subscribe(data => {
        this.rowData = data;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });

  }

  public createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "SAP ID",
        field: "sapid",
        width: 250,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        pinned: 'left',
        cellClass: 'lock-pinned'
      },
      {
        headerName: "Cell ID",
        field: "cellid",
        width: 140,
      },
      {
        headerName: "CNUM",
        field: "cnum",
        width: 140,
      },
      {
        headerName: "Sector ID",
        field: "sectorid",
        width: 150,
      },
      {
        headerName: "Parameter",
        field: "parameter",
        width: 140,
      },
      {
        headerName: "Band",
        field: "band",
        width: 120,
      },
      {
        headerName: "Clot RET",
        field: "clotret",
        width: 130,
      },
      {
        headerName: "Approved Ref.RET",
        field: "approvedrefret",
        width: 160,
      },
      {
        headerName: "Current RET",
        field: "currentret",
        width: 130,
      },
      {
        headerName: "Proposed RET *",
        field: "refret",
        cellRenderer: 'inputRenderer',
        width: 180,
        pinned: 'right'
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


  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Cm-Workorders/Ret-Change']);
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


}
