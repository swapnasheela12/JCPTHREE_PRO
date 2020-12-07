import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, Input, ViewChild, Inject, HostListener, AfterViewInit, OnDestroy, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";

// ag grid
import * as agGrid from 'ag-grid-community';
import { GridOptions } from "@ag-grid-community/all-modules";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, Event } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ButtonRendererComponent } from '../../reports-dashboards/my-reports/button-renderer.component';

import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil, timeout } from 'rxjs/operators';
import { selectedLayer, selectedLayerS } from './table-view-data';


declare var $: any;

interface reportsMeasure {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

export interface JioState {
  nameState: string;
  latitude: number;
  longitude: number;
}

export interface jioCenter {
  nameState: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-table-view-control',
  templateUrl: './table-view-control.component.html',
  styleUrls: ['./table-view-control.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 0 }))
      ])
    ])
  ]
})
export class TableViewControlComponent implements OnInit, AfterViewInit, OnDestroy {

  public selectedLayers = {};
  public selectedLayerCtrl: FormControl = new FormControl();
  typeGroup = "Planned"
  public _onDestroy = new Subject<void>();
  public selectedOptionArea = "Pan India";
  public selectedOptionAreaState;
  public selectedOptionAreaCenter;

  private inited;
  selectedValue: string;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;

  public gridApi;
  public gridColumnApi;
  public rowData: any[string];
  public gridOptions: GridOptions;
  public macroGridOptions: GridOptions;
  public columnDefs;
  public macroColumnDefs;
  public defaultColDef;
  public defaultColGroupDef;
  public columnTypes;
  public selectedLayerSearchValue;
  public layerListValue;
  public selectedLayerTableName;
  @ViewChild('tableViewTmpl') tableViewTmpl;
  public areaParentSelect: FormControl = new FormControl();

  objSelectedArea;
  onAdd = new EventEmitter();
  onAddDropDown = new EventEmitter();
  filterDataList = {
    selectedLayerName: null,
    selectedAreaName: null,
    selectedAreaNameParent: null,
    rowDataTable: null,
    objArea: null,
  };
  // rowDataMacro: Object;
  jsonUrl: string;

