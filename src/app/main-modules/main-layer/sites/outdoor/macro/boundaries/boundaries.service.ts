import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as createjs from 'createjs-module';
import polylabel from 'polylabel';

interface DataObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class BoundariesService {
  public customLayerLibrary: DataObject;
  public map: DataObject;
  public siteData = null;
  public fanDataError: DataObject;
  public container: DataObject;
  public stage: DataObject;
  public _points: DataObject;
  public pixelRatio: number = window.devicePixelRatio || 1;
  public zoomLevel: number;
  public componentRef: DataObject;
  public canvasLayerObj: DataObject;
  public textRatio: number;
  public countMin: number;
  public countMax: number;

  constructor() { }

  makeSiteJsonCall(url) {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        res(this.responseText)
      };
      xhr.onerror = rej;
      xhr.open('GET', url);
      xhr.send();
    })
  }

  addLayerToMap(map) {
    this.map = map;
    this.customLayerLibrary = leaflayer();
    const componentRef = this.componentRef = this;

    let canvasLayer = this.customLayerLibrary.customLayer({
      container: document.createElement("canvas")
    });

    canvasLayer.on("layer-render", function () {
      let customLayerThis = this;
      componentRef.setJSONDataCall(customLayerThis);
    });
    setTimeout(() => {
      this.canvasLayerObj = canvasLayer;
    }, 1000);


    canvasLayer.addTo(this.map);
  }

  generateCanvasTagConfig(customeLayerThisRef) {
    let canvas = customeLayerThisRef.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = customeLayerThisRef._bounds.getSize();//resize
    canvas.width = m * size.x;
    canvas.height = m * size.y;
    canvas.style.width = size.x + "px";
    canvas.style.height = size.y + "px";
    return canvas;
  }

  setJSONDataCall(customLayerThis) {
    this.zoomLevel = customLayerThis._zoom;
    let sitesView = (this.zoomLevel > 13);
    let url;
    if (!sitesView) {
      let boundariesFile = '';
      switch (true) {
        case (this.zoomLevel < 4):
          this.textRatio = 0;
          this.countMin = 5000;
          this.countMax = 30000;
          boundariesFile = 'circles';
          break;

        case (this.zoomLevel < 8):
          this.textRatio = 13;
          this.countMin = 5000;
          this.countMax = 30000;
          boundariesFile = 'circles';
          break;
        case (this.zoomLevel < 10):
          this.textRatio = 13;
          this.countMin = 5000;
          this.countMax = 30000;
          boundariesFile = 'jiostates';
          break;
        case (this.zoomLevel < 11):
          this.textRatio = 11;
          this.countMin = 500;
          this.countMax = 5000;
          boundariesFile = 'cities';
          break;
        case (this.zoomLevel <= 12):
          this.textRatio = 9;
          this.countMin = 10;
          this.countMax = 100;
          boundariesFile = 'jiocenters';
          break;
        default:
          this.textRatio = 9;
          this.countMin = 5;
          this.countMax = 20;
        //boundariesFile = 'clusters';
      }
      if (boundariesFile.length > 0) {
        url = 'assets/data/layers/boundaries/' + boundariesFile + '.json';
        this.siteData = null;
        let returnResponse = this.makeSiteJsonCall(url);
        returnResponse.then((response) => {
          let dataResponse: any = response;
          this.siteData = null;
          this.siteData = JSON.parse(dataResponse);
          this.boundariesDrawing(customLayerThis, this.siteData)
        })
          .catch((error) => {
            console.error(error.message);
          });
      }
    }
  }

  boundariesDrawing(customeLayerThisRef, siteData) {
    let canvasElement = this.generateCanvasTagConfig(customeLayerThisRef);
    //STAGE
    this.container = new createjs.Container();
    //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
    this.stage = new createjs.Stage(canvasElement);

    this.stage.enableDOMEvents(true);
    this.stage.enableMouseOver(50);

    this._points = siteData;
    let data = this._points;
    let length = this._points.length;

    let textRatio = this.textRatio ? this.textRatio : (this.zoomLevel * 3);
    textRatio = textRatio * this.pixelRatio;

    let minimum = this.countMin ? this.countMin : 5000;
    let maximum = this.countMax ? this.countMax : 30000;

    this.container.removeAllChildren();

    let shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 1, 2, 5);

    let boundariesContainer = new createjs.Container();
    let labelsContainer = new createjs.Container();

    for (let i = 0; i < length; i++) {
      let d = data[i];
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

      boundariesContainer.addChild(polyShape);
      let pointLabel = polylabel([coordinates], 0.1);
      if (pointLabel && pointLabel[0]) {
        let dot = this.map.latLngToContainerPoint([pointLabel[0], pointLabel[1]]);
        let labelPosition = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        };
        //let htmlEncode = _.unescape(polyShape.name).replace(/&#x28;/g, '(').replace(/&#x29;/g, ')');
        let htmlEncode: any = Math.floor(Math.random() * (maximum - minimum) + minimum);
        let label = new createjs.Text(htmlEncode, + textRatio + "px Arial", "#fff");
        label.textAlign = 'center';
        label.textBaseline = 'middle';
        label.outline = 1;
        label.x = labelPosition.x;
        label.y = labelPosition.y;

        let outline = label.clone();
        outline.shadow = shadow;
        outline.color = '#FFFFFF';
        labelsContainer.addChild(label, outline);
        labelsContainer.addChild(label);
      }
    }
    this.container.addChild(boundariesContainer, labelsContainer);
    this.container.alpha = 1;
    this.stage.addChild(this.container);
    this.stage.update();
  }

  getPolyGraphics(color, stroke, data) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(2);
    g.beginStroke(stroke);
    g.beginFill(color);
    //drawPolygon is a custom function present as of now in create JS module itself
    //g.drawPolygon(0, 0, data);
    return g;
  };

  removeLayerFromMap() {
    this.canvasLayerObj.remove();
  }

}