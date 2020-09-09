import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { GridOptions, GridCore, GridApi } from 'ag-grid-community';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import rounded from 'highcharts-rounded-corners';
import { CustomTooltip } from '../custom-tooltip.component';
import { MatDialog } from '@angular/material/dialog';
import { AlarmDetailsPopupComponent } from './alarm-details-popup/alarm-details-popup.component';
import { Subscription } from 'rxjs';

declare var $: any;
rounded(Highcharts)
const PATHS = [
  { changeImpactAnalysisViewSummary: "JCP/Modules/Performance-Management/My-Performance-Reports/Change-Impact-Analysis/View-Summary" },
  { goToMyPerformanceReports: "JCP/Modules/Performance-Management/My-Performance-Reports" }
];
@Component({
  selector: 'app-my-performance-reports',
  templateUrl: './change-impact-analysis.component.html',
  styleUrls: ['./change-impact-analysis.component.scss']
})

export class ChangeImpactAnalysisComponent implements OnInit, OnDestroy {
  public pathsCIAViewSummary: String;
  public pathMyPerformanceReports: String;
  public rowData: object;
  public columnDefs: any[];
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  secondaryKpi: string = "Traffic";
  ciaChart: Highcharts.Chart;
  public frameworkComponents;
  public defaultColDef;
  public colDefs;
  primaryKpi: string = "IPThroughput";
  timeValue: string = "Daily";
  sectorValue: string = "Cells";
  cellListValue: string = "I-DL-DLHI-IBS-0155_c1";
  sectorListValue: string = "I-GJ-JMGR-ENB-9196 (BETA)";
  enodebListValue: string = "I-GJ-JMGS-0ENB-9197";
  jcListValue: string = "GJ-JMGR-JC01-0259";
  tooltipShowDelay: number;
  messageSubscription: Subscription;
  searchListValue;
  cellsList = [
    { cell: 'I-DL-DLHI-IBS-0155_c1' },
    { cell: 'I-DL-DLHI-IBS-0155_c2' },
    { cell: 'I-DL-DLHI-IBS-0155_c3' },
    { cell: 'I-DL-DLHI-IBS-0155_c4' }
  ];
  sectorList = [
    { sector: 'I-GJ-JMGR-ENB-9196 (ALPHA)' },
    { sector: 'I-GJ-JMGR-ENB-9196 (BETA)' },
    { sector: 'I-GJ-JMGR-ENB-9196 (GAMMA)' }
  ];
  enodebList = [
    { enodeb: 'I-GJ-JMGS-0ENB-9197' },
    { enodeb: 'I-GJ-JMGS-0ENB-9198' },
    { enodeb: 'I-GJ-JMGS-0ENB-9199' },
    { enodeb: 'I-GJ-JMGS-0ENB-9120' }
  ];
  jcList = [
    { jc: 'GJ-JMGR-JC01-0259' },
    { jc: 'GJ-JMGR-JC01-0260' },
    { jc: 'GJ-JMGR-JC01-0261' },
    { jc: 'GJ-JMGR-JC01-0262' }
  ];

