import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FibreTableViewPopupModel, RouteTableViewComponent } from '../../fibre/route/route-table-view/route-table-view.component';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
// import { FivegSpiderViewComponent } from '../../../fiveg-spider-view/fiveg-spider-view.component';

@Component({
  selector: 'app-structure-planned-fibre-core',
  templateUrl: './structure-planned-fibre-core.component.html',
  styleUrls: ['./structure-planned-fibre-core.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StructurePlannedFibreCoreComponent implements AfterViewInit, OnDestroy {

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
  innercircleGraphic: any;
  circleCountShape: any;
  innercircleShape: any;
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
  allPoints = [];

  ref: this;
  mainLayerRef: {};
  routePlannedSpiderViewData = {
    "name": "Route",
    "value": 5,
    "color": '#003A74',
    "description": "Lorem Ipsum Lorem Lorem",
    "font": 'Material-Design-Iconic-Font',
    "fontvalue": '\uf323',
    "children": [
      {
        name: 'CSS',
        value: 5,
        color: '#F44336',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        eventname: 'sites-tree-properties-nominals'
      },
      {
        name: 'Core',
        value: 5,
        color: '#03A9F4',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#E2C10D',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#3F51B4',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#FF862C',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#C550F0',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#4CAF50',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#C550F0',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      {
        name: 'Lorem',
        value: 5,
        color: '#C550F0',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf207',
        eventname: 'sites-tree-candidates-nominals'
      },
      // {
      //   name: 'Lorem',
      //   value: 5,
      //   color: '#C550F0',
      //   font: 'Material-Design-Iconic-Font',
      //   fontvalue: '\uf207',
      //   eventname: 'sites-tree-candidates-nominals'
      // },
      // {
      //   name: 'Lorem',
      //   value: 5,
      //   color: '#C550F0',
      //   font: 'Material-Design-Iconic-Font',
      //   fontvalue: '\uf207',
      //   eventname: 'sites-tree-candidates-nominals'
      // },
      // {
      //   name: 'Lorem',
      //   value: 5,
      //   color: '#C550F0',
      //   font: 'Material-Design-Iconic-Font',
      //   fontvalue: '\uf207',
      //   eventname: 'sites-tree-candidates-nominals'
      // },
      // {
      //   name: 'Lorem',
      //   value: 5,
      //   color: '#C550F0',
      //   font: 'Material-Design-Iconic-Font',
      //   fontvalue: '\uf207',
      //   eventname: 'sites-tree-candidates-nominals'
      // }
    ]
    //   }
    // ]

  };
  siteImagePetal: createjs.Bitmap;
  structureContainerEach: createjs.Container;
  structureImage: createjs.Bitmap;
  structurePopup: any;
  structureImageText: any;

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('StructurePlannedFibreCoreComponent' == removeLayer) {
          this.removeLayer();
        }
      }
    );
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
        console.log(this.mainLayerRef)
      }
    )
  }

  ngAfterViewInit() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.structurePopup = this.getPopup();

    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    // this.map.setView(new L.LatLng(15.620236, 73.729269), 9);

    // this.map.setView([26.6966, 77.8908]);
    this.map.setZoom(4);
    let outerThis = this;

    this.routeFibreCoreLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.routePlannedData = data;
        that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(
          that.routeFibreCoreLayerContainer,
          that._zoom,
          this.routePlannedData,
          componentRef,
          that._assetQueue
        );
      });
    });

    this.routeFibreCoreLayer.addTo(this.map);
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/structure/structure.json");
  }

  getPopup() {
    let popup = L.popup({
      className: 'leaflet-fibre-tooltip',
      minWidth: 120,
      offset: L.point(0, 0),
      closeButton: false
    });
    return popup;
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

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer, routeQueue) {
    console.log(zoomLevel);
    this.lineColors = 'red';
    this.allLinePoints = [];
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.lineContainer) {
      this.stageRouteContainer.removeAllChildren();
      this.stageRouteContainer.update();
    }
    this.stageRouteContainer = new createjs.Stage(container);
    this.stageRouteContainer.enableDOMEvents(true);
    this.stageRouteContainer.enableMouseOver(50000);
    this.stageRouteContainer.removeAllChildren();
    this._assetQueue = new createjs.LoadQueue(false, null, true);
    this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
    if (this.zoomLevel <= 4) {
      this.structureContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng(
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              );

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              this.imagePath = 'assets/images/Layers/topologies/structure/AG3.svg';
              this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              ]);
              this.drawStructureImage(
                this.positionLatLng,
                this.linksCenterPoint,
                this.structureContainer,
                routePlannedData[j][4].boundary[i][n][k],
                this.imagePath
              );
            }
          }
        }
        let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
          var count = {};
          var greaterThanOne = {};

          eachStatePoints.forEach(function(i) {
            count[i] = (count[i]||0) + 1;
            if (count[i] > 1) {
              greaterThanOne[i] = count[i];
            }
          });
      }
      let outerContainerThis = this;
      let entries:any = Object.entries(greaterThanOne);
      for (let g=0; g < entries.length; g++) {
          console.log(entries[g][0].split(','));
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
      }
    } else if (this.zoomLevel > 4 && this.zoomLevel <= 6) {
      this.structureContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng(
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              );

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              if (routePlannedData[j][4].boundary[i][n][k].type == 'AG2'){
                this.imagePath = 'assets/images/Layers/topologies/structure/AG2.svg';
              } else {
                this.imagePath = 'assets/images/Layers/topologies/structure/AG2+OTN.svg';
              }
              this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              ]);
              this.drawStructureImage(
                this.positionLatLng,
                this.linksCenterPoint,
                this.structureContainer,
                routePlannedData[j][4].boundary[i][n][k],
                this.imagePath
              );
            }
          }
        }
        let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
          var count = {};
          var greaterThanOne = {};

          eachStatePoints.forEach(function(i) {
            count[i] = (count[i]||0) + 1;
            if (count[i] > 1) {
              greaterThanOne[i] = count[i];
            }
          });
      }
      let outerContainerThis = this;
      let entries:any = Object.entries(greaterThanOne);
      for (let g=0; g < entries.length; g++) {
          console.log(entries[g][0].split(','));
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
      }
    } else if (this.zoomLevel > 6 && this.zoomLevel <= 7) {
      this.structureContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng(
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              );

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              this.imagePath = 'assets/images/Layers/topologies/structure/AG1.svg';
              this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
               routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              ]);
              this.drawStructureImage(
                this.positionLatLng,
                this.linksCenterPoint,
                this.structureContainer,
                routePlannedData[j][4].boundary[i][n][k],
                this.imagePath
              );
            }
          }
        }
        let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
          var count = {};
          var greaterThanOne = {};

          eachStatePoints.forEach(function(i) {
            count[i] = (count[i]||0) + 1;
            if (count[i] > 1) {
              greaterThanOne[i] = count[i];
            }
          });
      }
      let outerContainerThis = this;
      let entries:any = Object.entries(greaterThanOne);
      for (let g=0; g < entries.length; g++) {
          console.log(entries[g][0].split(','));
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
      }
    } else if (this.zoomLevel > 7 && this.zoomLevel <= 11) {
      this.structureContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng(
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              );

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              if (routePlannedData[j][4].boundary[i][n][k].type == 'SAG2'){
                this.imagePath = 'assets/images/Layers/topologies/structure/SAG2.svg';
              } else if (routePlannedData[j][4].boundary[i][n][k].type == 'ILA') {
                this.imagePath = 'assets/images/Layers/topologies/structure/ILA.svg';
              } else if (routePlannedData[j][4].boundary[i][n][k].type == 'Pole') {
                this.imagePath = 'assets/images/Layers/topologies/structure/Pole.svg';
              } else if (routePlannedData[j][4].boundary[i][n][k].type == 'ILA') {
                this.imagePath = 'assets/images/Layers/topologies/structure/ManHole.svg';
              } else if (routePlannedData[j][4].boundary[i][n][k].type == 'ILA') {
                this.imagePath = 'assets/images/Layers/topologies/structure/FiberPop.svg';
              }
              this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              ]);
              this.drawStructureImage(
                this.positionLatLng,
                this.linksCenterPoint,
                this.structureContainer,
                routePlannedData[j][4].boundary[i][n][k],
                this.imagePath
              );
            }
          }
        }
        let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
          var count = {};
          var greaterThanOne = {};

          eachStatePoints.forEach(function(i) {
            count[i] = (count[i]||0) + 1;
            if (count[i] > 1) {
              greaterThanOne[i] = count[i];
            }
          });
      }
      let outerContainerThis = this;
      let entries:any = Object.entries(greaterThanOne);
      for (let g=0; g < entries.length; g++) {
          console.log(entries[g][0].split(','));
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
      }
    } else if (this.zoomLevel > 11 && this.zoomLevel <= 12) {
      this.structureContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng(
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              );

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              if (routePlannedData[j][4].boundary[i][n][k].type == 'OSC'){
                this.imagePath = 'assets/images/Layers/topologies/structure/OSC.svg';
              } else if (routePlannedData[j][4].boundary[i][n][k].type == 'eNodeB') {
                this.imagePath = 'assets/images/Layers/topologies/structure/eNodeB.svg';
              } else {
                this.imagePath = 'assets/images/Layers/topologies/structure/Others.svg';
              }
              this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
                routePlannedData[j][4].boundary[i][n][k].latlng[0],
                routePlannedData[j][4].boundary[i][n][k].latlng[1]
              ]);
              this.drawStructureImage(
                this.positionLatLng,
                this.linksCenterPoint,
                this.structureContainer,
                routePlannedData[j][4].boundary[i][n][k],
                this.imagePath
              );
            }
          }
        }
        let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
          var count = {};
          var greaterThanOne = {};

          eachStatePoints.forEach(function(i) {
            count[i] = (count[i]||0) + 1;
            if (count[i] > 1) {
              greaterThanOne[i] = count[i];
            }
          });
      }
      let outerContainerThis = this;
      let entries:any = Object.entries(greaterThanOne);
      for (let g=0; g < entries.length; g++) {
          console.log(entries[g][0].split(','));
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
      }
    }
    this.stageRouteContainer.addChild(this.structureContainer);
    this.stageRouteContainer.update();
  }

  drawStructureImage(latlng, centerpoint, structureContainer, structureData, imagePath) {
    this.structureContainerEach = new createjs.Container();
    this.structureContainerEach.cursor = 'pointer';
    this.structureContainerEach.x = centerpoint.x;
    this.structureContainerEach.y = centerpoint.y;
    this.structureContainerEach.scaleX = this.scaleMatrix;
    this.structureContainerEach.scaleY = this.scaleMatrix;

    this.structureImage = new createjs.Bitmap(imagePath);
    this.structureImage.regX = 10;
    this.structureImage.regY = 30;
    this.structureImage.scaleX = 1.0;
    this.structureImage.scaleY = 1.0;
    this.structureImage['latlng'] = latlng;
    this.structureImage['data'] = structureData;
    this.structureImage.image.onload = function () {
      outerthis.stageRouteContainer.update();
    }

    this.structureImageText = new createjs.Text(structureData.sapid, "15px Lato Bold", "#000000");
    this.structureImageText.textAlign = 'center';
    this.structureImageText.textBaseLine = 'middle';
    this.structureImageText.y = 50;

    let outerthis = this;
    this.structureImage.on('mouseover', function (event) {
      console.log(event);
      let target = event['target'];
      let dot = L.point((event['rawX'] / outerthis.pixelRatio), (event['rawY'] / outerthis.pixelRatio));
      target.latlng = outerthis.map.containerPointToLatLng(dot);
      let template = '';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Sector:</span>' +
        '<span class="value">' + target.data.sector + '</span></div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Band:</span>' +
        '<span class="value">' + target.data.band + '</span>' +
        '</div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">cNum:</span>' +
        '<span class="value">' + target.data.cnum + '</span>' +
        '</div>';
      outerthis.structurePopup.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.structureImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });

    this.structureImage.on('click', function (event) {
      outerthis.routeClicked();
    });

    this.structureContainerEach.addChild(this.structureImage, this.structureImageText);
    structureContainer.addChild(this.structureContainerEach);
  }

  routeClicked() {
    const componName = "Structure";
    const dialogData = new FibreTableViewPopupModel(componName);
    const dialogRef = this.dialog.open(RouteTableViewComponent, {
      width: "1200px",
      height: "500px",
      position: {
        left: "18.5rem",
        top: "4rem"
      },
      data: dialogData,
      hasBackdrop: false,
      disableClose: false,
      panelClass: "material-dialog-container",
    });
  }

  async colocatedLineClicked(event, mainLayerReference) {
    // let nominalViewComponent = mainLayerReference.componentFactoryResolver.resolveComponentFactory(FivegSpiderViewComponent);
    // mainLayerReference.componentRef = mainLayerReference.target.createComponent(nominalViewComponent);
    // mainLayerReference.componentRef.instance.data = this.routePlannedSpiderViewData;
  }

  removeLayer() {
    if (undefined != this.routeFibreCoreLayer) {
      this.map.removeLayer(this.routeFibreCoreLayer)
    }
  }

  drawCircularCircle(
    count,
    structureContainer,
    linksCenterPoint,
    mainLayerReference,
    positionCololatedLatLng,
    colocatedData,
    lat,
    lng
  ) {
    this.stageRouteContainer.removeAllChildren();
    this.stageRouteContainer.update();
    // console.log(structureContainer)
    this.circleGraphic = this.drawCircleGraphics('#003B7440', 65);
    this.circleCountShape = new createjs.Shape(this.circleGraphic);
    this.circleCountShape.alpha = 0.4;

    this.innercircleGraphic = this.drawCircleGraphics('#003A74', 21);
    this.innercircleShape = new createjs.Shape(this.innercircleGraphic);

    this.textContainer = new createjs.Container();
    this.textContainer.x = linksCenterPoint.x;
    this.textContainer.y = linksCenterPoint.y;
    this.textContainer.latLng = new L.LatLng(
      lat,
      lng
    );

    // Code For colocated Number Display
    // this.labelCount = new createjs.Text(count, "bold 15px RobotoDraft", "#ffffff");
    // this.labelCount.textAlign = 'center';
    // this.labelCount.textBaseLine = 'middle';

    this.labelCount = new createjs.Bitmap('assets/images/Layers/topologies/structure/All.svg');
    this.labelCount.regX = 35;
    this.labelCount.regY = 30;
    this.labelCount.scaleX = 0.4;
    this.labelCount.scaleY = 0.4;
    this.labelCount['latlng'] =  this.textContainer.latLng;

    this.textContainer.addEventListener('click', function(evt) {
      console.log('COlocated Clicked');
    });
    this.textContainer.addChild(this.circleCountShape, this.innercircleShape, this.labelCount);
    structureContainer.addChild(this.textContainer);
    this.stageRouteContainer.update();
  }

  drawCircleGraphics(color, matrix) {
    this.drawCircleGraphic = new createjs.Graphics();
    this.drawCircleGraphic.beginFill(color);
    this.drawCircleGraphic.drawCircle(0, 0, matrix);

    return this.drawCircleGraphic;
  }



  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }

}
