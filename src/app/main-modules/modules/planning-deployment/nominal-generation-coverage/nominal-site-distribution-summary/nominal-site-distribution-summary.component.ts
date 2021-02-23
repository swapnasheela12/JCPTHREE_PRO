import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions, GridApi } from '@ag-grid-community/all-modules';
import { Subscription } from 'rxjs';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatTableDataSource } from '@angular/material/table';
import { SiteProposedConfigurationComponent } from 'src/app/core/components/commonPopup/site-proposed-configuration/site-proposed-configuration.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomFlagPopupComponent } from 'src/app/core/components/commonPopup/custom-flag-popup/custom-flag-popup.component';
import { SharePopupDialogModel, SharePopupComponent } from 'src/app/core/components/commonPopup/share-popup/share-popup.component';


const HEADER_PERFORMANCE_REPORTS = [
  {
    headerName: "",
    width: 30,
    checkboxSelection: function(params) {
      return params.columnApi.getRowGroupColumns().length === 0;
    },
    pinned: 'left' 
  },
  {
    headerName: "SAP ID",
    field: "sapId",
    width: 190,
    pinned: 'left' 
  },
  {
    headerName: "",
    field: "flagStatus",
    cellRenderer:'flagRenderComponent',
    width: 5,
    cellClass: 'flag-align'
  },
  {
    headerName: "Latitude",
    field: 'latitude',
    width: 180
  },
  {
    headerName: "Longitude",
    field: 'longitude',
    width: 180,
  },
  {
    headerName: "Type",
    field: "type",
    width: 140
  },
  {
    headerName: "Overlay",
    field: "overlay",
    width: 210
  },
  {
    headerName: "",
    cellRenderer:'nominalSiteVerticalDotComponent',
    width: 20,
    pinned: 'right',
    cellClass: 'vertical-dot-align'
  }
];

