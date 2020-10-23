import { KpiComponent } from './../../../outdoor/spider/popup/kpi/kpi.component';

import { OnInit, ElementRef, Component } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import * as d3 from 'd3/index';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';
import { ConfigurationComponent } from 'src/app/modules/components/configuration/configuration.component';
import { AlarmsPopupComponent } from 'src/app/modules/components/alarms-popup/alarms-popup.component';
// import { KpiComponent } from './popup/kpi/kpi.component';
import { CapacityComponent } from 'src/app/modules/components/capacity/capacity.component';
import { HttpClient } from '@angular/common/http';
import { CandidatesComponent } from 'src/app/modules/components/properties/candidates/candidates.component';
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
export class SmallCellPlannedSpiderViewComponent implements OnInit {

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
  imageURL = 'assets/data/layers/nominalssites/0.svg';

  currentcell

  constructor(private datashare: DataSharingService, private element: ElementRef,
    private router: Router, private http: HttpClient, public dialog: MatDialog) { }

  public currentbands;
  public sector;
  public offAirData = [{
    name: 'History',
    value: 5,
    color: '#F7931E',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf336',
    eventname: 'sites-tree-offairhistory'
  }, {
    name: 'Create Work Order',
    value: 5,
    color: '#29ABE2',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf275',
    disabled: true,
    eventname: 'sites-tree-createwo'
  }];

  public normalData = [{
    name: 'History',
    value: 5,
    color: '#F7931E',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf336',
    eventname: 'sites-tree-offairhistory'
  }, {
    name: 'Create Work Order',
    value: 5,
    color: '#29ABE2',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf275',
    disabled: true,
    eventname: 'sites-tree-createwo'
  }];

  public onAirData = [{
    name: 'Alarms',
    value: 5,
    color: '#ED1C24',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf1fe',
    // eventname: 'sites-tree-alarms'
    eventname: 'sites-tree-onairalarms'
  }, {
    name: 'Neighbours',
    value: 5,
    color: '#29ABE2',
    font: 'icomoon',
    fontvalue: '\ue919',
    eventname: 'sites-tree-neighbours'
  }, {
    name: 'KPI\'s',
    value: 5,
    color: '#F7931E',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf334',
    eventname: 'sites-tree-ranperformace'
  }, {
    name: 'Properties',
    value: 5,
    color: '#8CC63F',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf112',
    eventname: 'sites-tree-properties'
    // eventname: 'sites-tree-sectorproperties'
  },
  {
    name: 'Capacity',
    value: 5,
    color: '#009245',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf323',
    eventname: 'sites-tree-capacity'
  }, {
    name: 'Configuration',
    value: 5,
    color: '#662D91',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf1ed',
    eventname: 'sites-tree-configuration'
  }, {
    name: 'Indoor Analysis',
    value: 5,
    color: '#29ABE2',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf175',
    eventname: 'sites-tree-indoor'
  }
    , {
    name: 'Cell Coverage Map',
    value: 5,
    color: '#ED1C24',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf299',
    eventname: 'overshooting-coverage-map'
  }, {
    name: 'Create Workorder',
    value: 5,
    color: '#8dc63f',
    font: 'Material-Design-Iconic-Font',
    fontvalue: '\uf222',
    eventname: 'sites-tree-createworkorder'
  }, {
    name: 'See Routers',
    value: 5,
    color: '#dc2050',
    font: 'icomoon',
    fontvalue: '\uebcc',
    eventname: 'see-routers'
  }
  ];

