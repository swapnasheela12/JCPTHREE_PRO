import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import '../../../../node_modules/leaflet-customlayer/dist/Leaflet.CustomLayer.js'
// import '../../../js/Leaflet.CustomLayer.js'
// declare const CustomLayer :any;
// import "Leaflet.CustomLayer";

@Component({
  selector: 'app-layers-cust',
  templateUrl: './layers-cust.component.html',
  styleUrls: ['./layers-cust.component.scss']
})
export class LayersCustComponent implements OnInit {

  constructor() { }

  map: any;
  lib;
  ngOnInit() {
    this.lib = leaflayer();
    console.log(this.lib,">>>>");
    
    // this.map = L.map('map').setView([43.068661, 141.350755], 8);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);
    // // Makerを配置
    // L.marker([0, 0]).bindPopup('<b>Hello!!</b>').addTo(this.map);
    this.init();
  }

  init() {
    this.map = new L.Map('mapL', {
      layers: [L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], maxZoom: 5 })],
      center: new L.LatLng(25.0000, 79.0000),
      zoomControl: true,
      zoom: 15
    });

    this.map.createPane('foo');
    this.map.getPane('foo').style.zIndex = '401';
    // this.setLayers();
    // const group = new L.FeatureGroup(this.markers, {pane: 'foo'})
    // group.addTo(this.map);
    console.log(this.map);
    this.draw();
  }

  draw() {

    console.log(L, "L");

    var canvasLayer = new this.lib.CustomLayer({
      container: document.createElement("canvas"),
      padding: 0.1,
      opacity: 1,
      visible: true,
      minZoom: 0,
      maxZoom: 18
    });
  
    var drawCanvas1 = function() {
      var canvas = this.getContainer();
      var retina = L.Browser.retina;
      var size = this.map.getSize(); // resize
      var width = size.x;
      var height = size.y;
      canvas.style.width = width+'px'
      canvas.style.height = height+'px'
      if(retina){ // retina
        width*=2;
        height*=2;
      }
      canvas.width = width;
      canvas.height = height;//清除画布
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = '#0F0';
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
  
      var positions = [
        {
          center: {
            lat: 37.68,
            lng: 116.25
          },
          radius: 30
        }
      ];
  
      for (var i = 0; i < positions.length; i += 1) {
        var center = positions[i].center;
        var pos = this.map.latLngToContainerPoint(center);
        var r = positions[i].radius;
  
        if(retina){
          pos = pos.multiplyBy(2);
          r*=2
        }
        ctx.moveTo(pos.x+r, pos.y)
        ctx.arc(pos.x, pos.y, r, 0, 2*Math.PI);
      }
      ctx.lineWidth = retina?18:9
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    };
  
    var drawCanvas2 = function() {
      var canvas = this.getContainer();
  
      var dpr = L.Browser.retina ? 2 : 1;
  
      var size = this._bounds.getSize(); // resize
  
      var padding = this._padding;
      canvas.width = dpr * size.x;
      canvas.height = dpr * size.y;
      canvas.style.width = size.x + "px";
      canvas.style.height = size.y + "px";
  
      var ctx = canvas.getContext("2d");
      if (L.Browser.retina) {
        ctx.scale(dpr, dpr);
      }
  
      ctx.translate(padding.x, padding.y);
  
      ctx.fillStyle = '#0F0';
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
  
      var positions = [
        {
          center: {
            lat: 39.910088,
            lng: 116.401601
          },
          radius: 30
        }
      ];
  
      for (var i = 0; i < positions.length; i += 1) {
        var center = positions[i].center;
        var pos = this.map.latLngToContainerPoint(center);
        var r = positions[i].radius;
  
        ctx.moveTo(pos.x+r, pos.y)
        ctx.arc(pos.x, pos.y, r, 0, 2*Math.PI);
      }
      ctx.lineWidth = 9
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
  
    };
  
    canvasLayer.on("layer-beforemount", function() {
      console.log("layer-beforemount");
    });
  
    canvasLayer.on("layer-mounted", function() {
      console.log("layer-mounted");
    });
  
    canvasLayer.on("layer-render", function() {
      console.log("layer-render");
      drawCanvas2.bind(this)();
    });
  
    canvasLayer.on("layer-beforedestroy", function() {
      console.log("layer-beforedestroy");
    });
  
    canvasLayer.on("layer-destroyed", function() {
      console.log("layer-destroyed");
    });
  
    canvasLayer.addTo(this.map);

   

   

  }

}
