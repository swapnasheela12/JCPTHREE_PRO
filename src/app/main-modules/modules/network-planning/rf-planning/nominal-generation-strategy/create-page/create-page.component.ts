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
import * as L from 'leaflet';
import { } from 'google-maps';
declare var $: any;
// import 'leaflet-draw';

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
      'checked': true,
      'name': 'Polygon_Mum_1 - ',
      'date': '20 th Nov 2020',
    },
    {
      'checked': false,
      'name': 'Polygon_Pune_1 - ',
      'date': '10 th Nov 2020',
    },
    {
      'checked': true,
      'name': 'Polygon_Mum_2 - ',
      'date': '15 th Nov 2020',
    },
    {
      'checked': false,
      'name': 'Polygon_Pune_34 - ',
      'date': '10 th Oct 2020',
    },
    {
      'checked': false,
      'name': 'Polygon_Banglore_4 - ',
      'date': '16 th Dec 2020',
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

  public render(): void {
    // const index = Math.round(Math.random());
    // const currentComponent = this.components[index];
    console.log(this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent));
    console.log(this.adHost.viewContainerRef);

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

  }

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
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
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





    // // Initialise the FeatureGroup to store editable layers
    // var editableLayers = new L.FeatureGroup();
    // this.mapTwo.addLayer(editableLayers);

    // var drawPluginOptions = {
    //   position: 'topright',
    //   draw: {
    //     polygon: {
    //       allowIntersection: false, // Restricts shapes to simple polygons
    //       drawError: {
    //         color: '#e1e100', // Color the shape will turn when intersects
    //         message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    //       },
    //       shapeOptions: {
    //         color: '#97009c'
    //       }
    //     },
    //     // disable toolbar item by setting it to false
    //     polyline: false,
    //     circle: false, // Turns off this drawing tool
    //     rectangle: false,
    //     marker: false,
    //   },
    //   edit: {
    //     featureGroup: editableLayers, //REQUIRED!!
    //     remove: false
    //   }
    // };

    // // Initialise the draw control and pass it the FeatureGroup of editable layers
    // var drawControl = new L.Control.Draw(drawPluginOptions);
    // this.mapTwo.addControl(drawControl);

    // var editableLayers = new L.FeatureGroup();
    // this.mapTwo.addLayer(editableLayers);

    // this.mapTwo.on('draw:created', function (e) {
    //   var type = e.layerType,
    //     layer = e.layer;

    //   if (type === 'marker') {
    //     layer.bindPopup('A popup!');
    //   }

    //   editableLayers.addLayer(layer);
    // });










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

}
