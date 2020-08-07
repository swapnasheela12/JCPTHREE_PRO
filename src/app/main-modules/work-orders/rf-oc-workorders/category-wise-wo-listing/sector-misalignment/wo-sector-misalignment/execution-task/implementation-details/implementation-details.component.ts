import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ciaDropdownRenderersComponent } from 'src/app/main-modules/modules/performance-management/change-impact-analysis/renderer/cia-renderer.component';

@Component({
  selector: 'app-implementation-details',
  templateUrl: './implementation-details.component.html',
  styleUrls: ['./implementation-details.component.scss']
})

export class ImplementationDetailsComponent implements OnInit {
  frameworkComponentsKpiSettings = {
    'dropdownRenderer': ciaDropdownRenderersComponent,
  };
  public url: string = "assets/data/report/sector-misalignment/execution-task/implementation-details.json";
  rowData;
  gridOptions;
  columnDefs;
  defaultColDef = { resizable: true };
  searchGrid = '';
  show: any;
  gridColumnApi;
  gridApi;

  constructor(private httpClient: HttpClient, private datatable: TableAgGridService) {
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();
    this.httpClient.get(this.url).subscribe(data => {
      this.rowData = data;
      this.datatable.rowDataURLServices = this.url;
      this.datatable.typeOfAgGridTable = "Default-Ag-Grid-Report";
      this.datatable.rowDataServices = this.rowData;
      this.datatable.gridOptionsServices = this.gridOptions;
      this.datatable.defaultColDefServices = this.defaultColDef;
      this.datatable.paginationRequired = false;
      this.datatable.autoPageSizeRequired = false;
    });
  }

  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Sector*",
        field: "sector",
        width: 150,
        cellRenderer: this.drp
      },
      {
        headerName: "Band*",
        field: "band",
        width: 150,
        cellRenderer: this.drp
      },
      {
        headerName: "New Azimuth Value(Deg)*",
        field: "newAzimuthValue",
        width: 150,
        cellRenderer: function (params) {
          return '<div class="flex"><md-input-container class="md-block margin-bottom-0 hide-md-errors-spacer">' +
            '<input value="' + params.value + '" aria-label="NewValue">' +
            '</md-input-container></div>';
        }
      }
    ]
    this.datatable.columnDefsServices = this.columnDefs;
  }

  drp() {
    return '<div class="flex"><md-input-container class="">' +
      '<md-select ng-model="band.Ian" aria-label="select Band">' +
      '<md-option value="2300" selected>2300</md-option>' +
      '<md-option value="1800" ng-mousedown="alert();">1800</md-option>' +
      '<md-option value="850">850</md-option>' +
      '</md-select>' +
      '</md-input-container></div>';
  }


  toggleSearch() {
    this.show = !this.show;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);

  }

  ngOnInit(): void {
  }

}
