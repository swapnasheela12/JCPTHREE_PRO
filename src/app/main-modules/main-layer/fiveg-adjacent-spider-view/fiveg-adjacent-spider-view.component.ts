import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as d3 from 'd3';
declare var $: any;

@Component({
  selector: 'app-fiveg-adjacent-spider-view',
  templateUrl: './fiveg-adjacent-spider-view.component.html',
  styleUrls: ['./fiveg-adjacent-spider-view.component.scss']
})
export class FivegAdjacentSpiderViewComponent implements AfterViewInit {

  @ViewChild('spiderView', { static: false }) spiderView: ElementRef;
  @ViewChild('mapTree', { static: false }) mapTree: ElementRef;
  colors = {"OLT": 'orange','Splitter': "#e75480"};
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
  // currentbands: any;
  bandGroup;

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
    let canvas = svgGroup.append('g')
      .attr('class', 'wrapper')
      .attr('transform', 'translate(' + translateX + ',' + translateY + ')')
    let circle = canvas
      .append("circle")
      .attr("r", 275)
      .style("opacity", 0.7)
      .attr('class', 'circle-main')
      .style("fill", "white");
    let spiderWrapper = canvas.append('g')
      .attr('class', 'spider-wrapper');
  //Create an arc function
  this.arc = this.createArc(width);

  //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
  this.pie = this.rotatePieChart();

  let diagonal = function link(d) {
    return "M" + d.source.x + "," + d.source.y
    + "L" + (d.target.x) + "," + d.target.y;
  };
  this.donutArcsGroup = this.createDonutGroup(spiderWrapper, data);
  console.log(this.donutArcsGroup)
  this.createDonutArc();
  this.linePointsGroup = this.createLineGroup(spiderWrapper, data);
  this.appendLineGroupPath(element, diagonal, this.colors);
  this.appendLineToCircle(element);

  this.circleGroup = this.createCircleGroup(spiderWrapper, this.pie, data, element);
  this.createCircle();
  this.appendLabelsInsideCircle();
  this.appendLabelOutside();
  this.bandsArcsGroup = spiderWrapper
  .selectAll('.bandsArcsGroup')
  .data(this.colocatedCircleData)
  .enter().append('g')
  .attr('transform', 'translate(0,100)')
  .style('cursor', 'pointer')
  .attr('class', 'bandsArcsGroup');

  // let bands = this.currentbands;
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
      return 'translate(' + (midpoint.x) + ',' + (midpoint.y) + ')';
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
      return 0;
    })
    .attr('cy', function (d) {
      return 0;
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
        y: 180
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
      return 3;
    })
    .attr('class', 'iconText')
    .text(function (d) {
      return d.fontValue;
    });

  this.bandsArcsGroup.append("text")
    .attr('x', (d, i) => {
      if (d.fontValue){
        return pointSource.y - 27;
      } else {
        return pointSource.y - 38;
      }
    })
    .style('fill', () => {
      color: '#000000'
    })
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .attr('y', (d, i) => {
      return pointSource.x - 55;
    })
    .text(function (d) {
      return d.tileName;
    });
  
  this.bandsArcsGroup.append("text")
    .attr('x', (d, i) => {
      if (d.fontValue){
        return pointSource.y - 50;
      } else {
        return pointSource.y - 38;
      }
    })
    .style('font-family', '"Lato Medium", sans-serif')
    .style('font-size', '11px')
    .attr('y', (d, i) => {
      return pointSource.x - 14;
    })
    .text(function (d) {
      return 'Latitude & Longitude';
    })
    .style('fill', 'grey');

    this.bandsArcsGroup.append("text")
    .style('font-family', '"Lato Medium", sans-serif')
    .attr('x', (d, i) => {
      if (d.fontValue){
        return pointSource.y - 50;
      } else {
        return pointSource.y - 38;
      }
    })
    .style('fill', () => {
      color: '#000000'
    })
    .style('font-size', '10px')
    .style('font-weight', 'bold')
    .attr('y', (d, i) => {
      return pointSource.x + 5;
    })
    .text(function (d) {
      return d.latLng.lat+' '+d.latLng.lng;
    });

  this.bandsArcsGroup.append("text")
    .style('text-anchor', 'start')
    .style('dominant-baseline', 'middle')
    .style('font-family', '"Lato Medium", sans-serif')
    .style('fill', () => {
      return 'black';
    })
    .style('font-size', '11px')
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
        return -pointSource.x / 12;
      }
    })
    .style('font-weight', function (d) {
      // if (d.data.font) {
      return "bold";
      // }
    })
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
      return '#ffffff';
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

};

createArc(width) {
  return d3.arc()
    .innerRadius(width * 0.75 / 2)
    .outerRadius(width * 0.75 / 2 + 30);
}

rotatePieChart() {
  return d3.pie()
    .startAngle(-0.5 * Math.PI)
    .endAngle(0.5 * Math.PI)
    .value((d) => {
      return d['value'];
    })
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
      if (d.endAngle > 180 * Math.PI / 180) {
        let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
          middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
          endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
        let newStart = endLoc.exec(newArc)[1];
        let newEnd = startLoc.exec(newArc)[1];
        // let middleSec = middleLoc.exec(newArc)[1];
        newArc = 'M' + newStart + 'L'+ newEnd;
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
    .attr('class', 'linePointsGroup');
}

appendLineGroupPath(element, lineData, colors) {
  return this.linePointsGroup.append('path')
    .attr('class', function (d, i) {
      let donutArc = $(element).find('#donutArc' + i)[0];
      let pathEl = d3.select(donutArc).node();
      let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
      d.source = {
        x: 0,
        y: 100
      };
      d.target = {
        x: midpoint.x,
        y: midpoint.y+40
      };
      return 'linePoints';
    })
    .attr('stroke-width', 3)
    .attr('stroke', function (d, i) {
      let device = d.data.type;
      if(device) {
        return colors[device];
      } else {
        return '#7070708A';
      }
    })
    .style("stroke-dasharray", ("5, 3"))
    .attr('fill', 'none')
    .attr('d', lineData);
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
      return 'translate(' + (midpoint.x) + ',' + (midpoint.y) + ')';
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
      return 0;
    })
    .attr('cy', (d) => {
     return 0;
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
  return this.circleGroup.append('text')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .style('font-weight', 'bold')
    .style('font-family', '"Lato Medium", sans-serif')
    .style('fill', '#000000')
    .style('font-size', '12px')
    .attr('class', 'donutText')
    .attr('x', (d) => {
      return 10;
    })
    .attr('y', (d) => {
      return 30;
    })
    .style('font-weight', function (d) {
      if (d.data.font) {
        return "bold";
      }
    })
    .text((d) => {
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
      return 0;
    })
    .attr('y', (d) => {
      return 0;
    })
    .attr('class', 'iconText')
    .text((d) => {
      return d.data.fontvalue;
    });
}
}

