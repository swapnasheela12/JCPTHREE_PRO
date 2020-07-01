import { Component, OnInit, Input, ViewChild, Inject, HostListener, AfterViewInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSelect } from '@angular/material/select';
import { HttpClient } from "@angular/common/http";


// ag grid
import * as agGrid from 'ag-grid-community';
import { GridOptions } from "@ag-grid-community/all-modules";


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ButtonRendererComponent } from '../../reports-dashboards/my-reports/button-renderer.component';


import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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

  constructor(public dialogRef: MatDialogRef<TableViewControlComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private eRef: ElementRef, private datashare: DataSharingService, private location: Location, private router: Router, private overlayContainer: OverlayContainer, private httpClient: HttpClient, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;

    });


    this.JioStatesList = this.products;
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
          width: 100
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



  //Jio State
  _listFilterJioStates: string;
  get listFilterJioStates(): string {
    return this._listFilterJioStates;
  }
  set listFilterJioStates(value: string) {
    this._listFilterJioStates = value;
    this.JioStatesList = this.listFilterJioStates ? this.PerformFilter(this.listFilterJioStates) : this.products;
  }
  JioStatesList: JioState[];
  products: JioState[] = [
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
    return this.products.filter((product: JioState) =>
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
    this.jioCentersList = this.listFilterjioCenters ? this.PerformFilterjioCenter(this.listFilterjioCenters) : this.products;
  }
  jioCentersList: jioCenter[];
  jioCenter_List: jioCenter[] = [
    {
      "nameState": "Mumbai",
    },
    {
      "nameState": "Pune",
    },
    {
      "nameState": "Jamnagar",
    },
    {
      "nameState": "Bangalore",
    },
    {
      "nameState": "Indore",
    },
    {
      "nameState": "Chennai",
    },
    {
      "nameState": "Jaipur",
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
    console.log(this.text, "this.text");

  }

  // @HostListener('window:click')
  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }


  sendSelectedArea(item, val, ele) {
    console.log(item, "item");
    console.log(val, "val");
    console.log(ele, "ele");
    if (item == "Pan India") {
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

    } else if (val == "Jio Center") {
      this.columnDefs = [
        {
          headerName: "SAP ID",
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
    } else {
      this.columnDefs = [
        {
          headerName: "JC ID",
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
    }

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();


  }
  // columnDefs = [
  //   {
  //     headerName: "Jio State",
  //     field: "jiostate",
  //     width: 250
  //   }, {
  //     headerName: "<20°",
  //     field: "lessThanTwenty",
  //     width: 200
  //   }, {
  //     headerName: "20°> to <40°",
  //     field: "greaterThanTwenty",
  //     width: 250
  //   },
  //   {
  //     headerName: "40°> to <60°",
  //     field: "greaterThanForty",
  //     width: 250
  //   },
  //   {
  //     headerName: ">60°",
  //     field: "greaterThanSixty",
  //     width: 200
  //   }
  // ];

  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.gridApi.sizeColumnsToFit();

  //   this.httpClient
  //     .get("assets/data/layers/table-view-data/table-view-data.json")
  //     .subscribe(data => {
  //       this.rowData = data;
  //     });
  // }
  onRowClicked(event: any) {
    // this.router.navigate(['/',  'ExecutiveSummary']).then(event => {
    // }, err => {
    //   console.log(err) // when there's an error
    // });

  }




}
