import { LogicaltopologyMultiSpiderViewComponent } from './logicaltopology-multi-spider-view/logicaltopology-multi-spider-view.component';
import { Observable } from 'rxjs';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'underscore';
import * as createjs from 'createjs-module';
import * as preloadjs from 'preload-js';


interface DataObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class LogicaltopologyService {

  public ref;
  public map;
  public lib;
  public theMarker;
  public sitesValArr;
  public arrayOfSites: any = [];
  public siteData;
  public container;
  public _simplePopup;
  public _points;
  public pixelRatio: number = window.devicePixelRatio || 1;
  public hightlightCell: string;
  public selectionContainer: DataObject;
  public addtionalsector;
  public _scaleMatrix;
  public stage;
  public _bounds;
  public zoomLevel;
  public mainlayerRef;
  public _assetQueue = null;
  public _colors = ['#757584', '#0070DB', '#92D050', '#8C6900', '#0D47A1', '#006838', '#00506A', '#00ADEE', '#5900B2',];
  // public _siteImagePath = 'assets/images/Layers/planned-small-cell/';
  // public _plannedSiteImageManifest = [{
  //   id: 'smallcellpetal',
  //   src: this._siteImagePath + 'plannedwhite.svg',
  //   type: createjs.LoadQueue.IMAGE
  // }]

  public _siteImagePath = 'assets/images/Layers/ip-topology/Equipment/';

  public _plannedSiteImageManifest = [
    {
      id: 'ont',
      src: this._siteImagePath + 'icon-22.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'olt',
      src: this._siteImagePath + 'icon-23.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'l2-switch',
      src: this._siteImagePath + 'icon-20.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'otb',
      src: this._siteImagePath + 'icon-21.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'ag1-router',
      src: this._siteImagePath + 'icon-19.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'splitter-1',
      src: this._siteImagePath + 'icon-16.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'splitter-2',
      src: this._siteImagePath + 'icon-15.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'others',
      src: this._siteImagePath + 'icon-24.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'css-router',
      src: this._siteImagePath + 'icon-18.svg',
      type: createjs.LoadQueue.IMAGE
    },
    {
      id: 'all-device',
      src: this._siteImagePath + 'icon-14.svg',
      type: createjs.LoadQueue.IMAGE
    },
  ]

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    this.lib = leaflayer();
    this.redrawLayer();

