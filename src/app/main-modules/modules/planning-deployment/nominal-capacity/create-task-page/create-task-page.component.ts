import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { GridApi, GridCore, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ciaDropdownRenderersComponent } from '../../../performance-management/change-impact-analysis/renderer/cia-renderer.component';
import { cnctDropdownRendererComponent } from './renderer/cnct-renderer.component';
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
  status?: string;
  public columnDefs: any[];
  public rowData: object;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKpiSettings;
  gridColumnApi: any;
  public rowSelection;
  showSearchInput: boolean;
  searchGrid = '';


  HEADER_KPI = [
    {
      headerName: "Name",
      field: "name",
      tooltipField: 'name',
      width: 350,
      pinned:'left',
      checkboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function(params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    }, 
    {
      headerName: "Grid Selection",
      width: 220,
      cellRenderer: 'dropdownRenderer',
    },
    {
      headerName: "5G gNB Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
    },
    {
      headerName: "5G ODSC Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
    },
  ];
  constructor(
    private http: HttpClient,
  ) {
    this.gridOptions = <GridOptions>{};
    this.frameworkComponentsKpiSettings = {
      'dropdownRenderer':   cnctDropdownRendererComponent,
    };
  }
  ngOnInit() {
    this.createColumnDefs();
    this.getData();
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  private getData() {
    this.http.get("assets/data/modules/performance_management/change-impact-analysis/kpi-settings/kpi-settings.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }
  private createColumnDefs() {
    this.columnDefs = this.HEADER_KPI;
  }

}
