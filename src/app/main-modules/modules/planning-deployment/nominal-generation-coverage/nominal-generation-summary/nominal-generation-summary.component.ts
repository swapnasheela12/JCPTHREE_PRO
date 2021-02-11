import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface NominalGenerationSiteTemplate {
  parameters: string;
  gNb: string;
  odsc1: string;
  odsc2: string;
  odsc3: string;
}

export interface NominalGenerationKPI {
  srno: number;
  rfkpi: string;
  level: number;
}

export interface NominalGenerationValidation {
  nodes: string;
  total: string;
  macro: string;
  odsc1: string;
  odsc2: string;
  odsc3: string;
  totalarea: string;
  totalpercentage: string;
  coveredarea: string;
  coveredareapercentage: string;
  rsrp: string;
  sinr: string;
}


@Component({
  selector: 'app-nominal-generation-summary',
  templateUrl: './nominal-generation-summary.component.html',
  styleUrls: ['./nominal-generation-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalGenerationSummaryComponent implements OnInit {
nominalGenerationSummaryData = {
  "name": 'Maharashtra-NP-CV-121020_V1',
  "type": 'R4G',
  "state": 'Maharashtra'
};

planningTarget1 = [
  {"key":"Environment", "value":"Outdoor"},
  {"key":"RSRP", "value":"-105 dBm in 80% Area"},
  {"key":"SINR", "value":"-105 dBm in 80% Area"},
  {"key":"Cell Edge DL throughput", "value":"20 mbps"},
  {"key":"Cell Edge UL throughput", "value":"20 mbps"}
];

planningTarget2 = [
  {"key":"Cell Radius", "value":"User Defined / link Budget"},
  {"key":"Dense Urban", "value":"320 mtrs"},
  {"key":"Sub Urban", "value":"320 mtrs"},
  {"key":"Urban", "value":"320 mtrs"},
  {"key":"Rural", "value":"320 mtrs"}
];

existingArea = [
  {"key":"Plan Type", "value":"Greenfield/ Infill coverage"},
  {"key":"P1 Sites", "value":"4,35,560"},
  {"key":"RP1 Sites", "value":"14,567"},
  {"key":"IP1 Colo Sites", "value":"56,754"},
  {"key":"Automated site placement", "value":"Yes/No"}
];

siteTemplate: NominalGenerationSiteTemplate[] = [
  {"parameters":"Band Name", "gNb":"NR TDD", "odsc1":"NR TDD", "odsc2":"NR TDD", "odsc3":"NR TDD"},
  {"parameters":"Propagation Model", "gNb":"New P3M", "odsc1":"New P3M", "odsc2":"New P3M", "odsc3":"New P3M"},
  {"parameters":"PA Power (dBm)", "gNb":"43", "odsc1":"43", "odsc2":"43", "odsc3":"43"},
  {"parameters":"Total EIRP (dBm)", "gNb":"55", "odsc1":"55", "odsc2":"55", "odsc3":"55"},
  {"parameters":"PA Power 1 (dBm)", "gNb":"46", "odsc1":"46", "odsc2":"46", "odsc3":"46"},
  {"parameters":"Total EIRP 1 (dBm)", "gNb":"76", "odsc1":"76", "odsc2":"76", "odsc3":"76"},
  {"parameters":"Propagation Model 2", "gNb":"98", "odsc1":"98", "odsc2":"98", "odsc3":"98"}
];

kpiSummary: NominalGenerationKPI[] = [
  {"srno":1,"rfkpi":"RSRP @50th Percentile (dbm)", "level": -35},
  {"srno":2,"rfkpi":"Average SINR (db)", "level": 8},
  {"srno":3,"rfkpi":"Average PDSCH Data Rate (mbps)", "level": 20},
  {"srno":4,"rfkpi":"Average Spectral Effeciency (bits/hz)", "level": 1.1},
  {"srno":5,"rfkpi":"Intersite Distance (km)", "level": 38},
  {"srno":6,"rfkpi":"Intersite Distance 1 (km)", "level": -89},
];

validationSummary:NominalGenerationValidation[] = [
  {
    "nodes": "Sites",
    "total": "95,000",
    "macro": "59,301",
    "odsc1": "59,301",
    "odsc2": "59,301",
    "odsc3": "59,301",
    "totalarea": "4100.56",
    "totalpercentage": "100",
    "coveredarea": "2301.3",
    "coveredareapercentage": "56",
    "rsrp": "-113",
    "sinr": "8.9"
  },
  {
    "nodes": "Cells",
    "total": "92,000",
    "macro": "50,000",
    "odsc1": "50,000",
    "odsc2": "50,000",
    "odsc3": "50,000",
    "totalarea": "4100.56",
    "totalpercentage": "100",
    "coveredarea": "2301.3",
    "coveredareapercentage": "56",
    "rsrp": "-113",
    "sinr": "8.9"
  }
];
displayedColumns: string[] = ['parameters', 'gNb', 'odsc1', 'odsc2', 'odsc3'];
displayedColumnsKpi: string[] = ['srno', 'rfkpi', 'level'];
displayedColumnsValidation: string[] = ['5gnodes', 'total', 'macro', 'odsc1', 'odsc2', 'odsc3', 'totalarea', 'coveredarea', 'rsrp', 'sinr'];
dataSource = new MatTableDataSource(this.siteTemplate);
dataSourceKPI = new MatTableDataSource(this.kpiSummary);
dataSourceValidation = new MatTableDataSource(this.validationSummary);
dataExt: any[] = [];
headerText: string;
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.processData();
  }

  ngOnInit(): void {
  }

  private processData() {
    const statesSeen = {};
    const countiesSeen = {};

    this.dataExt = this.validationSummary.sort((a, b) => {
      const stateComp = a.totalarea.localeCompare(b.totalarea);
      return stateComp ? stateComp : a.totalarea.localeCompare(b.totalarea);
    }).map(x => {
      const stateSpan = statesSeen[x.totalarea] ? 0 :
        this.validationSummary.filter(y => y.totalarea === x.totalarea).length;

      statesSeen[x.totalarea] = true;
      return { ...x, stateSpan };
    });
    this.dataSourceValidation = new MatTableDataSource(this.dataExt);
  }

  async displayNominalGenerationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalGenerationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-generation-coverage/nominal-generation-layer/nominal-generation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalGenerationLayerComponent)
    );

  }

  async openDistributionSummary(){
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Site-Distribution-Summary']);
  }
}
