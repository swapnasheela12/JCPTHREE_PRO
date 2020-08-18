import { SpiderViewComponent } from './spider-view/spider-view.component';
import { KpiDetailsComponent } from './kpi-details/kpi-details.component';
import { LegendsAndFilterComponent } from './legends-and-filter/legends-and-filter.component';
import { ShapeService } from './layers-services/shape.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Underscore: Added temporarily. Will be replaced with javascript functions
import * as _ from 'underscore';
import * as Highcharts from 'highcharts';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as createjs from 'createjs-module';
import * as L from 'leaflet';
import * as leafletimage from 'leaflet-image';
// import 'leaflet-canvas-marker/dist/leaflet.canvas-markers.js';
// import {CanvasLayer} from  '../../../js/L.CanvasLayer.js';
import 'leaflet-canvas-layer/dist/leaflet-canvas-layer.js';
// import "../../../js/L.CanvasLayer.js";
// import * as canvasLayer from 'leaflet-canvas-marker/dist/leaflet.canvas-markers.js';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MarkerService } from 'src/app/_services/leaflate/marker.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TableViewControlComponent } from './table-view-control/table-view-control.component';
import { concatAll } from 'rxjs/operators';
declare var $: any;
declare const testName: any;

// Type for Library Canvas
interface DataObject{
  [key:string]:any;
}

@Component({
  selector: 'app-main-layer',
  templateUrl: './main-layer.component.html',
  styleUrls: ['./main-layer.component.scss']
})
export class MainLayerComponent implements OnInit, AfterViewInit {
  // map: L.Map;
  map: any;
  CanvasLayer: any;
  public chartDivWidth;
  public chartDivHeight;

  customControl;
  customControlList;

  public currentZoom;
  



  public distanceInKms:any = 0;
  public chartJson: any = [
    {
      name: "1",
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
      name: "2",
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
      name: "3",
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
      name: "4",
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
  public distanceKm = 0;
 
  //CANVAS LIBRARY CONTENT
  public canvasLibrary:DataObject;


  //PIE JSON DATA
  public siteData:DataObject;


  //SHAPE(FAN) CONFIG

  public _pixelRatio:number = window.devicePixelRatio || 1;
  public _map:DataObject;
  public _simplePopup:DataObject;
  public _container:DataObject;
  public _selectionContainer:DataObject;
  public _points:DataObject;
  public _hightlightCell:DataObject;
  public _bounds:Array<{key:string}>;
  public _colors:String[] = ['#666666', '#b3b3b3', '#11808B', '#74BB26', '#CBE010', '#FFC51E', '#8CC90E', '#218A7B', '#359667', '#E7EA10', '#CBE010', '#FFB023', '#FF6239', '#FFB023', '#E8EB10', '#FF6239'];
  public _stage:DataObject;
  public _addtionalsector:String;;
  public scaleMatrix:number;
  public fanDataError:String;

  constructor(private shapeService: ShapeService, private datashare: DataSharingService, private markerService: MarkerService, public dialog: MatDialog,
    private http:HttpClient
    ) {
    this.datashare.currentMessage.subscribe((message) => {

      var divWidth;
      var divHeight;

      setTimeout(() => {
        divWidth = $("#layerDivId").width();
        divHeight = $("#layerDivId").height();

        this.chartDivWidth = divWidth;
        this.chartDivHeight = divHeight;

      }, 1000);

      if (!message) {
        this.chartDivWidth = divWidth + 280;
        this.chartDivHeight = divHeight;
      } else {
        this.chartDivWidth = divWidth - 280;
        this.chartDivHeight = divHeight;
      }

    });

  }

  ngOnInit(): void { 
    this.canvasLibrary = canvasLayerForLeaflet();
    //this.siteDataJson();
   }


  ngAfterViewInit() {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    this.siteDataJson();
  }


  private initMap(): void {

    const iconRetinaUrl = 'assets/images/Layers/3.svg';
    const iconUrl = 'assets/images/Layers/3-1.svg';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map('map', {
      center: [25.0000, 79.0000],
      //center:[19.04,72.90],
      zoomControl: false,
      zoom: 5
    });
    console.log(this.map)
    //console.log(this.map, "this.map");
    //console.log(L, "L.....");
    this.map.on('pm:globalremovalmodetoggled', e => { });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    //CanvasLibrary
    this.canvasLibrary.canvasLayer().delegate(this).addTo(this.map);
    this.connectPoints(this.map);
    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.map);

    this.screenshotCapture(this.map);
    //geo json control
    var options = {
      position: 'bottomright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
      drawMarker: true,  // adds button to draw markers
      drawPolygon: true,  // adds button to draw a polygon
      drawPolyline: false,  // adds button to draw a polyline
      drawCircle: true,  // adds button to draw a cricle
      drawCircleMarker: false,//add button with circle radius
      editPolygon: false,  // adds button to toggle global edit mode
      deleteLayer: false,   // adds a button to delete layers
      // removalMode: false,
      cutPolygon: false,
      drawRectangle: false,
      editMode: false,
      dragMode: false,// drag and drop
    };

    this.map.pm.addControls(options);
    //geo json control

    this.currentZoom = this.map.getZoom();

    //custome controller//
    this.customControl = L.Control.extend({

      options: {
        position: 'bottomright',
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');

        // container.innerHTML = '<div class="leaflet-control-custom-count-Layers"><div class="icon-control-count">4</div><div class="icon-control"><span class="ic ic-layers-01"></span></div></div>';
        container.innerHTML = ' <div class="tab-container-layers"><div class="icon-count"><span style="font-size: 12px;font-weight: 600;">4</span></div><div class="icon-style"><i class="ic ic-layers-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        // container.style.backgroundImage = "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        container.style.backgroundSize = "40px 40px";
        // container.style.position = 'absolute';
        // container.style.bottom = '0px';
        // container.style.right = '50px';
        container.style.width = '40px';
        container.style.height = '40px';

        container.onclick = function () {
          console.log('buttonClicked');


          var spiderViewListDialogRef = {
            // width: '50%',
            // height: '100%',
            panelClass: 'spider-view-custom-dialog'
            // position: { bottom: '60px', right: "60px" },
            // panelClass: "table-view-layers-dialog-container",
            // backdropClass: 'cdk-overlay-transparent-backdrop',
            // disableClose: true,
            // hasBackdrop: true
          }
          const dialogRef = _dialog.open(SpiderViewComponent, spiderViewListDialogRef);
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            dialogRef.close();
          });
          // dialogRef.backdropClick().subscribe(_ => {
          //   dialogRef.close();
          // });
  

        }

        return container;
      },
      onRemove: function (map) {
       // console.log('buttonClicked?????????');
      }
    });

