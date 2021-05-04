import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions } from 'ag-grid-community';


const PATHS = [
  { goBack: "JCP/Modules/Performance-Management/KPI-Editor" }
]

@Component({
  selector: 'app-add-golden-parameter',
  templateUrl: './add-golden-parameter.component.html',
  styleUrls: ['./add-golden-parameter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddGoldenParameterComponent implements OnInit {
  public paths;
  selectedType = 'EPC';
  selectedCircle = '';
  selectedTown = '';
  selectedNetworkElement = 'MME';
  selectedVendor = 'Samsung';
  selectedSWVersion = '4.4.2';
  selectedPldName = '';
  selectedBand = 'All';
  selectedCategory = 'Samsung';
  selectedParameter = 'Samsung';
  selectedJioSettings = 'TAI';
  selectedRestart = 'Select Restart';
  selectedService= 'Select Service Impacting';
  parameterDescription = 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum';
  TypeList = [
    {name: "EPC"},
    {name: "Domain"}
  ];
  CircleList = [
    {name: 'Maharashtra'},
    {name: 'Bihar'}
  ];
  townList = [
    {name: 'Town 1'},
    {name: 'Town 2'}
  ];
  NetworkList = [
    {name: 'MME'},
    {name: 'MME 2'}
  ];
  vendorList = [
    {name: 'Samsung'},
    {name: 'Cisco'}
  ];
  swVersionList = [
    {name: '4.4.1'},
    {name: '4.4.2'}
  ];
  bandList = [
    {name: 'All'},
    {name: '800'},
    {name: '2300'}
  ];
  pldNameList = [
    {name: 'SoundingRsUlConfIdle'},
    {name: 'UlPowerControlParamLogic'}
  ];
  categoryList = [
    {name: 'Samsung'},
    {name: 'SRS Configuration'}
  ];
  parameterList = [
    {name: 'Samsung'},
    {name: 'SMART_SRS_ENABLE'}
  ];
  jioSettingsList = [
    {name: 'TAI'},
    {name: 'TAI 1'}
  ];
  restartList = [
    {name: 'Select Restart'},
    {name: 'Restart1 1'}
  ];
  serviceList = [
    {name: 'Select Service Impacting'},
    {name: 'Select Service Impacting 1'}
  ];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  addGoldenParameterDefs;
  tooltipShowDelay: number;
  addGoldenGridOptions: GridOptions;
  constructor() {
    this.paths = PATHS;
  }

  ngOnInit(): void {
    this.tooltipShowDelay = 0;
    this.overlayLoadingTemplate = `
    <span class="ag-overlay-loading-center no-data">
     No Data Available
    </span>
  `;
    this.overlayNoRowsTemplate = `
    <span class="ag-overlay-loading-center no-data">
      No Data Available
    </span>
    `;
    this.addGoldenParameterDefs = [
      {
        headerName: 'Identifier',
        field: "identifier"
      },
      {
        headerName: 'Value',
        field: "value"
      },
    ];
    this.addGoldenGridOptions = <GridOptions>{
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true
      },
      rowSelection: 'multiple',
      enableMultiRowDragging: true,
      suppressRowClickSelection: true,
      getRowNodeId: function (data) { return data.id; },
      rowDragManaged: true,
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
      columnDefs: this.addGoldenParameterDefs,
      suppressMoveWhenRowDragging: true,
      animateRows: true
    };
  }

  onGridGoldenParamReady(params) {

  }

}
