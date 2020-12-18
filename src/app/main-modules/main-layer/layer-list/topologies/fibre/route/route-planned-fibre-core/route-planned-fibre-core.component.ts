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
import { RouteTableViewComponent } from '../route-table-view/route-table-view.component';
import { FivegSpiderViewComponent } from 'src/app/main-modules/main-layer/fiveg-spider-view/fiveg-spider-view.component';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';

@Component({
  selector: 'app-route-planned-fibre-core',
  templateUrl: './route-planned-fibre-core.component.html',
  styleUrls: ['./route-planned-fibre-core.component.scss'],
  // providers: [MainLayerComponent]
})
export class RoutePlannedFibreCoreComponent implements AfterViewInit, OnDestroy {
  // @ViewChild(MainLayerComponent, {static: false}) mainLayerComp: MainLayerComponent;
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
  @ViewChild("tref", { read: ElementRef }) tref: ElementRef;
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

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private dialog: MatDialog,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    // private mainLayer: MainLayerComponent
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

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer) {
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

    if (this.zoomLevel <= 6) {
      this.boundaryContainer = new createjs.Container();
      for (let i = 0; i < routePlannedData.length; i++) {
        this.centerBoundaryLatLng = L.latLng({
          lat: routePlannedData[i][3].centroidAvg[0],
          lng: routePlannedData[i][3].centroidAvg[1]
        });
        this.centerBoundaryDot = this.map.latLngToContainerPoint(this.centerBoundaryLatLng);
        this.centerCenterPoint = {
          x: this.centerBoundaryDot.x,
          y: this.centerBoundaryDot.y
        };
        this.drawRouteCount(routePlannedData[i][0].measured_length, this.centerCenterPoint, this.boundaryContainer);
        this.stageRouteContainer.addChild(this.boundaryContainer);
      }
    } else {
      this.colocatedContainer = new createjs.Container();
      this.lineContainer = new createjs.Container();
      for (let j = 0; j < routePlannedData.length; j++) {
        for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
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
              console.log("this.allLinePoints", this.allLinePoints)
              console.log("this.this.linksCenterPoint", this.linksCenterPoint)
              this.allLinePoints.push(this.linksCenterPoint);
            }
            this.polyGraphic = this.drawPolyGraphics(
              this.lineColors,
              this.allLinePoints
            );

            this.lineShape = new createjs.Shape(
              this.polyGraphic
            );
            //   console.log("connectTheDots", connectTheDots())

            //   function connectTheDots(data){
            //     var c = [];
            //     for(var i in data._layers) {
            //         var x = data._layers[i]._latlng.lat;
            //         var y = data._layers[i]._latlng.lng;
            //         c.push([x, y]);
            //     }
            //     return c;
            // }
            console.log("this.lineShape", this.lineShape);
            // this.lineShape.setStrokeDash([2, 2]);
            this.lineShape.cursor = 'pointer';
            this.lineShape['points'] = this.allLinePoints;
            this.lineShape['latLng'] = this.positionLatLng;
            this.lineContainer.addChild(this.lineShape);
          }
        }
      }
      let outerContainerThis = this;
      this.lineContainer.addEventListener('click', function (evt) {
        outerContainerThis.routeClicked(outerContainerThis.mainLayerRef);
      });
      this.positionCololatedLatLng = L.latLng({
        lat: 16.008437,
        lng: 73.49981
      });
      this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
      this.colocatedLinksCenterPoint = {
        x: this.colocatedLinkDot.x * this.pixelRatio,
        y: this.colocatedLinkDot.y * this.pixelRatio
      };

      this.lineContainer.alpha = 1;
      this.drawCountCircle('78', this.lineContainer, this.colocatedContainer, this.colocatedLinksCenterPoint, outerContainerThis.mainLayerRef);
      this.stageRouteContainer.addChild(this.lineContainer, this.colocatedContainer);
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

  drawCountCircle(count, junctionContainer, colocatedContainer, linksCenterPoint, mainLayerReference) {
    this.circleGraphic = this.drawCircleGraphics('red', 15);
    this.circleCountShape = new createjs.Shape(this.circleGraphic);

    this.textContainer = new createjs.Container();
    this.textContainer.x = linksCenterPoint.x;
    this.textContainer.y = linksCenterPoint.y;
    this.textContainer.latLng = new L.LatLng(junctionContainer.children[0].latLng.lat, junctionContainer.children[0].latLng.lng);
    // this.circleCountClone = this.circleCountShape.clone();
    // this.textContainer.addChild(this.circleCountClone);

    this.labelCount = new createjs.Text(count, "bold 12px RobotoDraft", "#000000");
    this.labelCount.textAlign = 'center';
    this.labelCount.textBaseLine = 'middle';
    // this.textContainer.addChild(this.labelCount);
    let outerContainerThis = this;
    this.textContainer.addEventListener('click', function (evt) {
      console.log('route clicked');
      outerContainerThis.colocatedLineClicked(evt, mainLayerReference);
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
    this.textContainerBoundary = new createjs.Container();
    this.textContainerBoundary.x = lengthLatLng.x;
    this.textContainerBoundary.y = lengthLatLng.y
    this.labelCountBoundary = new createjs.Text(fibreLength, "bold 15px RobotoDraft", "#000000");
    this.labelCountBoundary.textAlign = 'center';
    this.textContainerBoundary.addChild(this.labelCountBoundary);
    container.addChild(this.textContainerBoundary);
  }

  routeClicked(mainl) {
    const dialogRef = this.dialog.open(RouteTableViewComponent, {
      width: "1200px",
      height: "500px",
      position: {
        left: "18.5rem",
        top: "4rem"
      },
      hasBackdrop: false,
      disableClose: false,
      panelClass: "material-dialog-container",
    });
  }

  colocatedLineClicked(event, mainLayerReference) {
    let nominalViewComponent = mainLayerReference.componentFactoryResolver.resolveComponentFactory(FivegSpiderViewComponent);
    mainLayerReference.componentRef = mainLayerReference.target.createComponent(nominalViewComponent);
    mainLayerReference.componentRef.instance.data = this.routePlannedSpiderViewData;
  }

  removeLayer() {
    if (undefined != this.routeFibreCoreLayer) {
      this.map.removeLayer(this.routeFibreCoreLayer)
    }
  }

  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }
}
