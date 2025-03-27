import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { nominalSiteVerticalDotComponent, flagRenderComponent } from '../../nominal-generation-coverage/nominal-site-distribution-summary/nominal-site-distribution-summary.component';
import {Location} from '@angular/common';

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
    width: 270
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
  selector: 'app-nominal-validation-site-distribution-summary',
  templateUrl: './nominal-validation-site-distribution-summary.component.html',
  styleUrls: ['./nominal-validation-site-distribution-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalValidationSiteDistributionSummaryComponent implements OnInit, OnDestroy {
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
  selectedIndex = 2;
  dataOverlay = {
    "overlayVS5gSolution": [
      {
          "on Existing Enb":
          [
            {
              "total":1020,
              "totalStatus":'increase'
            },
            {
              "gNB": 768,
              "gNBStatus":'increase'
            },
            {
              "odsc1": 122,
              "odsc1Status": 'increase'
            },
            {
              "odsc2": 622,
              "odsc2Status": 'increase'
            },
            {
              "odsc3": 402,
              "odsc3Status": 'increase'
            }
          ],
          "On Existing ODSC": 
          [
            {
              "total":5011,
              "totalStatus":'decrease'
            },
            {
              "gNB": 6510,
              "gNBStatus":'decrease'
            },
            {
              "odsc1": 6000,
              "odsc1Status": 'decrease'
            },
            {
              "odsc2": 5101,
              "odsc2Status": 'decrease'
            },
            {
              "odsc3": 6020,
              "odsc3Status": 'decrease'
            }
          ],
          "On Building":
          [
            {
              "total":822,
              "totalStatus":''
            },
            {
              "gNB": 822,
              "gNBStatus":''
            },
            {
              "odsc1": 822,
              "odsc1Status": ''
            },
            {
              "odsc2": 822,
              "odsc2Status": ''
            },
            {
              "odsc3": 822,
              "odsc3Status": ''
            }
          ],
          "Additional Candidates":
          [
            {
              "total":1452,
              "totalStatus":'decrease'
            },
            {
              "gNB": 403,
              "gNBStatus":'decrease'
            },
            {
              "odsc1": 1252,
              "odsc1Status": 'decrease'
            },
            {
              "odsc2": 1252,
              "odsc2Status": 'decrease'
            },
            {
              "odsc3": 1252,
              "odsc3Status": 'decrease'
            }
          ]
      }
    ],
    "infraVS5gSolution": [
      {
          "p1":
          [
            {
              "total":1020,
              "totalStatus":'increase'
            },
            {
              "gNB": 768,
              "gNBStatus":'increase'
            },
            {
              "odsc1": 122,
              "odsc1Status": 'increase'
            },
            {
              "odsc2": 622,
              "odsc2Status": 'increase'
            },
            {
              "odsc3": 402,
              "odsc3Status": 'increase'
            }
          ],
          "ipcode": 
          [
            {
              "total":5011,
              "totalStatus":'decrease'
            },
            {
              "gNB": 6510,
              "gNBStatus":'decrease'
            },
            {
              "odsc1": 6000,
              "odsc1Status": 'decrease'
            },
            {
              "odsc2": 5101,
              "odsc2Status": 'decrease'
            },
            {
              "odsc3": 6020,
              "odsc3Status": 'decrease'
            }
          ],
          "rp1":
          [
            {
              "total":822,
              "totalStatus":''
            },
            {
              "gNB": 822,
              "gNBStatus":''
            },
            {
              "odsc1": 822,
              "odsc1Status": ''
            },
            {
              "odsc2": 822,
              "odsc2Status": ''
            },
            {
              "odsc3": 822,
              "odsc3Status": ''
            }
          ],
          "Additional Candidate":
          [
            {
              "total":1452,
              "totalStatus":'decrease'
            },
            {
              "gNB": 403,
              "gNBStatus":'decrease'
            },
            {
              "odsc1": 1252,
              "odsc1Status": 'decrease'
            },
            {
              "odsc2": 1252,
              "odsc2Status": 'decrease'
            },
            {
              "odsc3": 1252,
              "odsc3Status": 'decrease'
            }
          ]
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
  displayedColumnsOverlay: string[] = ['key', 'total', 'gNB', 'odsc1', 'odsc2', 'odsc3', 'total1', 'gNB1', 'odsc11', 'odsc21', 'odsc31'];
  displayedColumnsInfra: string[] = ['key', 'total', 'gNB', 'odsc1', 'odsc2', 'odsc3', 'total1', 'gNB1', 'odsc11', 'odsc21', 'odsc31'];

  private gridApi;
  public gridColumnApi;
  tabSelect:any = 'input';
  data = [];
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private datashare: DataSharingService,
    private http: HttpClient,
    private dialog: MatDialog,
    public location: Location
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
    console.log(this.overlayData)
  }

  ngOnInit(): void {
    this.data = history.state.data;
    if (undefined != this.data) {
      if (this.data['tab'] == 'acp') {
        this.tabSelect = 'acp';
      }
    }
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
    let overlay = {};
    overlay['totalStatus'] = 'increase';
    overlay['data'] = this.overlayData[0].map(t => t[0].total).reduce((acc, value) => acc + value, 0);
    return overlay;
  }

  calculateGNB() {
    let overlay = {};
    overlay['odscgnbStatus'] = 'increase';
    overlay['data'] = this.overlayData[0].map(t => t[1].gNB).reduce((acc, value) => acc + value, 0);
    return overlay;
  }

  calculateODSC1() {
    let overlay = {};
    overlay['odsc1Status'] = 'increase';
    overlay['data'] = this.overlayData[0].map(t => t[2].odsc1).reduce((acc, value) => acc + value, 0);
    return overlay;
  }

  calculateODSC2() {
    let overlay = {};
    overlay['odsc2Status'] = 'increase';
    overlay['data'] = this.overlayData[0].map(t => t[3].odsc2).reduce((acc, value) => acc + value, 0)
    return overlay;
  }

  calculateODSC3() {
    let overlay = {};
    overlay['odsc3Status'] = 'increase';
    overlay['data'] = this.overlayData[0].map(t => t[4].odsc3).reduce((acc, value) => acc + value, 0)
    return overlay;
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
    if (this.tabSelect != 'acp') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Summary'], {state: {data: {tab:'output'}}});
    } else if(this.tabSelect == 'acp') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Summary'], {state: {data: {tab:'acp'}}});
    } else {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Summary']);
    }
  }
  onFilterChanged(value) {
    this.gridMyPerformanceGridOptions.api.setQuickFilter(value);
  };

  async displayValidationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalValidationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-validation/nominal-validation-layer/nominal-validation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalValidationLayerComponent)
    );
  }

  backTo() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation']);
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
