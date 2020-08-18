import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { QuestionPopupComponent } from './question-popup/question-popup.component';
import { TableAgGridService } from '../../../core/components/table-ag-grid/table-ag-grid.service';
import { from } from 'rxjs';
import { GenhelpiconComponent } from '../../../core/components/ag-grid-renders/genhelpicon.component';


@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {
  public caprowData;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridPinned;
  defaultColDef;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public capacityColumndata;
  public capacityRowdata;
  public capacityColumns
  public capacityRows;
  public frameworkComponentsCapacitymenu;
  public frameworkComponentsHelpIcon;

  public showGlobalOperation: Boolean = false;
  public kpivalue;
  rowClassRules: {};
  //cellClassRules: { show: (params: any) => void; hide: (params: any) => void; };
public cellClassRules;
url_1 = "assets//layers/popup-data/capacity-popup-data.json";

  constructor(
    public datatable: TableAgGridService, 
    public dialog: MatDialog, 
    public matDialog: MatDialog, 
    public matselect: MatSelectModule, 
    public datashare: DataSharingService,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<CapacityComponent>) {


    this.gridOptions = <GridOptions>{};
    //  this.gridOptions.api.getCapacityPopupData(this.gridOptions.rowData)

    this.frameworkComponentsHelpIcon = {
      'helpicon': GenhelpiconComponent
    };
    this.frameworkComponentsCapacitymenu = {

    //  'dotmenu': CapacityDotMenuComponent
    };
    this.createCapacityColumndata();
    this.httpClientRowData();
    //this.getCapacityPopupData();

  }

  ngOnInit(): void {
  
  
  }
  private httpClientRowData() {
    this.http
      .get("assets/data/layers/popup-data/capacity-popup-data.json")
      .subscribe(data => {
        this.caprowData = data;
        this.datatable.rowDataURLServices = this.url_1;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.caprowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
      this.datatable.columnDefsServices = this.columnDefs;
    }

  openDialogCapacity(): void {
    const dialogRef = this.dialog.open(CapacityComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
       });
  };

  private createCapacityColumndata() {
    this.columnDefs = [
      {
        headerName: "KPIs",
        field: "kpis",
        width: 200,
        cellClass: 'lock-pinned'
      }, {
        headerName: "2300 MHz-C1",
        field: 'mhzc12300',
        width: 160,
        cellClass: 'lock-pinned',
      }, {
        headerName: "2300 MHz-C2",
        field: 'mhzc22300',
        width: 160,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "1800 MHz",
        field: 'mhz1800',
        width: 140,
        cellClass: 'lock-pinned',
      }, {
        headerName: "850 MHz-C1",
        field: 'mhzc1850',
        width: 160,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "850 MHz-C2",
        field: 'mhzc2850',
        width: 160,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "",
        cellRenderer: 'helpicon',
        // cellRenderer: function(){
        //   return '<button mat-icon-button class="zmdi zmdi-help">'
        // },
        id: "helpicon-render",
        field: "",
        width: 120,
        pinned: 'right',
        // valueGetter: function(params){
        //   console.log(params.data.kpis)
        //   if (params.data.kpis == 'Average RRC Connected Users') {
        //     return '';
        //   } else {
        //     return params.data.kpis
        //   }
        // }
      }



    ];

  }

  // private getCapacityPopupData() {
  //   this.http.get("assets/data/layers/popup-data/capacity-popup-data.json")
  //     .subscribe(data => {
  //       console.log(data);

  //       this.rowData = data;

  //     });
  // }

  close() {
    this.dialogRef.close();

  }
 
  openDialoghelp(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent
      , {
        width: "550px",
        panelClass: "material-dialog-container",
            });
    };

  isShow: boolean = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  






  

}
