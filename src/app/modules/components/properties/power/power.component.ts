import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subject } from 'rxjs';
import { SelectionChangedEvent } from 'ag-grid-community';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnChanges {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptionsPower: GridOptions;
  public rowDataPower: any;
  public columnDefsPower: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public show;
  public gridFilterValueServices = {};
  public siteMileStoneDetailWrapper;
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;
  public url: string = "assets/data/modules/properties/power.json";

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptionsPower.api && this.rowDataPower) {
      setTimeout(() => {
        this.gridOptionsPower.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService,
    private router: Router, private httpClient: HttpClient) {
    router.events.subscribe();
    this.gridOptionsPower = <GridOptions>{};
    this.createColumnDefs();
    this.httpClient.get(this.url)
      .subscribe((data: any) => {
        this.rowDataPower = data.equipmentDetailsList;
        this.siteMileStoneDetailWrapper = data.siteMileStoneDetailWrapper;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowDataPower;
        this.datatable.gridOptionsServices = this.gridOptionsPower;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });

    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
  }
  ngOnChanges() {
    if (this.selectedTab === "POWER") {
      this.showTab = true;
      this.createColumnDefs();
      this.httpClient.get(this.url)
        .subscribe((data: any) => {
          this.rowDataPower = data.equipmentDetailsList;
          this.siteMileStoneDetailWrapper = data.siteMileStoneDetailWrapper;
          this.datatable.rowDataURLServices = this.url;
          this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
          this.datatable.rowDataServices = this.rowDataPower;
          this.datatable.gridOptionsServices = this.gridOptionsPower;
          this.datatable.defaultColDefServices = this.defaultColDef;
        });
    }
  }

  private createColumnDefs() {
    this.columnDefsPower = [{
      headerName: "Equipment Details",
      field: "equipmentName",
      enableRowGroup: true,
      width: 120
    }, {
      headerName: "Unit Load (Watt)",
      field: "ratedPower",
      width: 195
    }, {
      headerName: "Quantity",
      field: "quantity",
      width: 130
    }, {
      headerName: "Rated Power (Watt)",
      field: "ratedPower",
      width: 120
    }];
    this.datatable.columnDefsServices = this.columnDefsPower;
  }

  //END table search//////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  onSelectionChanged(event: SelectionChangedEvent) {
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
}
