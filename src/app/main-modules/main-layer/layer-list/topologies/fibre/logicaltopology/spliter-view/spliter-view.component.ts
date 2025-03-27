import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

import * as d3 from 'd3/index';
declare let $: any;

@Component({
  selector: 'app-spliter-view',
  templateUrl: './spliter-view.component.html',
  styleUrls: ['./spliter-view.component.scss']
})
export class SpliterViewComponent implements OnInit {

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
  currentcell;

  constructor(private datashare: DataSharingService, private element: ElementRef,
    private router: Router, private http: HttpClient, public dialog: MatDialog) { }

  public currentbands;
  public sector;

  public splitter1Data = [
    {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    },
    {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'OLT',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec28',
      // disabled: true,
      eventname: 'sites-tree-createworkorder'
    }, {
      name: 'Splitter 2',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec2b',
      eventname: 'onaismallcell-tree-properties'
    },
    {
      name: 'Splitter 2',
      value: 5,
      color: '#1A7DDD',
      font: 'icomoon',
      fontvalue: '\uec27',
      eventname: 'sites-tree-onairalarms'
    }, {
      name: 'Splitter 1',
      value: 5,
      color: '#94C65A',
      font: 'icomoon',
      fontvalue: '\uec23',
      eventname: 'sites-tree-properties'
    },
  ];


  currentBand = []
  ngOnInit() {
    console.log(this.splitter1Data.length,"MMMMMMM");
    
    this.datashare.currentsmallCellPlanned.subscribe(val => {
      console.log(val, "val");

      this.currentbands = val['currentbands'];
      this.currentcell = val['currentcell'];
    });

    this.initializeBiggerNode();
  }

  initializeBiggerNode() {
    let mainElement = this.element.nativeElement;
    let element = $(mainElement).find('.spideroverlayspliter')[0];
    let rawSvg = $(element).find('svg');
    let svg: any = d3.select(rawSvg[0]);
    let data = [];
    data = this.splitter1Data;
    this.drawSVG(element, svg, data, this)
  }

  drawSVG(element, svgGroup, data, ref?) {

    const clientWidth = element.offsetWidth;
    const clientHeight = element.offsetHeight;
    let screenWidth = clientWidth > 0 ? clientWidth : 500;
    let screenHeight = clientHeight > 0 ? clientHeight : 500;

    let margin = {
      left: 20,
      top: 20,
      right: 20,
      bottom: 20
    };
    const outerContext = this;
    // let width = Math.min(screenWidth, 500) - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    let width = Math.min(screenWidth, 500) - margin.left - margin.right;

    // let translateX = ((screenWidth / 2) + 100);
    // let translateY = (screenHeight / 2);

    // let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
    //   .attr('transform', 'translate(' + translateX + ',' + translateY + ')')
    let wrapgroup = svgGroup.append('g')
      .attr('class', 'wrapper')
      .attr('transform', 'translate(' + ((screenWidth / 2) + 4) + ',' + ((screenHeight / 2) + 12) + ')');

    let bandGroup = wrapgroup.append('g')
      .attr('transform', 'translate(0,0)');

    // let bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');

    //Create an arc function
    // this.arc = this.createArc(width, height);

    let arc = d3.arc()
      .innerRadius(width * 0.95 / 2)
      .outerRadius(width * 0.95 / 2 + 30);


    let pie = d3.pie()
      .startAngle(0 * Math.PI / 360)
      .endAngle(90 * Math.PI / 360 + 2 * Math.PI)
      .value((d) => {
        return d['value'];
      })
      .padAngle(.01)
      .sort(null);

    // let diagonal = function link(d) {
    //   return "M" + d.source.y + "," + d.source.x
    //     + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
    //     + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
    //     + " " + d.target.y + "," + d.target.x;
    // };

    let diagonal = function link(d) {

      return "M" + d.source.x + ","
        + (d.source.y + 5) + "A" + 0 + ","
        + 0 + " 0 0,1 " + ((d.target.x + d.source.x) - 8) + ","
        + ((d.target.y + d.source.y) - 8);

    };

    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    // this.pie = this.rotatePieChart();

    this.createLines();
    // let diagonal = function link(d) {

    //   return "M" + d.source.x + "," + (d.source.y - 40) + "A" + 0 + "," + 0 + " 0 0,1 " + ((d.target.x + d.source.x) - 8) + "," + ((d.target.y + d.source.y) - 8);

    // };

    // let diagonal = function link(d) {
    //   return "M" + d.source.y + "," + d.source.x
    //     + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
    //     + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
    //     + " " + d.target.y + "," + d.target.x;
    // };




    //background circle
    // bandGroup.append('circle')
    //   .attr('r', 275)
    //   .attr('filter', "blur(10px)")
    //   .attr('fill', "rgba(229,234,236,70%)")
    //   .style('cursor', 'pointer');

    //////////////////// Create Donut Chart //////////////////////
    //Create the donut slices and also the invisible arcs for the text
    // this.donutArcsGroup = this.createDonutGroup(wrapgroup, data);
    // this.createDonutArc(circleOrbitGroup,wrapgroup, data);

    let circleOrbitGroup = wrapgroup.append('g').attr('class', 'bandsArcsGroup');

    circleOrbitGroup.append("circle")
      .attr('class', 'circleOrbit')
      .attr("fill", "none")
      // .attr("stroke", "#000")
      // .attr("stroke-opacity", 0.5)
      .attr("r", 275);

    circleOrbitGroup.selectAll("circle")
      .attr("id", function (d, i) { return "circleOrbit" + i; });


    //Create the donut slices and also the invisible arcs for the text

    let donutArcsGroup = circleOrbitGroup.selectAll('.donutArcsGroup')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'donutArcsGroup');


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
        if (d.endAngle > 90 * Math.PI / 180) {
          let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
            middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
            endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
          let newStart = endLoc.exec(newArc)[1];
          let newEnd = startLoc.exec(newArc)[1];
          let middleSec = middleLoc.exec(newArc)[1];
          newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
        }
        //Create a new invisible arc that the text can flow along
        d3.select(this.parentNode).append('path')
          .attr('class', 'hiddenDonutArcs')
          .attr('id', 'donutArc' + i)
          .attr('d', newArc)
          .style('fill', 'none');

