import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as createjs from 'createjs-module';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MarkerService } from 'src/app/_services/leaflate/marker.service';
declare var $: any;
@Component({
  selector: 'app-main-layer',
  templateUrl: './main-layer.component.html',
  styleUrls: ['./main-layer.component.scss']
})
export class MainLayerComponent implements OnInit {
  // map: L.Map;
  map: any;
  public chartDivWidth;
  public chartDivHeight;


  // // Define our base layers so we can reference them multiple times
  // streetMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  //   maxZoom: 20,
  //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  // });

  // // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  // options = {
  //   layers: [this.streetMaps],
  //   zoom: 5,
  //   zoomControl: false,
  //   center: latLng([25.0000, 79.0000])
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


  // mapReady(map: L.Map) {
  //   map.addControl(L.control.zoom({ position: 'bottomright' }));
  //   console.log(L, "L");
  //   // console.log(L.PM,"L.PM");
  //   console.log(map, "map");
   
  //   // map.pm.addControls({
  //   //   position: 'bottomright',
  //   //   drawCircle: true,
  //   //   drawCircleMarker: true,
  //   //   drawPolyline: true,
  //   //   drawRectangle: true,
  //   //   drawPolygon: true,
  //   //   editMode: true,
  //   //   dragMode: true,
  //   //   cutPolygon: true,
  //   //   removalMode: true,
  //   //   drawMarker: true
  //   // });


  //   const iconRetinaUrl = 'assets/images/Layers/3.svg';
  //   const iconUrl = 'assets/images/Layers/3-1.svg';
  //   // const shadowUrl = 'assets/marker-shadow.png';
  //   const iconDefault = L.icon({
  //     iconRetinaUrl,
  //     iconUrl,
  //     // shadowUrl,
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     tooltipAnchor: [16, -28],
  //     shadowSize: [41, 41]
  //   });
  //   L.Marker.prototype.options.icon = iconDefault;
  //   this.markerService.makeCapitalMarkers(map);

  // }



  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
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
    console.log(L, "L.....");
    this.map.on('pm:globalremovalmodetoggled', e => {
      console.log(e, "e");
    });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var options = {
      position: 'bottomright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
      drawMarker: true,  // adds button to draw markers
      drawPolygon: true,  // adds button to draw a polygon
      drawPolyline: false,  // adds button to draw a polyline
      drawCircle: true,  // adds button to draw a cricle
      drawCircleMarker: false,//add button with circle radius
      editPolygon: true,  // adds button to toggle global edit mode
      deleteLayer: true,   // adds a button to delete layers
      // removalMode: false,
      editMode: false,
      dragMode: true,// drag and drop
    };

    this.map.pm.addControls(options);

    // this.map.pm.addControls({
    //   position: 'bottomright',
    //   drawCircle: true,
    //   drawCircleMarker: true,
    //   drawPolyline: true,
    //   drawRectangle: true,
    //   drawPolygon: true,
    //   editMode: true,
    //   dragMode: true,
    //   cutPolygon: true,
    //   removalMode: true,
    //   drawMarker: true
    // });




    tiles.addTo(this.map);

    ////

    ////








  }







}
