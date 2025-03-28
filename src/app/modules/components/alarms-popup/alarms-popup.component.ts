
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridOptions, GridCore, GridApi, ColumnApi, } from "@ag-grid-community/all-modules";
import { HttpClient } from "@angular/common/http";

declare var require: any;

@Component({
  selector: 'app-alarms-popup',
  templateUrl: './alarms-popup.component.html',
  styleUrls: ['./alarms-popup.component.scss']
})
export class AlarmsPopupComponent implements OnInit {
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public row;
  public columnah;
  public rowah;
  public columnss;
  public rowss;
  public columnlh;
  public rowlh;
  rowClassRules: any;


  rowClassRulesah: { redFont: (params: any) => boolean; greenFont: (params: any) => boolean; };
  rowClassRulesss: { redFont: (params: any) => boolean; greenFont: (params: any) => boolean; };
  rowClassRuleslh: { redFont: (params: any) => boolean; greenFont: (params: any) => boolean; };
  rowClassRulesaa: { redFont: (params: any) => boolean; greenFont: (params: any) => boolean; };

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(

    private dialogRef: MatDialogRef<AlarmsPopupComponent>,
    public dialog: MatDialog, public flexlayout: FlexLayoutModule, private http: HttpClient) {


    this.gridOptions = <GridOptions>{};
    //this.httpClientRowData();
    this.createColumnDefs();
    this.createRowdata();
    this.createColumnah();
    this.createRowah();
    this.createColumnlh();
    this.createRowlh();
    this.createColumnss();
    this.createRowss();


  }


  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Site ID",
        field: "siteid",
        width: 220,
        cellClass: 'lock-pinned',
        pinned: "left"
      }, {
        headerName: "Cell ID",
        field: "cellid",
        width: 160,
        cellClass: 'lock-pinned',
      }, {
        headerName: "Band",
        field: "band",
        width: 100,
        cellClass: 'lock-pinned'
      },

      {
        headerName: "Alarm ID",
        field: "alarmid",
        width: 190,
        cellClass: 'lock-pinned',
      }, {
        headerName: "Severity",
        field: 'severity',
        width: 140,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "Start Date",
        field: 'startdate',
        width: 140,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "Start Time",
        field: 'starttime',
        width: 140,
        cellClass: 'lock-pinned'
      },
      {
        headerName: "JCP Classification",
        field: 'jcpclassification',
        width: 180,
        cellClass: 'lock-pinned',
        pinned: "right"
      }

    ];

  }
  private createColumnah() {
    this.columnah = [
      {
        headerName: "Site ID",
        field: "siteid",
        width: 200
      }, {
        headerName: "Cell ID",
        field: "cellid",
        width: 160
      }, {
        headerName: "Band",
        field: "band",
        width: 100
      },

      {
        headerName: "Alarm ID",
        field: "alarmid",
        width: 190
      }, {
        headerName: "Vendor Name",
        field: 'vendorname',
        width: 180
      },
      {
        headerName: "JCP Classification",
        field: 'jcpclassification',
        width: 180
      },
      {
        headerName: "Clear Type",
        field: 'cleartype',
        width: 140
      },
      {
        headerName: "Start Date",
        field: 'startdate',
        width: 140
      },
      {
        headerName: "Start Time",
        field: 'starttime',
        width: 140
      },
      {
        headerName: "End Date",
        field: 'enddate',
        width: 140
      }


    ];
  }
  private createColumnlh() {
    this.columnlh = [
      {
        headerName: "Site ID",
        field: "siteid",
        width: 200
      }, {
        headerName: "Vendor Name",
        field: "vendorname",
        width: 160
      }, {
        headerName: "Planned / Incidental",
        field: "plannedincidental",
        width: 180
      },

      {
        headerName: "Classification",
        field: "classification",
        width: 160
      }, {
        headerName: "Aging / Outage Mints",
        field: 'agingoutagemints',
        width: 180
      },
      {
        headerName: "Start Date",
        field: 'startdate',
        width: 140
      },
      {
        headerName: "Start Time",
        field: 'starttime',
        width: 140
      },
      {
        headerName: "End Date",
        field: 'enddate',
        width: 140
      },
      {
        headerName: "End Time",
        field: 'endtime',
        width: 140
      },
      {
        headerName: "ETA",
        field: 'eta',
        width: 140
      },
      {
        headerName: "Impacted Service Type",
        field: 'impactedservicetype',
        width: 190
      }


    ];
  }

  private createColumnss() {
    this.columnss = [
      {
        headerName: "Site ID",
        field: "siteid",
        width: 200
      }, {
        headerName: "Cell ID",
        field: "cellid",
        width: 120
      }, {
        headerName: "Band",
        field: "band",
        width: 100
      },

      {
        headerName: "Vendor Name",
        field: "vendorname",
        width: 170
      }, {
        headerName: "Current Status",
        field: 'currentstatus',
        width: 170
      },
      {
        headerName: "Outage Frequency Per Day(avg. past month)",
        field: 'outagefreqperday',
        width: 280
      },
      {
        headerName: "Start Date",
        field: 'startdate',
        width: 140
      },
      {
        headerName: "Start Time",
        field: 'starttime',
        width: 140
      },
      {
        headerName: "End Date",
        field: 'enddate',
        width: 140
      },
      {
        headerName: "End Time",
        field: 'endtime',
        width: 140
      },
      {
        headerName: "Total Outage Minutes",
        field: 'totaloutagemints',
        width: 280
      }



    ];
  }

  ngOnInit(): void {
    this.rowClassRulesaa = {
      'redFont': function (params) {
        return params.data.jcpclassification == 'outage'
      },
      'greenFont': function (params) {
        return params.data.jcpclassification == 'pdegradation'
      },
    }
    this.rowClassRulesah = {
      'redFont': function (params) {
        return params.data.jcpclassification == 'Outage'
      },
      'greenFont': function (params) {
        return params.data.jcpclassification == 'Performance Degrading'
      },

    }
    this.rowClassRulesss = {
      'redFont': function (params) {
        return params.data.currentstatus == 'Outage'
      },
      'greenFont': function (params) {
        return params.data.currentstatus == 'Operational'
      },
    },
      this.rowClassRuleslh = {
        'greenFont': function (params) {
          return params.data.plannedincidental == 'Incidental'
        },
        'redFont': function (params) {
          return params.data.plannedincidental == 'Planned'
        },
      }
  }

  openDialogAlarms() {
    const dialogRef = this.dialog.open(AlarmsPopupComponent, {
      width: "850px",
      panelClass: "material-dialog-container",
    });
  };

  closeDialog() {
    this.dialogRef.close();
  }

  private createRowdata() {
    this.http.get("assets/data/layers/popup-data/alarms-popup-dataset-1.json")
      .subscribe(data => {
        this.row = data;
      });
  }

  private createRowah() {
    this.http.get("assets/data/layers/popup-data/alarms-popup-dataset-2.json")
      .subscribe(data => {
        this.rowah = data;
      });
  }

  private createRowss() {
    this.http.get("assets/data/layers/popup-data/alarms-popup-dataset-site-status.json")
      .subscribe(data => {
        this.rowss = data;
      });
  }

  private createRowlh() {
    this.http.get("assets/data/layers/popup-data/alarms-popup-dataset-legal-history.json")
      .subscribe(data => {
        this.rowlh = data;
      });
  }


}