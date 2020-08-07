import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { GridOptions } from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-site-parameter',
  templateUrl: './site-parameter.component.html',
  styleUrls: ['./site-parameter.component.scss']
})
export class SiteParameterComponent implements OnInit {
  public url: string = "assets/data/report/sector-misalignment/execution-task/site-parameter.json";
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

      console.log(this.rowData);
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
        headerName: "SiteParameter",
        field: "SiteParameter"
      },
      {
        headerName: "CurrentValue",
        field: "CurrentValue",
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
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
