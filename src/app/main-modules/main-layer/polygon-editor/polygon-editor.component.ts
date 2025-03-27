import { ShapeService } from 'src/app/main-modules/main-layer/layers-services/shape.service';
import { ViewChild } from '@angular/core';
import { AdDirective } from './../../../_directive/dynamicComponent/ad.directive';
import { MainLayerComponent } from './../main-layer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-polygon-editor',
  templateUrl: './polygon-editor.component.html',
  styleUrls: ['./polygon-editor.component.scss']
})
export class PolygonEditorComponent implements OnInit {
  public circle
  public map
  public poly
  public polyRectangle
  public polyline

  public components = [MainLayerComponent];
  public currentComponent = null;
  @ViewChild(AdDirective) adHost: AdDirective;

  constructor(private shapeService: ShapeService, public datashare: DataSharingService, public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MainLayerComponent);
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

  }

  ngAfterViewInit(): void {
    this.map = this.shapeService.mapServiceData;
    this.datashare.mainLayerMessage.subscribe(
      (test) => {
       console.log(test,"test");
       
      }
    )
    this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
      if (dataPoly != {}) {
        this.polyDirectFunc();
      }
    })

  }

  public dataPolyList;
  polyDirectFunc() {
    this.datashare.currentMessageDialog.subscribe((dataPoly: any) => {
      console.log(dataPoly, "dataPoly");
      // this.map.setZoom(16);
      this.dataPolyList = dataPoly;
      for (let index = 0; index < this.dataPolyList.transferDataPoly.length; index++) {
        const ele = this.dataPolyList.transferDataPoly[index];
        console.log(ele, "ele");

        // if (ele.checked == true) {
        if (ele.polydata.properties.shape == 'Circle') {
          this.circle = L.circle([ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0]], ele.polydata.properties.radius, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
          }).addTo(this.map);
          this.map.setZoom(ele.polydata.geometry.coordinates[1], ele.polydata.geometry.coordinates[0], 14);
        } else if (ele.polydata.properties.shape == 'Polygon') {
          this.poly = L.polygon([
            [19.060009, 72.876063],
            [19.013112, 72.907984],
            [19.065525, 72.916565],
            [19.060009, 72.876063]
          ]).addTo(this.map);
          this.map.setZoom(14);
        } else if (ele.polydata.properties.shape == 'Rectangle') {
          this.polyRectangle = L.rectangle([
            [19.045527, 72.902422],
            [19.045527, 72.905597],
            [19.049482, 72.905597],
            [19.049482, 72.902422],
            [19.045527, 72.902422]
          ], { color: "#ff7800", weight: 1 }).addTo(this.map);
          this.map.setZoom(14);

        } else {
          this.polyline = L.polyline([
            [19.045568, 72.894765],
            [19.046055, 72.898672],
            [19.045933, 72.901742]
          ]).addTo(this.map);
          this.map.setZoom(14);
        }

        // } else {

        //   if (ele.transferDataPoly.polydata.properties.shape == 'Rectangle') {
        //     this.polyRectangle.remove();
        //   } else if (ele.transferDataPoly.polydata.properties.shape == 'Polygon') {
        //     this.poly.remove();
        //   } else if (ele.transferDataPoly.polydata.properties.shape == 'Circle') {
        //     this.circle.remove();
        //   } else {
        //     this.polyline.remove();
        //   }

        // }
      }
    });
  }







}
