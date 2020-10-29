import { NominalViewComponent } from './nominal-view/nominal-view.component';
import { Observable } from 'rxjs';
import { DataSharingService } from '../../../../../_services/data-sharing.service';
import { ShapeService } from '../../../layers-services/shape.service';
import { MatDialog } from '@angular/material/dialog';
// import { SpiderViewComponent } from './../../main-modules/main-layer/spider-view/spider-view.component';
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
export class MacroNominalService {

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
  public _container;
  public stage;
  public _bounds;
  public zoomLevel;
  public mainlayerRef;
  public _assetQueue;
  public _colors = ['#757584', '#92D050', '#8C6900', '#006838', '#00506A', '#00ADEE', '#5900B2', '#0D47A1'];
  public _siteImagePath = 'assets/images/Layers/macro-nominal/';
  public _plannedSiteImageManifest = [{
    id: 'smallcellpetal',
    src: this._siteImagePath + '0.svg',
    type: createjs.LoadQueue.IMAGE
  }]


  constructor(private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    // this._map = this.shapeService.mapServiceData;
    this.lib = leaflayer();
    this.redrawLayer();

    this.getJSON().subscribe(data => {
      this.sitesValArr = data;
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/data/layers/nominalssites/nominals.json");
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
      componentRef.sitesNominalLayerMap(customLayerThis);

      this._assetQueue = new createjs.LoadQueue(true, null, true);
      this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      
      canvasLayer.remove(this._map);
      this.removeAllMarkers();

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Nominal/Macro/Macro4G" && ele.selected == true) {
          // this.boundariesData();
          return canvasLayer.addTo(this.map);
        }
      }
    });
  }

  sitesNominalLayer;
  sitesNominalLayerMap(itemSitesMap) {
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

      let site2300 = _.map(this.siteData.site2300, function (item) {
        item.sitebandtype = 'site2300';
        return item;
      });

      //COMBINING THE ARRAY
      let flatten = _.flatten([site2300], true);

      //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
      let data = _.groupBy(flatten, 'sapid');
      this._points = data;
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

      // let siteCenterDot = this.getPointGraphics(siteCenterDotColor);
      let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);
      let bounds = this.map.getBounds();

      let preload = new preloadjs.LoadQueue(true);
      preload.loadManifest(this._plannedSiteImageManifest, true);

      for (const site in data) {
        let siteInner = data[site];
        let latlng = L.latLng(siteInner[0].latitude, siteInner[0].longitude);

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
        siteContainer.x = centerPoint.x;
        siteContainer.y = centerPoint.y;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner[0].sapid;



        for (let band in siteInner) {
          let bandInner = siteInner[band];
          let petalLength = bandInner.siteArray.length;

          for (let j = 0, jCount = petalLength; j < jCount; j++) {
            let cell = bandInner.siteArray[j];
            let id = cell.cellStatus == "Landmark Coverage" ? "smallcellpetalyellow" : "smallcellpetal";
            let siteImage = new createjs.Bitmap('assets/images/Layers/macro-nominal/0.svg');
            siteImage.regX = 10;
            siteImage.regY = 30;
            siteImage.scaleX = 5.0;
            siteImage.scaleY = 5.0;
            siteImage['latlng'] = latlng;
            siteImage['data'] = cell;
            siteImage['band'] = band;
            siteContainer.addChild(siteImage);
            // preload.on('complete', (event) => {
            //   let payLoad = {
            //     preload:preload,
            //     latlng:latlng,
            //     band:band,
            //     cell:cell,
            //     siteContainer:siteContainer,
            //     id:id
            //   };
            //   this.loadSVGiconsOverCanvas(payLoad) 
            // });

          }
          if (this.zoomLevel >= 12) {
            let label = new createjs.Text(siteInner[0].sapid, "bold 40px Lato-Medium", "#FFFFFF");
            label.textAlign = 'center';
            label.y = (scaleMatrix * 300) / this.pixelRatio;
            let outline = label.clone();
            outline.shadow = shadow;
            outline.color = '#000000';

            siteContainer.on("click", (event) => {
              console.log(event,"event");
              
              this.spiderViewFeature(event, this.ref, this.mainlayerRef)
            });
            
            siteContainer.addChild(label, outline);

          }

        }

        bounds.extend(latlng);
        this.container.addChild(siteContainer);

      }

      //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
      this.stage.addChild(this.container);
      this._bounds = bounds;
      this.container.alpha = 1;
      this.stage.update();
      // console.timeEnd(this.container.name);

    }

  }

  loadSVGiconsOverCanvas(payLoad) {
    let siteImage = new createjs.Bitmap(payLoad.preload.getResult(payLoad.id));
    siteImage.scaleX = 5.0;
    siteImage.scaleY = 5.0;
    siteImage.regX = 14.5;
    siteImage.regY = 27;
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

  removeAllMarkers() {

  }

  getReference(ref) {
    this.mainlayerRef = ref;
  }

  private spiderViewFeature(e, ref, mainlayer) {
    const layer = e.target;
    console.log(layer, "layer");

    mainlayer.map.setView(layer.latlng);
    let data = {
      ref: mainlayer
    }
    console.log("sideNavService", mainlayer.sideNavService);
    mainlayer.datashare.sendDataToSpider(data);
    let nominalViewComponent = mainlayer.componentFactoryResolver.resolveComponentFactory(NominalViewComponent);
    mainlayer.componentRef = mainlayer.target.createComponent(nominalViewComponent);
  }

}
