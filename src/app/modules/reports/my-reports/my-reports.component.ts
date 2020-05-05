import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material';
import { HttpClient } from "@angular/common/http";

import { Column, GridOption } from 'angular-slickgrid';

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

// const ELEMENT_DATA: myReportInterface[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

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



  ///////my report tabel//////////
  public products;
  public dataListValue;
  // public dataSource;
  show: any;
  displayedColumns: string[] = ['select', 'position', 'reportName', 'reportMeasure', 'reportCategory', 'targetReport', 'domain', 'nameProgress', 'createdDate'];
  dataSource = new MatTableDataSource<myReportInterface>();
  // dataSource = new MatTableDataSource<myReportInterface>(this.products);
  selection = new SelectionModel<myReportInterface>(true, []);
  ///////my report tabel//////////

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
      this.dataListValue = data;
      this.dataSource = new MatTableDataSource(this.products)
      // this.dataSource = data;
      // this.ELEMENT_DATA=data;
      // this.dataListValue = JSON.stringify(data);
      this.prepareGrid(this.products);
    })

    //////my report data/////////

    

  }

  prepareGrid(item) {
    this.columnDefinitions = [
      { id: 'reportName', name: 'Report Name', field: 'reportName', sortable: true },
      { id: 'reportMeasure', name: 'Report Measure', field: 'reportMeasure', sortable: true },
      { id: 'reportCategory', name: 'Report Category', field: 'reportCategory' },
      { id: 'targetReport', name: 'Target Report', field: 'targetReport' },
      { id: 'domain', name: 'Domain', field: 'domain' },
      { id: 'createdDate', name: 'Created Date', field: 'createdDate' },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true
    };

    // fill the dataset with your data
    // this.dataset = [ /** ...your data... **/ ];
    console.log(item,"item>>>>");


    // "reportName": "PERFORMANCE_MANAGEMENT_LOW…",
    // "reportMeasure": "KPI Report",
    // "reportCategory": "Low PRB Utilization",
    // "targetReport": "Lorem",
    // "domain": "RAN",
    // "nameProgress": "Generated",
    // "countProgress": "100",
    // "createdDate": "12 Dec, 2019"



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
        createdDate: item[i].createdDate
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

  ///////my report tabel//////////

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: myReportInterface): string {
  //   // if (!row) {
  //   //   return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   // }
  //   return `${this.selection.selected.forEach(s => console.log(s.reportName))}`;
  //   // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ///////my report tabel//////////



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
