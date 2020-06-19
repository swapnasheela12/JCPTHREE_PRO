import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as createjs from 'createjs-module';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MarkerService } from 'src/app/_services/leaflate/marker.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TableViewControlComponent } from './table-view-control/table-view-control.component';
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

  customControl;
  customControlList;

  animal: string;
  name: string;
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

  constructor(private datashare: DataSharingService, private markerService: MarkerService, public dialog: MatDialog) {
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

    // var southWest = L.latLng(34.072711, 31.758391),
    //   northEast = L.latLng(36.113055, 35.124228),
    //   bounds = L.latLngBounds(southWest, northEast);

    this.map = L.map('map', {
      center: [25.0000, 79.0000],
      zoomControl: false,
      zoom: 5
    });
    // .setMaxBounds(bounds);
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

    //custome controller//
    this.customControl = L.Control.extend({

      options: {
        position: 'bottomright',
        // control:[{
        //   name:"zmdi zmdi-group"
        // },{
        //   name:"zmdi zmdi-group"
        // }]
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
        }

        return container;
      },
      onRemove: function (map) {
        console.log('buttonClicked?????????');
      }
    });

    this.map.addControl(new this.customControl());



    // let testFunc = this.openDialog();
    let _dialog = this.dialog;

    this.customControlList = L.Control.Layers.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {


        var container = L.DomUtil.create('div', ' leaflet-bar leaflet-bar-horizontal ', this._control);
        console.log(container, "container");
        container.style.display = 'flex';
        container.style.position = 'absolute';
        container.style.bottom = '0px';
        container.style.right = '50px';
        var backwards = L.DomUtil.create('a', 'ss', container);
        backwards.innerHTML = '<div class="zmdi zmdi-view-subtitles"></div>';

        var middle = L.DomUtil.create('a', ' ', container);
        middle.innerHTML = '<div class="zmdi zmdi-view-dashboard"></div>';

        var forwards = L.DomUtil.create('a', ' ', container);
        forwards.innerHTML = '<div class="zmdi zmdi-time-interval"></div>';

        backwards.onclick = function () {
          console.log('buttonClicked');
          // testFunc;
          // const dialogRef = testFunc.open(LayerTableViewControlComponent, {
          //   width: "700px",
          //   panelClass: "material-dialog-container",
          //   // data: { name: this.name, animal: this.animal }
          // });

          // dialogRef.afterClosed().subscribe(result => {

          //   // this.animal = result;
          // });

          const dialogRef = _dialog.open(TableViewControlComponent, {
            width: '560px',
            height: '580px',
            position: { bottom: '60px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            disableClose: true,
            hasBackdrop: false
          });
          dialogRef.backdropClick().subscribe(_ => {
            // Close the dialog
            dialogRef.close();
          })


        }
        middle.onclick = function () {
          console.log('buttonClicked_middle');
        }
        forwards.onclick = function () {
          console.log('buttonClicked_forwards');
        }

        return container;
      },


    });

    this.map.addControl(new this.customControlList());
    //custome controller//










  }







}
