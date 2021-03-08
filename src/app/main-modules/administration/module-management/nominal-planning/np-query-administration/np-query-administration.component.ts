import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridApi, GridCore, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { NpQueryThreeDotRendererComponent } from './create-query-page/np-query-three-dot-renderer/np-query-three-dot-renderer.component';

const PATHS = [
  { createQueryPage: "/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration/Create-Query" }
];

@Component({
  selector: 'app-np-query-administration',
  templateUrl: './np-query-administration.component.html',
  styleUrls: ['./np-query-administration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NpQueryAdministrationComponent implements OnInit {
  show: boolean;
  public columnDefs: any[];
  public columnDefs2: any[];
  public columnDefs3: any[];
  public columnDefs4: any[];
  public rowData: object;
  public gridOptions: GridOptions;
  public gridOptions2: GridOptions;
  public gridOptions3: GridOptions;
  public gridOptions4: GridOptions;
  searchGrid = '';
  private paginationPageSize = 10;

  header_iterations = [
    {
      headerName: "Query Name",
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
      headerName: "Query Description",
      width: 250,
      field: "description",
    },
    {
      headerName: "Created By",
      width: 150,
      field: "createdBy",
    },
    {
      headerName: "Created On",
      width: 150,
      field: "createdOn",
    },
    {
      headerName: "Modified By",
      width: 150,
      field: "modifiedBy",
    },
    {
      suppressMenu: true,
      width: 70,
      pinned: 'right',
      cellRenderer: 'deleteFlagRenderer'
    }
  ];
  gridApi: any;
  gridColumnApi: any;
  gridApi2: any;
  gridColumnApi2: any;
  createQueryRoute: string;
  public frameworkComponents5gGridSelection;
  frameworkComponents5gGngSelection: any;
  frameworkComponents5gOdscSelection: any;
  frameworkComponents5gStrategySelection: any;

  constructor(
    private http: HttpClient
  ) {
    this.gridOptions2 = <GridOptions>{};
    this.gridOptions3 = <GridOptions>{};
    this.gridOptions4 = <GridOptions>{};
    this.paginationPageSize = 10;
    this.frameworkComponents5gGridSelection = {
      'deleteFlagRenderer': NpQueryThreeDotRendererComponent,
    };
    this.frameworkComponents5gGngSelection = {
      'deleteFlagRenderer': NpQueryThreeDotRendererComponent,
    };
    this.frameworkComponents5gOdscSelection = {
      'deleteFlagRenderer': NpQueryThreeDotRendererComponent,
    };
    this.frameworkComponents5gStrategySelection = {
      'deleteFlagRenderer': NpQueryThreeDotRendererComponent,
    };
  }

  ngOnInit(): void {
    this.createQueryRoute = PATHS[0].createQueryPage;
    this.createColumnDefs();
    this.getData();
    this.gridOptions = <GridOptions>{
      frameworkComponents: this.frameworkComponents5gGridSelection,
    };
    this.gridOptions2 = <GridOptions>{
      frameworkComponents: this.frameworkComponents5gGngSelection,
    };
    this.gridOptions3 = <GridOptions>{
      frameworkComponents: this.frameworkComponents5gOdscSelection,
    };
    this.gridOptions4 = <GridOptions>{
      frameworkComponents: this.frameworkComponents5gStrategySelection,
    };
  }
  
  public fitColumns() {
    setTimeout(() => {
      this.gridOptions.api.sizeColumnsToFit();
    }, 500);
  }
  // public fitColumns2() {
  //   setTimeout(() => {
  //     this.gridOptions2.api.sizeColumnsToFit();
  //   }, 500);
  // }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      this.fitColumns();
    }, 500);
  }

  // public onReady2(params) {
  //   this.gridApi2 = params.api;
  //   this.gridColumnApi2 = params.columnApi;
  //   setTimeout(() => {
  //     this.fitColumns2();
  //   }, 500);
  // }

  public onTabChanged(params) {
    setTimeout(() => {
      this.gridOptions2.api.sizeColumnsToFit();
      this.gridOptions3.api.sizeColumnsToFit();
      this.gridOptions4.api.sizeColumnsToFit();
    }, 500);
  }
  
  private getData() {
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/query_administration/5g_grid_selection.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }
  private createColumnDefs() {
    this.columnDefs = this.header_iterations;
    this.columnDefs2 = this.header_iterations;
    this.columnDefs3 = this.header_iterations;
    this.columnDefs4 = this.header_iterations;
  }

  toggleSearch() {
    this.show = !this.show;
  };

}
