import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions, GridApi, SelectionChangedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ITooltipAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { EditGoldenConfigComponent } from '../edit-golden-config/edit-golden-config.component';

const PATHS = [
  { AddGoldenParameter: "JCP/Modules/Configuration-Management/Audit-and-Query/Core/EPS-Golden-Configuration/AddGoldenParameter" }
]

@Component({
  selector: 'jcpnewbeta-create-eps-golden-conf',
  templateUrl: './create-eps-golden-conf.component.html',
  styleUrls: ['./create-eps-golden-conf.component.scss']
})
export class CreateEpsGoldenConfComponent implements OnInit {
  public paths;
  searchGrid = '';
  public columnDefs: any[];
  rowData: Object;
  paginationPageSize: number;
  gridColumnApi: any;
  gridApi: any;
  gridOptions: GridOptions;


  frameworkComponentsEpsGolden;
  defaultColDef;
  show: any;
  selectedNWType = 'EPC';
  selectedCircle = 'Bihar';
  selectedTown = 'Ara';
  parameterValue = '670';
  Circle = [
    {name: 'All'},
    {name: 'Bihar'},
    {name: 'Mahashstra'}
  ];
  Town = [
    {name: 'All'},
    {name: 'Ara'},
    {name: 'Gaya'}
  ];
  NWType = [
     {name: 'All'},
    {name: 'EPC'},
    {name: 'NEPC'}
  ];
  EPS_GOLDEN_ADMIN = [
    {
      headerName: "NE",
      field: "ne",
      width: 150,
      pinned: 'left',
      checkboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      valueFormatter: function(params){
        if (!params.data.ne) {
          return '-';
        }
      }
    }, {
      headerName: "Band",
      field: "band",
      width: 100,
      valueFormatter: function(params){
        if (!params.data.band) {
          return '-';
        }
      }
    }, {
      headerName: "Carrier Index No",
      field: "carrier_index_no",
      width: 180,
      valueFormatter: function(params){
        if (!params.data.carrier_index_no) {
          return '-';
        }
      }
    }, {
      headerName: "Category",
      field: "category",
      width: 150,
      valueFormatter: function(params){
        if (!params.data.category) {
          return '-';
        }
      }
    }, {
      headerName: "Parameter",
      field: "parameter",
      width: 150,
      tooltipField: 'parameter',
      valueFormatter: function(params){
        if (!params.data.parameter) {
          return '-';
        }
      }
    }, {
      headerName: "PLD Family",
      field: 'pld_family',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.pld_family) {
          return '-';
        }
      }
    }, {
      headerName: "Identifications",
      field: 'identifications',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.identifications) {
          return '-';
        }
      }
    }, {
      headerName: "SW Version",
      field: 'sw_version',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.sw_version) {
          return '-';
        }
      }
    }, {
      headerName: "Vendors",
      field: 'vendors',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.vendors) {
          return '-';
        }
      }
    }, {
      headerName: "Jio Settings",
      field: 'jio_settings',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.jio_settings) {
          return '-';
        }
      }
    }, {
      headerName: "Restarts",
      field: 'restarts',
      width: 150,
      valueFormatter: function(params){
        if (!params.data.restarts) {
          return '-';
        }
      }
    }, {
      headerName: "",
      cellRenderer:'VerticaldotRenderer',
      width: 70,
      id: "dot-rendered-kpi-local",
      pinned: 'right'

    }
  ];
  tooltipShowDelay: number;
  messageSubscription: any;
  sidenavBarStatus: {};
  showGlobalOperation: boolean = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private datashare: DataSharingService
  ) {
    this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.paginationPageSize = 10;
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.frameworkComponentsEpsGolden = {
      customTooltip: CustomTooltip,
      'VerticaldotRenderer': VerticaldotRendererEPSComponent
    };
    this.tooltipShowDelay = 0;
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  }

  public fitColumns() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getKPIData();
    console.log(this.rowData)
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private getKPIData() {
    this.http.get("assets/data/configuration-management/audit-and-query/core/eps-golden-conf/eps-landing-golden-config.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  private createColumnDefs() {
    this.columnDefs = this.EPS_GOLDEN_ADMIN;
  }

  onFilterChanged(value) {
    // this.gridOptions.api.setQuickFilter(value);
  };

  openDeleteDialog():void {
    const message = `Are you sure you want to delete this parameters?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  openDisableDialog():void {
    const message = `Are you sure you want to disable parameters?`;
    const image = 'disable';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Disable!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  selectionChanged(event: SelectionChangedEvent) {
    if (1 < event.api.getSelectedRows().length) {
      this.showGlobalOperation = true;
    } else {
      this.showGlobalOperation = false;
    }
    this.datashare.chechboxChangeMessage(this.showGlobalOperation);
  }

  toggleSearch() {
    // if (this.ApiService.hasValue(this.searchGrid)) {
    //   this.searchGrid = "";
    //   this.getKPIData();

    // }
    // this.show = !this.show;
  };
}

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="custom-tooltip" fxLayout="column" fxLayoutAlign="center center">
        <div class="text" style="margin:5px">{{tooltipData}}</div>
    </div>
  `,
  styles: [
    `
      :host {
        padding: 0 8px;
        color: white;
        position: absolute;
        font-size:12px;
        top: 20%;
        left: 80%;
        border-radius: 2px;
        font-family: Lato Regular;
        background-color: #434962;
        width: initial;
        white-space: pre-wrap;
        height: auto;
        overflow: hidden;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip {
        margin: 5px;
        background-color:#434962;
        white-space: nowrap;
      }
      .text{
        color: #FFFFFF;
        font-size: 14px
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  public params: object;
  public data: any;
  public tooltipData: string;

  agInit(params): void {
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.tooltipData = this.data.tooltipData;

  }
}

@Component({ 
  selector: 'verticaldot-button-renderer',
  template: `
  <div *ngIf="!dataTest">
      <button mat-icon-button [matMenuTriggerFor]="GoldenAdminMenu" aria-label="Example icon-button with a menu">
          <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
      </button>
      <mat-menu #GoldenAdminMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
          <button mat-menu-item (click)="openEditDialog()">
              <span>Edit</span>
          </button>
          <button mat-menu-item (click)="openDisableDialog()">
              <span>Disable</span>
          </button>
          <button mat-menu-item (click)="openDeleteDialog()">
              <span>Delete</span>
          </button>
      </mat-menu>
    </div>
    `,
    styles: [
        `
        .kpi-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
    `
    ],
})

export class VerticaldotRendererEPSComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  dataTest : any = false;

  constructor(
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
  }

  agInit(params): void {
    this.params = params;
    this.datashare.checkboxMessage.subscribe((checkbox) => {
      this.dataTest = checkbox;
    });
  }

  refresh(params?: any): boolean {
    return true;
  }

  openDeleteDialog():void {
    const message = `Are you sure you want to delete this parameter ${this.params.data.parameter}?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  openDisableDialog():void {
    const message = `Are you sure you want to disable parameter ${this.params.data.parameter}?`;
    const image = 'disable';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Disable!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  openEditDialog():void {
    const dialogRef = this.dialog.open(EditGoldenConfigComponent, {
      width: '585px',
      height: '336px',
      data: {'data':this.params.data }
    });
  }
}