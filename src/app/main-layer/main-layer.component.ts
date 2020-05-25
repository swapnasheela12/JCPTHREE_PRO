import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { DataSharingService } from '../_services/data-sharing.service';
import * as L from 'leaflet';
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




  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  summit = marker([19.0760, 72.8777], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/image/agriculture/JAPSVG/Mandi.svg',
      shadowUrl: ''
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([19.04662244380717, 72.9179334640503], {
    // paradise = marker([19.04662244380717 + 0.1 * (Math.random() - 0.5), 72.9179334640503 + 0.1 * (Math.random() - 0.5)], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      // iconUrl: 'leaflet/marker-icon.png',
      iconUrl: 'assets/image/agriculture/JAPSVG/Mandi.svg',
      shadowUrl: ''
      // shadowUrl: 'leaflet/marker-shadow.png'
    })
  })
    // .on('click', this.showPopup.bind(this))

    // .bindPopup('<canvas width="500" height=500 id="myCanvas"></canvas>');
    .bindPopup('<div><img src="assets/image/agriculture/JAP_Spider__PNG/Jap_sudy_V2-15.png" width="400" height="400" alt=""></div>', { autoPan: true });

  options = {
    layers: [this.streetMaps, this.paradise, this.summit],
    zoom: 5,
    zoomControl: false,
    preferCanvas: true,
    center: latLng([25.0000, 80.0000])
    // center: latLng([19.0760, 72.8777])
  };





  constructor(private datashare: DataSharingService) {
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

}
