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
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions, GridCore, SelectionChangedEvent, RowNode, Column } from 'ag-grid-community';
import { MatSidenav } from '@angular/material/sidenav';
import { dropdown, R4GState, JC, City, JioCluster, SapId } from './../../../../../../core/components/common-elements/type-dropdown-modulelist';
import { MatSelect } from '@angular/material/select';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ReplaySubject, Subject, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewEncapsulation, Type, ɵNG_COMP_DEF } from '@angular/core';
import * as moment from 'moment';
// import * as L from 'leaflet';
import { } from 'google-maps';
declare let $: any;
declare const L: any; // --> Works
import 'leaflet-draw';

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

  public projectDescriptionCtrl: FormControl = new FormControl();
  public filtervalue = "Search SAP ID";

  public selectedRadio = "Manual Selection";
  public showSuccessFailure: boolean = false;
  public showSuccessKpiFailure: Boolean = false;
  public selectJcCircleLevelFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();

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
  // Select JC Dropdown 

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

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService,
    private router: Router,
    private datatable: TableAgGridService,
    private fileUploadService: FileUploadService,
    private overlayContainer: OverlayContainer,
    private shapeService: ShapeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // router.events.subscribe((url: any) => console.log(url));

  }


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
  listBoundaries: string[] = ['Business Boundaries', 'Custom Boundaries'];
  showDiv: boolean = false;
  valueSearch = "";
  zoneType = "West";

  radioButtonChanged(item) {
    if (item.value) {
      this.showDiv = !this.showDiv;
    }
  }

  ngOnInit(): void {
    this.selectedBoundaries = this.listBoundaries[0];

    this.selectJcCircleLevelFormControl = this._formBuilder.group({
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


    // this.render();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // polyDataList = [
  //   {
  //     "type": "FeatureCollection",
  //     "features": [
  //       {
  //         "type": "Feature",
  //         "properties": {
  //           "shape": "Polygon",
  //           "name": "Unnamed Layer",
  //           "category": "default"
  //         },
  //         "geometry": {
  //           "type": "Polygon",
  //           "coordinates": [
  //             [
  //               [72.876063, 19.060009],
  //               [72.907984, 19.013112],
  //               [72.916565, 19.065525],
  //               [72.876063, 19.060009]
  //             ]
  //           ]
  //         },
  //         "id": "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
  //       },
  //       {
  //         "type": "Feature",
  //         "properties": {
  //           "shape": "Circle",
  //           "radius": 2316.4006321809024,
  //           "name": "Unnamed Layer",
  //           "category": "default"
  //         },
  //         "geometry": {
  //           "type": "Point",
  //           "coordinates": [72.915879, 19.069906]
  //         },
  //         "id": "6813e8a0-605d-4439-bbf8-d161abc30e6e"
  //       }
  //     ]
  //   }]

  public render(): void {
   
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

  }
  public address;
  public tempArr = [];
  private initMap(): void {


    this.mapTwo = L.map('map2', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapTwo);

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
      data: { transferDataPoly: this.dataPolygon,headerNominal:true }
    });

    dialogRef.afterClosed().subscribe(result => {

      // this.gotomyreport = result;
    });
  }
}
