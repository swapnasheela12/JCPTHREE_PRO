import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
mapServiceData;
lServiceData;
canvasLayerServiceData;
  constructor(private http: HttpClient) { }

  getStateShapes(): Observable<any> {
    return this.http.get('/assets/data/jcp3_state.json');
  }
  getSmallCellData(): Observable<any> {
    return this.http.get('assets/data/layers/smallcell.json');
  }
  getNominalMacroData(): Observable<any> {
    // return this.http.get('/assets/data/layers/markerData.json');
    return this.http.get('assets/data/layers/nominalSitesMacro.json');
  }

}
