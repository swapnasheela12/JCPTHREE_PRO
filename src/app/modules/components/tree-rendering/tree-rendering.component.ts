import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from '../column-rendering/column-defs.constant';

const COLUMNDEFS = COLUMN_DEFS;
export class GroupLevel {
  level = 0;
  field = '';
}
@Component({
  selector: 'app-tree-rendering',
  templateUrl: './tree-rendering.component.html',
  styleUrls: ['./tree-rendering.component.scss']
})
export class TreeRenderingComponent implements OnInit {

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
  groupList: GroupLevel[] = [];
  count = 0;
  constructor(private httpService: HttpClient) {
    this.setGroupDetails(1, 'vendor');
  }

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
      .get('assets/data/table-demo-data/tree-group-list.json')
      .subscribe((data: any[]) => {
        this.allData = JSON.parse(JSON.stringify(data));
        this.dataSource = data;
        this.getGroups(data, this.groupList[this.count], null, 'root');
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

  setGroupDetails(level: number, field: string) {
    const item = new GroupLevel();
    item.level = level;
    item.field = field;
    this.groupList.push(item);
  }

  getColumnDisplayArray(columnDefs) {
    const columnArray = [];
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
    console.log(columnDefs,"columnDefs");
    
    this.firstHeaderGroup = columnDefs.map(element => {

      return element['headerName'];
    });
  }

  getHeaderChildren(columnArray) {
    const array = [];
    columnArray.forEach(element => {
      if (element['headerName']) array.push(element['field']);
    });

    return array;
  }

  addColumn(header) {
    if (header.isOpen) {
      const index = this.columnsToDisplay.findIndex(
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
      const index = this.columnsToDisplay.findIndex(
        data => header['columnName'] === data
      );
      this.columnsToDisplay.splice(index, 1, ...header.children);
      header.isOpen = true;
      header.groupSize = header.children.length;
    }
  }

  getTotal(column) {
    return this.allData
      .map(t => (t[column] ? Number(t[column]) : 0))
      .reduce((acc, value) => acc + value, 0);
  }

  getGroups(
    data: any[],
    groupByLevel: GroupLevel,
    rowIndex: number,
    parent: string
  ) {
    const groupLevel = groupByLevel.field;
    const tempArray = [];

    const parentArray = JSON.parse(JSON.stringify(this.dataSource));
    const groups = data.reduce((groups, item) => {
      const group = groups[item[groupLevel]] || [];
      group.push(item);
      groups[item[groupLevel]] = group;
      return groups;
    }, {});

    for (const key of Object.keys(groups)) {
      const tempItem = JSON.parse(JSON.stringify(groups[key]));
      const item = groups[key][0];
      item.expand = false;
      item.children = tempItem;
      item.level = groupByLevel.level;
      item.parent = parent;
      const obj = {};
      let i = 1;
      for (const parameter of item.children) {
        parameter.vendor = parameter.vendor + i.toString();
        for (const index in parameter) {
          if (parameter.hasOwnProperty(index)) {
            if (!isNaN(parseInt(parameter[index]))) {
              if (obj[index] === undefined) {
                obj[index] = 0;
              }
              obj[index] = obj[index] + parseInt(parameter[index]);
            }
          }
        }
        ++i;
      }
      for (const index in obj) {
        if (obj.hasOwnProperty(index)) {
          item[index] = obj[index];
        }
      }
      tempArray.push(item);
    }
    if (groupByLevel.level !== 1) {
      parentArray[rowIndex].expand = true;
      for (let i = 1; i <= tempArray.length; i++) {
        parentArray.splice(rowIndex + i, 0, tempArray[i - 1]);
      }
      this.dataSource = JSON.parse(JSON.stringify(parentArray));
    } else {
      this.dataSource = JSON.parse(JSON.stringify(tempArray));
    }
  }
  onGroupClick(
    row: { children: any; level: number; expand: boolean },
    index: number,
    action: string
  ) {
    const parentArray = JSON.parse(JSON.stringify(this.dataSource));

    switch (action) {
      case 'expand':
        const array = row.children;
        if (row.level < this.groupList.length) {
          parentArray[index].expand = true;
          this.getGroups(
            array,
            this.groupList[row.level],
            index,
            parentArray[index].zone
          );
        } else {
          let i: number;
          for (i = 1; i <= array.length; i++) {
            array[i - 1].parent =
              array[i - 1][this.groupList[this.groupList.length - 1].field];
            parentArray.splice(index + i, 0, array[i - 1]);
          }
          parentArray[index].expand = true;

          this.dataSource = JSON.parse(JSON.stringify(parentArray));
        }
        break;
      case 'collapse':
        const groupLevel = row.level;
        parentArray[index].expand = false;
        const i = ++index;
        while (
          parentArray[i] !== undefined &&
          (groupLevel < parentArray[i].level ||
            parentArray[i].level === undefined)
        ) {
          parentArray.splice(i, 1);
        }
        this.dataSource = JSON.parse(JSON.stringify(parentArray));
        break;
      default:
        break;
    }
  }
  getSpace(level: number) {
    let count: number;
    if (level !== undefined) {
      count = level;
    } else {
      count = this.groupList[this.groupList.length - 1].level + 2;
    }
    let i = 0;
    let spaceString = '&nbsp;';
    for (i; i < count * 4; i++) {
      spaceString = spaceString + '&nbsp;';
    }
    return spaceString;
  }
}
