import { MatDialog } from '@angular/material/dialog';
// import { SpiderViewComponent } from './../../main-modules/main-layer/spider-view/spider-view.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/layers/markerData.json';
  constructor(private http: HttpClient,public dialog: MatDialog) { }
  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      console.log(res, "res");

      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map).on('click', this.onMapClick);;
      }
    });
  }
  onMapClick(e) {
    console.log(e,"e");
    var target = e.target;

    // var spiderViewPopDialogRef = {
    //   width: '740px',
    //   height: '350px',
    //   position: { bottom: '60px', right: "60px" },
    //   panelClass: "table-view-layers-dialog-container",
    //   backdropClass: 'cdk-overlay-transparent-backdrop',
    //   disableClose: true,
    //   hasBackdrop: true
    // }
    // const dialogRef = this.dialog.open(SpiderViewComponent, spiderViewPopDialogRef);

    // dialogRef.backdropClick().subscribe(_ => {
    //   dialogRef.close();
    // });

   // popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(macarte);
    // var marker = L.marker(e.latlng).addTo(macarte)
  }
}
