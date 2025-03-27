import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-backhaul',
  templateUrl: './backhaul.component.html',
  styleUrls: ['./backhaul.component.scss']
})
export class BackhaulComponent implements OnChanges {
  link1Properties = [
    {
      label: "Link",
      value: "INAPMDMIMDMITW6001ENB"
    },
    {
      label: "Link Equipment",
      value: "NEC"
    },
    {
      label: "Hop Length (Km)",
      value: "18"
    }
    ,
    {
      label: "Modulation",
      value: "2048 QAM"
    },
    {
      label: "Link Config",
      value: "2000 Mbps"
    },
    {
      label: "Xpic",
      value: "Yes"
    },
    {
      label: "OFC Take Off Point",
      value: "I-MU-MUMB-ENB-2343"
    },
    {
      label: "No. of Hops to OFC take off point",
      value: "3"
    }
  ];
  link2Properties = [
    {
      label: "Link",
      value: "INAPMDMIMDMITW6001ENB"
    },
    {
      label: "Link Equipment",
      value: "NEC"
    },
    {
      label: "Hop Length (Km)",
      value: "18"
    }
    ,
    {
      label: "Modulation",
      value: "2048 QAM"
    },
    {
      label: "Link Config",
      value: "2000 Mbps"
    },
    {
      label: "Xpic",
      value: "Yes"
    },
    {
      label: "OFC Take Off Point",
      value: "I-MU-MUMB-ENB-2343"
    },
    {
      label: "No. of Hops to OFC take off point",
      value: "3"
    }
  ];
  backhaulDetails = [
    {
      label: "Node Id",
      value: "PTNAMHVRESR001"
    },
    {
      label: "Router Model",
      value: "Cisco"
    },
    {
      label: "Topology",
      value: "-"
    },
    {
      label: "Link Capacity(Gbps)",
      value: "-"
    },
    {
      label: "AC1 (Node Id)",
      value: "-"
    },
    {
      label: "Ring in Utilisation",
      value: "35%"
    },
    {
      label: "Ring out Utilisation",
      value: "15%"
    }
  ]



  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public paths;
  public sidenavBarStatus;
  public tableWidth;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public show;
  public gridFilterValueServices = {};
  tableCompData = {};
  public frameworkComponentsSectorMisalignment = {
    viewHistroyRenderer: viewHistoryRendererComponent
  };
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;

  public url: string = "assets/data/modules/properties/backhaul.json";

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

  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => { });
  }
  ngOnChanges() {
    if (this.selectedTab === "BACKHAUL") {
      this.showTab = true;
      this.gridOptions = <GridOptions>{};
      this.createColumnDefs();

      this.datashare.currentMessage.subscribe((message) => {
        this.sidenavBarStatus = message;
      });

      this.httpClient.get(this.url)
        .subscribe(data => {
          this.rowData = data;
          this.datatable.rowDataURLServices = this.url;
          this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
          this.datatable.rowDataServices = this.rowData;
          this.datatable.gridOptionsServices = this.gridOptions;
          this.datatable.defaultColDefServices = this.defaultColDef;
        });
    }
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
  }

  createColumnDefs() {
    this.columnDefs = [{
      headerName: "Node Id",
      field: "nodeId",
      width: 120,
      pinned: "left"
    }, {
      headerName: "Antenna Height (mtrs)",
      field: "antennaHeight",
      width: 195
    }, {
      headerName: "Antenna Size",
      field: "antennaSize",
      width: 180
    }, {
      headerName: "Azimuth",
      field: "azimuth",
      width: 170
    }, {
      headerName: "Frequency (MHz)",
      field: "frequency",
      width: 180
    }, {
      headerName: "TX Power (dB)",
      field: "tx",
      width: 150
    }, {
      headerName: "ATP RSL (dB)",
      field: "atp",
      width: 150
    },
    {
      headerName: "MW Management IP",
      field: "mw",
      width: 150,
      pinned: "right"
    }];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  //END table search//////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }
}
