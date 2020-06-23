import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
export class GroupLevel {
  level = 0;
  field = '';
}
@Component({
  selector: 'app-row-group-table',
  templateUrl: './row-group-table.component.html',
  styleUrls: ['./row-group-table.component.scss']
})
export class RowGroupTableComponent implements OnInit {

  
  // public dataSource = new MatTableDataSource<any>([]);
  dataSource = [];
  displayedColumns: string[];
  groupList: GroupLevel[] = [];
  allData: any[];
  count = 0;
  compliantSum = 0;
  nonCompliantSum = 0;

  constructor(private httpService: HttpClient,
    public dialog: MatDialog
  ) {
    this.displayedColumns = [
      'Zone',
      'Complaint',
      'Non Complaint',
      'Import Date',
      'Action'
    ];
    this.setGroupDetails(1, 'zone');
    this.setGroupDetails(2, 'circle');
    this.setGroupDetails(3, 'jiocenter');
    // this.setGroupDetails(4, 'technology');
  }

  ngOnInit() : void{

    this.httpService
      .get('assets/data/network.json')
      .subscribe((data: any[]) => {
        this.allData = data;
        this.dataSource = data;
        this.getTotal();
        this.getGroups(this.allData, this.groupList[this.count], null, 'root');
      });
    // this.dataSourceService.getAllData().subscribe(
    //   (data: any) => {
    //     this.allData = JSON.parse(JSON.stringify(data));
    //     this.dataSource.data = JSON.parse(JSON.stringify(this.allData));
    //     this.getTotal();
    //     this.getGroups(this.allData, this.groupList[this.count], null, 'root');
    //   },
    //   (err: any) => console.log(err)
    // );
  }

  setGroupDetails(level: number, field: string) {
    const item = new GroupLevel();
    item.level = level;
    item.field = field;
    this.groupList.push(item);
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

  getTotal() {
    for (const el of this.allData) {
      this.compliantSum = this.compliantSum + el.compliant;
      this.nonCompliantSum = this.nonCompliantSum + el.noncompliant;
    }
  }

  getSpace(level: number) {
    let count: number;
    if (level !== undefined) {
      if (level === 1) {
        return '';
      }
      count = level;
    } else {
      count = this.groupList[this.groupList.length - 1].level + 1;
    }
    let i = 0;
    let spaceString = '&nbsp;';
    for (i; i < count * 4; i++) {
      spaceString = spaceString + '&nbsp;';
    }
    return spaceString;
  }

  onRowClick(row: any) {
    // const dialogRef = this.dialog.open(ModalTemplateComponent, {
    //   width: '1000px',
    //   height: '600px',
    //   data: row
    // });
  }

}
