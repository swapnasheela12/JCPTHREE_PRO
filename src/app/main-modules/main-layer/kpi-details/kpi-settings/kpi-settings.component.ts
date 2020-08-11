import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-kpi-settings',
  templateUrl: './kpi-settings.component.html',
  styleUrls: ['./kpi-settings.component.scss']
})
export class KpiSettingsComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<KpiSettingsComponent>,) { }

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

  kpidisplayslist = [{
    name: 'In-Building',
    checks: [{
      id: 100,
      name: 'Traffic Distribution'
    }, {
      id: 101,
      name: 'Coverage Evaluation'
    }, {
      id: 102,
      name: 'Performance Evaluation DL'
    }, {
      id: 103,
      name: 'Performance Evaluation UL'
    }]
  }, {
    name: 'Sites',
    checks: [{
      id: 100,
      name: 'Jio On-Air'
    }, {
      id: 101,
      name: 'Jio Planned'
    }, {
      id: 102,
      name: 'Vodafone'
    }, {
      id: 103,
      name: 'Airtel'
    }, {
      id: 104,
      name: 'Idea'
    }, {
      id: 105,
      name: 'Aircel'
    }]
  }, {
    name: 'RSRP',
    checks: [{
      id: 106,
      name: 'Atoll Planned'
    }, {
      id: 106,
      name: 'Actix'
    }, {
      id: 107,
      name: 'Atoll On-Air'
    }, {
      id: 107,
      name: 'Net Velocity'
    }, {
      id: 108,
      name: 'Accuver'
    }, {
      id: 109,
      name: 'Customer Measured'
    }, {
      id: 110,
      name: 'Smart Network Coverage'
    }]
  }, {
    name: 'SINR',
    checks: [{
      id: 111,
      name: 'Atoll Planned'
    }, {
      id: 112,
      name: 'Actix'
    }, {
      id: 113,
      name: 'Atoll On-Air'
    }, {
      id: 114,
      name: 'Net Velocity'
    }, {
      id: 115,
      name: 'Accuver'
    }, {
      id: 116,
      name: 'Customer Measured'
    }, {
      id: 117,
      name: 'Smart Network Coverage'
    }]
  }, {
    name: 'RSRQ',
    checks: [{
      id: 118,
      name: 'Accuver'
    }, {
      id: 119,
      name: 'Actix'
    }]
  }, {
    name: 'UL Throughput',
    checks: [{
      id: 120,
      name: 'Accuver'
    }, {
      id: 121,
      name: 'Netvelocity'
    }, {
      id: 122,
      name: 'Actix'
    }]
  }, {
    name: 'DL Throughput',
    checks: [{
      id: 123,
      name: 'Atoll Planned'
    }, {
      id: 124,
      name: ' Actix'
    }, {
      id: 125,
      name: 'Atoll On-Air'
    }, {
      id: 126,
      name: 'Accuver'
    }, {
      id: 127,
      name: 'Net Velocity'
    }]
  }, {
    name: 'CQI',
    checks: [{
      id: 128,
      name: 'Atoll Planned'
    }, {
      id: 129,
      name: ' Actix'
    }]
  }, {
    name: 'Latency',
    checks: [{
      id: 130,
      name: 'Netvelocity'
    }]
  }, {
    name: 'DL RB Utilization',
    checks: [{
      id: 131,
      name: 'Accuver'
    }, {
      id: 132,
      name: 'Actix'
    }]
  }, {
    name: 'UL RB Utilization',
    checks: [{
      id: 133,
      name: 'Accuver'
    }, {
      id: 134,
      name: 'Actix'
    }]
  }, {
    name: 'Competition Coverage',
    checks: [{
      id: 135,
      name: 'Airtel'
    }, {
      id: 136,
      name: 'Vodafone'
    }, {
      id: 137,
      name: 'Idea'
    }, {
      id: 138,
      name: 'Aircel'
    }]
  }, {
    name: 'Energy Analytics',
    checks: [{
      id: 139,
      name: 'TC Cards Utilization'
    }, {
      id: 140,
      name: 'CPH Variance'
    }, {
      id: 141,
      name: 'DGs Entry'
    }]
  }];




}
