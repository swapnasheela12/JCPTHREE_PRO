import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PolygonPopupComponent } from '../polygon-popup/polygon-popup.component';
import { Router } from '@angular/router';
import { StructurePlannedFibreCoreComponent } from 'src/app/main-modules/main-layer/layer-list/topologies/structure/structure-planned-fibre-core/structure-planned-fibre-core.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatSidenav } from '@angular/material/sidenav';
import { } from 'google-maps';
declare let $: any;
declare const L: any; // --> Works
import 'leaflet-draw';
import { MatSelect } from '@angular/material/select';
import { dropdown, R4GState, JC, City} from './../../../../../core/components/common-elements/type-dropdown-modulelist';
import { StatergeMapNominalComponent } from '../../../network-planning/rf-planning/nominal-generation-strategy/create-page/staterge-map-nominal/staterge-map-nominal.component';
import { AdDirective } from 'src/app/_directive/dynamicComponent/ad.directive';
import { RedirectLayersPopupComponent } from 'src/app/core/components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { MatStepper } from '@angular/material/stepper';

interface existing4GSites {
  name: string;
}

interface polygonName {
  name: string;
  type: string;
  outdoor: string;
  profile: string;
}

interface radio {
  name: string;
  class: string;
}

const EXISTING_4G_SITES: existing4GSites[] = [
  { name: 'Jio Own(P1)' },
  { name: 'Rcom(RP1)' },
  { name: 'IP Colo(IP1)' },
  { name: 'Place New Sites' },
  { name: 'Rcom1(RP2)' },
  { name: 'Rcom2(RP3)' }
];

const POLYGON_NAME: polygonName[] = [
  { name: 'Polygon_Mum_1', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_2', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1'  },
  { name: 'Polygon_Mum_3', type: 'CombineG' , outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_4', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_5', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_6', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' }
];

const RADIO_TYPE_LIST: radio[] = [
  { name: 'Green Field', class: 'green-field' },
  { name: 'Infill Planning', class: 'infill-planning' }
];

const RADIO_CELL_LIST: radio[] = [
  { name: 'Link Budget', class: 'link-budget' },
  { name: 'Define Cell Radius', class: 'define-cell-radius' }
];

