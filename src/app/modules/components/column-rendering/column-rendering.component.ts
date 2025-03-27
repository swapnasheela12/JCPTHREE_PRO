import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from './column-defs.constant';

const COLUMNDEFS = COLUMN_DEFS;
@Component({
  selector: 'app-column-rendering',
  templateUrl: './column-rendering.component.html',
  styleUrls: ['./column-rendering.component.scss']
})
export class ColumnRenderingComponent implements OnInit {

  columnDef: any;
  // @Input('columnDefs') columnDefs: [];
  columnDefs = COLUMNDEFS;
  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};
  rowData = [];
  firstHeaderGroup = [];
  
  constructor(private httpService: HttpClient) {}

  ngOnInit() {
    this.columnsToDisplay = [
      'vendor',
      'backhaultotal',
      'datacentertotal',
      'internettotal',
      'l2total',
      'datacommunicationtotal'
    ];
    this.setFirstHeaders(this.columnDefs);

    this.httpService
      .get('assets/data/modules/configuration_management/network-tree-ip.json')
      .subscribe((data: any[]) => {
        this.allData = data;
        this.dataSource = data;
      });
    this.displayedColumns = this.getColumnDisplayArray(this.columnDefs);
    this.columnDef = [];
    this.columnDefs.forEach(element => {
      if (element['children']) {
        this.columnDef.push({
          headerName: element['headerName'],
          groupSize: 1,
          columnName: element['children'][0]['field'],
          isOpen: false,
          children: this.getHeaderChildren(element['children'])
        });
      }
    });
  }

  getColumnDisplayArray(columnDefs) {
    let columnArray = [];
    columnDefs.forEach(element => {
      if (element.children) {
        element['children'].forEach(data => {
          this.columnObject[data['field']] = data['headerName'];
          columnArray.push(data['field']);
        });
      } else {
        this.columnObject[element['field']] = '';
      }
    });

    return columnArray;
  }

  setFirstHeaders(columnDefs) {
    this.firstHeaderGroup = columnDefs.map(element => {
      return element['headerName'];
    });
  }

  getHeaderChildren(columnArray) {
    let array = [];
    columnArray.forEach(element => {
      if (element['headerName']) array.push(element['field']);
    });

    return array;
  }

  addColumn(header) {
    if (header.isOpen) {
      let index = this.columnsToDisplay.findIndex(
        data => data === header['children'][0]
      );
      this.columnsToDisplay.splice(
        index,
        header.children.length,
        header.columnName
      );
      header.isOpen = false;
      header.groupSize = 1;
    } else {
      let index = this.columnsToDisplay.findIndex(
        data => header['columnName'] === data
      );
      this.columnsToDisplay.splice(index, 1, ...header.children);
      header.isOpen = true;
      header.groupSize = header.children.length;
    }
  }

  getTotal(column) {
    return this.dataSource
      .map(t => (t[column] ? Number(t[column]) : 0))
      .reduce((acc, value) => acc + value, 0);
  }
}
