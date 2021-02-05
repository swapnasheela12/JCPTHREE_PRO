import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { GridApi, GridCore, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ciaDropdownRenderersComponent } from '../../../performance-management/change-impact-analysis/renderer/cia-renderer.component';
import { cnctDropdownRendererComponent } from './renderer/cnct-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ncCtTooltipComponent } from './renderer/nc-ct-tooltip.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskPageComponent implements OnInit {
  plan: string;
  zone: string;
  r4gStates: string;
  jioCenters: string;
  city: string;
  jioState: string;
  circle: string;
  status?: string;
  public columnDefs: any[];
  public columnDefs2: any[];
  public rowData: object;
  public rowData2: object;
  public defaultColDef;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptions2: GridOptions;
  tooltipShowDelay: number;
  public frameworkComponentsIterationsSettings;
  public frameworkComponentsReviewGrid;
  gridColumnApi: any;
  public rowSelection;
  showSearchInput: boolean;
  searchGrid = '';
  messageSubscription: Subscription;
  public sidenavBarStatus;
  @ViewChild('sugGrid') sugGrid: AgGridAngular;


  header_iterations = [
    {
      headerName: "Name",
      field: "name",
      width: 150,
      pinned: 'left',
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: "Grid Selection",
      width: 220,
      cellRenderer: 'dropdownRenderer',
      field: "grid",
    },
    {
      headerName: "5G gNB Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
      field: "gGnb",
    },
    {
      headerName: "5G ODSC Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
      field: "gOdsc",
    },
  ];

  header_review = [
    {
      headerName: "Sr. No.",
      field: "name",
      width: 350,
      pinned: 'left',
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: "Grid Selection",
      width: 220,
      field: "grid",  
      cellRenderer: this.taskInfoFunction,
      tooltipField: 'grid'
    },
    {
      headerName: "5G gNB Selection",
      width: 180,
      cellRenderer: this.taskInfoFunction,
      tooltipField: 'gnbSelection',
      field: "gnbSelection",
    },
    {
      headerName: "5G ODSC Selection",
      width: 180,
      field: "gOdsc",
      tooltipField: 'gOdsc',
      cellRenderer: this.taskInfoFunction,
    },
  ];
  constructor(
    private http: HttpClient,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions2 = <GridOptions>{};
    this.frameworkComponentsIterationsSettings = {
      'dropdownRenderer': cnctDropdownRendererComponent,
    };
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    this.frameworkComponentsReviewGrid = { customTooltip: ncCtTooltipComponent };
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
  }
  ngOnInit() {
    this.createColumnDefs();
    this.getData();
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }
  onAddRowsug() {
    this.sugGrid.api.addItems([{ name: 'Exp1', grid: '', gGnb: '', gOdsc: '' }]);
  }

  public fitColumns() {
    // if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions2.api.sizeColumnsToFit();
      }, 500);
    // }
  }

  taskInfoFunction(params) {
    var queryNameGrid = params.data.grid;
    var queryNameGnb = params.data.gnbSelection;
    var queryNameOdsc = params.data.gOdsc;
    if(params.colDef.headerName == "5G gNB Selection"){
      var template1 = '<span>' + queryNameGnb + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    } else if (params.colDef.headerName == "Grid Selection") {
      var template1 = '<span>' + queryNameGrid + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    } else if (params.colDef.headerName == "5G ODSC Selection") {
      var template1 = '<span>' + queryNameOdsc + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    }
      return template1;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      this.fitColumns();
    }, 500);
  }
  private getData() {
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/create_capacity_task/iterations_grid.json")
      .subscribe(data => {
        this.rowData = data;
      });
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/create_capacity_task/review_grid.json")
      .subscribe(data => {
        this.rowData2 = data;
      });
  }
  private createColumnDefs() {
    this.columnDefs = this.header_iterations;
    this.columnDefs2 = this.header_review;
  }
  
  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