    this.map.addControl(new this.customControl());

    let _dialog = this.dialog;
    let _currentZoom = this.currentZoom;
    let _map = this.map;

    this.customControlList = L.Control.Layers.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {
        var container = L.DomUtil.create('div', ' leaflet-bar leaflet-bar-horizontal ', this._control);
        //console.log(container, "container");
        container.style.display = 'flex';
        container.style.position = 'absolute';
        container.style.bottom = '0px';
        container.style.right = '50px';
        var tableViewControlButton = L.DomUtil.create('a', 'horizontal_icon_table_view', container);
        tableViewControlButton.innerHTML = '<div class="ic ic-table-01"></div>';

        var middle = L.DomUtil.create('a', 'horizontal_icon_kpi', container);
        middle.innerHTML = '<div class="ic ic-KPI-01"></div>';

        var legendsAndFilterControlButton = L.DomUtil.create('a', 'horizontal_icon_legends', container);
        legendsAndFilterControlButton.innerHTML = '<div class="ic ic-legends-01"></div>';

        tableViewControlButton.onclick = function () {

          let targetElement = (<HTMLInputElement>event.target);
          L.DomUtil.removeClass(tableViewControlButton, 'horizontal_icon_table_view');
          targetElement.classList.add("control_layer_active");

          var optionsListDialogRef = {
            width: '560px',
            height: '470px',
            position: { bottom: '60px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disableClose: true,
            hasBackdrop: true
          }
          const dialogRef = _dialog.open(TableViewControlComponent, optionsListDialogRef);

          dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
          });

          dialogRef.afterClosed().subscribe(result => {
            //console.log(result, "result after close data got");

            L.DomUtil.addClass(tableViewControlButton, 'horizontal_icon_table_view');
            targetElement.classList.remove("control_layer_active");
          });

          const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            // do something
           // console.log(data, "still got data open");

            if (data.selectedAreaName == "Pan India") {
              _map.fitBounds([
                [data.rowDataTable.latitude, data.rowDataTable.longitude]
              ]);
              _map.setZoom(7);
            } else if (data.selectedAreaNameParent == "jioState") {

              _map.fitBounds([
                [data.rowDataTable.latitude, data.rowDataTable.longitude]
              ]);
              _map.setZoom(8);
            } else {
              _map.fitBounds([
                [data.rowDataTable.latitude, data.rowDataTable.longitude]
              ]);
              _map.setZoom(12);
            }
          });

          const subDropDown = dialogRef.componentInstance.onAddDropDown.subscribe((data: any) => {
            // do something
            //console.log(data, ">>>>>>still got data open");

            if (data.selectedAreaName == "Pan India") {
              _map.setZoom(5);
            } else if (data.selectedAreaNameParent == "jioState") {
              _map.fitBounds([
                [data.objArea.latitude, data.objArea.longitude]
              ]);
              _map.setZoom(7);
            } else {
              _map.fitBounds([
                [data.objArea.latitude, data.objArea.longitude]
              ]);
              _map.setZoom(13);
            }
          });

        }

        middle.onclick = function () {
          //console.log('buttonClicked_middle');
          var kpiDetailsListDialogRef = {
            width: '740px',
            height: '350px',
            position: { bottom: '60px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disableClose: true,
            hasBackdrop: true
          }
          const dialogRef = _dialog.open(KpiDetailsComponent, kpiDetailsListDialogRef);

          dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
          });
        }

        legendsAndFilterControlButton.onclick = function () {
          //console.log('buttonClicked_legendsAndFilterControlButton');
          var LegendsAndFilterListDialogRef = {
            width: '538px',
            height: '313px',
            position: { bottom: '60px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disableClose: true,
            hasBackdrop: true
          }
          const dialogRef = _dialog.open(LegendsAndFilterComponent, LegendsAndFilterListDialogRef);
          dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
          });
        }

        return container;
      },

    });

    this.map.addControl(new this.customControlList());

    //custome controller end//

    // var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    //   denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    //   aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    //   golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    // var cities = L.layerGroup([littleton, denver, aurora, golden]);
    // cities.addTo(this.map);    // Adding layer group to map



    this.shapeService.getStateShapes().subscribe(states => {
     // console.log(states, "states");

      this.states = states;
      this.initStatesLayer();
    });

    //console.log(L, "l{{{{{{");
    // console.log(L.canvasLayer().drawing(this)
    // .addTo(this.map),"l{{{{{{");


    // //add layer in overlay
    // var layer1 = L.marker([51.505, -0.10]);
    // var layer2 = L.marker([51.505, -0.09]);
    // var layer3 = L.marker([51.505, -0.8]);

    // var basemaps = {
    //   "OSM": tiles
    // };

    // var overlays = {
    //   "Layer1": layer1,
    //   "Layer2": layer2,
    //   "Layer3": layer3
    // }

    // var controlObj = L.control.layers(basemaps, overlays, { collapsed: false }).addTo(this.map);

    // layer1.on("add", function () {
    //   console.log(controlObj, "??????")
    // });

    // //add layer in overlay
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();

    ///////////////
    // this.map.setView([25.0000, 79.0000], 5);

    // var myRenderer = L.canvas({ padding: 0.5 });
    // for (var i = 0; i < 100000; i += 1) { // 100k points
    //   L.circleMarker(this.getRandomLatLng(), {
    //     renderer: myRenderer
    //   }).addTo(this.map).bindPopup('marker ' + i);
    // }

    //console.log(L, ">>>>>>>>>");
    //console.log(L.FeatureGroup, ">>>>>>>>>");

    let extlayer = L.LayerGroup.extend({

      addLayer: function (layer) {
       // console.log(layer, "layer");

        L.LayerGroup.prototype.addLayer.call(this, layer);
      },


    });
   // console.log(extlayer, "extlayer");



    //////////////////////

    // var markers = L.markerClusterGroup();

    // function populate() {
    //   for (var i = 0; i < 10; i++) {
    //     var bounds = map.getBounds();
    //     var southWest = bounds.getSouthWest();
    //     var northEast = bounds.getNorthEast();
    //     var lngSpan = northEast.lng - southWest.lng;
    //     var latSpan = northEast.lat - southWest.lat;
    //     var latR = southWest.lat + latSpan * Math.random();
    //     var lngR = southWest.lng + lngSpan * Math.random();

    //     var myIcon = L.divIcon({
    //       iconSize: new L.Point(50, 50),
    //       html: String(i)
    //     });

    //     var m = L.marker(L.latLng(latR, lngR), { icon: myIcon });
    //     markers.addLayer(m);
    //   }
    //   return false;
    // }

    // var MyLayer = (L as any).CanvasLayer.extend({
    //   render: function () {
    //     var canvas = this.getCanvas();
    //     var ctx = canvas.getContext('2d');
    //     // render
    //   }
    // });
    // create and add to the map
    //var layer = new MyLayer();
    //console.log(layer, "layer");

    //layer.addTo(this.map);

    // populate();
    // this.map.addLayer(markers);






    //////////////

  }


  // getRandomLatLng() {
  //   return [
  //     -90 + 180 * Math.random(),
  //     -180 + 360 * Math.random()
  //   ];
  // }

  states;
  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 2,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.4,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(stateLayer);
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

  onClick() {

    var canvasObj = (L as any).canvasLayer();

    //console.log(canvasObj, "canvasObj");

    alert("canvasObj typeof=  " + typeof canvasObj);

    alert("canvasObj toString= " + canvasObj.toString());
  }

  connectPoints(map) {
    let latA: any;
    let latB: any;
    let counterid: number = 1;
    let pointA: any;
    let pointB: any;
    this.map.on('click', function (e) {
      this.containerID = ++counterid;
        if (!latA) {
          latA = e.latlng;
          this.latAdata = latA;
          //POINT A
          pointA = new L.Marker(latA, {
            draggable: true
          });
          pointA.addTo(this.map);
          pointA.bindPopup(`<div id="container${this.containerID}">${e.latlng} <br/> ${this.calculateDistance(latA, latB)} Kms</div>`, {
            minWidth: 245
          }).openPopup();

        }
        else {
          latB = e.latlng;
          this.latAdata = latB;
          //POINT B
          pointB = new L.Marker(latB, {
            draggable: true
          });
          pointB.addTo(this.map);
          pointB.bindPopup(`<div id="container${this.containerID}">${e.latlng} <br/> ${this.calculateDistance(latA, latB)} Kms</div>`, {
            minWidth: 245
          }).openPopup();
      }

      if (latA && latB) {
        console.log(L);
        var polyline =  L.polyline([latA, latB], {
          color: 'red',
          weight: 7,
          opacity: 7,
          smoothFactor: 10
        }).addTo(this.map);
        latA = latB

        //DRAW A NEW LAYER
        L.DomEvent.on(
          document.getElementById('newline'), 'click',
          function (ev) {
            console.log('before-click',latA,latB)
            latA = undefined;
            latB = undefined;
          }
        );
      }

    }.bind(this))

    //HIGHCHARTS POPUP
    this.map.on('popupopen', function (e) {
      console.log(this.distanceKm);
      new Highcharts.Chart({
        title: { text: this.distanceKm + 'Km' },
        chart: {
          renderTo: 'container' + this.containerID,
          height: 175,
          width: 295,
        },
        series: this.chartJson
      });
    }.bind(this));
  }

  calculateDistance(latA: any, latB: any) {
    if (latA !== undefined && latB !== undefined) {
      let dis: any = latA.distanceTo(latB);
      this.distanceInKms = ((dis) / 1000).toFixed(0);
      this.distanceKm = this.distanceInKms;
      console.log('hi')
      return this.distanceInKms || 0;
    }
    else {
      console.log('hi')
      return 0;
    }
  }

  screenshotCapture(map){
    document.getElementById('screenshot').addEventListener('click', function () {
      leafletimage(map, function (err, canvas) {
        var link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  }

  //LOAD JSON DATA FOR SHAPE (FAN)
  siteDataJson(){
    this.http.get("assets/data/layers/microsites-onair.json")
    .subscribe(data => {
      this.siteData = data;
    },
    error => {
      this.fanDataError = error;
    });
  }
 

  //FUNCTION FROM CANVAS LIBRARY WHICH PROVIDES THE CANVAS AND COORDINATES(BOUNDS)
  onDrawLayer(info){
    //STAGE
    this._container = new createjs.Container();

    //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
    this._stage = new createjs.Stage(info.canvas);
    
    this._stage.enableDOMEvents(true);
    this._stage.enableMouseOver(50);
 
    //POPUP
    this._simplePopup = this.getPopup();

    // CREATED ARRAYS BASED ON SITE NUMBER (BANDS) E.G. SITE850 ETC.
    let site850 = _.map(this.siteData.site850, function (item) {
        item.sitebandtype = 'site850';
        return item;
    });
    let site1800 = _.map(this.siteData.site1800, function (item) {
        item.sitebandtype = 'site1800';
        return item;
    });
    let site2300 = _.map(this.siteData.site2300, function (item) {
        item.sitebandtype = 'site2300';
        return item;
    });

    //COMBINING THE ARRAY
    let flatten = _.flatten([site850, site1800, site2300], true);

    //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
    let data = _.groupBy(flatten, 'sapid');
    this._points = data;
    
    //SETTING UP THE POSITION OF THE POP UP
    let scaleMatrix = (info.zoom <= 7) ? 0.03 : (info.zoom <= 10) ? 0.08 : (info.zoom <= 13) ? 0.15 : (info.zoom <= 15) ? 0.25 : (info.zoom <= 16) ? 0.35 : 0.40;
    scaleMatrix = scaleMatrix * this._pixelRatio;
    this.scaleMatrix = scaleMatrix;
    let pointOffset = L.point(0, -(scaleMatrix * 60) / this._pixelRatio);
    
    //POP CONFIG
    this._simplePopup.options.offset = pointOffset;

    //EMPTY THE CANVAS
    this._container.removeAllChildren();

    if (this._addtionalsector == 'Planned') {
      var siteCenterDotColor = "rgb(0,15,255)";
    } else {
        var siteCenterDotColor = "#06C1FF";
    }

    //CENTER DOT OF THE SHAPE
    let siteCenterDot = this.getPointGraphics(info.zoom, siteCenterDotColor);
    let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);

    for (const site in data) {
      let siteInner = data[site];
      let latlng = L.latLng(siteInner[0].latitude, siteInner[0].longitude);

      // PLACING THE COORDINATES
        if (!(info.bounds.contains(latlng))) continue;
          let dot = info.layer._map.latLngToContainerPoint(latlng);
          let centerPoint = {
            x: dot.x * this._pixelRatio,
            y: dot.y * this._pixelRatio
        }
        
        //CENTER DOT OF THE SHAPE(FAN)
        if (this._hightlightCell && this._hightlightCell == siteInner[0].sapid) {
          this._selectionContainer = new createjs.Container();
          this._selectionContainer.name = 'highlightcontainer';
          this._selectionContainer.scaleX = scaleMatrix;
          this._selectionContainer.scaleY = scaleMatrix;
          this._selectionContainer.x = centerPoint.x;
          this._selectionContainer.y = centerPoint.y;

          let highlightGraphic = this.getSelectionGraphics('#1e88e5', '#FFFFFF');
          let highlightShape = new createjs.Shape(highlightGraphic);
          this._selectionContainer.addChild(highlightShape);
          this._container.addChild(this._selectionContainer);
        }

        let siteContainer = new createjs.Container();
        siteContainer.x = centerPoint.x;
        siteContainer.y = centerPoint.y;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner[0].sapid;

        var currentBands = {};
        for (const band in siteInner) {
            var bandInner = siteInner[band];
            if(bandInner.sitebandtype !== undefined && bandInner.sitebandtype !== null){
              currentBands[bandInner.sitebandtype] = true;
          }
        }
        for (const band in siteInner) {
            let bandInner = siteInner[band];
            if(bandInner.sitebandtype !== undefined && bandInner.sitebandtype !== null){
              let outerRadius = (bandInner.sitebandtype == 'site850') ? 75 : (bandInner.sitebandtype == 'site1800') ? 55 : 35;
              let innerRadius = (bandInner.sitebandtype == 'site850') ? 55 : (bandInner.sitebandtype == 'site1800') ? 35 : 15;
        
              if (bandInner.sitebandtype == 'site1800') {
                if (!currentBands['site2300']) innerRadius = 15;
              }
              if (bandInner.sitebandtype == 'site850') {
                  if (!currentBands['site1800'] && currentBands['site2300']) innerRadius = 35;
                  if (!currentBands['site1800'] && !currentBands['site2300']) innerRadius = 15;
              }
              let carrierInnerRadius = innerRadius;
              let startAngle, endAngle;
              for (const sector in bandInner.siteArray) {
                let sectorInner = bandInner.siteArray[sector];
                let sectorColor;
                sectorInner.sitebandtype = bandInner.sitebandtype;
                sectorInner.sitebandtype = bandInner.sitebandtype;

                let sectorid = sectorInner.sectorid;
                let carrierOrNot;
                if (sectorInner.carrier != null) {
                    carrierOrNot = true;
                } else {
                    carrierOrNot = false;
                }
                
                if (bandInner.sitebandtype == 'site2300') {
                  if (this._addtionalsector == 'Planned') {
                    sectorColor = "rgb(0,15,255)";
                  } else {
                      sectorColor = "#5883d1";
                  }

                  //CALCULATION FOR START AND END ANGLES FOR SHAPE TO BE GENERATED BASED ON THE DATA PROVIDE IN SITE ARRAY LIST
                  switch (sectorid) {
                    case 1:
                    let sector4 = _.findWhere(bandInner.siteArray, {
                        sectorid: 4
                    });
                    if (sector4 !== undefined) {
                        if (sector4.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth - 30;
                            endAngle = sectorInner.azimuth - 5;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                    case 2:
                    let sector5 = _.findWhere(bandInner.siteArray, {
                        sectorid: 5
                    });
                    if (sector5 !== undefined) {
                        if (sector5.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth - 30;
                            endAngle = sectorInner.azimuth - 5;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                    case 3:
                    let sector6 = _.findWhere(bandInner.siteArray, {
                        sectorid: 6
                    });
                    if (sector6 !== undefined) {
                        if (sector6.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth - 30;
                            endAngle = sectorInner.azimuth - 5;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                    case 4:
                    let sector1 = _.findWhere(bandInner.siteArray, {
                        sectorid: 1
                    });
                    if (sector1 !== undefined) {
                        if (sector1.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth + 5;
                            endAngle = sectorInner.azimuth + 30;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                    case 5:
                    let sector2 = _.findWhere(bandInner.siteArray, {
                        sectorid: 2
                    });
                    if (sector2 !== undefined) {
                        if (sector2.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth + 5;
                            endAngle = sectorInner.azimuth + 30;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                    case 6:
                    let sector3 = _.findWhere(bandInner.siteArray, {
                        sectorid: 3
                    });
                    if (sector3 !== undefined) {
                        if (sector3.azimuth == sectorInner.azimuth) {
                            startAngle = sectorInner.azimuth + 5;
                            endAngle = sectorInner.azimuth + 30;
                        } else {
                            startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                            endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                        }
                    } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  }
                }
                else if (bandInner.sitebandtype == 'site1800') {
                  if (this._addtionalsector == 'Planned') {
                      sectorColor = "rgb(0,15,255)";
                  } else {
                      sectorColor = "#e7f300";
                  }
                  startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                  endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                }
                else {
                  if (this._addtionalsector == 'Planned') {
                      sectorColor = "rgb(0,15,255)";
                  } else {
                      sectorColor = "#be0c2f";
                  }
                  startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                  endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                }

                sectorInner.pcicolor = sectorColor;

                if (this._addtionalsector == 'Planned') {
                  var sectorpieColor = '#fff';
                } else {
                  var sectorpieColor = '#000000';
                }

                //PIE GENERATOR GENERATES THE SHAPES BASED ON PARAMS PROVIDED. FOR EXAMPLE, START ANGLE, END ANGLE ETC 
                let sectorPie = new createjs.Shape(this.pieGenerator(0, 0, startAngle, endAngle, outerRadius, innerRadius, carrierInnerRadius, carrierOrNot, sectorColor, sectorpieColor, 1));
                sectorPie.alpha = 0.8;
                sectorPie.shadow = shadow;
                sectorPie.cursor = 'pointer';
                sectorPie['latlng'] = latlng;
                sectorPie['site'] = bandInner.siteArray;
                sectorPie['sector'] = sectorInner;
                
                //EVENTS 
                sectorPie.addEventListener("mouseover", (event) => {
                  this.nodeOnMouseOver(info,event);
                })
                sectorPie.addEventListener("mouseout", (event) => {
                  this.nodeOnMouseOut(info,event);
                })
                siteContainer.addChild(sectorPie)
              }
            }
        }

        //CENTER DOT OF EACH SHAPE
        let siteDot = new createjs.Shape(siteCenterDot);
        siteDot.name = "centerdot";
        siteDot.shadow = shadow;
        siteDot.cursor = 'pointer';
        siteDot['site'] = bandInner.siteArray;
        siteDot['latlng'] = latlng;
        siteContainer.addChild(siteDot);
       

        // SHOW LABELS FOR EACH SHAPE LAID ON MAP AT ZOOM LEVEL 15 AND ABOVE
        if (info.zoom >= 15) {
          let label = new createjs.Text(siteInner[0].sapid, "bold 30px RobotoDraft", "#FFFFFF");
          label.textAlign = 'center';
          label.outline = 3;
          label.y = (scaleMatrix * 280) / this._pixelRatio;
          
          let outline = label.clone();
          outline.shadow = shadow;
          outline.color = '#000000';
          siteContainer.addChild(label, outline);
        }

        info.bounds.extend(latlng);
        this._container.addChild(siteContainer);
    }
    
    this._bounds = info.bounds;
    this._container.alpha = 1;

    //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
    this._stage.addChild(this._container);
    this._stage.update();
  }

  //ON MOUSE OVER OF SHAPE(FAN)
  nodeOnMouseOver(info,event) {
    let target = event.target;
    target.alpha = 1;
    target.graphics.strokeStyleCommand.width = 4;
    this._stage.update();
    if (target.sector.sitebandtype !== undefined  && target.sector.sitebandtype !== null){
      let band = (target.sector.sitebandtype == 'site2300') ? 2300 : (target.sector.sitebandtype == 'site1800') ? 1800 : 850;
      let template = "";
      template += `<div class="layout-row"><span class="prefix">PCI : </span> <span class="value">${(target.sector.pci)} </span></div>`;
      template += `<div class="layout-row"><span class="prefix">Band : </span> <span class="value">${(band)} MHz</span></div>`;
      this._simplePopup.setLatLng(target.latlng).setContent(template).openOn(info.layer._map);
    }
  }
 
  //ON MOUSE OUT OF SHAPE(FAN)
  nodeOnMouseOut(info,event){
    let target = event.target;
    target.alpha = 0.8;
    target.graphics.strokeStyleCommand.width = 1;
    this._stage.update();
    info.layer._map.closePopup();
  }

  pieGenerator(pie_x, pie_y, startAngle, endAngle, radius1, radius2, carrierInnerRadius, carrierStatus, fillColor, lineColor, lineThickness) {

    var newAngles = (endAngle - startAngle) / 2;
    var newAngle = startAngle + newAngles;

    var g = new createjs.Graphics();
    var strokeStyleCommand = g.setStrokeStyle(lineThickness).command;
    g['strokeStyleCommand'] = strokeStyleCommand;

    g.beginFill(fillColor);
    g.beginStroke(lineColor);
    g.arc(pie_x, pie_y, radius1, this.toRad(startAngle), this.toRad(endAngle),false);
    g.lineTo(pie_x + Math.cos(this.toRad(endAngle)) * radius2, pie_y + Math.sin(this.toRad(endAngle)) * radius2);
    g.arc(pie_x, pie_y, radius2, this.toRad(endAngle), this.toRad(startAngle), true);
    g.closePath();
    g.endFill();


    if (carrierStatus) {
        g.setStrokeStyle(1);
        g.moveTo(pie_x + Math.cos(this.toRad(newAngle)) * carrierInnerRadius, pie_y + Math.sin(this.toRad(newAngle)) * carrierInnerRadius);
        g.lineTo(pie_x + Math.cos(this.toRad(newAngle)) * radius1, pie_y + Math.sin(this.toRad(newAngle)) * radius1);
        g.closePath();
        g.beginStroke("#CD4B5B");
    } 
    return g;
  }


  getPopup(){
      var popup = L.popup({
          className: 'leaflet-simple-popup',
          minWidth: 120,
          offset: L.point(0, -40),
          closeButton: false
      });
      return popup;
  }


  getPointGraphics(matrix, color) {
      var g = new createjs.Graphics();
      g.setStrokeStyle(1);
      g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
      g.beginFill(color);
      g.drawCircle(0, 0, 10);
      return g;
  };


  getSelectionGraphics(strokecolor, color) {
      var g = new createjs.Graphics();
      g.setStrokeStyle(5);
      g.beginStroke(strokecolor);
      g.beginFill(color);
      g.drawCircle(0, 0, 90);
      return g;
  };


  toRad(angle) {
    return (angle - 90) * Math.PI / 180;
  }
}

