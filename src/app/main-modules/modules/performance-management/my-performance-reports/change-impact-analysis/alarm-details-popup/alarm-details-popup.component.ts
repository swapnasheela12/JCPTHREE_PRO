
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
const Header_Active_Alarms = [

  {
    headerName: "Site ID",
    field: "siteid",
    width: 220,
  },
  {
    headerName: "Cell ID",
    field: "cellid",
    width: 130,
  },
  {
    headerName: "Band",
    field: "band",
    width: 130,
  },
  {
    headerName: "Alarm ID",
    field: "alarmid",
    width: 210,
    tooltipField: "alarmid"
  },
  {
    headerName: "Severity",
    field: "severity",
    width: 150,
  },
  {
    headerName: "Start Date",
    field: "startdate",
    width: 150,
  },
  {
    headerName: "Start Time",
    field: "starttime",
    width: 150,
  },
  {
    headerName: "JCP Classification",
    field: "jcpclassification",
    width: 220,
  },
];
const Header_Alarms_History = [
  {
    headerName: "Site ID",
    field: "siteid",
    width: 220,
  },
  {
    headerName: "Cell ID",
    field: "cellid",
    width: 140,
  },
  {
    headerName: "Band",
    field: "band",
    width: 140,
  },
  {
    headerName: "Alarm ID",
    field: "alarmid",
    width: 210,
    tooltipField: "alarmid"
  },
  {
    headerName: "Vendor Name",
    field: "vendorname",
    width: 160,
  },
  {
    headerName: "JCP Classification",
    field: "jcpclassification",
    width: 210,
  },
  {
    headerName: "Clear Type",
    field: "cleartype",
    width: 150
  },
  {
    headerName: "Start Date",
    field: "startdate",
    width: 130
  },
  {
    headerName: "Start Time",
    field: "starttime",
    width: 145
  },
  {
    headerName: "End Date",
    field: "enddate",
    width: 130
  },
];
const Header_Site_Details = [
  {
    headerName: "Site ID",
    field: "siteid",
    width: 220,
    headerClass: 'no-child-headers',
  },
  {
    headerName: "Cell ID",
    field: "cellid",
    width: 140,
    headerClass: 'no-child-headers'
  },
  {
    headerName: "Band",
    field: "band",
    width: 140,
    headerClass: 'no-child-headers'
  },
  {
    headerName: "Vendor Name",
    field: "vendorname",
    width: 160,
    headerClass: 'no-child-headers'
  },
  {
    headerName: "Current Status",
    field: "currentstatus",
    width: 160,
    headerClass: 'no-child-headers'
  },
  {
    headerName: "Outage Freq. per day (avg. past month)",
    field: "outagefreq",
    width: 310,
    headerClass: 'no-child-headers'
  }, {
    headerName: "Last Outage",
    children: [{
      headerName: "Start Date",
      field: "startdate",
      width: 130,
      suppressMenu: true
    }, {
      headerName: "Start Time",
      field: "starttime",
      width: 130,
      suppressMenu: true
    }, {
      headerName: "End Date",
      field: "enddate",
      width: 130,
      suppressMenu: true
    }, {
      headerName: "End Time",
      field: "endtime",
      width: 130,
      suppressMenu: true
    }]
  }, {
    headerName: "Total Outage Mins (past month)",
    field: "totaloutagemin",
    width: 280,
    headerClass: 'no-child-headers'
  }
];
@Component({
  selector: 'app-alarm-details-popup',
  templateUrl: './alarm-details-popup.component.html',
  styleUrls: ['./alarm-details-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlarmDetailsPopupComponent implements OnInit {
  // Active Alarms
  public gridActiveAlarmsColumnDefs: any[]
  public activeAlarmsGridOptions: GridOptions;
  public gridActiveAlarmsData: any;
  public activeAlarmsUrl: string = "assets/data/modules/performance_management/my-performance-report/chart-active-alarms.json";

  // Alarms History
  public gridAlarmsHistoryColumnDefs: any[]
  public alarmsHistoryGridOptions: GridOptions;
  public gridAlarmsHistoryData: any;
  public alarmsHistoryUrl: string = "assets/data/modules/performance_management/my-performance-report/chart-alarms-history.json";

  // Site Details
  public gridSiteDetailsColumnDefs: any[]
  public siteDetailsGridOptions: GridOptions;
  public gridSiteDetailsData: any;
  public siteDetailsUrl: string = "assets/data/modules/performance_management/my-performance-report/chart-site-status.json";

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AlarmDetailsPopupComponent>,
    private http: HttpClient) {
    this.activeAlarmsGridOptions = <GridOptions>{};
    this.alarmsHistoryGridOptions = <GridOptions>{};
    this.siteDetailsGridOptions = <GridOptions>{};
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    // Active Alarms
    this.createActiveAlarmDefs();
    this.getActiveAlarmsData();

    // Alarms History
    this.createAlarmsHistoryDefs();
    this.getAlarmsHistoryData();

    // Site Details
    this.createSiteDetailsDefs();
    this.getSiteDetailsData();
  }

  // Active Alarms
  public createActiveAlarmDefs() {
    this.gridActiveAlarmsColumnDefs = Header_Active_Alarms;
  }
  public getActiveAlarmsData() {
    this.http.get(this.activeAlarmsUrl)
      .subscribe(data => {
        this.gridActiveAlarmsData = data;
      });
  }

  // Alarms history
  public createAlarmsHistoryDefs() {
    this.gridAlarmsHistoryColumnDefs = Header_Alarms_History;
  }
  public getAlarmsHistoryData() {
    this.http.get(this.alarmsHistoryUrl)
      .subscribe(data => {
        this.gridAlarmsHistoryData = data;
      });
  }

  // Site Details
  public createSiteDetailsDefs() {
    this.gridSiteDetailsColumnDefs = Header_Site_Details;
  }
  public getSiteDetailsData() {
    this.http.get(this.siteDetailsUrl)
      .subscribe(data => {
        this.gridSiteDetailsData = data;
      });
  }
}
