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
  selector: 'app-equipments-planned-fibre-core',
  templateUrl: './equipments-planned-fibre-core.component.html',
  styleUrls: ['./equipments-planned-fibre-core.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EquipmentsPlannedFibreCoreComponent implements AfterViewInit, OnDestroy {

  equipmentPlannedCoreLayer: any;
  equipmentStructurePlannedLayer: any;
  map: any;
  canvasCore: any;
  ctxCore: any;
  canvasLayer: HTMLElement;
  stageRouteContainer: createjs.Stage;
  equipmentPlannedData: Object;
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
  equipmentPlannedLayerContainer:any;

  ref: this;
  mainLayerRef: {};
  equipmentData: any = [
    {
      name: 'Equipment',
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
  equipmentColocatedData: any = [
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
  equipmentContainerEach: createjs.Container;
  equipmentImage: createjs.Bitmap;
  equipmentPopup: any;
  equipmentImageText: any;
  clonedArray: any[];

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('EquipmentsPlannedFibreCoreComponent' == removeLayer) {
          let removeLayer = 'Logical-Connectivity';
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
    this.equipmentPopup = this.getPopup();

    this.map = this.shapeService.mapServiceData;
    this.equipmentPlannedCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    // this.map.setView(new L.LatLng(15.620236, 73.729269), 9);

    // this.map.setView([26.6966, 77.8908]);
    this.map.setZoom(4);
    let outerThis = this;

    this.equipmentPlannedCoreLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.equipmentPlannedData = data;
        that.equipmentPlannedLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(
          that.equipmentPlannedLayerContainer,
          that._zoom,
          this.equipmentPlannedData,
          componentRef,
          that._assetQueue
        );
      });
    });

    this.equipmentPlannedCoreLayer.addTo(this.map);
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/equipment/equipment.json");
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
    this.canvasCore = this.equipmentPlannedCoreLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.equipmentPlannedCoreLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  createLayer = function (container, zoomLevel, equipmentPlannedData, layerContainer, routeQueue) {
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
    this.equipmentContainer = new createjs.Container();
    for (let j = 0; j < equipmentPlannedData.length; j++) {
      for (let i = 0; i < equipmentPlannedData[j][4].boundary.length; i++) {
        this.allPoints["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"]= [];
        this.allPoints1["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"]= [];
        for (let n in equipmentPlannedData[j][4].boundary[i]) {
          for (let k = 0; k < equipmentPlannedData[j][4].boundary[i][n].length; k++) {
            this.allPoints["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"].push([
              equipmentPlannedData[j][4].boundary[i][n][k].latlng[0],
              equipmentPlannedData[j][4].boundary[i][n][k].latlng[1]
            ]);
            this.allPoints1["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"].push([
              equipmentPlannedData[j][4].boundary[i][n][k].latlng[0],
              equipmentPlannedData[j][4].boundary[i][n][k].latlng[1],
              equipmentPlannedData[j][4].boundary[i][n][k].sector,
              equipmentPlannedData[j][4].boundary[i][n][k].band,
              equipmentPlannedData[j][4].boundary[i][n][k].cnum,
              equipmentPlannedData[j][4].boundary[i][n][k].sapid,
              equipmentPlannedData[j][4].boundary[i][n][k].type
            ]);
          }
        }
      }
      let eachStatePoints = this.allPoints["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"];
      var count = {};
      var greaterThanOne = {};

      eachStatePoints.forEach(function(i) {
        count[i] = (count[i]||0) + 1;
        if (count[i] > 1) {
          greaterThanOne[i] = count[i];
        }
      });
      let eachStatePoints1 = this.allPoints1["'"+equipmentPlannedData[j][1].rj_r4g_state_name+"'"];
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
      this.drawEquipmentImage(
        this.positionLatLng,
        this.linksCenterPoint,
        this.equipmentContainer,
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
            this.equipmentContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.stageRouteContainer.addChild(this.equipmentContainer);
    }
    this.stageRouteContainer.addChild(this.equipmentContainer);
    this.stageRouteContainer.update();
  }

  drawEquipmentImage(latlng, centerpoint, equipmentContainer, equipmentData, imagePath) {
    imagePath = '';
    let equipmentEachData = equipmentData[0].split(',').map(String);
    if (this.zoomLevel <= 7) {
      imagePath = 'assets/images/Layers/topologies/equipment/AG1Router.svg';
    } else if (this.zoomLevel > 7 && this.zoomLevel <= 11) {
      if (equipmentEachData[6] == 'JointClosure'){
        imagePath = 'assets/images/Layers/topologies/equipment/JointClosure.svg';
      } else if (equipmentEachData[6] == 'CSSRouter') {
        imagePath = 'assets/images/Layers/topologies/equipment/CSSRouter.svg';
      } else if (equipmentEachData[6] == 'L2Switch') {
        imagePath = 'assets/images/Layers/topologies/equipment/L2Switch.svg';
      }
    } else if (this.zoomLevel > 11 && this.zoomLevel <= 12) {
      if (equipmentEachData[6] == 'Splitter2'){
        imagePath = 'assets/images/Layers/topologies/equipment/Splitter2.svg';
      } else if (equipmentEachData[6] == 'Splitter1') {
        imagePath = 'assets/images/Layers/topologies/equipment/Splitter1.svg';
      } else if (equipmentEachData[6] == 'OTB') {
        imagePath = 'assets/images/Layers/topologies/equipment/OTB.svg';
      } else if (equipmentEachData[6] == 'ONT') {
        imagePath = 'assets/images/Layers/topologies/equipment/ONT.svg';
      } else if (equipmentEachData[6] == 'OLT') {
        imagePath = 'assets/images/Layers/topologies/equipment/OLT.svg';
      } else {
        imagePath = 'assets/images/Layers/topologies/equipment/Others.svg';
      }
      if (equipmentEachData[6] == 'SAG2'){
        imagePath = 'assets/images/Layers/topologies/equipment/SAG2.svg';
      } else if (equipmentEachData[6] == 'ILA') {
        imagePath = 'assets/images/Layers/topologies/equipment/ILA.svg';
      } else if (equipmentEachData[6] == 'Pole') {
        imagePath = 'assets/images/Layers/topologies/equipment/Pole.svg';
      } else if (equipmentEachData[6] == 'ManHole') {
        imagePath = 'assets/images/Layers/topologies/equipment/ManHole.svg';
      } else if (equipmentEachData[6] == 'FiberPop') {
        imagePath = 'assets/images/Layers/topologies/equipment/FiberPop.svg';
      } else {
        imagePath = 'assets/images/Layers/topologies/equipment/AG1.svg';
      }
    }
    this.positionLatLng = L.latLng(
      equipmentEachData[0],
      equipmentEachData[1]
    );

    this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
    this.linksCenterPoint = {
      x: this.linksDot.x * this.pixelRatio,
      y: this.linksDot.y * this.pixelRatio
    };

    this.equipmentContainerEach = new createjs.Container();
    this.equipmentContainerEach.cursor = 'pointer';
    this.equipmentContainerEach.x = this.linksCenterPoint.x;
    this.equipmentContainerEach.y = this.linksCenterPoint.y;
    this.equipmentContainerEach.scaleX = this.scaleMatrix;
    this.equipmentContainerEach.scaleY = this.scaleMatrix;

    this.equipmentImage = new createjs.Bitmap(imagePath);
    this.equipmentImage.regX = 10;
    this.equipmentImage.regY = 30;
    this.equipmentImage.scaleX = 1.0;
    this.equipmentImage.scaleY = 1.0;
    this.equipmentImage['latlng'] = this.positionLatLng;
    this.equipmentImage['data'] = equipmentEachData;
    this.equipmentImage.image.onload = function () {
      outerthis.stageRouteContainer.update();
    }

    this.equipmentImageText = new createjs.Text(equipmentEachData[5], "15px Lato Bold", "#000000");
    this.equipmentImageText.textAlign = 'center';
    this.equipmentImageText.textBaseLine = 'middle';
    this.equipmentImageText.y = 50;

    let outerthis = this;
    this.equipmentImage.on('mouseover', function (event) {
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
      outerthis.equipmentPopup.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.equipmentImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });

    this.equipmentImage.on('click', function (event) {
      outerthis.routeClicked();
    });

    this.equipmentContainerEach.addChild(this.equipmentImage, this.equipmentImageText);
    equipmentContainer.addChild(this.equipmentContainerEach);
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
    ref.componentRef.instance.data = this.equipmentData;
    ref.componentRef.instance.mainRef = this;
    ref.componentRef.instance.mainLayerReference = this.mainLayerRef;
  }

  openSpiderPopups(d, ref) {
    if (d.data.name == 'Equipment'){
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
      let extraLayer = {'parentToChild': 'Logical-Connectivity', 'child': 'Topologies-Equipment-Planned'};
      this.dataShare.setExtraLayer(extraLayer);
      this.dataShare.countLogicalMessage();
      this.removeLayer();
      let logicalComponent = ref.componentFactoryResolver.resolveComponentFactory(LogicalConnectivityComponent);
      ref.componentRef = ref.target.createComponent(logicalComponent);
    }
  }

  routeClicked() {
    const componName = "equipment";
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
    if (undefined != this.equipmentPlannedCoreLayer) {
      this.map.removeLayer(this.equipmentPlannedCoreLayer)
    }
  }

  drawCircularCircle(
    count,
    equipmentContainer,
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

    this.labelCount = new createjs.Bitmap('assets/images/Layers/topologies/equipment/All.svg');
    this.labelCount.regX = 35;
    this.labelCount.regY = 30;
    this.labelCount.scaleX = 0.4;
    this.labelCount.scaleY = 0.4;
    this.labelCount['latlng'] =  this.textContainer.latLng;

    let outerContainerThis = this;
    this.textContainer.addEventListener('click', function(evt) {
      outerContainerThis.clonedArray = [...outerContainerThis.equipmentColocatedData];
      outerContainerThis.clonedArray.splice(count, (outerContainerThis.clonedArray.length - count));
      outerContainerThis.map.setView(positionCololatedLatLng);
      outerContainerThis.colocatedequipmentClicked(evt, mainLayerReference, colocatedData, outerContainerThis.clonedArray);
    });
    this.textContainer.addChild(this.circleCountShape, this.innercircleShape, this.labelCount);
    equipmentContainer.addChild(this.textContainer);
    this.stageRouteContainer.update();
  }

  drawCircleGraphics(color, matrix) {
    this.drawCircleGraphic = new createjs.Graphics();
    this.drawCircleGraphic.beginFill(color);
    this.drawCircleGraphic.drawCircle(0, 0, matrix);

    return this.drawCircleGraphic;
  }

  async colocatedequipmentClicked(event, mainLayerReference, colocatedData, colocatedSpiderArray) {
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
