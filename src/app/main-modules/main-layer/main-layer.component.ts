import { ScreenshotPreviewComponent } from './screenshot-preview/screenshot-preview.component';
import { SpiderViewComponent } from './spider-view/spider-view.component';
import { KpiDetailsComponent } from './kpi-details/kpi-details.component';
import { LegendsAndFilterComponent } from './legends-and-filter/legends-and-filter.component';
import { ShapeService } from './layers-services/shape.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as createjs from 'createjs-module';
import * as L from 'leaflet';

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
import { saveAs } from 'file-saver';
import '../../../js/leaflet-ruler.js'
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter'
import { stringToArray } from 'ag-grid-community';
import { MarcoService } from './sites/outdoor/macro/marco.service';
declare var $: any;
declare const testName: any;

// Type for Library Canvas
interface DataObject {
  [key: string]: any;
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

  public customControl;
  public customControlPanIndia;
  public screenShotControl;
  public customControlList;

  public currentZoom;

  //CANVAS LIBRARY CONTENT
  public canvasLibrary: DataObject;


  //PIE JSON DATA
  public siteData: DataObject;
  public fanDataError: String;

  constructor(private shapeService: ShapeService, private datashare: DataSharingService, private markerService: MarkerService, public dialog: MatDialog,
    private http: HttpClient,private marcoService:MarcoService
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
    this.siteDataJson();
  }


  ngAfterViewInit() {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
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
    console.log(L, "L")
    //console.log(this.map, "this.map");
    //console.log(L, "L.....");
    this.map.on('pm:globalremovalmodetoggled', e => { });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    //CanvasLibrary
    this.canvasLibrary.canvasLayer().delegate(this).addTo(this.map);
    // this.connectPoints(this.map);
    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tiles.addTo(this.map);


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


    //screenshort
    this.screenShotControl = L.Control.extend({

      options: {
        position: 'bottomright',
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');

        container.innerHTML = ' <div class="tab-container-layers"><div class="icon-style"><i class="ic ic-snapshot1"></i></div></div>';
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "40px 40px";

        container.style.width = '40px';
        container.style.height = '40px';

        container.onclick = function () {
          var simpleMapScreenshoter = new SimpleMapScreenshoter({
            hidden: true
          }).addTo(_map);
          simpleMapScreenshoter.takeScreen('image', {
            caption: function () {
              return 'Jio Cognitive Platform'
            }
          }).then(image => {

            var screenshortListDialogRef = {
              width: '650px',
              height: '450px',
              data: {
                imageDataURL: image
              },
              panelClass: "table-view-layers-dialog-container",

            }
            const dialogRef = _dialog.open(ScreenshotPreviewComponent, screenshortListDialogRef);

          }).catch(e => {
            alert(e.toString())
          })

        }

        return container;
      },
      onRemove: function (map) {
        // console.log('buttonClicked?????????');
      }
    });

    this.map.on('simpleMapScreenshoter.error', function (event) {
      var el = document.createElement('div')
      el.classList.add('create-screen-error')
      el.innerHTML = event.e.toString()
      document.getElementById('screens').appendChild(el)
    })
    this.map.addControl(new this.screenShotControl());
    //screenshort

    //custome controller//


    this.customControlPanIndia = L.Control.extend({

      options: {
        position: 'bottomright',
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');

        // container.innerHTML = '<div class="leaflet-control-custom-count-Layers"><div class="icon-control-count">4</div><div class="icon-control"><span class="ic ic-layers-01"></span></div></div>';
        container.innerHTML = ' <div class="tab-container-layers"><div class="icon-style"><i class="ic ic-pan-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        // container.style.backgroundImage = "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        container.style.backgroundSize = "40px 40px";
        // container.style.position = 'absolute';
        // container.style.bottom = '0px';
        // container.style.right = '50px';
        container.style.width = '40px';
        container.style.height = '40px';

        container.onclick = function () {

          let zoomLev = map.getZoom();
          if (zoomLev != 5) {
            map.setZoom(5);
          }

        }

        return container;
      },
      onRemove: function (map) {
        // console.log('buttonClicked?????????');
      }
    });
    this.map.addControl(new this.customControlPanIndia());

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

  //LOAD JSON DATA FOR SHAPE (FAN)
  siteDataJson(){
    this.http.get("assets/data/layers/microsites-onair.json")
    .subscribe(data => {
      this.initializeNodes(data);
    },
    error => {
      this.fanDataError = error;
    });
  }

  //LOAD ALL THE NODES ONTO THE MAP
  initializeNodes(data){
    this.marcoService.nodeCreationInitializer.prototype = new this.canvasLibrary.canvasLayer();
    let nodes = new this.marcoService.nodeCreationInitializer(data);
    nodes.addTo(this.map);
  }
}