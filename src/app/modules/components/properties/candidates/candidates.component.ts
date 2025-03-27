import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridCore } from '@ag-grid-community/all-modules';
import { SelectionChangedEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public gridFilterValueServices = {};
  private url: string = "assets/data/layers/nominalssites/candidates.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }

  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private dialogRef: MatDialogRef<CandidatesComponent>,
    public dialog: MatDialog, private datatable: TableAgGridService, private datashare: DataSharingService,
    private httpClient: HttpClient) {
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();


    this.httpClient.get(this.url)
      .subscribe((data: Array<any>) => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  ngOnInit(): void {
  }

  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        width: 130
      },
      {
        headerName: "Status",
        field: "status",
        width: 130
      },
      {
        headerName: "Latitude",
        field: "latitude",
        width: 200
      }, {

        headerName: "Longitude",
        field: "longitude",
        width: 220
      }, {

        headerName: "Name & Address",
        field: "nameaddress",
        width: 220
      }, {

        headerName: "Contact Name & Number",
        field: "contactnamenumber",
        width: 240
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };
  show: boolean;
  toggleSearch() {
    this.show = !this.show;
  };

  shareStatus(params) {
    if (!params.data)
      return '';
    var status = params.data.status;
    var barColor = '';
    if (status == "Shared") {
      barColor = '#4188de';
      var template = '<div class="shared_val" fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">' + status + '</div> <div class="shared_count">+' + params.data.sharecount + '</div> </div>'
    } else {
      barColor = '#828282';
      var template = '<div fxLayout="row" fxLayoutAlign="space-between center"> <div class="shared_title">-</div> </div>'
    }
    ;
    return template;
  };

  //END table search//////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  onSelectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  selectionChanged(event: SelectionChangedEvent) {
    let lengthOfSelectedRow = event.api.getSelectedRows().length;
    if (1 < lengthOfSelectedRow) {
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
