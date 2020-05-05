import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material';
import { HttpClient } from "@angular/common/http";

import { Column, GridOption, FieldType, Formatter, Formatters, Filters, SelectedRange, ContextMenu, ExtensionName, } from 'angular-slickgrid';

// import Popper, {PopperOptions} from 'popper.js';

export interface myReportInterface {
  // position: number;
  reportName: string;
  reportMeasure: string;
  reportCategory: string;
  targetReport: string;
  domain: string;
  nameProgress: string;
  countProgress: number;
  createdDate: string;
}

// create my custom Formatter with the Formatter type
const taskCompletedFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below

  // return value ? `<i class="zmdi zmdi-more-vert" aria-hidden="true"></i>` : { text: '<i class="zmdi zmdi-more-vert" aria-hidden="true"></i>', addClasses: 'lightblue', toolTip: 'Freezing' };
  console.log(row, "row");
  console.log(cell, "cell");
  console.log(value, "val");
  console.log(columnDef, "columnDef");
  console.log(dataContext, "dataContext");

  var taskcompletion = dataContext.taskcompletion;
  var taskprogress = dataContext.taskprogress;
  var template1 = '<div class="md-two-lines-cell md-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
    ' <div class="progress"> <div class="progress-bar bg-success" style="width:' + taskprogress + '%"></div> </div></div>';

  var template2 = '<div class="md-two-lines-cell md-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
    ' <div class="progress"> <div class="progress-bar bg-warning" style="width:' + taskprogress + '%"></div> </div></div>';

  var template3 = '<div class="md-two-lines-cell md-two-lines-progress">' + '<div class="values">' + taskcompletion + '</div>' +
    ' <div class="progress"> <div class="progress-bar bg-danger" style="width:' + taskprogress + '%"></div> </div></div>';
  if (taskcompletion == "Generated") {
    return template1;
  } else if (taskcompletion == "#5 in Queue") {
    return template2;
  } else {
    return template3;
  }
};
const customMenuFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below

  // return value ? `<i class="zmdi zmdi-more-vert" aria-hidden="true"></i>` : { text: '<i class="zmdi zmdi-more-vert" aria-hidden="true"></i>', addClasses: 'lightblue', toolTip: 'Freezing' };
  console.log(row, "row");
  console.log(cell, "cell");
  console.log(value, "val");
  console.log(columnDef, "columnDef");
  console.log(dataContext, "dataContext");


  var template = '<button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">'+
  '<i class="zmdi zmdi-more-vert" aria-hidden="true"></i>'+
  '</button>'+
  '<mat-menu #menu="matMenu">'+
  '<button mat-menu-item>'+
  '<mat-icon>dialpad</mat-icon>'+
  ' <span>Redial</span>'+
  '</button>'+
  '<button mat-menu-item disabled>'+
  '<mat-icon>voicemail</mat-icon>'+
  '<span>Check voice mail</span>'+
  ' </button>'+
  '<button mat-menu-item>'+
  '<mat-icon>notifications_off</mat-icon>'+
  '<span>Disable alerts</span>'+
  '</button>'+
  '</mat-menu>';



  return template;

};


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



  // ///////my report tabel//////////
  public products;
  // public dataListValue;
  // // public dataSource;
  // show: any;
  // displayedColumns: string[] = ['select', 'position', 'reportName', 'reportMeasure', 'reportCategory', 'targetReport', 'domain', 'nameProgress', 'createdDate'];
  // dataSource = new MatTableDataSource<myReportInterface>();
  // // dataSource = new MatTableDataSource<myReportInterface>(this.products);
  // selection = new SelectionModel<myReportInterface>(true, []);
  // ///////my report tabel//////////

  ///////report measure/////////////
  public reportMeasureSelected = "Performance Management";
  // @ViewChild('matSelect') matSelect: MatSelect;
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  reportsMeasureList: reportsMeasure[] = [
    { value: 'Configuration Management', viewValue: 'Configuration Management' },
    { value: 'LSMR', viewValue: 'LSMR' },
    { value: 'Performance Management', viewValue: 'Performance Management' },
    { value: 'Work Orders', viewValue: 'Work Orders' }
  ];
  ///////report measure/////////////



  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  constructor(private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    //////my report data/////////

    this.httpClient.get("../../../../assets/data/report/my-report.json").subscribe(data => {
      console.log(data);
      this.products = data;
      // this.dataListValue = data;
      // this.dataSource = new MatTableDataSource(this.products)
      // this.dataSource = data;
      // this.ELEMENT_DATA=data;
      // this.dataListValue = JSON.stringify(data);
      this.prepareGrid(this.products);
    })

    //////my report data/////////

    // const myCustomCheckboxFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
    //   value ? `<i class="fa fa-fire" aria-hidden="true"></i>` : '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';

  }

  prepareGrid(item) {
    this.columnDefinitions = [
      { id: 'reportName', name: 'Report Name', field: 'reportName', sortable: true },
      { id: 'reportMeasure', name: 'Report Measure', field: 'reportMeasure', sortable: true },
      { id: 'reportCategory', name: 'Report Category', field: 'reportCategory' },
      { id: 'targetReport', name: 'Target Report', field: 'targetReport' },
      { id: 'domain', name: 'Domain', field: 'domain' },
      // { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, formatter: Formatters.progressBar, },
      // { id: '%', name: 'Progress', field: 'percentComplete', sortable: true, formatter: Formatters.percentCompleteBar, type: FieldType.number, minWidth: 100 },
      { id: '%', name: 'Progress', field: 'percentComplete', sortable: true, formatter: taskCompletedFormatter },
      { id: 'createdDate', name: 'Created Date', field: 'createdDate' },
      { id: 'sideMenuList', name: '', field: 'sideMenuList', sortable: true, formatter: customMenuFormatter, },
      // {
      //   id: 'description', name: 'Description', field: 'description', type: FieldType.string,
      //   filterable: true,
      //   filter: {
      //     model: new CustomInputFilter() // create a new instance to make each Filter independent from each other
      //   }
      // }
      // { id: 'sideMenuList', name: '', field: 'sideMenuList', sortable: true, formatter: Formatters.percentCompleteBar, type: FieldType.number, minWidth: 100 },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true
    };

    // fill the dataset with your data
    // this.dataset = [ /** ...your data... **/ ];
    console.log(item, "item>>>>");

    // this.dataset = item;
    this.dataset = [];

    // for demo purpose, let's mock a 1000 lines of data
    for (let i = 0; i < item.length; i++) {

      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i, // again VERY IMPORTANT to fill the "id" with unique values
        reportName: item[i].reportName,
        reportMeasure: item[i].reportMeasure,
        reportCategory: item[i].reportCategory,
        targetReport: item[i].targetReport,
        domain: item[i].domain,
        percentComplete: randomPercent,
        taskprogress: item[i].taskprogress,
        taskcompletion: item[i].taskcompletion,
        createdDate: item[i].createdDate,
        sideMenuList: item[i].sideMenuList
        // dependencies: this.getRandomSubarray(["a","b","c"],Math.floor(Math.random()*3)+1),
        // duration: Math.round(Math.random() * 100) + '',

      };
    }


  }


  getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  // ///////my report tabel//////////

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // // /** The label for the checkbox on the passed row */
  // // checkboxLabel(row?: myReportInterface): string {
  // //   // if (!row) {
  // //   //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  // //   // }
  // //   return `${this.selection.selected.forEach(s => console.log(s.reportName))}`;
  // //   // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // // }


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // ///////my report tabel//////////



  ngOnInit() {
    console.log(this._mySelect, "this._mySelect");
    // this._mySelect.overlayDir.panelClass = 'my-select-overlay';
    // console.log(this.matSelect);

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
