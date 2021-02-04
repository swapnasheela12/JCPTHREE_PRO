import { PolygonEditorComponent } from './polygon-editor/polygon-editor.component';
import { AdDirective } from './../../_directive/dynamicComponent/ad.directive';
import { RedirectLayersPopupComponent } from './../../core/components/commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { LogicaltopologyService } from './layer-list/topologies/fibre/logicaltopology/logicaltopology.service';
import { SmallCellPlanned4gService } from './layer-list/sites/planned/small-cell-planned/small-cell-planned-4g.service';
import { MacroPlanned4gService } from './layer-list/sites/planned/macro-planned-4g/macro-planned-4g.service';
import { Hpodsc4gService } from './layer-list/sites/planned/hpodsc/hpodsc4g.service';
import { MacroNominalService } from './layer-list/sites/nominal/macro-nominal.service';
import { Subscription } from 'rxjs';
import { SelectedLayerMenuComponent } from './selected-layer-menu/selected-layer-menu.component';
import { Router } from '@angular/router';
import { ScreenshotPreviewComponent } from './screenshot-preview/screenshot-preview.component';
import { KpiDetailsComponent } from './kpi-details/kpi-details.component';
import { LegendsAndFilterComponent } from './legends-and-filter/legends-and-filter.component';
import { PinZoomComponent } from './pin-zoom/pin-zoom.component'
import { ShapeService } from './layers-services/shape.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { } from 'google-maps';
import 'leaflet-canvas-layer/dist/leaflet-canvas-layer.js';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MarkerService } from 'src/app/_services/leaflate/marker.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TableViewControlComponent } from './table-view-control/table-view-control.component';
import '../../../js/leaflet-ruler.js';
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';
import { SmallCellService } from './layer-list/sites/indoor/small-cell/small-cell.service';
import { SideNavService } from 'src/app/_services/side-nav.service';
import { NodesAndBoundariesManagerService } from './layer-list/sites/outdoor/macro/nodes-and-boundaries-manager.service';
import 'leaflet-contextmenu';
import { MatSidenav } from '@angular/material/sidenav';
declare var $: any;

