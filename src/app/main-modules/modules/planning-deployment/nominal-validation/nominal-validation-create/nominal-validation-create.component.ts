import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { dropdown, R4GState, City, JC } from 'src/app/core/components/common-elements/type-dropdown-modulelist';
import { StatergeMapNominalComponent } from '../../../network-planning/rf-planning/nominal-generation-strategy/create-page/staterge-map-nominal/staterge-map-nominal.component';
import { AdDirective } from 'src/app/_directive/dynamicComponent/ad.directive';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { } from 'google-maps';
declare let $: any;
declare const L: any; // --> Works
import 'leaflet-draw';
import { RedirectLayersPopupComponent } from 'src/app/core/components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PolygonPopupComponent } from '../../nominal-generation-coverage/polygon-popup/polygon-popup.component';
import { CompleteListPopupComponent } from '../complete-list-popup/complete-list-popup.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

interface existing4GSites {
  name: string;
}

interface ACPList {
  srno: string;
  acpscenario: string; 
  acpmode: boolean;
  predictions: boolean;
}
interface polygonName {
  name: string;
  type: string;
  outdoor: string;
  profile: string;
}

const POLYGON_NAME: polygonName[] = [
  { name: 'Polygon_Mum_1', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_2', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1'  },
  { name: 'Polygon_Mum_3', type: 'CombineG' , outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_4', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_5', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' },
  { name: 'Polygon_Mum_6', type: 'CombineG', outdoor: 'Outdoor1', profile:'Profile1' }
];

const PATHS = [
  { nominalGeneration: "JCP/Modules/Planning-Deployment/Nominal-Validation" }
]

interface projectList {
  name: string;
  type: string;
  sapId: string;
  checked: Boolean;
  location: string;
  date: string;
  polydata: any;
}


const COMPLETED_LIST: projectList[] = [
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v10',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0012',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v11',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0013',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v12',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0014',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v18',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0102',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v15',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0120',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v18',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0912',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v20',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0782',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v26',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0502',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v27',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0022',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v28',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0092',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v29',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-0987',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
  {
    checked: false,
    name: 'Mumbai-Np-Cv-121020_v80',
    type: 'Validation',
    sapId: 'MU-MUMB-JC01-7654',
    location:'Jio Center',
    date: '20 th Nov 2020',
    polydata: {
      properties: {
        shape: "Rectangle",
        name: "Unnamed Layer",
        category: "default"
      },
      geometry: {
      "type": "Polygon",
      "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ]
      },
      id: "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
      }
  },
];

const EXISTING_4G_SITES: existing4GSites[] = [
  { name: 'Mumbai-Np-Cv-121020_v1' },
  { name: 'Mumbai-Np-Cv-121020_v2' },
  { name: 'Mumbai-Np-Cv-121020_v3' },
  { name: 'Mumbai-Np-Cv-121020_v4' },
  { name: 'Mumbai-Np-Cv-121020_v5' },
  { name: 'Mumbai-Np-Cv-121020_v6' },
  { name: 'Mumbai-Np-Cv-121020_v7' },
  { name: 'Mumbai-Np-Cv-121020_v8' }
];

@Component({
  selector: 'app-nominal-validation-create',
  templateUrl: './nominal-validation-create.component.html',
  styleUrls: ['./nominal-validation-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NominalValidationCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('nodeCounterStepper1') nodeCounterStepper1: MatStepper;
  public customControl;
  public customControl1;
  private mapFive;
  private mapSix;
  public contextMenuLib;
  public optionMap;
  public googleMutant;

  public projectDescriptionCtrl: FormControl = new FormControl();
  public selectJcCircleLevelFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();
  disabledChecked =  true;
  disableCheckedInfill = true;

  public zoneType: FormControl = new FormControl();
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
  paths: { nominalGeneration: string; }[];

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
  showSelected: Boolean = false;
  currentStep;
  designList = [{value:'300', value1: '500', value2: '800', value3: '1500'}];
  public typeGenerate: boolean = true;
  generateDisabled: boolean = true;

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

  selectExisting4GSites: FormGroup;
  selectPolygonName: FormGroup;

  selectBasicDetails: FormGroup;
  projectSelection: FormGroup;
  public polyRectangle;
  public circle;
  public poly;
  public polyline;
  public dataPolygon = [];
  disableBasicDetails=false;
  validateParam;
  selected;
  showOptionsWeightage = true;
  crowdSourceData = [
    {
      name: 'Netvelocity Data', checked: true
    },
    {
      name: 'LSR Data', checked: true
    },
    {
      name: 'Social Media', checked: true
    }
  ];

  networkData = [
    {
      name: 'Performance KPI', checked: true
    }
  ];

  clutterClass = [
    {
      name: 'Dense Urban', value:'10', checked: true
    },
    {
      name: 'Urban', value: '6', checked: true
    },
    {
      name: 'Sub Urban', value:'1', checked: true
    },
    {
      name: 'Rural', value: '1', checked: true
    }
  ]
  isEditable = true;
  enableSelectedSite = true;
  enableInterSite = true;
  itemsListPolySite = [
    {
      'checked': false,
      'name': 'Mumbai-Np-Cv-121020_v1',
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
      'name': 'Mumbai-Np-Cv-121020_v2',
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
      'name': 'Mumbai-Np-Cv-121020_v3',
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
      'name': 'Mumbai-Np-Cv-121020_v5',
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
      'name': 'Mumbai-Np-Cv-121020_v6',
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
      'name': 'Mumbai-Np-Cv-121020_v7',
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
  selectedDateTime = {
    startDate: moment().subtract(1, 'days'),
    endDate: moment().subtract(1, 'days'),
  }
  selectedDateTime1 = {
    startDate: moment().subtract(1, 'days'),
    endDate: moment().subtract(1, 'days'),
  }
  completeProjectList = COMPLETED_LIST;
  sourceACP : ACPList[] = [
    {"srno":"1", "acpscenario":"Optimization", "acpmode": true, "predictions":true},
    {"srno":"2", "acpscenario":"Site Selection", "acpmode":true, "predictions":true},
    {"srno":"3", "acpscenario":"Optimization + Site Selection", "acpmode": true, "predictions":false},
  ];

  existing4GSitesData = this.itemsListPolySite;
  existing4GSitesFilter: Observable<any[]>;
  existing4GSitesSearch = new FormControl();
  polygonNameFilter: Observable<any[]>;
  polygonNameData = POLYGON_NAME;
  dataSourceACP = new MatTableDataSource(this.sourceACP);
  displayedColumns: string[] = ['srno', 'acpscenario', 'acpmode', 'predictions'];
  mainLayerRef: {};

  constructor(
    private shapeService: ShapeService,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private dataShare: DataSharingService,
    private changeDetectorRef: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {
    this.validateParam = this.router.getCurrentNavigation().extras.state;
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
      }
    )
  }

  get filtersFormArray() {
    return (<FormArray>this.selectExisting4GSites.get('existing4GSitesArray'));
  }

  createFilterGroup() {
    return this.formBuilder.group({
      checked: new FormControl(false),
      name: new FormControl(''),
      date: new FormControl(''),
      polydata: {
        type: new FormControl(''),
        properties: {
          shape:new FormControl(''),
          radius: new FormControl(''),
          name:new FormControl(''),
          category: new FormControl('')
        },
        geometry: {
          type: new FormControl(''),
          coordinates: new FormControl('')
        },
        id: new FormControl('')
      }
    });
  }
  ngOnInit() {
    this.paths = PATHS;
    this.dataShare.projectObject.subscribe((data)=> {
      for (let d=0; d< data['length']; d++) {
        const formGroup = this.createFilterGroup();
        formGroup.patchValue(data[d]);
        this.filtersFormArray.push(formGroup);
      }
    })
    this.zoneType.setValue("West");
    this.selectedBoundaries = this.listBoundaries[0];
    this.selectJcCircleLevelFormControl = this.formBuilder.group({
    });

    this.selectExisting4GSites = this.formBuilder.group({
      existing4GSitesArray: this.formBuilder.array([])
    });
    
    this.existing4GSitesData.forEach(seedDatum => {
      const formGroup = this.createFilterGroup();
      formGroup.patchValue(seedDatum);
      this.filtersFormArray.push(formGroup);
    });
    
    this.existing4GSitesFilter = this.existing4GSitesSearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.existing4GSitesData.slice()))
    );

    this.selectPolygonName = this.formBuilder.group({
      polygonControl: new FormControl([])
    });
    this.changeDetectorRef.detectChanges();
    
    this.polygonNameFilter = this.existing4GSitesSearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.polygonNameData.slice()))
    );
    if (undefined != this.validateParam){
      this.disableBasicDetails = this.validateParam.validate;
      this.nodeCounterStepper1.selectedIndex = 1;
      this.isEditable = false;
    }

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

  ngAfterViewInit() {
    this.initMap();
    this.initMapSite();
  }

  
  polySelectedChangeSite(item) {
    console.log(item.polydata.geometry.coordinates[1]);
    console.log(item.checked)
    console.log(item, "item");
    this.dataPolygon.push(item);
   
    item.checked = !item.checked;

    if (item.checked == true) {
      if (item.polydata.properties.shape == 'Circle') {
        this.circle = L.circle([item.polydata.geometry.coordinates[1], item.polydata.geometry.coordinates[0]], item.polydata.properties.radius, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(this.mapFive);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapFive);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 })
        .addTo(this.mapFive)
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapFive);
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
    this.shapeService.mapServiceData = this.mapSix;
  }

  templateFilter(name: string) {
    return this.existing4GSitesData.filter(
      template => template.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  private initMap(): void {
    let _dialog = this.dialog;
    let _polygonList = this.dataPolygon
    this.mapFive = L.map('map5', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapFive);    

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.mapFive);


    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (map5) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
        container.innerHTML = ' <div class="tab-container-layersMap2"><div class="icon-count"><span style="font-size: 9px;font-weight: 500;" id="command"></span></div><div class="icon-styleMap2"><i class="ic ic-layers-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "38px 38px";
        container.style.width = '38px';
        container.style.height = '38px';

        container.onclick = function () {
          const dialogRef = _dialog.open(RedirectLayersPopupComponent, {
            width: "470px",
            panelClass: "material-dialog-container",
            data: { transferDataPoly: _polygonList,headerNominal:false, display:'nominal-validation-basic' }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
         }
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

    this.mapFive.addControl(new this.customControl());

    this.shapeService.mapServiceData = this.mapFive;
  }

  private initMapSite(): void {
    let _that = this;
    this.mapSix = L.map('map6', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.mapSix);    

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.mapSix);

    let _dialog = this.dialog;
    let _polygonList = this.dataPolygon;

    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (map6) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
        container.innerHTML = `
        <div class="tab-container-layersMap2">
          <div class="icon-count">
            <span style="font-size: 9px;font-weight: 500;" id="command"></span>
          </div>
          <div class="icon-styleMap2">
            <i class="ic ic-layers-01"></i>
          </div>
        </div>`;
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "38px 38px";
        container.style.width = '38px';
        container.style.height = '38px';

        container.onclick = function () {
          // _that.router.navigate(['/JCP/Layers']);
          // let componentFactory = _that.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
          // let viewContainerRef = _that.adHost.viewContainerRef;
          // viewContainerRef.clear();
          // let componentRef = viewContainerRef.createComponent(componentFactory);
        }
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

    this.mapSix.addControl(new this.customControl());

    this.shapeService.mapServiceData = this.mapSix;
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

  radioButtonChanged(item) {
    if (item) {
      this.showDiv = !this.showDiv;
    }
  }

  backPageRout() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  deleteProject(){
    let indexArray = [];
    this.filtersFormArray.controls.forEach((eachControl)=> {
      if (eachControl.value.checked == true){
        let index = this.filtersFormArray.controls.indexOf(eachControl);
        indexArray.push(index);
        if (eachControl.value.polydata.properties.shape == 'Rectangle') {
          this.polyRectangle.remove();
        } else if (eachControl.value.polydata.properties.shape == 'Polygon') {
          this.poly.remove();
        } else if (eachControl.value.polydata.properties.shape == 'Circle') {
          this.circle.remove();
        } else {
          this.polyline.remove();
        }
      }
    })
    let k = 0;
    for(let i =0; i<indexArray.length; i++) {      
      this.filtersFormArray.removeAt(indexArray[i]-k);
      k++;
    }
  }

  stepFunc() {
    this.showSelected = false;
    setTimeout(() => {
      this.nodeCounterStepper1.selectedIndex = 1;
      this.currentStep = 2;
    }, 500);

    setTimeout(() => {
      this.initMap();
    }, 500);

  }

  selectNodeStepper(event) {
    // this.initMapSite();
    if (event.selectedIndex == 3) {
      this.generateDisabled = false;
    } else {
      this.generateDisabled = true;
    }
  }

  polySelectedChange(item) {
    this.dataPolygon.push(item);
    item.checked = !item.checked;

    if (item.checked == true) {
      if (item.polydata.properties.shape == 'Circle') {
        this.circle = L.circle([item.polydata.geometry.coordinates[1], item.polydata.geometry.coordinates[0]], item.polydata.properties.radius, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(this.mapSix);
      } else if (item.polydata.properties.shape == 'Polygon') {
        this.poly = L.polygon([
          [19.060009, 72.876063],
          [19.013112, 72.907984],
          [19.065525, 72.916565],
          [19.060009, 72.876063]
        ]).addTo(this.mapSix);
      } else if (item.polydata.properties.shape == 'Rectangle') {
        this.polyRectangle = L.rectangle([
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]
        ], { color: "#ff7800", weight: 1 }).addTo(this.mapSix)
      } else {
        this.polyline = L.polyline([
          [19.045568, 72.894765],
          [19.046055, 72.898672],
          [19.045933, 72.901742]
        ]).addTo(this.mapSix);
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

    this.shapeService.mapServiceData = this.mapSix;
  }

  public render(val): void {
    this.mapFive.setView([19.0522, 72.9005], 13);
    this.typeGenerate = false;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(StatergeMapNominalComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);

  }

  getShapes(drawnItems) {
    let shapes = [];
    drawnItems.eachLayer(function (layer) {
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
    return shapes;
  };

  openDialogSuccessful(): void {
    const dialogRef = this.dialog.open(RedirectLayersPopupComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { transferDataPoly: this.dataPolygon,headerNominal:false, display:'nominal-validation' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  zoneChangeFunc(val) {
    this.mapFive.setView(val.value.latlong, 6);
    this.typeGenerate = false;
  }

  async additionalCandidateLayer() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalValidationAdditionallayerComponent } = await import('./../../../../modules/planning-deployment/nominal-validation/nominal-validation-additionallayer/nominal-validation-additionallayer.component');
    let nominalAdditional = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalValidationAdditionallayerComponent)
    );
    nominalAdditional.changeDetectorRef.detectChanges();
    this.dataShare.removeLayerFromNavigation('nominal-validation');
  }

  async displayValidationLayers() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalValidationLayerComponent } = await import('./../../../../modules/planning-deployment/nominal-validation/nominal-validation-layer/nominal-validation-layer.component');
    this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalValidationLayerComponent)
    );
  }

  allowRendering() {
    this.disabledChecked = !this.disabledChecked;
  }

  allowRenderinginfill() {
    this.disableCheckedInfill = !this.disableCheckedInfill;
  }

  
  polygonNamePopup(name){
    const dialogRef = this.dialog.open(PolygonPopupComponent, {
      width: '585px',
      height: '336px',
      data: {'title': name}
    });
  }

  addProjects() {
    const dialogRef = this.dialog.open(CompleteListPopupComponent, {
      width: '648.81px',
      height: '534.07px',
      panelClass: 'completed-project-list',
      data: {'title': 'Completed Project List', 'list':this.completeProjectList}
    });
  }

  showWeightageDiv() {
    this.showOptionsWeightage  = !this.showOptionsWeightage;
  }

  enableSelectedSiteCheck() {
    this.enableSelectedSite = !this.enableSelectedSite;
  }

  enableInterSiteCheck() {
    this.enableInterSite = !this.enableInterSite
  }

  async redirectToLandingPage() {
    this.router.navigate([this.paths[0].nominalGeneration]);
  }
}
