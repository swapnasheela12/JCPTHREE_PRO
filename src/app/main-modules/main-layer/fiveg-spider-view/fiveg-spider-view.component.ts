import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
declare var $: any;
import { hierarchy, tree } from 'd3-hierarchy';

import { DataModel } from './data.model';

@Component({
  selector: 'app-fiveg-spider-view',
  templateUrl: './fiveg-spider-view.component.html',
  styleUrls: ['./fiveg-spider-view.component.scss']
})
export class FivegSpiderViewComponent implements AfterViewInit {
  @ViewChild('spiderView', { static: false }) spiderView: ElementRef;
  @ViewChild('mapTree', { static: false }) mapTree: ElementRef
  data;
  dataList = [
    {
      "km": 1,
      "left_lane": 6,
      "right_lane": 3
    },
    {
      "km": 2,
      "left_lane": 1,
      "right_lane": 16
    },
    {
      "km": 3,
      "left_lane": 19,
      "right_lane": 11
    },
    {
      "km": 4,
      "left_lane": 13,
      "right_lane": 17
    },
    {
      "km": 5,
      "left_lane": 9,
      "right_lane": 3
    },
    {
      "km": 6,
      "left_lane": 17,
      "right_lane": 14
    },
    {
      "km": 7,
      "left_lane": 5,
      "right_lane": 20
    },
    {
      "km": 8,
      "left_lane": 12,
      "right_lane": 1
    },
    {
      "km": 9,
      "left_lane": 19,
      "right_lane": 6
    },
    {
      "km": 10,
      "left_lane": 8,
      "right_lane": 0
    },
    {
      "km": 11,
      "left_lane": 10,
      "right_lane": 4
    },
    {
      "km": 12,
      "left_lane": 6,
      "right_lane": 19
    },
    {
      "km": 13,
      "left_lane": 18,
      "right_lane": 1
    },
    {
      "km": 14,
      "left_lane": 18,
      "right_lane": 12
    },
    {
      "km": 15,
      "left_lane": 14,
      "right_lane": 0
    },
    {
      "km": 16,
      "left_lane": 18,
      "right_lane": 16
    },
    {
      "km": 17,
      "left_lane": 14,
      "right_lane": 7
    },
    {
      "km": 18,
      "left_lane": 18,
      "right_lane": 20
    },
    {
      "km": 19,
      "left_lane": 1,
      "right_lane": 6
    },
    {
      "km": 20,
      "left_lane": 20,
      "right_lane": 1
    },
    {
      "km": 21,
      "left_lane": 16,
      "right_lane": 19
    },
    {
      "km": 22,
      "left_lane": 6,
      "right_lane": 1
    },
    {
      "km": 23,
      "left_lane": 7,
      "right_lane": 18
    },
    {
      "km": 24,
      "left_lane": 15,
      "right_lane": 0
    },
    {
      "km": 25,
      "left_lane": 8,
      "right_lane": 1
    },
    {
      "km": 26,
      "left_lane": 6,
      "right_lane": 8
    },
    {
      "km": 27,
      "left_lane": 14,
      "right_lane": 13
    },
    {
      "km": 28,
      "left_lane": 13,
      "right_lane": 18
    },
    {
      "km": 29,
      "left_lane": 4,
      "right_lane": 3
    },
    {
      "km": 30,
      "left_lane": 0,
      "right_lane": 17
    },
    {
      "km": 31,
      "left_lane": 9,
      "right_lane": 5
    },
    {
      "km": 32,
      "left_lane": 11,
      "right_lane": 7
    },
    {
      "km": 33,
      "left_lane": 2,
      "right_lane": 13
    },
    {
      "km": 34,
      "left_lane": 7,
      "right_lane": 16
    },
    {
      "km": 35,
      "left_lane": 4,
      "right_lane": 3
    },
    {
      "km": 36,
      "left_lane": 11,
      "right_lane": 17
    },
    {
      "km": 37,
      "left_lane": 3,
      "right_lane": 9
    },
    {
      "km": 38,
      "left_lane": 9,
      "right_lane": 3
    },
    {
      "km": 39,
      "left_lane": 2,
      "right_lane": 19
    },
    {
      "km": 40,
      "left_lane": 2,
      "right_lane": 16
    },
    {
      "km": 41,
      "left_lane": 18,
      "right_lane": 3
    },
    {
      "km": 42,
      "left_lane": 13,
      "right_lane": 2
    },
    {
      "km": 43,
      "left_lane": 8,
      "right_lane": 14
    },
    {
      "km": 44,
      "left_lane": 15,
      "right_lane": 4
    },
    {
      "km": 45,
      "left_lane": 10,
      "right_lane": 14
    },
    {
      "km": 46,
      "left_lane": 1,
      "right_lane": 15
    },
    {
      "km": 47,
      "left_lane": 12,
      "right_lane": 0
    },
    {
      "km": 48,
      "left_lane": 4,
      "right_lane": 0
    },
    {
      "km": 49,
      "left_lane": 20,
      "right_lane": 14
    },
    {
      "km": 50,
      "left_lane": 14,
      "right_lane": 6
    },
    {
      "km": 51,
      "left_lane": 4,
      "right_lane": 2
    },
    {
      "km": 52,
      "left_lane": 16,
      "right_lane": 13
    },
    {
      "km": 53,
      "left_lane": 20,
      "right_lane": 8
    },
    {
      "km": 54,
      "left_lane": 11,
      "right_lane": 20
    },
    {
      "km": 55,
      "left_lane": 10,
      "right_lane": 13
    },
    {
      "km": 56,
      "left_lane": 8,
      "right_lane": 9
    },
    {
      "km": 57,
      "left_lane": 17,
      "right_lane": 8
    },
    {
      "km": 58,
      "left_lane": 4,
      "right_lane": 6
    },
    {
      "km": 59,
      "left_lane": 0,
      "right_lane": 7
    },
    {
      "km": 60,
      "left_lane": 1,
      "right_lane": 11
    },
    {
      "km": 61,
      "left_lane": 5,
      "right_lane": 2
    },
    {
      "km": 62,
      "left_lane": 10,
      "right_lane": 12
    },
    {
      "km": 63,
      "left_lane": 12,
      "right_lane": 18
    },
    {
      "km": 64,
      "left_lane": 8,
      "right_lane": 16
    },
    {
      "km": 65,
      "left_lane": 17,
      "right_lane": 7
    },
    {
      "km": 66,
      "left_lane": 17,
      "right_lane": 0
    },
    {
      "km": 67,
      "left_lane": 19,
      "right_lane": 12
    },
    {
      "km": 68,
      "left_lane": 0,
      "right_lane": 17
    },
    {
      "km": 69,
      "left_lane": 6,
      "right_lane": 3
    },
    {
      "km": 70,
      "left_lane": 1,
      "right_lane": 10
    },
    {
      "km": 71,
      "left_lane": 2,
      "right_lane": 12
    },
    {
      "km": 72,
      "left_lane": 3,
      "right_lane": 7
    },
    {
      "km": 73,
      "left_lane": 15,
      "right_lane": 13
    },
    {
      "km": 74,
      "left_lane": 10,
      "right_lane": 6
    },
    {
      "km": 75,
      "left_lane": 18,
      "right_lane": 12
    },
    {
      "km": 76,
      "left_lane": 4,
      "right_lane": 6
    },
    {
      "km": 77,
      "left_lane": 12,
      "right_lane": 0
    },
    {
      "km": 78,
      "left_lane": 10,
      "right_lane": 12
    },
    {
      "km": 79,
      "left_lane": 9,
      "right_lane": 7
    },
    {
      "km": 80,
      "left_lane": 12,
      "right_lane": 14
    },
    {
      "km": 81,
      "left_lane": 3,
      "right_lane": 18
    },
    {
      "km": 82,
      "left_lane": 13,
      "right_lane": 9
    },
    {
      "km": 83,
      "left_lane": 7,
      "right_lane": 6
    },
    {
      "km": 84,
      "left_lane": 3,
      "right_lane": 5
    },
    {
      "km": 85,
      "left_lane": 3,
      "right_lane": 9
    },
    {
      "km": 86,
      "left_lane": 18,
      "right_lane": 20
    },
    {
      "km": 87,
      "left_lane": 12,
      "right_lane": 15
    },
    {
      "km": 88,
      "left_lane": 0,
      "right_lane": 17
    },
    {
      "km": 89,
      "left_lane": 2,
      "right_lane": 5
    },
    {
      "km": 90,
      "left_lane": 13,
      "right_lane": 1
    },
    {
      "km": 91,
      "left_lane": 1,
      "right_lane": 7
    },
    {
      "km": 92,
      "left_lane": 8,
      "right_lane": 8
    },
    {
      "km": 93,
      "left_lane": 2,
      "right_lane": 14
    },
    {
      "km": 94,
      "left_lane": 14,
      "right_lane": 5
    },
    {
      "km": 95,
      "left_lane": 16,
      "right_lane": 4
    },
    {
      "km": 96,
      "left_lane": 19,
      "right_lane": 0
    },
    {
      "km": 97,
      "left_lane": 10,
      "right_lane": 5
    },
    {
      "km": 98,
      "left_lane": 15,
      "right_lane": 16
    },
    {
      "km": 99,
      "left_lane": 20,
      "right_lane": 18
    },
    {
      "km": 100,
      "left_lane": 16,
      "right_lane": 9
    },
    {
      "km": 101,
      "left_lane": 16,
      "right_lane": 6
    },
    {
      "km": 102,
      "left_lane": 1,
      "right_lane": 10
    },
    {
      "km": 103,
      "left_lane": 20,
      "right_lane": 16
    },
    {
      "km": 104,
      "left_lane": 10,
      "right_lane": 20
    },
    {
      "km": 105,
      "left_lane": 12,
      "right_lane": 16
    },
    {
      "km": 106,
      "left_lane": 17,
      "right_lane": 7
    },
    {
      "km": 107,
      "left_lane": 15,
      "right_lane": 5
    },
    {
      "km": 108,
      "left_lane": 4,
      "right_lane": 16
    },
    {
      "km": 109,
      "left_lane": 7,
      "right_lane": 20
    }
  ];
  circleGroup;
  pie: any;
  linePointsGroup: any;
  donutArcsGroup: any;
  arc: d3.Arc<any, d3.DefaultArcObject>;
  constructor(
  ) {
    console.log("spider view constructor")
  }

