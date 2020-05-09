import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material';
import { HttpClient } from "@angular/common/http";


// ag grid
import { GridOptions } from "ag-grid-community";

declare var $: any;

interface reportsMeasure {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {


  ///////////////////////////
  private gridApi;
  private rowSelection;
  private gridColumnApi;
  private columnDefsMyReport;
  private defaultColDefMyReport;
  private rowDataMyReport: any[string];
  private icons;
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

  constructor(private overlayContainer: OverlayContainer, private httpClient: HttpClient) {

    ////////MyReport table////////
    this.columnDefsMyReport = [
      {
        headerName: "Report Name",
        field: "reportname",
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true,
        width: 320
      }, {
        headerName: "Report Measure",
        field: "reportmeasure",
        width: 180
      }, {
        headerName: "Report Category",
        field: "reportcategory",
        width: 210
      },
      //  {
      //   headerName: "Target Report",
      //   field: "targetreport",
      //   width: 140
      // }, {
      //   headerName: "Domain",
      //   field: "domain",
      //   width: 100
      // },
      {
        headerName: "Progress",
        cellRenderer: this.progressTaskFunc,
        enableRowGroup: true,
        width: 180
      },
      {
        headerName: "Created Date",
        field: "createddate",
        width: 180
      }, {
        headerName: "",
        suppressSorting: true,
        suppressMenu: true,

        cellRenderer: function (params) {
          if (!params.data)
            return '';
          var template = '<div style="font-size: 20px;"> <i class="zmdi zmdi-more-vert"></i> </div>';
          return template;
        },
        width: 80
      }
    ];

    this.icons = {
      filter: '<i class="ag-icon ag-icon-filter"/>',
      groupExpanded: '<mat-icon class="material-icons">indeterminate_check_box</mat-icon>',
      groupContracted: '<mat-icon class="material-icons">add_box</mat-icon>',
      checkboxChecked: '<i class="checkboxchecked-ag-grid fa fa-check-square-o"/>',
      checkboxUnchecked: '<i class="fa fa-square-o"/>',
      checkboxIndeterminate: '<i class="fa fa-circle-o"/>'
    };
    //////////////////

  }


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
  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  // }
  onGridReadyMyReport(params) {
    console.log(params,"params");
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

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

}
