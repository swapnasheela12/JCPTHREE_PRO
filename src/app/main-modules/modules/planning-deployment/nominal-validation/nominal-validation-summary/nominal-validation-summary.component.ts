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

export interface NominalGenerationPerformance {
  srno: number;
  rfkpi: string;
  pre: number;
  post: number;
  display: string;
  postStatus: string;
}

export interface PerformanceACP {
  srno: number;
  rfkpi: string;
  pre: number;
  display: string;
  postOpt: number;
  postOptStatus: string;
  postSite: number;
  postSiteStatus: string;
  postSelOpt: number;
  postSelOptStatus: string;
}

export interface NominalGenerationOptimization {
  srno: number;
  rfparams: string;
  sites: number;
  cells: number;
  display: string;
}
export interface NominalGenerationValidation {
  nodes: string;
  preTotal: string;
  postTotal: string;
  postTotalStatus: string;
  preMacroTotal: string;
  postMacroTotal: string;
  postMacroStatus: string;
  preODSCTotal: string;
  postODSCTotal: string;
  postODSCStatus: string;
  odsc1: string;
  odsc2: string;
  odsc3: string;
  totalarea: string;
  totalpercentage: string;
  predarea: string;
  preareapercentage: string;
  postarea: string;
  postareapercentage: string;
  postareaStatus: string;
  rsrp: string;
  sinr: string;
}

export interface  ACPDetails {
  nodes: string;
  preTotal: string;
  preMacro: string;
  preODSC: string;
  postTotal: string;
  postTotalStatus: string;
  postMacro: string;
  postMacroStatus: string;
  postODSC: string;
  postODSCStatus: string;
  postSiteTotal: string;
  postSiteTotalStatus: string;
  postSiteMacro: string;
  postSiteMacroStatus: string;
  postSiteODSC: string;
  postSiteODSCStatus: string;
  postSiteOptTotal: string;
  postSiteOptStatus: string;
  postSiteOptMacro: string;
  postSiteOptMacroStatus: string;
  postSiteOptODSC: string;
  postSiteOptODSCStatus: string;
}

