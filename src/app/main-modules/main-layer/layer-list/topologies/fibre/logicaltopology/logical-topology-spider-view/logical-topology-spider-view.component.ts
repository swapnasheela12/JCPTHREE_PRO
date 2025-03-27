import { OnInit, ElementRef, Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3/index';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationComponent } from 'src/app/modules/components/configuration/configuration.component';
import { AlarmsPopupComponent } from 'src/app/modules/components/alarms-popup/alarms-popup.component';
import { HttpClient } from '@angular/common/http';
import { CandidatesComponent } from 'src/app/modules/components/properties/candidates/candidates.component';
import { hierarchy, tree } from 'd3-hierarchy';
import { StructureComponent } from './structure/structure.component';
import { EquipmentComponent } from './equipment/equipment.component';
declare let $: any;


@Component({
  selector: 'jcpBeta-spider-view',
  template: `
    <div class="spidermain-wrapper">
    <div class="spideroverlay">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
    </div>
    <div></div>
    </div>
    `,
  styles: [
    `
      .spidermain-wrapper{
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 10000;
          background-color: rgba(0,0,0,.5);
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

export class LogicalToplogySpiderViewComponent implements OnInit, AfterViewInit {
  circleGroup;
  arc;
  pie;
  donutArcsGroup;
  linePointsGroup;
  leafSVG;
  bandsArcsGroup;
  bandarc;
  bandGroup;
  message;
  currentcell;
  details;
  public currentbands;
  public sector;
  currentBand = []

  constructor(private element: ElementRef, private http: HttpClient, public dialog: MatDialog,) { }


  ngOnInit() { }

  ngAfterViewInit() {
    this.initializeBiggerNode();
  }

  initializeBiggerNode() {
    let mainElement = this.element.nativeElement;
    let element = $(mainElement).find('.spideroverlay')[0];
    let rawSvg = $(element).find('svg');
    let svg: any = d3.select(rawSvg[0]);
    this.drawSVG(element, svg, this.details.children, this)
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
    let width = Math.min(screenWidth, 500) - margin.left - margin.right;

    let translateX = ((screenWidth / 2) + 100);
    let translateY = (screenHeight / 2);

    let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
      .attr('transform', 'translate(' + translateX + ',' + translateY + ')')

    //Create an arc function
    this.arc = this.createArc(width);

    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    this.pie = this.rotatePieChart();

    this.createLines();
    let diagonal = function link(d) {
      return "M" + d.source.y + "," + d.source.x
        + "V" + d.target.y + "H" + d.target.x;
    };

    let bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');
    //////////////////// Create Donut Chart //////////////////////
    //Create the donut slices and also the invisible arcs for the text
    this.donutArcsGroup = this.createDonutGroup(wrapgroup, data);
    this.createDonutArc();
    //createLinePoint
    this.linePointsGroup = this.createLineGroup(wrapgroup, data);
    this.appendLineGroupPath(element, diagonal);
    this.appendLineToCircle(element);

    //CreateCircleGroup
    this.circleGroup = this.createCircleGroup(wrapgroup, this.pie, data, element)
    this.createCircle();
    //Append the label names on the outside
    this.appendLabelsInsideCircle();
    this.appendLabelOutside();

    this.bandarc = d3.arc();

    this.bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

    let bands = this.currentbands;
    let pointSource = {
      x: 100,
      y: 0
    };
    let pointTarget = {
      x: 40,
      y: 0
    };
    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    let pie = d3.pie()
      .startAngle(0)
      .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
      .value((d) => {
        return d['value'];
      })
      .padAngle(.01)
      .sort(null);

    let tree = d3.tree().nodeSize([screenHeight / 10, 100]);
    const treeRoot = hierarchy(data);
    tree(treeRoot);
    const nodes = treeRoot.descendants();
    const links = treeRoot.links();


    let circleGroup = wrapgroup.selectAll('.circleGroup')
      .data(pie(data))
      .enter().append('g')
      .style('cursor', 'pointer')
      .attr('class', 'circleGroup')
      .style('pointer-events', function (d, i) {
        if (d.data.disabled) return 'none';
        return 'all';
      })
      .attr('transform', function (d, i) {
        let donutArc = element.find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
      });

    circleGroup.append('circle')
      .attr('class', 'circlePoints')
      .attr('r', 20)
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', function (d) {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('cx', function (d) {
        return 25;
      })
      .attr('cy', function (d) {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0;
      });

    //Append the label names on the outside
    circleGroup.append('text')
      .style('text-anchor', 'start')
      .style('fill', '#ffffff')
      .style('font-size', '12px')
      .attr('class', 'donutText')
      .attr('x', function (d) {
        return 50;
      })
      .style('fill', function (d) {
        if (d.data.disabled) return '#b3b3b3';
        return '#FFFFFF';
      })
      .attr('y', function (d) {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 20 : 5
      })
      .text(function (d) {
        return d.data.name;
      });


    let linePointsGroup = wrapgroup.selectAll('.linePointsGroup')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'linePointsGroup');

    linePointsGroup.append('path')
      .attr('class', function (d, i) {
        let donutArc = element.find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        d.source = {
          x: 0,
          y: 0
        };
        d.target = {
          x: midpoint.x,
          y: midpoint.y
        };
        return 'linePoints';
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('d', diagonal);

    linePointsGroup.append('circle')
      .attr('class', function (d, i) {
        let donutArc = element.find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        d.source = {
          x: 0,
          y: 0
        };
        d.target = {
          x: midpoint.x,
          y: midpoint.y
        };
        return 'circlePointsEnd';
      })
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('cx', function (d) {
        return d.target.x;
      })
      .attr('cy', function (d) {
        return d.target.y;
      });

    bandGroup.append('circle')
      .attr('r', 40)
      .attr('stroke-width', 1)
      .attr('fill', '#03A9F4')
      .style('cursor', 'pointer');
    let imageURL = 'assets/images/Layers/topologies/splitter/splitter.svg';

    bandGroup.append("svg:image")
      .attr('width', 75)
      .attr('height', 75)
      .attr("xlink:href", imageURL)
      .attr('stroke-width', 1)
      .attr('stroke', '#000000')
      .attr('fill', (d) => {
        return '#b3b3b3';
      })
      .attr('x', (d) => {
        return - (pointSource.x - 61);
      })
      .attr('y', (d) => {
        return - (pointSource.y + 37);
      })


    bandGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('x1', pointSource.x)
      .attr('y1', pointSource.y)
      .attr('x2', pointTarget.x)
      .attr('y2', pointTarget.y)
      .style("stroke-dasharray", ("3, 3"));

    bandGroup.append('circle')
      .attr('class', 'lineBandsCircle')
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('cx', pointTarget.x)
      .attr('cy', pointTarget.y);


    bandGroup.append("text")
      .attr('x', (d, i) => {
        return pointSource.y - 38;
      })
      .style('fill', () => {
        color: '#000000'
      })
      .style('font-size', '12px')
      .attr('y', (d, i) => {
        return pointSource.x - 45;
      })
      .text(function (d) {
        return "Beta_1800_C1";
      });

    bandGroup.append("text")
      .style('text-anchor', 'start')
      .style('dominant-baseline', 'middle')
      .style('font-family', '"Lato Medium", sans-serif')
      .style('fill', () => {
        return 'black';
      })
      .style('font-size', '14px')
      .attr('class', 'donutText')
      .attr('x', (d, i) => {
        if (i == 0) {
          return pointSource.y - 70;
        } else {
          return pointSource.y + 70;
        }
      })
      .attr('y', (d, i) => {
        if (i == 0) {
          return screenHeight / 8.5;
        } else {
          return -pointSource.x / 12;
        }
      })
      .style('font-weight', function (d) {
        return "bold";
      })
      .text((d) => {
        return "I-MU-MUMB_ENB_I144";
      });



    this.circleGroup.on('mouseover', function () {
      d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
    })
      .on('mouseout', function () {
        d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
      })
      .on('click', (d) => {
        this.openSpiderPopups(d, ref);
      });

    svgGroup.on('click', function () {
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

  createArc(width) {
    return d3.arc()
      .innerRadius(width * 0.75 / 2)
      .outerRadius(width * 0.75 / 2 + 30);
  }

  // layoutPie(width) {
  //   return d3.pie()
  //     .startAngle(0)
  //     .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
  //     .value((d) => {
  //       return d['value'];
  //     })
  //     .padAngle(.01)
  //     .sort(null);
  // }

  rotatePieChart() {
    return d3.pie()
      .startAngle(0)
      .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
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

  createDonutArc() {
    this.donutArcsGroup.append('path')
      .attr('d', this.arc)
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
  }

  createLineGroup(wrapgroup, data) {
    return wrapgroup.selectAll('.linePointsGroup')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'linePointsGroup')
      .style("stroke-dasharray", ("3, 3"));
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
        };
        d.target = {
          x: midpoint.x,
          y: midpoint.y
        };
        return 'linePoints';
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('d', diagonal)
      .style("stroke-dasharray", ("3, 3"));
  }

  appendLineToCircle(element) {
    return this.linePointsGroup.append('circle')
      .attr('class', function (d, i) {
        let donutArc = $(element).find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        d.source = {
          x: 0,
          y: 0
        };
        d.target = {
          x: midpoint.x,
          y: midpoint.y
        };
        return 'circlePointsEnd';
      })
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('cx', function (d) {
        return d.target.x;
      })
      .attr('cy', function (d) {
        return d.target.y;
      });
  }

  creatLeafSVG(innerRadius, outerRadius, startAngle, endAngle, i, j, sector) {
    return this.bandsArcsGroup.append('path')
      .attr('d', () => {
        return this.bandarc({
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          startAngle: startAngle,
          endAngle: endAngle
        });
      })
      .attr('id', 'leafSVGArc' + i + '' + j)
      .style('cursor', 'pointer')
      .attr('fill', function () {
        return sector.pcicolor;
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#000');
  }

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
        return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
      });
  }

  createCircle() {
    return this.circleGroup.append('circle')
      .attr('class', 'circlePoints')
      .attr('r', 20)
      .attr('stroke-width', 1)
      .attr('fill', (d) => {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('cx', (d) => {
        return 25;
      })
      .attr('cy', (d) => {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0;
      });
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
      .attr('y2', target.y)
      .style("stroke-dasharray", ("3, 3"));
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
      .attr('y2', target.y)
      .style("stroke-dasharray", ("3, 3"));
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
    return this.circleGroup.append('text')
      .style('text-anchor', 'start')
      .style('fill', '#ffffff')
      .style('font-size', '12px')
      .attr('class', 'donutText')
      .attr('x', (d) => {
        return 50;
      })
      .style('font-weight', function (d) {
        if (d.data.font) {
          return "bold";
        }
      })
      .attr('y', (d) => {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 20 : 5
      })
      .text((d) => {
        console.log("d.data.name", d.data.name)
        return d.data.name;
      });
  }

  appendLabelOutside() {
    //Append the label names on the outside
    return this.circleGroup.append('text')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', '#ffffff')
      .style('color', '#ffffff')
      .style('font-size', '24px')
      .style('font-family', (d) => {
        return d.data.font;
      })
      .attr('x', (d) => {
        return 25;
      })
      .attr('y', (d) => {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -7.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 12 : 0;
      })
      .attr('class', 'iconText')
      .text((d) => {
        return d.data.fontvalue;
      });
  }

  openSpiderPopups(d, ref) {
    if (d.data.name === "Structure") {
      ref.openPropDialogConfiguration();
    } else if (d.data.name === "Equipment") {
      ref.openAlarmDialog();
    }
  }

  openPropDialogConfiguration() {
    const dialogRef = this.dialog.open(StructureComponent, {
      width: "75vw",
      height: "90vh",
      maxWidth: "97vw",
      hasBackdrop: false,
      disableClose: false,
      panelClass: "material-dialog-container",
    });
  };


  openAlarmDialog() {
    const dialogRef = this.dialog.open(EquipmentComponent, {
      width: "75vw",
      height: "90vh",
      maxWidth: "97vw",
      panelClass: "material-dialog-container",
    });
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
