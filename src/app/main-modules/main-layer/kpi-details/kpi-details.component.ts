import { KpiSettingsComponent } from './kpi-settings/kpi-settings.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-kpi-details',
  templateUrl: './kpi-details.component.html',
  styleUrls: ['./kpi-details.component.scss']
})
export class KpiDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<KpiDetailsComponent>, public dialog: MatDialog) { }
  private inited;
  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  listOfKpiDetails = [
    {
      title: "Atoll Planned RSRP ALL",
      color: "#0f73bd",
      value: "-60.54 dBm"
    },
    {
      title: "Atoll Planned RSRP 2300",
      color: "#0f73bd",
      value: "-66.39 dBm"
    },
    {
      title: "Atoll Planned RSRP 1800",
      color: "#0f73bd",
      value: "-63.01 dBm"
    },
    {
      title: "Atoll Planned RSRP 850",
      color: "#0f73bd",
      value: "-61.38 dBm"
    },
    {
      title: "NetVelocity RSRP ALL",
      color: "#96ce58",
      value: "-100.90 dBm"
    },
    {
      title: "NetVelocity RSRP 2300",
      color: "#96ce58",
      value: "-100.92 dBm"
    },
    {
      title: "NetVelocity RSRP 1800",
      color: "#96ce58",
      value: "-100.63 dBm"
    },
    {
      title: "NetVelocity RSRP 850",
      color: "#96ce58",
      value: "-100.38 dBm"
    },
  ]

  kpiSettingPopFun() {
    var kpiSettingListDialogRef = {
      width: '550px',
      height: '600px',
      // position: { bottom: '60px', right: "60px" },
      panelClass: "kpi-setting-layers-dialog-container",
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disableClose: true,
      hasBackdrop: true
    }
    const dialogRef = this.dialog.open(KpiSettingsComponent, kpiSettingListDialogRef);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });

  }

  showChart = false;
  kpiDetailsChartPopFun() {
    this.showChart = true;
  }
}
