import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { COLUMN_DEFS } from 'src/app/main-modules/work-orders/rf-oc-workorders/category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-column-defs.constants';
import { HttpClient } from '@angular/common/http';

export class GroupLevel {
  level = 0;
  field = '';
}
const COLUMNDEFS = COLUMN_DEFS;

@Component({
  selector: 'app-ag-grid-tree',
  templateUrl: './ag-grid-tree.component.html',
  styleUrls: ['./ag-grid-tree.component.scss'],
})
export class AgGridTreeComponent implements OnInit {
  @Input('columnDefs') columnDefs;
  @Input('rowData') rowData;
  columnDef: any;
  //columnDefs = COLUMNDEFS;
  // @Input('columnDefs') columnDefs: [];

  public frameworkComponentsList = {
    viewHistroyRenderer: viewHistoryRendererComponent
  };

  dataSource = [];
  allData = [];
  collapseColumn: boolean = true;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  columnObject = {};
  //rowData = [];
  firstHeaderGroup = [];
  groupList: GroupLevel[] = [];
  count = 0;
  icons: { columnGroupClosed: string; columnGroupOpened: string };
  // columnDefs2: ({ headerName: string; field: string; sortable: boolean; filter: boolean; cellRenderer: (params: any) => string; } | { headerName: string; field: string; sortable: boolean; filter: boolean; cellRenderer?: undefined; })[];

  constructor(private httpService: HttpClient) {
    // this.setGroupDetails(1, 'zone');
    // this.setGroupDetails(2, 'circle');
    // this.setGroupDetails(3, 'jiocenter');
  }

  ngOnChanges() {
    if (this.columnDefs) {
      this.setGroupDetails(1, this.columnDefs[0].field);
      if (this.columnDefs[0].headerName) {
        this.columnDefs[0]['cellRenderer'] = getValue;
      }
      this.setFirstHeaders(this.columnDefs);
      this.getGroups(this.rowData, this.groupList[this.count], null, 'root');
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
      this.icons = {
        columnGroupClosed: '<i class="material-icons">add_circle_outline</i>',
        columnGroupOpened: '<i class="material-icons">remove_circle_outline</i>'
      };
    }
  }

  ngOnInit() {

  }

  /**
   *
   * Setter function for Group level
   *
   * @author Gayatri Ganesh
   *
   */
  setGroupDetails(level: number, field: string) {
    const item = new GroupLevel();
    item.level = level;
    item.field = field;
    this.groupList.push(item);
  }

  /**
   *
   * returns columnArray with new field element.
   *
   * @author Prabhudeen Gautam
   *
   */

  getColumnDisplayArray(columnDefs) {
    const columnArray = [];
    columnDefs.forEach(
      (element: { [x: string]: string | number; children: any }) => {
        if (element.children) {
          element['children'].forEach((data: { [x: string]: any }) => {
            this.columnObject[data['field']] = data['headerName'];
            columnArray.push(data['field']);
          });
        } else {
          this.columnObject[element['field']] = '';
        }
      }
    );

    return columnArray;
  }

  /**
   *
   * assigns headerName to the columnDefs
   *
   * @author Prabhudeen Gautam
   *
   */
  setFirstHeaders(columnDefs: any) {
    this.firstHeaderGroup = columnDefs.map((element: { [x: string]: any }) => {
      return element['headerName'];
    });
  }

  /**
   *
   * assigns headerName with the field
   *
   * @author Prabhudeen Gautam
   *
   */
  getHeaderChildren(columnArray: any) {
    const array = [];
    columnArray.forEach((element: { [x: string]: any }) => {
      if (element['headerName']) {
        array.push(element['field']);
      }
    });

    return array;
  }

  @Output() cellClicked = new EventEmitter();
  // onCellClicked(event) {
  //   console.log(event, "e");
  //   if (event.colDef.headerName == " ") {
     
  //   }else{
  //     this.cellClicked.emit(event);
  //   }
    
  // }

  /**
   *
   * Ensures that the cell clicked is first column and further calls onGroupClick funtion depending on expand field.
   *
   * @author Gayatri Ganesh
   *
   */
  onCellClicked(row: any) {
   
    if (row.colDef.field === this.groupList[0].field) {
      if (row.data.expand === false) {
        this.onGroupClick(row.data, row.rowIndex, 'expand');
      } else if (row.data.expand === true) {
        this.onGroupClick(row.data, row.rowIndex, 'collapse');
      }
    }else{
      if (row.data.level >= 2) {
        this.cellClicked.emit(row);
      }
    }
  }

  /**
   *
   * Creates row groups corresponding to groupBylevel
   *
   * @author Gayatri Ganesh
   *
   */
  getGroups(
    data: any[],
    groupByLevel: GroupLevel,
    rowIndex: number,
    parent: string
  ) {
    const groupLevel = groupByLevel.field;
    const tempArray = [];

    const parentArray = JSON.parse(JSON.stringify(this.rowData));
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
            // if (!isNaN(parseInt(parameter[index]))) {
            //   if (obj[index] === undefined) {
            //     obj[index] = 0;
            //   }
            //   obj[index] = obj[index] + parseInt(parameter[index]);
            // }
            if (!isNaN(parameter[index]) && parseInt(parameter[index])) {
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
      this.rowData = JSON.parse(JSON.stringify(parentArray));
    } else {
      this.rowData = JSON.parse(JSON.stringify(tempArray));
    }
  }

  /**
   *
   * Ensures whether group should be expanded or collapsed
   *
   * @author Gayatri Ganesh
   *
   */
  onGroupClick(
    row: { children: any; level: number; expand: boolean },
    index: number,
    action: string
  ) {
    const parentArray = JSON.parse(JSON.stringify(this.rowData));

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
            array[i - 1].level = this.groupList.length + 1;
            array[i - 1].parent =
              array[i - 1][this.groupList[this.groupList.length - 1].field];
            parentArray.splice(index + i, 0, array[i - 1]);
          }
          parentArray[index].expand = true;

          this.rowData = JSON.parse(JSON.stringify(parentArray));
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
        this.rowData = JSON.parse(JSON.stringify(parentArray));
        break;
      default:
        break;
    }
  }

 




}

/**
 *
 * Returns material icons corresponding to expand field.
 *
 * @author Gayatri Ganesh
 *
 */
function getValue(params: any) {
  if (params['data'].expand === false) {
    return (
      getspace(params.data) +
      '<span><i class="fas fa-plus-square"></i>' +
      '&nbsp;' +
      // params.value +
      '</span>'
    );
  } else if (params['data'].expand === true) {
    return (
      getspace(params.data) +
      '<span><i class="fas fa-minus-square"></i>' +
      '&nbsp;' +
      // params.value +
      '</span>'
    );
  } else {
    // return getspace(params.data) + params.value;
  }
}

/**
 *
 * Returns whitespace before icon corresponding to group level.
 *
 * @author Gayatri Ganesh
 *
 */
function getspace(item: { level: any }) {
  const level = item.level;
  let count: number;
  let i = 0;
  let spaceString = '&nbsp;';

  if (level === 1) {
    return '';
  }
  count = level;

  for (i; i < count * 3; i++) {
    spaceString = spaceString + '&nbsp;';
  }
  return spaceString;
}

