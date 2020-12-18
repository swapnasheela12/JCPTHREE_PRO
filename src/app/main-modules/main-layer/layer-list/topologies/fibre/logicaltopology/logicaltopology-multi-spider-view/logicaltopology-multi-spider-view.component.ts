import { SpliterViewComponent } from './../spliter-view/spliter-view.component';
import { AlarmsComponent } from './../../../../../../my-jcp/template-card-view/alarms/alarms.component';
import { CandidatesComponent } from './../../../../../../../modules/components/properties/candidates/candidates.component';
import { ConfigurationComponent } from './../../../../../../../modules/components/configuration/configuration.component';
import { CapacityComponent } from './../../../../../../../modules/components/capacity/capacity.component';
import { PropertiesComponent } from './../../../../../../../modules/components/properties/properties.component';
import { AlarmDetailsPopupComponent } from './../../../../../../modules/performance-management/my-performance-reports/change-impact-analysis/alarm-details-popup/alarm-details-popup.component';
import { KpiComponent } from './../../../../sites/outdoor/spider/popup/kpi/kpi.component';
import { DataSharingService } from './../../../../../../../_services/data-sharing.service';
import { Component, OnInit, ElementRef, ComponentFactoryResolver } from '@angular/core';
import * as d3 from 'd3/index';
declare let $: any;
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forEach } from 'lodash';

@Component({
  selector: 'jcpBeta-spider-view',
  template: `
    <div class="spidermain-wrapper-logical-topology">
    <div class="spideroverlay">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
    </div>
    <div></div>
    </div>
    `,
  styles: [
    `
      .spidermain-wrapper-logical-topology{
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 10000;
          background-color: rgba(0,0,0,0);
          top:0;
          overflow:auto
      }
      
      .spideroverlay,.spideroverlay svg{
          width: 100%;
          height: 100%;
          position: relative;
          overflow:auto
      }
      
      .spideroverlay svg g{
          display: inline-block;
      }
      .wrapper{
          display: inline-block;
      }
      `
  ]
})
export class LogicaltopologyMultiSpiderViewComponent implements OnInit {

