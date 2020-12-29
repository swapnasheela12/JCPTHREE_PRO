import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ShapeService } from '../../../layers-services/shape.service';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import { HttpClient } from '@angular/common/http';
import * as createjs from 'createjs-module';
import { any } from 'underscore';
import { FivegAdjacentSpiderViewComponent } from '../../../fiveg-adjacent-spider-view/fiveg-adjacent-spider-view.component';
import { FibreTableViewPopupModel, RouteTableViewComponent } from '../fibre/route/route-table-view/route-table-view.component';
import { MatDialog } from '@angular/material/dialog';
import { FivegCircularSpiderViewComponent } from '../../../fiveg-circular-spider-view/fiveg-circular-spider-view.component';

@Component({
  selector: 'app-logical-connectivity',
  templateUrl: './logical-connectivity.component.html',
  styleUrls: ['./logical-connectivity.component.scss']
})
export class LogicalConnectivityComponent implements AfterViewInit {
  mainLayerRef: {};
  pixelRatio: number;
  map: any;
  logicalConnectivityFibreCoreLayer: any;
  canvasCore: any;
  structureContainerEach: createjs.Container;
  scaleMatrix: number;
  structureImage: createjs.Bitmap;
  stageLogicalConnectivity: any;
  structureImageText: any;
  allPoints = [];
  allPoints1 = [];
  logicalConnectivityContainer: any;
  logicalConnectivityLineContainer: any;
  logicalConnectivityCircleContainer: any;
  positionLatLng: any;
  imagePath: any;
  routePlannedData: Object;
  linksDot: any;
  linksCenterPoint: { x: number; y: number; };
  zoomLevel: any;
  connectionImage: createjs.Bitmap;
  connectionImageText: any;
  eachConnectionContainer: createjs.Container;
  connectionLinks: any;
  lineStrokeWidth: number;
  linkColor:String = 'red';
  ConnectionLinkShape: createjs.Shape;
  lineConnectionContainer: createjs.Container;
  circleGraphic: any;
  circleCountShape: createjs.Shape;
  innercircleGraphic: any;
  innercircleShape: createjs.Shape;
  textContainer: any;
  labelCount: createjs.Bitmap;
  drawCircleGraphic: createjs.Graphics;
  targetLatLng: L.LatLng;
  targetLinksDot: any;
  targetLinksCenterPoint: { x: number; y: number; };
  structureData: any = [
    {
      name: 'OLT',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I164',
      type: 'OLT'
    },
    {
      name: 'Splitter 1',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I174',
      type: 'Splitter'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I164',
      type: 'Splitter'
    },
    {
      name: 'Splitter 3',
      value: 5,
      color: '#03A9F4',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals',
      sapid: 'I-MU-MUMB_ENB_I174',
      type: 'Splitter'
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
  clonedArray: any[];
  routeReadyFibreCoreSubscription: any;
  logicalTopology: any;

  constructor(
    private dataShare: DataSharingService,
    private shapeService: ShapeService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.routeReadyFibreCoreSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if (
          'StructurePlannedFibreCoreComponent' == removeLayer ||
          'EquipmentsPlannedFibreCoreComponent' == removeLayer
        ) {
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

  ngAfterViewInit(): void {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.map = this.shapeService.mapServiceData;
    this.logicalTopology = this.getPopup();

    this.logicalConnectivityFibreCoreLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    this.map.setView(new L.LatLng( 15.60816, 73.75113), 8);
    // this.map.setZoom(4);
    let outerThis = this;

    this.logicalConnectivityFibreCoreLayer.on("layer-render", function () {
     
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getLogicalData().subscribe((data) => {
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

    this.logicalConnectivityFibreCoreLayer.addTo(this.map);
  }

  resizeContainer() {
    this.canvasCore = this.logicalConnectivityFibreCoreLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.logicalConnectivityFibreCoreLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
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

  getLogicalData() {
    return this.http.get("assets/data/layers/topologies/Fibre/logical-connectivity/logicalconnectivity.json");
  }

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer, routeQueue) {
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.stageLogicalConnectivity) {
      this.stageLogicalConnectivity.removeAllChildren();
      this.stageLogicalConnectivity.update();
    }
    this.stageLogicalConnectivity = new createjs.Stage(container);
    this.stageLogicalConnectivity.enableDOMEvents(true);
    this.stageLogicalConnectivity.enableMouseOver(50000);
    this.logicalConnectivityContainer = new createjs.Container();
    this.logicalConnectivityLineContainer = new createjs.Container();
    this.logicalConnectivityCircleContainer = new createjs.Container();
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
              routePlannedData[j][4].boundary[i][n][k].type,
              routePlannedData[j][4].boundary[i][n][k].sapid,
              routePlannedData[j][4].boundary[i][n][k].sector,
              routePlannedData[j][4].boundary[i][n][k].band,
              routePlannedData[j][4].boundary[i][n][k].cnum
            ]);
            if (routePlannedData[j][4].boundary[i][n][k].connectivity != undefined) {
              for (let c=0; c < routePlannedData[j][4].boundary[i][n][k].connectivity.length; c++) {
                this.allPoints1["'"+routePlannedData[j][1].rj_r4g_state_name+"'"].push([
                  routePlannedData[j][4].boundary[i][n][k].latlng[0],
                  routePlannedData[j][4].boundary[i][n][k].latlng[1],
                  routePlannedData[j][4].boundary[i][n][k].type,
                  routePlannedData[j][4].boundary[i][n][k].sapid,
                  routePlannedData[j][4].boundary[i][n][k].sector,
                  routePlannedData[j][4].boundary[i][n][k].band,
                  routePlannedData[j][4].boundary[i][n][k].cnum,
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].latlng[0],
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].latlng[1],
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].type,
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].sapid,
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].sector,
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].band,
                  routePlannedData[j][4].boundary[i][n][k].connectivity[c].cnum
                ]);
              }
          }
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
        greaterThanOne1[i] = count1[i];
      });
    }
    let outerContainerThis = this;
    let entries:any = Object.entries(greaterThanOne);
    let entries1:any = Object.entries(greaterThanOne1);
    let dataColocated = [];
    let dataConnection = [];
    if(entries.length == 0) {
      for(let l=0; l < entries1.length; l++) {
        dataConnection.push(entries1[l]);
      }
    } else {
      for (let g=0; g < entries.length; g++) {
        let splittedArray = entries[g][0].split(',').map(String);
        for(let l=0; l < entries1.length; l++) {
          let splittedArray1 = entries1[l][0].split(',').map(String);
          if (splittedArray1.length > 7) {
            dataConnection.push(entries1[l]);
          } else {
            if (splittedArray1[0] == splittedArray[0] && splittedArray1[1] == splittedArray[1]) {
              dataColocated.push(entries1[l]);
            } else {
              dataConnection.push(entries1[l])
            }
          }
        }
      }
    }

    for (let m=0; m < dataConnection.length; m++) {
      if (dataConnection[m][1] == 1) {
        this.drawStructureImage(
          this.positionLatLng,
          this.linksCenterPoint,
          this.logicalConnectivityContainer,
          dataConnection[m],
          this.imagePath
        );
        // this.logicalConnectivityContainer.addChild(this.logicalConnectivityContainer);
      }
    }
  
    this.logicalConnectivityContainer.addChild(this.logicalConnectivityLineContainer, this.logicalConnectivityCircleContainer);
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
            this.logicalConnectivityContainer,
            this.colocatedLinksCenterPoint,
            outerContainerThis.mainLayerRef,
            this.positionCololatedLatLng,
            colocatedData,
            splittedArray[0],
            splittedArray[1]
          );
          this.logicalConnectivityContainer.addChild(this.logicalConnectivityContainer);
    }
    this.stageLogicalConnectivity.addChild(this.logicalConnectivityContainer);
    this.stageLogicalConnectivity.update();
  }
  
  drawStructureImage(latlng, centerpoint, structureContainer, structureData, imagePath) {
    let structureEachData = structureData[0].split(',').map(String);

    if (structureEachData[7] != undefined) {
      this.positionLatLng = L.latLng(
        structureEachData[7],
        structureEachData[8]
      );
  
      this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
      this.linksCenterPoint = {
        x: this.linksDot.x * this.pixelRatio,
        y: this.linksDot.y * this.pixelRatio
      };
      this.targetLatLng = L.latLng(
        structureEachData[0],
        structureEachData[1]
      );
  
      this.targetLinksDot = this.map.latLngToContainerPoint(this.targetLatLng);
      this.targetLinksCenterPoint = {
        x: this.targetLinksDot.x * this.pixelRatio,
        y: this.targetLinksDot.y * this.pixelRatio
      };

    this.lineConnectionContainer = new createjs.Container();
    this.ConnectionLinkShape = new createjs.Shape(
      this.lineCreation(this.targetLinksCenterPoint, this.linksCenterPoint)
    );
    this.ConnectionLinkShape.cursor = 'pointer';
    this.ConnectionLinkShape['latLng'] = this.positionLatLng;
    this.lineConnectionContainer.addChild(
      this.ConnectionLinkShape
    );
    this.logicalConnectivityLineContainer.addChild(this.lineConnectionContainer);
    }
    if (structureEachData.length == 7 )  {
      imagePath = 'assets/images/Layers/topologies/structure/'+structureEachData[2]+'.svg';
      this.positionLatLng = L.latLng(
        structureEachData[0],
        structureEachData[1]
      );
    } else {
      imagePath = 'assets/images/Layers/topologies/structure/'+structureEachData[9]+'.svg';
      this.positionLatLng = L.latLng(
        structureEachData[7],
        structureEachData[8]
      );
    }

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
    let outerthis = this;
    this.structureImage.image.onload = function () {
      outerthis.stageLogicalConnectivity.update();
    }

    this.structureImage.on('mouseover', function (event) {
      let target = event['target'];
      let dot = L.point((event['rawX'] / outerthis.pixelRatio), (event['rawY'] / outerthis.pixelRatio));
      target.latlng = outerthis.map.containerPointToLatLng(dot);
      let template = '';
      let sector = '';
      let band = '';
      let cnum = '';
      if (structureEachData.length == 7 )  {
        sector = target.data[4];
        band = target.data[5];
        cnum = target.data[6];
      } else {
        sector = target.data[11];
        band = target.data[12];
        cnum = target.data[13];
      }
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Sector:</span>' +
        '<span class="value">' +  sector + '</span></div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">Band:</span>' +
        '<span class="value">' + band + '</span>' +
        '</div>';
      template +=
        '<div class="layout-row popup-layout-padding">' +
        '<span class="prefix">cNum:</span>' +
        '<span class="value">' + cnum + '</span>' +
        '</div>';
      outerthis.logicalTopology.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.structureImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });
    this.structureImage.on('click', function (event) {
      outerthis.routeClicked();
    });

    if (structureEachData.length == 7)  {
      this.structureImageText = new createjs.Text(structureEachData[3], "15px Lato Bold", "#000000");
    } else {
      this.structureImageText = new createjs.Text(structureEachData[10], "15px Lato Bold", "#000000");
    }

    this.structureImageText.textAlign = 'center';
    this.structureImageText.textBaseLine = 'middle';
    this.structureImageText.y = 50;

    this.structureContainerEach.addChild(this.structureImage, this.structureImageText);
    this.logicalConnectivityCircleContainer.addChild(this.structureContainerEach)

    // this.logicalConnectivityContainer.addChild(this.lineConnectionContainer, this.structureContainerEach);
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

  lineCreation(centerpoint, linksCenterPoint) {
    this.connectionLinks = new createjs.Graphics();
    this.lineStrokeWidth = this.scaleMatrix * 4;
    this.connectionLinks.setStrokeDash([5, 3], 0);
    this.connectionLinks.beginStroke(this.linkColor);
    this.connectionLinks.moveTo(centerpoint.x, centerpoint.y);
    this.connectionLinks.lineTo(linksCenterPoint.x, linksCenterPoint.y)
    this.connectionLinks.endStroke();
    this.connectionLinks.closePath();

    return this.connectionLinks;
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
    this.stageLogicalConnectivity.removeAllChildren();
    this.stageLogicalConnectivity.update();
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
      outerContainerThis.colocatedLogicalConnectivityClicked(evt, mainLayerReference, colocatedData, outerContainerThis.clonedArray, outerContainerThis.textContainer.latLng);
    });
    this.textContainer.addChild(this.circleCountShape, this.innercircleShape, this.labelCount);
    structureContainer.addChild(this.textContainer);
    this.stageLogicalConnectivity.update();
  }

  async colocatedLogicalConnectivityClicked(event, mainLayerReference, colocatedData, colocatedSpiderArray, latLng) {
    let fivegCircularSpiderComponent = mainLayerReference.componentFactoryResolver.resolveComponentFactory(FivegCircularSpiderViewComponent);
    mainLayerReference.componentRef = mainLayerReference.target.createComponent(fivegCircularSpiderComponent);
    mainLayerReference.componentRef.instance.data = colocatedSpiderArray;
    mainLayerReference.componentRef.instance.colocatedCircularCircleData = colocatedData;
    mainLayerReference.componentRef.instance.mainRef = this;
    mainLayerReference.componentRef.instance.mainLayerReference = mainLayerReference;
    mainLayerReference.componentRef.instance.latlng = latLng;
  }

  openSpiderCircularPopups(d, ref, latlng) {
    let fivegSpiderComponent = ref.componentFactoryResolver.resolveComponentFactory(FivegAdjacentSpiderViewComponent);
    ref.componentRef = ref.target.createComponent(fivegSpiderComponent);
    let colocatedData = [
      { 
        tileName: d.data.device,
        fontValue: d.data.fontvalue,
        fontFamily: d.data.font,
        color: d.data.color,
        radiusDeviceCircle: '56',
        latLng: latlng 
      }
    ];
    ref.componentRef.instance.colocatedCircleData = colocatedData;
    ref.componentRef.instance.data = this.structureData;
    ref.componentRef.instance.mainRef = this;
    ref.componentRef.instance.mainLayerReference = this.mainLayerRef;
  }

  openSpiderPopups(d, ref) {
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
  }

  drawCircleGraphics(color, matrix) {
    this.drawCircleGraphic = new createjs.Graphics();
    this.drawCircleGraphic.beginFill(color);
    this.drawCircleGraphic.drawCircle(0, 0, matrix);

    return this.drawCircleGraphic;
  }

  removeLayer() {
    if (undefined != this.logicalConnectivityFibreCoreLayer) {
      this.map.removeLayer(this.logicalConnectivityFibreCoreLayer)
    }
  }

  ngOnDestroy() {
    if (this.routeReadyFibreCoreSubscription) {
      this.routeReadyFibreCoreSubscription.unsubscribe();
    }
  }
}
