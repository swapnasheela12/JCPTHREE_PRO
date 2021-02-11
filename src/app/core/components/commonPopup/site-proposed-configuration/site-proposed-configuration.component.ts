import { Component, OnInit, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as createjs from 'createjs-module';
// declare const L: any;
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';

@Component({
  selector: 'app-site-proposed-configuration',
  templateUrl: './site-proposed-configuration.component.html',
  styleUrls: ['./site-proposed-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteProposedConfigurationComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  displayedColumnsSitePropsedConfiguration: string[] = ['sapId', 'azimuth', 'height', 'power', 'tilt'];
  siteProposedData = [];
  dataSitePropsedConfiguration;
  mapSitePrposed;
  siteProposedConfigurationLayer: any;
  routeFibreCoreLayerContainer: any;
  stageSiteProposedConfiguration: createjs.Stage;
  sectorLatLng: any = {};
  drawPieGraphic: any;
  allSiteContainer: any;
  latitude;
  longitude;
  constructor(
    public dialogRef: MatDialogRef<SiteProposedConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shapeService: ShapeService
  ) {
  }

  ngOnInit(): void {
    this.siteProposedData = this.data.sector;
    this.latitude = this.data.latitude;
    this.longitude = this.data.longitude;
    this.dataSitePropsedConfiguration = new MatTableDataSource(this.siteProposedData);
  }

  closeDialog(){
    this.dialogRef.close(true);
  }

  ngAfterViewInit() {
    this.mapSitePrposed = L.map('mapSitePrposed', {
      center: [19.0522, 72.9005],
      zoomControl: false,
      zoom: 15
    });
    const tilesSiteProposed = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    tilesSiteProposed.addTo(this.mapSitePrposed);
    L.control.zoom({
      position: 'bottomright'
    })
    .addTo(this.mapSitePrposed);
    this.customControlSitePrposed = L.Control.extend({
      options: {
        position: 'bottomright',
      },


      onAdd: function (mapSitePrposed) {
        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-count-layers');
        container.innerHTML = ' <div class="tab-container-layersMap2"><div class="icon-count"><span style="font-size: 9px;font-weight: 500;" id="command"></span></div><div class="icon-styleMap2"><i class="ic ic-layers-01"></i></div></div>';
        container.style.backgroundColor = 'white';
        container.style.backgroundSize = "38px 38px";
        container.style.width = '38px';
        container.style.height = '38px';

        container.onclick = function () { }
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
    this.mapSitePrposed.addControl(new this.customControlSitePrposed())
    this.mapSitePrposed.setView(new L.LatLng(this.latitude, this.longitude), 13);
    // this.shapeService.mapServiceData = this.mapSitePrposed;

    this.siteProposedConfigurationLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
   
    let outerThis = this;
    this.sectorLatLng = L.latLng(
      this.latitude,
      this.longitude
    );
    console.log(this.sectorLatLng);
    this.sectorPoint = this.mapSitePrposed.latLngToContainerPoint(this.sectorLatLng);
    console.log(this.sectorPoint.x);
console.log(this.sectorPoint.y)
    this.sectorCenterPoint = {
        x: this.sectorPoint.x * this.pixelRatio,
        y: this.sectorPoint.y * this.pixelRatio
    };

    this.siteProposedConfigurationLayer.on("layer-render", function () {
      alert("hello")
      let that = this;
      const componentRef = this.componentRef = this;
      that.routeFibreCoreLayerContainer = outerThis.resizeContainer();
      outerThis.createLayer(
          that.routeFibreCoreLayerContainer,
          that._zoom,
          this.routePlannedData,
          componentRef,
          that._assetQueue
        );
    });

    this.siteProposedConfigurationLayer.addTo(this.mapSitePrposed);
    this.shapeService.mapServiceData = this.mapSitePrposed;
  }

  resizeContainer() {
    this.canvasCore = this.siteProposedConfigurationLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.siteProposedConfigurationLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer, routeQueue) {
    this.zoomLevel = zoomLevel;
    this.sectorLatLng = {};
    this.scaleMatrix = (this.zoomLevel <= 7) ?
      0.40 : (this.zoomLevel <= 10) ?
        0.50 : (this.zoomLevel <= 13) ?
          0.75 : (this.zoomLevel <= 15) ?
            0.50 : 0.75;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.stageSiteProposedConfiguration) {
      this.stageSiteProposedConfiguration.removeAllChildren();
      this.stageSiteProposedConfiguration.update();
    }

    // let bounds = this.mapSitePrposed.getBounds();

    this.stageSiteProposedConfiguration = new createjs.Stage(container);
    this.stageSiteProposedConfiguration.enableDOMEvents(true);
    this.stageSiteProposedConfiguration.enableMouseOver(50000);
    this.stageSiteProposedConfiguration.removeAllChildren();
    console.log(this.latitude);
    console.log(this.longitude)
    console.log(this.sectorCenterPoint)
    // this.allSiteContainer = new createjs.Container();
   
    this.sectorContainer = new createjs.Container();
    this.sectorContainer.cursor = 'pointer';
    this.sectorContainer.x = this.sectorCenterPoint.x;
    this.sectorContainer.y = this.sectorCenterPoint.y;
    this.sectorContainer.scaleX = this.scaleMatrix;
    this.sectorContainer.scaleY = this.scaleMatrix;

    for (let k=0; k<this.data.sector.length; k++) {
      // if (!(bounds.contains(this.sectorLatLng))) continue;
      let startAngle = this.data.sector[k].azimuth - (this.data.sector[k].horizontalBeamWidth / 2);
      let endAngle = this.data.sector[k].azimuth + (this.data.sector[k].horizontalBeamWidth / 2);
      let outerRadius = this.data.sector[k].height;
      let innerRadius = 0;
      let sectorColor=  this.data.sector[k].color;
      let sectorpieColor = 'green';
      let sectorPie = new createjs.Shape(this.pieGenerator(0,0, startAngle, endAngle, outerRadius, innerRadius, sectorColor, sectorpieColor, 1));
      sectorPie.alpha = 0.8;
      sectorPie.cursor = 'pointer';
      sectorPie['latlng'] = this.sectorLatLng;

      this.sectorContainer.addChild(sectorPie)
    }
    console.log(this.sectorContainer)
    // bounds.extend(this.sectorLatLng);
    // this.allSiteContainer.addChild(this.sectorContainer);
    this.stageSiteProposedConfiguration.addChild(this.sectorContainer);
    this.stageSiteProposedConfiguration.update();
  }

  pieGenerator(pie_x, pie_y, startAngle, endAngle, radius1, radius2, fillColor, lineColor, lineThickness) {
    this.drawPieGraphic = new createjs.Graphics();
    this.drawPieGraphic.setStrokeStyle(lineThickness);
    this.drawPieGraphic.beginFill(fillColor);
    this.drawPieGraphic.beginStroke(lineColor);
    this.drawPieGraphic.arc(pie_x, pie_y, radius1, this.toRad(startAngle), this.toRad(endAngle), false);
    this.drawPieGraphic.lineTo(pie_x + Math.cos(this.toRad(endAngle)) * radius2, pie_y + Math.sin(this.toRad(endAngle)) * radius2);
    this.drawPieGraphic.arc(pie_x, pie_y, radius2, this.toRad(endAngle), this.toRad(startAngle), true);
    this.drawPieGraphic.closePath();
    this.drawPieGraphic.endFill();
    return this.drawPieGraphic;
  }

  toRad(angle) {
    return (angle - 90) * Math.PI / 180;
  }
}