@Component({
  selector: 'app-main-layer',
  templateUrl: './main-layer.component.html',
  styleUrls: ['./main-layer.component.scss']
})
export class MainLayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('spiderView', { read: ViewContainerRef }) target: ViewContainerRef;
  public map: any;
  public CanvasLayer: any;
  public chartDivWidth;
  public chartDivHeight;
  public customControl;
  public customControlPanIndia;
  public screenShotControl;
  public customControlList;
  public currentZoom;
  public mapContextMenuItems;
  public simpleMapScreenshoterContext;
  public fanDataError: String;
  public routPathVal;
  public selectedLayerArrList: any = [];
  public selectedBaseMap: any = [];
  public countOfLayerSelected = 0;
  public countDiv;
  public contextMenuLib;
  public rulerLeafletLib;
  public libCustomLayer;
  public googleMutant;
  public address;
  public mapSelected;
  public optionMap;
  public baselayers;
  layerTiles;

  public polyRectangle;
  public circle;
  public poly;
  public polyline;
  // fileNameDialogRef: MatDialogRef<RedirectLayersPopupComponent>;
  // search = new GeoSearchControl({
  //   provider: new OpenStreetMapProvider(),
  // });

  public optionsSacle;
  public dataShareSub: Subscription = new Subscription();
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  constructor(private shapeService: ShapeService, private datashare: DataSharingService, private markerService: MarkerService, public dialog: MatDialog,
    private http: HttpClient, private logicaltopologyService: LogicaltopologyService, private macroNominalService: MacroNominalService, private smallCellService: SmallCellService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private vc: ViewContainerRef,
    private sideNavService: SideNavService, private smallCellPlanned4gService: SmallCellPlanned4gService, private macroPlanned4gService: MacroPlanned4gService, private Hpodsc4gService: Hpodsc4gService, private nodesAndBoundariesManagerService: NodesAndBoundariesManagerService) {


    this.router.events.subscribe((event: any) => {
      this.routPathVal = event.url;
    });
    this.macroNominalService.getReference(this);
    this.smallCellPlanned4gService.getReference(this);
    this.logicaltopologyService.getReference(this);
    console.log("sideNavService", this.sideNavService);
  }

  ngOnInit(): void {
    this.libCustomLayer = leaflayer();
    this.rulerLeafletLib = rulerLeaflet();
    this.contextMenuLib = contextLayerMenu();
    this.googleMutant = googleMutant();
    this.macroNominalService.getReference(this);
    this.smallCellPlanned4gService.getReference(this);
    this.logicaltopologyService.getReference(this);
    this.datashare.mainLayer(this);
  }

  @ViewChild(AdDirective) adHost: AdDirective;

  public components = [PolygonEditorComponent];
  public currentComponent = null;

  ngAfterViewInit() {
    this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
    this.nodesAndboundariesCall();
  }

  private initMap(): void {
    //marker code
    // console.log("google,", googleMutant);
    const iconRetinaUrl = 'assets/images/Layers/pin.svg';
    const iconUrl = 'assets/images/Layers/3-1.svg';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      // popupAnchor: [1, -34],
      // tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
    //map object create
    this.optionMap = {
      layers: [
        this.googleMutant.gridLayer.googleMutant({
          maxZoom: 18,
          type: 'roadmap'
        })
      ],
      // center: [25.0000, 79.0000],
      center: [19.04, 72.90],
      zoomControl: false,
      zoom: 5,
      // zoom: 12,
      contextmenu: true,
      contextmenuWidth: 140,
      contextmenuItems: [
        {
          text: 'ScreenShort',
          callback: (e) => {

            // L.DomEvent.preventDefault(e);
            setTimeout(() => {
              this.simpleMapScreenshoterContext = L.simpleMapScreenshoter({
                hidden: true, // hide screen icon

              }).addTo(this.map)
              this.simpleMapScreenshoterContext.takeScreen('image', {
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

              this.simpleMapScreenshoterContext.addTo(this.map)
            }, 2000);
            $(".leaflet-contextmenu").hide();
          }
        },
        {
          text: 'Distance Measure',
          callback: (e) => {
            var options = {
              // hidden: true,
              position: 'bottomright',
              lengthUnit: {
                display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
                decimal: 2,                 // Distance result will be fixed to this value. 
                factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
                label: 'Distance:'
              }
            };
            this.rulerLeafletLib.control.ruler(options).addTo(this.map);
            $(".leaflet-contextmenu").hide();
          }
          // callback: this.distanceMeasureFun
        },
        {
          text: 'Select Sites',
          callback: (e) => {
            // var options = {
            //   // hidden: true,
            //   position: 'bottomright',
            //   lengthUnit: {
            //     display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
            //     decimal: 2,                 // Distance result will be fixed to this value. 
            //     factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
            //     label: 'Distance:'
            //   }
            // };
            // this.rulerLeafletLib.control.ruler(options).addTo(this.map);
            $(".leaflet-contextmenu").hide();
          }
          // callback: this.distanceMeasureFun
        },
        {
          text: 'Import KML',
          callback: (e) => {
            $(".leaflet-contextmenu").hide();
          }
        },
      ]
    }
    this.map = this.contextMenuLib.map('map', this.optionMap);

    //geo json control
    this.map.on('pm:globalremovalmodetoggled', e => { });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    if (this.layerTiles === "Terrain") {
      //
    }

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
      // drawControls: true, 
      // editControls: true, 
      // optionsControls: true, 
      // customControls: true, 
      // oneBlock: false ,
      cutPolygon: true,
      drawRectangle: false,
      editMode: true,
      dragMode: true,// drag and drop
    };
    // make markers not snappable during marker draw
    // this.map.pm.enableDraw('Marker', { snappable: false });
    // map.pm.disableDraw('Marker');
    this.map.pm.addControls(options);

    this.map.on('pm:create', (e) => {
      let testdataval;

      this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
        testdataval = dataPoly;
        console.log(testdataval, "testdataval");

        // if (dataPoly != {}) {

        //   // this.polyDirectFunc();
        // }
      });

      let googleCoder = new google.maps.Geocoder();
      let lat = e.marker._latlng.lat;
      let lng = e.marker._latlng.lng;
      let latlng = new google.maps.LatLng(lat, lng);
      
      googleCoder.geocode({
        'location': latlng
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          var location = results[3] ? results[3] : results[2] ? results[2] : results[1] ? results[1] : results[0];
          this.address = location.formatted_address
        } else {
          this.address = "";
        }
        this.datashare.changeMessage(this.address);
      });

      e.layer.on('pm:edit', ({ layer }) => {
        // layer has been edited
        console.log(layer.toGeoJSON(),"....>>");
      });

    });

    this.datashare.currentMessage.subscribe((dataFromPinZoom) => {
      if (dataFromPinZoom === "pin-zoom-closed") {
        // this.map.removeLayer(e.marker);
      }
    });


    this.map.on('pm:create', ({ marker }) => {
      // marker.on('pm:vertexadded', e => {
      //   console.log("e", e);
      var screenshortListDialogRef = {
        width: '578px',
        height: '556px',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        panelClass: "table-view-layers-dialog-container",
      }
      const dialogRef = _dialog.open(PinZoomComponent, screenshortListDialogRef);
    });
    this.map.on('pm:snapdrag', e => {
      console.log("e", e);
      var screenshortListDialogRef = {
        width: '575px',
        height: '346px',
        panelClass: "table-view-layers-dialog-container",
        data: this.address
      }
      const dialogRef = _dialog.open(PinZoomComponent, screenshortListDialogRef);
    });

    //geo json control

    //pan india zoom
    this.currentZoom = this.map.getZoom();
    let _currentZoom = this.currentZoom;

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
      onRemove: function (map) { }
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
    let _datashare = this.datashare;
    let _dialog = this.dialog;
    let _map = this.map;

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
    var countTest = this.countOfLayerSelected;
    this.customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
        this.dataShareSub = _datashare.currentMessage.subscribe((val) => {
          this.selectedLayerArrList = val;
          for (let index = 0; index < this.selectedLayerArrList.length; index++) {
            const element = this.selectedLayerArrList[index];
            // baselayers[element.name].addTo(_map);
          }
          this.countOfLayerSelected = this.selectedLayerArrList.length;
          container.innerHTML = '<div class="tab-container-layers"><div class="icon-count"><span style="font-size: 12px;font-weight: 600;" id="command">' + this.countOfLayerSelected + '</span></div><div class="icon-style"><i class="ic ic-layers-01"></i></div></div>';
        });
        container.innerHTML = ' <div class="tab-container-layers"><div class="icon-count"><span style="font-size: 12px;font-weight: 600;" id="command">' + countTest + '</span></div><div class="icon-style"><i class="ic ic-layers-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "40px 40px";
        container.style.width = '40px';
        container.style.height = '40px';

        container.onclick = function () {
          // var spiderViewListDialogRef = {
          //   panelClass: 'spider-view-custom-dialog'
          // }
          // const dialogRef = _dialog.open(SpiderViewComponent, spiderViewListDialogRef);
          // dialogRef.afterClosed().subscribe(result => {
          //   console.log(`Dialog result: ${result}`);
          //   dialogRef.close();
          // });


          var selectedLayerMenuListDialogRef = {
            width: '340px',
            position: { bottom: '310px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disableClose: true,
            hasBackdrop: true
          }
          const dialogRef = _dialog.open(SelectedLayerMenuComponent, selectedLayerMenuListDialogRef);

          dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
          });

          const selectedLayer = dialogRef.componentInstance.onAddDropDown.subscribe((data: any) => {
            // canvasLayer.remove(_map);
            const dataSelected = _datashare.currentMessage.subscribe((val) => {
              // console.log(val, "val");

              // this.selectedLayerArrList = val;
              // this.countOfLayerSelected = this.selectedLayerArrList.length;
              // container.innerHTML = '<div class="tab-container-layers"><div class="icon-count"><span style="font-size: 12px;font-weight: 600;" id="command">' + this.countOfLayerSelected + '</span></div><div class="icon-style"><i class="ic ic-layers-01"></i></div></div>';
            });

          });

        }
        this._container = container;
        this._update();
        return this._container;
      },
      onRemove: function (map) {

      },
      _update: function () {
        if (!this._map) {
          return;
        }
      }
    });
    this.map.addControl(new this.customControl());
    this.customControlList = L.Control.Layers.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {
        var container = L.DomUtil.create('div', ' leaflet-bar leaflet-bar-horizontal ', this._control);

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
            width: '700px',
            height: '470px',
            position: { bottom: '60px', right: "60px" },
            panelClass: "table-view-layers-dialog-container",
            backdropClass: 'cdk-overlay-transparent-backdrop',
            disableClose: true,
            hasBackdrop: true
          }
          const dialogRef = _dialog.open(TableViewControlComponent, optionsListDialogRef);

          dialogRef.backdropClick().subscribe(_ => {
            // dialogRef.close();
          });

          dialogRef.afterClosed().subscribe(result => {

            L.DomUtil.addClass(tableViewControlButton, 'horizontal_icon_table_view');
            targetElement.classList.remove("control_layer_active");
          });

          const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
            // do something

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
            maxWidth: '700px',
            height: '450px',
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

    this.optionsSacle = {
      position: 'bottomleft'
    };
    let scale: any = L.control.scale({
      position: this.optionsSacle.position,
      imperial: false,
      maxWidth: 100
    }).addTo(this.map);

    //custome controller//
    this.shapeService.mapServiceData = this.map;
    this.basemapfunc();
    // this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
    //   if (dataPoly != {}) {
    //     this.polyDirectFunc();
    //   }
    // });

    this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
      if (dataPoly != {}) {

        let options = {
          // snapping
          snappable: true,
          snapDistance: 20,

          // self intersection
          allowSelfIntersection: true,

          // the lines between coordinates/markers
          templineStyle: {
            color: 'red',
          },

          // the line from the last marker to the mouse cursor
          hintlineStyle: {
            color: 'red',
            dashArray: [5, 5],
          },

          // show a marker at the cursor
          cursorMarker: false,

          // finish drawing on double click
          // DEPRECATED: use finishOn: 'dblclick' instead
          finishOnDoubleClick: false,

          // specify type of layer event to finish the drawn shape
          // example events: 'mouseout', 'dblclick', 'contextmenu'
          // List: http://leafletjs.com/reference-1.2.0.html#interactive-layer-click
          finishOn: 'contextmenu',

          // custom marker style (only for Marker draw)
          markerStyle: {
            opacity: 0.5,
            draggable: true,
          },
        };
        this.dataPolyList = dataPoly;
        for (let index = 0; index < this.dataPolyList.transferDataPoly.length; index++) {
          const ele = this.dataPolyList.transferDataPoly[index];
          console.log(ele, "ele");
          // this.map.pm.toggleEdit(options);
          // enable drawing mode for shape - e.g. Poly, Line, etc
          // this.map.pm.enableDraw('ele.polydata.properties.shape', options);
          // this.map.pm.enableDraw('Rectangle', options);
          // this.map.pm.enableDraw('Line', options);
          // this.map.pm.enableDraw('Marker', options);
          // this.map.pm.enableDraw('Circle', options);

          if (ele.polydata.properties.shape == 'Circle') {
            this.circle = L.circle([ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0]], ele.polydata.properties.radius, {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5
            }).addTo(this.map);
            this.map.setZoom(ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0], 14);
          } else if (ele.polydata.properties.shape == 'Polygon') {
            this.poly = L.polygon([
              [19.060009, 72.876063],
              [19.013112, 72.907984],
              [19.065525, 72.916565],
              [19.060009, 72.876063]
            ]).addTo(this.map);
            this.map.setZoom(14);
          } else if (ele.polydata.properties.shape == 'Rectangle') {
            this.polyRectangle = L.rectangle([
              [19.045527, 72.902422],
              [19.045527, 72.905597],
              [19.049482, 72.905597],
              [19.049482, 72.902422],
              [19.045527, 72.902422]
            ], { color: "#ff7800", weight: 1 }).addTo(this.map);
            this.map.setZoom(14);

          } else {
            this.polyline = L.polyline([
              [19.045568, 72.894765],
              [19.046055, 72.898672],
              [19.045933, 72.901742]
            ]).addTo(this.map);
            this.map.setZoom(14);
          }








        }



        // // enable drawing mode for shape - e.g. Poly, Line, etc
        // this.map.pm.enableDraw('Poly', options);
        // this.map.pm.enableDraw('Rectangle', options);
        // this.map.pm.enableDraw('Line', options);
        // this.map.pm.enableDraw('Marker', options);
        // this.map.pm.enableDraw('Circle', options);

      }
    });

    console.log(this.datashare,"datashare?????");
    

  }


  public dataPolyList;

  // polyDirectFunc() {
  //   this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
  //     console.log(dataPoly, "dataPoly");
  //     // this.map.setZoom(16);
  //     this.dataPolyList = dataPoly;
  //     for (let index = 0; index < this.dataPolyList.transferDataPoly.length; index++) {
  //       const ele = this.dataPolyList.transferDataPoly[index];
  //       console.log(ele,"ele");

  //       // if (ele.checked == true) {
  //         if (ele.polydata.properties.shape == 'Circle') {
  //           this.circle = L.circle([ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0]], ele.polydata.properties.radius, {
  //             color: 'red',
  //             fillColor: '#f03',
  //             fillOpacity: 0.5
  //           }).addTo(this.map);
  //           this.map.setZoom(ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0],14);
  //         } else if (ele.polydata.properties.shape == 'Polygon') {
  //           this.poly = L.polygon([
  //             [19.060009, 72.876063],
  //             [19.013112, 72.907984],
  //             [19.065525, 72.916565],
  //             [19.060009, 72.876063]
  //           ]).addTo(this.map);
  //           this.map.setZoom(14);
  //         } else if (ele.polydata.properties.shape == 'Rectangle') {
  //           this.polyRectangle = L.rectangle([
  //             [19.045527, 72.902422],
  //             [19.045527, 72.905597],
  //             [19.049482, 72.905597],
  //             [19.049482, 72.902422],
  //             [19.045527, 72.902422]
  //           ], { color: "#ff7800", weight: 1 }).addTo(this.map);
  //           this.map.setZoom(14);

  //         } else {
  //           this.polyline = L.polyline([
  //             [19.045568, 72.894765],
  //             [19.046055, 72.898672],
  //             [19.045933, 72.901742]
  //           ]).addTo(this.map);
  //           this.map.setZoom(14);
  //         }
  //     }
  //   });
  // }



  basemapfunc() {
    this.dataShareSub = this.datashare.currentMessage.subscribe((val: any) => {
      if (val instanceof Array) {
        val.forEach((map) => {
          let outerThis = this;
          if (map.name === "Terrain") {
            this.map.eachLayer(function (layer) {
              outerThis.map.removeLayer(layer);
            });
            this.googleMutant.gridLayer.googleMutant({
              maxZoom: 18,
              type: 'terrain'
            }).addTo(this.map);
          } else if (map.name === "Satellite") {
            this.map.eachLayer(function (layer) {
              outerThis.map.removeLayer(layer);
            });
            this.googleMutant.gridLayer.googleMutant({
              maxZoom: 18,
              type: 'hybrid'
            }).addTo(this.map);
          } else if (map.name === "Streets Gray Scale") {
            this.map.eachLayer(function (layer) {
              outerThis.map.removeLayer(layer);
            });
            this.googleMutant.gridLayer.googleMutant({
              type: 'roadmap',
              maxZoom: 18,
              styles: [{
                "stylers": [{
                  "saturation": -100
                }]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                  "visibility": "on"
                }]
              }
              ]
            }).addTo(this.map);
          } else if (map.name === "Streets Night") {
            this.map.eachLayer(function (layer) {
              outerThis.map.removeLayer(layer);
            });
            this.googleMutant.gridLayer.googleMutant({
              type: 'roadmap',
              maxZoom: 18,
              styles: [{
                "elementType": "geometry",
                "stylers": [{
                  "color": "#242f3e"
                }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#746855"
                }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#242f3e"
                }]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#79473d"
                }]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "visibility": "on"
                }]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#d59563"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                  "visibility": "on"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#d59563"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#263c3f"
                }]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#6b9a76"
                }]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#38414e"
                }]
              },
              {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#212a37"
                }]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#9ca5b3"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#746855"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                  "color": "#1f2835"
                }]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#f3d19c"
                }]
              },
              {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#2f3948"
                }]
              },
              {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#d59563"
                }]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                  "color": "#17263c"
                }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#515c6d"
                }]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [{
                  "color": "#17263c"
                }]
              }
              ]
            }).addTo(this.map);
          } else if (map.name === "Streets Colored") {
            this.map.eachLayer(function (layer) {
              outerThis.map.removeLayer(layer);
            });
            this.googleMutant.gridLayer.googleMutant({
              maxZoom: 18,
              type: 'roadmap',
            }).addTo(this.map);
          }
        });
      }
      if (val.length === 0) {
        this.googleMutant.gridLayer.googleMutant({
          maxZoom: 18,
          type: 'roadmap',
        }).addTo(this.map);
      }

    });
  }

  nodesAndboundariesCall() {
    window['maps'] = this.map;
    let wMap = window['maps'];
    let paramdata = {
      map: this.map,
      targetElementSpiderView: this.target
    }
    //ADD LAYER FROM MACRO

    // this.nodesAndBoundariesManagerService.initialializeNodesAndBoundaries(paramdata)

    //REMOVE LAYER FROM MACRO
    //this.nodesAndBoundariesManagerService.removeCanvasFromMap();
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
  }

}
