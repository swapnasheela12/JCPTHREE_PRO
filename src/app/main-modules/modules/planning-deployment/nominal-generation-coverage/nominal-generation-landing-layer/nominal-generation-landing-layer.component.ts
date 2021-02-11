import { Component, OnInit, OnDestroy, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CustomLayer } from 'leaflet-customlayer';
import * as L from 'leaflet';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { MapHeaderViewComponent } from '../map-header-view/map-header-view.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-nominal-generation-landing-layer',
  templateUrl: './nominal-generation-landing-layer.component.html',
  styleUrls: ['./nominal-generation-landing-layer.component.scss']
})
export class NominalGenerationLandingLayerComponent implements OnInit, OnDestroy, AfterViewInit {
  routeFibreCoreLayer: any;
  routeFibreCoreLayerContainer: any;
  map: any;
  canvasCore: any;
  ctxCore: any;
  canvasLayer: HTMLElement;
  stageRouteContainer: createjs.Stage;
  routePlannedData: Object;
  routeReadyFibreCoreSubscription: Subscription;
  fibreData: void;
  positionLatLng: any;
  pixelRatio: any;
  linksDot: any;
  linksCenterPoint: { x: number; y: number; };
  scaleMatrix: number;
  zoomLevel: any;
  lineShape: any;
  lineShapeArray: [];
  lineStrokeWidth: any;
  graphicsStroke: any;
  strokeWidthCommand: any;
  strokeColorCommand: void;
  lineColors: string;
  allLinePoints: any = [];
  polyGraphic: createjs.Graphics;
  drawPolyGraphic: createjs.Graphics;
  lineContainer: createjs.Container;
  drawCircleGraphic: any;
  circleGraphic: any;
  circleCountShape: any;
  textContainer: any;
  circleCountClone: any;
  labelCount: any;
  textContainerBoundary: createjs.Container;
  centerBoundaryLatLng: L.LatLng;
  centerBoundaryDot: any;
  centerCenterPoint: { x: any; y: any; };
  labelCountBoundary: createjs.Text;
  positionCololatedLatLng: L.LatLng;
  colocatedLinkDot: any;
  colocatedLinksCenterPoint: { x: number; y: number; };
  colocatedContainer: createjs.Container;
  boundaryContainer: createjs.Container;
  allPoints = [];
  ref: this;
  mainLayerRef: {};
  routePlannedLayerHeader = {
    "title": "Back To Nominal Generation",
    "headerSapid": "Maharashtra-NP-CV-121020_v1"
  };
  clonedArray: { name: string; value: number; color: string; font: string; fontvalue: string; eventname: string; sapid: string; }[];
  pixelValue: string;
  routeHover: any;
  boundariesContainer: createjs.Container;
  labelsContainer: createjs.Container;
  
  nominalArray = [];
  nominalGeneartionArray: any = [];
  showHeader:any;
  // mainLayerRef: any;
  // routePlannedLayerHeader = {
  //   "title": "Route Planned Fibre Core",
  //   "headerSapid": "Maharashtra-NP-CV-121020_v1"
  // };
  constructor(
    private dataShare: DataSharingService,
    private http: HttpClient,
    private shapeService: ShapeService,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
    this.router.navigate(['/JCP/Layers']);
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
      }
    );
   
   
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/Route/planned.json");
  }

  resizeContainer() {
    this.canvasCore = this.routeFibreCoreLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.routeFibreCoreLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer) {
    // let nominalViewComponent = this.mainLayerRef.componentFactoryResolver.resolveComponentFactory(MapHeaderViewComponent);
    // this.mainLayerRef.componentRef = this.mainLayerRef.target.createComponent(nominalViewComponent);
    // this.mainLayerRef.componentRef.instance.headerData = this.routePlannedLayerHeader;
    // this.mainLayerRef.componentRef.instance.showHeader = 'show';
  }
  ngAfterViewInit(){
    
    this.pixelRatio = window.devicePixelRatio || 1;
    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    // this.map.setView(new L.LatLng( 15.60816, 73.75113), 10);

    // this.map.setView([26.6966, 77.8908]);
    this.map.setZoom(5);
    let outerThis = this;

    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    this.routeFibreCoreLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.routePlannedData = data;
        that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.routeFibreCoreLayerContainer, that._zoom, this.routePlannedData, componentRef);
      });
    //   let nominalViewComponent = this.mainLayerRef.componentFactoryResolver.resolveComponentFactory(MapHeaderViewComponent);
    // this.mainLayerRef.componentRef = this.mainLayerRef.target.createComponent(nominalViewComponent);
    // this.mainLayerRef.componentRef.instance.headerData = this.routePlannedLayerHeader;
    });

    this.routeFibreCoreLayer.addTo(this.map);
    $('#Layers').parent()[0].click();
    this.http.get("assets/data/layers/nominal-generation/nominal-generation.json")
    .subscribe(data => {
      for (let i=0; i<data['length']; i++) {
        this.nominalArray.push(
          {
            name: data[i].sapId,
            eventName: 'nominal-generation',
            show:true,
            link: 'nominal-generation',
            children: []
          }
        )
      }
      const MY_PROJECTS_ARRAY = [
        {
          name: "Nominal Generation",
          eventName: 'nominal-generation',
          show:true,
          link: 'nominal-generation',
          children: this.nominalArray
        }
      ]
      this.nominalGeneartionArray = [{
        name: "My Projects",
        eventName: 'my-projects',
        show:true,
        link: 'my-projects',
        children: MY_PROJECTS_ARRAY
      }]
      this.dataShare.addExtraLayerDynamic(this.nominalGeneartionArray);
    });

    
    this.dataShare.layerNameFunc([{name: 'Back To Nominal Geneartion', source: 'display'}]);
  }

  ngOnDestroy(){
    // alert("hello")
  }
}
