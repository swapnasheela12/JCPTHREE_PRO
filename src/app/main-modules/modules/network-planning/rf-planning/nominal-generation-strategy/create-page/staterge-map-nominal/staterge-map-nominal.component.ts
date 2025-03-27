import { SmallCellPlannedSpiderViewComponent } from './../../../../../../main-layer/layer-list/sites/planned/small-cell-planned/small-cell-planned-spider-view/small-cell-planned-spider-view.component';
import { Observable } from 'rxjs';
import { ShapeService } from './../../../../../../main-layer/layers-services/shape.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from './../../../../../../../_services/data-sharing.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import * as _ from 'underscore';
import * as L from 'leaflet';
import * as createjs from 'createjs-module';
import * as preloadjs from 'preload-js';

interface DataObject {
  [key: string]: any;
}

@Component({
  selector: 'app-staterge-map-nominal',
  templateUrl: './staterge-map-nominal.component.html',
  styleUrls: ['./staterge-map-nominal.component.scss']
})
export class StatergeMapNominalComponent implements OnInit {
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
  public scaleMatrix;
  public stage;
  public _bounds;
  public zoomLevel;
  public mainlayerRef;
  public _assetQueue = null;
  public _colors = ['#757584', '#92D050', '#8C6900', '#006838', '#00506A', '#00ADEE', '#5900B2', '#0D47A1'];
  public _siteImagePath = 'assets/images/Layers/planned-small-cell/';
  public _plannedSiteImageManifest = [{
    id: 'smallcellpetal',
    src: this._siteImagePath + 'plannedwhite.svg',
    type: createjs.LoadQueue.IMAGE
  }];
  public _hightlightCell = null;
  public _selectionContainer = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog, private shapeService: ShapeService,) {
    this.ref = this;
    this.lib = leaflayer();
    this.redrawLayer();

    this.getJSON().subscribe(data => {
      this.sitesValArr = data;
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get("assets/data/modules/network-planning/staterge-map-nominal/staterge-map-nominal.json");
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

    canvasLayer.addTo(this.map);

    // this.dataShareSub = this.datashare.currentMessage.subscribe(val => {

    //   this.selectedLayerArrList = val;
    //   // canvasLayer.remove(this.map);
    //   canvasLayer.addTo(this.map);

    //   // for (let index = 0; index < this.selectedLayerArrList.length; index++) {
    //   //   const ele = this.selectedLayerArrList[index];
    //   //   if (ele.link == "JCP/Layers/Planned/smallCell/smallCell4g") {
    //   //     return canvasLayer.addTo(this.map);
    //   //   }
    //   // }
    // });
  }

  sitesSmallCell4GLayerMap(itemSitesMap) {
    let canvasElement = this.resizeContainer(itemSitesMap);
    this.siteData = this.sitesValArr;

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
      console.log(this.siteData, "this.siteData");

      let site2300 = this.siteData.site2300

      //COMBINING THE ARRAY
      let flatten = _.flatten([site2300], true);

      //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
      let data = _.groupBy(flatten, 'sapid');
      // this._points = this.siteData.site;
      this.zoomLevel = itemSitesMap._zoom;

      let scaleMatrix = (this.zoomLevel <= 7) ? 0.03 : (this.zoomLevel <= 10) ? 0.08 : (this.zoomLevel <= 13) ? 0.15 : (this.zoomLevel <= 15) ? 0.25 : (this.zoomLevel <= 16) ? 0.35 : 0.40;
      this.scaleMatrix = scaleMatrix * this.pixelRatio;
      this.scaleMatrix = scaleMatrix;
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

      for (const site in data) {
        let siteInner = data[site];
        
        let latlng = L.latLng(siteInner[0].latitude, siteInner[0].longitude);

        if (!(bounds.contains(latlng))) continue;
        let dot = this.map.latLngToContainerPoint(latlng);
        let centerPoint = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        };

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
          this.container.addChild(this._selectionContainer);
        }

        let siteContainer = new createjs.Container();
        siteContainer.x = centerPoint.x;;
        siteContainer.y = centerPoint.y;;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner[0].sapid;

        for (const band in siteInner) {
          let bandInner = siteInner[band];
          let outerRadius = 75;
          let innerRadius = 15;

          for (const sector in bandInner.siteArray) {
            let sectorInner = bandInner.siteArray[sector];
            let sectorColor;
            if (sectorInner.sectorid == 1) {
              sectorColor = '#00506A'
            } else if (sectorInner.sectorid == 2) {
              sectorColor = '#00506A'
            } else {
              sectorColor = '#00506A'
            }
            //let sectorColor = this.getRandomHex();
            sectorInner.pcicolor = sectorColor;

            let startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
            let endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
            let sectorPie = new createjs.Shape(this.pie(0, 0, startAngle, endAngle, outerRadius, innerRadius, sectorColor, '#000000', 1));
            sectorPie.alpha = 0.8;
            sectorPie.shadow = shadow;
            sectorPie.cursor = 'pointer';
            sectorPie['latlng'] = latlng;
            sectorPie['site'] = site;
            sectorPie['sector'] = sector;
            sectorPie['color'] = sectorColor;
           
            siteContainer.addChild(sectorPie)
          }
        }
        let siteCenterDot = this.getPointGraphics(this.zoomLevel, '#06C1FF');
        let siteDot = new createjs.Shape(siteCenterDot);
        siteDot.shadow = shadow;
        siteDot.cursor = 'pointer';
        siteContainer.addChild(siteDot)

        if (this.zoomLevel >= 15) {

          let label = new createjs.Text(siteInner[0].sapid, "bold 30px RobotoDraft", "#000000");
          label.textAlign = 'center';
          label.y = (scaleMatrix * 450) / this.pixelRatio;
          let outline = label.clone();
          outline.shadow = shadow;
          outline.color = '#000000';
          siteContainer.addChild(label, outline);
        }
        bounds.extend(latlng);
        this.container.addChild(siteContainer);
      }

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
    console.log(event, "event");

    mainlayer.map.setView(layer.latlng, 17);
    let data = {
      ref: mainlayer
    }

    if (event.target.color == "white") return false;
    let biggerNodeData = {};
    biggerNodeData['currentbands'] = event.target.data;
    biggerNodeData['currentcell'] = event.target.current;
    if (this.datashare) {
      this.datashare.changesmallCellPlanned(biggerNodeData);
    }
    else {
      throw new Error("Data sharing service not found. Please add one.");
    }

    if (this.componentFactoryResolver) {
      let spiderComponent = this.componentFactoryResolver.resolveComponentFactory(SmallCellPlannedSpiderViewComponent);
      mainlayer.target.createComponent(spiderComponent);
    }
    else {
      throw new Error("Dynamic component loader not found. Please include resolveComponentFactory module from the ng core.");
    }
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
    g.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.5));
    g.beginFill(color);
    g.drawCircle(0, 0, matrix);
    return g;
  };

  getSelectionGraphics(strokecolor, color) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(5);
    g.beginStroke(strokecolor);
    g.beginFill(color);
    g.drawCircle(0, 0, 90);
    return g;
  };

  pie(pie_x, pie_y, startAngle, endAngle, radius1, radius2, fillColor, lineColor, lineThickness) {
    // this.pie(0, 0, startAngle, endAngle, outerRadius, innerRadius, sectorColor, '#000000', 1)
    let g = new createjs.Graphics();
    g.setStrokeStyle(lineThickness);
    g.beginFill(fillColor);
    g.beginStroke(lineColor);
    g.arc(pie_x, pie_y, radius1, this.toRad(startAngle), this.toRad(endAngle), false);
    g.lineTo(pie_x + Math.cos(this.toRad(endAngle)) * radius2, pie_y + Math.sin(this.toRad(endAngle)) * radius2);
    g.arc(pie_x, pie_y, radius2, this.toRad(endAngle), this.toRad(startAngle), true);
    g.closePath();
    g.endFill();

    return g;
  }

  toRad(angle) {
    return (angle - 90) * Math.PI / 180;
  }

  getPointGraphics(matrix, color) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
    g.beginFill(color);
    g.drawCircle(0, 0, 10);
    return g;
  }

  removeLayer() {
    let stage = this.stage;
    stage.removeChild(this.container);
    // stage.removeEventListener('canvasLayerChanged', this.reloadLayer);
    stage.update();
  };


  ngOnInit(): void {
  }

}
