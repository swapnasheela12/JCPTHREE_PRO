import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
const Header_Active_Alarms = [

  {
    headerName: "Site ID",
    field: "siteid"
  },
  {
    headerName: "Cell ID",
    field: "cellid"
  },
];
@Component({
  selector: 'app-route-table-view',
  templateUrl: './route-table-view.component.html',
  styleUrls: ['./route-table-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RouteTableViewComponent implements OnInit {
  title: string;
  public gridActiveAlarmsColumnDefs: any[]
  public activeAlarmsGridOptions: GridOptions;
  public gridActiveAlarmsData: any;
  public cssJsonUrl: string = "assets/data/modules/performance_management/my-performance-report/chart-active-alarms.json";
  newSaveTempFormControl: FormGroup;
  public icons = [
    { icon: 'close', color: '#6EAFCC', name: "CSS" },
    { icon: 'print', color: '#C7BE8B', name: "Fibre" },
    { icon: 'expand', color: '#7E85A8', name: "Route" },
    { icon: 'alarm_on', color: '#CB9A75', name: "AG1" },
    { icon: 'alarm_add', color: '#B791C6', name: "AG2" },
    { icon: 'autorenew', color: '#8CAD8D', name: "AG3" }
  ];

  selectedItem = 'close';
  labelInfo = [
    {
      label: "Site Name: ",
      value: "Karan"
    },
    {
      label: "R4G: ",
      value: "Mumbai"
    },
    {
      label: "MP Name: ",
      value: "South Mumbai"
    },
    {
      label: "Jio Center:",
      value: "I-AP-AANV-ENB-6000"
    }];
  gridApi: any;
  gridColumnApi: any;
  constructor(public dialogRef: MatDialogRef<RouteTableViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FibreTableViewPopupModel,
    private http: HttpClient) {
    this.title = "CSS";
    this.activeAlarmsGridOptions = <GridOptions>{};
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    // Active Alarms
    this.createActiveAlarmDefs();
    this.getActiveAlarmsData();
  }
  // Active Alarms
  public createActiveAlarmDefs() {
    this.gridActiveAlarmsColumnDefs = Header_Active_Alarms;
  }
  public getActiveAlarmsData() {
    this.http.get(this.cssJsonUrl)
      .subscribe(data => {
        this.gridActiveAlarmsData = data;
      });
  }
  onGridReady(params) {
    console.log(params)
    this.gridApi = params.api;
    // console.log(this.gridApi)
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
     
    params.api.sizeColumnsToFit();
    }, 1000);
    console.log(this.gridColumnApi)
  }
  onClick(item) {
    console.log(item.icon)
    this.title = item.name
    this.selectedItem = item.icon;
    if (this.title == "CSS") {
      this.http.get(this.cssJsonUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
      // }
    } else if (this.title == "Fibre") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-fibre.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }  else if (this.title == "Route") {
      this.http.get(this.cssJsonUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }  else if (this.title == "AG1") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag1.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }  else if (this.title == "AG2") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag2.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "AG3") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag3.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }
  }
}

export class FibreTableViewPopupModel {
  constructor(
    public title: string
  ) {
  }
}