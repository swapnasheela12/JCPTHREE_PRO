import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lte-antenna',
  templateUrl: './lte-antenna.component.html',
  styleUrls: ['./lte-antenna.component.scss']
})
export class LteAntennaComponent implements OnInit {
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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
