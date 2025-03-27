import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { GridApi, GridOptions } from 'ag-grid-community';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-eps-golden-conf',
  templateUrl: './eps-golden-conf.component.html',
  styleUrls: ['./eps-golden-conf.component.scss']
})
export class EpsGoldenConfComponent implements OnInit {
  searchGrid = '';
  showInputField: boolean;
  tooltipShowDelay;
  show: any;
  EPS_GOLDEN = [
    {
      headerName: "Node Name",
      field: "node",
      width: 180,
    }, {
      headerName: "Category",
      field: "category",
      width: 180
    }, {
      headerName: "Parameter",
      field: "parameter",
      width: 110,
      tooltipField: 'parameter',
    }, {
      headerName: "MME SW Version",
      field: "mme",
      width: 120
    }, {
      headerName: "Vendors",
      field: "vendor",
      width: 120
    }, {
      headerName: "Current",
      field: 'current',
      width: 110
    }, {
      headerName: "Jio Settings",
      field: 'jio_settings',
      width: 110
    }, {
      headerName: "Restarts",
      field: 'restarts',
      width: 110
    }
  ];
  golden_conf=[
    {
      "node": "MME",
      "target_area": "Pan India",
      "all": {
        "name": "All",
        "value": "112",
        "color": "#e6f8fb",
        "valuecolor":"#00BCD6"
      },
      "low_impact": {
        "name": "Low Impact",
        "value": "112",
        "color": "#fff2e5",
        "valuecolor":"#FF8000"
      },
      "high_impact": {
        "name": "High Impact",
        "value": "0",
        "color": "#fee9e9",
        "valuecolor":"#F32323"
      }
    }
  ];
  selectedNode = this.golden_conf[0].node;
  selectedTargetArea = this.golden_conf[0].target_area;
  nodeListArr = [
    {name: "MME"},
    {name: "node1"},
    {name: "node2"},
    {name: "node3"}
  ];
  targetAreaArr = [
    {name: "Pan India"},
    {name: "Jio Center"},
    {name: "Jio Center 1"},
    {name: "Jio Center 2"}
  ];
  public columnDefs: any[];
  rowData: Object;
  paginationPageSize: number;
  gridColumnApi: any;
  gridApi: any;
  gridOptions: GridOptions;

  frameworkComponentsEpsGolden;
  defaultColDef;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public datashare: DataSharingService
  ) {
    this.gridOptions = <GridOptions>{};
    this.paginationPageSize = 10;
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.frameworkComponentsEpsGolden = {
      customTooltip: CustomTooltip
    };
    this.tooltipShowDelay = 0;
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getKPIData();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  private getKPIData() {
    this.http.get("assets/data/configuration-management/audit-and-query/core/eps-golden-conf/eps-golden-conf.json")
      .subscribe(data => {
        this.rowData = data;
    });
  }

  private createColumnDefs() {
    this.columnDefs = this.EPS_GOLDEN;
  }

  onFilterChanged(value) {
  };

  toggleSearch() {
    this.showInputField = !this.showInputField;
  };

}

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="custom-tooltip" fxLayout="column" fxLayoutAlign="center center">
        <div class="text" style="margin:5px">{{tooltipData}}</div>
    </div>
  `,
  styles: [
    `
      :host {
        padding: 0 8px;
        color: white;
        position: absolute;
        font-size:12px;
        top: 20%;
        left: 80%;
        border-radius: 2px;
        font-family: Lato Regular;
        background-color: #434962;
        width: initial;
        white-space: pre-wrap;
        height: auto;
        overflow: hidden;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip {
        margin: 5px;
        background-color:#434962;
        white-space: nowrap;
      }
      .text{
        color: #FFFFFF;
        font-size: 14px
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  public params: object;
  public data: any;
  public tooltipData: string;

  agInit(params): void {
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.tooltipData = this.data.tooltipData;

  }
}