  ngAfterViewInit() {
    console.log("spider view ngAfter")
    let mapElement = this.mapTree.nativeElement;
    let rawSvg = this.spiderView.nativeElement;
    let svg: any = d3.select(rawSvg);
    this.spiderViewCreation(mapElement, svg, this.dataList, this);
  }

  spiderViewCreation(element, svgGroup, data, ref) {
    console.log("spider view ")
    const clientWidth = element.offsetWidth;
    const clientHeight = element.offsetHeight;
    let screenWidth = clientWidth > 0 ? clientWidth : 500;
    let screenHeight = clientHeight > 0 ? clientHeight : 500;


    let translateX = ((screenWidth / 2));
    let translateY = (screenHeight / 2);

    var canvas = svgGroup
      .append("g")
      .attr('class', 'wrapper')
      .attr('transform', 'translate(' + translateX + ',' + translateY + ')')

    let circle = canvas
      .append("circle")
      .attr("r", 4.5 * screenHeight / 10)
      .style("opacity", 0.7)
      .attr('class', 'circle-main')
      .style("fill", "white")
      .on("mouseout", this.handleMouseOut);
    let test = canvas.append('g')
      .attr('class', 'spider-wrapper')
      .attr('transform', 'translate(-100,0)');

    // let svgwrapper = d3.select('.wrapper');
    // let spiderWrapperCircle = d3.select('.wrapper , .wrapper *');
    // console.log(svgwrapper);
    // console.log(spiderWrapperCircle)
    // let outerthis = this;
    // d3.select("body").on("click",function(){
    //   let outside = spiderWrapperCircle.filter(outerthis.equalToEventTarget).empty();
    //   console.log(outside);
    // });
    // this.map.on("click", e => {
    //   console.log("sadadgahjkdgs")
    //   d3.select("svg").remove();
    //   // }
    //   // this.circle.;
    //   });
    let tree = d3.tree().nodeSize([screenHeight / 10, 100]);
    const treeRoot = hierarchy(data);
    tree(treeRoot);
    const nodes = treeRoot.descendants();
    const links = treeRoot.links();
    let diagonal = function link(d, i) {
      let total = d.source.data.children.length;
      if (total % 2 == 0) {
        if (i < total / 2) {
          return "M " + (d.source.x - 20) + "," + d.target.x / (screenHeight / 29.3) + ", L " + (d.target.y + d.target.x / 6) / (screenHeight / 176) + "," + d.target.x / (screenHeight / 29.3) + ", L " + d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total + ", L " + 2 * d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total;
        } else if (i > Math.floor(total / 2)) {
          return "M " + (d.source.x - 20) + "," + d.target.x / (screenHeight / 29.3) + ", L " + (d.target.y - d.target.x / 6) / (screenHeight / 176) + "," + d.target.x / (screenHeight / 29.3) + ", L " + d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total + ", L " + 2 * d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total;
        }
      } else {
        if (i < Math.floor(total / 2)) {
          return "M " + (d.source.x - 20) + "," + d.target.x / (screenHeight / 29.3) + ", L " + (d.target.y + d.target.x / 6) / (screenHeight / 176) + "," + d.target.x / (screenHeight / 29.3) + ", L " + d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total + ", L " + 2 * d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total;
        } else if (i == Math.floor(total / 2)) {
          return "M " + (d.source.x - 20) + "," + d.target.x / (screenHeight / 29.3) + ", L " + 2 * d.target.y + "," + d.target.x;
        } else if (i > Math.floor(total / 2)) {
          return "M " + (d.source.x - 20) + "," + d.target.x / (screenHeight / 29.3) + ", L " + (d.target.y - d.target.x / 6) / (screenHeight / 176) + "," + d.target.x / (screenHeight / 29.3) + ", L " + d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total + ", L " + 2 * d.target.y + "," + ((d.target.x * screenHeight) / 75.4) / total;
        }
      }
    }


    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 80,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

    // let a1 = test.selectAll(".link")
    //   .data(links)
    //   .enter()
    //   .append('g')
    //   .attr('class', 'link');

    // a1.append('path')
    //   .style('stroke-width', 1.5)
    //   .style('stroke', (d, i) => {
    //     if (d.source.data.children[i].disabled) return '#b3b3b3';
    //     return d.source.data.children[i].color;
    //   })
    //   .attr('fill', 'none')
    //   .attr("d", diagonal);

    var node = test.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr('transform', function (d) {
        return "translate(" + d['y'] + "," + d['x'] + ")";
      })

    node.append("circle")
      // .attr("stroke", "#000")
      .attr("stroke-opacity", 0.5)
      .attr('r', (d, i) => {
        console.log(d,"d");
        console.log(i,"i");
        
        if (i == 0) {
          return screenHeight / 18;
        } else {
          return screenHeight / 25;
        }
      })
      // .attr('fill', (d) => {
      //   if (d.data.disabled) return '#b3b3b3';
      //   return d.data.color;
      // })
      // .attr('cx', (d, i) => {
      //   if (i == 0) {
      //     return -screenHeight / 14;
      //   } else {
      //     return screenHeight / 4.8;
      //   }
      // })
      // .attr('cy', (d, i) => {
      //   if (i > 0) {
      //     let total = d['parent'].children.length;
      //     return -(((500 * d.x) / (screenHeight * total)));
      //   }
      // });


    node.append("text")
      .attr('x', (d, i) => {
        if (i == 0) {
          return d.y - 50;
        } else {
          return d.y + 25;
        }
      })
      .attr('y', (d, i) => {
        if (i == 0) {
          return 0;
        } else {
          return -d.x / 12;
        }
      })
      .text(function (d) {
        console.log(d)
        return d.data.fontvalue;
      });
    // node.append("text")
    //   .style('text-anchor', 'start')
    //   .style('dominant-baseline', 'middle')
    //   .style('font-family', '"Lato Medium", sans-serif')
    //   .style('fill', (d, i) => {
    //     if (i == 0) {
    //       return 'grey';
    //     } else {
    //       return '#000000';
    //     }
    //   })
    //   .style('font-size', '14px')
    //   .attr('class', 'donutText')
    //   .attr('x', (d, i) => {
    //     if (i == 0) {
    //       return d.y - 70;
    //     } else {
    //       return d.y + 70;
    //     }
    //   })
    //   .attr('y', (d, i) => {
    //     if (i == 0) {
    //       return screenHeight / 10;
    //     } else {
    //       return -d.x / 12;
    //     }
    //   })
    //   .style('font-weight', function (d) {
    //     if (d.data.font) {
    //       return "bold";
    //     }
    //   })
    //   .text((d) => {
    //     return d.data.name;
    //   });


    // node.append("text")
    //   .style('text-anchor', 'start')
    //   .style('dominant-baseline', 'middle')
    //   .style('font-family', '"Lato Bold", Lato Medium')
    //   .style('fill', (d, i) => {
    //     if (i == 0) {
    //       return '#000000';
    //     }
    //   })
    //   .style('font-size', '15px')
    //   .attr('class', 'donutText')
    //   .attr('x', (d, i) => {
    //     if (i == 0) {
    //       return d.y - 130;
    //     }
    //   })
    //   .attr('y', (d, i) => {
    //     if (i == 0) {
    //       return screenHeight / 7;
    //     }
    //   })
    //   .style('font-weight', function (d) {
    //     if (d.data.font) {
    //       return "bold";
    //     }
    //   })
    //   .text((d) => {
    //     return d.data.description;
    //   });

    // svgGroup.on('click', function () {
    //   $(element).parent().remove();
    //   d3.event.stopPropagation();
    // });
    // var ignoreClickOnMeElement = document.getElementsByClassName('wrapper');
    let ignoreClickOnMeElement = document.querySelector('.wrapper');
    // document.addEventListener('click', function (event) {
    //   console.log(event.target);
    //   console.log(ignoreClickOnMeElement);
    //   // var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    //   let isClickInsideElement = $('.wrapper').has('circle');
    //   console.log(isClickInsideElement);

    //   if (!isClickInsideElement) {
    //     alert("outside");
    //     //Do something click is outside specified element
    //   } else {
    //     alert("inside")
    //   }
    // });


















  }

  equalToEventTarget() {
    return this == d3.event.target;
  }
  handleMouseOut() {
    // alert("hello")
  }











}
