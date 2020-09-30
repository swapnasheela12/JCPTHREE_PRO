import { OnInit, ElementRef, Component } from '@angular/core';
import * as d3 from 'd3/index';
import { MatDialog } from '@angular/material/dialog';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';
import { HttpClient } from '@angular/common/http';
import { CandidatesComponent } from 'src/app/modules/components/properties/candidates/candidates.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { SideNavService } from 'src/app/_services/side-nav.service';
declare var $: any;

@Component({
  selector: 'jcpBeta-spider',
  template: `
    <div class="spidermain-wrapper">
      <div class="spideroverlay">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
      </div>
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
export class NominalViewComponent implements OnInit {
  circleGroup;
  arc;
  pie;
  donutArcsGroup;
  linePointsGroup;
  leafSVG;
  bandsArcsGroup;
  bandarc;
  bandGroup;
  currentBand = [];

  constructor(private element: ElementRef, private http: HttpClient, public dialog: MatDialog
    , private datashare: DataSharingService, private sideNavService: SideNavService) { }
  public currentbands;
  public onAirData = [
    {
      name: 'Properties',
      value: 5,
      color: '#8CC63F',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf112',
      eventname: 'sites-tree-properties-nominals'
    },
    {
      name: 'Candidates',
      value: 5,
      color: '#ED1E79',
      font: 'Material-Design-Iconic-Font',
      fontvalue: '\uf207',
      eventname: 'sites-tree-candidates-nominals'
    }
  ];

  ngOnInit() {
    this.datashare.currentSpiderData.subscribe((message) => {
      console.log(":message", message)
    });

    this.http.get("assets/data/layers/nominalssites/nominals.json")
      .subscribe(message => {
        this.currentbands = message["site2300"];
        this.initializeBiggerNode();
      })
  }

  initializeBiggerNode() {
    let mainElement = this.element.nativeElement;
    let element = $(mainElement).find('.spideroverlay')[0];
    let rawSvg = $(element).find('svg');
    let svg: any = d3.select(rawSvg[0]);
    let data = [];
    data = this.onAirData;
    this.drawSVG(element, svg, data, this)
  }

  drawSVG(element, svgGroup, data, ref) {
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

    let diagonal = function link(d) {
      return "M0" + "," + "0C" + (d.source.x + d.target.x) / 2 + "," + "0" + " " +
        (d.source.x + d.target.x) / 2
        + "," + d.target.y + " " + d.target.x + "," + d.target.y;
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
    for (let i = 0, count = bands.length; i < count; i++) {
      let cellGroup = this.bandsArcsGroup.append('g')
        .attr('id', 'cellGroup-' + i)
        .attr('class', 'cellGroup')
        .attr('transform', 'translate(-22.5,-39.4)')
        .style('cursor', 'pointer')

      cellGroup.append('foreignObject')
        .attr({
          'width': 45,
          'height': 45.4
        });

      let imageURL = 'assets/data/layers/nominalssites/0.svg'
      cellGroup.append("svg:image")
        .attr('width', 45)
        .attr('height', 45.4)
        .attr("xlink:href", imageURL)
    }

    bandGroup.append('circle')
      .attr('r', 3)
      .attr('stroke-width', 1)
      .attr('stroke', '#000000')
      .attr('fill', 'white')
      .style('cursor', 'pointer');

    bandGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('x1', pointSource.x)
      .attr('y1', pointSource.y)
      .attr('x2', 0)
      .attr('y2', 0);

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
      .attr('class', 'linePointsGroup');
  }

  appendLineGroupPath(element, lineData) {
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
  toggleActive = true;

  openSpiderPopups(d, ref) {
    //ref.sideNavService.close();

    let event = new CustomEvent("close-side-bar");

    // Dispatch/Trigger/Fire the event
    window.dispatchEvent(event);
    if (d.data.name === "Properties") {
      ref.openPropDialogConfiguration();
    } else if (d.data.name === "Candidates") {
      ref.openCandidatesDialog();
    }
  }

  openPropDialogConfiguration() {
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: "95vw",
      maxWidth: "97vw",
      height: "95%",
      panelClass: "material-dialog-container",
    });
  };

  openCandidatesDialog() {
    const dialogRef = this.dialog.open(CandidatesComponent, {
      width: "85vw",
      maxWidth: "97vw",
      height: "85vh",
      panelClass: "material-dialog-container",
    });
  };
}
