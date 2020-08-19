import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-lte-antenna',
  templateUrl: './lte-antenna.component.html',
  styleUrls: ['./lte-antenna.component.scss']
})
export class LteAntennaComponent implements OnInit, OnChanges {
  @Input('radioType') public showSelectedInventory;
  url: any = "assets/data/modules/properties/inventory/lte-antenna.json"
  columnDefs;
  tower = [
    {
      label: "Tower Type Installed",
      value: "GBT"
    },
    {
      label: "Tower Structure Type",
      value: "Old Design"
    },
    {
      label: "Tower Height in Mtrs.",
      value: "25"
    },
    {
      label: "Wind Speed",
      value: "39 m/s"
    },
    {
      label: "Tower Loading",
      value: "80%"
    }
  ];

  rack = [
    {
      label: "Type",
      value: "'19' ETSI RACK"
    },
    {
      label: "Make",
      value: "LT"
    },
    {
      label: "Quantity",
      value: "2"
    }
  ];

  smps = [
    {
      label: "Type",
      value: "DL-SMPS-16KW"
    },
    {
      label: "Make",
      value: "DELTA"
    },
    {
      label: "No. of Rectifiers",
      value: "3"
    }
  ];
  eb = [
    {
      label: "Connection Type",
      value: "LT"
    },
    {
      label: "Sanctioned Load (kWH)",
      value: "8"
    },
    {
      label: "Connection Phase",
      value: "Three Phase"
    }
  ];

  dg = [
    {
      label: "DG Type",
      value: "ER-DG-10KVA"
    },
    {
      label: "Make",
      value: "Eicher"
    },
    {
      label: "No. of Modules",
      value: "1"
    }
  ];
  battery = [
    {
      label: "Battery Type",
      value: "PA-LI-ION-56AH-V"
    },
    {
      label: "Make",
      value: "Panasonic"
    },
    {
      label: "No. of Modules",
      value: "4"
    }
  ];

  earthing = [
    {
      label: "Earthing Types",
      value: "Chemical"
    },
    {
      label: "No. of Pits",
      value: "4"
    }
  ];

  alpha = [
    {
      "antennaType": "2300+1800 Multiband Antenna",
      "antennaVendor": "Rosenberger",
      "antennaName": "S-Wave 18/18/23/23-65-18DV10CI-F (MULTIBAND)",
      "activityPlanned": "WO-I-AP-AAHA-ENG-I001"
    },
    {
      "antennaType": "850 MHz Standalone Antenna",
      "antennaVendor": "Ace",
      "antennaName": "XDGWL-C-17-65i-VT(850 TYPE-1)",
      "activityPlanned": "RFA"
    }
  ]


  beta = [
    {
      "antennaType": "Pentaband Antenna",
      "antennaVendor": "Rosenberger",
      "antennaName": "XQWLH-15 17-65i-VT(PB)",
      "activityPlanned": "WO-I-AP-AAHA-ENG-I001"
    },
    {
      "antennaType": "2300 Bi-Sector Antenna",
      "antennaVendor": "Ace",
      "antennaName": "XXDW-18-33I-IVT-DB-8P(Bi-Sector)",
      "activityPlanned": "-"
    }
  ]


  gamma = [
    {
      "antennaType": "2300 MHz Standalone Antenna",
      "antennaVendor": "Rosenberger",
      "antennaName": "S-Wave 23-23-65-18DV10-F_SE_R-TYPE-1",
      "activityPlanned": "WO-I-AP-AAHA-ENG-I001"
    },
    {
      "antennaType": "1800 MHz Standalone Antenna",
      "antennaVendor": "Ace",
      "antennaName": "S-WAVE 18/18-65-19DV8-F - TYPE4 (1800)",
      "activityPlanned": "-"
    },
    {
      "antennaType": "850 MHz Standalone Antenna",
      "antennaVendor": "Ace",
      "antennaName": "S-Wave 0609-65-15DV2/14C-F(850 TYPE-5)",
      "activityPlanned": "-"
    }
  ]


