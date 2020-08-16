import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";



import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CapacityDotMenuComponent } from '../capacity-dot-menu/capacity-dot-menu.component';
import { HelpiconComponent } from './helpicon/helpicon.component';
import { QuestionPopupComponent } from './question-popup/question-popup.component';
import { TableAgGridService } from '../../../core/components/table-ag-grid/table-ag-grid.service';
import { from } from 'rxjs';


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

  constructor(
    public data: TableAgGridService, 
    public dialog: MatDialog, 
    public matDialog: MatDialog, 
    public matselect: MatSelectModule, 
    public datashare: DataSharingService,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<CapacityComponent>) {


    this.gridOptions = <GridOptions>{};
    //  this.gridOptions.api.getCapacityPopupData(this.gridOptions.rowData)

    this.frameworkComponentsHelpIcon = {
      'helpicon': HelpiconComponent
    };
    this.frameworkComponentsCapacitymenu = {

      'dotmenu': CapacityDotMenuComponent
    };
    this.createCapacityColumndata();
    this.getCapacityPopupData();

  }

  ngOnInit(): void {
  
  
  }
  
  openDialogCapacity(): void {
    const dialogRef = this.dialog.open(CapacityComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
       });
  };

  private createCapacityColumndata() {
    this.capacityColumns = [
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
        cellRenderer: "helpicon",
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

  private getCapacityPopupData() {
    this.http.get("assets/data/layers/popup-data/capacity-popup-data.json")
      .subscribe(data => {
        console.log(data);

        this.rowData = data;

      });
  }

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
