import { ShapeService } from './../../../layers-services/shape.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import * as _ from 'underscore';
import * as createjs from 'createjs-module';
import * as preloadjs from 'preload-js';

interface DataObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SmallCellPlanned4gService {

  public ref;
  public map;
  public lib;
  public theMarker;
  public sitesValArr;
  public arrayOfSites: any = [];
  public siteData;
  public container;
  public _simplePopup;
  public _points;
  public pixelRatio: number = window.devicePixelRatio || 1;
  public hightlightCell: string;
  public selectionContainer: DataObject;
  public addtionalsector;
  public scaleMatrix;
  public stage;
  public _bounds;
  public zoomLevel;
  public _assetQueue = null;
  public _colors = ['#757584', '#92D050', '#8C6900', '#006838', '#00506A', '#00ADEE', '#5900B2', '#0D47A1'];
  public _siteImagePath = 'assets/images/Layers/planned-small-cell/';
  public _plannedSiteImageManifest = [{
    id: 'smallcellpetal',
    src: this._siteImagePath + 'plannedwhite.svg',
    type: createjs.LoadQueue.IMAGE
  }]

  constructor(private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    this.lib = leaflayer();
    this.redrawLayer();

    this.getJSON().subscribe(data => {
      this.sitesValArr = data;
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/data/layers/plannedSmallCell/sites-smallCellPlanned.json");
  }

  redrawLayer() {
    setTimeout(() => {
      this.draw();
    }, 1000);
  }

  public draw = function () {
    const componentRef = this.componentRef = this;
    this.map = this.shapeService.mapServiceData;
    this.siteData = this.sitesValArr;

    let canvasLayer = this.lib.customLayer({
      container: document.createElement("canvas"),
      padding: 0.1,
      zooms: [0, 18],
      opacity: 1,
      visible: true,
      zIndex: 120,
      alwaysRender: true
    });

    canvasLayer.on("layer-beforemount", function () { });

    canvasLayer.on("layer-mounted", function () { });

    canvasLayer.on("layer-render", function () {

      let customLayerThis: any = this;
      componentRef.sitesSmallCell4GLayerMap(customLayerThis);

    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      canvasLayer.remove(this.map);
      
      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Planned/smallCell/smallCell4g") {
          return canvasLayer.addTo(this.map);
        }
      }
    });
  }

