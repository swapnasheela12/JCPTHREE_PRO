import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import "@ag-grid-community/core/dist/styles/ag-grid.scss";
import "@ag-grid-community/core/dist/styles/ag-theme-material/sass/ag-theme-material.scss";
import { GridApi, GridCore, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ciaDropdownRenderersComponent } from '../../../performance-management/change-impact-analysis/renderer/cia-renderer.component';
import { cnctDropdownRendererComponent } from './renderer/cnct-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ncCtTooltipComponent } from './renderer/nc-ct-tooltip.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RedirectLayersPopupComponent } from 'src/app/core/components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { dropdown, R4GState, JC, City, dataSourceOutdoor, dataSourceIndoor, dataSourceMacro } from 'src/app/core/components/common-elements/type-dropdown-modulelist';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { StatergeMapNominalComponent } from '../../../network-planning/rf-planning/nominal-generation-strategy/create-page/staterge-map-nominal/staterge-map-nominal.component';
import { AdDirective } from 'src/app/_directive/dynamicComponent/ad.directive';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { NcDeleteHeaderRendererComponent } from './renderer/cnct-header-delete-renderer.component';
declare const L: any;
const PATHS = [
  { createPage: "/JCP/Layers" },
  { createQuery: "/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration/Create-Query" }
];
@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTaskPageComponent implements OnInit {
  plan: string;
  zone: string;
  r4gStates: string;
  jioCenters: string;
  city: string;
  jioState: string;
  circle: any;
  status?: string;
  public dataPolygon = [];
  public columnDefs: any[];
  public columnDefs2: any[];
  public rowData: object;
  public rowData2: object;
  public defaultColDef;
  private gridApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptions2: GridOptions;
  tooltipShowDelay: number;
  public frameworkComponentsIterationsSettings;
  public frameworkComponentsReviewGrid;
  gridColumnApi: any;
  public rowSelection;
  showSearchInput: boolean;
  searchGrid = '';
  messageSubscription: Subscription;
  public sidenavBarStatus;
  public zoneType: FormControl = new FormControl();
  public projectDescriptionCtrl: FormControl = new FormControl();
  public selectedSiteTemplate: FormControl = new FormControl();
  public filtervalue = "Search SAP ID";

  public selectedRadio = "Manual Selection";
  public showSuccessFailure: boolean = false;
  public showSuccessKpiFailure: Boolean = false;
  public selectJcCircleLevelFormControl: FormGroup;
  public selectLinkBudgetFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();
  public showMyContainer: boolean = false;
  // @ViewChild('sugGrid') sugGrid: AgGridAngular;
  @ViewChild(AdDirective) adHost: AdDirective;

  // R4G Circle Dropdown 
  @ViewChild('cityControlSelect') cityControlSelect: MatSelect;
  protected circleData = R4GState;
  public r4gCircleControl: FormControl = new FormControl();
  public r4gFilterControl: FormControl = new FormControl();
  public r4gFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // R4G Circle Dropdown 

  // City Dropdown 
  @ViewChild('cityNameControlSelect') cityNameControlSelect: MatSelect;
  protected cityData = City;
  public cityControl: FormControl = new FormControl();
  public cityFilterControl: FormControl = new FormControl();
  public cityFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // City Dropdown 

  // // dataSourceOutdoor Dropdown 
  // @ViewChild('dataSourceOutdoorControlSelect') dataSourceOutdoorControlSelect: MatSelect;
  // protected dataSourceOutdoorData = dataSourceOutdoor;
  // public dataSourceOutdoorControl: FormControl = new FormControl();
  // public dataSourceOutdoorFilterControl: FormControl = new FormControl();
  // public dataSourceOutdoorFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // // dataSourceOutdoor Dropdown 

  // Select JC Dropdown 
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Select JC Dropdown 

  @ViewChild('dataSourceIndoorCtrlSelect') dataSourceIndoorCtrlSelect: MatSelect;
  protected dataSourceIndoorListData = dataSourceIndoor;
  public dataSourceIndoorCtrl: FormControl = new FormControl();
  public dataSourceIndoorFilterCtrl: FormControl = new FormControl();
  public dataSourceIndoorFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  public itemsListPoly = [
    {
      'checked': false,
      'name': 'Polygon_Mum_1 - ',
      'date': '20 th Nov 2020',
      'polydata': {
        "type": "Feature",
        "properties": {
          "shape": "Rectangle",
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [19.045527, 72.902422],
            [19.045527, 72.905597],
            [19.049482, 72.905597],
            [19.049482, 72.902422],
            [19.045527, 72.902422]

          ]
        },
        "id": "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
    },
    {
      'checked': false,
      'name': 'Polygon_Pune_1 - ',
      'date': '10 th Nov 2020',
      'polydata': {
        "type": "Feature",
        "properties": {
          "shape": "Circle",
          "radius": 161.24681233404644,
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [72.896651, 19.048184]
        },
        "id": "6813e8a0-605d-4439-bbf8-d161abc30e6e"
      }
    },
    {
      'checked': false,
      'name': 'Polygon_Mum_2 - ',
      'date': '15 th Nov 2020',
      'polydata': {
        "type": "Feature",
        "properties": {
          "shape": "Line",
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [19.045568, 72.894765],
            [19.046055, 72.898672],
            [19.045933, 72.901742]
          ]
        },
        "id": "6af9a6fa-3b15-4854-b52c-1d3ffcfde641"
      }
    },
    {
      'checked': false,
      'name': 'Polygon_Pune_34 - ',
      'date': '10 th Oct 2020',
      'polydata': {
        "type": "Feature",
        "properties": {
          "shape": "Polygon",
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [

            [72.876063, 19.060009],
            [72.907984, 19.013112],
            [72.916565, 19.065525],
            [72.876063, 19.060009]

          ]
        },
        "id": "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
    },
    {
      'checked': false,
      'name': 'Polygon_Banglore_4 - ',
      'date': '16 th Dec 2020',
      'polydata': {
        "type": "Feature",
        "properties": {
          "shape": "Circle",
          "radius": 2316.4006321809024,
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [72.915879, 19.069906]
        },
        "id": "6813e8a0-605d-4439-bbf8-d161abc30e6e"
      }
    }
  ];

  header_iterations = [
    {
      headerName: "Name",
      field: "name",
      width: 150,
      pinned: 'left',
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: "Grid Selection",
      width: 220,
      cellRenderer: 'dropdownRenderer',
      field: "grid",
    },
    {
      headerName: "5G gNB Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
      field: "gGnb",
    },
    {
      headerName: "5G ODSC Selection",
      width: 180,
      cellRenderer: 'dropdownRenderer',
      field: "gOdsc",
    },
    {
      headerName: "",
      width: 100,
      headerComponent: 'CustomHeaderComponent',
    },
  ];

  header_review = [
    {
      headerName: "Sr. No.",
      field: "name",
      width: 350,
      pinned: 'left',
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
    },
    {
      headerName: "Grid Selection",
      width: 220,
      field: "grid",
      cellRenderer: this.taskInfoFunction,
      tooltipField: 'grid'
    },
    {
      headerName: "5G gNB Selection",
      width: 180,
      cellRenderer: this.taskInfoFunction,
      tooltipField: 'gnbSelection',
      field: "gnbSelection",
    },
    {
      headerName: "5G ODSC Selection",
      width: 180,
      field: "gOdsc",
      tooltipField: 'gOdsc',
      cellRenderer: this.taskInfoFunction,
    },
  ];
  selectedBoundaries: any;
  listBoundaries: string[] = ['Business Boundaries', 'Custom Boundaries'];
  showDiv: boolean;
  polyline: any;
  polyRectangle: any;
  poly: any;
  mapNc: any;
  googleMutant: any;
  contextMenuLib: any;
  projectName: string;
  selectedLinkBudget: string;
  customControl: any;
  createQueryRoute: string;
  constructor(
    private http: HttpClient,
    public datashare: DataSharingService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private shapeService: ShapeService,
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions2 = <GridOptions>{};
    this.frameworkComponentsIterationsSettings = {
      'dropdownRenderer': cnctDropdownRendererComponent,
      'CustomHeaderComponent': NcDeleteHeaderRendererComponent
    };
    this.defaultColDef = {
      tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    this.frameworkComponentsReviewGrid = { customTooltip: ncCtTooltipComponent };
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
  }
  zoneListArr = [
    {
      name: 'West',
      latlong: [22.978624, 87.747803]
    },
    {
      name: 'East',
      latlong: [19.076090, 72.877426]
    },
    {
      name: 'North',
      latlong: [29.238478, 76.431885]
    },
    {
      name: 'South',
      latlong: [12.972442, 77.580643]
    }
  ]

  schedule = [{
    ID: "1",
    checked: true,
    Name: "Business Boundaries"
  }, {
    ID: "2",
    checked: false,
    Name: "Custom Boundaries"
  }]
  ngOnInit() {
    this.createQueryRoute = PATHS[1].createQuery;
    this.createColumnDefs();
    this.getData();

    this.selectedBoundaries = this.listBoundaries[0];
    this.selectedLinkBudget = "Link Budget";

    this.selectLinkBudgetFormControl = this._formBuilder.group({
    });
    this.selectJcCircleLevelFormControl = this._formBuilder.group({
    });

    this.zoneType.setValue("West");
    this.projectDescriptionCtrl.setValue("Generate 5G Nominal Plan Cover Dense Urban Area With Rsrp >= -95 Dbm");
    this.selectedSiteTemplate.setValue("Site Template");
    // R4G Circle Dropdown 
    this.r4gCircleControl.setValue(this.circleData[1]);
    this.r4gFilter.next(this.circleData.slice());
    this.r4gFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.circleData,
          this.r4gFilterControl,
          this.r4gFilter
        );
      });
    // R4G Circle Dropdown

    // City Dropdown 
    this.cityControl.setValue(this.cityData[1]);
    this.cityFilter.next(this.cityData.slice());
    this.cityFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.cityData,
          this.cityFilterControl,
          this.cityFilter
        );
      });
    // City Dropdown 

    // // dataSourceOutdoor Dropdown 
    // this.dataSourceOutdoorControl.setValue(this.dataSourceOutdoorData[1]);
    // this.dataSourceOutdoorFilter.next(this.dataSourceOutdoorData.slice());
    // this.dataSourceOutdoorFilterControl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterData(
    //       this.dataSourceOutdoorData,
    //       this.dataSourceOutdoorFilterControl,
    //       this.dataSourceOutdoorFilter
    //     );
    //   });
    // // dataSourceOutdoor Dropdown 

    // Select JC Dropdown 
    this.selectJcControl.setValue(this.jcData[1]);
    this.selectJcFilter.next(this.jcData.slice());
    this.selectJcFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jcData,
          this.selectJcFilterControl,
          this.selectJcFilter
        );
      });
    // Select JC Dropdown 

    this.dataSourceIndoorCtrl.setValue([this.dataSourceIndoorListData[0]]);
    this.dataSourceIndoorFilter.next(this.dataSourceIndoorListData.slice());
    this.dataSourceIndoorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.dataSourceIndoorListData,
          this.dataSourceIndoorFilterCtrl,
          this.dataSourceIndoorFilter
        );
      });

    this.contextMenuLib = contextLayerMenu();
    this.googleMutant = googleMutant();


    // this.render();
    this.projectName = 'Zone_Jio State_Jio Center_NP_CV_121020_V1';
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }
  // onAddRowsug() {
  //   console.log(this.sugGrid)
  //   this.sugGrid.api.addItems([{ name: 'Exp1', grid: '', gGnb: '', gOdsc: '' }]);
  // }

  protected filterData(listData, filterCtrl, filterSubject) {
    if (!listData) {
      return;
    }

    let search = filterCtrl.value;
    if (!search) {
      filterSubject.next(
        listData.slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }

    filterSubject.next(
      listData.filter(
        data => data.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public address;
  public tempArr = [];

  private initMap(): void {

    this.mapNc = L.map('mapNc2', {
      center: [20.593683, 78.962883],
      zoomControl: false,
      zoom: 4
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapNc);

    // console.log(this.selectedZoneType.value,"this.selectedZoneType");
    // if (this.selectedZoneType != '') {
    //   // this.mapTwo.setView(this.selectedZoneType.latlong, 7);
    // } else {
    //   // this.mapTwo.setView([lat, lng], zoom);
    // }
    // console.log(this.selectedZoneType, "this.selectedZoneType");
    // this.zoneChangeFunc($event:any,this.mapTwo);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.mapNc);


    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (mapNc2) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
        container.innerHTML = ' <div class="tab-container-layersMap2"><div class="icon-count"><span style="font-size: 9px;font-weight: 500;" id="command"></span></div><div class="icon-styleMap2"><i class="ic ic-layers-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "38px 38px";
        container.style.width = '38px';
        container.style.height = '38px';

        container.onclick = function () { }
        this._container = container;
        this._update();
        return this._container;
      },
      onRemove: function (map) {

      },
      _update: function () {
        if (!this._map) {
          return;
        }
      }
    });
    this.mapNc.addControl(new this.customControl());

    this.shapeService.mapServiceData = this.mapNc;

  }
  openDialogSuccessful(): void {
    const dialogRef = this.dialog.open(RedirectLayersPopupComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { transferDataPoly: this.dataPolygon, headerNominal: true }
    });

    dialogRef.afterClosed().subscribe(result => {

      // this.gotomyreport = result;
    });
  }
  polySelectedChange(item) {
    console.log(item, "item");
    this.dataPolygon.push(item);
    item.checked = !item.checked;
    // for (let index = 0; index < this.itemsListPoly.length; index++) {
    //   const element = this.itemsListPoly[index];
    //   console.log(element, "element");


    if (item.checked == true) {
      if (item.polydata.properties.shape == 'Circle') {
        this.circle = L.circle([item.polydata.geometry.coordinates[1], item.polydata.geometry.coordinates[0]], item.polydata.properties.radius, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(this.mapNc);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapNc);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 }).addTo(this.mapNc);
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapNc);
      }

    } else {

      if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle.remove();
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly.remove();
      } else if (item.polydata.properties.shape == 'Circle') {
        this.circle.remove();
      } else {
        this.polyline.remove();
      }

    }
  }

  public typeGenerate: boolean = true;
  zoneChangeFunc(val) {
    // this.selectedZoneType = val;
    this.mapNc.setView(val.value.latlong, 6);
    this.typeGenerate = false;
  }

  public render(val): void {
    this.mapNc.setView([19.0522, 72.9005], 13);
    this.typeGenerate = false;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

  }

  public fitColumns() {
    // if (this.gridOptions.api && this.rowData) {
    setTimeout(() => {
      this.gridOptions.api.sizeColumnsToFit();
      this.gridOptions2.api.sizeColumnsToFit();
    }, 500);
    // }
  }
  radioButtonChanged(item) {
    if (item.value) {
      this.showDiv = !this.showDiv;
    }
  }
  taskInfoFunction(params) {
    var queryNameGrid = params.data.grid;
    var queryNameGnb = params.data.gnbSelection;
    var queryNameOdsc = params.data.gOdsc;
    if (params.colDef.headerName == "5G gNB Selection") {
      var template1 = '<span>' + queryNameGnb + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    } else if (params.colDef.headerName == "Grid Selection") {
      var template1 = '<span>' + queryNameGrid + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    } else if (params.colDef.headerName == "5G ODSC Selection") {
      var template1 = '<span>' + queryNameOdsc + '</span><i style="font-size:14px; position: absolute; margin-top:17px" class="ml-3 zmdi zmdi-info"></i>';
    }
    return template1;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      this.fitColumns();
    }, 500);
  }

  getContext() {
    return {
      gridOptions: this.gridOptions,
      // sugGrid: this.sugGrid,
    }
  }

  private getData() {
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/create_capacity_task/iterations_grid.json")
      .subscribe(data => {
        this.rowData = data;
      });
    this.http.get("assets/data/modules/planning_and_deployment/nominal_capacity/create_capacity_task/review_grid.json")
      .subscribe(data => {
        this.rowData2 = data;
      });
  }
  private createColumnDefs() {
    this.columnDefs = this.header_iterations;
    this.columnDefs2 = this.header_review;
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