  constructor(private datashare: DataSharingService, private http: HttpClient, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{};
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      setTimeout(() => {
        this.makeDo(this.secondaryKpi, this.primaryKpi);
      }, 500);
    });
    this.colDefs = [
      {
        headerName: "KPI Impact",
        field: "kpiImpact",
        width: 150,
      },
      {
        headerName: "Overall",
        width: 120,
        field: "overall",
        tooltipField: 'overall',
        cellRenderer: function (params) {
          if (params.data.kpiImpact == "%Change" && params.data.overall > 0) {
            return '<div class="ag-grid-trend-cell" style="color:#4ad94cde"><span>' + params.value + '</span></div>';
          } else if (params.data.kpiImpact == "%Change" && params.data.overall < 0) {
            return '<div class="ag-grid-trend-cell" style="color:#fc5f5fde"><span>' + params.value + '</span></div>';
          } else {
            return params.value
          }
        }
      },
      {
        headerName: "850",
        width: 100,
        field: "850",
        tooltipField: '850',
        cellRenderer: function (params) {
          if (params.data.kpiImpact == "%Change" && params.data[850] > 0) {
            return '<div class="ag-grid-trend-cell" style="color:#4ad94cde"><span>' + params.value + '</span></div>';
          } else if (params.data.kpiImpact == "%Change" && params.data[850] < 0) {
            return '<div class="ag-grid-trend-cell" style="color:#fc5f5fde"><span>' + params.value + '</span></div>';
          } else {
            return params.value
          }
        }
      },
      {
        headerName: "1800",
        width: 110,
        field: "1800",
        tooltipField: '1800',
        cellRenderer: function (params) {
          if (params.data.kpiImpact == "%Change" && params.data["1800"] > 0) {
            return '<div class="ag-grid-trend-cell" style="color:#4ad94cde"><span>' + params.value + '</span></div>';
          } else if (params.data.kpiImpact == "%Change" && params.data["1800"] < 0) {
            return '<div class="ag-grid-trend-cell" style="color:#fc5f5fde"><span>' + params.value + '</span></div>';
          } else {
            return params.value
          }
        }
      },
      {
        headerName: "2300-C1",
        width: 130,
        field: "2300C1",
        tooltipField: '2300C1',
        cellRenderer: function (params) {
          if (params.data.kpiImpact == "%Change" && params.data["2300C1"] > 0) {
            return '<div class="ag-grid-trend-cell" style="color:#4ad94cde"><span>' + params.value + '</span></div>';
          } else if (params.data.kpiImpact == "%Change" && params.data["2300C1"] < 0) {
            return '<div class="ag-grid-trend-cell" style="color:#fc5f5fde"><span>' + params.value + '</span></div>';
          } else {
            return params.value
          }
        }
      },
      {
        headerName: "2300-C2",
        width: 130,
        field: "2300C2",
        tooltipField: '2300C2',
        cellRenderer: function (params) {
          if (params.data.kpiImpact == "%Change" && params.data["2300C2"] > 0) {
            return '<div class="ag-grid-trend-cell" style="color:#4ad94cde"><span>' + params.value + '</span></div>';
          } else if (params.data.kpiImpact == "%Change" && params.data["2300C2"] < 0) {
            return '<div class="ag-grid-trend-cell" style="color:#fc5f5fde"><span>' + params.value + '</span></div>';
          } else {
            return params.value
          }
        }
      },
    ];
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    this.frameworkComponents = { customTooltip: CustomTooltip };
  }
  onSeriesClick(event) {
    const dialogRef = this.dialog.open(AlarmDetailsPopupComponent, {
      width: '1000px',
      height: '503px',
      panelClass: 'alarms-details-popup'
    });
  }
  makeDo(value1, value2) {
    //@ts-ignore
    this.ciaChart = Highcharts.chart('Chart', {
      //@ts-ignore
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column',
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: ['17/08/2020', '18/08/2020', '19/08/2020', '20/08/2020', '21/08/2020', '22/08/2020', '23/08/2020', '', '24/08/2020', '25/08/2020', '26/08/2020', '27/10/2019', '28/08/2020', '29/08/2020', '30/08/2020'],
        labels: {
          rotation: 270
        },
        plotLines: [{
          color: '#FF0000',
          width: 2,
          value: 7,
          zIndex: 5
        }]
      },
      yAxis: [{ 
        labels: {
          format: '{value}'
        },
        title: {
          text: value1
        },
        opposite: true
      }, { 

        min: 0,
        max: 100,
        title: {
          text: value2
        },
        labels: {
          format: '{value} '
        }

      }],
      legend: {
        symbolHeight: 14,
        symbolWidth: 14,
        symbolRadius: 0,
        align: 'center',
        verticalAlign: 'bottom',
        shadow: false
      },
      plotOptions: {
        column: {
          stacking: "normal"
        },
        series: {
          cursor: "pointer",
          events: {
            click: this.onSeriesClick.bind(this),
            legendItemClick: function (e) {
              var name = this.name.substring(this.name.length - 4, this.name.length);
              var _i = e.target.index
              Highcharts.each(this.chart.series, function (p, i) {
                if (_i < 5 && name === p.name.substring(p.name.length - 4, p.name.length) && _i !== p._i) {
                  (!p.visible) ? p.show() : p.hide()
                }
              })
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: 'Alarm: {point.y}'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: "Overall",
        color: "rgba(0, 2, 219, 0.2)",
        type: 'column',
        data: [80.9, 80.8, 80.7, 80.6, 80.5, 80.9, 80.8, null, 80.6, 80.5, 80.7, 80.6, 80.5, 80.5, 80.5],
        borderRadiusTopLeft: '50%',
        borderRadiusTopRight: '50%'
      }, {
        name: "850",
        color: "rgba(248, 185, 113, 0.2)",
        type: 'column',
        data: [50.9, 50.8, 50.7, 50.6, 50.5, 50.9, 50.8, null, 50.6, 50.5, 50.7, 50.6, 50.5, 50.5, 50.5]
      }, {
        name: "1800",
        color: "rgba(25, 208, 67, 0.2)",
        type: 'column',
        data: [60.7, 60.6, 60.5, 60.4, 60.3, 60.7, 60.6, null, 60.4, 60.3, 60.5, 60.4, 60.3, 60.3, 60.3]
      }, {
        name: "2300-C1",
        color: "rgba(104, 199, 255, 0.2)",
        type: 'column',
        data: [70.4, 70.3, 70.2, 70.1, 70, 70.4, 70.3, null, 70.1, 70, 70.2, 70.1, 70, 70, 70]
      }, {
        name: "2300-C2",
        color: "rgba(252, 95, 95, 0.2)",
        type: 'column',
        data: [80.4, 80.3, 80.2, 80.1, 80, 80.4, 80.3, null, 80.1, 80, 80.2, 80.1, 80, 80, 80],
        borderRadiusBottomLeft: '50%',
        borderRadiusBottomRight: '50%'
      }, {
        name: "Overall",
        showInLegend: false,
        color: "rgba(0, 2, 219, 0.6)",
        type: "spline",
        yAxis: 1,
        data: [73.9, 76.8, 73.7, 76.6, 73.5, 76.9, 73.8, null, 73.6, 76.5, 73.7, 76.6, 73.5, 76.5, 73.5]
      }, {
        name: "850",
        showInLegend: false,
        color: "rgba(248, 185, 113, 0.6)",
        type: "spline",
        yAxis: 1,
        data: [55.4, 59.3, 55.2, 59.1, 55, 59.4, 55.3, null, 55.1, 59, 55.2, 59.1, 55, 59, 55]
      }, {
        name: "1800",
        showInLegend: false,
        color: "rgba(25, 208, 67, 0.6)",
        type: "spline",
        yAxis: 1,
        data: [40.7, 44.6, 40.5, 44.4, 40.3, 44.7, 40.6, null, 40.4, 44.3, 40.5, 44.4, 40.3, 44.3, 40.3]
      }, {
        name: "2300-C1",
        showInLegend: false,
        color: "rgba(104, 199, 255, 0.6)",
        type: "spline",
        yAxis: 1,
        data: [29.9, 25.8, 29.7, 25.6, 29.5, 25.9, 29.8, null, 29.6, 25.5, 29.7, 25.6, 29.5, 25.5, 29.5]
      }, {
        name: "2300-C2",
        showInLegend: false,
        color: "rgba(252, 95, 95, 0.6)",
        type: "spline",
        yAxis: 1,
        data: [10.4, 14.3, 10.2, 14.1, 10, 14.4, 10.2, null, 10.1, 14, 10.2, 14.1, 10, 14, 10]
      }]
    });
  }

  ngOnInit(): void {
    this.pathsCIAViewSummary = PATHS[0].changeImpactAnalysisViewSummary;
    this.pathMyPerformanceReports = PATHS[1].goToMyPerformanceReports;
    this.createColumnDefs();
    this.getData();
    this.makeDo(this.secondaryKpi, this.primaryKpi);
  }
  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private createColumnDefs() {
    this.columnDefs = this.colDefs;
  }
  public onReady(params) {
    this.gridApi = params.api;
  }

  private getData() {
    this.http.get("assets/data/modules/performance_management/my-performance-report/pre-post-report.json")
      .subscribe(data => {
        this.rowData = data;
      });
  }
  primaryKpiSelectionChanged(value1) {
    this.makeDo(value1, value1)

  }
  selectChangedSecondaryKPI(value1, value2) {
    this.makeDo(value1, value2)
    if (value1 === 'None') {
      this.ciaChart.options.series[0]['showInLegend'] = false;
      this.ciaChart.options.series[1]['showInLegend'] = false;
      this.ciaChart.options.series[2]['showInLegend'] = false;
      this.ciaChart.options.series[3]['showInLegend'] = false;
      this.ciaChart.options.series[4]['showInLegend'] = false;
      this.ciaChart.options.series[0]['visible'] = false;
      this.ciaChart.options.series[1]['visible'] = false;
      this.ciaChart.options.series[2]['visible'] = false;
      this.ciaChart.options.series[3]['visible'] = false;
      this.ciaChart.options.series[4]['visible'] = false;
      this.ciaChart.options.series[5]['showInLegend'] = true;
      this.ciaChart.options.series[6]['showInLegend'] = true;
      this.ciaChart.options.series[7]['showInLegend'] = true;
      this.ciaChart.options.series[8]['showInLegend'] = true;
      this.ciaChart.options.series[9]['showInLegend'] = true;
      Highcharts.chart('Chart', this.ciaChart.options);
    }
    else {
      this.ciaChart.options.series[9].visible = true
    }
  };
  openedChange(event) {
    this.searchListValue = ""
  }
  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}