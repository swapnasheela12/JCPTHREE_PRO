import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpiderView]'
})
export class SpiderViewDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.setFontColor('red')
  }

  setFontColor(color: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', color)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setFontColor('blue')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setFontColor('red')
  }


  // getOnAirData() {
  //   var data = [{
  //     name: 'Alarms',
  //     value: 5,
  //     color: '#ED1C24',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf1fe',
  //     // eventname: 'sites-tree-alarms'
  //     eventname: 'sites-tree-onairalarms'
  //   }, {
  //     name: 'Neighbours',
  //     value: 5,
  //     color: '#29ABE2',
  //     font: 'icomoon',
  //     fontvalue: '\ue919',
  //     eventname: 'sites-tree-neighbours'
  //   }, {
  //     name: 'KPI\'s',
  //     value: 5,
  //     color: '#F7931E',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf334',
  //     eventname: 'sites-tree-ranperformace'
  //   }, {
  //     name: 'Properties',
  //     value: 5,
  //     color: '#8CC63F',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf112',
  //     eventname: 'sites-tree-properties'
  //     // eventname: 'sites-tree-sectorproperties'
  //   },
  //   //  {
  //   //     name: 'Performace',
  //   //     value: 5,
  //   //     color: '#ED1E79',
  //   //     font: 'Material-Design-Iconic-Font',
  //   //     fontvalue: '\uf130',
  //   //     eventname: 'sites-tree-ranperformace'
  //   // },
  //   {
  //     name: 'Capacity',
  //     value: 5,
  //     color: '#009245',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf323',
  //     eventname: 'sites-tree-capacity'
  //   }, {
  //     name: 'Configuration',
  //     value: 5,
  //     color: '#662D91',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf1ed',
  //     eventname: 'sites-tree-configuration'
  //   }, {
  //     name: 'Indoor Analysis',
  //     value: 5,
  //     color: '#29ABE2',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf175',
  //     eventname: 'sites-tree-indoor'
  //   }
  //     // , {
  //     //     name: 'History',
  //     //     value: 5,
  //     //     color: '#F7931E',
  //     //     font: 'Material-Design-Iconic-Font',
  //     //     fontvalue: '\uf336',
  //     //     eventname: 'sites-tree-history'
  //     // }
  //     , {
  //     name: 'Cell Coverage Map',
  //     value: 5,
  //     color: '#ED1C24',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf299',
  //     eventname: 'overshooting-coverage-map'
  //   }, {
  //     name: 'Create Workorder',
  //     value: 5,
  //     color: '#8dc63f',
  //     font: 'Material-Design-Iconic-Font',
  //     fontvalue: '\uf222',
  //     eventname: 'sites-tree-createworkorder'
  //   }, {
  //     name: 'See Routers',
  //     value: 5,
  //     color: '#dc2050',
  //     font: 'icomoon',
  //     fontvalue: '\uebcc',
  //     eventname: 'see-routers'
  //   }
  //   ];

  //   return data;
  // };

  // link(scope, element) {
  //   console.log(scope, "scope");

  //   var d3 = $window.d3;
  //   var rawSvg = element.find('svg')[0];
  //   var svg = d3.select(rawSvg);

  //   var data = [];

  //   if (scope.sector.pcicolor == '#666666' || scope.sector.pcicolor == '#b3b3b3') {
  //     data = getOffAirData();
  //   } else {
  //     data = getOnAirData();
  //   }

  //   $timeout(function () {
  //     scope.sitehide();
  //     drawSVG(element, svg, data, scope);
  //   }, 500);
  // }


  // drawSVG(element, svgGroup, data, scope) {

  //   var d3 = $window.d3;

  //   var clientWidth = element[0].offsetWidth;
  //   var clientHeight = element[0].offsetHeight;
  //   var screenWidth = clientWidth > 0 ? clientWidth : 500;
  //   var screenHeight = clientHeight > 0 ? clientHeight : 500;

  //   var margin = {
  //     left: 20,
  //     top: 20,
  //     right: 20,
  //     bottom: 20
  //   };

  //   var width = Math.min(screenWidth, 500) - margin.left - margin.right;
  //   // var height = Math.min(screenHeight, 500) - margin.top - margin.bottom;

  //   var wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
  //     .attr('transform', 'translate(' + ((screenWidth / 2) + 100) + ',' + (screenHeight / 2) + ')');

  //   //Create an arc function
  //   var arc = d3.svg.arc()
  //     .innerRadius(width * 0.75 / 2)
  //     .outerRadius(width * 0.75 / 2 + 30);

  //   //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
  //   var pie = d3.layout.pie()
  //     .startAngle(0)
  //     .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
  //     .value(function (d) {
  //       return d.value;
  //     })
  //     .padAngle(.01)
  //     .sort(null);


  //   var diagonal = d3.svg.diagonal()
  //     .source(function (d) {
  //       return {
  //         'x': d.source.y,
  //         'y': d.source.x
  //       };
  //     })
  //     .target(function (d) {
  //       return {
  //         'x': d.target.y,
  //         'y': d.target.x
  //       };
  //     })
  //     .projection(function (d) {
  //       return [d.y, d.x];
  //     });


  //   var bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');
  //   //////////////////////////////////////////////////////////////
  //   //////////////////// Create Donut Chart //////////////////////
  //   //////////////////////////////////////////////////////////////

  //   //Create the donut slices and also the invisible arcs for the text

  //   var donutArcsGroup = wrapgroup.selectAll('.donutArcsGroup')
  //     .data(pie(data))
  //     .enter().append('g')
  //     .attr('class', 'donutArcsGroup');

  //   donutArcsGroup.append('path')
  //     .attr('d', arc)
  //     .style('fill', 'none')
  //     .attr('class', function (d, i) {
  //       //Search pattern for everything between the start and the first capital L
  //       var firstArcSection = /(^.+?)L/;

  //       //Grab everything up to the first Line statement
  //       var newArc = firstArcSection.exec(d3.select(this).attr('d'))[1];
  //       //Replace all the comma's so that IE can handle it
  //       newArc = newArc.replace(/,/g, ' ');

  //       //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
  //       //flip the end and start position
  //       if (d.endAngle > 90 * Math.PI / 180) {
  //         var startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
  //           middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
  //           endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
  //         //Flip the direction of the arc by switching the start en end point (and sweep flag)
  //         //of those elements that are below the horizontal line
  //         var newStart = endLoc.exec(newArc)[1];
  //         var newEnd = startLoc.exec(newArc)[1];
  //         var middleSec = middleLoc.exec(newArc)[1];

  //         //Build up the new arc notation, set the sweep-flag to 0
  //         newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd;
  //       } //if

  //       //Create a new invisible arc that the text can flow along
  //       d3.select(this.parentNode).append('path')
  //         .attr('class', 'hiddenDonutArcs')
  //         .attr('id', 'donutArc' + i)
  //         .attr('d', newArc)
  //         .style('fill', 'none');

  //       return 'donutArcs';
  //     });


  //   var linePointsGroup = wrapgroup.selectAll('.linePointsGroup')
  //     .data(pie(data))
  //     .enter().append('g')
  //     .attr('class', 'linePointsGroup');


  //   linePointsGroup.append('path')
  //     .attr('class', function (d, i) {
  //       var donutArc = element.find('#donutArc' + i)[0];
  //       var pathEl = d3.select(donutArc).node();
  //       var midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
  //       d.source = {
  //         x: 0,
  //         y: 0
  //       };
  //       d.target = {
  //         x: midpoint.x,
  //         y: midpoint.y
  //       };
  //       return 'linePoints';
  //     })
  //     .attr('stroke-width', 1)
  //     .attr('stroke', '#FFFFFF')
  //     .attr('fill', 'none')
  //     .attr('d', diagonal);

  //   linePointsGroup.append('circle')
  //     .attr('class', function (d, i) {
  //       var donutArc = element.find('#donutArc' + i)[0];
  //       var pathEl = d3.select(donutArc).node();
  //       var midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
  //       d.source = {
  //         x: 0,
  //         y: 0
  //       };
  //       d.target = {
  //         x: midpoint.x,
  //         y: midpoint.y
  //       };
  //       return 'circlePointsEnd';
  //     })
  //     .attr('r', 3)
  //     .attr('fill', '#FFFFFF')
  //     .attr('cx', function (d) {
  //       return d.target.x;
  //     })
  //     .attr('cy', function (d) {
  //       return d.target.y;
  //     });


  //   var circleGroup = wrapgroup.selectAll('.circleGroup')
  //     .data(pie(data))
  //     .enter().append('g')
  //     .style('cursor', 'pointer')
  //     .style('pointer-events', function (d, i) {
  //       if (d.data.disabled) return 'none';
  //       return 'all';
  //     })
  //     .attr('class', 'circleGroup')
  //     .attr('transform', function (d, i) {
  //       var donutArc = element.find('#donutArc' + i)[0];
  //       var pathEl = d3.select(donutArc).node();
  //       var midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
  //       return 'translate(' + midpoint.x + ',' + midpoint.y + ')';
  //     });

  //   circleGroup.append('circle')
  //     .attr('class', 'circlePoints')
  //     .attr('r', 20)
  //     .attr('stroke-width', 1)
  //     .attr('stroke', '#FFFFFF')
  //     .attr('fill', function (d) {
  //       if (d.data.disabled) return '#b3b3b3';
  //       return d.data.color;
  //     })
  //     .attr('cx', function (d) {
  //       return 25;
  //     })
  //     .attr('cy', function (d) {
  //       var degree = d.endAngle * (180 / Math.PI);
  //       return (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0;
  //     });

  //   //Append the label names on the outside
  //   circleGroup.append('text')
  //     .style('text-anchor', 'start')
  //     .style('fill', function (d) {
  //       if (d.data.disabled) return '#b3b3b3';
  //       return '#FFFFFF';
  //     })
  //     .style('font-size', '12px')
  //     .attr('class', 'donutText')
  //     .attr('x', function (d) {
  //       return 50;
  //     })
  //     .attr('y', function (d) {
  //       var degree = d.endAngle * (180 / Math.PI);
  //       return (degree <= 90) ? -10 : (degree >= 180) ? 20 : 5
  //     })
  //     .text(function (d) {
  //       return d.data.name;
  //     });


  //   //Append the label names on the outside
  //   circleGroup.append('text')
  //     .style('text-anchor', 'middle')
  //     .style('dominant-baseline', 'middle')
  //     .style('fill', '#ffffff')
  //     .style('color', '#ffffff')
  //     .style('font-size', '24px')
  //     .style('font-family', function (d) {
  //       return d.data.font;
  //     })
  //     .attr('x', function (d) {
  //       return 25;
  //     })
  //     .attr('y', function (d) {
  //       var degree = d.endAngle * (180 / Math.PI);
  //       return (degree <= 90) ? -7.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 12 : 0;
  //     })
  //     .attr('class', 'iconText')
  //     .text(function (d) {
  //       return d.data.fontvalue;
  //     });


  //   var bandarc = d3.svg.arc();

  //   bandGroup.append('circle')
  //     .attr('r', 7)
  //     .attr('stroke-width', 1)
  //     .attr('stroke', '#000000')
  //     .attr('fill', '#06C1FF')
  //     .style('cursor', 'pointer');


  //   var bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

  //   var bands = scope.currentbands;
  //   var currentselected = scope.sector;


  //   bandGroup.on('click', function () {
  //     $rootScope.$broadcast('sites-tree-siteproperties', currentselected);
  //     //d3.event.stopPropagation();
  //   });

  //   for (var i = 0, count = bands.length; i < count; i++) {
  //     var item = bands[i];
  //     var sectors = item.siteArray;
  //     var sectorcount = sectors.length;

  //     var currentSectorId = currentselected.sectorid;

  //     var currentBands = {};
  //     for (var band in bands) {
  //       var band = bands[band];
  //       currentBands[band.sitebandtype] = true;
  //     }


  //     // var outerRadius = (item.sitebandtype == 'site850') ? 45 : (item.sitebandtype == 'site1800') ? 35 : 25;
  //     // var innerRadius = 15;

  //     currentselected.details = item;

  //     for (var j = 0; j < sectorcount; j++) {

  //       var sector = sectors[j];
  //       var startAngle = (sector.azimuth - (sector.horizontalBeamWidth / 2)) * Math.PI / 180;
  //       var endAngle = (sector.azimuth + (sector.horizontalBeamWidth / 2)) * Math.PI / 180;

  //       if (sector.sectorid == currentSectorId) {
  //         if (currentselected.cellid == sector.cellid) {
  //           startAngle = (sector.azimuth - (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
  //           endAngle = (sector.azimuth + (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
  //         }
  //       }

  //       var outerRadius = (sector.sitebandtype == 'site850') ? 45 : (sector.sitebandtype == 'site1800') ? 35 : 25;
  //       var innerRadius = (sector.sitebandtype == 'site850') ? 35 : (sector.sitebandtype == 'site1800') ? 25 : 15;

  //       if (sector.sitebandtype == 'site1800') {
  //         if (!currentBands['site2300']) innerRadius = 15;
  //       }
  //       if (sector.sitebandtype == 'site850') {
  //         if (!currentBands['site1800'] && currentBands['site2300']) innerRadius = 25;
  //         if (!currentBands['site1800'] && !currentBands['site2300']) innerRadius = 15;
  //       }

  //       // if (sector.sectorid == currentSectorId) {
  //       //     if (currentselected.cellid == sector.cellid) {
  //       //         startAngle = (sector.azimuth - (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
  //       //         endAngle = (sector.azimuth + (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
  //       //     }
  //       //     innerRadius = (item.sitebandtype == 'site850') ? 41 : (item.sitebandtype == 'site1800') ? 28 : 15;
  //       //     outerRadius = (item.sitebandtype == 'site850') ? 51 : (item.sitebandtype == 'site1800') ? 38 : 25;

  //       // } else {
  //       //     innerRadius = 15;
  //       //     outerRadius = (item.sitebandtype == 'site850') ? 45 : (item.sitebandtype == 'site1800') ? 35 : 25;
  //       // }

  //       // innerRadius = 15;
  //       // outerRadius = (item.sitebandtype == 'site850') ? 45 : (item.sitebandtype == 'site1800') ? 35 : 25;


  //       var leafSVG = bandsArcsGroup.append('path')
  //         .attr('d', function () {
  //           return bandarc({
  //             innerRadius: innerRadius,
  //             outerRadius: outerRadius,
  //             startAngle: startAngle,
  //             endAngle: endAngle
  //           });
  //         })
  //         .attr('id', 'leafSVGArc' + i + '' + j)
  //         .style('cursor', 'pointer')
  //         .attr('fill', function () {
  //           return sector.pcicolor;
  //         })
  //         .attr('stroke-width', 1)
  //         .attr('stroke', '#000');

  //       leafSVG.on('mouseover', (function () {
  //         return function () {
  //           d3.select(this).transition().attr('stroke-width', 2);
  //           return false;
  //         };
  //       })());

  //       leafSVG.on('mouseout', (function (currentselected, sector) {
  //         return function () {
  //           if (currentselected.cellid != sector.cellid) {
  //             d3.select(this).transition().attr('stroke-width', 1);
  //           }
  //           return false;
  //         };
  //       })(currentselected, sector));

  //       leafSVG.on('click', (function (currentselected, sector) {
  //         return function () {
  //           scope.sector = sector;
  //           svgGroup.selectAll('*').remove();
  //           if (scope.sector.pcicolor == '#666666' || scope.sector.pcicolor == '#b3b3b3') {
  //             data = getOffAirData();
  //           } else {
  //             data = getOnAirData();
  //           }
  //           drawSVG(element, svgGroup, data, scope);
  //           d3.event.stopPropagation();
  //           return false;
  //         };
  //       })(currentselected, sector));

  //       if (currentselected.cellid == sector.cellid) {
  //         (function (leafSVG, i, j) {

  //           var leafArc = element.find('#leafSVGArc' + i + '' + j)[0];
  //           var midpoint = getBoundingBoxCenter(d3.select(leafArc));

  //           var source = {
  //             x: 100,
  //             y: 0
  //           };
  //           var target = {
  //             x: midpoint[0],
  //             y: midpoint[1]
  //           };

  //           leafSVG.attr('opacity', '1').attr('stroke-width', 2);
  //           bandGroup.append('line')
  //             .attr('class', 'lineBands')
  //             .attr('stroke-width', 1)
  //             .attr('stroke', '#FFFFFF')
  //             .attr('fill', 'none')
  //             .attr('x1', source.x)
  //             .attr('y1', source.y)
  //             .attr('x2', target.x)
  //             .attr('y2', target.y);

  //           bandGroup.append('circle')
  //             .attr('class', 'lineBandsCircle')
  //             .attr('r', 3)
  //             .attr('fill', '#FFFFFF')
  //             .attr('cx', target.x)
  //             .attr('cy', target.y);


  //         })(leafSVG, i, j);
  //       }
  //     }
  //   }


  //   circleGroup.on('mouseover', function () {
  //     d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
  //   })
  //     .on('mouseout', function () {
  //       d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
  //     })
  //     .on('click', function (d) {
  //       $rootScope.$broadcast(d.data.eventname, currentselected);
  //       //d3.event.stopPropagation();
  //     });

  //   svgGroup.on('click', function () {
  //     scope.siteshow();
  //     element.parent().remove();
  //     d3.event.stopPropagation();
  //   });

  // }

  // getBoundingBoxCenter(selection) {
  //   // get the DOM element from a D3 selection
  //   // you could also use "this" inside .each()
  //   var element = selection.node(),
  //     // use the native SVG interface to get the bounding box
  //     bbox = element.getBBox();
  //   // return the center of the bounding box
  //   return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
  // }







}
