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
}

export interface jioCenter {
  nameState: string;
}

@Component({
  selector: 'app-table-view-control',
  templateUrl: './table-view-control.component.html',
  styleUrls: ['./table-view-control.component.scss']
})
export class TableViewControlComponent implements OnInit, AfterViewInit, OnDestroy {

  //filter table
  /** list of selectedLayers */
  protected selectedLayers: selectedLayer[] = selectedLayerS;

  /** control for the selected selectedLayer */
  public selectedLayerCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public selectedLayerFilterCtrl: FormControl = new FormControl();

  /** list of selectedLayers filtered by search keyword */
  public filteredselectedLayers: ReplaySubject<selectedLayer[]> = new ReplaySubject<selectedLayer[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  //filter table


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
  public columnDefs;
  public defaultColDef;
  public defaultColGroupDef;
  public columnTypes;

  public areaParentSelect: FormControl = new FormControl();

  onAdd = new EventEmitter();

  constructor(public hostElement: ElementRef, private ref: ChangeDetectorRef, public dialogRef: MatDialogRef<TableViewControlComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private eRef: ElementRef, private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    this.datashare.currentMessage.subscribe((message) => {
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


  selectedOptionJioState;
  optionJioStateValue;
  jioStateFunc(value) {
    this.optionJioStateValue = value;
    this.selectedOptionJioState = value;
    this.selectedOptionArea = this.selectedOptionJioState;
    this.listFilterJioStates = "";
  }

  selectedOptionJioCenter;
  optionjioCentersValue;
  jioCentersFunc(value) {
    this.optionjioCentersValue = value;
    this.selectedOptionJioCenter = value;
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
      "nameState": "Andhra Pradesh",
    },
    {
      "nameState": "Assam",
    },
    {
      "nameState": "Bihar",
    },
    {
      "nameState": "Chhattisgarh",
    },
    {
      "nameState": "Goa",
    },
    {
      "nameState": "Gujarat",
    },
    {
      "nameState": "Delhi",
    },
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
    },
    {
      "nameState": "AP-HDBD-JC03-0865",
    },
    {
      "nameState": "AP-JGTL-JC01-0883",
    },
    {
      "nameState": "AP-KKND-JC01-0141",
    },
    {
      "nameState": "AP-MCPM-JC01-0127",
    },
    {
      "nameState": "AP-MDMI-JC01-0891",
    },
    {
      "nameState": "AP-PRUR-JC01-0103",
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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredselectedLayers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredselectedLayers are loaded initially
        // and after the mat-option elements are available
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
   console.log(this.getName,"this.getName");
   
    setTimeout(() => {
      if ($(this.getName).is(':contains(Pan India)')) {
        console.log($(this.getName).is(':contains(Pan India)'));
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

      } else if ($(this.getName).is(':contains(Jio Center)')) {

        console.log($(this.getName).is(':contains(Jio Center)'));
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
      } else if ($(this.getName).is(':contains(Jio State)')) {

        console.log($(this.getName).is(':contains(Jio State)'));
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
      }
    }, 500);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  }

 

  filterDataList = {
    selectedLayerName: null,
    selectedAreaName: null,
    rowDataTable: null,
  };
  onRowClicked(event: any) {
    console.log(event, "event ag grid data");
    console.log(this.areaParentSelect, "areaParentSelect event ag grid data");
   
    this.filterDataList = {
      selectedLayerName: this.selectedLayerCtrl.value,
      selectedAreaName: this.selectedOptionArea,
      rowDataTable: event.data,
    };

    this.onAdd.emit(this.filterDataList);

    // this.dialogRef.close(event.data);

  }




}
