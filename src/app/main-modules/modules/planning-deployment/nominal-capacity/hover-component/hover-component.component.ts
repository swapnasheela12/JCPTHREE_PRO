import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import * as createjs from 'createjs-module';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { NpCreatePopupDialogModel, NpCreatePopupComponent } from '../np-create-popup/np-create-popup.component';

@Component({
  selector: 'app-hover-component',
  templateUrl: './hover-component.component.html',
  styleUrls: ['./hover-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HoverComponentComponent implements AfterViewInit {
  
  routeFibreCoreLayer: any;
  routeFibreCoreLayerContainer: any;
  map: any;
  canvasCore: any;
  ctxCore: any;
  canvasLayer: HTMLElement;
  stageRouteContainer: createjs.Stage;
  routePlannedData: Object;
  routeReadyFibreCoreSubscription: Subscription;
  fibreData: void;
  positionLatLng: any;
  pixelRatio: any;
  linksDot: any;
  linksCenterPoint: { x: number; y: number; };
  scaleMatrix: number;
  zoomLevel: any;
  lineShape: any;
  lineShapeArray: [];
  lineStrokeWidth: any;
  graphicsStroke: any;
  strokeWidthCommand: any;
  strokeColorCommand: void;
  lineColors: string;
  allLinePoints: any = [];
  polyGraphic: createjs.Graphics;
  drawPolyGraphic: createjs.Graphics;
  lineContainer: createjs.Container;
  drawCircleGraphic: any;
  circleGraphic: any;
  innercircleGraphic: any;
  circleCountShape: any;
  innercircleShape: any;
  textContainer: any;
  circleCountClone: any;
  labelCount: any;
  textContainerBoundary: createjs.Container;
  centerBoundaryLatLng: L.LatLng;
  centerBoundaryDot: any;
  centerCenterPoint: { x: any; y: any; };
  labelCountBoundary: createjs.Text;
  positionCololatedLatLng: L.LatLng;
  colocatedLinkDot: any;
  colocatedLinksCenterPoint: { x: number; y: number; };
  allPoints = [];
  allPoints1 = [];
  targetLinksCenterPoint:any;

  ref: this;
  mainLayerRef: {};
  structureData: any = [
    {
      name: 'Structure',
      value: 5,
      color: '#03A9F4',
      font: 'icomoon',
      fontvalue: '\uec84',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I164'
    },
    {
      name: 'Logical Connectivity',
      value: 5,
      color: '#03A9F4',
      font: 'icomoon',
      fontvalue: '\uec82',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I174'
    }
  ];
  structureColocatedData: any = [
    {
      name: 'Properties',
      value: 5,
      color: '#8CC63F',
       font: 'icomoon',
      fontvalue: '\uec6b',
      frequency: 0.01492,
      eventname: 'sites-tree-properties',
      radiuscircle: 200,
      deviceType: [
        {
        device: "AG3",
        color: "#94C65A",
         font: 'icomoon',
        fontvalue: '\uec6c',
        value: 5,
        },
        {
          device: "AG2+ONT",
          color: "#94C65A",
           font: 'icomoon',
          fontvalue: '\uec6d',
          value: 5,
        },
        {
          device: "eNodeB",
          color: "#94C65A",
           font: 'icomoon',
          fontvalue: '\uec6f',
          value: 5,
        },
        {
          device: "Fiber-Pop",
          color: "#94C65A",
           font: 'icomoon',
          fontvalue: '\uec70',
          value: 5,
        },
        {
          device: "ILA",
          color: "#03A9F4",
           font: 'icomoon',
          fontvalue: '\uec71',
          value: 5,
        },
        {
          device: "Manhole",
          color: "#03A9F4",
           font: 'icomoon',
          fontvalue: '\uec72',
          value: 5,
        },
        {
          device: "OSC",
          color: "#94C65A",
           font: 'icomoon',
          fontvalue: '\uec73',
          value: 5,
        },
        {
          device: "Pole",
          color: "#94C65A",
           font: 'icomoon',
          fontvalue: '\uec74',
          value: 5,
        },
        {
          device: "ISC",
          color: "#03A9F4",
           font: 'icomoon',
          fontvalue: '\uec87',
          value: 5,
        }
        ],
    },
    {
        name: 'Create Workorder',
        value: 5,
        color: '#8dc63f',
        font: 'icomoon',
        fontvalue: '\uec6a',
        disabled: true,
        frequency: 0.02782,
        radiuscircle: 100,
        eventname: 'sites-tree-createworkorder',
        deviceType: [
          {
            device: "AG1",
            color: "#94C65A",
               font: 'icomoon',
            fontvalue: '\uec6a',
            value: 5,
          },
          {
            device: "SAG2",
            color: "#94C65A",
            font: 'icomoon',
            fontvalue: '\uec75',
            value: 5,
          },
          // {
          //   device: "OLT",
          //   color: "#94C65A",
          //      font: 'icomoon',
          //   fontvalue: '\uec6a',
          //   value: 5,
          // },
          {
            device: "Pole",
            color: "#94C65A",
             font: 'icomoon',
            fontvalue: '\uec74',
            value: 5,
          },
          {
            device: "Others",
            color: "#03A9F4",
               font: 'icomoon',
            fontvalue: '\uec85',
            value: 5,
          },
          {
            device: "IBS",
            color: "#94C65A",
             font: 'icomoon',
            fontvalue: '\uec86',
            value: 5,
          }
        ],
    }
  ];
  
  siteImagePetal: createjs.Bitmap;
  structureContainerEach: createjs.Container;
  structureImage: createjs.Bitmap;
  structurePopup: any;
  structureImageText: any;
  clonedArray: any[];
  mapSix: L.Map;
  connectionLinks: createjs.Graphics;

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HoverComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('StructurePlannedFibreCoreComponent' == removeLayer) {
          let removeLayer = {'parentToChild': 'Logical-Connectivity', 'child': 'Topologies-Structure-Planned'};
          this.dataShare.removeExtraLayer(removeLayer);
          this.removeLayer();
        }
      }
    );
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
      }
    )
  }

  ngAfterViewInit() {
    this.initMapSite();
    this.pixelRatio = window.devicePixelRatio || 1;
    this.structurePopup = this.getPopup();

    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    this.mapSix.setView(this.data.latlng, this.data.zoom);
    let outerThis = this;

    this.routeFibreCoreLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.routePlannedData = data;
        that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(
          that.routeFibreCoreLayerContainer,
          that._zoom,
          this.routePlannedData,
          componentRef,
          that._assetQueue
        );
      });
    });

    this.routeFibreCoreLayer.addTo(this.mapSix);
  }

  getRouteData() {
    return this.http.get("assets/data/layers/nominal-capacity/macro-layer.json");
  }

  getPopup() {
    let popup = L.popup({
      className: 'leaflet-fibre-tooltip',
      minWidth: 120,
      offset: L.point(0, 0),
      closeButton: false
    });
    return popup;
  }

  resizeContainer() {
    this.canvasCore = this.routeFibreCoreLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.routeFibreCoreLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer, routeQueue) {
    this.lineColors = 'red';
    this.allLinePoints = [];
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.stageRouteContainer) {
      this.stageRouteContainer.removeAllChildren();
      this.stageRouteContainer.update();
    }
    this.stageRouteContainer = new createjs.Stage(container);
    this.stageRouteContainer.enableDOMEvents(true);
    this.stageRouteContainer.enableMouseOver(50000);
    this.stageRouteContainer.removeAllChildren();
    this._assetQueue = new createjs.LoadQueue(false, null, true);
    this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
    this.structureContainer1 = new createjs.Container();
    this.structureContainer = new createjs.Container();
    let connection = routePlannedData[0].connectivity;
    let line = [];
    for (let j = 0; j < connection.length; j++) {
      this.drawStructureImage(
        this.structureContainer,
        connection[j]
      )
      line.push(connection[j])
    }

    this.positionLatLng = L.latLng(
      line[0].latlng[0],
      line[0].latlng[1]
    );

    this.linksDot = this.mapSix.latLngToContainerPoint(this.positionLatLng);
    this.linksCenterPoint = {
      x: this.linksDot.x * this.pixelRatio,
      y: this.linksDot.y * this.pixelRatio
    };
    this.targetLatLng = L.latLng(
      line[1].latlng[0],
      line[1].latlng[1]
    );

    this.targetLinksDot = this.mapSix.latLngToContainerPoint(this.targetLatLng);
    this.targetLinksCenterPoint = {
      x: this.targetLinksDot.x * this.pixelRatio,
      y: this.targetLinksDot.y * this.pixelRatio
    };

    this.lineConnectionContainer = new createjs.Container();
    this.ConnectionLinkShape = new createjs.Shape(
      this.lineCreation(this.linksCenterPoint, this.targetLinksCenterPoint)
    );
    this.ConnectionLinkShape.cursor = 'pointer';
    this.ConnectionLinkShape['latLng'] = this.positionLatLng;
    this.lineConnectionContainer.addChild(
      this.ConnectionLinkShape
    );

    this.structureContainer1.addChild(this.lineConnectionContainer, this.structureContainer);
 
    this.stageRouteContainer.addChild(this.structureContainer1);
    this.stageRouteContainer.update();
  }

  drawStructureImage(structureContainer, structureData) {
    let imagePath = '';
    imagePath = 'assets/images/Layers/topologies/structure/'+structureData.type+'.svg';
    this.positionLatLng = L.latLng(
      structureData.latlng[0],
      structureData.latlng[1]
    );

    this.linksDot = this.mapSix.latLngToContainerPoint(this.positionLatLng);
    this.linksCenterPoint = {
      x: this.linksDot.x * this.pixelRatio,
      y: this.linksDot.y * this.pixelRatio
    };

    this.structureContainerEach = new createjs.Container();
    this.structureContainerEach.cursor = 'pointer';
    this.structureContainerEach.x = this.linksCenterPoint.x;
    this.structureContainerEach.y = this.linksCenterPoint.y;
    this.structureContainerEach.scaleX = this.scaleMatrix;
    this.structureContainerEach.scaleY = this.scaleMatrix;

    this.structureImage = new createjs.Bitmap(imagePath);
    this.structureImage.regX = 10;
    this.structureImage.regY = 30;
    this.structureImage.scaleX = 1.0;
    this.structureImage.scaleY = 1.0;
    this.structureImage['latlng'] = this.positionLatLng;
    this.structureImage['data'] = structureData;
    let outerthis = this;

    this.structureImage.image.onload = function () {
      let dot = L.point(((outerthis.linksCenterPoint.x+outerthis.targetLinksCenterPoint.x)/2 * outerthis.pixelRatio), ((outerthis.linksCenterPoint.y+outerthis.targetLinksCenterPoint.y)/2 * outerthis.pixelRatio));
      let latlng = outerthis.mapSix.containerPointToLatLng(dot);
      let template =
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Sector:</span>' +
        '<span class="value">789</span></div>';
      outerthis.structurePopup.setLatLng(latlng).setContent(template).openOn(outerthis.mapSix);
      outerthis.stageRouteContainer.update();
    }
    this.structureImage.on('click', function (event) {
      const dialogData = new NpCreatePopupDialogModel();
      const dialogRef = outerthis.dialog.open(NpCreatePopupComponent, {
        data: dialogData, 
        width: '500px',
        height: '200px',
        panelClass: 'np-create-popup-dialog'
      });
  });

    this.structureImageText = new createjs.Text(structureData.sapid, "15px Lato Bold", "#000000");
    this.structureImageText.textAlign = 'center';
    this.structureImageText.textBaseLine = 'middle';
    this.structureImageText.y = 50;


    this.structureContainerEach.addChild(this.structureImage, this.structureImageText);
    structureContainer.addChild(this.structureContainerEach);
  }

  removeLayer() {
    if (undefined != this.routeFibreCoreLayer) {
      this.mapSix.removeLayer(this.routeFibreCoreLayer)
    }
  }

  private initMapSite(): void {
    let _that = this;
    this.mapSix = L.map('map11', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      opacity:0
    });
    tiles.addTo(this.mapSix);    
    this.shapeService.mapServiceData = this.mapSix;
  }
  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }
 
  lineCreation(centerpoint, linksCenterPoint) {
    this.connectionLinks = new createjs.Graphics();
    this.lineStrokeWidth = 0.3 * 4;
    this.connectionLinks.setStrokeDash([5, 3], 0);
    this.connectionLinks.beginStroke('#1278D7');
    this.connectionLinks.moveTo(centerpoint.x, centerpoint.y);
    this.connectionLinks.lineTo(linksCenterPoint.x, linksCenterPoint.y)
    this.connectionLinks.endStroke();
    this.connectionLinks.closePath();

    return this.connectionLinks;
  }

  onClick() {
    this.dialogRef.close();

  }

}
