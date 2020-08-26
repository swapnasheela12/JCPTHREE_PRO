import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { CustomTooltip } from '../../../my-performance-reports/custom-tooltip.component';

const HELP_DEFS = [
  {
    headerName: "Metric(Value)",
    field: "metrics",
    width: 140,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "Significance",
    field: 'significance',
    width: 140,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "result",
    field: 'result',
    width: 140,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "Description",
    field: 'description',
    width: 220,
    tooltipField: 'description',
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  }
];

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoPopupComponent implements OnInit {
  public helpColumnDefs
  public helpGridOptions: GridOptions;
  public helpGridData;
  public dataUrl;
  public defaultColDef;
  public tooltipShowDelay: number;
  public frameworkComponents;
  constructor(
    public dialogRef: MatDialogRef<InfoPopupComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.helpGridOptions = <GridOptions>{};
    this.dataUrl = data.url;
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    // this.frameworkComponents = { customTooltip: CustomTooltip };
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getCustomDashboardData();
  }

  onGridReady() {
    this.helpGridOptions.api.sizeColumnsToFit();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  public createColumnDefs() {
    this.helpColumnDefs = HELP_DEFS;
  }

  public getCustomDashboardData() {
    this.http.get(this.dataUrl)
      .subscribe(data => {
        console.log(data)
        this.helpGridData = data;       
    });
  }
}
