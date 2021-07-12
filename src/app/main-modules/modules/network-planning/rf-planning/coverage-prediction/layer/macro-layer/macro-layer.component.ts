import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Subscription } from 'rxjs';
import { HoverComponentComponent } from '../../hover-component/hover-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-macro-layer',
  templateUrl: './macro-layer.component.html',
  styleUrls: ['./macro-layer.component.scss']
})
export class MacroLayerComponent implements AfterViewInit {
  mainLayerRef: {};
  macroLayer: any;
  macroLayerContainer: any;
  map: any;
  macroLayerSubscription: Subscription;
  pixelRatio: any;
  canvasCore: any;
  macroData: any;
  lineColors: string;
  zoomLevel: any;
  scaleMatrix: number;
  macroContainer: createjs.Stage;
  macroImageContainer: createjs.Container;
  positionLatLng: L.LatLng;
  linksCenterPoint: { x: number; y: number; };
  linksDot: any;
  macroContainerEach: createjs.Container;
  macroImage: createjs.Bitmap;
  macroImageText: any;
  macroPopup: L.Popup;
  allPoints = [];
  allPoints1 = [];

  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private dialog: MatDialog
  ) {
    this.macroLayerSubscription = this.dataShare.removeLayerMessage.subscribe(
      (removeLayer) => {
        if ('MacroLayerComponent' == removeLayer) {
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
    this.macroPopup = this.getPopup();
    this.macroLayer = new CustomLayer({
      container: document.createElement("canvas")
    });

    this.map.setView(new L.LatLng(15.620236, 73.729269), 9);
    let outerThis = this;
    this.macroLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getMacroLayerData().subscribe((data) => {
        this.macroData = data;
        that.macroLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.macroLayerContainer, that._zoom, this.macroData, componentRef);
      });
    });

    this.macroLayer.addTo(this.map);
  }

  createLayer = function (container, zoomLevel, macroData, layerContainer) {
    this.zoomLevel = zoomLevel;
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.macroContainer) {
      this.macroContainer.removeAllChildren();
      this.macroContainer.update();
    }
    this.macroContainer = new createjs.Stage(container);
    this.macroContainer.enableDOMEvents(true);
    this.macroContainer.enableMouseOver(50000);
    this.macroContainer.removeAllChildren();
    this._assetQueue = new createjs.LoadQueue(false, null, true);
    this._assetQueue.loadManifest(this._plannedSiteImageManifest, true);
    this.macroImageContainer = new createjs.Container();

    for (let j = 0; j < macroData.length; j++) {
      for (let i = 0; i < macroData[j][4].boundary.length; i++) {
        this.allPoints["'"+macroData[j][1].rj_r4g_state_name+"'"]= [];
        this.allPoints1["'"+macroData[j][1].rj_r4g_state_name+"'"]= [];
        for (let n in macroData[j][4].boundary[i]) {
          for (let k = 0; k < macroData[j][4].boundary[i][n].length; k++) {
            this.allPoints["'"+macroData[j][1].rj_r4g_state_name+"'"].push([
              macroData[j][4].boundary[i][n][k].latlng[0],
              macroData[j][4].boundary[i][n][k].latlng[1]
            ]);
            this.allPoints1["'"+macroData[j][1].rj_r4g_state_name+"'"].push([
              macroData[j][4].boundary[i][n][k].latlng[0],
              macroData[j][4].boundary[i][n][k].latlng[1],
              macroData[j][4].boundary[i][n][k].sector,
              macroData[j][4].boundary[i][n][k].band,
              macroData[j][4].boundary[i][n][k].cnum,
              macroData[j][4].boundary[i][n][k].sapid,
              macroData[j][4].boundary[i][n][k].type
            ]);
          }
        }
      }
      let eachStatePoints = this.allPoints["'"+macroData[j][1].rj_r4g_state_name+"'"];
      var count = {};
      var greaterThanOne = {};

      eachStatePoints.forEach(function(i) {
        count[i] = (count[i]||0) + 1;
        if (count[i] > 1) {
          greaterThanOne[i] = count[i];
        }
      });
      let eachStatePoints1 = this.allPoints1["'"+macroData[j][1].rj_r4g_state_name+"'"];
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
      this.drawMacroImage(
        this.macroImageContainer,
        data[m],
        this.mainLayerRef
      );

    }
   
    this.macroContainer.addChild(this.macroImageContainer);
    this.macroContainer.update();
  }

  drawMacroImage(macroContainer, macroData, mainlayer) {
    console.log(macroData)
    let imagePath = '';
    imagePath = 'assets/images/Layers/topologies/structure/FiberPop.svg';
    let odscEachData = macroData[0].split(',').map(String);

    this.positionLatLng = L.latLng(
      odscEachData[0],
      odscEachData[1]
    );

    this.linksDot = this.map.latLngToContainerPoint(this.positionLatLng);
    this.linksCenterPoint = {
      x: this.linksDot.x * this.pixelRatio,
      y: this.linksDot.y * this.pixelRatio
    };

    this.macroContainerEach = new createjs.Container();
    this.macroContainerEach.cursor = 'pointer';
    this.macroContainerEach.x = this.linksCenterPoint.x;
    this.macroContainerEach.y = this.linksCenterPoint.y;
    this.macroContainerEach.scaleX = this.scaleMatrix;
    this.macroContainerEach.scaleY = this.scaleMatrix;

    this.macroImage = new createjs.Bitmap(imagePath);
    this.macroImage.regX = 10;
    this.macroImage.regY = 30;
    this.macroImage.scaleX = 1.0;
    this.macroImage.scaleY = 1.0;
    this.macroImage['latlng'] = this.positionLatLng;
    this.macroImage['data'] = macroData;
    let outerthis = this;
    this.macroImage.image.onload = function () {
      outerthis.macroContainer.update();
    }

    this.macroImageText = new createjs.Text(odscEachData[5], "15px Lato Bold", "#000000");
    this.macroImageText.textAlign = 'center';
    this.macroImageText.textBaseLine = 'middle';
    this.macroImageText.y = 50;

    this.macroImage.on('mouseover', function (event) {
      let target = event['target'];
      let dot = L.point((event['rawX'] / outerthis.pixelRatio), (event['rawY'] / outerthis.pixelRatio));
      target.latlng = outerthis.map.containerPointToLatLng(dot);
      const dialogRef = outerthis.dialog.open(HoverComponentComponent, {
        width: screen.width+'px',
        height: screen.height+'px',
        data: {
          "zoom":outerthis.zoomLevel,
          "latlng": outerthis.map.getCenter()
        },
        hasBackdrop: false,
        disableClose: true,
        panelClass: "hover-component"
      });

      // dialogRef.backdropClick().subscribe(() => {
      //   // Close the dialog
      //   dialogRef.close();
      // })
      // let hoverComponent = mainlayer.componentFactoryResolver.resolveComponentFactory(HoverComponentComponent);
      // mainlayer.componentRef = mainlayer.target.createComponent(hoverComponent);
      // let template = '';
      // template +=
      //   '<div class="layout-row popup-layout-padding">' +
      //   '<span class="prefix">Sector:</span>' +
      //   '<span class="value">' + target.data[2] + '</span></div>';
      // template +=
      //   '<div class="layout-row popup-layout-padding">' +
      //   '<span class="prefix">Band:</span>' +
      //   '<span class="value">' + target.data[3] + '</span>' +
      //   '</div>';
      // template +=
      //   '<div class="layout-row popup-layout-padding">' +
      //   '<span class="prefix">cNum:</span>' +
      //   '<span class="value">' + target.data[4] + '</span>' +
      //   '</div>';
      // outerthis.macroPopup.setLatLng(target.latlng).setContent(template).openOn(outerthis.map);
    });

    this.macroImage.on('mouseout', function (event) {
      outerthis.map.closePopup();
    });

    this.macroImage.on('click', function (event) {
    });

    this.macroContainerEach.addChild(this.macroImage, this.macroImageText);
    macroContainer.addChild(this.macroContainerEach);
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

  getMacroLayerData() {
    return this.http.get("assets/data/layers/topologies/Fibre/structure/structure.json");
  }

  resizeContainer() {
    this.canvasCore = this.macroLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.macroLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  removeLayer() {
    if (undefined != this.macroLayer) {
      this.map.removeLayer(this.macroLayer)
    }
  }

  ngOnDestroy() {
    if (this.macroLayerSubscription) {
      this.macroLayerSubscription.unsubscribe();
    }
  }
}
