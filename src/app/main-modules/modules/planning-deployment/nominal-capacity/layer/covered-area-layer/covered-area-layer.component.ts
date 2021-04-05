import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-covered-area-layer',
  templateUrl: './covered-area-layer.component.html',
  styleUrls: ['./covered-area-layer.component.scss']
})
export class CoveredAreaLayerComponent implements AfterViewInit, OnDestroy {
  mainLayerRef: {};
  coveredAreaLayer: any;
  coveredAreaLayerContainer: any;
  map: any;
  coveredAreaLayerSubscription: Subscription;
  pixelRatio: any;
  canvasCore: any;
  coveredAreaData: any;
  lineColors: string;
  zoomLevel: any;
  scaleMatrix: number;
  coveredAreaContainer: createjs.Stage;
  boundariesContainer: createjs.Container;
  labelsContainer: createjs.Container;

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
  ) {
    this.coveredAreaLayerSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('CoveredAreaLayerComponent' == removeLayer) {
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
    this.coveredAreaLayer = new CustomLayer({
      container: document.createElement("canvas")
    });

    this.map.setView(new L.LatLng(19.9975, 73.7898), 10);
    let outerThis = this;
    this.coveredAreaLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getCoveredAreaData().subscribe((data) => {
        this.coveredAreaData = data;
        that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.routeFibreCoreLayerContainer, that._zoom, this.coveredAreaData, componentRef);
      });
    });

    this.coveredAreaLayer.addTo(this.map);
  }

  createLayer = function (container, zoomLevel, coveredAreaData, layerContainer) {
    this.lineColors = 'red';
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.coveredAreaContainer) {
      this.coveredAreaContainer.removeAllChildren();
      this.coveredAreaContainer.update();
    }
    this.coveredAreaContainer = new createjs.Stage(container);
    this.coveredAreaContainer.enableDOMEvents(true);
    this.coveredAreaContainer.enableMouseOver(50000);
    this.coveredAreaContainer.removeAllChildren();

    this.drawBoundaries(
      coveredAreaData
    );

    this.coveredAreaContainer.update();
  }

  getCoveredAreaData() {
    return this.http.get("assets/data/layers/boundaries/jiocenters.json");
  }

  drawBoundaries(boundariesData) {
    this.boundariesContainer = new createjs.Container();
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
    }
    this.coveredAreaContainer.addChild(this.boundariesContainer);
    this.coveredAreaContainer.update();
  }

  getPolyGraphics(color, stroke, data) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(2);
    g.beginStroke(stroke);
    g.drawPolygon(0, 0, data);
    return g;
  };

  resizeContainer() {
    this.canvasCore = this.coveredAreaLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.coveredAreaLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  removeLayer() {
    if (undefined != this.coveredAreaLayer) {
      this.map.removeLayer(this.coveredAreaLayer)
    }
  }

  ngOnDestroy() {
    if (this.coveredAreaLayerSubscription) {
      this.coveredAreaLayerSubscription.unsubscribe();
    }
  }
}
