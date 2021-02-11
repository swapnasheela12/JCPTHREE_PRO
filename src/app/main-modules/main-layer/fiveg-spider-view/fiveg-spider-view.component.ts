import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
declare var $: any;
import { hierarchy, tree } from 'd3-hierarchy';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fiveg-spider-view',
  templateUrl: './fiveg-spider-view.component.html',
  styleUrls: ['./fiveg-spider-view.component.scss']
})
export class FivegSpiderViewComponent implements AfterViewInit {
  @ViewChild('spiderView', { static: false }) spiderView: ElementRef;
  @ViewChild('mapTree', { static: false }) mapTree: ElementRef
  data;
  colocatedCircleData;
  mainRef;
  mainLayerReference;
  circleGroup;
  pie: any;
  linePointsGroup: any;
  donutArcsGroup: any;
  arc: d3.Arc<any, d3.DefaultArcObject>;
  bandarc: d3.Arc<any, d3.DefaultArcObject>;
  bandsArcsGroup: any;
  currentbands: any;
  constructor(
    private dialog: MatDialog
  ) {
  }

  ngAfterViewInit() {
    let mapElement = this.mapTree.nativeElement;
    let rawSvg = this.spiderView.nativeElement;
    let svg: any = d3.select(rawSvg);
    this.spiderViewCreation(mapElement, svg, this.data, this);
  }

