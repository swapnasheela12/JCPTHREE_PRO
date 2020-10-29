import { Component, AfterViewInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { ShapeService } from '../../../../../layers-services/shape.service';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { ceil } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';
import { RouteTableViewComponent } from '../route-table-view/route-table-view.component';

@Component({
  selector: 'app-route-ready-fibre-core',
  templateUrl: './route-ready-fibre-core.component.html',
  styleUrls: ['./route-ready-fibre-core.component.scss']
})
export class RouteReadyFibreCoreComponent implements AfterViewInit, OnDestroy {
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

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private dialog: MatDialog
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) =>{
        if('RouteReadyFibreCoreComponent' == removeLayer) {
          this.removeLayer();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.pixelRatio = window.devicePixelRatio || 1;

    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    this.map.setView(new L.LatLng(26.6966, 77.8908), 10);

    // this.map.setView([26.6966, 77.8908]);
    // this.map.setZoom(8);
    let outerThis = this;
    
    this.routeFibreCoreLayer.on("layer-render", function () {
        let that = this;
        outerThis.getRouteData().subscribe((data)=>
        {
          this.routePlannedData = data;
          that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
          console.log(this.routePlannedData[0][3].centroidAvg)
          outerThis.createLayer(that.routeFibreCoreLayerContainer, that._zoom, this.routePlannedData);
        });
    });
   
    this.routeFibreCoreLayer.addTo(this.map);
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/Route/ready.json");
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

  createLayer(container, zoomLevel, routePlannedData) {
    this.lineColors = 'green';
    this.allLinePoints = [];
    // var bounds = this.map.getBounds();
    this.zoomLevel = zoomLevel;

    console.log(this.zoomLevel)
    this.scaleMatrix = (this.zoomLevel <= 7) ? 
      0.40 : (this.zoomLevel <= 10) ?
      0.50 : (this.zoomLevel <= 13) ?
      0.75 : (this.zoomLevel <= 15) ?
      0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.lineContainer) {
      this.lineContainer.removeAllChildren();
      this.stageRouteContainer.update();
    }
    console.log(routePlannedData[0][4].boundary[0][0])
      this.stageRouteContainer = new createjs.Stage(container);
      this.stageRouteContainer.enableDOMEvents(true);
      this.stageRouteContainer.enableMouseOver();
  
      this.lineContainer = new createjs.Container();
      // alert(routePlannedData.length)
      for (let j=0; j < routePlannedData.length; j++) {
        this.allLinePoints = [];
        for (let i=0; i < routePlannedData[j][4].boundary.length; i++) {
          // if (bounds.contains([this.routePlannedData[0].position[i].latitude, this.routePlannedData[0].position[i].longitude])) {
            this.positionLatLng = L.latLng({
              lat: routePlannedData[j][4].boundary[i][0],
              lng: routePlannedData[j][4].boundary[i][1]
            });
  
            this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
            this.linksCenterPoint = {
                x: this.linksDot.x * this.pixelRatio,
                y: this.linksDot.y * this.pixelRatio
            };
            this.allLinePoints.push(this.linksCenterPoint);
          // }
        }
        this.polyGraphic = this.drawPolyGraphics(
          this.lineColors,
          this.allLinePoints
        );
  
        this.lineShape = new createjs.Shape(
            this.polyGraphic
        );
        this.lineShape['cursor'] = 'pointer';
        this.lineShape['points'] = this.allLinePoints;
        this.lineShape['latLng'] = this.positionLatLng;
        this.lineContainer.addChild(this.lineShape);
      }
      let outerContainerThis = this;
      this.lineContainer.addEventListener('click', function(evt) {
        outerContainerThis.routeClicked();
      });
      this.lineContainer.alpha = 1;
      this.stageRouteContainer.addChild(this.lineContainer);
      this.stageRouteContainer.update();
  }

  drawPolyGraphics(stroke, allLinePoints) {
    this.lineStrokeWidth = this.scaleMatrix * 4;
    this.drawPolyGraphic = new createjs.Graphics();
    this.drawPolyGraphic.setStrokeStyle(this.lineStrokeWidth, 1, 1);
    this.drawPolyGraphic.beginStroke(stroke);
    for (let i=0; i < allLinePoints.length; i+=2) {
      this.drawPolyGraphic.curveTo(allLinePoints[i].x, allLinePoints[i].y, allLinePoints[i+1].x, allLinePoints[i+1].y);
    }
    this.drawPolyGraphic.endStroke();
    this.drawPolyGraphic.closePath();

    return this.drawPolyGraphic;
  }

  routeClicked() {
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