  bbuDetails = [
    {
      "channelCard": "0",
      "harwareName": "L9CA-B4F",
      "band": "1300 Mhz",
      "specification": "TDD 20 Mhz"
    },
    {
      "channelCard": "1",
      "harwareName": "L9CA-B4R",
      "band": "1800 Mhz",
      "specification": "FDD 10 Mhz"
    },
    {
      "channelCard": "2",
      "harwareName": "LCB3",
      "band": "850 Mhz",
      "specification": "FDD 5 Mhz"
    }
  ]


  rrhDetails = [
    {
      "model": "L8HU-F4S",
      "type": "LTE RRH-Single Carrier",
      "band": "2300 Mhz",
      "rrhWatts": "40",
      "rrhKgs": "12",
      "quantity": "3"
    },
    {
      "model": "RF41-03B",
      "type": "FDD-LTE-RRU-4T4R 80W)-1800",
      "band": "1800 Mhz",
      "rrhWatts": "80",
      "rrhKgs": "13",
      "quantity": "3"
    },
    {
      "model": "RF90-05C",
      "type": "2T2R 80W LTE RRU",
      "band": "850 Mhz",
      "rrhWatts": "80",
      "rrhKgs": "15",
      "quantity": "3"
    }
  ]


  microwave = [
    {
      "antennaMade": "Ceragon",
      "antennaSize": "0.6",
      "odu": "Ceragon",
      "omt": "Ceragon",
      "mwLink": "INAPMDMIMDMITW6001ENBNMW001-INAPSKONXXXXTW6002ENBNMW007"
    },
    {
      "antennaMade": "NEC",
      "antennaSize": "2.4",
      "odu": "Ceragon",
      "omt": "Ceragon",
      "mwLink": "INAPMDMIMDMITW6001ENBNMW001-INAPSKONXXXXTW6002ENBNMW007"
    }
  ]