@Component({
  selector: 'app-nominal-validation-summary',
  templateUrl: './nominal-validation-summary.component.html',
  styleUrls: ['./nominal-validation-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalValidationSummaryComponent implements OnInit {
  nominalGenerationSummaryData = {
    "name": 'Maharashtra-NP-CV-121020_V1',
    "type": 'R4G',
    "state": 'Maharashtra'
  };
  
  planningTarget1 = [
    {"key":"Environment", "value":"Outdoor"},
    {"key":"RSRP", "value":"-105 dBm in 80% Area"},
    {"key":"SINR", "value":"-105 dBm in 80% Area"},
    {"key":"Inter Site Distance (Km)", "value":"2.5"}
  ];
  
  planningTarget2 = [
    {"key":"Optimisation mode", "value":"ACP"},
    {"key":"Base Optimisation", "value":"Yes"},
    {"key":"Site Selection", "value":"No"},
    {"key":"Site Selection + Optimisation", "value":"Yes"}
  ];

  trafficMap = [
    { "key": "date","value":"1st-7th Nov 2020"},
    { "key": "Crowd Source Data","value":"Netvelocity, Jio Phone, LSR"},
    { "key": "Network Data","value":"PM"},
    { "key": "Cluster Weightages","value":"Sense Urban - 30,Urban -30 , Rural-10, Sub Urban - 30"},
  ]
  
  existingArea = [
    {"key":"4G Macro On Air", "value":"23,5679"},
    {"key":"4G Macro Planned", "value":"4,35,560"},
    {"key":"4G Small Cell On Air", "value":"14,567"},
    {"key":"4G Small Cell Planned", "value":"56,754"},
    {"key":"Additional candidates", "value":"56,754"}
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
  
  performanceSummary: NominalGenerationPerformance[] = [
    {"srno":1,"rfkpi":"RSRP @50th Percentile (dbm)", "pre": -35,"post": -55, "postStatus": "increase", "display":"RSRP"},
    {"srno":2,"rfkpi":"Average SINR (db)", "pre": 8,"post":5, "postStatus": "decrease", "display":"SINR"},
    {"srno":3,"rfkpi":"Average PDSCH Data Rate (mbps)", "pre": 20,"post":20, "postStatus": "", "display":"PDSCH"},
    {"srno":4,"rfkpi":"Average Spectral Effeciency (bits/hz)", "pre": 1.1,"post":12.51, "postStatus": "increase", "display":"Spectral Effeciency"},
    {"srno":5,"rfkpi":"Intersite Distance (km)", "pre": 28,"post":28, "postStatus": "decrease", "display":"Intersite Distance"},
    {"srno":6,"rfkpi":"Intersite Distance 1 (km)", "pre": -35,"post":-7, "postStatus": "", "display":"Intersite Distance 1"},
  ];

  postOpt: string;
  postOptStatus: string;
  postSite: string;
  postSiteStatus: string;
  postSelOpt: string;
  postSelOptStatus: string;

  performanceSummaryACP: PerformanceACP[] = [
    {
      "srno":1,
      "rfkpi":"RSRP @50th Percentile (dbm)",
      "pre": -35,
      "postOpt": -55,
      "postOptStatus": "increase",
      "postSite": -55,
      "postSiteStatus":"increase",
      "postSelOpt": -55,
      "postSelOptStatus":"increase",
      "display":"RSRP"
    },
    {
      "srno":2,
      "rfkpi":"Average SINR (db)",
      "pre": 8,
      "postOpt": 5,
      "postOptStatus": "decrease",
      "postSite": 5,
      "postSiteStatus":"decrease",
      "postSelOpt": 5,
      "postSelOptStatus":"decrease",
      "display":"SINR"
    },
    {
      "srno":3,
      "rfkpi":"Average PDSCH Data Rate (mbps)",
      "pre": 20,
      "postOpt": 20,
      "postOptStatus": "",
      "postSite": 20,
      "postSiteStatus":"",
      "postSelOpt": 20,
      "postSelOptStatus":"",
      "display":"PDSCH"
    },
    {
      "srno":4,
      "rfkpi":"Average Spectral Effeciency (bits/hz)",
      "pre": 1.1,
      "postOpt": 12.51,
      "postOptStatus": "increase",
      "postSite": 12.51,
      "postSiteStatus":"increase",
      "postSelOpt": 12.51,
      "postSelOptStatus":"increase",
      "display":"Spectral Effeciency"
    },
    {
      "srno":5,
      "rfkpi":"Intersite Distance (km)",
      "pre": 28,
      "postOpt": 28,
      "postOptStatus": "",
      "postSite": 28,
      "postSiteStatus":"",
      "postSelOpt": 28,
      "postSelOptStatus":"",
      "display":"Intersite Distance"
    },
    {
      "srno":6,
      "rfkpi":"Intersite Distance 1 (km)",
      "pre": -35,
      "postOpt": -7,
      "postOptStatus": "",
      "postSite": -7,
      "postSiteStatus":"",
      "postSelOpt": -7,
      "postSelOptStatus":"",
      "display":"Intersite Distance 1"
    }
  ];

  optimisationSummary: NominalGenerationOptimization[] = [
    {"srno":1,"rfparams":"Azimuth", "sites": 100,"cells": 60, "display":"RSRP"},
    {"srno":2,"rfparams":"Electrical Tilt", "sites": 30,"cells":22, "display":"SINR"},
    {"srno":3,"rfparams":"Mechanical Tilt", "sites": 35,"cells":21, "display":"PDSCH"},
    {"srno":4,"rfparams":"Antenna Height", "sites": 35,"cells":30, "display":"Spectral Effeciency"},
    {"srno":5,"rfparams":"Power", "sites": 46,"cells":23, "display":"Intersite Distance"},
    {"srno":6,"rfparams":"Power 1", "sites": 46,"cells":23, "display":"Intersite Distance 1"},
  ];

  validationAcpSummary: ACPDetails[] = [
    {
      "nodes": "Sites",
      "preTotal":"95,000",
      "preMacro":"51,301",
      "preODSC": "43,699",
      "postTotal": "100,000",
      "postTotalStatus": "increase",
      "postMacro": "59,301",
      "postMacroStatus": "increase",
      "postODSC": "40,699",
      "postODSCStatus": "decrease",
      "postSiteTotal": "100,000",
      "postSiteTotalStatus": "increase",
      "postSiteMacro": "59,301",
      "postSiteMacroStatus": "increase",
      "postSiteODSC": "40,699",
      "postSiteODSCStatus": "decrease",
      "postSiteOptTotal": "100,000",
      "postSiteOptStatus": "increase",
      "postSiteOptMacro": "59,301",
      "postSiteOptMacroStatus": "increase",
      "postSiteOptODSC": "40,699",
      "postSiteOptODSCStatus": "decrease"
    },
    {
      "nodes": "Cells",
      "preTotal": "92,000",
      "preMacro": "53,000",
      "preODSC": "39,000",
      "postTotal": "90,000",
      "postTotalStatus": "decrease",
      "postMacro": "50,000",
      "postMacroStatus": "decrease",
      "postODSC": "40,000",
      "postODSCStatus": "increase",
      "postSiteTotal": "90,000",
      "postSiteTotalStatus": "decrease",
      "postSiteMacro": "50,000",
      "postSiteMacroStatus": "decrease",
      "postSiteODSC": "40,000",
      "postSiteODSCStatus": "increase",
      "postSiteOptTotal": "90,000",
      "postSiteOptStatus": "decrease",
      "postSiteOptMacro": "50,000",
      "postSiteOptMacroStatus": "decrease",
      "postSiteOptODSC": "40,000",
      "postSiteOptODSCStatus": "increase"
    }
  ]
  
  validationSummary:NominalGenerationValidation[] = [
    {
      "nodes": "Sites",
      "preTotal":"95,000",
      "postTotal":"100,000",
      "postTotalStatus":"increase",
      "preMacroTotal":"59,301",
      "postMacroTotal":"61,301",
      "postMacroStatus":"increase",
      "preODSCTotal":"59,301",
      "postODSCTotal":"61,301",
      "postODSCStatus":"decrease",
      "odsc1": "59,301",
      "odsc2": "59,301",
      "odsc3": "59,301",
      "totalarea": "4100.56",
      "totalpercentage": "100",
      "postareaStatus":"increase",
      "predarea":"2301.3",
      "preareapercentage":"56",
      "postarea": "3301.3",
      "postareapercentage": "80",
      "rsrp": "-113",
      "sinr": "8.9"
    },
    {
      "nodes": "Cells",
      "preTotal":"95,000",
      "postTotal":"100,000",
      "postTotalStatus":"decrease",
      "preMacroTotal":"50,000",
      "postMacroTotal":"50,000",
      "postMacroStatus":"increase",
      "preODSCTotal":"50,000",
      "postODSCTotal":"40,000",
      "postODSCStatus":"increase",
      "odsc1": "50,000",
      "odsc2": "50,000",
      "odsc3": "50,000",
      "totalarea": "4100.56",
      "totalpercentage": "100",
      "postareaStatus":"increase",
      "predarea":"2301.3",
      "preareapercentage":"56",
      "postarea": "3301.3",
      "postareapercentage": "80",
      "rsrp": "-113",
      "sinr": "8.9"
    }
  ];
  displayedColumns: string[] = ['parameters', 'gNb', 'odsc1', 'odsc2', 'odsc3'];
  displayedColumnsPerformance: string[] = ['srno', 'rfkpi', 'pre', 'post'];
  displayedColumnsOptimisation: string[] = ['srno', 'rfparams', 'sites', 'cells'];
  displayedColumnsValidation: string[] = ['5gnodes', 'preTotal', 'postTotal', 'preMacroTotal', 'postMacroTotal', 'preODSCTotal','postODSCTotal', 'totalarea','prearea', 'postarea', 'rsrp', 'sinr'];
  displayedColumnsValidationACP: string[] = ['5gnodes', 'preTotal', 'preMacro', 'preODSC', 'postTotal', 'postMacro', 'postODSC', 'postSiteTotal', 'postSiteMacro', 'postSiteODSC', 'postSiteOptTotal', 'postSiteOptMacro', 'postSiteOptODSC'];
  displayedColumnsPerformanceACP: string[] = ['srno', 'rfkpi', 'pre', 'postOpt', 'postSite', 'postSelOpt']
  dataSource = new MatTableDataSource(this.siteTemplate);
  dataSourcePerformance = new MatTableDataSource(this.performanceSummary);
  dataSourceOptimisation = new MatTableDataSource(this.optimisationSummary);
  dataSourceValidation = new MatTableDataSource(this.validationSummary);
  dataSourceValidationACP = new MatTableDataSource(this.validationAcpSummary);
  dataSourcePerformanceACP = new MatTableDataSource(this.performanceSummaryACP);

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
  
    openDistributionSummary(){
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Site-Distribution-Summary']);
    }
  
    async openPerformanceSummary(row, type, tab) {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Performance-Summary'], {state: {data: {row: row, type: type, tab: tab}}});
    }

    openOptimizationSummary(row) {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Optimization-Summary'], {state: {data: {row: row, optSummary: this.optimisationSummary}}});
    }
}
