import { Injectable } from '@angular/core';
import { BoundariesService } from './boundaries/boundaries.service';
import { NodesService } from './nodes/nodes.service';

@Injectable({
  providedIn: 'root'
})
export class NodesAndBoundariesManagerService {

  constructor(
    private nodeCreationService:NodesService,
    private boundariesService:BoundariesService
  ) { }


  initialializeNodesAndBoundaries(paramdata) {
    //INITIAL LOAD
    this.removeCanvasFromMap();
    this.boundariesService.addLayerToMap(paramdata.map);
    paramdata.map.on('zoom',() => {
      if(paramdata.map.getZoom() >= 13){
        this.removeCanvasFromMap();
        this.nodeCreationService.addLayerToMap(paramdata);
      }
      else{
        this.removeCanvasFromMap();
        this.boundariesService.addLayerToMap(paramdata.map);
      }
    });
  }

  removeCanvasFromMap(){
    let canvasElement = document.getElementsByTagName("canvas")[0];
    if(canvasElement){
      canvasElement.remove();
    }
  }
}
