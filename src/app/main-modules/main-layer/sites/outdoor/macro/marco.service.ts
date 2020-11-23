import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as L from 'leaflet';
import * as createjs from 'createjs-module';
import { SpiderComponent } from '../spider/spider.component';


@Injectable({
  providedIn: 'root'
})

export class MarcoService {

  /**
   * @param {jsonData} Object site json data
   * @param {mainComponentRef} Object Main component  reference
   */

  public nodeCreationInitializer = function (jsonData, mainComponentRef) {
    console.log(mainComponentRef);
    this._requestCanceller = null;
    this._pixelRatio = window.devicePixelRatio || 1;
    this.siteData = jsonData;
    if (typeof (this.siteData) === 'object' && this.siteData !== undefined) {
      //FUNCTION FROM CANVAS LIBRARY WHICH PROVIDES THE CANVAS AND COORDINATES(BOUNDS)
      this.onDrawLayer = function (info) {
        //STAGE
        this._container = new createjs.Container();

        //KEEPING STAGE READY BY PASSING CANVAS LAYER OFFERED BY CANAVAS LIBRARY
        this._stage = new createjs.Stage(info.canvas);

        this._stage.enableDOMEvents(true);
        this._stage.enableMouseOver(50);

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

        //SETTING UP THE POSITION OF THE POP UP
        let scaleMatrix = (info.zoom <= 7) ? 0.03 : (info.zoom <= 10) ? 0.08 : (info.zoom <= 13) ? 0.15 : (info.zoom <= 15) ? 0.25 : (info.zoom <= 16) ? 0.35 : 0.40;
        this.scaleMatrix = scaleMatrix * this._pixelRatio;
        this.scaleMatrix = scaleMatrix;
        let pointOffset = L.point(0, -(scaleMatrix * 60) / this._pixelRatio);

        //POP CONFIG
        this._simplePopup.options.offset = pointOffset;

        //EMPTY THE CANVAS
        this._container.removeAllChildren();

        if (this._addtionalsector == 'Planned') {
          var siteCenterDotColor = "rgb(0,15,255)";
        } else {
          var siteCenterDotColor = "#06C1FF";
        }

        //CENTER DOT OF THE SHAPE
        let siteCenterDot = this.getPointGraphics(info.zoom, siteCenterDotColor);
        let shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 1, 2, 5);

        for (const site in data) {
          let siteInner = data[site];
          let latlng = L.latLng(siteInner[0].latitude, siteInner[0].longitude);

          // PLACING THE COORDINATES
          if (!(info.bounds.contains(latlng))) continue;
          let dot = info.layer._map.latLngToContainerPoint(latlng);
          let centerPoint = {
            x: dot.x * this._pixelRatio,
            y: dot.y * this._pixelRatio
          }

          //CENTER DOT OF THE SHAPE(FAN)
          if (this._hightlightCell && this._hightlightCell == siteInner[0].sapid) {
            this._selectionContainer = new createjs.Container();
            this._selectionContainer.name = 'highlightcontainer';
            this._selectionContainer.scaleX = scaleMatrix;
            this._selectionContainer.scaleY = scaleMatrix;
            this._selectionContainer.x = centerPoint.x;
            this._selectionContainer.y = centerPoint.y;

            let highlightGraphic = this.getSelectionGraphics('#1e88e5', '#FFFFFF');
            let highlightShape = new createjs.Shape(highlightGraphic);
            this._selectionContainer.addChild(highlightShape);
            this._container.addChild(this._selectionContainer);
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
                  if (this._addtionalsector == 'Planned') {
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
                  if (this._addtionalsector == 'Planned') {
                    sectorColor = "rgb(0,15,255)";
                  } else {
                    sectorColor = "#e7f300";
                  }
                  startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                  endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                }
                else {
                  if (this._addtionalsector == 'Planned') {
                    sectorColor = "rgb(0,15,255)";
                  } else {
                    sectorColor = "#be0c2f";
                  }
                  startAngle = sectorInner.azimuth - (sectorInner.horizontalBeamWidth / 2);
                  endAngle = sectorInner.azimuth + (sectorInner.horizontalBeamWidth / 2);
                }

                sectorInner.pcicolor = sectorColor;

                if (this._addtionalsector == 'Planned') {
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

                //EVENTS 
                sectorPie.on("click", (event) => {
                  this.nodeOnMouseClick(info, event);
                })
                sectorPie.on("mouseover", (event) => {
                  this.nodeOnMouseOver(info, event);
                });
                sectorPie.on("mouseout", (event) => {
                  this.nodeOnMouseOut(info, event);
                })
                siteContainer.addChild(sectorPie)
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


          // SHOW LABELS FOR EACH SHAPE LAID ON MAP AT ZOOM LEVEL 15 AND ABOVE
          if (info.zoom >= 15) {
            let label = new createjs.Text(siteInner[0].sapid, "bold 30px RobotoDraft", "#FFFFFF");
            label.textAlign = 'center';
            label.outline = 3;
            label.y = (scaleMatrix * 280) / this._pixelRatio;

            let outline = label.clone();
            outline.shadow = shadow;
            outline.color = '#000000';
            siteContainer.addChild(label, outline);
          }

          info.bounds.extend(latlng);
          this._container.addChild(siteContainer);
        }

        this._bounds = info.bounds;
        this._container.alpha = 1;

        //PUSH THE SHAPES SAVED IN CONTAINER AND DISPLAY IT 
        this._stage.addChild(this._container);
        this._stage.update();
      }

      this.nodeOnMouseClick = function (info, event) {
        console.log("event", event);
        console.log("mainComponentRef", mainComponentRef);
        let viewData = {};
        viewData['currentbands'] = event.target.site;
        viewData['sector'] = event.target.sector;

        if (mainComponentRef) {
          mainComponentRef.target.clear();
          /** * @param {datashare} object  Data sharing service */
          if (mainComponentRef.datashare) {
            console.log("viewData", viewData)
            mainComponentRef.datashare.sendDataToSpider(viewData);
          }
          else {
            throw new Error("Data sharing service not found. Please add one.");
          }

          if (mainComponentRef.componentFactoryResolver) {
            let spiderComponent = mainComponentRef.componentFactoryResolver.resolveComponentFactory(SpiderComponent);
            mainComponentRef.componentRef = mainComponentRef.target.createComponent(spiderComponent);
          }
          else {
            throw new Error("Dynamic component loader not found. Please include resolveComponentFactory module from the ng core.");
          }
        }
        else {
          throw new Error("Main component reference not found. Please pass 'this' as a second parameter/")
        }
      }

      //ON MOUSE OVER OF SHAPE(FAN)
      this.nodeOnMouseOver = function (info, event) {
        let target = event.target;
        let c = event.currentTarget;
        target.alpha = 1;
        target.graphics.strokeStyleCommand.width = 4;
        this._stage.update();
        if (target.sector.sitebandtype !== undefined && target.sector.sitebandtype !== null) {
          let band = (c.sector.sitebandtype == 'site2300') ? 2300 : (c.sector.sitebandtype == 'site1800') ? 1800 : 850;
          let template = "";
          template += `<div class="layout-row"><span class="prefix">PCI : </span> <span class="value">${(c.sector.pci)} </span></div>`;
          template += `<div class="layout-row"><span class="prefix">Band : </span> <span class="value">${(band)} MHz</span></div>`;
          this._simplePopup.setLatLng(target.latlng).setContent(template).openOn(info.layer._map);
        }
      }

      //ON MOUSE OUT OF SHAPE(FAN)
      this.nodeOnMouseOut = function (info, event) {
        let target = event.target;
        target.alpha = 0.8;
        target.graphics.strokeStyleCommand.width = 1;
        this._stage.update();
        info.layer._map.closePopup();
      }


      this.pieGenerator = function (pie_x, pie_y, startAngle, endAngle, radius1, radius2, carrierInnerRadius, carrierStatus, fillColor, lineColor, lineThickness) {
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

      this.getPopup = function () {
        var popup = L.popup({
          className: 'leaflet-simple-popup',
          minWidth: 120,
          offset: L.point(0, -40),
          closeButton: false
        });
        return popup;
      }

      this.getPointGraphics = function (matrix, color) {
        var g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.beginFill(color);
        g.drawCircle(0, 0, 10);
        return g;
      };

      this.getSelectionGraphics = function (strokecolor, color) {
        var g = new createjs.Graphics();
        g.setStrokeStyle(5);
        g.beginStroke(strokecolor);
        g.beginFill(color);
        g.drawCircle(0, 0, 90);
        return g;
      };

      this.toRad = function (angle) {
        return (angle - 90) * Math.PI / 180;
      }
    }
    else {
      throw new Error("JSON object data not found")
    }
  }
}