  constructor(public hostElement: ElementRef,
    public dialogRef: MatDialogRef<TableViewControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private eRef: ElementRef,
    private datashare: DataSharingService,
    private location: Location,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef) {
    router.events.subscribe((url: any) => console.log(url));
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });
    this.selectedLayerTableName = 'Other';

    this.datashare.leftNavSelectedLayerMessage.subscribe((selectedLayersAll) => {
      this.selectedLayers = selectedLayersAll;
      // this.layerListValue = this.selectedLayers[0].name;
      // this.selectedLayerCtrl.setValue(this.selectedLayers[0].name);
    });
    this.JioStatesList = this.jioState_List;
    this.jioCentersList = this.jioCenter_List;

    // if (this.selectedOptionArea == "Pan India") {

    // }

  }

  ngOnInit() {
    console.log(this.layerListValue)
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })

  }

  onChangeLayer(layer) {
    console.log(layer)
    // if (layer.value) {
    this.selectedLayerTableName = layer.value;
    // } else {
    //   this.selectedLayerTableName = 'Other';
    // }
    this.getName = document.querySelector('#matselectarea .ng-star-inserted').firstChild;
    console.log(this.selectedLayerTableName)
    switch (this.selectedLayerTableName) {
      case "Macro": {
        console.log("inside macroo")
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "Macro",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "<20° Macro",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "20°> to <40° Macro",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "40°> to <60° Macro",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: ">60° Macro",
                field: "greaterThanSixty",
                width: 150
              }
            ];
            this.jsonUrl = '';
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data-macro.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "Macro Center",
                field: "jiocenter",
                pinned: true,
                width: 180
              }, {
                headerName: "Total Sites",
                field: "totalsites",
                width: 180
              }, {
                headerName: "Total Cells",
                field: "totalcells",
                width: 150
              },
              {
                headerName: "4G-LTE Sites",
                field: "sites4glte",
                width: 150
              },
              {
                headerName: "5G-NR Sites",
                field: "sites5gnr",
                width: 180
              }
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "Macro State",
                field: "r4gstate",
                pinned: true,
                width: 150
              }, {
                headerName: "Total Sites",
                field: "totalsites",
                width: 180
              }, {
                headerName: "Total Cells",
                field: "totalcells",
                width: 150
              },
              {
                headerName: "4G-LTE Sites",
                field: "sites4glte",
                width: 150
              },
              {
                headerName: "5G-NR Sites",
                field: "sites5gnr",
                width: 180
              }
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
      }
        break;
      case "ESC": {
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "ESC Pan",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "<20°",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "20°> to <40°",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "40°> to <60°",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: ">60°",
                field: "greaterThanSixty",
                width: 100
              }
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data.json")
              .subscribe(data => {
                this.rowData = data;
              });

          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "ESC Center",
                field: "jiocenter",
                pinned: true,
                width: 180
              }, {
                headerName: "Total Sites",
                field: "totalsites",
                width: 180
              }, {
                headerName: "Total Cells",
                field: "totalcells",
                width: 150
              },
              {
                headerName: "4G-LTE Sites",
                field: "sites4glte",
                width: 150
              },
              {
                headerName: "5G-NR Sites",
                field: "sites5gnr",
                width: 180
              }
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "ESC State",
                field: "r4gstate",
                pinned: true,
                width: 150
              }, {
                headerName: "Total Sites",
                field: "totalsites",
                width: 180
              }, {
                headerName: "Total Cells",
                field: "totalcells",
                width: 150
              },
              {
                headerName: "4G-LTE Sites",
                field: "sites4glte",
                width: 150
              },
              {
                headerName: "5G-NR Sites",
                field: "sites5gnr",
                width: 180
              }
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
        // this.columnDefs = [
        //   {
        //     headerName: "ESC",
        //     field: "jiostate",
        //     pinned: true,
        //     width: 150
        //   }, {
        //     headerName: "<20° Macro",
        //     field: "lessThanTwenty",
        //     width: 100
        //   }, {
        //     headerName: "20°> to <40° Macro",
        //     field: "greaterThanTwenty",
        //     width: 150
        //   },
        //   {
        //     headerName: "40°> to <60° Macro",
        //     field: "greaterThanForty",
        //     width: 150
        //   },
        //   {
        //     headerName: ">60° Macro",
        //     field: "greaterThanSixty",
        //     width: 150
        //   }
        // ];
        // this.jsonUrl = 'assets/data/layers/table-view-data/table-view-data.json';
        // this.httpClient
        //   .get(this.jsonUrl)
        //   .subscribe(data => {
        //     this.rowData = data;
        //   });
        break;
      }
      case "Topologies-Fibre-Route-Ready-Core": {
        console.log("Inside Fibre")
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "All ",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "AG1",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "AG2",
                field: "greaterThanTwenty",
                width: 150
              }, {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data.json")
              .subscribe(data => {
                this.rowData = data;
              });

          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JC",
                field: "greaterThanTwenty",
                width: 150
              }, {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JS",
                field: "greaterThanTwenty",
                width: 150
              }, {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
        //   });
        break;
      }
      case "Topologies-Fibre-Route-Ready-Collector": {
        console.log("Inside Fibre")
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "All ",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "AG1",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "AG2",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data.json")
              .subscribe(data => {
                this.rowData = data;
              });

          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JC",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JS",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
        //   });
        break;
      }
      case "Topologies-Fibre-Route-Planned-Core": {
        console.log("Inside Fibre")
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "All ",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "AG1",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "AG2",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data.json")
              .subscribe(data => {
                this.rowData = data;
              });

          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JC",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JS",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
        //   });
        break;
      }
      case "Topologies-Fibre-Route-Planned-Collector": {
        console.log("Inside Fibre")
        setTimeout(() => {
          if ($(this.getName).is(':contains(Pan India)')) {
            this.columnDefs = [
              {
                headerName: "All ",
                field: "jiostate",
                pinned: true,
                width: 150
              }, {
                headerName: "AG1",
                field: "lessThanTwenty",
                width: 100
              }, {
                headerName: "AG2",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-view-data.json")
              .subscribe(data => {
                this.rowData = data;
              });

          } else if ($(this.getName).is(':contains(Jio Center)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JC",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-jio-center.json")
              .subscribe(data => {
                this.rowData = data;
              });
          } else if ($(this.getName).is(':contains(Jio State)')) {
            this.columnDefs = [
              {
                headerName: "AG2 JS",
                field: "greaterThanTwenty",
                width: 150
              },
              {
                headerName: "AG2+OTN",
                field: "greaterThanForty",
                width: 150
              },
              {
                headerName: "SAG2",
                field: "greaterThanSixty",
                width: 140
              },
              {
                headerName: "ILA",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "OSC",
                field: "greaterThanSixty",
                width: 100
              },
              {
                headerName: "eNodeB",
                field: "greaterThanSixty",
                width: 150
              },
              {
                headerName: "Pole",
                field: "greaterThanSixty",
                width: 100
              },
            ];
            this.httpClient
              .get("assets/data/layers/table-view-data/table-r4gstate.json")
              .subscribe(data => {
                this.rowData = data;
              });

            this.filterDataList = {
              selectedLayerName: this.selectedLayerTableName,
              selectedAreaName: this.selectedOptionArea,
              selectedAreaNameParent: this.selectedOptionParent,
              rowDataTable: null,
              objArea: this.objSelectedArea
            };

            this.onAddDropDown.emit(this.filterDataList);
          }
        }, 500);
        //   });
        break;
      }
      default: {
        this.columnDefs = [];
        this.jsonUrl = '';
        this.httpClient
          .get("")
          .subscribe(data => {
            this.rowData = data;
          });
        break;
      }
    }
    // if (this.selectedLayerTableName == 'Macro') {
    //   this.columnDefs = [
    //     {
    //       headerName: "Jio State Macro",
    //       field: "jiostate",
    //       pinned: true,
    //       width: 150
    //     }, {
    //       headerName: "<20° Macro",
    //       field: "lessThanTwenty",
    //       width: 100
    //     }, {
    //       headerName: "20°> to <40° Macro",
    //       field: "greaterThanTwenty",
    //       width: 150
    //     },
    //     {
    //       headerName: "40°> to <60° Macro",
    //       field: "greaterThanForty",
    //       width: 150
    //     },
    //     {
    //       headerName: ">60° Macro",
    //       field: "greaterThanSixty",
    //       width: 150
    //     }
    //   ];

    //   this.httpClient
    //     .get(this.jsonUrl)
    //     .subscribe(data => {
    //       this.rowData = data;
    //     });
    //   this.jsonUrl = 'assets/data/layers/table-view-data/table-view-data-macro.json';
    // } else {


    //   this.columnDefs = [
    //     {
    //       headerName: "Jio State",
    //       field: "jiostate",
    //       pinned: true,
    //       width: 150
    //     }, {
    //       headerName: "<20°",
    //       field: "lessThanTwenty",
    //       width: 100
    //     }, {
    //       headerName: "20°> to <40°",
    //       field: "greaterThanTwenty",
    //       width: 150
    //     },
    //     {
    //       headerName: "40°> to <60°",
    //       field: "greaterThanForty",
    //       width: 150
    //     },
    //     {
    //       headerName: ">60°",
    //       field: "greaterThanSixty",
    //       width: 150
    //     }
    //   ];
    //   this.selectedLayerTableName = 'Other';
    //   this.jsonUrl = 'assets/data/layers/table-view-data/table-view-data.json';
    // }
    this.cd.detectChanges();
  }

  openedChange(sda) {
    this.selectedLayerSearchValue = '';
  }
  selectedOptionParent;
  selectedOptionJioState;
  optionJioStateValue;
  jioStateFunc(value, item) {
    this.objSelectedArea = value;
    this.selectedOptionParent = item;
    this.optionJioStateValue = value.nameState;
    this.selectedOptionJioState = value.nameState;
    this.selectedOptionArea = this.selectedOptionJioState;
    this.listFilterJioStates = "";
  }

  selectedOptionJioCenter;
  optionjioCentersValue;
  jioCentersFunc(value, item) {
    this.objSelectedArea = value;
    this.selectedOptionParent = item;
    this.optionjioCentersValue = value.nameState;
    this.selectedOptionJioCenter = value.nameState;
    this.selectedOptionArea = this.selectedOptionJioCenter;
    this.listFilterjioCenters = "";
  }


  //Jio State
  _listFilterJioStates: string;
  get listFilterJioStates(): string {
    return this._listFilterJioStates;
  }
  set listFilterJioStates(value: string) {
    this._listFilterJioStates = value;
    this.JioStatesList = this.listFilterJioStates ? this.PerformFilter(this.listFilterJioStates) : this.jioState_List;
  }
  JioStatesList: JioState[];
  jioState_List: JioState[] = [
    {
      "nameState": "Maharashtra",
      "latitude": 19.7515,
      "longitude": 75.7139
    },
    {
      "nameState": "Odisha",
      "latitude": 20.9517,
      "longitude": 85.0985
    },
    {
      "nameState": "Uttar Pradesh (East)",
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    {
      "nameState": "Kashmir",
      "latitude": 33.7782,
      "longitude": 76.5762
    },
    {
      "nameState": "Bihar",
      "latitude": 25.0961,
      "longitude": 85.3131
    },
    {
      "nameState": "Madhya Pradesh",
      "latitude": 22.9734,
      "longitude": 78.6569
    }
  ]

  PerformFilter(filterBy: string): JioState[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.jioState_List.filter((product: JioState) =>
      product.nameState.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  //Jio State



  //Jio Center
  _listFilterjioCenters: string;
  get listFilterjioCenters(): string {
    return this._listFilterjioCenters;
  }
  set listFilterjioCenters(value: string) {
    this._listFilterjioCenters = value;
    this.jioCentersList = this.listFilterjioCenters ? this.PerformFilterjioCenter(this.listFilterjioCenters) : this.jioCenter_List;
  }
  jioCentersList: jioCenter[];
  jioCenter_List: jioCenter[] = [
    {
      "nameState": "AP-DMVM-JC01-0094",
      "latitude": 19.0385,
      "longitude": 72.9232
    },
    {
      "nameState": "AP-HDBD-JC03-0865",
      "latitude": 19.04662244380717,
      "longitude": 72.9179334640503
    },
    {
      "nameState": "AP-JGTL-JC01-0883",
      "latitude": 19.19056867766461,
      "longitude": 72.97016143798828
    },
    {
      "nameState": "AP-KKND-JC01-0141",
      "latitude": 19.01278705937288,
      "longitude": 73.03436279296875
    },
    {
      "nameState": "AP-MCPM-JC01-0127",
      "latitude": 18.992661070447976,
      "longitude": 73.10989379882811
    },
    {
      "nameState": "AP-MDMI-JC01-0891",
      "latitude": 19.09975522215211,
      "longitude": 73.00861358642577
    },
    {
      "nameState": "AP-PRUR-JC01-0103",
      "latitude": 18.992336437775784,
      "longitude": 72.83557891845703
    },
  ]

  PerformFilterjioCenter(filterBy: string): jioCenter[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.jioCenter_List.filter((product: jioCenter) =>
      product.nameState.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  //Jio Center



  //filter  selectedLayers

  ngAfterViewInit() {
    // this.setInitialValue();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // protected setInitialValue() {
  //   this.filteredselectedLayers
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       // setting the compareWith property to a comparison function
  //       // triggers initializing the selection according to the initial value of
  //       // the form control (i.e. _initializeSelection())
  //       // this needs to be done after the filteredselectedLayers are loaded initially
  //       // and after the mat-option elements are available
  //       this.singleSelect.compareWith = (a: selectedLayer, b: selectedLayer) => a && b && a.id === b.id;
  //     });
  // }

  // protected filterselectedLayers() {
  //   if (!this.selectedLayers) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.selectedLayerFilterCtrl.value;
  //   if (!search) {
  //     this.filteredselectedLayers.next(this.selectedLayers.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the selectedLayers
  //   this.filteredselectedLayers.next(
  //     this.selectedLayers.filter(selectedLayer => selectedLayer.name.toLowerCase().indexOf(search) > -1)
  //   );
  // }
  //filter  selectedLayers


  public text: String;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
    } else {
      this.text = "clicked outside";
      // this.onCloseClick();
    }
  }

  // @HostListener('window:click')
  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  public getName;
  areaSelectionFunc() {
    this.getName = document.querySelector('#matselectarea .ng-star-inserted').firstChild;

    // setTimeout(() => {
    //   if ($(this.getName).is(':contains(Pan India)')) {
    //     this.columnDefs = [
    //       {
    //         headerName: "Jio State",
    //         field: "jiostate",
    //         pinned: true,
    //         width: 150
    //       }, {
    //         headerName: "<20°",
    //         field: "lessThanTwenty",
    //         width: 100
    //       }, {
    //         headerName: "20°> to <40°",
    //         field: "greaterThanTwenty",
    //         width: 150
    //       },
    //       {
    //         headerName: "40°> to <60°",
    //         field: "greaterThanForty",
    //         width: 150
    //       },
    //       {
    //         headerName: ">60°",
    //         field: "greaterThanSixty",
    //         width: 100
    //       }
    //     ];
    //     this.httpClient
    //       .get(this.jsonUrl)
    //       .subscribe(data => {
    //         this.rowData = data;
    //       });


    //     // this.filterDataList = {
    //     //   selectedLayerName: this.selectedLayerTableName,
    //     //   selectedAreaName: this.selectedOptionArea,
    //     //   selectedAreaNameParent: this.selectedOptionParent,
    //     //   rowDataTable: null,
    //     //   objArea: this.objSelectedArea
    //     // };

    //     // this.onAddDropDown.emit(this.filterDataList);

    //   } else if ($(this.getName).is(':contains(Jio Center)')) {
    //     this.columnDefs = [
    //       {
    //         headerName: "jio Center",
    //         field: "jiocenter",
    //         pinned: true,
    //         width: 180
    //       }, {
    //         headerName: "Total Sites",
    //         field: "totalsites",
    //         width: 180
    //       }, {
    //         headerName: "Total Cells",
    //         field: "totalcells",
    //         width: 150
    //       },
    //       {
    //         headerName: "4G-LTE Sites",
    //         field: "sites4glte",
    //         width: 150
    //       },
    //       {
    //         headerName: "5G-NR Sites",
    //         field: "sites5gnr",
    //         width: 180
    //       }
    //     ];
    //     this.httpClient
    //       .get("assets/data/layers/table-view-data/table-jio-center.json")
    //       .subscribe(data => {
    //         this.rowData = data;
    //       });

    //     // this.filterDataList = {
    //     //   selectedLayerName: this.selectedLayerTableName,
    //     //   selectedAreaName: this.selectedOptionArea,
    //     //   selectedAreaNameParent: this.selectedOptionParent,
    //     //   rowDataTable: null,
    //     //   objArea: this.objSelectedArea
    //     // };

    //     // this.onAddDropDown.emit(this.filterDataList);

    //   // } else if ($(this.getName).is(':contains(Jio State)')) {
    //   //   this.columnDefs = [
    //   //     {
    //   //       headerName: "R4G State",
    //   //       field: "r4gstate",
    //   //       pinned: true,
    //   //       width: 150
    //   //     }, {
    //   //       headerName: "Total Sites",
    //   //       field: "totalsites",
    //   //       width: 180
    //   //     }, {
    //   //       headerName: "Total Cells",
    //   //       field: "totalcells",
    //   //       width: 150
    //   //     },
    //   //     {
    //   //       headerName: "4G-LTE Sites",
    //   //       field: "sites4glte",
    //   //       width: 150
    //   //     },
    //   //     {
    //   //       headerName: "5G-NR Sites",
    //   //       field: "sites5gnr",
    //   //       width: 180
    //   //     }
    //   //   ];
    //   //   this.httpClient
    //   //     .get("assets/data/layers/table-view-data/table-r4gstate.json")
    //   //     .subscribe(data => {
    //   //       this.rowData = data;
    //   //     });

    //     // this.filterDataList = {
    //     //   selectedLayerName: this.selectedLayerTableName,
    //     //   selectedAreaName: this.selectedOptionArea,
    //     //   selectedAreaNameParent: this.selectedOptionParent,
    //     //   rowDataTable: null,
    //     //   objArea: this.objSelectedArea
    //     // };

    //     // this.onAddDropDown.emit(this.filterDataList);
    //   }
    // }, 500);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  }


  areaDropDownFunc(item, val) {
  }

  onRowClicked(event: any) {
    this.filterDataList = {
      selectedLayerName: this.selectedLayerTableName,
      selectedAreaName: this.selectedOptionArea,
      selectedAreaNameParent: this.selectedOptionParent,
      rowDataTable: event.data,
      objArea: this.objSelectedArea
    };

    this.onAdd.emit(this.filterDataList);

  }




}
