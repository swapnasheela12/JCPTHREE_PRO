import { DataSharingService } from './../../../../_services/data-sharing.service';
import { ShapeService } from './../../layers-services/shape.service';
import { MatDialog } from '@angular/material/dialog';
// import { SpiderViewComponent } from './../../main-modules/main-layer/spider-view/spider-view.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MacroNominalService {

  ref;
  _map;
  lib;
  theMarker;
  sitesValArr;
  arrayOfSites: any = [];
  constructor(private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    // this._map = this.shapeService.mapServiceData;
    this.lib = leaflayer();
    this.redrawLayer();

  }

  redrawLayer() {
    console.log(this.shapeService, "this.shapeService");
    setTimeout(() => {
      this.draw();
    }, 1000);
  }

  public draw = function () {

    this._map = this.shapeService.mapServiceData;

    var points = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        console.log(feature,"feature");
        console.log(latlng,"latlng");
        
        var marker = L.marker(latlng, { icon: null });
        return marker;
      }

    });



    var resizeContainer = function () {
      var canvas = this.getContainer();
      var m = L.Browser.retina ? 2 : 1;
      var size = this._bounds.getSize();//resize
      var padding = this._padding;
      canvas.width = m * size.x;
      canvas.height = m * size.y;
      canvas.style.width = size.x + "px";
      canvas.style.height = size.y + "px";
      var ctx = canvas.getContext("2d");
      if (L.Browser.retina) {
        ctx.scale(m, m);
      }
      ctx.translate(padding.x, padding.y);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return ctx;
    };

    var canvasLayer = this.lib.customLayer({
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

      var ctx = resizeContainer.bind(this)();
      // ctx.fillStyle = "rgba(255,116,0, 0.5)";
      var bounds = this._map.getBounds();
      // for (var i = 0; i < data.length; i++) {
      //   var d = data[i].latlng;
      //   if (bounds.contains([d[0], d[1]])) {
      //     let dot = this._map.latLngToContainerPoint([d[0], d[1]]);
      //     ctx.beginPath();
      //     ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
      //     ctx.fill();
      //     ctx.closePath();
      //   }
      // }

      var zoomlevel = this._map.getZoom();
      if (zoomlevel < 10) {
        if (this._map.hasLayer(this.stateLayer)) {
          console.log("333333333");
          this._map.removeLayer(this.stateLayer);
        } else {
          console.log("no point layer active");
        }
      }
      if (zoomlevel >= 10) {
        if (this._map.hasLayer(this.sitesNominalLayer)) {
          console.log("layer already added");
        } else {
          this._map.addLayer(this.sitesNominalLayer);
        }
      }
      console.log("Current Zoom Level =" + zoomlevel)
    
    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      canvasLayer.remove(this._map);
      this.removeAllMarkers();

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Nominal/Macro") {
          console.log("got it all amll ESC");
          // this.boundariesData();
          // this.makeCapitalMarkers(this._map);
          this.boundariesData();
          return canvasLayer.addTo(this._map);
        }
      }
    });
  }

  public states;
  public stateLayer: any;
  boundariesData() {
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
    this.shapeService.getNominalMacroData().subscribe(sitesVal => {
      console.log(sitesVal,"sitesVal");
      
      // this.sitesValArr = sitesVal.features;
      this.sitesValArr = sitesVal.features;
      console.log(this.sitesValArr, "this.sitesValArr");
      this.sitesNominalLayerMap(this.sitesValArr);
      // this.sitesDraw();
    });
  }

  private initStatesLayer() {
    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    this.stateLayer = L.geoJSON(this.states, {

      style: (feature) => ({
        weight: 2,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.4,
        fillColor: '#6DB65B'
      }),

      onEachFeature: (feature, layer) => {
        layer.on({
          // mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
          click: (e) => (this.zoomToFeature(e)),
        });
        layer.bindTooltip(feature.properties.NAME_1,
          {
            permanent: true,
            direction: 'center',
            className: 'countryLabel'
          });
      }
    });

    this._map.addLayer(this.stateLayer);
  }

  private highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 0.8,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });

  }

  private resetFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.4,
      fillColor: '#6DB65B'
    });

  }

  private zoomToFeature(e) {
    const layer = e.target;
    layer.fitBounds(e.target.getBounds());
  }

  sitesNominalLayer
  sitesNominalLayerMap(item) {
    console.log(item,"item");
    
    // var ratIcon = L.icon({
    //   iconUrl: 'assets/images/Layers/3.svg',
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   shadowSize: [41, 41]
    // });

    // this.sitesNominalLayer = L.geoJSON(this.sitesValArr, {
    //   pointToLayer: function (feature, latlng) {
    //     console.log(feature, "feature");
    //     console.log(latlng, "latlng");

    //     var marker = L.marker(latlng, { icon: ratIcon });
    //     // marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
    //     return marker;
    //   },

    //   onEachFeature: (feature, layer) => (
    //     layer.on({
    //       // mouseover: (e) => (this.highlightFeature(e)),
    //       // mouseout: (e) => (this.resetFeature(e)),
    //       click: (e) => (this.spiderViewFeature(e)),
    //     })
    //   )

    // });

    // this._map.addLayer(this.sitesNominalLayer);
  }

  private spiderViewFeature(e) {
    const layer = e.target;
    console.log(layer, "layer");
  }


  removeAllMarkers() {
    if (this._map.hasLayer(this.stateLayer)) {
      this._map.removeLayer(this.stateLayer);
    }

    if (this._map.hasLayer(this.sitesNominalLayer)) {
      this.sitesNominalLayer.clearLayers();
    }
  }

}
