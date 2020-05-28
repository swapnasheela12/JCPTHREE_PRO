import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { DataSharingService } from '../_services/data-sharing.service';
import * as createjs from 'createjs-module';
import * as L from 'leaflet';
import { MarkerService } from '../_services/leaflate/marker.service';
declare var $: any;
@Component({
  selector: 'app-main-layer',
  templateUrl: './main-layer.component.html',
  styleUrls: ['./main-layer.component.scss']
})
export class MainLayerComponent implements OnInit {
  map: L.Map;


  public chartDivWidth;
  public chartDivHeight;


  // // Define our base layers so we can reference them multiple times
  // streetMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  //   maxZoom: 20,
  //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  // });

  // wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
  //   detectRetina: true,
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // });

  // summit = marker([19.0760, 72.8777], {
  //   icon: icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [13, 41],
  //     iconUrl: 'assets/image/agriculture/JAPSVG/Mandi.svg',
  //     shadowUrl: ''
  //   })
  // });

  // // Marker for the parking lot at the base of Mt. Ranier trails
  // paradise = marker([19.04662244380717, 72.9179334640503], {
  //   // paradise = marker([19.04662244380717 + 0.1 * (Math.random() - 0.5), 72.9179334640503 + 0.1 * (Math.random() - 0.5)], {
  //   icon: icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [13, 41],
  //     // iconUrl: 'leaflet/marker-icon.png',
  //     iconUrl: 'assets/image/agriculture/JAPSVG/Mandi.svg',
  //     shadowUrl: ''
  //     // shadowUrl: 'leaflet/marker-shadow.png'
  //   })
  // })
  //   // .on('click', this.showPopup.bind(this))

  //   // .bindPopup('<canvas width="500" height=500 id="myCanvas"></canvas>');
  //   .bindPopup('<div><img src="assets/image/agriculture/JAP_Spider__PNG/Jap_sudy_V2-15.png" width="400" height="400" alt=""></div>', { autoPan: true });


  // options = {
  //   layers: [this.streetMaps, this.paradise, this.summit],
  //   zoom: 5,
  //   zoomControl: false,
  //   preferCanvas: true,
  //   center: latLng([25.0000, 80.0000])
  //   // center: latLng([19.0760, 72.8777])
  // };





  constructor(private datashare: DataSharingService, private markerService: MarkerService) {
    this.datashare.currentMessage.subscribe((message) => {

      var divWidth;
      var divHeight;
      var divWidthTraffic;
      var divHeightTraffic;

      setTimeout(() => {
        divWidth = $("#layerDivId").width();
        console.log(divWidth, "divWidth");

        divHeight = $("#layerDivId").height();

        this.chartDivWidth = divWidth;
        this.chartDivHeight = divHeight;


      }, 1000);

      if (!message) {

        this.chartDivWidth = divWidth + 280;
        this.chartDivHeight = divHeight;

        // this.chartDivHeight;
      } else {
        this.chartDivWidth = divWidth - 280;
        this.chartDivHeight = divHeight;

      }

    });

  }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({ position: 'bottomright' }));
  }


  ngOnInit(): void {
    // this.map = L.map('map', {
    //   center: [39.8282, -98.5795],
    //   zoom: 3
    // });
    // console.log(this.map, "this.map");

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // tiles.addTo(this.map);


  }


  ngAfterViewInit() {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);

    ////////////////

    // var stage = new createjs.Stage("demoCanvas");
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    // circle.x = 10;
    // circle.y = 10;
    // stage.addChild(circle);

    // stage.update();

    // createjs.Tween.get(circle, { loop: true })
    //   .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    //   .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ alpha: 0, y: 225 }, 100)
    //   .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));

    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", stage);
  }

  private initMap(): void {

    const iconRetinaUrl = 'assets/images/Layers/3.svg';
    const iconUrl = 'assets/images/Layers/3-1.svg';
    // const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      // shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;


    this.map = L.map('map', {
      center: [25.0000, 79.0000],
      zoomControl: false,
      zoom: 5
    });
    console.log(this.map, "this.map");
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    tiles.addTo(this.map);

  }







}
