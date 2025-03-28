import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { ShapeService } from '../../../../layers-services/shape.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'underscore';
import { any } from 'underscore';
@Injectable({
  providedIn: 'root'
})
export class SmallCellService implements OnDestroy {
  public map: any;
  public _map;
  public states;
  public lib;
  public mydata;
  public _canvasLayer;
  public sitesData: any;
  public stateLayer: any;
  public futureLayerData?: any;
  public dataShareSub: Subscription;


  constructor(private datashare: DataSharingService, private router: Router, private shapeService: ShapeService, private http: HttpClient,) {
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

    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      canvasLayer.remove(this._map);
      if (this._map.hasLayer(this.stateLayer)) {
        this._map.removeLayer(this.stateLayer)
      }

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Small-Cell") {
          console.log("got it all amll ESC");
          this.boundariesData();

          return canvasLayer.addTo(this._map);
        }
      }
    });

  }

  boundariesData() {
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
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

      // onEachFeature: (feature, layer) => (
      //   layer.on({
      //     mouseover: (e) => (this.highlightFeature(e)),
      //     mouseout: (e) => (this.resetFeature(e)),
      //     click: (e) => (this.zoomToFeature(e)),
      //   })
      // )

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

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
  }


}