@Component({
  selector: 'app-nominal-generation-create',
  templateUrl: './nominal-generation-create.component.html',
  styleUrls: ['./nominal-generation-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [StructurePlannedFibreCoreComponent]
})
export class NominalGenerationCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  radioList = RADIO_TYPE_LIST;
  radioListCell = RADIO_CELL_LIST;
  selectBasicDetails: FormGroup;
  selectCellRadius: FormGroup;
  selectHeaderProjectName: FormGroup;
  selectExisting4GSites: FormGroup;
  selectPolygonName: FormGroup;
  polygonNameData = POLYGON_NAME;
  existing4GSitesSearch = new FormControl();
  polygonNameSearch = new FormControl();
  existing4GSitesFilter: Observable<any[]>;
  polygonNameFilter: Observable<any[]>;
  templateGalleryChecked: number = 0;
  // projectName = new FormControl('Zone_Kio_State_Center_Np_Cv_121020_v1');
  selectedRadioSite = 'Green Field';
  selectedRadioCell = 'Link Budget';
  generateDisabled: boolean = true;
  mainLayerRef: {};
  designControls: FormArray;
  @ViewChild('nodeCounterStepper', {static: true}) nodeCounterStepper: MatStepper;
  linkBudgetList = [
    { name :'Link Budget 1'},
    { name: 'Link Budget 2'}
  ];
  
  siteTemplate = [
    { name :'Site Template 1'},
    { name: 'Site Template 2'}
  ];
  itemsListPoly = [
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
  itemsListPolySite = [
    {
      'checked': false,
      'name': 'Jio Own (P1)',
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
      'name': 'Rcom (RP1)',
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
      'name': 'IP Colo (IP1)',
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
      'name': 'Place New Sites',
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
      'name': 'Rcom1(RP2)',
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
    },
    {
      'checked': false,
      'name': 'Rcom1(RP3)',
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

  existing4GSitesData = this.itemsListPolySite;
  @ViewChild('spiderView', { read: ViewContainerRef }) target: ViewContainerRef;
  public customControl;
  public customControl1;
  private mapFour;
  private mapThree;
  public contextMenuLib;
  public optionMap;
  public googleMutant;

  public projectDescriptionCtrl: FormControl = new FormControl();
  public filtervalue = "Search SAP ID";

  public selectedRadio = "Manual Selection";
  public showSuccessFailure: boolean = false;
  public showSuccessKpiFailure: Boolean = false;
  public selectJcCircleLevelFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();
  disabledChecked =  true;
  disableCheckedInfill = true;

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

  // Select JC Dropdown 
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  trackByCheckbox(index: number, item: any): string {
    return item.name;
  }

  trackByRadioButtonType(index: number, type: any): string {
    return type.name;
  }
  public components = [StatergeMapNominalComponent];
  public currentComponent = null;
  @ViewChild(AdDirective) adHost: AdDirective;
  selectedBoundaries: string;
  listBoundaries: string[] = ['Business Boundaries', 'Custom Boundaries'];
  showDiv: boolean = false;
  valueSearch = "";
  zoneType = "West";
  designList = [{value:'300', value1: '500', value2: '800', value3: '1500'}];
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private str: StructurePlannedFibreCoreComponent,
    private cdr: ChangeDetectorRef,
    private dataShare: DataSharingService,
    private shapeService: ShapeService
  ) {
  }

  ngOnInit(): void {
    console.log(this.nodeCounterStepper)
    console.log(this.designList);
    const designGroups = this.designList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
        value1: new FormControl(entity.value1, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required)
      });
    });
    this.designControls = new FormArray(designGroups);

    this.selectExisting4GSites = this.formBuilder.group({
      existing4GSitesArray: this.formBuilder.array(this.existing4GSitesData.map(x => false))
    }
    );
    this.existing4GSitesFilter = this.existing4GSitesSearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.existing4GSitesData.slice()))
    );

    this.selectPolygonName = this.formBuilder.group({
      polygonControl: new FormControl([])
    });
    
    this.polygonNameFilter = this.existing4GSitesSearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.polygonNameData.slice()))
    );
    this.selectedBoundaries = this.listBoundaries[0];

    this.selectJcCircleLevelFormControl = this.formBuilder.group({
    });

    this.projectDescriptionCtrl.setValue("Generate 5G Nominal Plan Cover Dense Urban Area With Rsrp >= -95 Dbm");
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

    this.contextMenuLib = contextLayerMenu();
    this.googleMutant = googleMutant();
  }

  radioButtonChanged(item) {
    if (item.value) {
      this.showDiv = !this.showDiv;
    }
  }

  ngAfterViewInit(): void {
    this.initMapSite();
    this.initMap();
  }

  templateFilter(name: string) {
    return this.existing4GSitesData.filter(
      template => template.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  initMapSite() {
    this.mapThree = L.map('map3', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });
    const tiles1 = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles1.addTo(this.mapThree);
    L.control.zoom({
      position: 'bottomright'
    })
    .addTo(this.mapThree);
    this.customControl1 = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (map3) {
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
    this.mapThree.addControl(new this.customControl1())
    this.shapeService.mapServiceData = this.mapThree;
  }
  selectNodeStepper(event) {
    // this.initMapSite();
    if (event.selectedIndex == 2) {
      this.generateDisabled = false;
    } else {
      this.generateDisabled = true;
    }
  }

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

  polygonNamePopup(name){
    const dialogRef = this.dialog.open(PolygonPopupComponent, {
      width: '585px',
      height: '336px',
      data: {'title': name}
    });
  }

  public address;
  public tempArr = [];
  private initMap(): void {

    this.mapFour = L.map('map4', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapFour);    

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.mapFour);


    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (map4) {
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

    this.mapFour.addControl(new this.customControl());

    this.shapeService.mapServiceData = this.mapFour;

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
    // this.mapFour.pm.addControls(optionsPolyDraw);
    // let drawnItems = new L.FeatureGroup();
    // this.mapFour.addLayer(drawnItems);

    // this.mapFour.pm.Draw.getShapes();

    // this.mapFour.on('pm:create', (e) => {
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
  public polyRectangle;
  public circle;
  public poly;
  public polyline;
  public dataPolygon = [];
  public render(): void {
    // alert("layer renderer")
    console.log(this.adHost)
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

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
        }).addTo(this.mapFour);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapFour);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 }).addTo(this.mapFour)
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapFour);
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

  polySelectedChangeSite(item) {
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
        }).addTo(this.mapThree);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapThree);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 })
        .addTo(this.mapThree)
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapThree);
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
  // designControls: FormArray;

  getDesignControl(index: number, field: string): FormControl {
    console.log(this.designControls.at(index))
    return this.designControls.at(index).get(field) as FormControl;
  }
  updateDesignField(index: number, field: string) {
    const designControl = this.getDesignControl(index, field);
    console.log(designControl);
    if (designControl.valid) {
      this.designList = this.designList.map((e, i) => {
        // return designControl.value
        console.log(e)
        console.log(i)
        console.log(
          {
            ...e,
            [field]: designControl.value
          }
        );
        // // if (index === i) {
          return {
            ...e,
            [field]: designControl.value
          }
        // // }
        // return e;
      })
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

  openDialogSuccessful(): void {
    const dialogRef = this.dialog.open(RedirectLayersPopupComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { transferDataPoly: this.dataPolygon,headerNominal:true }
    });

    dialogRef.afterClosed().subscribe(result => {

      // this.gotomyreport = result;
    });
  }

  async additionalCandidateLayer() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalGenerationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-generation-coverage/nominal-generation-layer/nominal-generation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalGenerationLayerComponent)
    );
  }

  allowRendering() {
    this.disabledChecked = !this.disabledChecked;
  }

  allowRenderinginfill() {
    this.disableCheckedInfill = !this.disableCheckedInfill;
  }
}
