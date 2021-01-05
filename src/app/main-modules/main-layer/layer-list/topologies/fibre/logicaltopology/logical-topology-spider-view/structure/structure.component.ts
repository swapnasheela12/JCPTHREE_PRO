import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { AnchorRendererComponent } from 'src/app/core/components/ag-grid-renders/anchor-renderer.component';
import { AG2_PORT_DETAILS, EQUIPMENT_DETAILS, OLT_PORT_EAST, OLT_PORT_SPLITTER, OLT_PORT_WEST, ONT_PORT, OVERVIEW_COLDEFS, PORTDETAILS_SPLITTER1, SPLITTER1_OLT, SPLITTER1_SPLITTER2, SPLITTER2_ONT, SPLITTER2_SPLITTER1 } from '../logical-columndefs-constant';

const Header_Active_Alarms = [
  {
    headerName: "Site ID",
    field: "siteid"
  },
  {
    headerName: "Cell ID",
    field: "cellid"
  }
];

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
  title: string = "SPLITTER 1";
  public gridActiveAlarmsColumnDefs: any[];
  public gridPortDetailsColumnDefs: any[];
  public gridequipmentDetailsColumnDefs: any[];

  //splitter1 port details
  public gridPDSplitter1ColDefs: any[];
  public gridPDSplitter1Splitter2ColDefs: any[];
  //Splitter2 port details
  public gridPDSplitter2Splitter1ColDefs: any[];
  public gridPDSplitter2ONTColDefs: any[];
  //olt port details
  public gridOLTPORTWestColDefs: any[];
  public gridOLTPORTEastColDefs: any[];
  public gridOLTPORTSplitterColDefs: any[];
  //ont port details
  public gridONTPORTDetailsColDefs: any[];
  //ag2 port details
  public gridAg2PORTDetailsColDefs: any[];

  public activeAlarmsGridOptions: GridOptions;
  public gridOverviewColumnDefs;
  public gridActiveAlarmsData: any;
  public gridGeographyData: any;
  public gridPortDetailsData: any;
  public equipmentDetailsData: any;

  //splitter1 rowdata
  public gridPortDetailsSplitter1OltData: any;
  public gridPortDetailsSplitter1Splitter2Data: any;
  //Splitter2 port details
  public gridPDSplitter2Splitter1Data: any[];
  public gridPDSplitter2ONTData: any[];
  //olt port details
  public gridOLTPORTWestData: any[];
  public gridOLTPORTEastData: any[];
  public gridOLTPORTSplitterData: any[];
  //ont port details
  public gridONTPORTDetailsData: any[];
  //ag2 port details
  public gridAg2PORTDetailsData: any[];

  public cssJsonUrl: string = "assets/data/modules/performance_management/my-performance-report/chart-active-alarms.json";
  public overviewUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/overview.json";
  public geographyUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/geography.json";
  public structureUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/structure.json";
  public entityUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/entity.json";
  public historyUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/history.json";
  public miscellaneousUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/miscellaneous.json";
  public portDetailsUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/port-details.json";
  public equipmentDetailsUrl: string = "assets/data/layers/topologies/Fibre/logical-topolgy/structure/property-equipment-structure-details.json";
  newSaveTempFormControl: FormGroup;
  frameworkComponentsDetails;
  gridEquipmentDetails;

  portStructure = "";
  public icons = [
    { icon: 'close', color: '#6EAFCC', name: "CSS" },
    { icon: 'print', color: '#C7BE8B', name: "Fibre" },
    { icon: 'expand', color: '#7E85A8', name: "Route" },
    { icon: 'alarm_on', color: '#CB9A75', name: "AG1" },
    { icon: 'alarm_add', color: '#B791C6', name: "AG2" },
    { icon: 'autorenew', color: '#8CAD8D', name: "AG3" }
  ];

  selectedItem = 'close';
  labelInfo = [
    {
      label: "Site Name: ",
      value: "Karan"
    },
    {
      label: "R4G: ",
      value: "Mumbai"
    },
    {
      label: "MP Name: ",
      value: "South Mumbai"
    },
    {
      label: "Jio Center:",
      value: "I-AP-AANV-ENB-6000"
    }];
  gridApi: any;
  gridColumnApi: any;

  constructor(public dialogRef: MatDialogRef<StructureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FibreTableViewPopupModel,
    private http: HttpClient) {
    //this.title = "CSS";
    this.activeAlarmsGridOptions = <GridOptions>{};
    this.frameworkComponentsDetails = {
      'anchorRenderer': AnchorRendererComponent,
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // Active Alarms
    this.createActiveAlarmDefs();
    this.getTabDetails("");

  }
  // Active Alarms
  public createActiveAlarmDefs() {
    this.gridActiveAlarmsColumnDefs = Header_Active_Alarms;
    this.gridOverviewColumnDefs = OVERVIEW_COLDEFS;
    this.gridPortDetailsColumnDefs = PORTDETAILS_SPLITTER1;
    this.gridequipmentDetailsColumnDefs = EQUIPMENT_DETAILS;
    //splitter1 port details
    this.gridPDSplitter1ColDefs = SPLITTER1_OLT;
    this.gridPDSplitter1Splitter2ColDefs = SPLITTER1_SPLITTER2;
    //splitter2 port details
    this.gridPDSplitter2Splitter1ColDefs = SPLITTER2_SPLITTER1;
    this.gridPDSplitter2ONTColDefs = SPLITTER2_ONT;
    //ag2
    this.gridAg2PORTDetailsColDefs = AG2_PORT_DETAILS;
    //ont
    this.gridONTPORTDetailsColDefs = ONT_PORT;

    //olt
    this.gridOLTPORTWestColDefs = OLT_PORT_WEST;
    this.gridOLTPORTEastColDefs = OLT_PORT_EAST;
    this.gridOLTPORTSplitterColDefs = OLT_PORT_SPLITTER;
  }

  public showPortDetails() {
    if (this.title === "AG2") {
      let url = "assets/data/layers/topologies/Fibre/logical-topolgy/ag2/port-details.json"
      this.http.get(url)
        .subscribe((data: any) => {
          this.gridAg2PORTDetailsData = data;
        });
    } else if (this.title === "OLT") {
      let url = "assets/data/layers/topologies/Fibre/logical-topolgy/olt/port-details.json";
      this.http.get(url)
        .subscribe((data: any) => {
          console.log("data olt", data)
          this.gridOLTPORTWestData = data.west;
          this.gridOLTPORTEastData = data.east;
          this.gridOLTPORTSplitterData = data.olt_splitter;
        });
    } else if (this.title === "SPLITTER 1") {
      let url = "assets/data/layers/topologies/Fibre/logical-topolgy/splitter1/port-details.json"
      this.http.get(url)
        .subscribe((data: any) => {
          this.gridPortDetailsSplitter1OltData = data.splitter1_olt;
          this.gridPortDetailsSplitter1Splitter2Data = data.splitter1_splitter2;
        });
    } else if (this.title === "SPLITTER 2") {
      let url = "assets/data/layers/topologies/Fibre/logical-topolgy/splitter2/port-details.json"
      this.http.get(url)
        .subscribe((data: any) => {
          this.gridPDSplitter2Splitter1Data = data.splitter2_splitter1;
          this.gridPDSplitter2ONTData = data.splitter2_ont;
        });
    } else if (this.title === "ONT") {
      let url = "assets/data/layers/topologies/Fibre/logical-topolgy/ont/port-details.json"
      this.http.get(url)
        .subscribe((data: any) => {
          this.gridONTPORTDetailsData = data;
        });

    }
  }


  getTabDetails(evt) {
    if (evt === "OVERVIEW") {
      this.http.get(this.overviewUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "GEOGRAPHY") {
      this.http.get(this.geographyUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "STRUCTURE") {
      this.http.get(this.structureUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "ENTITY") {
      this.http.get(this.entityUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "HISTORY") {
      this.http.get(this.historyUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "MISCELLANEOUS") {
      this.http.get(this.miscellaneousUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (evt === "Port Details") {
      this.showPortDetails();
    } else if (evt === "Equipment Details") {
      this.http.get(this.equipmentDetailsUrl)
        .subscribe(data => {
          console.log("equipmentDetailsUrl", data)
          this.equipmentDetailsData = data;
        });
    } else {
      this.http.get(this.overviewUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 1000);
  }

  tabChanged(evt) {
    this.getTabDetails(evt.tab.textLabel);
  }

  onClick(item) {
    this.title = item.name
    this.selectedItem = item.icon;
    if (this.title == "CSS") {
      this.http.get(this.cssJsonUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "Fibre") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-fibre.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "Route") {
      this.http.get(this.cssJsonUrl)
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "AG1") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag1.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "AG2") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag2.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    } else if (this.title == "AG3") {
      this.http.get("assets/data/modules/layers/fibre-route/planned-table-view-ag3.json")
        .subscribe(data => {
          this.gridActiveAlarmsData = data;
        });
    }
  }
}

export class FibreTableViewPopupModel {
  constructor(
    public title: string
  ) {
  }
}