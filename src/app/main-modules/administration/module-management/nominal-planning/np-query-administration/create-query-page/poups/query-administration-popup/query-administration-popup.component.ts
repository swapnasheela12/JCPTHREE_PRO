import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GridApi, GridCore, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-query-administration-popup',
  templateUrl: './query-administration-popup.component.html',
  styleUrls: ['./query-administration-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueryAdministrationPopupComponent implements OnInit {
  selectedRadio = "Operators";
  public columnDefs: any[];
  public rowData: object;
  public gridOptions: GridOptions;
  public molist : string[] = ['+', '-', '+', '-', '+', '-'];
  public solist : string[] = ['CONTAIN', 'EQUAL', 'BEGINS WITH', 'DOES NOT CONTAIN', 'ENDS WITH'];
  public bolist : string[] = ['AND', 'OR'];
  selectedItem: any;

  header_iterations = [
    {
      headerName: "Attributes",
      field: "attributes",
      width: 100,
    },
    {
      headerName: "Explanation",
      field: "explanation"
    }
  ];
  gridApi: any;
  gridColumnApi: any;
  constructor(public dialogRef: MatDialogRef<QueryAdministrationPopupComponent>, 
    private http: HttpClient) { 
      this.gridOptions = <GridOptions>{};}

  ngOnInit(): void {
    this.createColumnDefs();
    this.getData();
  }
  public fitColumns() {
    setTimeout(() => {
      this.gridOptions.api.sizeColumnsToFit();
    }, 500);
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      this.fitColumns();
    }, 500);
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  private getData() {
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/query_administration/query-admin-popup.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }
  private createColumnDefs() {
    this.columnDefs = this.header_iterations;
  }

}

export class QueryAdministrationPopupDialogModel {
  constructor() {
  }
}
