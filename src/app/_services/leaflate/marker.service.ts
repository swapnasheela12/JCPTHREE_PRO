import { MatDialog } from '@angular/material/dialog';
import { Injectable, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { SpiderViewComponent } from 'src/app/main-modules/main-layer/spider-view/spider-view.component';
import { SpiderComponent } from 'src/app/main-modules/main-layer/sites/outdoor/spider/spider.component';
import { DataSharingService } from '../data-sharing.service';
import { NominalViewComponent } from 'src/app/main-modules/main-layer/sites/outdoor/spider/nominal-view/nominal-view.component';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/layers/markerData.json';
  ref;
  map;
  mainlayerRef;
  nominalData;
  constructor(private datashare: DataSharingService, private http: HttpClient, public dialog: MatDialog,
    private mainComponentRef: ComponentFactoryResolver
  ) {
    this.getNominalData();
    this.ref = this;

  }

  getNominalData() {
    this.http.get<any>("assets/data/layers/nominalssites/nominals.json").subscribe((nominalData) => {
      this.nominalData = nominalData;
      console.log("nominalData", this.nominalData)
    });
  }

  getReference(ref) {
    this.mainlayerRef = ref;
  }

  makeCapitalMarkers(map: L.Map): void {
    this.map = map
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map).on('click', (evt) => {
          this.onMapClick(evt, this.ref, this.mainlayerRef);
        });
      }
    });
  }

  onMapClick(e, ref, mainlayer) {
    console.log(e.target._latlng);
    mainlayer.map.setView(e.target._latlng);
    let data = {
      event: e.target,
      data: ref.nominalData
    }
    mainlayer.datashare.sendDataToSpider(data);
    let nominalViewComponent = mainlayer.componentFactoryResolver.resolveComponentFactory(NominalViewComponent);
    mainlayer.componentRef = mainlayer.target.createComponent(nominalViewComponent);
  }
}
