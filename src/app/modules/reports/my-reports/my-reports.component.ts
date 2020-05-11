import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";


// ag grid
import { GridOptions } from "ag-grid/main";
import { ButtonRendererComponent } from './button-renderer.component';
import { CreateReportComponent } from '../reports-wizard/create-report/create-report.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {


  ///////////////////////////
  public gridApi;
  public rowSelection;
  public gridColumnApi;
  // public columnDefsMyReport;
  // public defaultColDefMyReport;
  public rowDataMyReport: any[string];
  // public icons;
  public gridOptions: GridOptions;
  // public frameworkComponentsMyReport;
  ///////////////////////////
  // ///////my report tabel//////////
  public products;
  show: any;
  // ///////my report tabel//////////
  ///////report measure/////////////
  public reportMeasureSelected = "Performance Management";
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  reportsMeasureList: reportsMeasure[] = [
    { value: 'Configuration Management', viewValue: 'Configuration Management' },
    { value: 'LSMR', viewValue: 'LSMR' },
    { value: 'Performance Management', viewValue: 'Performance Management' },
    { value: 'Work Orders', viewValue: 'Work Orders' }
  ];
  ///////report measure/////////////

  constructor(private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)
  }

  ////////MyReport table////////
  columnDefsMyReport = [
    {
      headerName: "Report Name",
      field: "reportname",
      width: 320
    }, {
      headerName: "Report Measure",
      field: "reportmeasure",
      width: 210
    }, {
      headerName: "Report Category",
      field: "reportcategory",
      width: 230
    },
    {
      headerName: "Progress",
      cellRenderer: this.progressTaskFunc,
      enableRowGroup: true,
      width: 180
    },
    {
      headerName: "Created Date",
      field: "createddate",
      width: 190
    }, {
      headerName: "",
      cellRenderer: 'buttonRenderer',
      width: 120
    }
  ];

  icons = {
    filter: '<i class="ag-icon ag-icon-filter"/>',
    groupExpanded: '<mat-icon class="material-icons">indeterminate_check_box</mat-icon>',
    groupContracted: '<mat-icon class="material-icons">add_box</mat-icon>',
    checkboxChecked: '<i class="checkboxchecked-ag-grid fa fa-check-square-o"/>',
    checkboxUnchecked: '<i class="fa fa-square-o"/>',
    checkboxIndeterminate: '<i class="fa fa-circle-o"/>'
  };
  frameworkComponentsMyReport = {
    buttonRenderer: ButtonRendererComponent,
  };
  defaultColDefMyReport = {
    sortable: true,
    resizable: true,
    filter: true
  };

  //////////////////

  progressTaskFunc(params) {
    var taskcompletion = params.data.progressby;
    var taskprogress = params.data.progressbar;
    // var taskprogresscolor = params.data.taskColor;

    var template1 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

    var template2 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

    var template3 = '<div class="jcp-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
      ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
    if (taskcompletion == "Generated") {
      return template1;
    } else if (taskcompletion == "#5 in Queue") {
      return template2;
    } else {
      return template3;
    }
  }

  onGridReadyMyReport(params) {
    console.log(params, "params");

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi.autoSizeColumns();

    this.httpClient
      .get("assets/data/report/my-report.json")
      .subscribe(data => {
        this.rowDataMyReport = data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    console.log(this._mySelect, "this._mySelect");
    // ///////mat seletec report measure////////////
    this._mySelect.openedChange
      .subscribe((opened) => {
        if (!opened) {
          this.overlayContainer.getContainerElement().classList.remove('select-overlay');
        }
      });
    // ///////mat seletec report measure////////////
  }
  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }


  // animal: string;
  // name: string;
  openDialog(): void {
    this.router.navigate(['/Home/Reports-and-Dashboard/Report-Wizard']);
    // const dialogRef = this.dialog.open(CreateReportComponent, {
    //   width: "700px",
    //   panelClass: "material-dialog-container",
    //   data: { name: this.name, animal: this.animal }
    // });

    // dialogRef.afterClosed().subscribe(result => {

    //   this.animal = result;
    // });
  };

}
