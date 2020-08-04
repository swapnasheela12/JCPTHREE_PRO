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
import { DataSharingService } from 'src/app/_services/data-sharing.service';
@Component({
  selector: 'app-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss']
})
export class HistoryPopupComponent implements OnInit {
  gridOptions: GridOptions;
  
  historyRowdata: any;
  historyColumndata: { headerName: string; field: string; width: number; }[];

  constructor(public matDialog: MatDialog, public matselect: MatSelectModule, public datashare: DataSharingService,
    private http: HttpClient, public dialogRef: MatDialogRef<HistoryPopupComponent>
  ) {

    this.gridOptions = <GridOptions>{};
    this.createHistoryColumnData();
    this.getHistoryData();
  }
  ngOnInit(): void {
  }
  openDialogHistory(): void {
    const dialogRef = this.matDialog.open(HistoryPopupComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

    //  this.animal = result;
    });

  };

  close() {
    this.dialogRef.close();
  }

// setup the grid after the page has finished loading
private createHistoryColumnData() {
  this.historyColumndata = [
    {
      headerName: "Date & Time",
      field: "dateandtime",
      width: 160,
    }, {
      headerName: "Requester Email ID",
      field: "requesteremailid",
      width: 220
    }, {
      headerName: "Actual",
      field: "actual",
      width: 150
    },

    {
      headerName: "Updated Value",
      field: "updatedvalue",
      width: 220
    }, {
      headerName: "JCP Workorder ID",
      field: 'jcpworkorderid',
      width: 220
    },
    {
      headerName: "Implementation Comments",
      field: 'implementationcomments',
      width: 260
    },
   

  ];
}
private getHistoryData() {
  this.http.get("assets/data/layers/popup-data/history-popup-data.json")
    .subscribe(data => {
      this.historyRowdata = data;
  });
}

}
