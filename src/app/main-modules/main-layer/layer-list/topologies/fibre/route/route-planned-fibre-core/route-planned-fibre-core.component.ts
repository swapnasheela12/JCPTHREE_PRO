import {
  Component, AfterViewInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef,
  ViewChild, ElementRef, Renderer2
} from '@angular/core';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FibreTableViewPopupModel, RouteTableViewComponent } from '../route-table-view/route-table-view.component';
import * as _ from 'lodash';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { FivegSpiderViewComponent } from 'src/app/main-modules/main-layer/fiveg-spider-view/fiveg-spider-view.component';
import polylabel from 'polylabel';

@Component({
  selector: 'app-route-planned-fibre-core',
  templateUrl: './route-planned-fibre-core.component.html',
  styleUrls: ['./route-planned-fibre-core.component.scss']
})
export class RoutePlannedFibreCoreComponent implements AfterViewInit, OnDestroy {
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
  @ViewChild("tref", { read: ElementRef }) tref: ElementRef;
  ref: this;
  mainLayerRef: {};
  routePlannedLayerHeader = {
    "title": "Route Planned Fibre Core",
    "headerSapid": "Maharashtra-NP-CV-121020_v1"
  };
  routePlannedSpiderViewData = [
    {
      name: 'CSS',
      value: 5,
      color: '#F44336',
      font: 'Lato Bold',
      fontvalue: '\uf112',
      eventname: 'sites-tree-properties-nominals',
      sapid: 'I-MU-MUMB_ENB_I144'
    },
    {
      name: 'Core',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I124'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#E2C10D',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I144'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#3F51B4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I244'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#FF862C',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I044'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#C550F0',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I544'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#4CAF50',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I134'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#C550F0',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I164'
    },
    {
      name: 'Lorem',
      value: 5,
      color: '#C550F0',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I174'
    }
  ];
  a = this.routePlannedSpiderViewData;
  clonedArray: { name: string; value: number; color: string; font: string; fontvalue: string; eventname: string; sapid: string; }[];
  pixelValue: string;
  routeHover: any;
  boundariesContainer: createjs.Container;
  labelsContainer: createjs.Container;

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private dialog: MatDialog,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('RoutePlannedFibreCoreComponent' == removeLayer) {
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
    this.routeHover = this.getPopup();
    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    // this.map.setView(new L.LatLng( 15.60816, 73.75113), 10);

    // this.map.setView([26.6966, 77.8908]);
    this.map.setZoom(5);
    let outerThis = this;

    this.routeFibreCoreLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.routePlannedData = data;
        that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.routeFibreCoreLayerContainer, that._zoom, this.routePlannedData, componentRef);
      });
    });

    this.routeFibreCoreLayer.addTo(this.map);
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

  getPopup() {
    let popup = L.popup({
      className: 'leaflet-fibre-tooltip',
      minWidth: 120,
      offset: L.point(0, 0),
      closeButton: false
    });
    return popup;
  }

  getBoundariesData() {
    return this.http.get("assets/data/layers/boundaries/circles.json");
  }
  drawBoundaries(boundariesData) {
    // if (!this.boundariesContainer){

    // }
    this.boundariesContainer = new createjs.Container();
    this.labelsContainer = new createjs.Container();
    for (let i = 0; i < boundariesData.length; i++) {
      let d = boundariesData[i];
      let coordinates = d.coordinates;
      let coordinatesLength = coordinates.length;
      let polyPoints = [];
      for (let j = 0; j < coordinatesLength; j++) {
        let coord = coordinates[j];
        let dot = this.map.latLngToContainerPoint([coord[0], coord[1]]);
        let centerPoint = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        };
        polyPoints.push(centerPoint);
      }
      if (!polyPoints.length) continue;

      let polyGraphic = this.getPolyGraphics(createjs.Graphics.getRGB(248, 152, 29, 0.8), '#E35425', polyPoints);
      let polyShape = new createjs.Shape(polyGraphic);
      polyShape.name = d.CIRCLENAME;
      polyShape.cursor = 'pointer';
      polyShape['points'] = polyPoints;
      let shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 1, 2, 5);

      this.boundariesContainer.addChild(polyShape);
      let pointLabel = polylabel([coordinates], 0.1);
      if (pointLabel && pointLabel[0]) {
        let dot = this.map.latLngToContainerPoint([pointLabel[0], pointLabel[1]]);
        let labelPosition = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        };
        let textPixel = L.Browser.retina ? 30 : 15;
        let htmlEncode: any = Math.floor(Math.random() * (25000) + 5000);
        let label = new createjs.Text(htmlEncode, "bold " + textPixel + "px Roboto", "#000000");
        label.textAlign = 'center';
        label.textBaseline = 'middle';
        label.outline = 2;
        label.x = labelPosition.x;
        label.y = labelPosition.y;

        let outline: any = label.clone();
        outline.outline = false;
        outline.shadow = shadow;
        outline.color = '#FFFFFF';
        this.labelsContainer.addChild(label, outline);
      }
    }
    this.stageRouteContainer.addChild(this.boundariesContainer, this.labelsContainer);
    this.stageRouteContainer.update();
  }

  getPolyGraphics(color, stroke, data) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(2);
    g.beginStroke(stroke);
    g.beginFill(color);
    //drawPolygon is a custom function present as of now in create JS module itself
    g.drawPolygon(0, 0, data);
    return g;
  };
  createLayer = function (container, zoomLevel, routePlannedData, layerContainer) {
    // let nominalViewComponent = this.mainLayerRef.componentFactoryResolver.resolveComponentFactory(MapHeaderViewComponent);
    // this.mainLayerRef.componentRef = this.mainLayerRef.target.createComponent(nominalViewComponent);
    // this.mainLayerRef.componentRef.instance.headerData = this.routePlannedLayerHeader;

    this.lineColors = 'red';
    this.allLinePoints = [];
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.stageRouteContainer) {
      this.stageRouteContainer.removeAllChildren();
      this.stageRouteContainer.update();
    }
    this.stageRouteContainer = new createjs.Stage(container);
    this.stageRouteContainer.enableDOMEvents(true);
    this.stageRouteContainer.enableMouseOver(50000);
    this.stageRouteContainer.removeAllChildren();

    if (this.zoomLevel <= 6) {
      let url = 'assets/data/layers/boundaries/circles.json';
      this.getBoundariesData(url).subscribe((data) => {
        this.boundariesData = data;
        this.drawBoundaries(
          this.boundariesData,
          this.routePlannedData
        );
      });
      // this.boundaryContainer = new createjs.Container();
      // for (let i = 0; i < routePlannedData.length; i++) {
      //   this.centerBoundaryLatLng = L.latLng({
      //     lat: routePlannedData[i][3].centroidAvg[0],
      //     lng: routePlannedData[i][3].centroidAvg[1]
      //   });
      //   this.centerBoundaryDot = this.map.latLngToContainerPoint(this.centerBoundaryLatLng);
      //   this.centerCenterPoint = {
      //     x: this.centerBoundaryDot.x,
      //     y: this.centerBoundaryDot.y
      //   };
      //   this.drawRouteCount(routePlannedData[i][0].measured_length, this.centerCenterPoint, this.boundaryContainer);
      //   this.stageRouteContainer.addChild(this.boundaryContainer);
      // }
    } else {
      this.colocatedContainer = new createjs.Container();
      this.lineContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
          this.allPoints["'" + routePlannedData[j][1].rj_r4g_state_name + "'"] = [];
          for (let n in routePlannedData[j][4].boundary[i]) {
            this.allLinePoints = [];
            for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
              this.positionLatLng = L.latLng({
                lat: routePlannedData[j][4].boundary[i][n][k][0],
                lng: routePlannedData[j][4].boundary[i][n][k][1]
              });

              this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
              this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
              };
              this.allLinePoints.push(this.linksCenterPoint);
              this.allPoints["'" + routePlannedData[j][1].rj_r4g_state_name + "'"].push([
                routePlannedData[j][4].boundary[i][n][k][0],
                routePlannedData[j][4].boundary[i][n][k][1]
              ]);
            }
            this.polyGraphic = this.drawPolyGraphics(
              this.lineColors,
              this.allLinePoints
            );

            this.lineShape = new createjs.Shape(
              this.polyGraphic
            );
            this.lineShape.cursor = 'pointer';
            this.lineShape['points'] = this.allLinePoints;
            this.lineShape['latLng'] = this.positionLatLng;
            this.lineContainer.addChild(this.lineShape);
          }
        }
        let eachStatePoints = this.allPoints["'" + routePlannedData[j][1].rj_r4g_state_name + "'"];
        var count = {};
        var greaterThanOne = {};

        eachStatePoints.forEach(function (i) {
          count[i] = (count[i] || 0) + 1;
          if (count[i] > 1) {
            greaterThanOne[i] = count[i];
          }
        });
      }
      let outerContainerThis = this;
      this.lineContainer.addEventListener('click', function (evt) {
        outerContainerThis.routeClicked(outerContainerThis.mainLayerRef);
      });
      let entries: any = Object.entries(greaterThanOne);

      for (let g = 0; g < entries.length; g++) {
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
        this.lineContainer.alpha = 1;
        let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1' }];
        let outerthis = this;
        this.lineContainer.on('mouseover', function (event) {
          let target = event['target'];
          let dot = L.point((event['rawX'] / outerthis.pixelRatio), (event['rawY'] / outerthis.pixelRatio));
          target.latlng = outerthis.map.containerPointToLatLng(dot);
          let template = '';
          template +=
            '<div class="layout-row popup-layout-padding">' +
            '<span class="prefix">Measured Length:</span>' +
            '<span class="value">' + '2000km' + '</span></div>';
          template +=
            '<div class="layout-row popup-layout-padding">' +
            '<span class="prefix">Start:</span>' +
            '<span class="value">' + 'Mumbai' + '</span>' +
            '</div>';
          template +=
            '<div class="layout-row popup-layout-padding">' +
            '<span class="prefix">End:</span>' +
            '<span class="value">' + 'Surat' + '</span>' +
            '</div>';
          template +=
            '<div class="layout-row popup-layout-padding">' +
            '<span class="prefix">Type:</span>' +
            '<span class="value">' + 'Core' + '</span>' +
            '</div>';
          outerthis.routeHover.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
        });
        this.drawCountCircle(
          entries[g][1],
          this.lineContainer,
          this.colocatedContainer,
          this.colocatedLinksCenterPoint,
          outerContainerThis.mainLayerRef,
          this.positionCololatedLatLng,
          colocatedData
        );
        this.stageRouteContainer.addChild(this.lineContainer, this.colocatedContainer);
      }
    }
    this.stageRouteContainer.update();
  }

  drawPolyGraphics(stroke, allLinePoints) {
    this.lineStrokeWidth = this.scaleMatrix * 4;
    this.drawPolyGraphic = new createjs.Graphics();
    this.drawPolyGraphic.setStrokeStyle(this.lineStrokeWidth, 1, 1);
    this.drawPolyGraphic.beginStroke(stroke);
    for (let i = 0; i < allLinePoints.length; i += 2) {
      this.drawPolyGraphic.curveTo(allLinePoints[i].x, allLinePoints[i].y, allLinePoints[i + 1].x, allLinePoints[i + 1].y);
    }
    this.drawPolyGraphic.endStroke();
    this.drawPolyGraphic.closePath();

    return this.drawPolyGraphic;
  }

  drawCountCircle(
    count,
    junctionContainer,
    colocatedContainer,
    linksCenterPoint,
    mainLayerReference,
    positionCololatedLatLng,
    colocatedData,
    colocatedSpiderArray
  ) {
    this.circleGraphic = this.drawCircleGraphics('red', 15);
    this.circleCountShape = new createjs.Shape(this.circleGraphic);

    this.textContainer = new createjs.Container();
    this.textContainer.x = linksCenterPoint.x;
    this.textContainer.y = linksCenterPoint.y;
    this.textContainer.latLng = new L.LatLng(junctionContainer.children[0].latLng.lat, junctionContainer.children[0].latLng.lng);

    this.labelCount = new createjs.Text(count, "bold 12px RobotoDraft", "#000000");
    this.labelCount.textAlign = 'center';
    this.labelCount.textBaseLine = 'middle';
    let outerContainerThis = this;

    this.textContainer.addEventListener('click', function (evt) {
      outerContainerThis.clonedArray = [...outerContainerThis.routePlannedSpiderViewData];
      outerContainerThis.clonedArray.splice(count, (outerContainerThis.clonedArray.length - count));
      outerContainerThis.map.setView(positionCololatedLatLng);
      outerContainerThis.colocatedLineClicked(evt, mainLayerReference, colocatedData, outerContainerThis.clonedArray);
    });
    this.textContainer.addChild(this.circleCountShape, this.labelCount)
    colocatedContainer.addChild(this.textContainer);
    this.stageRouteContainer.update();
  }

  drawCircleGraphics(color, matrix) {
    this.drawCircleGraphic = new createjs.Graphics();
    this.drawCircleGraphic.setStrokeStyle(1);
    this.drawCircleGraphic.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.5));
    this.drawCircleGraphic.beginFill(color);
    this.drawCircleGraphic.drawCircle(0, 0, matrix);

    return this.drawCircleGraphic;
  }

  drawRouteCount(fibreLength, lengthLatLng, container) {
    let m = L.Browser.retina ? 2 : 1;
    this.textContainerBoundary = new createjs.Container();
    this.textContainerBoundary.x = lengthLatLng.x * m;
    this.textContainerBoundary.y = lengthLatLng.y * m;
    this.pixelValue = L.Browser.retina ? "bold 30px RobotoDraft" : "bold 15px RobotoDraft"
    this.labelCountBoundary = new createjs.Text(fibreLength, this.pixelValue, "#000000");
    this.labelCountBoundary.textAlign = 'center';
    this.textContainerBoundary.addChild(this.labelCountBoundary);
    container.addChild(this.textContainerBoundary);
  }
  routeClicked(mainl) {
    const componName = "Route";
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

  colocatedLineClicked(event, mainLayerReference, colocatedData, colocatedSpiderArray) {
    let nominalViewComponent = mainLayerReference.componentFactoryResolver.resolveComponentFactory(FivegSpiderViewComponent);
    mainLayerReference.componentRef = mainLayerReference.target.createComponent(nominalViewComponent);
    mainLayerReference.componentRef.instance.data = colocatedSpiderArray;
    mainLayerReference.componentRef.instance.colocatedCircleData = colocatedData;
    mainLayerReference.componentRef.instance.mainRef = this;
  }

  removeLayer() {
    if (undefined != this.routeFibreCoreLayer) {
      this.map.removeLayer(this.routeFibreCoreLayer)
    }
  }

  openSpiderPopups(d, ref) {
    const componName = "Route";
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

  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }
}