@Component({
  selector: 'app-nominal-site-distribution-summary',
  templateUrl: './nominal-site-distribution-summary.component.html',
  styleUrls: ['./nominal-site-distribution-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalSiteDistributionSummaryComponent implements OnInit, OnDestroy {
  nominalGenerationSummaryData = {
    "name": 'Maharashtra-NP-CV-121020_V1',
    "type": 'R4G',
    "state": 'Maharashtra'
  };
  public gridMyPerformanceColumnDefs: any[];
  public gridMyPerformanceRowData: object;
  public gridMyPerformanceGridOptions : GridOptions;
  public frameworkComponentsMyPerformanceReports;
  showSearchInput: boolean; 
  dataOverlay = {
    "overlayVS5gSolution": [
      {
          "on Existing Enb":
            {
                "total":1020,
                "gNB": 768,
                "odsc1": 122,
                "odsc2": 622,
                "odsc3": 402
            },
          "On Existing ODSC": 
            {
                "total":5011,
                "gNB": 6510,
                "odsc1": 6000,
                "odsc2": 5101,
                "odsc3": 6020
            },
          "On Building":
            {
                "total":822,
                "gNB": 822,
                "odsc1": 822,
                "odsc2": 822,
                "odsc3": 822
            },
          "Additional Candidates":
            {
                "total":1452,
                "gNB": 403,
                "odsc1": 1252,
                "odsc2": 1252,
                "odsc3": 1252
            }
      }
    ],
    "infraVS5gSolution": [
      {
          "p1":
          {
              "total":1020,
              "gNB": 768,
              "odsc1": 122,
              "odsc2": 622,
              "odsc3": 402
          },
          "ipcode": 
          {
              "total":5011,
              "gNB": 6510,
              "odsc1": 6000,
              "odsc2": 5101,
              "odsc3": 6020
          },
          "rp1":
          {
              "total":822,
              "gNB": 822,
              "odsc1": 822,
              "odsc2": 822,
              "odsc3": 822
          },
          "additionalCandidate":
          {
              "total":1452,
              "gNB": 403,
              "odsc1": 1252,
              "odsc2": 1252,
              "odsc3": 1252
          }
      }
  ]
  };

  public title = 'My Performance Reports';
  public url: string = "assets/data/layers/nominal-generation/nominal-site-distribution.json";
  public frameworkComponentsReportBuilder : object;
  private paginationPageSize = 10;
  private messageSubscription: Subscription;
  searchGrid = '';
  sidenavBarStatus;
  overlayData= [];
  dataSourceOverlay = this.dataOverlay['overlayVS5gSolution'][0];
  dataSourceInfra = this.dataOverlay['infraVS5gSolution'][0];
  displayedColumnsOverlay: string[] = ['key', 'total', 'gNB', 'odsc1', 'odsc2', 'odsc3'];
  displayedColumnsInfra: string[] = ['key', 'total', 'gNB', 'odsc1', 'odsc2', 'odsc3'];

  private gridApi;
  public gridColumnApi;
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private datashare: DataSharingService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.gridMyPerformanceGridOptions = <GridOptions>{};
    this.frameworkComponentsReportBuilder = {
      'nominalSiteVerticalDotComponent': nominalSiteVerticalDotComponent,
      'flagRenderComponent': flagRenderComponent
    };
    this.paginationPageSize = 10;
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
    for ( let i = 0; i< this.dataOverlay['overlayVS5gSolution'].length; i++) {
      this.overlayData.push(
        Object.values(this.dataOverlay['overlayVS5gSolution'][i])
      )
    }
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getMyPerformanceReportsData();
  }

  public fitColumns() {
    if (this.gridMyPerformanceGridOptions.api && this.gridMyPerformanceRowData) {
      setTimeout(() => {
        this.gridMyPerformanceGridOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.fitColumns();
  }

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  };

  calculateTotal() {
    return this.overlayData[0].map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

  calculateGNB() {
    return this.overlayData[0].map(t => t.gNB).reduce((acc, value) => acc + value, 0);
  }

  calculateODSC1() {
    return this.overlayData[0].map(t => t.odsc1).reduce((acc, value) => acc + value, 0);
  }

  calculateODSC2() {
    return this.overlayData[0].map(t => t.odsc2).reduce((acc, value) => acc + value, 0);
  }

  calculateODSC3() {
    return this.overlayData[0].map(t => t.odsc3).reduce((acc, value) => acc + value, 0);
  }


  public createColumnDefs() {
    this.gridMyPerformanceColumnDefs = HEADER_PERFORMANCE_REPORTS;
    // this.gridMyPerformanceColumnDefs[9].cellRenderer = this.shareStatus;
    // this.gridMyPerformanceColumnDefs[8].cellRenderer = this.progressTaskFunc;
    // this.gridMyPerformanceColumnDefs[11].cellRenderer = 'VerticaldotRenderer';
  }

  public getMyPerformanceReportsData() {
    this.http.get(this.url)
      .subscribe(data => {
        this.gridMyPerformanceRowData = data;
    });
  }

  public orderByKey(a, b) {
    return a.key;
  }

  async backToSummary() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Summary']);
  }
  onFilterChanged(value) {
    this.gridMyPerformanceGridOptions.api.setQuickFilter(value);
  };

  async displayNominalGenerationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalGenerationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-generation-coverage/nominal-generation-layer/nominal-generation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalGenerationLayerComponent)
    );

  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}

@Component({ 
  selector: 'nominal-3dot-button-renderer',
  template: `
  <div>
        <button mat-icon-button [matMenuTriggerFor]="kpiEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #kpiEditorMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="openSharePopup()">
                <span>Share</span>
            </button>
            <button mat-menu-item (click)="openSiteProposedConf()">
                <span>Details</span>
            </button>
            <button mat-menu-item>
                <span>Download</span>
            </button>
            <button mat-menu-item (click)="openFlagConf()">
              <span>Unflag</span>
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
    encapsulation: ViewEncapsulation.None
})
export class nominalSiteVerticalDotComponent implements ICellRendererAngularComp {
  params;

  constructor(
    public matDialog: MatDialog
  ) {
  }

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  openSharePopup() {
    const dialogData = new SharePopupDialogModel();
    const dialogRef = this.matDialog.open(SharePopupComponent, {
      data: dialogData,  
      width: '900px',
      height: '500px',
      panelClass: 'site-proposed-table'
    });
  }
  
  openSiteProposedConf() {
    const dialogRef = this.matDialog.open(SiteProposedConfigurationComponent, {
      width: "1023px",
      height:'474px',
      panelClass: "site-proposed-table",
      data: {
        'sapId': this.params.data.sapId,
        'latitude': this.params.data.latitude,
        'longitude': this.params.data.longitude,
        'sector':this.params.data.sector
      }
    });
    dialogRef.componentInstance.mode = 'edit';
  }

  openFlagConf() {
    const dialogRef = this.matDialog.open(CustomFlagPopupComponent, {
      width: "535px",
      height:'475px',
      panelClass: "material-dialog-container"
    });
  }
}

@Component({ 
  selector: 'flag-renderer',
  template: `
    <div *ngIf="flagStatus == 'warning'">
      <i class="fas fa-flag green"></i>
    </div>
    <div *ngIf="flagStatus == 'alert'">
      <i class="fas fa-flag red"></i>
    </div>
    `,
    styles: [
        `
        .red {
          color: #D80000;
        }
        .green {
          color: #11D800;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class flagRenderComponent implements ICellRendererAngularComp {
  params;
  flagStatus;

  constructor(
  ) {
  }

  agInit(params): void {
    this.params = params;
    this.flagStatus = this.params.data.flagStatus;
    console.log(this.flagStatus)
  }

  refresh(params?: any): boolean {
    return true;
  }
  
}