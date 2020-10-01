import { Observable } from 'rxjs';
import { DataSharingService } from './../../../../_services/data-sharing.service';
import { ShapeService } from './../../layers-services/shape.service';
import { MatDialog } from '@angular/material/dialog';
// import { SpiderViewComponent } from './../../main-modules/main-layer/spider-view/spider-view.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import * as _ from 'underscore';
import * as createjs from 'createjs-module';

interface DataObject {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class MacroNominalService {

  ref;
  map;
  lib;
  theMarker;
  sitesValArr;
  arrayOfSites: any = [];
  siteData;
  container;
  _simplePopup;
  _points;
  public pixelRatio: number = window.devicePixelRatio || 1;
  public hightlightCell: string;
  public selectionContainer: DataObject;
  addtionalsector;
  scaleMatrix;
  _container;

  stage;
  _bounds;
  zoomLevel;
  _assetQueue = null;
  _colors = ['#757584', '#92D050', '#8C6900', '#006838', '#00506A', '#00ADEE', '#5900B2', '#0D47A1'];
  _siteImagePath = 'assets/images/Layers/';
  _plannedSiteImageManifest = [{
    id: 'smallcellpetal',
    src: this._siteImagePath + '3-1.svg',
    type: createjs.LoadQueue.IMAGE
  }, {
    id: 'smallcellpetalyellow',
    src: this._siteImagePath + '3.svg',
    type: createjs.LoadQueue.IMAGE
  }]


  constructor(private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    // this._map = this.shapeService.mapServiceData;
    this.lib = leaflayer();
    this.redrawLayer();

    this.getJSON().subscribe(data => {
      console.log(data, "data");
      this.sitesValArr = data;
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/data/layers/nominalssites/nominals.json");
  }

  redrawLayer() {
    console.log(this.shapeService, "this.shapeService");
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
      componentRef.sitesNominalLayerMap(customLayerThis);
    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      canvasLayer.remove(this._map);
      this.removeAllMarkers();

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.eventName == "sites-nominal-macro-macro4G") {
          this.boundariesData();
          return canvasLayer.addTo(this.map);
        }
      }
    });
  }

  public states;
  public stateLayer: any;
  boundariesData() {
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      // this.initStatesLayer();
    });

    // setTimeout(() => {
    //   this.shapeService.getNominalMacroData().subscribe(sitesVal => {
    //     console.log(sitesVal, "sitesVal");

    //     // this.sitesValArr = sitesVal.features;
    //     this.sitesValArr = sitesVal;
    //     console.log(this.sitesValArr, "this.sitesValArr");
    //     // this.sitesNominalLayerMap(this.sitesValArr);
    //     // this.sitesDraw();
    //   });
    // }, 500);

  }

  sitesNominalLayer;
  sitesNominalLayerMap(itemSitesMap) {
    console.log(itemSitesMap, "itemSitesMap");
    let canvasElement = this.resizeContainer(itemSitesMap);
    console.log(canvasElement, "canvasElement");

    this.siteData = this.sitesValArr;
    let _pixelRatio: number = window.devicePixelRatio || 1;

    if (typeof (this.siteData) === 'object' && this.siteData !== undefined) {
      //STAGE
      this.container = new createjs.Container();
      //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
      this.stage = new createjs.Stage(canvasElement);

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
        siteContainer.x = centerPoint.x;;
        siteContainer.y = centerPoint.y;;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner[0].sapid;

        this._assetQueue = new createjs.LoadQueue(false, null, true);
        this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
        if (this.zoomLevel >= 12) {

          for (let band in siteInner) {
            let bandInner = siteInner[band];

            let petalLength = bandInner.siteArray.length;
            for (let j = 0, jCount = petalLength; j < jCount; j++) {
              let cell = bandInner.siteArray[j];
              let id = cell.cellStatus == "Landmark Coverage" ? "smallcellpetalyellow" : "smallcellpetal";

              let siteImage;
              if (cell.cellStatus == "Landmark Coverage") {
                siteImage = new createjs.Bitmap("assets/images/Layers/3.svg");
              } else {
                siteImage = new createjs.Bitmap("assets/images/Layers/3-1.svg");
              }

              siteImage.scaleX = 5.0;
              siteImage.scaleY = 5.0;
              siteImage.regX = 13.5;
              siteImage.regY = 27;
              siteImage['latlng'] = latlng;
              siteImage['data'] = band;
              siteImage['current'] = cell;



              siteImage.addEventListener('click', function (evt) {
                console.log(evt, "evt");

                let target = evt;
                // this.spiderViewFeature(evt); 
              });
              siteImage.addEventListener('click', function (evt) {
                console.log(evt, "evt");

                let target = evt;
                // this.spiderViewFeature(evt); 
              });

              siteContainer.addChild(siteImage);

            }

          }

          let label = new createjs.Text(siteInner[0].sapid, "bold 60px Lato-Medium", "#FFFFFF");
          label.textAlign = 'center';
          //label.outline = 3;
          label.y = (scaleMatrix * 200) / this.pixelRatio;

          let outline = label.clone();
          outline.shadow = shadow;
          outline.color = '#000000';
          siteContainer.addChild(label, outline);

        }

        bounds.extend(latlng);
        this.container.addChild(siteContainer);

      }

      // this.container.alpha = 1;

      //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
      this.stage.addChild(this.container);
      // this.stage.update();

      this._bounds = bounds;
      this.container.alpha = 1;
      this.stage.update();
      // console.timeEnd(this.container.name);

    }

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


  // private initStatesLayer() {
  //   let geojsonMarkerOptions = {
  //     radius: 8,
  //     fillColor: "#ff7800",
  //     color: "#000",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.8
  //   };
  //   this.stateLayer = L.geoJSON(this.states, {

  //     style: (feature) => ({
  //       weight: 2,
  //       opacity: 0.5,
  //       color: '#008f68',
  //       fillOpacity: 0.4,
  //       fillColor: '#6DB65B'
  //     }),

  //     onEachFeature: (feature, layer) => {
  //       layer.on({
  //         // mouseover: (e) => (this.highlightFeature(e)),
  //         mouseout: (e) => (this.resetFeature(e)),
  //         click: (e) => (this.zoomToFeature(e)),
  //       });
  //       layer.bindTooltip(feature.properties.NAME_1,
  //         {
  //           permanent: true,
  //           direction: 'center',
  //           className: 'countryLabel'
  //         });
  //     }
  //   });

  //   this._map.addLayer(this.stateLayer);
  // }

  // private highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //     weight: 2,
  //     opacity: 0.8,
  //     color: '#DFA612',
  //     fillOpacity: 1.0,
  //     fillColor: '#FAE042',
  //   });

  // }

  // private resetFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //     weight: 2,
  //     opacity: 0.5,
  //     color: '#008f68',
  //     fillOpacity: 0.4,
  //     fillColor: '#6DB65B'
  //   });

  // }

  // private zoomToFeature(e) {
  //   const layer = e.target;
  //   layer.fitBounds(e.target.getBounds());
  // }


  removeAllMarkers() {
    // if (this.map.hasLayer(this.stateLayer)) {
    //   this.map.removeLayer(this.stateLayer);
    // }

    // if (this.map.hasLayer(this.sitesNominalLayer)) {
    //   this.sitesNominalLayer.clearLayers();
    // }
  }

}
