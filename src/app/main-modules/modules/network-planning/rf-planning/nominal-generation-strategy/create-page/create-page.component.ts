import { NODE } from './../../../../performance-management/kpi-editor/create-kpi/create-kpi-constant';
import { ViewAttributesComponent } from './../../../../../../core/components/commonPopup/view-attributes/view-attributes.component';
import { dropDownList3DotRendererComponent } from './../../../../../../core/components/ag-grid-renders/dropDownList3DotRenderer.component';
import { dropdownPriorityRendererComponent } from './../../../../../../core/components/ag-grid-renders/dropdown-priority-renderer.component';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';
import { dropdownQueryRendererComponent } from './../../../../../../core/components/ag-grid-renders/dropdown-query-renderer.component';
import { statusflagiconRenderComponent } from './../../../../../../core/components/ag-grid-renders/statusflagicon.component';
import { DeleteButtonRenderComponent } from './../../../../../../core/components/ag-grid-renders/deleteButtonRender.component';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { RedirectLayersPopupComponent } from './../../../../../../core/components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { ShapeService } from './../../../../../main-layer/layers-services/shape.service';
import { AdDirective } from './../../../../../../_directive/dynamicComponent/ad.directive';
import { StatergeMapNominalComponent } from './staterge-map-nominal/staterge-map-nominal.component';
import { catchError } from 'rxjs/operators/catchError';
import { takeUntil, map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions, GridCore, SelectionChangedEvent, RowNode, Column } from 'ag-grid-community';
import { MatSidenav } from '@angular/material/sidenav';
import { dropdown, R4GState, JC, City, dataSourceOutdoor, dataSourceIndoor, dataSourceMacro } from './../../../../../../core/components/common-elements/type-dropdown-modulelist';
import { MatSelect } from '@angular/material/select';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { ReplaySubject, Subject, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewEncapsulation, Type, ɵNG_COMP_DEF } from '@angular/core';
import * as moment from 'moment';
// import * as L from 'leaflet';
import { } from 'google-maps';
declare let $: any;
declare const L: any; // --> Works
import 'leaflet-draw';
import { MatStepper } from '@angular/material/stepper';

