import { AfterViewInit, Component, Input, OnDestroy, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: 'app-splitmap',
  templateUrl: './splitmap.component.html',
  styleUrls: ['./splitmap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SplitmapComponent implements AfterViewInit {
  @ViewChild('splitmapComponent', { read: ViewContainerRef }) splitmapComponentRef: ViewContainerRef;
  @Input() splitmapPayload: any;

  public ref: any = [];
  public removable = true;
  public object: any;
  public mapSlotArray: any = [];
  public splitmapCount: any;
  public operatorNames: any[];
  public criteriaDataArray: any[];
  public gridDataArray: any[];
  public mapDataJSON: any[] = [
    {
      name: "Coverage",
      operator: "Jio",
      coords: [
        {
          "coordinates": [22.554415740003208, 88.3381017270688],
          "color": "green"
        },
        {
          "coordinates": [22.53539059204079, 88.34359109913086],
          "color": "red"
        },
        {
          "coordinates": [22.57724245452637, 88.37652733150328],
          "color": "blue"
        }
      ]
    },


    {
      name: "Coverage",
      operator: "Airtel",
      coords: [
        {
          "coordinates": [22.733123662313677, 88.34931106093383],
          "color": "lightgreen"
        },
        {
          "coordinates": [22.664709810176827, 88.40019465080597],
          "color": "yellow"
        },
        {
          "coordinates": [22.688785246513845, 88.24754388118961],
          "color": "teal"
        }
      ]
    },

    {
      name: "Coverage",
      operator: "Vodafone Idea",
      coords: [
        {
          "coordinates": [22.59372606392931, 88.58559521277321],
          "color": "brown"
        },
        {
          "coordinates": [22.398332241511387, 88.51011634691987],
          "color": "black"
        },
        {
          "coordinates": [22.795173295587578, 88.36190330124415],
          "color": "orange"
        }
      ]
    }
  ]
  public aComponentRef: any;

  ngAfterViewInit() {
    this.init();
  }

  init() {
    this.setMapDecisionParams();
    this.closechip();
  }

  
  setMapDecisionParams() {
    let dataR = this.splitmapPayload[0];
    let operatorsLength: number;
    let criteriaDataArrayLength: number;
    this.operatorNames = dataR.operators ? dataR.operators : [];
    operatorsLength = this.operatorNames.length;
    this.criteriaDataArray = dataR.criteriaPayload ? dataR.criteriaPayload : [];
    criteriaDataArrayLength = this.criteriaDataArray.length;
    this.gridDataArray = dataR.gridData ? dataR.gridData : [];
    this.aComponentRef = dataR.splitComponentRef;

    //SPLIT 1
    if (operatorsLength == 1 && (criteriaDataArrayLength == 1)) {
      this.splitmapCount = 1
      this.setMapLayer(this.splitmapCount);
    }

    //SPLIT 2
    else if (operatorsLength == 1 && criteriaDataArrayLength == 2 || operatorsLength == 2 && criteriaDataArrayLength == 1) {
      this.splitmapCount = 2
      this.setMapLayer(this.splitmapCount);
    }

    //SPLIT 3
    else if (operatorsLength == 1 && criteriaDataArrayLength == 3 || operatorsLength == 3 && criteriaDataArrayLength == 1) {
      this.splitmapCount = 3
      this.setMapLayer(this.splitmapCount);
    }
    else {
      this.splitmapCount = 1;
      this.setMapLayer(this.splitmapCount);
    }
  }

  setMapLayer(splitmapCount: any) {
    let screenWidth = window.innerWidth;
    let slotWidth = screenWidth / splitmapCount;
    for (let i: any = 0; i <= splitmapCount - 1; i++) {
      let element = document.createElement("article");
      let ii = Math.floor((Math.random() * 10) + 1);
      this.object = {
        "mapId": "map" + i,
        "titleLayerUrl": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "properties": {
          "minZoom": 5,
          "maxZoom": 20,
          "center": [22.57, 88.36],
          "zoom": 10,
          "zoomControl": false,
          "color": "green"
        },
        "coordinates": [22.57, 88.36]
      }
      element.setAttribute("id", this.object.mapId);
      element.setAttribute("class", "mapcss")
      element.style.width = slotWidth + "px";

      var parent = document.getElementsByClassName("maps-wrapper")[0]
      parent.appendChild(element);
      let mapObject: any = undefined;

      mapObject = L.map(element, {
        zoomControl: this.object.properties.zoomControl
      }).setView(this.object.properties.center, this.object.properties.zoom);


      L.tileLayer(this.object.titleLayerUrl).addTo(mapObject);
      let p: any = [];

      setTimeout(() => {
        mapObject.invalidateSize();
      }, 0);


      this.mapSlotArray.push(mapObject);
      let createChip = document.createElement("div");
      createChip.setAttribute("id", "chip" + i);
      createChip.setAttribute("class", "chip-template");



      //SINGLE OPERATOR HANDLING
      if (this.operatorNames.length == 1) {
        var opName = this.operatorNames[0];
        createChip.insertAdjacentHTML("afterbegin", opName);
      }
      else if ((this.operatorNames.length > 1 && this.gridDataArray.length == 0)) {
        var opName = this.operatorNames[i]
        createChip.insertAdjacentHTML("afterbegin", opName);
      }

      let criteriaTag = document.createElement("span");
      criteriaTag.setAttribute("class", "ml-2");

      let closeChip = document.createElement("span");
      closeChip.setAttribute("class", "closechip");
      closeChip.insertAdjacentHTML("afterbegin", "<i class='fa fa-times'></i>");

      //SINGLE CRITERIA HANDLING
      if (this.criteriaDataArray.length == 1) {
        let criteriaText: string = this.criteriaDataArray[0].name
        var criteriaName: Text = document.createTextNode(criteriaText);
      }
      else {
        var criteriaName: Text = document.createTextNode(this.criteriaDataArray[i].name);
      }

      criteriaTag.appendChild(criteriaName);
      createChip.appendChild(criteriaTag);
      createChip.appendChild(closeChip);
      element.appendChild(createChip);


      //INTIALISE CANVAS
      var canvasLayer = leaflayer().customLayer({
        container: document.createElement("canvas")
      }).addTo(mapObject);

      //SETTING UP DATA
      //this.plotData(canvasLayer, slotWidth, criteriaName, opName);
    }
    this.syncMaps();
  }

  //CLOSE CHIPS
  closechip() {
    const allchips: any = document.querySelectorAll(".closechip");
    [...allchips].forEach(chip => {
      chip.addEventListener("click", (event: any) => {
        console.log(event.target.parentNode.parentNode);
        event.target.parentNode.parentNode.remove();
      });
    });
  }

  //SYNC ALL MAPS
  syncMaps() {
    let getMapArrayIndices: any[] = [];
    this.mapSlotArray.forEach((v: any, i: any) => {
      getMapArrayIndices.push(i);
    });
    getMapArrayIndices.forEach((f, i) => {
      getMapArrayIndices.forEach((s, j) => {
        if (i !== j) {
          this.mapSlotArray[f].sync(this.mapSlotArray[s], true)
        }
      });
    });
  }

  //PLOT DATA
  plotData(canvasLayer: any, slotWidth: any, opName: any) {
    let ref = this;
    canvasLayer.on("layer-render", function (this: any) {
      this.getContainer().style.width = slotWidth + "px";
      this.getContainer().style.height = window.innerHeight + "px";
      var { ctx } = this.setFullLayerBounds();
      ref.mapDataJSON.forEach((element: any) => {
        element.coords.forEach((coord: any) => {
          if (opName == element.operator) {
            var point = this._map.latLngToContainerPoint(coord.coordinates);
            ctx.fillStyle = coord.color;
            ctx.fillRect(point.x, point.y, 50, 50);
            this._map.invalidateSize();
          }
        });
      });
    });
  }
}



