import { Component, OnInit } from '@angular/core';
import { DataSharHttpService } from '../data-shar-http.service';

export class GroupLevel {
  level = 0;
  field = '';
}

@Component({
  selector: 'app-ag-grid-row-rendering',
  templateUrl: './ag-grid-row-rendering.component.html',
  styleUrls: ['./ag-grid-row-rendering.component.scss']
})
export class AgGridRowRenderingComponent implements OnInit {
  groupList: GroupLevel[] = [];
  columnDefs: any[];
  rowData: any[];
  public gridApi;

  public gridColumnApi;
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  constructor(protected dataSourceService: DataSharHttpService) {
    this.columnDefs = [
      {
        headerName: 'Zone',
        field: 'zone',
        sortable: true,
        filter: true,
        cellRenderer: getValue
      },
      {
        headerName: 'Complaint',
        field: 'compliant',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Non Complaint',
        field: 'noncompliant',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Import Date',
        field: 'importdate',
        sortable: true,
        filter: true
      }
    ];
    this.setGroupDetails(1, 'zone');
    this.setGroupDetails(2, 'circle');
    this.setGroupDetails(3, 'jiocenter');
  }

  ngOnInit() {
    this.dataSourceService.getAllData().subscribe(
      (data: any) => {
        this.rowData = JSON.parse(JSON.stringify(data));
        this.getGroups(data, this.groupList[0], null, 'root');
      },
      (err: any) => console.log(err)
    );
  }

  /**
   *
   * Ensures that the cell clicked is first column and further calls onGroupClick funtion depending on expand field.
   *
   * @author Gayatri Ganesh
   *
   */
  onCellClicked(event: any) {
    if (event.colDef.field === this.groupList[0].field) {
      if (event.data.expand === false) {
        this.onGroupClick(event.data, event.rowIndex, 'expand');
      } else if (event.data.expand === true) {
        this.onGroupClick(event.data, event.rowIndex, 'collapse');
      }
    }
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
      item.zone = groups[key][0][groupLevel]; // parameter name of groupLevel should be assigned to column key
      item.expand = false;
      item.children = tempItem;
      item.level = groupByLevel.level;
      item.parent = parent;
      const obj = {};
      for (const parameter of item.children) {
        for (const index in parameter) {
          if (parameter.hasOwnProperty(index)) {
            if (!isNaN(parameter[index])) {
              if (obj[index] === undefined) {
                obj[index] = 0;
              }
              obj[index] = obj[index] + parseInt(parameter[index]);
            }
          }
        }
      }
      for (const element in obj) {
        if (obj.hasOwnProperty(element)) {
          item[element] = obj[element];
        }
      }
      tempArray.push(item);
    }

    // arranging the chidren and parent element
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
      '<span><i class="material-icons">add_circle_outline</i>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else if (params['data'].expand === true) {
    return (
      getspace(params.data) +
      '<span><i class="material-icons">remove_circle_outline</i>' +
      '&nbsp;' +
      params.value +
      '</span>'
    );
  } else {
    return getspace(params.data) + params.value;
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