  public sectorData = {
    "sapid": "I-MU-MUMB-ENB-I414",
    "sectorid": 3,
    "latitude": 19.0296866,
    "longitude": 72.9056938,
    "azimuth": 210,
    "mechTilt": 0,
    "antennaType": "S-Wave 67&#x2f;89&#x2f;18&#x2f;23-65-15&#x2f;15&#x2f;17&#x2f;17 DV2&#x2f;14V10CI-F&#x28;PB&#x29; &#x28;iRET&#x29;",
    "antennaHeight": 25,
    "elecTilt": 6,
    "totalTilt": 6,
    "cellid": 1409042,
    "cNum": 2,
    "ecgi": "4058740158012",
    "horizontalBeamWidth": 65,
    "verticalBeamWidth": 7.2,
    "antennaVendor": "Rosenberger",
    "cellName": "I-MU-MUMB-ENB-I414-3",
    "eirp": "61.74",
    "antennaGain": "16.3",
    "feederCableLength": "2",
    "opticCableLength": "60",
    "retStatus": "YES",
    "transmitPower0": null,
    "transmitPower1": null,
    "transmitPower2": null,
    "transmitPower3": null,
    "txPower": "46",
    "oamLsmrId": "INMUNVMBXXXXNB0001AG3REM006",
    "oamVlan": "103",
    "oamIpv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;103&#x3a;15a",
    "oamGatewayIpv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;103&#x3a;159",
    "oamIpv6SubnetMask": "126",
    "oamGatewayIpv6SubnetMask": "126",
    "signalingVlan": "102",
    "signalingIpv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;102&#x3a;15a",
    "signalingGatewayIPv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;102&#x3a;159",
    "signalingIPv6SubnetMask": "126",
    "signalingGatewayIPv6SubnetMask": "126",
    "signalingMMEGroupId": "WEST1MME8003",
    "bearerVlan": "101",
    "bearerIpv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;101&#x3a;15a",
    "bearerGatewayIPv6Address": "2405&#x3a;200&#x3a;101&#x3a;1100&#x3a;3&#x3a;2&#x3a;101&#x3a;159",
    "bearerIPv6SubnetMask": "126",
    "bearerGatewayIPv6SubnetMask": "126",
    "bearerSAEGWPrimaryGroupId": "MUMBSAEPR0001",
    "cellIdNew": "1409042",
    "totalLosses": "0.364",
    "antennaModel": "4T4R",
    "propagationModel": "4 SPM_MU MR_7",
    "pilotChannelTxPower": 12.2,
    "clutterCategory": "MU",
    "radiusThreshold": 330,
    "rsrpThreshold": "-95.3",
    "objectRsrpThreshold": "-110.3",
    "baseChannelFreq": "2315",
    "carrier": "2",
    "dtxFactor": "1",
    "atpcFactor": "1",
    "unitLoss": "18.2",
    "rfCableLength": "2",
    "combinerLoss": "0",
    "connectorLoss": "0.2",
    "eirpBaseChannel": "1491.42",
    "eirpDtxAtpc": "1491.42",
    "eirpTotal": "2982.84",
    "rrhType": "V2_Window_Less",
    "pci": 347,
    "tac1": "H&#x27;003B",
    "eNodeBId": "5504",
    "bandwidth": 20,
    "adminState": "Unlocked",
    "progressState": "ONAIR",
    "earfcn2300": 38800,
    "cellid2": 1409045,
    "ecgi2": "4058740158015",
    "pci2": 84,
    "cNum2": 14,
    "tac2": "H&#x27;003B",
    "eNodeBId2": "5504",
    "bandwidth2": 10,
    "adminState2": "Unlocked",
    "progressState2": "ONAIR",
    "earfcn_ac2300": 39350,
    "handoverFailureRate": 0.05894,
    "handoverFailureRate2": 0.08965,
    "eTiltChangeDate": 1496285131570
  }
  currentBand = []
  ngOnInit() {
    this.datashare.currentSpiderData.subscribe((message) => {
      this.message = message;
    });
    this.http.get("assets/data/layers/microsites-onair.json")
      .subscribe(message => {
        this.currentbands = message["site2300"]
        this.sector = this.sectorData
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

    let translateX = ((screenWidth / 2) + 50);
    let translateY = (screenHeight / 2);

    let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
      .attr('transform', 'translate(' + translateX + ',' + translateY + ')')

    // let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
    //   .attr('transform', 'translate(' + ((screenWidth / 2) + 100) + ',' + (screenHeight / 2) + ')');

    //Create an arc function
    this.arc = this.createArc(width);

    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    this.pie = this.rotatePieChart();
    // let d3 = $window.d3;

    // let clientWidth = element[0].offsetWidth;
    // let clientHeight = element[0].offsetHeight;
    // let screenWidth = clientWidth > 0 ? clientWidth : 500;
    // let screenHeight = clientHeight > 0 ? clientHeight : 500;

    // let margin = {
    //   left: 20,
    //   top: 20,
    //   right: 20,
    //   bottom: 20
    // };

    // let width = Math.min(screenWidth, 500) - margin.left - margin.right;
    // // let height = Math.min(screenHeight, 500) - margin.top - margin.bottom;

    // let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
    //   .attr('transform', 'translate(' + ((screenWidth / 2) + 100) + ',' + (screenHeight / 2) + ')');

    //Create an arc function
    // let arc = d3.svg.arc()
    //   .innerRadius(width * 0.75 / 2)
    //   .outerRadius(width * 0.75 / 2 + 30);

    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    let pie = this.layoutPie(width);


    let diagonal = this.diagonal(width);


    let bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');
    //////////////////////////////////////////////////////////////
    //////////////////// Create Donut Chart //////////////////////
    //////////////////////////////////////////////////////////////

    //Create the donut slices and also the invisible arcs for the text
    this.donutArcsGroup = this.createDonutGroup(wrapgroup, data);
    this.createDonutArc();
    // let donutArcsGroup = wrapgroup.selectAll('.donutArcsGroup')
    //   .data(pie(data))
    //   .enter().append('g')
    //   .attr('class', 'donutArcsGroup');

    // donutArcsGroup.append('path')
    //   .attr('d', arc)
    //   .style('fill', 'none')
    //   .attr('class', function (d, i) {
    //     //Search pattern for everything between the start and the first capital L
    //     let firstArcSection = /(^.+?)L/;

    //     //Grab everything up to the first Line statement
    //     let newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
    //     //Replace all the comma's so that IE can handle it
    //     newArc = newArc.replace(/,/g, ' ');

    //     //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
    //     //flip the end and start position
    //     if (d.endAngle > 90 * Math.PI / 180) {
    //       let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
    //         middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
    //         endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
    //       //Flip the direction of the arc by switching the start en end point (and sweep flag)
    //       //of those elements that are below the horizontal line
    //       let newStart = endLoc.exec(newArc)[1];
    //       let newEnd = startLoc.exec(newArc)[1];
    //       let middleSec = middleLoc.exec(newArc)[1];

    //       //Build up the new arc notation, set the sweep-flag to 0
    //       newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
    //     } //if

    //     //Create a new invisible arc that the text can flow along
    //     d3.select(this.parentNode).append('path')
    //       .attr('class', 'hiddenDonutArcs')
    //       .attr('id', 'donutArc' + i)
    //       .attr('d', newArc)
    //       .style('fill', 'none');

    //     return 'donutArcs';
    //   });


    let linePointsGroup = wrapgroup.selectAll('.linePointsGroup')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'linePointsGroup');


    linePointsGroup.append('path')
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
      .attr('d', diagonal);

    linePointsGroup.append('circle')
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
        let donutArc = $(element).find('#donutArc' + i)[0];
        let pathEl = d3.select(donutArc).node();
        let midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
        return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
      });

