import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'underscore';
import * as createjs from 'createjs-module';
import { SpiderComponent } from '../../spider/spider.component';


interface DataObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class NodesService {
  public customLayerLibrary:DataObject;
  public map:DataObject;
  public siteData:DataObject;
  public fanDataError:DataObject;
  public container:DataObject;
  public stage:DataObject;
  public _simplePopup:DataObject;
  public _points:DataObject;
  public scaleMatrix: number;
  public pixelRatio: number = window.devicePixelRatio || 1;
  public zoomLevel:number;
  public addtionalsector:string;
  public hightlightCell:string;
  public selectionContainer:DataObject;
  public bounds:DataObject;
  public componentRef:DataObject;
  public canvasLayerObj:DataObject;
  public referenceComp:DataObject;
  public dataArray:Array<{[key: string]: any}>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dataSharingService:
    DataSharingService) {
    this.recieveData();
  }

  makeSiteJsonCall(url) {
    return new Promise(function (res, rej) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        res(this.responseText)
      };
      xhr.onerror = rej;
      xhr.open('GET', url);
      xhr.send();
    })
  }

  recieveData() {
    let url = "assets/data/layers/microsites-onair.json";
    let returnResponse = this.makeSiteJsonCall(url);
    returnResponse.then((response) => {
      let dataResponse: any = response;
      this.dataArray = JSON.parse(dataResponse);
    })
    .catch( (error) => {
      console.error(error.message);
    });
  }

  addLayerToMap(paramdata) {
    this.referenceComp = paramdata;
    this.map = this.referenceComp.map;
    this.customLayerLibrary = leaflayer();
    this.siteData = this.dataArray;
    const componentRef = this.componentRef = this;

    let canvasLayer = this.customLayerLibrary.customLayer({
      container: document.createElement("canvas"),

    });

    canvasLayer.on("layer-render", function () {
      //THIS REFERENCE TO ACCESS CUSTOM LAYER FEATURES
      let customLayerThis = this;
      //MAIN CLASS REFERENCE TO ACCESS CLASS FUNCTIONS
      componentRef.nodeDrawings(customLayerThis);
    });
    setTimeout(() => {
      this.canvasLayerObj = canvasLayer;
    }, 1000);

    canvasLayer.addTo(this.referenceComp.map);
  }

  generateCanvasTagConfig(customeLayerThisRef) {
    var canvas = customeLayerThisRef.getContainer();
    var m = L.Browser.retina ? 2 : 1;

    var size = customeLayerThisRef._bounds.getSize();//resize

    var padding = customeLayerThisRef._padding;
    canvas.width = m * size.x;
    canvas.height = m * size.y;
    canvas.style.width = size.x + "px";
    canvas.style.height = size.y + "px";
    return canvas;
  }

  nodeDrawings(customeLayerThisRef) {
    let canvasElement = this.generateCanvasTagConfig(customeLayerThisRef);
    if (typeof (this.siteData) === 'object' && this.siteData !== undefined) {
      //STAGE
      this.container = new createjs.Container();
      //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
      this.stage = new createjs.Stage(canvasElement);

      this.stage.enableDOMEvents(true);
      this.stage.enableMouseOver(50);

      //POPUP
      this._simplePopup = this.getPopup();

      // CREATED ARRAYS BASED ON SITE NUMBER (BANDS) E.G. SITE850 ETC.
      let site850 = _.map(this.siteData.site850, function (item) {
        item.sitebandtype = 'site850';
        return item;
      });
      let site1800 = _.map(this.siteData.site1800, function (item) {
        item.sitebandtype = 'site1800';
        return item;
      });
      let site2300 = _.map(this.siteData.site2300, function (item) {
        item.sitebandtype = 'site2300';
        return item;
      });

      //COMBINING THE ARRAY
      let flatten = _.flatten([site850, site1800, site2300], true);

      //GROUPING THEM BASED ON THEIR 'SAPID' PROPERTY
      let data = _.groupBy(flatten, 'sapid');
      this._points = data;
      this.zoomLevel = customeLayerThisRef._zoom;

      let scaleMatrix = (this.zoomLevel <= 7) ? 0.03 : (this.zoomLevel <= 10) ? 0.08 : (this.zoomLevel <= 13) ? 0.15 : (this.zoomLevel <= 15) ? 0.25 : (this.zoomLevel <= 16) ? 0.35 : 0.40;
      this.scaleMatrix = scaleMatrix * this.pixelRatio;
      this.scaleMatrix = scaleMatrix;
      let pointOffset = L.point(0, -(scaleMatrix * 60) / this.pixelRatio);

      //POP CONFIG
      this._simplePopup.options.offset = pointOffset;
      //EMPTY THE CANVAS
      this.container.removeAllChildren();

      if (this.addtionalsector == 'Planned') {
        var siteCenterDotColor = "rgb(0,15,255)";
      } else {
        var siteCenterDotColor = "#06C1FF";
      }

      //CENTER DOT OF THE SHAPE

      let siteCenterDot = this.getPointGraphics(siteCenterDotColor);
      let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);


      for (const site in data) {
        let siteInner = data[site];
        let latlng = L.latLng(siteInner[0].latitude, siteInner[0].longitude);

        let bounds = this.map.getBounds();

        // PLACING THE COORDINATES
        if (!(bounds.contains(latlng))) continue;
        let dot = this.map.latLngToContainerPoint(latlng);
        let centerPoint = {
          x: dot.x * this.pixelRatio,
          y: dot.y * this.pixelRatio
        }

        //CENTER DOT OF THE SHAPE(FAN)
        if (this.hightlightCell && this.hightlightCell == siteInner[0].sapid) {
          this.selectionContainer = new createjs.Container();
          this.selectionContainer.name = 'highlightcontainer';
          this.selectionContainer.scaleX = scaleMatrix;
          this.selectionContainer.scaleY = scaleMatrix;
          this.selectionContainer.x = centerPoint.x;
          this.selectionContainer.y = centerPoint.y;

          let highlightGraphic = this.getSelectionGraphics('#1e88e5', '#FFFFFF');
          let highlightShape = new createjs.Shape(highlightGraphic);
          this.selectionContainer.addChild(highlightShape);
          this.container.addChild(this.selectionContainer);
        }

        let siteContainer = new createjs.Container();
        siteContainer.x = centerPoint.x;
        siteContainer.y = centerPoint.y;
        siteContainer.scaleX = scaleMatrix;
        siteContainer.scaleY = scaleMatrix;
        siteContainer.name = siteInner[0].sapid;

        var currentBands = {};
        for (const band in siteInner) {
          var bandInner = siteInner[band];
          if (bandInner.sitebandtype !== undefined && bandInner.sitebandtype !== null) {
            currentBands[bandInner.sitebandtype] = true;
          }
        }

        for (const band in siteInner) {
          let bandInner = siteInner[band];
          if (bandInner.sitebandtype !== undefined && bandInner.sitebandtype !== null) {
            let outerRadius = (bandInner.sitebandtype == 'site850') ? 75 : (bandInner.sitebandtype == 'site1800') ? 55 : 35;
            let innerRadius = (bandInner.sitebandtype == 'site850') ? 55 : (bandInner.sitebandtype == 'site1800') ? 35 : 15;

            if (bandInner.sitebandtype == 'site1800') {
              if (!currentBands['site2300']) innerRadius = 15;
            }
            if (bandInner.sitebandtype == 'site850') {
              if (!currentBands['site1800'] && currentBands['site2300']) innerRadius = 35;
              if (!currentBands['site1800'] && !currentBands['site2300']) innerRadius = 15;
            }
            let carrierInnerRadius = innerRadius;
            let startAngle, endAngle;
            for (const sector in bandInner.siteArray) {


              let sectorInner = bandInner.siteArray[sector];
              let sectorColor;
              sectorInner.sitebandtype = bandInner.sitebandtype;
              sectorInner.sitebandtype = bandInner.sitebandtype;

              let sectorid = sectorInner.sectorid;
              let carrierOrNot;
              if (sectorInner.carrier != null) {
                carrierOrNot = true;
              } else {
                carrierOrNot = false;
              }
              if (bandInner.sitebandtype == 'site2300') {
                if (this.addtionalsector == 'Planned') {
                  sectorColor = "rgb(0,15,255)";
                } else {
                  sectorColor = "#5883d1";
                }

                //CALCULATION FOR START AND END ANGLES FOR SHAPE TO BE GENERATED BASED ON THE DATA PROVIDE IN SITE ARRAY LIST
                switch (sectorid) {
                  case 1:
                    let sector4 = _.findWhere(bandInner.siteArray, {
                      sectorid: 4
                    });
                    if (sector4 !== undefined) {
                      if (sector4.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth - 30;
                        endAngle = sectorInner.azimuth - 5;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  case 2:
                    let sector5 = _.findWhere(bandInner.siteArray, {
                      sectorid: 5
                    });
                    if (sector5 !== undefined) {
                      if (sector5.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth - 30;
                        endAngle = sectorInner.azimuth - 5;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  case 3:
                    let sector6 = _.findWhere(bandInner.siteArray, {
                      sectorid: 6
                    });
                    if (sector6 !== undefined) {
                      if (sector6.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth - 30;
                        endAngle = sectorInner.azimuth - 5;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  case 4:
                    let sector1 = _.findWhere(bandInner.siteArray, {
                      sectorid: 1
                    });
                    if (sector1 !== undefined) {
                      if (sector1.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth + 5;
                        endAngle = sectorInner.azimuth + 30;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  case 5:
                    let sector2 = _.findWhere(bandInner.siteArray, {
                      sectorid: 2
                    });
                    if (sector2 !== undefined) {
                      if (sector2.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth + 5;
                        endAngle = sectorInner.azimuth + 30;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                  case 6:
                    let sector3 = _.findWhere(bandInner.siteArray, {
                      sectorid: 3
                    });
                    if (sector3 !== undefined) {
                      if (sector3.azimuth == sectorInner.azimuth) {
                        startAngle = sectorInner.azimuth + 5;
                        endAngle = sectorInner.azimuth + 30;
                      } else {
                        startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 4);
                        endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 4);
                      }
                    } else {
                      startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                      endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                    }
                    break;
                }
              }
              else if (bandInner.sitebandtype == 'site1800') {
                if (this.addtionalsector == 'Planned') {
                  sectorColor = "rgb(0,15,255)";
                } else {
                  sectorColor = "#e7f300";
                }
                startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
              }
              else {
                if (this.addtionalsector == 'Planned') {
                  sectorColor = "rgb(0,15,255)";
                } else {
                  sectorColor = "#be0c2f";
                }
                startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
              }
              sectorInner.pcicolor = sectorColor;
              if (this.addtionalsector == 'Planned') {
                var sectorpieColor = '#fff';
              } else {
                var sectorpieColor = '#000000';
              }

              //PIE GENERATOR GENERATES THE SHAPES BASED ON PARAMS PROVIDED. FOR EXAMPLE, START ANGLE, END ANGLE ETC 
              let sectorPie = new createjs.Shape(this.pieGenerator(0, 0, startAngle, endAngle, outerRadius, innerRadius, carrierInnerRadius, carrierOrNot, sectorColor, sectorpieColor, 1));
              sectorPie.alpha = 0.8;
              sectorPie.shadow = shadow;
              sectorPie.cursor = 'pointer';
              sectorPie['latlng'] = latlng;
              sectorPie['site'] = siteInner;
              sectorPie['sector'] = sectorInner;

              sectorPie.on("mouseover", (event,) => {
                this.nodeOnMouseOver(event);
              });
              sectorPie.on("mouseout", (event) => {
                this.nodeOnMouseOut(event);
              });

              sectorPie.on("click", (event,) => {
                this.nodeOnMouseClick(event);
              });

              siteContainer.addChild(sectorPie);
            }
          }
        }

        //CENTER DOT OF EACH SHAPE
        let siteDot = new createjs.Shape(siteCenterDot);
        siteDot.name = "centerdot";
        siteDot.shadow = shadow;
        siteDot.cursor = 'pointer';
        siteDot['site'] = bandInner.siteArray;
        siteDot['latlng'] = latlng;
        siteContainer.addChild(siteDot);


        //SHOW LABELS FOR EACH SHAPE LAID ON MAP AT ZOOM LEVEL 15 AND ABOVE
        if (this.zoomLevel >= 15) {
          let label = new createjs.Text(siteInner[0].sapid, "bold 30px Lato-Medium", "#FFFFFF");
          label.textAlign = 'center';
          //label.outline = 3;
          label.y = (scaleMatrix * 280) / this.pixelRatio;

          let outline = label.clone();
          //outline.shadow = shadow;
          outline.color = '#000000';
          siteContainer.addChild(label, outline);
        }

        bounds.extend(latlng);
        this.container.addChild(siteContainer);

      }

      this.container.alpha = 1;

      //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
      this.stage.addChild(this.container);
      this.stage.update();
    }
  }

  nodeOnMouseClick(event) {
    this.map.setView(event.target.latlng, 17);
    this.loadSpiderViewComponent(event);
  }

  loadSpiderViewComponent(event) {
    let biggerNodeData = {};
    biggerNodeData['currentbands'] = event.target.site;
    biggerNodeData['sector'] = event.target.sector;

    this.referenceComp.targetElementSpiderView.clear();

    if (this.dataSharingService) {
      this.dataSharingService.sendDataToSpider(biggerNodeData);
    }
    else {
      throw new Error("Data sharing service not found. Please add one.");
    }

    if (this.componentFactoryResolver) {
      let spiderComponent = this.componentFactoryResolver.resolveComponentFactory(SpiderComponent);
      this.referenceComp.targetElementSpiderView.createComponent(spiderComponent);
    }
    else {
      throw new Error("Dynamic component loader not found. Please include resolveComponentFactory module from the ng core.");
    }
  }
  //ON MOUSE OVER OF SHAPE(FAN)
  nodeOnMouseOver(event) {
    let target = event.target;
    let c = event.currentTarget;
    target.alpha = 1;
    target.graphics.strokeStyleCommand.width = 4;
    this.stage.update();
    if (c.sector.sitebandtype !== undefined && c.sector.sitebandtype !== null) {
      let band = (c.sector.sitebandtype == 'site2300') ? 2300 : (c.sector.sitebandtype == 'site1800') ? 1800 : 850;
      let template = "";
      template += `<div class="layout-row"><span class="prefix">PCI : </span> <span class="value">${(c.sector.pci)} </span></div>`;
      template += `<div class="layout-row"><span class="prefix">Band : </span> <span class="value">${(band)} MHz</span></div>`;
      this._simplePopup.setLatLng(c.latlng).setContent(template).openOn(this.map);
    }
  }

  //ON MOUSE OUT OF SHAPE(FAN)
  nodeOnMouseOut(event) {
    let target = event.target;
    target.alpha = 0.8;
    target.graphics.strokeStyleCommand.width = 1;
    this.stage.update();
    this.map.closePopup();
  }

  getPopup() {
    var popup = L.popup({
      className: 'leaflet-simple-popup',
      minWidth: 120,
      offset: L.point(0, -40),
      closeButton: false
    });
    return popup;
  }

  getPointGraphics(color) {
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
    g.beginFill(color);
    g.drawCircle(0, 0, 10);
    return g;
  };

  getSelectionGraphics(strokecolor, color) {
    var g = new createjs.Graphics();
    g.setStrokeStyle(5);
    g.beginStroke(strokecolor);
    g.beginFill(color);
    g.drawCircle(0, 0, 90);
    return g;
  };

  pieGenerator(pie_x, pie_y, startAngle, endAngle, radius1, radius2, carrierInnerRadius, carrierStatus, fillColor, lineColor, lineThickness) {
    var newAngles = (endAngle - startAngle) / 2;
    var newAngle = startAngle + newAngles;

    var g = new createjs.Graphics();
    var strokeStyleCommand = g.setStrokeStyle(lineThickness).command;
    g['strokeStyleCommand'] = strokeStyleCommand;

    g.beginFill(fillColor);
    g.beginStroke(lineColor);
    g.arc(pie_x, pie_y, radius1, this.toRad(startAngle), this.toRad(endAngle), false);
    g.lineTo(pie_x + Math.cos(this.toRad(endAngle)) * radius2, pie_y + Math.sin(this.toRad(endAngle)) * radius2);
    g.arc(pie_x, pie_y, radius2, this.toRad(endAngle), this.toRad(startAngle), true);
    g.closePath();
    g.endFill();


    if (carrierStatus) {
      g.setStrokeStyle(1);
      g.moveTo(pie_x + Math.cos(this.toRad(newAngle)) * carrierInnerRadius, pie_y + Math.sin(this.toRad(newAngle)) * carrierInnerRadius);
      g.lineTo(pie_x + Math.cos(this.toRad(newAngle)) * radius1, pie_y + Math.sin(this.toRad(newAngle)) * radius1);
      g.closePath();
      g.beginStroke("#CD4B5B");
    }
    return g;
  }

  toRad(angle) {
    return (angle - 90) * Math.PI / 180;
  }

  removeLayerFromMap() {
    this.canvasLayerObj.remove();
  }
}