        return 'donutArcs';
      });


    //createLinePoint
    this.linePointsGroup = this.createLineGroup(donutArcsGroup, data);
    this.appendLineGroupPath(element, diagonal);
    this.appendLineToCircle(element);

    //CreateCircleGroup
    // this.circleGroup = this.createCircleGroup(wrapgroup, pie, data, element)

    let circleGroup = circleOrbitGroup.selectAll('.circleGroup')
      .data(pie(data))
      .enter().append('g')
      .style('cursor', 'pointer')
      .style('pointer-events', (d, i) => {
        if (d.data.disabled) return 'none';
        return 'all';
      })
      .attr('class', 'circleGroup')
      .attr('transform', (d, i) => {
        let donutArc = $(element).find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        return 'translate(' + (midpoint.x + 80) + ',' + (midpoint.y - 10) + ')';
        // let donutArc = $(element).find('#donutArc' + i)[0];
        // let pathEl = d3.select(donutArc).node();
        // let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        // return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
      });

    // this.createCircle();
    circleGroup.append('rect')
      .attr('class', 'rectPoints')
      .attr("width", 40)
      .attr("height", 40)
      .attr("rx", 4)
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('transform', 'translate(-100,0)')
      .attr('fill', (d) => {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('y', (d) => {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree >= 0) ? -5 : (degree >= 90) ? 10 : (degree >= 180) ? 20 : (degree >= 270) ? 50 : -20;
      })
      // .attr('x', function (d) {
      //   return 0;
      // });
      .attr('x', function (d) {
        return -5;
      })
    // .attr('y', function (d) {
    //   return 2;
    // })


    //Append the label names on the outside
    // this.appendLabelsInsideCircle();
    circleGroup.append('text')
    .style('text-anchor', 'start')
    .style('fill', '#000')
    .style('color', '#000')
    .style('font-family', 'Lato Bold')
    .style('font-size', '13px')
    .attr('class', 'donutText')
    .attr('transform', 'translate(-100,0)')
    // .attr('y', (d) => {
     
    //     let degree = d.startAngle * (180 / Math.PI);
    //     return (degree <= 90) ? 35 : (degree >= 180) ? 35 : 40
     
    // })
    // .attr('x', function (d) {
    //   let degree = d.startAngle * (180 / Math.PI);
    //     return (degree <= 90) ? 30 : (degree >= 180) ? 35 : 40
    //     // return -5;

    // })
    .attr('y', (d) => {
      let degree = d.startAngle * (180 / Math.PI);
      // return (degree <= 90) ? 50 : (degree >= 180) ? 55 : 50
      // return (degree <= 0) ? -15 :(degree <= 90) ? -5 : (degree <= 180) ? 55: (degree <= 270) ? 45 : (degree <= 360) ? 0: 0
      return (degree <= 0) ? -15 :(degree <= 90) ? 10 : (degree <= 180) ? 50: (degree <= 270) ? 45 : (degree <= 360) ? -10: 0
    })
    .attr('x', function (d) {
      let degree = d.startAngle * (180 / Math.PI);
     
      // return (degree <= 0) ? -10 :(degree <= 90) ? 40 : (degree <= 180) ? 20: (degree <= 270) ? -65 : (degree <= 360) ? -70 : -60
      return (degree <= 0) ? -10 :(degree <= 90) ? 40 : (degree <= 180) ? 35: (degree <= 270) ? -65 : (degree <= 360) ? -70 : -60
      // return -10;
    })
    .text((d) => {
      return d.data.name;
    });




    // this.appendLabelOutside();

    circleGroup.append('text')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .style('fill', '#ffffff')
    .style('color', '#ffffff')
    .style('font-size', '24px')
    .attr('width', 30)
    .attr('height', 30)
    .attr('transform', 'translate(-100,0)')
    .style('font-family', (d) => {
      return d.data.font;
    })
    .attr('x', function (d) {
      return 15;
    })
    .attr('y', function (d) {
      return 18;
    })
    .attr('class', 'iconText')
    .text((d) => {
      return d.data.fontvalue;
    });

    this.bandarc = d3.arc();

    let bands = this.currentbands;
    let pointSource = {
      x: 100,
      y: 0
    };
    let pointTarget = {
      x: 30,
      y: 0
    };




    let cellSite: any = circleOrbitGroup.append('g')
      .attr('id', 'centerImgGroup')
      .attr('class', 'cellGroup')
      .attr('transform', 'translate(-100,0)')
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
        return "#1A7DDD";
      })
      .attr('y', (d) => {
        return -15;
      })
      .attr('x', function (d) {
        return 80;
      });


    let imageURL = 'assets/images/Layers/ip-topology/Equipment/icon-16.svg';
    cellSite.style('opacity', '1')
      .attr('class', 'iconTextCenter');
    let cellGroupImage = cellSite.append("svg:image")
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', function (d) {
        return 85;
      })
      .attr('y', function (d) {
        return -10;
      })
      .attr("xlink:href", imageURL);

    cellSite.append('text')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .style('color', '#000')
      .style('font-family', 'Lato Bold')
      .style('font-size', '13px')
      .attr('class', 'donutText')
      .attr('transform', 'translate(0,0)')
      .attr('y', (d) => {
        return 40;
      })
      .attr('x', function (d) {
        return 100;
      })
      .text((d) => {
        return "Spliter 1";
      });

    cellSite.append('text')
      .style('text-anchor', 'middle')
      .style('fill', '#848C95')
      .style('color', '#848C95')
      .style('font-family', 'Lato Medium')
      .style('font-size', '12px')
      .attr('class', 'donutTextHeder')
      .attr('transform', 'translate(0,0)')
      .attr('y', (d) => {
        return 70;
      })
      .attr('x', function (d) {
        return 100;
      })
      .text((d) => {
        return "Lattitude & Longitude";
      });

    cellSite.append('text')
      .style('text-anchor', 'middle')
      .style('fill', '#212529')
      .style('color', '#212529')
      .style('font-family', 'Lato Medium')
      .style('font-size', '13px')
      .attr('class', 'donutTextHederVal')
      .attr('transform', 'translate(0,30)')
      .attr('y', (d) => {
        return 60;
      })
      .attr('x', function (d) {
        return 100;
      })
      .text((d) => {
        return "1234’28718278274578’";
      });


    // let bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

    let cellGroup = null;
    cellGroup = circleOrbitGroup.append('g')
      // .attr('id', 'cellGroup-' + i)
      .attr('class', 'cellGroup')
      .attr('transform', 'translate(-22.5,-39.4)')
      .style('cursor', 'pointer')

    let cellGroupImageFor = cellGroup.append('foreignObject')
      .attr({
        'width': 45,
        'height': 45.4
      });

    circleGroup.on('mouseover', function () {
      d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
    })
      .on('mouseout', function () {
        d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
      })
      .on('click', (d) => {
        this.openSpiderPopups(d, ref);
      });

    svgGroup.on('click', function () {
      console.log($(element).parent(), "$(element).parent()")
      $(element).parent().remove();
      d3.event.stopPropagation();
    });

  };

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


  createArc(width, height) {
    let radius = Math.min(width, height) / 2;
    return d3.arc()
      .innerRadius(width * 0.95 / 2)
      .outerRadius(width * 0.95 / 2 + 30);
    // .innerRadius(radius - 100)
    // .outerRadius(radius - 50);
    // .innerRadius(width * 0.75 / 2)
    // .outerRadius(width * 0.75 / 2 + 30);
  }

  layoutPie(width) {
    return d3.pie()
      // .startAngle(0)
      // .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
      .value((d) => {
        return d['value'];
      })
      .padAngle(.01)
      .sort(null);
  }

  diagonal(width) {
    return function link(d) {
      return "M" + d.source.y + "," + d.source.x
        + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
        + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
        + " " + d.target.y + "," + d.target.x;
    };
  }

  rotatePieChart() {
    return d3.pie()
      // .startAngle(-90 * (Math.PI / 180))
      // .endAngle(90 * (Math.PI / 180))
      .startAngle(0 * Math.PI / 360)
      .endAngle(90 * Math.PI / 360 + 2 * Math.PI)
      // .startAngle(0)
      // .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
      .value((d) => {
        return d['value'];
      })
      .padAngle(.01)
      .sort(null);
  }

  createLines() {
    return d3.line()
      .x(function (point) { return point['lx'] })
      .y(function (point) { return point['ly'] });
  }

  createDonutGroup(wrapgroup, data) {
    return wrapgroup.selectAll('.donutArcsGroup')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'donutArcsGroup');
  }


  createDonutArc(circleOrbitGroup, wrapgroup, data) {


    // circleOrbitGroup.append("circle")
    //   .attr('class', 'circleOrbit')
    //   .attr("fill", "none")
    //   .attr("stroke", "#000")
    //   // .attr("stroke-opacity", 0.5)
    //   .attr("r", 275);

    // circleOrbitGroup.selectAll("circle")
    //   .attr("id", function (d, i) { return "circleOrbit" + i; });


    // //Create the donut slices and also the invisible arcs for the text

    // let donutArcsGroup = circleOrbitGroup.selectAll('.donutArcsGroup')
    //   .data(this.pie(data))
    //   .enter().append('g')
    //   .attr('class', 'donutArcsGroup');


    // donutArcsGroup.append('path')
    //   .attr('d', this.arc)
    //   .style('fill', 'none')
    //   .attr('class', function (d, i) {
    //     //Search pattern for everything between the start and the first capital L
    //     let firstArcSection = /(^.+?)L/;
    //     //Grab everything up to the first Line statement
    //     let newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
    //     //Replace all the comma's so that IE can handle it
    //     newArc = newArc.replace(/,/g, ' ');
    //     if (d.endAngle > 90 * Math.PI / 180) {
    //       let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
    //         middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
    //         endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
    //       let newStart = endLoc.exec(newArc)[1];
    //       let newEnd = startLoc.exec(newArc)[1];
    //       let middleSec = middleLoc.exec(newArc)[1];
    //       newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
    //     }
    //     //Create a new invisible arc that the text can flow along
    //     d3.select(this.parentNode).append('path')
    //       .attr('class', 'hiddenDonutArcs')
    //       .attr('id', 'donutArc' + i)
    //       .attr('d', newArc)
    //       .style('fill', 'none');

    //     return 'donutArcs';
    //   });
  }

  createLineGroup(wrapgroup, data) {
    let pie = d3.pie()
      .startAngle(0 * Math.PI / 360)
      .endAngle(90 * Math.PI / 360 + 2 * Math.PI)
      .value((d) => {
        return d['value'];
      })
      .padAngle(.01)
      .sort(null);
    return wrapgroup.selectAll('.linePointsGroup')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'linePointsGroup');
  }

  appendLineGroupPath(element, diagonal) {
    return this.linePointsGroup.append('path')
      .attr('class', function (d, i) {
        let donutArc = $(element).find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        d.source = {
          x: 0,
          y: 0
          // x: -40,
          // y: -10
        };
        d.target = {
          x: midpoint.x,
          y: midpoint.y
        };
        return 'linePoints';
      })
      .attr('stroke-width', 2)
      // .attr('stroke', '#FFFFFF')
      .attr('stroke', '#F03DA8')
      .style("stroke-dasharray", ("3, 3"))
      .attr('transform', 'translate(0,0)')
      .attr('fill', 'none')
      .attr('d', diagonal);
  }

  appendLineToCircle(element) {

  }

  // creatLeafSVG(circleOrbitGroup,innerRadius, outerRadius, startAngle, endAngle, i, j, sector) {
  //   return circleOrbitGroup.append('path')
  //     .attr('d', () => {
  //       return this.bandarc({
  //         innerRadius: innerRadius,
  //         outerRadius: outerRadius,
  //         startAngle: startAngle,
  //         endAngle: endAngle
  //       });
  //     })
  //     .attr('id', 'leafSVGArc' + i + '' + j)
  //     .style('cursor', 'pointer')
  //     .attr('fill', function () {
  //       return sector.pcicolor;
  //     })
  //     .attr('stroke-width', 1)
  //     .attr('stroke', '#000');
  // }

  createCircleGroup(wrapgroup, pie, data, element) {
    return wrapgroup.selectAll('.circleGroup')
      .data(pie(data))
      .enter().append('g')
      .style('cursor', 'pointer')
      .style('pointer-events', (d, i) => {
        if (d.data.disabled) return 'none';
        return 'all';
      })
      .attr('class', 'circleGroup')
      .attr('transform', (d, i) => {
        let donutArc = $(element).find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        return 'translate(' + (midpoint.x + 80) + ',' + (midpoint.y - 10) + ')';
        // let donutArc = $(element).find('#donutArc' + i)[0];
        // let pathEl = d3.select(donutArc).node();
        // let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        // return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
      });
  }

  createCircle() {

    return this.circleGroup.append('rect')
      .attr('class', 'rectPoints')
      .attr("width", 40)
      .attr("height", 40)
      .attr("rx", 4)
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('transform', 'translate(-100,0)')
      .attr('fill', (d) => {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('y', (d) => {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree >= 0) ? -5 : (degree >= 90) ? 10 : (degree >= 180) ? 20 : (degree >= 270) ? 50 : -20;
      })
      // .attr('x', function (d) {
      //   return 0;
      // });
      .attr('x', function (d) {
        return -5;
      })
    // .attr('y', function (d) {
    //   return 2;
    // })



  }

  createBandGroup(source, target) {
    return this.bandGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('x1', source.x)
      .attr('y1', source.y)
      .attr('x2', target.x)
      .attr('y2', target.y);
  }

  createBandLine(source, target) {
    return this.bandGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('x1', source.x)
      .attr('y1', source.y)
      .attr('x2', target.x)
      .attr('y2', target.y);
  }

  createBandCircle(target) {
    return this.bandGroup.append('circle')
      .attr('class', 'lineBandsCircle')
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('cx', target.x)
      .attr('cy', target.y);
  }

  appendLabelsInsideCircle() {
    // return this.circleGroup.append('text')
    //   .style('text-anchor', 'start')
    //   .style('fill', '#000')
    //   .style('color', '#000')
    //   .style('font-family', 'Lato Bold')
    //   .style('font-size', '13px')
    //   .attr('class', 'donutText')
    //   .attr('transform', 'translate(-100,0)')
    //   .attr('y', (d) => {
    //     let degree = d.startAngle * (180 / Math.PI);
    //     // return (degree <= 90) ? 50 : (degree >= 180) ? 55 : 50
    //     return (degree <= 0) ? -15 :(degree <= 90) ? -5 : (degree <= 180) ? 55: (degree <= 270) ? 45 : (degree <= 360) ? 0: 0
    //   })
    //   .attr('x', function (d) {
    //     let degree = d.startAngle * (180 / Math.PI);
    //     // console.log(degree,"degree x angle",(degree <= 0) ? -10 :(degree <= 90) ? 40 : (degree <= 180) ? -20: (degree <= 270) ? -65: (degree <= 360) ? -65 : -60);

    //     return (degree <= 0) ? -10 :(degree <= 90) ? 40 : (degree <= 180) ? 20: (degree <= 270) ? -65 : (degree <= 360) ? -70 : -60
    //     // return -10;
    //   })
    //   .text((d) => {
    //     return d.data.name;
    //   });

  }

  appendLabelOutside() {
    //Append the label names on the outside
    return this.circleGroup.append('text')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', '#ffffff')
      .style('color', '#ffffff')
      .style('font-size', '24px')
      .attr('width', 30)
      .attr('height', 30)
      .attr('transform', 'translate(-100,0)')
      .style('font-family', (d) => {
        return d.data.font;
      })
      .attr('x', function (d) {
        return 15;
      })
      .attr('y', function (d) {
        return 18;
      })
      .attr('class', 'iconText')
      .text((d) => {
        return d.data.fontvalue;
      });
  }

  openSpiderPopups(d, ref) {
    if (d.data.name === "Properties") {
      ref.openPropDialogConfiguration();
    } else if (d.data.name === "Capacity") {
      ref.openCapacityViewPopups();
    } else if (d.data.name === "KPI's") {
      ref.openKpiDialogConfiguration();
    } else if (d.data.name === "Alarms") {
      ref.openAlarmDialog();
    } else if (d.data.name === "Configuration") {
      ref.openConfigDialog();
    } else if (d.data.name === "Candidates") {
      ref.openCandidatesDialog();
    }
  }

  openCapacityViewPopups() {
    // this.dialog.open(CapacityComponent, {
    //   width: "75vw",
    //   maxWidth: "97vw",
    //   height: "80%",
    //   panelClass: "material-dialog-container",
    // });
  };

  openPropDialogConfiguration() {
    // const dialogRef = this.dialog.open(PropertiesComponent, {
    //   width: "95vw",
    //   maxWidth: "97vw",
    //   height: "95%",
    //   panelClass: "material-dialog-container",
    // });
  };
  openKpiDialogConfiguration() {
    // const dialogRef = this.dialog.open(KpiComponent, {
    //   width: "75vw",
    //   height: "90vh",
    //   maxWidth: "97vw",
    //   panelClass: "material-dialog-container",
    // });
  };

  openAlarmDialog() {
    // const dialogRef = this.dialog.open(AlarmsPopupComponent, {
    //   width: "75vw",
    //   height: "90vh",
    //   maxWidth: "97vw",
    //   panelClass: "material-dialog-container",
    // });
  };

  openConfigDialog() {
    // const dialogRef = this.dialog.open(ConfigurationComponent, {
    //   width: "60vw",
    //   height: "65vh",
    //   maxWidth: "97vw",
    //   panelClass: "material-dialog-container",
    // });
  };

  openCandidatesDialog() {
    // const dialogRef = this.dialog.open(CandidatesComponent, {
    //   width: "85vw",
    //   maxWidth: "97vw",
    //   height: "85vh",
    //   panelClass: "material-dialog-container",
    // });
  };

  findNewPoint(x, y, angle, distance) {
    let result: any = {};

    result.x = Math.round(Math.cos(angle * Math.PI / 360) * distance + x);
    result.y = Math.round(Math.sin(angle * Math.PI / 360) * distance + y);

    return result;
  }

  getBoundingBoxCenter(selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    let element = selection.node(),
      // use the native SVG interface to get the bounding box
      bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
  }

}