    circleGroup.append('circle')
      .attr('class', 'circlePoints')
      .attr('r', 20)
      .attr('stroke-width', 1)
      .attr('fill', function (d) {
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('stroke', '#FFFFFF')
      // .attr('fill', function(d) {
      //     return d.data.color;
      // })
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
      .style('fill', function (d) {
        if (d.data.disabled) return '#b3b3b3';
        return '#FFFFFF';
      })
      .style('font-size', '12px')
      .attr('class', 'donutText')
      .attr('x', function (d) {
        return 50;
      })
      .attr('y', function (d) {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 20 : 5
      })
      .text(function (d) {
        return d.data.name;
      });


    //Append the label names on the outside
    circleGroup.append('text')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', '#ffffff')
      .style('color', '#ffffff')
      .style('font-size', '24px')
      .style('font-family', function (d) {
        return d.data.font;
      })
      .attr('x', function (d) {
        return 25;
      })
      .attr('y', function (d) {
        let degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -7.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 12 : 0;
      })
      .attr('class', 'iconText')
      .text(function (d) {
        return d.data.fontvalue;
      });


    this.bandarc = d3.arc();


    // bandGroup.append('circle')
    //     .attr('r', 30)
    //     .attr('stroke-width', 1)
    //     .attr('stroke', '#000000')
    //     .attr('fill', '#FFFFFF')
    //     .style('cursor', 'pointer');


    let bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

    let currentcell = this.currentcell;
    let siteArray = data.siteArray;

    let pointSource = {
      x: 100,
      y: 0
    };

    let pointTarget = {
      x: 0,
      y: 0
    };
    let pointLine: any;
    for (let i = 0, count = siteArray.length; i < count; i++) {
      let cell = siteArray[i];
      let angle = cell.azimuth - (20 / 2);
      pointLine = this.findNewPoint(0, 0, angle, 22.5);
      let cellGroup = null;

      if (cell.pci == currentcell.pci) {



        cellGroup = bandsArcsGroup.append('g')
          .attr('id', 'cellGroup-' + i)
          .attr('class', 'cellGroup')
          .attr('transform', 'translate(-22.5,-39.4) rotate(' + angle + ', 22.5, 39.4)')
          .style('cursor', 'pointer')

        let cellGroupImageFor = cellGroup.append('foreignObject')
          .attr({ 'width': 45, 'height': 45.4 });

        let imageURL = 'assets/images/Layers/planned-small-cell/plannedwhite.svg'

        let cellGroupImage = cellGroupImageFor.append('xhtml:img')
          .attr({ 'width': 45, 'height': 45.4, 'src': imageURL });

      } else {
        cellGroup = bandsArcsGroup.append('g')
          .attr('id', 'cellGroup-' + i)
          .attr('class', 'cellGroup')
          .attr('transform', 'translate(-13.5,-27) rotate(' + angle + ', 13.5, 27)')
          .style('cursor', 'pointer')

        let cellGroupImageFor = cellGroup.append('foreignObject')
          .attr({ 'width': 27, 'height': 33 });

        let imageURL = 'assets/images/maps/smallcell/plannedblue-new.svg'

        let cellGroupImage = cellGroupImageFor.append('xhtml:img')
          .attr({ 'width': 27, 'height': 33, 'src': imageURL });
      }

      cellGroup.on('click', (function (cell, currentcell) {
        return function () {
          this.currentcell = cell;
          svgGroup.selectAll('*').remove();
          this.drawSVG(element, svgGroup, data, this);
          d3.event.stopPropagation();
          return false;
        };
      })(cell, currentcell));

    };

    //leafSVG.attr('opacity', '1').attr('stroke-width', 2);
    bandGroup.append('line')
      .attr('class', 'lineBands')
      .attr('stroke-width', 1)
      .attr('stroke', '#FFFFFF')
      .attr('fill', 'none')
      .attr('x1', pointSource.x)
      .attr('y1', pointSource.y)
      .attr('x2', pointLine.x)
      .attr('y2', pointLine.y);

    bandGroup.append('circle')
      .attr('class', 'lineBandsCircle')
      .attr('r', 3)
      .attr('fill', '#FFFFFF')
      .attr('cx', pointLine.x)
      .attr('cy', pointLine.y);


    circleGroup.on('mouseover', function () {
      d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
    })
      .on('mouseout', function () {
        d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
      })
      .on('click', function (d) {
        // $rootScope.$broadcast(d.data.eventname, currentcell);
        //d3.event.stopPropagation();
      });

    svgGroup.on('click', function () {
      // scope.siteshow();
      $(element).parent().remove();
      d3.event.stopPropagation();
    });










    // const clientWidth = element.offsetWidth;
    // const clientHeight = element.offsetHeight;
    // let screenWidth = clientWidth > 0 ? clientWidth : 500;
    // let screenHeight = clientHeight > 0 ? clientHeight : 500;

    // let margin = {
    //   left: 20,
    //   top: 20,
    //   right: 20,
    //   bottom: 20
    // };
    // const outerContext = this;
    // let width = Math.min(screenWidth, 500) - margin.left - margin.right;

    // let translateX = ((screenWidth / 2) + 100);
    // let translateY = (screenHeight / 2);

    // let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
    //   .attr('transform', 'translate(' + translateX + ',' + translateY + ')')

    // //Create an arc function
    // this.arc = this.createArc(width);

    // //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
    // this.pie = this.rotatePieChart();

    // this.createLines();
    // let diagonal = function link(d) {
    //   return "M0" + "," + "0C" + (d.source.x + d.target.x) / 2 + "," + "0" + " " +
    //     (d.source.x + d.target.x) / 2
    //     + "," + d.target.y + " " + d.target.x + "," + d.target.y;
    // };

    // let bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');
    // //////////////////// Create Donut Chart //////////////////////
    // //Create the donut slices and also the invisible arcs for the text
    // this.donutArcsGroup = this.createDonutGroup(wrapgroup, data);
    // this.createDonutArc();
    // //createLinePoint
    // this.linePointsGroup = this.createLineGroup(wrapgroup, data);
    // this.appendLineGroupPath(element, diagonal);
    // this.appendLineToCircle(element);

    // //CreateCircleGroup
    // this.circleGroup = this.createCircleGroup(wrapgroup, this.pie, data, element)
    // this.createCircle();
    // //Append the label names on the outside
    // this.appendLabelsInsideCircle();
    // this.appendLabelOutside();

    // this.bandarc = d3.arc();

    // this.bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

    // let bands = this.currentbands;
    // let pointSource = {
    //   x: 100,
    //   y: 0
    // };
    // let pointTarget = {
    //   x: 0,
    //   y: 0
    // };

    // for (let i = 0, count = bands.length; i < count; i++) {
    //   let cellGroup = null;
    //   cellGroup = this.bandsArcsGroup.append('g')
    //     .attr('id', 'cellGroup-' + i)
    //     .attr('class', 'cellGroup')
    //     .attr('transform', 'translate(-22.5,-39.4)')
    //     .style('cursor', 'pointer')

    //   let cellGroupImageFor = cellGroup.append('foreignObject')
    //     .attr({
    //       'width': 45,
    //       'height': 45.4
    //     });

    //   let imageURL = 'assets/data/layers/nominalssites/0.svg'
    //   let cellGroupImage = cellGroup.append("svg:image")
    //     .attr('width', 45)
    //     .attr('height', 45.4)

    //     .attr("xlink:href", imageURL)
    // }

    // bandGroup.append('circle')
    //   .attr('r', 3)
    //   .attr('stroke-width', 1)
    //   .attr('stroke', '#000000')
    //   .attr('fill', 'white')
    //   .style('cursor', 'pointer');

    // bandGroup.append('line')
    //   .attr('class', 'lineBands')
    //   .attr('stroke-width', 1)
    //   .attr('stroke', '#FFFFFF')
    //   .attr('fill', 'none')
    //   .attr('x1', pointSource.x)
    //   .attr('y1', pointSource.y)
    //   .attr('x2', 0)
    //   .attr('y2', 0);

    // let cellGroup = null;
    // cellGroup = this.bandsArcsGroup.append('g')
    //   .attr('id', 'cellGroup-' + i)
    //   .attr('class', 'cellGroup')
    //   .attr('transform', 'translate(-22.5,-39.4)')
    //   .style('cursor', 'pointer')

    // let cellGroupImageFor = cellGroup.append('foreignObject')
    //   .attr({
    //     'width': 45,
    //     'height': 45.4
    //   });

    // this.circleGroup.on('mouseover', function () {
    //   d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
    // })
    //   .on('mouseout', function () {
    //     d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
    //   })
    //   .on('click', (d) => {
    //     this.openSpiderPopups(d, ref);
    //   });

    // svgGroup.on('click', function () {
    //   $(element).parent().remove();
    //   d3.event.stopPropagation();
    // });

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

  layoutPie(width) {
    return d3.pie()
      .startAngle(0)
      .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
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
      .attr('d', diagonal);
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
  getstet() {
    console.log("Pooja");
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
    this.dialog.open(CapacityComponent, {
      width: "75vw",
      maxWidth: "97vw",
      height: "80%",
      panelClass: "material-dialog-container",
    });
  };

  openPropDialogConfiguration() {
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: "95vw",
      maxWidth: "97vw",
      height: "95%",
      panelClass: "material-dialog-container",
    });
  };
  openKpiDialogConfiguration() {
    const dialogRef = this.dialog.open(KpiComponent, {
      width: "75vw",
      height: "90vh",
      maxWidth: "97vw",
      panelClass: "material-dialog-container",
    });
  };

  openAlarmDialog() {
    const dialogRef = this.dialog.open(AlarmsPopupComponent, {
      width: "75vw",
      height: "90vh",
      maxWidth: "97vw",
      panelClass: "material-dialog-container",
    });
  };

  openConfigDialog() {
    const dialogRef = this.dialog.open(ConfigurationComponent, {
      width: "60vw",
      height: "65vh",
      maxWidth: "97vw",
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
