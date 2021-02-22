import { Component, OnInit, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as createjs from 'createjs-module';
// declare const L: any;
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { Router } from '@angular/router';
import { RedirectLayersPopupComponent } from '../redirect-layers-popup/redirect-layers-popup.component';

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
  polyGraphics: any;
  drawLineGraphics: any;
  allSiteContainer: any;
  pointCircleGraphics: any;
  pointGraphics: any;
  pieOverlayGraphics: any;
  latitude;
  longitude;
  mode;
  map;
  constructor(
    public dialogRef: MatDialogRef<SiteProposedConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shapeService: ShapeService,
    private router: Router,
    public dialog: MatDialog
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
      center: [this.latitude, this.longitude],
      zoomControl: false,
      zoom: 14
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
    let outer = this;
    this.siteProposedConfigurationLayer = new CustomLayer({
      container: document.createElement("canvas")
    });
    
    this.siteProposedConfigurationLayer.on("layer-render", function () {
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
        let contThis = this;
        container.onclick = function () {
          outer.dialogRef.close(true);
          const dialogRef1 = outer.dialog.open(RedirectLayersPopupComponent, {
            width: "470px",
            panelClass: "material-dialog-container",
            data: { transferDataPoly: '', headerNominal: true }
          });
          dialogRef1.afterClosed().subscribe(result => {
            alert("hello")
            outer.shapeService.mapServiceData = outer.mapSitePrposed;
            outer.router.navigate(['/JCP/Layers']);
            console.log( outer.shapeService)
          });
          contThis._container = container;
          contThis._update();
          return contThis._container;
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
    this.mapSitePrposed.addControl(new this.customControlSitePrposed())
    this.mapSitePrposed.setView(new L.LatLng(this.latitude, this.longitude), 14);
    // this.shapeService.mapServiceData = this.mapSitePrposed;
    this.pixelRatio = window.devicePixelRatio || 1;
    
   
    let outerThis = this;

    this.siteProposedConfigurationLayer.addTo(this.mapSitePrposed);
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
      0.03 : (this.zoomLevel <= 10) ?
        0.08 : (this.zoomLevel <= 13) ?
          0.15 : (this.zoomLevel <= 15) ?
            0.25 : (this.zoomLevel <= 16) ?
            0.35 : 0.40;
    this.scaleMatrix = this.scaleMatrix * this.pixelRatio;
    if (undefined != this.stageSiteProposedConfiguration) {
      this.stageSiteProposedConfiguration.removeAllChildren();
      this.stageSiteProposedConfiguration.update();
    }

    this.stageSiteProposedConfiguration = new createjs.Stage(container);
    this.allSiteContainer = new createjs.Container();
    this.stageSiteProposedConfiguration.enableDOMEvents(true);
    this.stageSiteProposedConfiguration.enableMouseOver(50000);
    this.stageSiteProposedConfiguration.removeAllChildren();

    this.sectorLatLng = L.latLng(
      this.latitude,
      this.longitude
    );
    
    this.sectorPoint = this.mapSitePrposed.latLngToContainerPoint(this.sectorLatLng);
    this.sectorCenterPoint = {
        x: this.sectorPoint.x * this.pixelRatio,
        y: this.sectorPoint.y * this.pixelRatio
    };

    let allDContainer = new createjs.Container();
    this.stageSiteProposedConfiguration.addChild(allDContainer)

    let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);
    let lineContainer = new createjs.Container();
    allDContainer.addChild(lineContainer)
    this.sectorContainer = new createjs.Container();
    this.sectorContainer.cursor = 'pointer';
    this.sectorContainer.x = this.sectorCenterPoint.x;
    this.sectorContainer.y = this.sectorCenterPoint.y;
    this.sectorContainer.scaleX = this.scaleMatrix;
    this.sectorContainer.scaleY = this.scaleMatrix;
    
    let outerRadius = 75;
    let innerRadius = 15;

    let siteCenterDot = this.getPointGraphics(this.zoomLevel, '#06C1FF');
    let siteDot = new createjs.Shape(siteCenterDot);
    siteDot['shadow'] = shadow;
    siteDot['cursor'] = 'pointer';

    for (let k=0; k<this.data.sector.length; k++) {
      let startAngle = parseInt(this.data.sector[k].azimuth) - parseInt(this.data.sector[k].horizontalBeamWidth)/2;
      let endAngle = parseInt(this.data.sector[k].azimuth) + parseInt(this.data.sector[k].horizontalBeamWidth)/2;
      let sectorColor=  this.data.sector[k].color;
      let sectorpieColor = 'green';
      let sectorPie = new createjs.Shape(this.pieGenerator(0,0, startAngle, endAngle, outerRadius, innerRadius, sectorColor, sectorpieColor, 1));
      sectorPie['alpha'] = 0.8;
      sectorPie['shadow'] = shadow;
      sectorPie['cursor'] = 'pointer';
      sectorPie['latlng'] = this.sectorLatLng;
      sectorPie['sector'] = this.data.sector[k];
      sectorPie['color'] = sectorColor;

      this.sectorContainer.addChild(sectorPie);

      let outerRadiusOverlay = outerRadius * 10;
      let innerRadiusOverlay = outerRadius * 2;
      let startAngleOverlay = startAngle - 10;
      let endAngleOverlay = endAngle + 10;

      let sectorPieOverlay = new createjs.Shape(this.pieOverlay(0, 0, startAngleOverlay, endAngleOverlay, outerRadiusOverlay, innerRadiusOverlay, '#1e88e5', '#1e88e5', 1));
      sectorPieOverlay.alpha = 0.3;
      this.sectorContainer.addChild(sectorPieOverlay);

      let centerAngle = parseInt(this.data.sector[k].azimuth);
      console.log(this.pixelRatio);
      let divider = this.pixelRatio > 1 ? 2 : 4;
      let endPoint = this.findNewPoint(this.sectorCenterPoint.x, this.sectorCenterPoint.y, centerAngle, ((outerRadiusOverlay+40)/divider));
      let lineGraphic = this.getLineGraphics(this.sectorCenterPoint.x, this.sectorCenterPoint.y, endPoint['x'], endPoint['y']);
      let lineShape = new createjs.Shape(lineGraphic);
      lineContainer.addChild(lineShape);

      let label = new createjs.Text(centerAngle + '°', "bold " + 12 * this.pixelRatio + "px Roboto", "#000000");
      label['textAlign'] = 'center';
      label.outline = 2;
      label['rotation'] = centerAngle;
      label['x'] = endPoint['x'] - (15 * this.pixelRatio);
      label['y'] = endPoint['y'] - (15 * this.pixelRatio);

      let outline = label.clone();
      outline['shadow'] = shadow;
      outline['color'] = '#FFFFFF';
      lineContainer.addChild(label, outline);
    }

    this.sectorContainer.addChild(siteDot)
    allDContainer.addChild(this.sectorContainer);
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

  getLineGraphics(xstart, ystart, xend, yend) {
    let headlen = 30;
    let angle = Math.atan2(yend - ystart, xend - xstart)
    this.drawLineGraphics = new createjs.Graphics();
    this.drawLineGraphics.setStrokeStyle(2);
    this.drawLineGraphics.setStrokeDash([5, 5]);
    this.drawLineGraphics.beginStroke("#000000");
    this.drawLineGraphics.moveTo(xstart, ystart);
    this.drawLineGraphics.lineTo(xend, yend);
    this.drawLineGraphics.lineTo(xend - headlen * Math.cos(angle - Math.PI / 6), yend - headlen * Math.sin(angle - Math.PI / 6));
    this.drawLineGraphics.moveTo(xend, yend);
    this.drawLineGraphics.lineTo(xend - headlen * Math.cos(angle + Math.PI / 6), yend - headlen * Math.sin(angle + Math.PI / 6));
    this.drawLineGraphics.endStroke();

    return this.drawLineGraphics;
  }

  getPolyGraphics(color, stroke, data) {
    this.polyGraphics = new createjs.Graphics();
    this.polyGraphics.setStrokeStyle(2);
    this.polyGraphics.beginStroke(stroke);
    this.polyGraphics.beginFill(color);
    this.polyGraphics.drawPolygon(0, 0, data);

    return this.polyGraphics;
  }

  getPointCircleGraphics(matrix, color) {
    this.pointCircleGraphics = new createjs.Graphics();
    this.pointCircleGraphics.setStrokeStyle(1);
    this.pointCircleGraphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0));
    this.pointCircleGraphics.beginFill(color);
    this.pointCircleGraphics.drawCircle(0, 0, matrix);

    return  this.pointCircleGraphics;
  }

  getPointGraphics(matrix, color) {
    this.pointGraphics = new createjs.Graphics();
    this.pointGraphics.setStrokeStyle(1);
    this.pointGraphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
    this.pointGraphics.beginFill(color);
    this.pointGraphics.drawCircle(0, 0, 10);

    return this.pointGraphics;
  }

  pieOverlay(pie_x, pie_y, startAngle, endAngle, radius1, radius2, fillColor, lineColor, lineThickness) {
    this.pieOverlayGraphics = new createjs.Graphics();
    this.pieOverlayGraphics.setStrokeStyle(lineThickness);
    this.pieOverlayGraphics.beginFill(fillColor);
    this.pieOverlayGraphics.beginStroke(lineColor);
    this.pieOverlayGraphics.arc(pie_x, pie_y, radius1, this.toRad(startAngle), this.toRad(endAngle));
    this.pieOverlayGraphics.lineTo(pie_x + Math.cos(this.toRad(endAngle)) * radius2, pie_y + Math.sin(this.toRad(endAngle)) * radius2);
    this.pieOverlayGraphics.arc(pie_x, pie_y, radius2, this.toRad(endAngle), this.toRad(startAngle), true);
    this.pieOverlayGraphics.closePath();
    this.pieOverlayGraphics.endFill();

    return  this.pieOverlayGraphics;
  }

  findNewPoint(x, y, angle, distance) {
    let result = {};
    let angleRadians = this.toRad(angle);
    result['x'] = distance * Math.cos(angleRadians) + x;
    result['y'] = distance * Math.sin(angleRadians) + y;

    return result;
  }
}
