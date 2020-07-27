import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, GridCore, SelectionChangedEvent, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  public columnDefs: any[];
  public rowData: any;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public frameworkComponentsKPIEditor;
  gridColumnApi: any;
  public rowSelection;
  show: any;
  searchGrid = '';
  public showGlobalOperation: Boolean = false;
  public dataTest: any;
  private paginationPageSize = 10;
  public paths;
  constructor(public matDialog: MatDialog,

    private http: HttpClient, public dialogRef: MatDialogRef<ConfigurationComponent>


  ) {

    this.gridOptions = <GridOptions>{};
  }
  
 

  ngOnInit(): void {
  



  }
  name: string;
  animal: string;
  openDialogAlarms(): void {
    const dialogRef = this.matDialog.open(ConfigurationComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
    });

  };

  close() {
    this.dialogRef.close();
  }

  // setup the grid after the page has finished loading

}