const PATHS = [
  { createPage: "/JCP/Layers" },
  { createQuery: "/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration/Create-Query" }
  ];

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface dropDownListType {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreatePageComponent implements OnInit {

  @ViewChild('spiderView', { read: ViewContainerRef }) target: ViewContainerRef;
  public customControl;
  private mapTwo;
  public contextMenuLib;
  public optionMap;
  public googleMutant;
  public OutdoorSmallCell = "Landmark";
  public IndoorSmallCell = "Landmark";
  public MacroSmallCell = "Landmark";

  public createQueryRoute: string;

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

  // trackByRadioButtonType(index: number, type: any): string {
  //   return type.name;
  // }
  // trackByChipsPost(index: number, postValue: any): string {
  //   return postValue;
  // }
  // trackByChipsPre(index: number, preValue: any): string {
  //   return preValue;
  // }
  // trackByRadioButtonFrequency(index: number, frequency: any): string {
  //   return frequency;
  // }
  public radioTypeList: any[] = [
    { 'name': 'Bulk Upload' },
    { 'name': 'Manual Selection' }
  ];

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
  generateDisabled: boolean = true;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  public components = [StatergeMapNominalComponent];
  public currentComponent = null;
  @ViewChild(AdDirective) adHost: AdDirective;


  public gridApi;
  public gridPinned = false;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: any;
  public columnDefs: any[];
  public rowCount: string;
  public frameworkComponentsMyReport = {
    dropDownThreeDotRenderer: dropDownList3DotRendererComponent,
    dropdownQueryRenderer: dropdownQueryRendererComponent,
    dropdownPriorityRenderer: dropdownPriorityRendererComponent,
    statusFlagRenderer: statusflagiconRenderComponent,
  };

  @ViewChild('agGridFlag', { static: true }) agGridFlag: GridOptions;

  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    private router: Router,
    private location: Location,
    private datatable: TableAgGridService,
    private fileUploadService: FileUploadService,
    private overlayContainer: OverlayContainer,
    private shapeService: ShapeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // router.events.subscribe((url: any) => console.log(url));
    this.gridOptions = <GridOptions>{
      suppressHorizontalScroll: false,
    };
    // this.gridOptions = <GridOptions>{};
    this.httpClientRowData();
    this.createColumnDefs();
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

  selectedBoundaries: string;
  selectedLinkBudget: string;
  listBoundaries: string[] = ['Business Boundaries', 'Custom Boundaries'];
  linkBudgetArr: string[] = ['Link Budget', 'Upload Link Budget', 'Define Cell Radius'];
  showDiv: boolean = false;
  showDivLinkBudget = "Link Budget";
  valueSearch = "";


  radioButtonChanged(item) {
    if (item.value) {
      this.showDiv = !this.showDiv;
    }
  }

  radioButtonLinkBudgetChanged(item) {
    console.log(item, "item");
    if (item.value == "Link Budget") {
      this.showDivLinkBudget = "Link Budget";
    }
    else if (item.value == "Upload Link Budget") {
      this.showDivLinkBudget = "Upload Link Budget";
    } else {
      this.showDivLinkBudget = "Define Cell Radius";
    }
  }

  public projectName;
  ngOnInit(): void {
    this.createQueryRoute = PATHS[1].createQuery;
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
  currentStep;
  ngAfterViewInit(): void {
    this.initMap();
  }

  public address;
  public tempArr = [];

  private initMap(): void {

    this.mapTwo = L.map('map2', {
      center: [20.593683, 78.962883],
      zoomControl: false,
      zoom: 4
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapTwo);

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
    }).addTo(this.mapTwo);


    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (map2) {
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
    this.mapTwo.addControl(new this.customControl());

    this.shapeService.mapServiceData = this.mapTwo;

    // let optionsPolyDraw = {
    //   position: 'bottomright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    //   drawMarker: true,  // adds button to draw markers
    //   drawPolygon: true,  // adds button to draw a polygon
    //   drawPolyline: false,  // adds button to draw a polyline
    //   drawCircle: true,  // adds button to draw a cricle
    //   drawCircleMarker: false,//add button with circle radius
    //   editPolygon: false,  // adds button to toggle global edit mode
    //   deleteLayer: false,   // adds a button to delete layers
    //   // removalMode: false,
    //   cutPolygon: false,
    //   drawRectangle: false,
    //   editMode: false,
    //   dragMode: false,// drag and drop
    // };
    // this.mapTwo.pm.addControls(optionsPolyDraw);
    // let drawnItems = new L.FeatureGroup();
    // this.mapTwo.addLayer(drawnItems);

    // this.mapTwo.pm.Draw.getShapes();

    // this.mapTwo.on('pm:create', (e) => {
    //   console.log(e, "eeeeeeeeee");
    //   let shape = e.shape,
    //     layer = e.layer;
    //   if (shape === "Polygon") {
    //     // here you got the polygon points
    //     let points = layer._latlngs;
    //     console.log(points, "points>>>");
    //     // here you can get it in geojson format
    //     let geojson = layer.toGeoJSON();
    //     console.log(geojson, "geojson>>>");
    //   }
    //   drawnItems.addLayer(layer);

    //   let shapes = this.getShapes(drawnItems);
    //   console.log(shapes, "shapes>>>");


    // });


  }

  public typeGenerate: boolean = true;
  zoneChangeFunc(val) {
    // this.selectedZoneType = val;
    this.mapTwo.setView(val.value.latlong, 6);
    this.typeGenerate = false;
  }

  public render(val): void {
    this.mapTwo.setView([19.0522, 72.9005], 13);
    this.typeGenerate = false;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

  }




  public polyRectangle;
  public circle;
  public poly;
  public polyline;
  public dataPolygon = [];
  polySelectedChange(item) {
    console.log(item, "item");
    this.dataPolygon.push(item);
    item.checked = !item.checked;
    // for (let index = 0; index < this.itemsListPoly.length; index++) {
    //   const element = this.itemsListPoly[index];
    //   console.log(element, "element");
    this.mapTwo.setView([19.0522, 72.9005], 13);

    if (item.checked == true) {
      if (item.polydata.properties.shape == 'Circle') {
        this.circle = L.circle([item.polydata.geometry.coordinates[1], item.polydata.geometry.coordinates[0]], item.polydata.properties.radius, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(this.mapTwo);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapTwo);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 }).addTo(this.mapTwo);
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapTwo);
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

  getShapes(drawnItems) {

    let shapes = [];

    drawnItems.eachLayer(function (layer) {
      console.log(layer, "layer");

      // Note: Rectangle extends Polygon. Polygon extends Polyline.
      // Therefore, all of them are instances of Polyline
      if (layer instanceof L.Polyline) {
        shapes.push(layer.getLatLngs())
      }

      if (layer instanceof L.Circle) {
        shapes.push([layer.getLatLng()])
      }

      if (layer instanceof L.Marker) {
        shapes.push([layer.getLatLng()]);
      }

    });
    console.log(shapes, "shapes");


    return shapes;
  };


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

  stepperChanged(event) {
    if (event.selectedIndex == 2) {
      this.generateDisabled = false
    } else {
      this.generateDisabled = true
    }
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  public Workorder = false;
  showWorkorder() {
    this.Workorder = true;
  }

  public fileName;
  clearupload() {
    this.fileName = "";
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

  public itemsProjectName = [
    {
      'checked': false,
      'name': 'Mumbai All Clutter',
      'date': '20 th Nov 2020'
    },
    {
      'checked': false,
      'name': 'Delhi Dense Urban',
      'date': '10 th Nov 2020'
    },
    {
      'checked': false,
      'name': 'Gujarat _12 Dec 20',
      'date': '15 th Nov 2020'
    },
    {
      'checked': false,
      'name': 'Pune _24 Dec 20',
      'date': '10 th Oct 2020'
    },
    {
      'checked': false,
      'name': 'Pune _24 Dec 30 ',
      'date': '16 th Dec 2020'
    }
  ];

  projectSelectedChange(item) {
    console.log(item, "item");
    this.dataPolygon.push(item);
    item.checked = !item.checked;

  }

  openFileUploadPopup(): void {
    const title = `Upload Nodes`;
    var showExample = false;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '250px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
  }

  url = "assets/data/modules/network-planning/staterge-map-nominal/datasource.json";

  private httpClientRowData() {
    this.http
      .get("assets/data/modules/network-planning/staterge-map-nominal/datasource.json")
      .subscribe(data => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid-without-Pagination";
        this.datatable.rowDataServices = this.rowData;
        this.gridOptions.rowData = this.rowData;
        this.datatable.gridPinnedServices = this.gridPinned;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }
  selected = "all";
  private createColumnDefs() {
    this.columnDefs = [{
      headerName: "",
      field: "datasourcename",
      width: 250,
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      // headerCheckboxSelection: function (params) {
      //   return params.columnApi.getRowGroupColumns().length === 0;
      // },
      pinned: 'left',
      // cellClass: 'lock-pinned'
    },
    {
      headerName: "",
      field: "attributes",
      width: 140,
    },
    {
      headerName: "",
      field: "querydata",
      cellRenderer: 'dropdownQueryRenderer',
      // cellStyle: function (params: any) {
      //   return { color: params.value };
      // },
      width: 200,
    },
    {
      headerName: "",
      field: "tablename",
      width: 140,
    },
    {
      headerName: "",
      field: "filename",
      width: 140,
    },
    {
      headerName: "",
      field: "ptype",
      cellRenderer: 'dropdownPriorityRenderer',
      // cellStyle: function (params: any) {
      //   return { color: params.value };
      // },
      width: 180,
    },
    {
      headerName: "",
      cellRenderer: 'dropDownThreeDotRenderer',
      width: 110,
      pinned: 'right',
    }
    ];

    this.datatable.columnDefsServices = this.columnDefs;
    this.gridOptions.columnDefs = this.columnDefs;

  }

  defaultColDef = { resizable: true };

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }

  public showExclusionZones: boolean = false;
  public showStrategicSites: boolean = false;
  onCellClicked(item) {
    console.log(item, "item");
    console.log(item.value,"item.value");
    if (item.value == "View Attributes") {
      const dialogRef = this.dialog.open(ViewAttributesComponent, {
        width: "600px",
        height: "535px",
        panelClass: "material-dialog-container",
        // data: { transferDataPoly: this.dataPolygon, headerNominal: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.gotomyreport = result;
      });
    } else if(item.value == "Upload File") {

      if (item.data.datasourcename == "Exclusion Zones") {
        console.log("Exclusion Zones");
        this.showExclusionZones = true;
        this.showStrategicSites = false;
        this.showSelected = true;
      }else if(item.data.datasourcename == "Strategic Sites"){
        console.log("Strategic Sites");
        this.showStrategicSites = true;
        this.showExclusionZones = false;
        this.showSelected = true;
      }

    } else if(item.value == "Select Table") {

      if (item.data.datasourcename == "Exclusion Zones") {
        console.log("Exclusion Zones");
        this.showExclusionZones = true;
        this.showStrategicSites = false;
        this.showSelected = true;
      }else if(item.data.datasourcename == "Strategic Sites"){
        console.log("Strategic Sites");
        this.showStrategicSites = true;
        this.showExclusionZones = false;
        this.showSelected = true;
      }
    }
  }

  defineDataSourceFun() {
    this.showMyContainer = !this.showMyContainer;
  }


  showSelected: boolean = false;
  @ViewChild('nodeCounterStepper') stepper: MatStepper;
  // @Input() steperInput: number;
  ToggleButton() {
    this.showSelected = !this.showSelected;
    // console.log(this.steperInput,"this.steperInput");
    console.log(this.stepper, "stepper");
    this.datashare.changeMessageDialog(this.stepper)

    // this.steperInput = this.stepper.selectedIndex;
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  // getselecteddefine(val) {
  getselecteddefine(val) {
    console.log(val, "val");
    this.showSelected = val;

    // setTimeout(() => {
    //   this.initMap();
    // }, 500);
    this.stepFunc();
  }

  stepFunc() {
    this.showSelected = false;
    setTimeout(() => {
      this.stepper.selectedIndex = 1;
      this.currentStep = 2;
    }, 500);

    setTimeout(() => {
      this.initMap();
    }, 500);

  }



}