  sitesSmallCell4GLayerMap(itemSitesMap) {
    let canvasElement = this.resizeContainer(itemSitesMap);
    this.siteData = this.sitesValArr;

    let _pixelRatio: number = window.devicePixelRatio || 1;

    if (typeof (this.siteData) === 'object' && this.siteData !== undefined) {
      //STAGE
      this.container = new createjs.Container();
      //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
      this.stage = new createjs.Stage(canvasElement);

      createjs.Ticker.addEventListener("tick", this.stage);

      this.stage.enableDOMEvents(true);
      this.stage.enableMouseOver(50);

      //POPUP
      this._simplePopup = this.getPopup();

      // CREATED ARRAYS BASED ON SITE NUMBER (BANDS) E.G. SITE850 ETC.

      let site2300 = this.siteData.site

      //COMBINING THE ARRAY
      let flatten = _.flatten([site2300], true);

      //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
      let data = this.siteData.sites;
      // this._points = this.siteData.site;
      this.zoomLevel = itemSitesMap._zoom;

      let scaleMatrix = (this.zoomLevel <= 7) ? 0.03 : (this.zoomLevel <= 10) ? 0.08 : (this.zoomLevel <= 13) ? 0.15 : (this.zoomLevel <= 15) ? 0.25 : (this.zoomLevel <= 16) ? 0.35 : 0.40;
      this.scaleMatrix = scaleMatrix * this.pixelRatio;
      this.scaleMatrix = scaleMatrix;
      let pointOffset = L.point(0, -(scaleMatrix * 60) / this.pixelRatio);

      //POP CONFIG
      this._simplePopup.options.offset = pointOffset;
      //EMPTY THE CANVAS
      this.container.removeAllChildren();

      //CENTER DOT OF THE SHAPE

      let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);
      let bounds = this.map.getBounds();

      let preload = new preloadjs.LoadQueue(true);
      preload.loadManifest(this._plannedSiteImageManifest, true);
      
      for (const site in data) {
        let siteInner = data[site];
        let latlng = L.latLng(siteInner.latitude, siteInner.longitude);

        // PLACING THE COORDINATES
        if (!(bounds.contains(latlng))) continue;
        let dot = this.map.latLngToContainerPoint(latlng);
        let centerPoint = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        }

        let siteContainer = new createjs.Container();
        siteContainer.cursor = 'pointer';
        siteContainer.shadow = shadow;
        siteContainer.x = centerPoint.x;;
        siteContainer.y = centerPoint.y;;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner.sapid;

        var color = this._colors[0];
        if (siteInner.currentStage) {
          switch (siteInner.currentStage) {
            case 'INSTALLATION':
              color = this._colors[1];
              break;
            case 'ATP11_A':
              color = this._colors[2];
              break;
            case 'INTEGRATION':
              color = this._colors[3];
              break;
            case 'ATP11_B':
              color = this._colors[4];
              break;
            case 'SCFT':
              color = this._colors[5];
              break;
            case 'EMF':
              color = this._colors[6];
              break;
            case 'HOTO':
              color = this._colors[7];
              break;
            default:
              color = this._colors[0];
          }
        }

        this._assetQueue = new createjs.LoadQueue(false, null, true);
        this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
        if (this.zoomLevel >= 12) {
          var percent = 0;
          let petalLength = siteInner.siteArray.length;

          let stageCircleGraphic = this.getCircleGraphics(color, 110);
          let stageCircleShape = new createjs.Shape(stageCircleGraphic);
          siteContainer.addChild(stageCircleShape);

          let circleGraphic = this.getCircleGraphics('#FFFFFF', 15);
          let circleCountShape = new createjs.Shape(circleGraphic);


          for (let j = 0, jCount = petalLength; j < jCount; j++) {
            let cell = siteInner.siteArray[j];
            let id = "smallcellpetal";
            let angle = cell.azimuth - (20 / 2);
            let siteImage = new createjs.Bitmap('assets/images/Layers/planned-small-cell/plannedwhite.svg');
            siteImage.regX = 10;
            siteImage.regY = 20;
            siteImage.scaleX = 5.0;
            siteImage.scaleY = 5.0;
            siteImage.rotation = angle;
            siteImage['latlng'] = latlng;
            siteImage['data'] = siteInner;
            siteImage['data'].color = color;
            siteImage['current'] = cell;
            siteContainer.addChild(siteImage);

          }

          let _command: any = stageCircleGraphic.command;
          let _commandCircle: any = circleGraphic.command;
          if (siteInner.siteArray && siteInner.siteArray.length > 1) {

            let textContainer = new createjs.Container();

            textContainer.x = _command.radius;
            textContainer.y = -(_command.radius - _commandCircle.radius);
           
            let circleCountClone = circleCountShape.clone();
            textContainer.addChild(circleCountClone);

            let label = new createjs.Text(siteInner.siteArray.length, "bold 12px RobotoDraft", "#000000");
            label.textAlign = 'center';
            label.textBaseline = 'middle';
            textContainer.addChild(label);

            siteContainer.addChild(textContainer);
          }

          let label = new createjs.Text(siteInner.sapid, "bold 60px Lato-Medium", "#FFFFFF");
          label.textAlign = 'center';
          label.outline = 3;
          label.y = _command.radius + 2;
          let outline = label.clone();
          outline.shadow = shadow;
          outline.color = '#000000';
          siteContainer.addChild(label, outline);

        }

        bounds.extend(latlng);
        this.container.addChild(siteContainer);
      }

      //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
      this.stage.addChild(this.container);
      this._bounds = bounds;
      this.container.alpha = 1;
      this.stage.update();
      
    }

  }

  loadSVGiconsOverCanvas(payLoad) {
    let siteImage = new createjs.Bitmap(payLoad.preload.getResult(payLoad.id));
    siteImage.scaleX = 5.0;
    siteImage.scaleY = 5.0;
    siteImage.regX = 14.5;
    siteImage.regY = 27;
    // siteImage.rotation = angle;
    siteImage['latlng'] = payLoad.latlng;
    siteImage['data'] = payLoad.band;
    siteImage['current'] = payLoad.cell;
    payLoad.siteContainer.addChild(siteImage);
  }

  getPopup() {
    let popup = L.popup({
      className: 'leaflet-simple-popup',
      minWidth: 120,
      offset: L.point(0, -40),
      closeButton: false
    });
    return popup;
  }

  resizeContainer = function (customeLayerThisRef) {
    let canvas = customeLayerThisRef.getContainer();
    let m = L.Browser.retina ? 2 : 1;

    let size = customeLayerThisRef._bounds.getSize();//resize

    let padding = customeLayerThisRef._padding;
    canvas.width = m * size.x;
    canvas.height = m * size.y;
    canvas.style.width = size.x + "px";
    canvas.style.height = size.y + "px";
    return canvas;
  };

  getCircleGraphics(color, matrix) {
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.5));
    g.beginFill(color);
    g.drawCircle(0, 0, matrix);
    return g;
  };

  removeLayer() {
    var stage = this.stage;
    stage.removeChild(this.container);
    // stage.removeEventListener('canvasLayerChanged', this.reloadLayer);
    stage.update();
  };

}
