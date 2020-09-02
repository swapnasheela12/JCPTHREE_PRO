import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { ShapeService } from './../../../layers-services/shape.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class SmallCellService {
  map: any;
  lib;
  public mydata;
  _canvasLayer;
  constructor(private datashare: DataSharingService, private router: Router, private shapeService: ShapeService, private http: HttpClient,) {
    this.lib = leaflayer();
    console.log(this.lib, ">>>>");
    this.redrawLayer();

    this.router.events.subscribe((event: any) => {
      console.log(event.url, "event");

    })

  }


  redrawLayer() {
    console.log(this.shapeService, "this.shapeService");
    setTimeout(() => {
      this.shapeService.getSmallCellData().subscribe(states => {
        console.log(states, "states");
        this.draw(states);
      });
    }, 2000);


  }

  public draw = function (dataVal) {

    console.log(L, "L");
    var data = dataVal;
    console.log(this.map, "this.map");
    // data loaded from city.js
    let _map = this.shapeService.mapServiceData;


    var resizeContainer = function () {
      var canvas = this.getContainer();
      console.log(L.Browser);

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

    canvasLayer.on("layer-beforemount", function () {
      console.log("layer-beforemount");
    });

    canvasLayer.on("layer-mounted", function () {
      console.log("layer-mounted");
    });

    canvasLayer.on("layer-render", function () {
      console.log("layer-render");

      var ctx = resizeContainer.bind(this)();
      ctx.fillStyle = "rgba(255,116,0, 0.5)";


      var bounds = _map.getBounds();

      for (var i = 0; i < data.length; i++) {
        var d = data[i].latlng;
        if (bounds.contains([d[0], d[1]])) {
          let dot = _map.latLngToContainerPoint([d[0], d[1]]);
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        }
      }
    });

    canvasLayer.on("layer-beforedestroy", function () {
      console.log("layer-beforedestroy");
    });

    canvasLayer.on("layer-destroyed", function () {
      console.log("layer-destroyed");
    });

    
    this.datashare.currentMessage.subscribe(val => {
      this.selectedLayerArrList = val;
      canvasLayer.remove(_map);

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Small-Cell") {
          console.log("got it all amll ESC");
          return canvasLayer.addTo(_map);
        }

      }

    });



  }



}
