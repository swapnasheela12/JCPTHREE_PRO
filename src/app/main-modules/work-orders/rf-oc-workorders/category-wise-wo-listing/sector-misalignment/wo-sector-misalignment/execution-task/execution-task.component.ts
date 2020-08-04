import { Component, OnInit, ViewChild } from '@angular/core';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-execution-task',
  templateUrl: './execution-task.component.html',
  styleUrls: ['./execution-task.component.scss']
})
export class ExecutionTaskComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;

  public url: string = "assets/data/report/sector-misalignment/execution-task.json";

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => console.log(url));
    //this.paths = PATHS;
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;

        console.log(this.rowData);
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-Report";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  ngOnInit(): void {
  }

  createColumnDefs() {
    this.columnDefs = [{
      headerName: "Date",
      field: "date",
      width: 180,
      pinned: true
    }, {
      headerName: "Reason For Reassignment",
      field: "reasonForReassign",
      width: 180
    }, {
      headerName: "Remarks",
      field: "remarks",
      width: 220
    }];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  defaultColDef = { resizable: true };
  searchGrid = '';
  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  };
  show: any;
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

}