    this.getJSON().subscribe(data => {
      this.sitesValArr = data;
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/data/layers/iptopology/iptopology.json");
    // return this.http.get("assets/data/layers/plannedSmallCell/sites-smallCellPlanned.json");
  }

  redrawLayer() {
    setTimeout(() => {
      this.draw();
    }, 1000);
  }

  public draw = function () {
    const componentRef = this.componentRef = this;
    this.map = this.shapeService.mapServiceData;
    this.siteData = this.sitesValArr;

    let canvasLayer = this.lib.customLayer({
      container: document.createElement("canvas"),
      zooms: [0, 18],
      opacity: 1,
      visible: true,
      zIndex: 120,
      alwaysRender: true
    });

    canvasLayer.on("layer-beforemount", function () { });

    canvasLayer.on("layer-mounted", function () { });

    canvasLayer.on("layer-render", function () {

      let customLayerThis: any = this;
      componentRef.sitesSmallCell4GLayerMap(customLayerThis);

    });

    canvasLayer.on("layer-beforedestroy", function () { });

    canvasLayer.on("layer-destroyed", function () { });

    this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

      this.selectedLayerArrList = val;
      canvasLayer.remove(this.map);

      for (let index = 0; index < this.selectedLayerArrList.length; index++) {
        const ele = this.selectedLayerArrList[index];
        if (ele.link == "JCP/Layers/Topologies/Fibre/LogicalTopology/Planned") {
          return canvasLayer.addTo(this.map);
        }
      }
    });
  }

  sitesSmallCell4GLayerMap(itemSitesMap) {
    let canvasElement = this.resizeContainer(itemSitesMap);
    this.siteData = this.sitesValArr.sites;

    let _pixelRatio: number = window.devicePixelRatio || 1;

    if (typeof (this.siteData) === 'object' && this.siteData !== undefined) {
      //STAGE
      this.container = new createjs.Container();
      //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
      this.stage = new createjs.Stage(canvasElement);

      createjs.Ticker.addEventListener("tick", this.stage);

      this.stage.enableDOMEvents(true);
      this.stage.enableMouseOver(50);

      //POPUP
      this._simplePopup = this.getPopup();

      // CREATED ARRAYS BASED ON SITE NUMBER (BANDS) E.G. SITE850 ETC.

      // let site2300 = this.siteData.site

      // //COMBINING THE ARRAY
      // let flatten = _.flatten([site2300], true);

      //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
      let data = this.siteData;
      // this._points = this.siteData.site;
      this.zoomLevel = itemSitesMap._zoom;

      // let scaleMatrix = (this.zoomLevel <= 7) ? 0.03 : (this.zoomLevel <= 10) ? 0.08 : (this.zoomLevel <= 13) ? 0.15 : (this.zoomLevel <= 15) ? 0.25 : (this.zoomLevel <= 16) ? 0.35 : 0.40;
      let scaleMatrix = (this.zoomLevel <= 7) ? 0.40 : (this.zoomLevel <= 10) ? 0.50 : (this.zoomLevel <= 13) ? 0.75 : (this.zoomLevel <= 15) ? 0.50 : 0.75;
      scaleMatrix = scaleMatrix * this.pixelRatio;
      this._scaleMatrix = scaleMatrix;
      let pointOffset = L.point(0, -(scaleMatrix * 60) / this.pixelRatio);

      //POP CONFIG
      this._simplePopup.options.offset = pointOffset;
      //EMPTY THE CANVAS
      this.container.removeAllChildren();

      //CENTER DOT OF THE SHAPE

      let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);
      let bounds = this.map.getBounds();

      let preload = new preloadjs.LoadQueue(true);
      preload.loadManifest(this._plannedSiteImageManifest, true);

      let linesContainer = new createjs.Container();
      let nodesContainer = new createjs.Container();

      var length = data.length;

      // for (const site in data) {
      for (var i = 0; i < length; i++) {
        let d = data[i];

        let connectivity = d.connectivity;
        let latlng = L.latLng(d.latitude, d.longitude);

        // PLACING THE COORDINATES
        if (!(bounds.contains(latlng))) continue;
        let dot = this.map.latLngToContainerPoint(latlng);
        let centerPoint = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        }

        let nodeContainer = new createjs.Container();
        nodeContainer.x = centerPoint.x;
        nodeContainer.y = centerPoint.y;
        nodeContainer.scaleX = scaleMatrix;
        nodeContainer.scaleY = scaleMatrix;
        nodeContainer.name = d.neId;
        nodeContainer.mouseChildren = false;
        // nodeContainer.shadow = shadow;
        nodeContainer.cursor = 'pointer';
        nodeContainer['latlng'] = latlng;
        nodeContainer['data'] = d;
        nodeContainer.alpha = 1;

        let color = this._colors[0];

        if (d.nodeType) {
          switch (d.nodeType) {
            case 'NONEPC':
              color = this._colors[1];
              break;
            case 'EPC':
              color = this._colors[2];
              break;
            case 'SUPERCORE':
              color = this._colors[3];
              break;
            case 'ATP11_B':
              color = this._colors[4];
              break;
            case 'SCFT':
              color = this._colors[5];
              break;
            case 'EMF':
              color = this._colors[6];
              break;
            case 'HOTO':
              color = this._colors[7];
              break;
            default:
              color = this._colors[0];
          }
        }

        this._assetQueue = new createjs.LoadQueue(false, null, true);
        this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);

        let min = 8,
          max = 18;
        let rDeviceCircle = (Math.floor(Math.random() * (max - min) + min));
        let stageCircleGraphic = this.getCircleGraphics(color, rDeviceCircle);
        let stageCircleShape = new createjs.Shape(stageCircleGraphic);
        nodeContainer.addChild(stageCircleShape);

        let lineShape;

        for (let links in connectivity) {
          let linksdata = connectivity[links].target;
          let linklatlng = L.latLng(linksdata.latitude, linksdata.longitude);
          let linksdot = this.map.latLngToContainerPoint(linklatlng);
          let LinksPoint = {
            x: linksdot.x * this.pixelRatio,
            y: linksdot.y * this.pixelRatio
          };
          let lineColor = "#FB5246";

          lineShape = new createjs.Shape(this.iptopolinks(LinksPoint, lineColor, centerPoint));
          lineShape.cursor = 'pointer';

          lineShape.addEventListener('mouseover', function (evt: any) {

            let target = evt.target;
            target.graphics.strokeWidthCommand.width = scaleMatrix * 3;
            target.graphics.strokeColorCommand.style = '#1e88e5';
          });

          lineShape.addEventListener('mouseout', function (evt: any) {
            let target = evt.target;
            target.graphics.strokeWidthCommand.width = scaleMatrix;
            target.graphics.strokeColorCommand.style = '#41b021';
          });
          lineShape.addEventListener('click', function (evt: any) {

          })
          linesContainer.addChild(lineShape);
        }

        console.log(this.zoomLevel, "this.zoomLevel");

        if (this.zoomLevel >= 9) {
          nodeContainer.removeChild(stageCircleShape);
          linesContainer.removeChild(lineShape);

          for (let device in connectivity) {
            const ele = connectivity[device].target;
            let id;

            let drawRoundRectGraphic = this.drawRoundRect(scaleMatrix, ele.color);
            let drawRoundRectShape = new createjs.Shape(drawRoundRectGraphic);
            drawRoundRectShape.scaleX = scaleMatrix;
            drawRoundRectShape.scaleY = scaleMatrix;
            drawRoundRectShape.regX = 28;
            drawRoundRectShape.regY = 30;
            drawRoundRectShape.shadow = shadow;
            nodeContainer.addChild(drawRoundRectShape);


            if (connectivity.length > 1) {
              id = "all-device";
              // nodeContainer.removeChild(drawRoundRectShape);
              // let allDeviceCircleGraphic = this.getCircleGraphics(color, 40);
              // let allDeviceCircleShape = new createjs.Shape(allDeviceCircleGraphic);
              // nodeContainer.addChild(allDeviceCircleShape);
              preload.on('complete', (event) => {
                let payLoad = {
                  preload: preload,
                  latlng: latlng,
                  data: d,
                  // cell: bandInner,
                  nodeContainer: nodeContainer,
                  id: id
                };

                let nodeImage = new createjs.Bitmap(payLoad.preload.getResult(payLoad.id));
                nodeImage.scaleX = scaleMatrix;
                nodeImage.scaleY = scaleMatrix;
                nodeImage.regX = 20;
                nodeImage.regY = 20;
                // nodeImage.style = 20;
                // nodeImage.rotation = angle;
                nodeImage['latlng'] = payLoad.latlng;
                nodeImage['data'] = payLoad.data;
                // siteImage['current'] = payLoad.cell;
                payLoad.nodeContainer.addChild(nodeImage);

              });

            } else {
              // nodeContainer.removeChild(allDeviceCircleShape);
              if (ele.device == "CSS Router") {
                id = "css-router";
              }
              else if (ele.device == "L2 Switch") {
                id = "l2-switch";
              }
              else if (ele.device == "OLT") {
                id = "olt";
              }
              else if (ele.device == "ONT") {
                id = "ont";
              }
              else if (ele.device == "OTB") {
                id = "otb";
              }
              else if (ele.device == "AG1 Router") {
                id = "ag1-router";
              }
              else if (ele.device == "Splitter 1") {
                id = "splitter-1";
              }
              else if (ele.device == "Splitter 2") {
                id = "splitter-2";
              }
              else if (ele.device == "Others") {
                id = "others";
              }

              preload.on('complete', (event) => {
                let payLoad = {
                  preload: preload,
                  latlng: latlng,
                  data: d,
                  // cell: bandInner,
                  nodeContainer: nodeContainer,
                  id: id
                };

                let nodeImage = new createjs.Bitmap(payLoad.preload.getResult(payLoad.id));
                nodeImage.scaleX = scaleMatrix;
                nodeImage.scaleY = scaleMatrix;
                nodeImage.regX = 20;
                nodeImage.regY = 20;
                // nodeImage.style = 20;
                // nodeImage.rotation = angle;
                nodeImage['latlng'] = payLoad.latlng;
                nodeImage['data'] = payLoad.data;
                // siteImage['current'] = payLoad.cell;
                payLoad.nodeContainer.addChild(nodeImage);

              });

            }

            // let linksdata = connectivity[device].target;
            let linklatlng = L.latLng(ele.latitude, ele.longitude);
            let linksdot = this.map.latLngToContainerPoint(linklatlng);
            let LinksPoint = {
              x: linksdot.x * this.pixelRatio,
              y: linksdot.y * this.pixelRatio
            };

            let lineColor = "#41b021";

            let lineShapeDevice = new createjs.Shape(this.iptopolinks(LinksPoint, lineColor, centerPoint));
            lineShapeDevice.cursor = 'pointer';

            lineShapeDevice.addEventListener('mouseover', function (evt: any) {

              let target = evt.target;
              target.graphics.strokeWidthCommand.width = scaleMatrix * 3;
              target.graphics.strokeColorCommand.style = '#1e88e5';
            });

            lineShapeDevice.addEventListener('mouseout', function (evt: any) {
              let target = evt.target;
              target.graphics.strokeWidthCommand.width = scaleMatrix;
              target.graphics.strokeColorCommand.style = '#41b021';
            });
            lineShapeDevice.addEventListener('click', function (evt: any) {

            })
            linesContainer.addChild(lineShapeDevice);

          }
          console.log(d, "d");

          let label = new createjs.Text(d.neId, "bold 14px Lato-Medium", "#FFFFFF");
          label.textAlign = 'center';
          label.x = (scaleMatrix * 20) / this.pixelRatio;
          label.y = (scaleMatrix * 120) / this.pixelRatio;
          let outline = label.clone();
          outline.shadow = shadow;
          outline.color = '#000000';
          nodeContainer.addChild(label, outline);

          nodeContainer.on("click", (event: any) => {
            if (event.target.data.connectivity.length > 1) {
              this.spiderViewFeature(event, this.ref, this.mainlayerRef)
            }
          });


        }

        bounds.extend(latlng);
        nodesContainer.addChild(nodeContainer, linesContainer);
      }
      this.container.addChild(nodesContainer);
      //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
      this.stage.addChild(this.container);
      this._bounds = bounds;
      this.container.alpha = 1;
      this.stage.update();
    }
  }

  getReference(ref) {
    this.mainlayerRef = ref;
  }

  private spiderViewFeature(event, ref, mainlayer) {
    const layer = event.target;
    mainlayer.map.setView(layer.latlng, 14);
    let data = {
      ref: mainlayer
    }

    if (event.target.color == "white") return false;
    let biggerNodeData = {};
    biggerNodeData['currentbands'] = event.target.data;
    biggerNodeData['mainlayer'] = mainlayer;
    biggerNodeData['eventData'] = event;
    if (this.datashare) {
      this.datashare.changesmallCellPlanned(biggerNodeData);
    }
    else {
      throw new Error("Data sharing service not found. Please add one.");
    }

    if (this.componentFactoryResolver) {
      let spiderComponent = this.componentFactoryResolver.resolveComponentFactory(LogicaltopologyMultiSpiderViewComponent);
      mainlayer.target.createComponent(spiderComponent);
    }
    else {
      throw new Error("Dynamic component loader not found. Please include resolveComponentFactory module from the ng core.");
    }
  }

  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const img: HTMLImageElement = new Image();
      img.onload = (evt => res(img));
      img.onerror = (() => rej("failed to load " + url));
      img.src = url; // start loading
    });
  }

  getPopup() {
    let popup = L.popup({
      className: 'leaflet-simple-popup',
      minWidth: 120,
      offset: L.point(0, -40),
      closeButton: false
    });
    return popup;
  }

  resizeContainer = function (customeLayerThisRef) {
    let canvas = customeLayerThisRef.getContainer();
    let m = L.Browser.retina ? 2 : 1;

    let size = customeLayerThisRef._bounds.getSize();//resize

    let padding = customeLayerThisRef._padding;
    canvas.width = m * size.x;
    canvas.height = m * size.y;
    canvas.style.width = size.x + "px";
    canvas.style.height = size.y + "px";
    return canvas;
  };

  getCircleGraphics(color, matrix) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(color);
    g.beginFill(color);
    g.drawCircle(0, 0, matrix);
    return g;
  };

  drawRoundRect(matrix, color) {

    let g = new createjs.Graphics();
    // g.beginStroke("red")
    g.beginFill(color)
    g.drawRoundRect(0, 0, 80, 80, 10);
    return g;

  };

  getSelectionGraphics(strokecolor, color, matrix) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(2);
    g.setStrokeDash([5, 5]);
    g.beginStroke(strokecolor);
    g.beginFill(color);
    g.drawCircle(0, 0, matrix);
    return g;
  };


  iptopolinks(LinksPoints, lineColors, centerPoints) {
    let g: any = new createjs.Graphics();
    let strokeWidthCommand = g.setStrokeStyle(2).command;
    // let strokeWidthCommand = g.setStrokeStyle(this._scaleMatrix).command;
    g.strokeWidthCommand = strokeWidthCommand;
    let strokeColorCommand = g.beginStroke(lineColors).command;
    g.strokeColorCommand = strokeColorCommand;
    // g.strokeWeight(4);
    g.setStrokeDash([5, 5]);
    g.moveTo(LinksPoints.x, LinksPoints.y);
    g.lineTo(centerPoints.x, centerPoints.y);
    g.closePath();
    g.endFill();

    return g;
  };


  removeLayer() {
    let stage = this.stage;
    stage.removeChild(this.container);
    // stage.removeEventListener('canvasLayerChanged', this.reloadLayer);
    stage.update();
  };

}