  isp = [
    {
      "routerMake": "CISCO",
      "routerModel": "CS-920-10SZ-PD-ESR"
    }
  ];
  defaultColDef = { resizable: true };
  alphaData;
  betaData;
  gammaData;
  bbuData;
  microwaveData;
  rrhData;
  ispData;
  public gridApi;
  public gridOptionsAlpha: GridOptions;
  public gridOptionsBeta: GridOptions;
  public gridOptionsGamma: GridOptions;
  public gridOptionsBbu: GridOptions;
  public gridOptionsRrh: GridOptions;
  public gridOptionsMicrowave: GridOptions;
  public gridOptionsIsp: GridOptions;
  public colDefAlpha;
  public colDefBeta;
  public colDefGamma;
  public colDefBbu;
  public colDefRrh;
  public colDefMicrowave;
  public colDefIsp;

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }



  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptionsAlpha.api && this.gridOptionsBeta.api && this.gridOptionsGamma.api &&
      this.gridOptionsBbu.api && this.gridOptionsRrh.api && this.gridOptionsMicrowave.api && this.gridOptionsIsp.api &&
      this.alphaData && this.betaData && this.gammaData && this.bbuData && this.microwaveData && this.rrhData
      && this.ispData) {
      setTimeout(() => {

        this.gridOptionsAlpha.api.sizeColumnsToFit();
        this.gridOptionsBeta.api.sizeColumnsToFit();
        this.gridOptionsGamma.api.sizeColumnsToFit();
        this.gridOptionsBbu.api.sizeColumnsToFit();
        this.gridOptionsRrh.api.sizeColumnsToFit();
        this.gridOptionsMicrowave.api.sizeColumnsToFit();
        this.gridOptionsIsp.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private httpClient: HttpClient) {
    this.gridOptionsAlpha = <GridOptions>{};
    this.gridOptionsBeta = <GridOptions>{};
    this.gridOptionsGamma = <GridOptions>{};
    this.gridOptionsBbu = <GridOptions>{};
    this.gridOptionsRrh = <GridOptions>{};
    this.gridOptionsMicrowave = <GridOptions>{};
    this.gridOptionsIsp = <GridOptions>{};

    this.colDefAlpha = this.createAlpha();
    this.colDefBeta = this.createBeta();
    this.colDefGamma = this.createGamma();
    this.colDefBbu = this.createBBU();
    this.colDefMicrowave = this.createMicrowave();
    this.colDefRrh = this.createRRHDetails();
    this.colDefIsp = this.createISP();


    this.httpClient.get(this.url)
      .subscribe((data: any) => {

        this.alphaData = data.alpha;
        this.betaData = data.beta;
        this.gammaData = data.gamma;
        this.bbuData = data.bbu;
        this.microwaveData = data.microwave;
        this.rrhData = data.rrh;
        this.ispData = data.isp;
      });


  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("showSelectedInventory", this.showSelectedInventory);
  }

  ngOnInit(): void {
  }

  createAlpha() {
    return this.columnDefs = [{
      headerName: "Antenna Type",
      field: "antennaType",
      width: 120
    }, {
      headerName: "Antenna Vendor",
      field: "antennaVendor",
      width: 195
    }, {
      headerName: "Antenna Model Name",
      field: "antennaName",
      width: 180
    }, {
      headerName: "Activity Planned",
      field: "activityPlanned",
      width: 180
    }];
  }

  createBeta() {
    return this.columnDefs = [{
      headerName: "Antenna Type",
      field: "antennaType",
      width: 120
    }, {
      headerName: "Antenna Vendor",
      field: "antennaVendor",
      width: 195
    }, {
      headerName: "Antenna Model Name",
      field: "antennaName",
      width: 180
    }, {
      headerName: "Activity Planned",
      field: "activityPlanned",
      width: 180
    }];
  }

  createGamma() {
    return this.columnDefs = [{
      headerName: "Antenna Type",
      field: "antennaType",
      width: 120
    }, {
      headerName: "Antenna Vendor",
      field: "antennaVendor",
      width: 195
    }, {
      headerName: "Antenna Model Name",
      field: "antennaName",
      width: 180
    }, {
      headerName: "Activity Planned",
      field: "activityPlanned",
      width: 180
    }];
  }

  createBBU() {
    return this.columnDefs = [{
      headerName: "Channel Card",
      field: "channelCard",
      width: 120
    }, {
      headerName: "Hardware Name",
      field: "harwareName",
      width: 195
    }, {
      headerName: "Band",
      field: "band",
      width: 180
    }, {
      headerName: "Specification",
      field: "specification",
      width: 180
    }];
  }

  createMicrowave() {
    return this.columnDefs = [{
      headerName: "Antenna Made",
      field: "antennaMade",
      width: 120
    }, {
      headerName: "Antenna Size (m)",
      field: "antennaSize",
      width: 195
    }, {
      headerName: "ODU Eqipment Model",
      field: "odu",
      width: 180
    }, {
      headerName: "OMT Model",
      field: "omt",
      width: 180
    }, {
      headerName: "MW Link ID",
      field: "mwLink",
      width: 180
    }];
  }

  createRRHDetails() {
    return this.columnDefs = [{
      headerName: "Model",
      field: "model",
      width: 120
    }, {
      headerName: "Type",
      field: "type",
      width: 195
    }, {
      headerName: "Band",
      field: "band",
      width: 180
    }, {
      headerName: "RRH Power in Watts",
      field: "rrhWatts",
      width: 180
    }, {
      headerName: "RRH Power in Kgs",
      field: "rrhKgs",
      width: 180
    }, {
      headerName: "Quantity",
      field: "quantity",
      width: 180
    }
    ];
  }

  createISP() {
    return this.columnDefs = [{
      headerName: "Router Make",
      field: "routerMake",
      width: 120
    }, {
      headerName: "Router Model",
      field: "routerModel",
      width: 195
    }
    ]
  }



}
