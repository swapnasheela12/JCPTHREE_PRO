import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ConfigDotmenuComponent } from '../config-dotmenu/config-dotmenu.component';
import { HistoryPopupComponent } from './history-popup/history-popup.component';
import { InfoPopupComponent } from './info-popup/info-popup.component'
interface Band {
  value: string;
  viewValue: string;
}
interface Sector {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  bands: Band[] = [
    { value: 'band-1', viewValue: "2300MHz" },
    { value: 'band-2', viewValue: '1800MHz' },
    { value: 'band-3', viewValue: '850MHz' }
  ];
  sectors: Sector[] = [
    { value: 'sector-1', viewValue: "Alpha" },
    { value: 'sector-2', viewValue: 'Beta' },
    { value: 'sector-3', viewValue: 'Gamma' }
  ];
  public selectedBands = this.bands[0].value;
  public selectedSector = this.sectors[0].value;


  public columnDefs: any[];
  public rowData: any;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsConfigmenu;
  gridColumnApi: any;
  public rowSelection;
  show: any;
  searchGrid = '';
  public showGlobalOperation: Boolean = false;
  public dataTest: any;
  private paginationPageSize = 10;
  public paths;
  public configColumn;
  public configRow;


  constructor(public matDialog: MatDialog, public matselect: MatSelectModule, public datashare: DataSharingService,
    private http: HttpClient, public dialogRef: MatDialogRef<ConfigurationComponent>
  ) {

    this.gridOptions = <GridOptions>{};
    this.createconfigColumn();

    this.getConfigdata();
    this.frameworkComponentsConfigmenu = {

      'config-dotmenu': ConfigDotmenuComponent
    }
  }
  ngOnInit(): void {
  }


  openDialogConfiguration(): void {
    const dialogRef = this.matDialog.open(ConfigurationComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
    
    });


  };

  close() {
    this.dialogRef.close();
  }

  // setup the grid after the page has finished loading
  private createconfigColumn() {
    this.configColumn = [
      {
        headerName: "Types",
        field: "types",
        width: 160,
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        pinned: 'left',
        cellClass: 'lock-pinned'
      }, {
        headerName: "Band",
        field: "band",
        width: 160
      }, {
        headerName: "Sector",
        field: "sector",
        width: 120
      },

      {
        headerName: "NE",
        field: "ne",
        width: 100
      }, {
        headerName: "Parameter Category",
        field: 'parametercategory',
        width: 180
      },
      {
        headerName: "Parameter",
        field: 'parameter',
        width: 180
      },
      {
        headerName: "Jio Settings",
        field: 'jiosettings',
        width: 140
      },
      {
        headerName: "Current Settings",
        field: 'currentsettings',
        width: 180
      },
      {
        headerName: "Last CM Fetch",
        field: 'lastcmfetch',
        width: 200
      },
      {
        headerName: "",
        cellRenderer: "config-dotmenu",
        id: "config-menu-render",
        field: "",
        width: 80,
        pinned: 'right'


      }

    ];
  }
  private getConfigdata() {
    this.http.get("assets/data/layers/popup-data/datap.json")
      .subscribe(data => {
        this.configRow = data;
      });
  }

}
