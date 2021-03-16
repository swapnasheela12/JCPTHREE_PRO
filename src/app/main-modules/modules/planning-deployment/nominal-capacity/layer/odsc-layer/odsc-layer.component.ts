import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-odsc-layer',
  templateUrl: './odsc-layer.component.html',
  styleUrls: ['./odsc-layer.component.scss']
})
export class OdscLayerComponent implements AfterViewInit {
  mainLayerRef: {};
  odscLayer: any;
  odscLayerContainer: any;
  map: any;
  odscLayerSubscription: Subscription;
  pixelRatio: any;
  canvasCore: any;
  odscData: any;
  lineColors: string;
  zoomLevel: any;
  scaleMatrix: number;
  odscContainer: createjs.Stage;
  odscImageContainer: createjs.Container;
  positionLatLng: L.LatLng;
  linksDot: any;
  linksCenterPoint: { x: number; y: number; };
  odscContainerEach: createjs.Container;
  odscImage: createjs.Bitmap;
  odscImageText: any;
  odscPopup: L.Popup;
  allPoints = [];
  allPoints1 = [];

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService
  ) {
    this.odscLayerSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('OdscLayerComponent' == removeLayer) {
          this.removeLayer();
        }
      }
    );
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
        console.log(this.mainLayerRef)
      }
    )
  }

  ngAfterViewInit() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.map = this.shapeService.mapServiceData;
    this.odscPopup = this.getPopup();
    this.odscLayer = new CustomLayer({
      container: document.createElement("canvas")
    });

    this.map.setView(new L.LatLng(15.620236, 73.729269), 9);
    let outerThis = this;
    this.odscLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getOdscLayerData().subscribe((data) => {
        this.odscData = data;
        that.odscLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.odscLayerContainer, that._zoom, this.odscData, componentRef);
      });
    });

    this.odscLayer.addTo(this.map);
  }

  drawOdscImage(odscContainer, odscData) {
    let imagePath = '';
    imagePath = 'assets/images/Layers/topologies/structure/OSC.svg';
    let odscEachData = odscData[0].split(',').map(String);

    this.positionLatLng = L.latLng(
      odscEachData[0],
      odscEachData[1]
    );

    this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
    this.linksCenterPoint = {
      x: this.linksDot.x * this.pixelRatio,
      y: this.linksDot.y * this.pixelRatio
    };

    this.odscContainerEach = new createjs.Container();
    this.odscContainerEach.cursor = 'pointer';
    this.odscContainerEach.x = this.linksCenterPoint.x;
    this.odscContainerEach.y = this.linksCenterPoint.y;
    this.odscContainerEach.scaleX = this.scaleMatrix;
    this.odscContainerEach.scaleY = this.scaleMatrix;

    this.odscImage = new createjs.Bitmap(imagePath);
    this.odscImage.regX = 10;
    this.odscImage.regY = 30;
    this.odscImage.scaleX = 1.0;
    this.odscImage.scaleY = 1.0;
    this.odscImage['latlng'] = this.positionLatLng;
    this.odscImage['data'] = odscData;
    let outerthis = this;
    this.odscImage.image.onload = function () {
      outerthis.odscContainer.update();
    }

    this.odscImageText = new createjs.Text(odscEachData[5], "15px Lato Bold", "#000000");
    this.odscImageText.textAlign = 'center';
    this.odscImageText.textBaseLine = 'middle';
    this.odscImageText.y = 50;

    this.odscImage.on('mouseover', function (event) {
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
      outerthis.odscPopup.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.odscImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });

    this.odscImage.on('click', function (event) {
    });

    this.odscContainerEach.addChild(this.odscImage, this.odscImageText);
    odscContainer.addChild(this.odscContainerEach);
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


  getOdscLayerData() {
    return this.http.get("assets/data/layers/topologies/Fibre/equipment/equipment.json");
  }
  createLayer = function (container, zoomLevel, odscData, layerContainer) {
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.odscContainer) {
      this.odscContainer.removeAllChildren();
      this.odscContainer.update();
    }
    this.odscContainer = new createjs.Stage(container);
    this.odscContainer.enableDOMEvents(true);
    this.odscContainer.enableMouseOver(50000);
    this.odscContainer.removeAllChildren();
    this._assetQueue = new createjs.LoadQueue(false, null, true);
    this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
    this.odscImageContainer = new createjs.Container();

    for (let j = 0; j < odscData.length; j++) {
      for (let i = 0; i < odscData[j][4].boundary.length; i++) {
        this.allPoints["'"+odscData[j][1].rj_r4g_state_name+"'"]= [];
        this.allPoints1["'"+odscData[j][1].rj_r4g_state_name+"'"]= [];
        for (let n in odscData[j][4].boundary[i]) {
          for (let k = 0; k < odscData[j][4].boundary[i][n].length; k++) {
            this.allPoints["'"+odscData[j][1].rj_r4g_state_name+"'"].push([
              odscData[j][4].boundary[i][n][k].latlng[0],
              odscData[j][4].boundary[i][n][k].latlng[1]
            ]);
            this.allPoints1["'"+odscData[j][1].rj_r4g_state_name+"'"].push([
              odscData[j][4].boundary[i][n][k].latlng[0],
              odscData[j][4].boundary[i][n][k].latlng[1],
              odscData[j][4].boundary[i][n][k].sector,
              odscData[j][4].boundary[i][n][k].band,
              odscData[j][4].boundary[i][n][k].cnum,
              odscData[j][4].boundary[i][n][k].sapid,
              odscData[j][4].boundary[i][n][k].type
            ]);
          }
        }
      }
      let eachStatePoints = this.allPoints["'"+odscData[j][1].rj_r4g_state_name+"'"];
      var count = {};
      var greaterThanOne = {};

      eachStatePoints.forEach(function(i) {
        count[i] = (count[i]||0) + 1;
        if (count[i] > 1) {
          greaterThanOne[i] = count[i];
        }
      });
      let eachStatePoints1 = this.allPoints1["'"+odscData[j][1].rj_r4g_state_name+"'"];
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
      this.drawOdscImage(
        this.odscImageContainer,
        data[m],
      );

    }
    this.odscContainer.addChild(this.odscImageContainer);
    this.odscContainer.update();
  }

  resizeContainer() {
    this.canvasCore = this.odscLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.odscLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  removeLayer() {
    if (undefined != this.odscLayer) {
      this.map.removeLayer(this.odscLayer)
    }
  }

  ngOnDestroy() {
    if (this.odscLayerSubscription) {
      this.odscLayerSubscription.unsubscribe();
    }
  }

}
