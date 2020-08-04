import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
// import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
//import { DotmakerComponent } from "../dotmaker.component";
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CapacityDotMenuComponent } from '../capacity-dot-menu/capacity-dot-menu.component';
import { HelpiconComponent } from './helpicon/helpicon.component';
import { QuestionPopupComponent } from './question-popup/question-popup.component';
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

  constructor(public dialog: MatDialog, public matDialog: MatDialog, public matselect: MatSelectModule, public datashare: DataSharingService,

    private http: HttpClient, public dialogRef: MatDialogRef<CapacityComponent>) {
    this.gridOptions = <GridOptions>{};
    //  this.gridOptions.api.getCapacityPopupData(this.gridOptions.rowData)
    this.frameworkComponentsHelpIcon = {
      'helpicon': HelpiconComponent
    };
    this.frameworkComponentsCapacitymenu = {

      'dotmenu': CapacityDotMenuComponent
    };


  }

  ngOnInit(): void {
    this.createCapacityColumndata();

    this.getCapacityPopupData();
    // this.rowClassRules = {
    //   'show': function(params){
    //   return  params.data.kpis === "AirMAC Cell DL Traffic (GB)"
    //   },
    //   'hide': function(params){
    //  return   params.data.kpis === "BBH Start Time"
    //   }
   // }
  
   
  }
  name: string;
  animal: string;
  openDialogCapacity(): void {
    const dialogRef = this.dialog.open(CapacityComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
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
      },
    ];
  }

  private getCapacityPopupData() {
    this.http.get("assets/data/layers/popup-data/capacity-popup-data.json")
      .subscribe(data => {

        this.rowData = data;

      });
  }

  close() {
    this.dialogRef.close();

  }
  name: string;
  animal: string;
  openDialoghelp(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent
      , {
        width: "550px",
        panelClass: "material-dialog-container",
        data: { name: this.name, animal: this.animal }
      });

    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
    });
  };








  isShow: boolean = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  

}
