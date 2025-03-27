import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import * as L from 'leaflet';
import { CustomLayer } from 'leaflet-customlayer';
import { HttpClient } from '@angular/common/http';
import { MapHeaderViewComponent } from '../../nominal-generation-coverage/map-header-view/map-header-view.component';

@Component({
  selector: 'app-nominal-validation-additionallayer',
  templateUrl: './nominal-validation-additionallayer.component.html',
  styleUrls: ['./nominal-validation-additionallayer.component.scss']
})
export class NominalValidationAdditionallayerComponent {
  mainLayerRef: {};
  nominalValidationLayer: any;
  nominalValidationLayerContainer: any;
  pixelRatio: number;
  map: any;
  canvasCore: any;
  routePlannedLayerHeader = {
    "title": "Back To Nominal Validation",
    "headerSapid": "Maharashtra-NP-CV-121020_v1",
    "name": "nominal-validation"
  };
  constructor(
    private dataShare: DataSharingService,
    private shapeService: ShapeService,
    private http: HttpClient
  ) {
    $('#Layers').parent()[0].click();
    this.dataShare.layerNameFunc([{name: 'Back To Nominal Geneartion', source: 'create'}]);
    this.dataShare.pinLayerCheck({name: "nominal-validation-layer"});
    this.dataShare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
      }
    )
    this.pixelRatio = window.devicePixelRatio || 1;

    this.map = this.shapeService.mapServiceData;
    this.nominalValidationLayer = new CustomLayer({
      container: document.createElement("canvas")
    });

    this.map.setZoom(4);
    let outerThis = this;
    this.nominalValidationLayer.on("layer-render", function () {
      let that = this;
      const componentRef = this.componentRef = this;
      outerThis.getRouteData().subscribe((data) => {
        this.routePlannedData = data;
        that.nominalValidationLayerContainer = outerThis.resizeContainer();
        outerThis.createLayer(that.nominalValidationLayerContainer,
          that._zoom,
          this.routePlannedData,
          componentRef,
          that._assetQueue);
      });
    });

    this.nominalValidationLayer.addTo(this.map);

    
  }

  getRouteData() {
    return this.http.get("assets/data/layers/topologies/Fibre/structure/structure.json");
  }

  createLayer = function (container, zoomLevel, routePlannedData, layerContainer, routeQueue) {
    let nominalViewComponent = this.mainLayerRef.componentFactoryResolver.resolveComponentFactory(MapHeaderViewComponent);
    this.mainLayerRef.componentRef = this.mainLayerRef.target.createComponent(nominalViewComponent);
    this.mainLayerRef.componentRef.instance.headerData = this.routePlannedLayerHeader;
    this.dataShare.addExtraLayerDynamic([{name: 'nominal-validation', display: 'create'}]);
  }

  resizeContainer() {
    this.canvasCore = this.nominalValidationLayer.getContainer();
    let m = L.Browser.retina ? 2 : 1;
    let size = this.nominalValidationLayer._bounds.getSize();
    this.canvasCore.width = m * size.x;
    this.canvasCore.height = m * size.y;
    this.canvasCore.style.width = size.x + "px";
    this.canvasCore.style.height = size.y + "px";
    return this.canvasCore;
  }

}
