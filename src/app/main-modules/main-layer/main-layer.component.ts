import { ShapeService } from './layers-services/shape.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class MainLayerComponent implements OnInit, AfterViewInit {
  // map: L.Map;
  map: any;
  public chartDivWidth;
  public chartDivHeight;

  customControl;
  customControlList;

  public currentZoom;


  constructor(private shapeService: ShapeService, private datashare: DataSharingService, private markerService: MarkerService, public dialog: MatDialog) {
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

  ngOnInit(): void { }


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
      zoomControl: false,
      zoom: 5
    });

    console.log(this.map, "this.map");
    console.log(L, "L.....");
    this.map.on('pm:globalremovalmodetoggled', e => { });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

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
        }

        return container;
      },
      onRemove: function (map) {
        console.log('buttonClicked?????????');
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
        console.log(container, "container");
        container.style.display = 'flex';
        container.style.position = 'absolute';
        container.style.bottom = '0px';
        container.style.right = '50px';
        var tableViewControlButton = L.DomUtil.create('a', 'horizontal_icon_table_view', container);
        tableViewControlButton.innerHTML = '<div class="ic ic-table-01"></div>';

        var middle = L.DomUtil.create('a', 'horizontal_icon_kpi', container);
        middle.innerHTML = '<div class="ic ic-KPI-01"></div>';

        var forwards = L.DomUtil.create('a', 'horizontal_icon_legends', container);
        forwards.innerHTML = '<div class="ic ic-legends-01"></div>';

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
            console.log(result, "result after close data got");

            L.DomUtil.addClass(tableViewControlButton, 'horizontal_icon_table_view');
            targetElement.classList.remove("control_layer_active");
          });

          const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            // do something
            console.log(data, "still got data open");

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
            console.log(data, ">>>>>>still got data open");

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

    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    var cities = L.layerGroup([littleton, denver, aurora, golden]);
    cities.addTo(this.map);    // Adding layer group to map



    this.shapeService.getStateShapes().subscribe(states => {
      console.log(states, "states");

      this.states = states;
      this.initStatesLayer();
    });




  }


  states;
  // private initStatesLayer() {
  //   const stateLayer = L.geoJSON(this.states, {
  //     style: (feature) => ({
  //       weight: 3,
  //       opacity: 0.5,
  //       color: '#008f68',
  //       fillOpacity: 0.8,
  //       fillColor: '#6DB65B'
  //     })
  //   });

  //   this.map.addLayer(stateLayer);
  // }

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








}
