import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions, GridApi } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CustomFlagPopupComponent } from 'src/app/core/components/commonPopup/custom-flag-popup/custom-flag-popup.component';
import { SiteProposedConfigurationComponent } from 'src/app/core/components/commonPopup/site-proposed-configuration/site-proposed-configuration.component';
import { SharePopupComponent, SharePopupDialogModel } from 'src/app/core/components/commonPopup/share-popup/share-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-nominal-validation-optimization-summary',
  templateUrl: './nominal-validation-optimization-summary.component.html',
  styleUrls: ['./nominal-validation-optimization-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalValidationOptimizationSummaryComponent implements OnInit, OnDestroy {
  nominalGenerationSummaryData = {
    "name": 'Maharashtra-NP-CV-121020_V1',
    "type": 'R4G',
    "state": 'Maharashtra'
  };
  public gridMyPerformanceColumnDefs: any[];
  public gridMyPerformanceRowData: object;
  public gridMyPerformanceGridOptions : GridOptions;
  public frameworkComponentsMyPerformanceReports;
  public frameworkComponentsReportBuilder : object;
  private messageSubscription: Subscription;
  showSearchInput: boolean; 
  public title = 'My Performance Reports';
  public url: string = "assets/data/layers/nominal-generation/nominal-site-distribution.json";
  public gridApi;
  public gridColumnApi;
  paginationPageSize;
  sidenavBarStatus;
  data: any;
  summaryMatSelect: any;
  rowSelected: any;
  constructor(
    private router: Router,
    private datashare: DataSharingService,
    private http: HttpClient,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    public location: Location
  ) {
    this.gridMyPerformanceGridOptions = <GridOptions>{};
    this.frameworkComponentsReportBuilder = {
      'nominalSiteVerticalDotComponent': nominalSiteVerticalDotComponent,
      'flagRenderComponent': flagRenderComponent
    };
    this.data = history.state.data;
    if ('undefined' != this.data['optSummary']) {
      this.summaryMatSelect = this.data['optSummary'];
      this.rowSelected = this.data['row'].rfparams;
    }
    console.log(this.rowSelected)
    this.paginationPageSize = 10;
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
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
  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  };

  backToSummary() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Summary']);
  }

  async displayValidationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalValidationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-validation/nominal-validation-layer/nominal-validation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalValidationLayerComponent)
    );
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.fitColumns();
  }

  
  get gridAPI(): GridApi {
    return this.gridApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}