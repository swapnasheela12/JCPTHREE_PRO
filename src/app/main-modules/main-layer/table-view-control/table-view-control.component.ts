import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild, Inject, HostListener, AfterViewInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";
import { GridOptions } from "@ag-grid-community/all-modules";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil, timeout } from 'rxjs/operators';
import { selectedLayer, selectedLayerS } from './table-view-data';
declare var $: any;

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

  //filter table
  /** list of selectedLayers */
  public selectedLayers: selectedLayer[] = selectedLayerS;

  /** control for the selected selectedLayer */
  public selectedLayerCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public selectedLayerFilterCtrl: FormControl = new FormControl();

  /** list of selectedLayers filtered by search keyword */
  public filteredselectedLayers: ReplaySubject<selectedLayer[]> = new ReplaySubject<selectedLayer[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  public _onDestroy = new Subject<void>();
  //filter table

  public selectedOptionArea = "Pan India";
  public selectedOptionAreaState;
  public selectedOptionAreaCenter;
  private inited;
  public selectedValue: string;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public sidenavBarStatus;
  public gridApi;
  public gridColumnApi;
  public rowData: any[string];
  public gridOptions: GridOptions;
  public columnDefs;
  public defaultColDef;
  public defaultColGroupDef;
  public columnTypes;
  public areaParentSelect: FormControl = new FormControl();
  public objSelectedArea;
  public onAdd = new EventEmitter();
  public onAddDropDown = new EventEmitter();
  public filterDataList = {
    selectedLayerName: null,
    selectedAreaName: null,
    selectedAreaNameParent: null,
    rowDataTable: null,
    objArea: null,
  };
  public selectedOptionParent;
  public selectedOptionJioState;
  public optionJioStateValue;
  public selectedOptionJioCenter;
  public optionjioCentersValue;
  private subValue1 : Subscription;
  constructor(public dialogRef: MatDialogRef<TableViewControlComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private eRef: ElementRef, private datashare: DataSharingService, private router: Router, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
   this.subValue1 = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    this.JioStatesList = this.jioState_List;
    this.jioCentersList = this.jioCenter_List;

    if (this.selectedOptionArea == "Pan India") {
      this.columnDefs = [
        {
          headerName: "Jio State",
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
          width: 150
        }
      ];
      this.httpClient
        .get("assets/data/layers/table-view-data/table-view-data.json")
        .subscribe(data => {
          this.rowData = data;
        });
    }

  }

  ngOnInit() {
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
    //filter  selectedLayers
    this.selectedLayerCtrl.setValue(this.selectedLayers[10]);
    this.filteredselectedLayers.next(this.selectedLayers.slice());
    this.selectedLayerFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterselectedLayers();
      });
    //filter  selectedLayers

  }

  jioStateFunc(value, item) {
    this.objSelectedArea = value;
    this.selectedOptionParent = item;
    this.optionJioStateValue = value.nameState;
    this.selectedOptionJioState = value.nameState;
    this.selectedOptionArea = this.selectedOptionJioState;
    this.listFilterJioStates = "";
  }

  jioCentersFunc(value, item) {
    this.objSelectedArea = value;
    this.selectedOptionParent = item;
    this.optionjioCentersValue = value.nameState;
    this.selectedOptionJioCenter = value.nameState;
    this.selectedOptionArea = this.selectedOptionJioCenter;
    this.listFilterjioCenters = "";
  }

  //Jio State
  public _listFilterJioStates: string;
  get listFilterJioStates(): string {
    return this._listFilterJioStates;
  }
  set listFilterJioStates(value: string) {
    this._listFilterJioStates = value;
    this.JioStatesList = this.listFilterJioStates ? this.PerformFilter(this.listFilterJioStates) : this.jioState_List;
  }
  public JioStatesList: JioState[];
  public jioState_List: JioState[] = [
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
  public _listFilterjioCenters: string;
  get listFilterjioCenters(): string {
    return this._listFilterjioCenters;
  }
  set listFilterjioCenters(value: string) {
    this._listFilterjioCenters = value;
    this.jioCentersList = this.listFilterjioCenters ? this.PerformFilterjioCenter(this.listFilterjioCenters) : this.jioCenter_List;
  }
  public jioCentersList: jioCenter[];
  public jioCenter_List: jioCenter[] = [
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
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredselectedLayers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: selectedLayer, b: selectedLayer) => a && b && a.id === b.id;
      });
  }

  protected filterselectedLayers() {
    if (!this.selectedLayers) {
      return;
    }
    // get the search keyword
    let search = this.selectedLayerFilterCtrl.value;
    if (!search) {
      this.filteredselectedLayers.next(this.selectedLayers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the selectedLayers
    this.filteredselectedLayers.next(
      this.selectedLayers.filter(selectedLayer => selectedLayer.name.toLowerCase().indexOf(search) > -1)
    );
  }
  //filter  selectedLayers

  public text: String;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
    } else {
      this.text = "clicked outside";
    }
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  public getName;
  public areaSelectionFunc() {
    this.getName = document.querySelector('#matselectarea .ng-star-inserted').firstChild;

    setTimeout(() => {
      if ($(this.getName).is(':contains(Pan India)')) {
        this.columnDefs = [
          {
            headerName: "Jio State",
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

        this.filterDataList = {
          selectedLayerName: this.selectedLayerCtrl.value,
          selectedAreaName: this.selectedOptionArea,
          selectedAreaNameParent: this.selectedOptionParent,
          rowDataTable: null,
          objArea: this.objSelectedArea
        };

        this.onAddDropDown.emit(this.filterDataList);

      } else if ($(this.getName).is(':contains(Jio Center)')) {
        this.columnDefs = [
          {
            headerName: "jio Center",
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

        this.filterDataList = {
          selectedLayerName: this.selectedLayerCtrl.value,
          selectedAreaName: this.selectedOptionArea,
          selectedAreaNameParent: this.selectedOptionParent,
          rowDataTable: null,
          objArea: this.objSelectedArea
        };

        this.onAddDropDown.emit(this.filterDataList);

      } else if ($(this.getName).is(':contains(Jio State)')) {
        this.columnDefs = [
          {
            headerName: "R4G State",
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
          selectedLayerName: this.selectedLayerCtrl.value,
          selectedAreaName: this.selectedOptionArea,
          selectedAreaNameParent: this.selectedOptionParent,
          rowDataTable: null,
          objArea: this.objSelectedArea
        };

        this.onAddDropDown.emit(this.filterDataList);
      }
    }, 500);
  }

  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  public areaDropDownFunc(item, val) {
  }

  onRowClicked(event: any) {
    this.filterDataList = {
      selectedLayerName: this.selectedLayerCtrl.value,
      selectedAreaName: this.selectedOptionArea,
      selectedAreaNameParent: this.selectedOptionParent,
      rowDataTable: event.data,
      objArea: this.objSelectedArea
    };
    this.onAdd.emit(this.filterDataList);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.subValue1.unsubscribe();
  }
}