  spiderViewCreation(element, svgGroup, data, ref) {
    const clientWidth = element.offsetWidth;
    const clientHeight = element.offsetHeight;
    let screenWidth = clientWidth > 0 ? clientWidth : 500;
    let screenHeight = clientHeight > 0 ? clientHeight : 500;


    let translateX = ((screenWidth / 2));
    let translateY = (screenHeight / 2);

    let margin = {
      left: 20,
      top: 20,
      right: 20,
      bottom: 20
    };

    let width = Math.min(screenWidth, 500) - margin.left - margin.right;
    let spiderWrapper = svgGroup
      .append("g")
      .attr('class', 'wrapper')
      .attr('transform', 'translate('+translateX+','+translateY+')')

    // let circle = canvas
    //       .append("circle")
    //       .attr("r", 275)
    //       .style("opacity", 0.7)
    //       .attr('class', 'circle-main')
    //       .style("fill", "white");
    // let spiderWrapper = canvas.append('g')
    //   .attr('class', 'spider-wrapper')
    //   .attr('transform', 'translate(-64,0)');

    this.arc = this.createArc(width);
    this.pie = this.rotatePieChart();
    this.createLines();

    let diagonal = function link(d) {
      return "M" + d.source.y + "," + d.source.x
        + "V" + d.target.y + "H" + d.target.x;
    };

    this.donutArcsGroup = this.createDonutGroup(spiderWrapper, data);
    console.log(this.donutArcsGroup)
    this.createDonutArc();
    this.linePointsGroup = this.createLineGroup(spiderWrapper, data);
    this.appendLineGroupPath(element, diagonal);
    this.appendLineToCircle(element);

    this.circleGroup = this.createCircleGroup(spiderWrapper, this.pie, data, element);
    this.createCircle();
    this.appendLabelsInsideCircle();
    this.appendLabelOutside();

    this.bandarc = d3.arc();
    // let bandGroup = canvas.append('g').attr('transform', 'translate(-100,0)');
    this.bandsArcsGroup = spiderWrapper
    .selectAll('.bandsArcsGroup')
    .data(this.colocatedCircleData)
    .enter().append('g')
    .attr('transform', 'translate(-100,0)')
    .style('cursor', 'pointer')
    .attr('class', 'bandsArcsGroup');

    let bands = this.currentbands;
    let pointSource = {
      x: 100,
      y: 0
    };
    let pointTarget = {
      x: 30,
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



    let circleGroup = spiderWrapper.selectAll('.circleGroup')
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


    let linePointsGroup = spiderWrapper.selectAll('.linePointsGroup')
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

    this.bandsArcsGroup
      .append('circle')
      .attr('r', 30)
      .attr('stroke-width', (d)=> {
        if (!d.fontValue) {
          return 1;
        } else {
          return '';
        }
      })
      .attr('stroke', (d)=> {
        if (!d.fontValue) {
          return '#000000';
        } else {
          return '#ffffff';
        }
      })
      .attr('fill', (d)=> {
        if (d.color) {
          return d.color;
        } else {
          return 'red';
        }
      })
      .style('cursor', 'pointer');

    let imageURL = 'assets/images/Layers/planned-small-cell/plannedwhite.svg';

    // cellGroup.style('opacity', '1');

    this.bandsArcsGroup.append("svg:image")
      .attr('width', 24)
      .attr('height', 25.5)
      .attr("xlink:href", (d) => {
        if (!d.fontValue) {
          return imageURL
        }
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', (d) => {
        console.log("pointSource, pointSource", pointSource)
        return '#b3b3b3';
      })
      .attr('x', (d) => {
        return - (pointSource.x - 90);
      })
      .attr('y', (d) => {
        return - (pointSource.y + 10);
      });

      this.bandsArcsGroup.append('text')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', '#ffffff')
      .style('color', '#000')
      .style('font-size', '33px')
      .style('font-family', function (d) {
        return d.fontFamily;
      })
      .attr('y', function (d) {
        return 7;
      })
      .attr('class', 'iconText')
      .text(function (d) {
        return d.fontValue;
      });
    this.bandsArcsGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#7070708A')
      .attr('fill', 'none')
      .attr('x1', pointSource.x)
      .attr('y1', pointSource.y)
      .attr('x2', pointTarget.x)
      .attr('y2', pointTarget.y)
      .style("stroke-dasharray", ("3, 3"));

    this.bandsArcsGroup.append('circle')
      .attr('class', 'lineBandsCircle')
      .attr('r', 3)
      .attr('fill', '#000000')
      .attr('cx', pointTarget.x)
      .attr('cy', pointTarget.y);


    this.bandsArcsGroup.append("text")
      .attr('x', (d, i) => {
        if (d.fontValue){
          return pointSource.y - 20;
        } else {
          return pointSource.y - 38;
        }
      })
      .style('fill', () => {
        color: '#000000'
      })
      .style('font-size', '17px')
      .style('font-family', 'Lato Bold')
      .attr('y', (d, i) => {
        return pointSource.x - 35;
      })
      .text(function (d) {
        return d.tileName;
      });

    this.bandsArcsGroup.append("text")
      .style('text-anchor', 'start')
      .style('dominant-baseline', 'middle')
      .style('font-family', 'Lato Medium')
      .style('fill', () => {
        return 'black';
      })
      .style('font-size', '15px')
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
          return screenHeight / 10;
        } else {
          return 0;
        }
      })
      // .style('font-weight', function (d) {
      //   // if (d.data.font) {
      //   return "Lato Bold";
      //   // }
      // })
      .text((d) => {
        if (d.sapId){
          return d.sapId;
        }
      });



    this.circleGroup.on('mouseover', function () {
      d3.select(this)
      .select('circle')
      .transition()
      .attr('stroke', (d) => {
        return '#FFFFFF';
      })
      .attr('stroke-width', 2);
    })
      .on('mouseout', function () {
        d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
      })
      .on('click', (d) => {
          this.mainRef.openSpiderPopups(d, this.mainLayerReference);
      });

    svgGroup.on('click', function () {
      $(element).parent().remove();
      d3.event.stopPropagation();
    });
  }

  createArc(width) {
    return d3.arc()
      .innerRadius(width * 0.75 / 2)
      .outerRadius(width * 0.75 / 2 + 30);
  }

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
      .attr('stroke', '#7070708A')
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
      .attr('fill', '#000000')
      .attr('cx', function (d) {
        return d.target.x;
      })
      .attr('cy', function (d) {
        return d.target.y;
      });
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
      .attr('stroke', '#FFFFFF')
      .attr('fill', (d) => {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('cx', (d) => {
        return 25;
      })
      .attr('cy', (d) => {
        console.log("d", d)
        let degree = d.endAngle * (180 / Math.PI);
        console.log("degreesdsdsd", (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0)
        return (degree <= 90) ? -2 : (degree >= 180) ? 2 : 0;
      });
  }

  wrap(text, width) {
    text.each(function() {
    let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("y")),
      tspan = text.text(null).append("tspan").attr("x", 55).attr("y", y).attr("dy", dy + "em")
      while (word = words.pop()) {
        line.push(word)
        tspan.text(line.join(" "))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(" "))
          line = [word]
          tspan = text.append("tspan").attr("x", 55).attr("y", -75).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
        }
      }
    })
  }
  appendLabelsInsideCircle() {
    return this.circleGroup.append('text')
      .style('text-anchor', 'start')
      .style('fill', '#000000')
      .style('font-size', '15px')
      .style('font-family', function (d) {
          return "Lato bold";
      })
      .attr('class', 'donutText')
      .attr('x', (d) => {
        return 50;
      })
      // .style('font-weight', function (d) {
      //   if (d.data.font) {
      //     return "bold";
      //   }
      // })
      .attr('y', (d) => {
        return 4;
        // let degree = d.endAngle * (180 / Math.PI);
        // return (degree <= 90) ? -72 : (degree >= 180) ? -65 : 5
      })
      .text((d) => {
        return d.data.name;
      }).call(this.wrap, 20);
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
        return (degree <= 90) ? -0.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 7 : 0;
      })
      .attr('class', 'iconText')
      .text((d) => {
        // console.log("iconText", iconText)
        return d.data.fontvalue;
      });
  }
}