import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FibreTableViewPopupModel, RouteTableViewComponent } from '../../fibre/route/route-table-view/route-table-view.component';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { FivegCircularSpiderViewComponent } from 'src/app/main-modules/main-layer/fiveg-circular-spider-view/fiveg-circular-spider-view.component';
import { FivegSpiderViewComponent } from 'src/app/main-modules/main-layer/fiveg-spider-view/fiveg-spider-view.component';
import { LogicalConnectivityComponent } from '../../logical-connectivity/logical-connectivity.component';

@Component({
  selector: 'app-structure-planned-fibre-core',
  templateUrl: './structure-planned-fibre-core.component.html',
  styleUrls: ['./structure-planned-fibre-core.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StructurePlannedFibreCoreComponent implements AfterViewInit, OnDestroy {

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

  ref: this;
  mainLayerRef: {};
  structureData: any = [
    {
      name: 'Structure',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I164'
    },
    {
      name: 'Logical Connectivity',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I174'
    }
  ];
  structureColocatedData: any = [
    {
      name: 'Properties',
      value: 5,
      color: '#8CC63F',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf112',
      frequency: 0.01492,
      eventname: 'sites-tree-properties',
      radiuscircle: 200,
      deviceType: [
        {
        device: "css router",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
        },
        {
          device: "L2 Switch",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "AG1 Router",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "OLT",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "Splitter 2",
          color: "#03A9F4",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "OTB",
          color: "#03A9F4",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "L2 Switch",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        },
        {
          device: "AG1 Router",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf112',
          value: 5,
        }
        ],
    },
    {
        name: 'Create Workorder',
        value: 5,
        color: '#8dc63f',
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf222',
        disabled: true,
        frequency: 0.02782,
        radiuscircle: 100,
        eventname: 'sites-tree-createworkorder',
        deviceType: [
          {
            device: "L2 Switch",
            color: "#94C65A",
            font: 'Material-Design-Iconic-Font',
            fontvalue: '\uf222',
            value: 5,
          },
          {
            device: "AG1 Router",
            color: "#94C65A",
            font: 'Material-Design-Iconic-Font',
            fontvalue: '\uf222',
            value: 5,
          },
          // {
          //   device: "OLT",
          //   color: "#94C65A",
          //   font: 'Material-Design-Iconic-Font',
          //   fontvalue: '\uf222',
          //   value: 5,
          // },
          {
            device: "Splitter 2",
            color: "#03A9F4",
            font: 'Material-Design-Iconic-Font',
            fontvalue: '\uf222',
            value: 5,
          },
          {
            device: "OTB",
            color: "#03A9F4",
            font: 'Material-Design-Iconic-Font',
            fontvalue: '\uf222',
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

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog
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
    this.pixelRatio = window.devicePixelRatio || 1;
    this.structurePopup = this.getPopup();

    this.map = this.shapeService.mapServiceData;
    this.routeFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    // this.map.setView(new L.LatLng(15.620236, 73.729269), 9);

    // this.map.setView([26.6966, 77.8908]);
    this.map.setZoom(4);
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

    this.routeFibreCoreLayer.addTo(this.map);
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/structure/structure.json");
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
    this.structureContainer = new createjs.Container();
    for (let j = 0; j < routePlannedData.length; j++) {
      for (let i = 0; i < routePlannedData[j][4].boundary.length; i++) {
        this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
        this.allPoints1["'"+routePlannedData[j][1].rj_r4g_state_name+"'"]= [];
        for (let n in routePlannedData[j][4].boundary[i]) {
          for (let k = 0; k < routePlannedData[j][4].boundary[i][n].length; k++) {
            this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
              routePlannedData[j][4].boundary[i][n][k].latlng[0],
              routePlannedData[j][4].boundary[i][n][k].latlng[1]
            ]);
            this.allPoints1["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
              routePlannedData[j][4].boundary[i][n][k].latlng[0],
              routePlannedData[j][4].boundary[i][n][k].latlng[1],
              routePlannedData[j][4].boundary[i][n][k].sector,
              routePlannedData[j][4].boundary[i][n][k].band,
              routePlannedData[j][4].boundary[i][n][k].cnum,
              routePlannedData[j][4].boundary[i][n][k].sapid,
              routePlannedData[j][4].boundary[i][n][k].type
            ]);
          }
        }
      }
      let eachStatePoints = this.allPoints["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
      var count = {};
      var greaterThanOne = {};

      eachStatePoints.forEach(function(i) {
        count[i] = (count[i]||0) + 1;
        if (count[i] > 1) {
          greaterThanOne[i] = count[i];
        }
      });
      let eachStatePoints1 = this.allPoints1["'"+routePlannedData[j][1].rj_r4g_state_name+"'"];
      var count1 = {};
      var greaterThanOne1 = {};

      eachStatePoints1.forEach(function(i) {
        count1[i] = (count1[i]||0) + 1;
        // if (count[i] > 1) {
          greaterThanOne1[i] = count1[i];
        // }
      });
    }
    let outerContainerThis = this;
    let entries:any = Object.entries(greaterThanOne);
    let entries1:any = Object.entries(greaterThanOne1);
    let data = [];
    for (let g=0; g < entries.length; g++) {
      let splittedArray = entries[g][0].split(',').map(Number);
      for(let l=0; l < entries1.length; l++) {
        let splittedArray1 = entries1[l][0].split(',').map(String);
        if (splittedArray1[0] != splittedArray[0] && splittedArray1[1] != splittedArray[1]) {
          data.push(entries1[l]);
        }
      }
    }
    for (let m=0; m < data.length; m++) {
      this.drawStructureImage(
        this.positionLatLng,
        this.linksCenterPoint,
        this.structureContainer,
        data[m],
        this.imagePath
      );
    }
    for (let g=0; g < entries.length; g++) {
          let splittedArray = entries[g][0].split(',').map(Number);
          this.positionCololatedLatLng = L.latLng({
            lat: splittedArray[0],
            lng: splittedArray[1]
          });
          this.colocatedLinkDot = this.map.latLngToContainerPoint(this.positionCololatedLatLng);
          this.colocatedLinksCenterPoint = {
              x: this.colocatedLinkDot.x * this.pixelRatio,
              y: this.colocatedLinkDot.y * this.pixelRatio
          };
          let colocatedData = [{ sapId: 'I-MU-MUMB_ENB_014', tileName: 'Beta_1800_C1'}];
          this.drawCircularCircle(
            entries[g][1],
            this.structureContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.structureContainer);
    }
    this.stageRouteContainer.addChild(this.structureContainer);
    this.stageRouteContainer.update();
  }

  drawStructureImage(latlng, centerpoint, structureContainer, structureData, imagePath) {
    imagePath = '';
    let structureEachData = structureData[0].split(',').map(String);
    if (this.zoomLevel <= 4) {
      imagePath = 'assets/images/Layers/topologies/structure/AG3.svg';
    } else if (this.zoomLevel > 4 && this.zoomLevel <= 6) {
      if (structureEachData[6] == 'AG2'){
        imagePath = 'assets/images/Layers/topologies/structure/AG2.svg';
      } else {
        imagePath = 'assets/images/Layers/topologies/structure/AG2+OTN.svg';
      }
    } else if (this.zoomLevel > 6 && this.zoomLevel <= 7) {
      imagePath = 'assets/images/Layers/topologies/structure/AG1.svg';
    } else if (this.zoomLevel > 7 && this.zoomLevel <= 11) {
      if (structureEachData[6] == 'SAG2'){
        imagePath = 'assets/images/Layers/topologies/structure/SAG2.svg';
      } else if (structureEachData[6] == 'ILA') {
        imagePath = 'assets/images/Layers/topologies/structure/ILA.svg';
      } else if (structureEachData[6] == 'Pole') {
        imagePath = 'assets/images/Layers/topologies/structure/Pole.svg';
      } else if (structureEachData[6] == 'ManHole') {
        imagePath = 'assets/images/Layers/topologies/structure/ManHole.svg';
      } else if (structureEachData[6] == 'FiberPop') {
        imagePath = 'assets/images/Layers/topologies/structure/FiberPop.svg';
      } else {
        imagePath = 'assets/images/Layers/topologies/structure/AG1.svg';
      }
    } else if (this.zoomLevel > 11) {
      if (structureEachData[6] == 'OSC'){
        imagePath = 'assets/images/Layers/topologies/structure/OSC.svg';
      } else if (structureEachData[6] == 'eNodeB') {
        imagePath = 'assets/images/Layers/topologies/structure/eNodeB.svg';
      } else {
        imagePath = 'assets/images/Layers/topologies/structure/Others.svg';
      }
    }
    this.positionLatLng = L.latLng(
      structureEachData[0],
      structureEachData[1]
    );

    this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
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
    this.structureImage['data'] = structureEachData;
    this.structureImage.image.onload = function () {
      outerthis.stageRouteContainer.update();
    }

    this.structureImageText = new createjs.Text(structureEachData[5], "15px Lato Bold", "#000000");
    this.structureImageText.textAlign = 'center';
    this.structureImageText.textBaseLine = 'middle';
    this.structureImageText.y = 50;

    let outerthis = this;
    this.structureImage.on('mouseover', function (event) {
      let target = event['target'];
      let dot = L.point((event['rawX'] / outerthis.pixelRatio), (event['rawY'] / outerthis.pixelRatio));
      target.latlng = outerthis.map.containerPointToLatLng(dot);
      let template = '';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Sector:</span>' +
        '<span class="value">' + target.data[2] + '</span></div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Band:</span>' +
        '<span class="value">' + target.data[3] + '</span>' +
        '</div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">cNum:</span>' +
        '<span class="value">' + target.data[4] + '</span>' +
        '</div>';
      outerthis.structurePopup.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.structureImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });

    this.structureImage.on('click', function (event) {
      outerthis.routeClicked();
    });

    this.structureContainerEach.addChild(this.structureImage, this.structureImageText);
    structureContainer.addChild(this.structureContainerEach);
  }

  openSpiderCircularPopups(d, ref) {
    let fivegSpiderComponent = ref.componentFactoryResolver.resolveComponentFactory(FivegSpiderViewComponent);
    ref.componentRef = ref.target.createComponent(fivegSpiderComponent);
    let colocatedData = [
      { tileName: d.data.device,
        fontValue: d.data.fontvalue,
        fontFamily: d.data.font,
        color: d.data.color,
        radiusDeviceCircle: '56'}
    ];
    ref.componentRef.instance.colocatedCircleData = colocatedData;
    ref.componentRef.instance.data = this.structureData;
    ref.componentRef.instance.mainRef = this;
    ref.componentRef.instance.mainLayerReference = this.mainLayerRef;
  }

  openSpiderPopups(d, ref) {
    if (d.data.name == 'Structure'){
      const componName = "Route";
      const dialogData = new FibreTableViewPopupModel(componName);
      const dialogRef = this.dialog.open(RouteTableViewComponent, {
        width: "1200px",
        height: "500px",
        position: {
          left: "18.5rem",
          top: "4rem"
        },
        data: dialogData,
        hasBackdrop: false,
        disableClose: false,
        panelClass: "material-dialog-container",
      });
    } else if (d.data.name == 'Logical Connectivity') {
      let extraLayer = {'parentToChild': 'Logical-Connectivity', 'child': 'Topologies-Structure-Planned'};
      this.dataShare.setExtraLayer(extraLayer);
      this.dataShare.countLogicalMessage();
      this.removeLayer();
      let logicalComponent = ref.componentFactoryResolver.resolveComponentFactory(LogicalConnectivityComponent);
      ref.componentRef = ref.target.createComponent(logicalComponent);
    }
  }

  routeClicked() {
    const componName = "Structure";
    const dialogData = new FibreTableViewPopupModel(componName);
    const dialogRef = this.dialog.open(RouteTableViewComponent, {
      width: "1200px",
      height: "500px",
      position: {
        left: "18.5rem",
        top: "4rem"
      },
      data: dialogData,
      hasBackdrop: false,
      disableClose: false,
      panelClass: "material-dialog-container",
    });
  }

  removeLayer() {
    if (undefined != this.routeFibreCoreLayer) {
      this.map.removeLayer(this.routeFibreCoreLayer)
    }
  }

  drawCircularCircle(
    count,
    structureContainer,
    linksCenterPoint,
    mainLayerReference,
    positionCololatedLatLng,
    colocatedData,
    lat,
    lng
  ) {
    this.stageRouteContainer.removeAllChildren();
    this.stageRouteContainer.update();
    this.circleGraphic = this.drawCircleGraphics('#003B7440', 65);
    this.circleCountShape = new createjs.Shape(this.circleGraphic);
    this.circleCountShape.alpha = 0.4;

    this.innercircleGraphic = this.drawCircleGraphics('#003A74', 21);
    this.innercircleShape = new createjs.Shape(this.innercircleGraphic);

    this.textContainer = new createjs.Container();
    this.textContainer.x = linksCenterPoint.x;
    this.textContainer.y = linksCenterPoint.y;
    this.textContainer.latLng = new L.LatLng(
      lat,
      lng
    );

    // Code For colocated Number Display
    // this.labelCount = new createjs.Text(count, "bold 15px RobotoDraft", "#ffffff");
    // this.labelCount.textAlign = 'center';
    // this.labelCount.textBaseLine = 'middle';

    this.labelCount = new createjs.Bitmap('assets/images/Layers/topologies/structure/All.svg');
    this.labelCount.regX = 35;
    this.labelCount.regY = 30;
    this.labelCount.scaleX = 0.4;
    this.labelCount.scaleY = 0.4;
    this.labelCount['latlng'] =  this.textContainer.latLng;

    let outerContainerThis = this;
    this.textContainer.addEventListener('click', function(evt) {
      outerContainerThis.clonedArray = [...outerContainerThis.structureColocatedData];
      outerContainerThis.clonedArray.splice(count, (outerContainerThis.clonedArray.length - count));
      outerContainerThis.map.setView(positionCololatedLatLng);
      outerContainerThis.colocatedStructureClicked(evt, mainLayerReference, colocatedData, outerContainerThis.clonedArray);
    });
    this.textContainer.addChild(this.circleCountShape, this.innercircleShape, this.labelCount);
    structureContainer.addChild(this.textContainer);
    this.stageRouteContainer.update();
  }

  drawCircleGraphics(color, matrix) {
    this.drawCircleGraphic = new createjs.Graphics();
    this.drawCircleGraphic.beginFill(color);
    this.drawCircleGraphic.drawCircle(0, 0, matrix);

    return this.drawCircleGraphic;
  }

  async colocatedStructureClicked(event, mainLayerReference, colocatedData, colocatedSpiderArray) {
    let fivegCircularSpiderComponent = mainLayerReference.componentFactoryResolver.resolveComponentFactory(FivegCircularSpiderViewComponent);
    mainLayerReference.componentRef = mainLayerReference.target.createComponent(fivegCircularSpiderComponent);
    mainLayerReference.componentRef.instance.data = colocatedSpiderArray;
    mainLayerReference.componentRef.instance.colocatedCircularCircleData = colocatedData;
    mainLayerReference.componentRef.instance.mainRef = this;
    mainLayerReference.componentRef.instance.mainLayerReference = mainLayerReference;
  }

  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }

}