  circleGroup;
  arc;
  pie;
  donutArcsGroup;
  linePointsGroup;
  leafSVG;
  // bandsArcsGroup;
  bandarc;
  bandGroup;
  message;
  mainlayer;
  eventData;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private datashare: DataSharingService, private element: ElementRef,
    private router: Router, private http: HttpClient, public dialog: MatDialog) { }

  public currentbands;
  public sector;

  public smallCellData: any = [
    {
      name: 'Properties',
      value: 5,
      color: '#8CC63F',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf112',
      frequency: 0.01492,
      eventname: 'sites-tree-properties',
      radiuscircle: 200,
      deviceType: [{
        device: "css router",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "L2 Switch",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "AG1 Router",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "OLT",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "Splitter 1",
        color: "#1A7DDD",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "OTB",
        color: "#1A7DDD",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "L2 Switch",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      },
      {
        device: "AG1 Router",
        color: "#94C65A",
        font: 'Material-Design-Iconic-Font',
        fontvalue: '\uf112',
        value: 5,
      }
      ],
    }, {
      name: 'Create Workorder',
      value: 5,
      color: '#8dc63f',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf222',
      disabled: true,
      frequency: 0.02782,
      radiuscircle: 100,
      eventname: 'sites-tree-createworkorder',
      deviceType: [
        {
          device: "L2 Switch",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf222',
          value: 5,
        },
        {
          device: "AG1 Router",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf222',
          value: 5,
        },
        {
          device: "OLT",
          color: "#94C65A",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf222',
          value: 5,
        },
        {
          device: "Splitter 2",
          color: "#1A7DDD",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf222',
          value: 5,
        },
        {
          device: "OTB",
          color: "#1A7DDD",
          font: 'Material-Design-Iconic-Font',
          fontvalue: '\uf222',
          value: 5,
        }
      ],
    }

  ];



  currentBand = []
  ngOnInit() {
    this.datashare.currentsmallCellPlanned.subscribe(val => {
      // console.log(val, "val");

      // this.currentbands = val['currentbands'];
      // this.mainlayer = val['mainlayer'];
      // this.eventData = val['eventData'];
    });

    this.initializeBiggerNode();
  }

  initializeBiggerNode() {
    let mainElement = this.element.nativeElement;
    let element = $(mainElement).find('.spideroverlay')[0];
    let rawSvg = $(element).find('svg');
    let svgGroup: any = d3.select(rawSvg[0]);
    let data = [];
    data = this.smallCellData;
    let clientWidth = element.offsetWidth;
    let clientHeight = element.offsetHeight;
    let screenWidth = clientWidth > 0 ? clientWidth : 500;
    let screenHeight = clientHeight > 0 ? clientHeight : 500;

    let wrapgroup = svgGroup.append('g')
      .attr('class', 'wrapper')
      .attr('transform', 'translate(' + ((screenWidth / 2) + 4) + ',' + ((screenHeight / 2) + 12) + ')');

    let bandGroup = wrapgroup.append('g')
      .attr('transform', 'translate(0,0)');

    //background circle
    bandGroup.append('circle')
      .attr('r', 275)
      .attr('filter', "blur(10px)")
      .attr('fill', "rgba(229,234,236,70%)")
      .style('cursor', 'pointer');

    this.smallCellData.forEach(item => {

      let margin = {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20
      };

      let width = Math.min(screenWidth, 500) - margin.left - margin.right;

      //Create an arc function
      let arc = d3.arc()
        .innerRadius(width * 0.75 / 2)
        .outerRadius(width * 0.75 / 2 + 30);

      let arcInner = d3.arc()
        .innerRadius(width * 0.33 / 2)
        .outerRadius(width * 0.33 / 2 + 30);

      //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
      let pie = d3.pie()
        .startAngle(0 * Math.PI / 360)
        .endAngle(90 * Math.PI / 360 + 2 * Math.PI)
        .value((d) => {
          return d['value'];
        })
        .padAngle(.01)
        .sort(null);

      let diagonal = function link(d) {
        return "M" + d.source.y + "," + d.source.x
          + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
          + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
          + " " + d.target.y + "," + d.target.x;
      };

      //////////////////////////////////////////////////////////////
      //////////////////// Create Donut Chart //////////////////////
      //////////////////////////////////////////////////////////////


      //center of image
      let circleOrbitGroup = wrapgroup.append('g').attr('class', 'bandsArcsGroup');

      circleOrbitGroup.append("circle")
        .attr('class', 'circleOrbit')
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.5)
        .attr("r", item.radiuscircle);

      circleOrbitGroup.selectAll("circle")
        .attr("id", function (d, i) { return "circleOrbit" + i; });


      //Create the donut slices and also the invisible arcs for the text

      let donutArcsGroup = circleOrbitGroup.selectAll('.donutArcsGroup')
        .data(pie(item.deviceType))
        .enter().append('g')
        .attr('class', 'donutArcsGroup');

      if (item.radiuscircle == "100") {
        donutArcsGroup.append('path')
          .attr('d', arcInner)
          .style('fill', 'none')
          .attr('class', function (d, i) {
            //Search pattern for everything between the start and the first capital L
            let firstArcSection = /(^.+?)L/;

            //Grab everything up to the first Line statement
            let newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
            //Replace all the comma's so that IE can handle it
            newArc = newArc.replace(/,/g, ' ');

            //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
            //flip the end and start position
            if (d.endAngle > 90 * Math.PI / 180) {
              let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
                middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
                endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
              //Flip the direction of the arc by switching the start en end point (and sweep flag)
              //of those elements that are below the horizontal line
              let newStart = endLoc.exec(newArc)[1];
              let newEnd = startLoc.exec(newArc)[1];
              let middleSec = middleLoc.exec(newArc)[1];

              //Build up the new arc notation, set the sweep-flag to 0

              newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
            } //if

            //Create a new invisible arc that the text can flow along
            // d3.select(this.parentNode).append('path')
            d3.select(this.parentNode).append('path')
              .attr('class', 'hiddenDonutArcs')
              .attr('id', 'donutArcInner' + i)
              .attr('d', newArc)
              .style('fill', 'none');

            return 'donutArcsInner';
          });

      } else {
        donutArcsGroup.append('path')
          .attr('d', arc)
          .style('fill', 'none')
          .attr('class', function (d, i) {
            //Search pattern for everything between the start and the first capital L
            let firstArcSection = /(^.+?)L/;

            //Grab everything up to the first Line statement
            let newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
            //Replace all the comma's so that IE can handle it
            newArc = newArc.replace(/,/g, ' ');

            //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
            //flip the end and start position
            if (d.endAngle > 90 * Math.PI / 180) {
              let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
                middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
                endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
              //Flip the direction of the arc by switching the start en end point (and sweep flag)
              //of those elements that are below the horizontal line
              let newStart = endLoc.exec(newArc)[1];
              let newEnd = startLoc.exec(newArc)[1];
              let middleSec = middleLoc.exec(newArc)[1];

              //Build up the new arc notation, set the sweep-flag to 0

              newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
            } //if

            // console.log(this.parentNode, "this.parentNode");

            //Create a new invisible arc that the text can flow along
            // d3.select(this.parentNode).append('path')
            d3.select(this.parentNode).append('path')
              .attr('class', 'hiddenDonutArcs')
              .attr('id', 'donutArc' + i)
              .attr('d', newArc)
              .style('fill', 'none');

            return 'donutArcs';
          });

      }

      let circleGroup = circleOrbitGroup.selectAll('.circleGroup')
        .data(pie(item.deviceType))
        .enter().append('g')
        .style('cursor', 'pointer')
        .style('pointer-events', function (d, i) {
          if (d.data.disabled) return 'none';
          return 'all';
        })
        .attr('class', 'circleGroup')
        .attr('transform', function (d, i) {
          if (item.radiuscircle == "100") {
            let donutArc = $(element).find('#donutArcInner' + i)[0];
            let pathEl = d3.select(donutArc).node();
            let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
            return 'translate(' + (midpoint.x) + ',' + (midpoint.y) + ')';
          } else {
            let donutArc = $(element).find('#donutArc' + i)[0];
            let pathEl = d3.select(donutArc).node();
            let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
            return 'translate(' + (midpoint.x - 20) + ',' + midpoint.y + ')';
          }

        });

      circleGroup.append('rect')
        .attr('class', 'rectPoints')
        .attr("width", 40)
        .attr("height", 40)
        .attr("rx", 4)
        .attr('stroke-width', 1)
        .attr('stroke', '#FFFFFF')
        .attr('fill', function (d) {
          if (d.data.disabled) return '#b3b3b3';
          return d.data.color;
        })
        .attr('y', (d) => {
          if (item.radiuscircle == "100") {
            return -25;
          } else {
            let degree = d.endAngle * (180 / Math.PI);
            return (degree >= 0) ? -20 : (degree >= 90) ? 10 : (degree >= 180) ? 20 : (degree >= 270) ? 50 : -20;
          }

        })
        .attr('x', function (d) {
          if (item.radiuscircle == "100") {
            return -25;
          } else {
            return 0;
          }

        });

      //Append the label names on the outside
      circleGroup.append('text')
        .style('text-anchor', 'start')
        .style('fill', '#000')
        .style('color', '#000')
        .style('font-size', '12px')
        .attr('class', 'donutText')
        .attr('y', (d) => {
          if (item.radiuscircle == "100") {
            return 30;
          } else {
            let degree = d.startAngle * (180 / Math.PI);
            return (degree <= 90) ? 35 : (degree >= 180) ? 35 : 40
          }

        })
        .attr('x', function (d) {
          if (item.radiuscircle == "100") {
            return -25;
          } else {
            return -5;
          }

        })
        .text(function (d) {
          return d.data.device;
        });

      //Append the label names on the outside
      circleGroup.append('text')
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'middle')
        .style('fill', '#ffffff')
        .style('color', '#000')
        .style('font-size', '24px')
        .style('font-family', function (d) {
          return d.data.font;
        })
        .attr('x', function (d) {
          // return 20;
          if (item.radiuscircle == "100") {
            return -5;
          } else {
            return 20;
          }
        })
        .attr('y', function (d) {
          // return 20;
          if (item.radiuscircle == "100") {
            return -5;
          } else {
            return 0;
          }
        })
        .attr('class', 'iconText')
        .text(function (d) {
          return d.data.fontvalue;
        });

      circleGroup.on('mouseover', function () {
        d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
      })
        .on('mouseout', function () {
          d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
        })
        .on('click', (d) => {
          this.openSpiderPopups(d, this);
        });

      let cellSite: any = circleOrbitGroup.append('g')
        .attr('id', 'centerImgGroup')
        .attr('class', 'cellGroup')
        .attr('transform', 'translate(-12,-20)')
        .style('cursor', 'pointer')
        .style('opacity', '0.3');

      cellSite.append('foreignObject')
        .attr({ 'width': 30, 'height': 30 });

      cellSite.append('rect')
        .attr('class', 'rectPointscenter')
        .attr("width", 40)
        .attr("height", 40)
        .attr("rx", 4)
        .attr('stroke-width', 1)
        .attr('stroke', '#FFFFFF')
        .attr('fill', function (d) {
          return "#003A74";
        })
        .attr('y', (d) => {
          return -5;
        })
        .attr('x', function (d) {
          return -5;
        });


      let imageURL = 'assets/images/Layers/ip-topology/Equipment/icon-14.svg';
      cellSite.style('opacity', '1');
      let cellGroupImage = cellSite.append("svg:image")
        .attr('width', 30)
        .attr('height', 30)
        .attr("xlink:href", imageURL);


      svgGroup.on('click', function () {
        $(element).parent().remove();
        d3.event.stopPropagation();
      });

    });

  }


  leafSVGMouseOut(currentselected, sector) {
    this.leafSVG.on('mouseout', ((currentselected, sector) => {
      return function () {
        if (currentselected.cellid != sector.cellid) {
          d3.select(this).transition().attr('stroke-width', 1);
        }
        return false;
      };
    })(currentselected, sector));
  }

  openSpiderPopups(d, ref) {


    if (d.data.name === "Properties") {
      ref.openPropDialogConfiguration();
    } else if (d.data.name === "Capacity") {
      ref.openCapacityViewPopups();
    } else if (d.data.device === "AG1 Router") {
      ref.openKpiDialogConfiguration();
    } else if (d.data.name === "Alarms") {
      ref.openAlarmDialog();
    } else if (d.data.name === "Configuration") {
      ref.openConfigDialog();
    } else if (d.data.name === "Candidates") {
      ref.openCandidatesDialog();
    }

  }

  openKpiDialogConfiguration() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(SpliterViewComponent, {
        // width: "75vw",
        // height: "90vh",
        // maxWidth: "97vw",
        panelClass: "material-dialog-container",
        backdropClass: 'cdk-overlay-transparent-backdrop',
        disableClose: true,
        hasBackdrop: true
      });
    }, 500);
    
  };





}

