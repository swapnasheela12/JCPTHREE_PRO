import { OnInit, ElementRef, Component } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import * as d3 from 'd3/index';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';
import { ConfigurationComponent } from 'src/app/modules/components/configuration/configuration.component';
import { AlarmsPopupComponent } from 'src/app/modules/components/alarms-popup/alarms-popup.component';
import { KpiComponent } from './popup/kpi/kpi.component';
import { CapacityComponent } from 'src/app/modules/components/capacity/capacity.component';
declare var $: any; //will be replaced by TS
@Component({
    selector: 'jcpBeta-spider',
    templateUrl: './spider.component.html',
    styleUrls: ['./spider.component.scss']
})
export class SpiderComponent implements OnInit {

    constructor(private datashare: DataSharingService, private element: ElementRef,
        private router: Router, public dialog: MatDialog) { }

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

    ngOnInit() {
        this.datashare.currentSpiderData.subscribe((message) => {
            this.currentbands = message['currentbands'];
            this.sector = message['sector'];
        });
        this.initializeBiggerNode();
    }

    initializeBiggerNode() {
        let mainElement = this.element.nativeElement;
        let element = $(mainElement).find('.spideroverlay')[0];
        let rawSvg = $(element).find('svg');
        let svg = d3.select(rawSvg[0]);
        let sectorData = this.sector;
        let data = [];
        if (sectorData.pcicolor == '#666666' || sectorData.pcicolor == '#b3b3b3') {
            data = this.offAirData;
        } else {
            data = this.onAirData;
        }
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

        let translateX = ((screenWidth / 2) + 100);
        let translateY = (screenHeight / 2);


        let wrapgroup = svgGroup.append('g').attr('class', 'wrapper')
            .attr('transform', 'translate(' + translateX + ',' + translateY + ')')


        //Create an arc function
        let arc = d3.arc()
            .innerRadius(width * 0.75 / 2)
            .outerRadius(width * 0.75 / 2 + 30);

        //Turn the pie chart 90 degrees counter clockwise, so it starts at the left
        let pie = d3.pie()
            .startAngle(0)
            .endAngle(-90 * Math.PI / 90 + 2 * Math.PI)
            .value(function (d) {
                return d['value'];
            })
            .padAngle(.01)
            .sort(null);


        let line = d3.line()
            .x(function (point) { return point['lx'] })
            .y(function (point) { return point['ly'] });
        function lineData(d) {
            let points: any = [
                { lx: d.source.x, ly: d.source.y },
                { lx: d.target.x, ly: d.target.y }
            ];
            return line(points);
        }

        let bandGroup = wrapgroup.append('g').attr('transform', 'translate(-100,0)');
        //////////////////////////////////////////////////////////////
        //////////////////// Create Donut Chart //////////////////////
        //////////////////////////////////////////////////////////////

        //Create the donut slices and also the invisible arcs for the text

        let donutArcsGroup = wrapgroup.selectAll('.donutArcsGroup')
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
                d3.select(this.parentNode).append('path')
                    .attr('class', 'hiddenDonutArcs')
                    .attr('id', 'donutArc' + i)
                    .attr('d', newArc)
                    .style('fill', 'none');

                return 'donutArcs';
            });


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
            .attr('d', lineData);

        linePointsGroup.append('circle')
            .attr('class', function (d, i) {
                var donutArc = $(element).find('#donutArc' + i)[0];
                var pathEl = d3.select(donutArc).node();
                var midpoint = pathEl.getPointAtLength(pathEl.getTotalLength() / 2);
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
            .style('pointer-events', function (d, i) {
                if (d.data.disabled) return 'none';
                return 'all';
            })
            .attr('class', 'circleGroup')
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
            .attr('stroke', '#FFFFFF')
            .attr('fill', function (d) {

                if (d.data.disabled) return '#b3b3b3';
                return d.data.color;
            })
            .attr('cx', function (d) {
                return 25;
            })
            .attr('cy', function (d) {
                var degree = d.endAngle * (180 / Math.PI);
                return (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0;
            });

        //Append the label names on the outside
        circleGroup.append('text')
            .style('text-anchor', 'start')
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
                var degree = d.endAngle * (180 / Math.PI);
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
                var degree = d.endAngle * (180 / Math.PI);
                return (degree <= 90) ? -7.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 12 : 0;
            })
            .attr('class', 'iconText')
            .text(function (d) {
                return d.data.fontvalue;
            });


        let bandarc = d3.arc();
        bandGroup.append('circle')
            .attr('r', 7)
            .attr('stroke-width', 1)
            .attr('stroke', '#000000')
            .attr('fill', '#06C1FF')
            .style('cursor', 'pointer');


        let bandsArcsGroup = bandGroup.append('g').attr('class', 'bandsArcsGroup');

        let bands = this.currentbands;
        let currentselected = this.sector;



        for (let i = 0, count = bands.length; i < count; i++) {
            let item = bands[i];
            let sectors = item.siteArray;
            let sectorcount = sectors.length;

            let currentSectorId = currentselected.sectorid;

            let currentBands = {};
            for (let band in bands) {
                let bandInner = bands[band];
                currentBands[bandInner.sitebandtype] = true;
            }


            currentselected.details = item;

            for (let j = 0; j < sectorcount; j++) {

                let sector = sectors[j];
                let startAngle = (sector.azimuth - (sector.horizontalBeamWidth / 2)) * Math.PI / 180;
                let endAngle = (sector.azimuth + (sector.horizontalBeamWidth / 2)) * Math.PI / 180;

                if (sector.sectorid == currentSectorId) {
                    if (currentselected.cellid == sector.cellid) {
                        startAngle = (sector.azimuth - (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
                        endAngle = (sector.azimuth + (sector.horizontalBeamWidth / 1.5)) * Math.PI / 180;
                    }
                }

                let outerRadius = (sector.sitebandtype == 'site850') ? 45 : (sector.sitebandtype == 'site1800') ? 35 : 25;
                let innerRadius = (sector.sitebandtype == 'site850') ? 35 : (sector.sitebandtype == 'site1800') ? 25 : 15;

                if (sector.sitebandtype == 'site1800') {
                    if (!currentBands['site2300']) innerRadius = 15;
                }
                if (sector.sitebandtype == 'site850') {
                    if (!currentBands['site1800'] && currentBands['site2300']) innerRadius = 25;
                    if (!currentBands['site1800'] && !currentBands['site2300']) innerRadius = 15;
                }


                let leafSVG = bandsArcsGroup.append('path')
                    .attr('d', function () {
                        return bandarc({
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

                leafSVG.on('mouseover', (function () {
                    return function () {
                        d3.select(this).transition().attr('stroke-width', 2);
                        return false;
                    };
                })());

                leafSVG.on('mouseout', (function (currentselected, sector) {
                    return function () {
                        if (currentselected.cellid != sector.cellid) {
                            d3.select(this).transition().attr('stroke-width', 1);
                        }
                        return false;
                    };
                })(currentselected, sector));

                leafSVG.on('click', (function (currentselected, sector) {
                    return function () {
                        outerContext.sector = sector;
                        svgGroup.selectAll('*').remove();
                        if (outerContext.sector.pcicolor == '#666666' || outerContext.sector.pcicolor == '#b3b3b3') {
                            data = outerContext.offAirData
                        } else {
                            data = outerContext.onAirData;
                        }
                        outerContext.drawSVG(element, svgGroup, data);
                        d3.event.stopPropagation();
                        return false;
                    };
                })(currentselected, sector));

                if (currentselected.cellid == sector.cellid) {
                    (function (leafSVG, i, j) {

                        let leafArc = $(element).find('#leafSVGArc' + i + '' + j)[0];
                        let d = $(leafArc).attr('id');
                        let midpoint = getBoundingBoxCenter(d3.select(leafArc));
                        let source = {
                            x: 100,
                            y: 0
                        };
                        let target = {
                            x: midpoint[0],
                            y: midpoint[1]
                        };

                        leafSVG.attr('opacity', '1').attr('stroke-width', 2);
                        bandGroup.append('line')
                            .attr('class', 'lineBands')
                            .attr('stroke-width', 1)
                            .attr('stroke', '#FFFFFF')
                            .attr('fill', 'none')
                            .attr('x1', source.x)
                            .attr('y1', source.y)
                            .attr('x2', target.x)
                            .attr('y2', target.y);

                        bandGroup.append('circle')
                            .attr('class', 'lineBandsCircle')
                            .attr('r', 3)
                            .attr('fill', '#FFFFFF')
                            .attr('cx', target.x)
                            .attr('cy', target.y);
                        function getBoundingBoxCenter(selection) {
                            // get the DOM element from a d3 selection
                            // you could also use "this" inside .each()
                            let element = selection.node(),
                                // use the native SVG interface to get the bounding box
                                bbox = element.getBBox();
                            // return the center of the bounding box
                            return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
                        }

                    })(leafSVG, i, j);
                }
            }
        }


        circleGroup.on('mouseover', function () {
            d3.select(this).select('circle').transition().attr('stroke', '#000000').attr('stroke-width', 2);
        })
            .on('mouseout', function () {
                d3.select(this).select('circle').transition().attr('stroke', '#FFFFFF').attr('stroke-width', 1);
            })
            .on('click', function (d) {
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
                }
            });

        svgGroup.on('click', function () {
            $(element).parent().remove();
            d3.event.stopPropagation();
        });

    };

    openCapacityViewPopups() {
        // const dialogRef = this.dialog.open(popupName, {
        this.dialog.open(CapacityComponent, {
            width: "95vw",
            maxWidth: "97vw",
            height: "100%",
            panelClass: "material-dialog-container",
        });
    };

    openPropDialogConfiguration() {
        const dialogRef = this.dialog.open(PropertiesComponent, {
            width: "95vw",
            maxWidth: "97vw",
            height: "100%",
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
            width: "75vw",
            height: "90vh",
            maxWidth: "97vw",
            panelClass: "material-dialog-container",
        });
    };
}
