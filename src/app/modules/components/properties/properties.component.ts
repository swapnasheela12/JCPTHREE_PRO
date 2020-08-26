import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataSharHttpService } from '../data-shar-http.service';
//declare const D3: any;
//import * as d3 from 'd3';
import * as D3 from 'd3/index';
import { Router } from '@angular/router';


export class GroupLevel {
  level = 0;
  field = '';
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  woHeader = [
    {
      "label": "Category",
      "value": "Sector Misalignment"
    },
    {
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      "label": "Template",
      "value": "Sector Misalignment"
    },
    {
      "label": "Work Order Creation Date",
      "value": "24 Sep, 2019"
    }
  ];
  showWifiTabs: boolean = false;
  showPropTabs: boolean = true;
  hideWifiIcon: boolean = true;
  showWifiWidget: boolean = false;
  selectedTab;
  @ViewChild('ngCircleMenu') ngCircleMenu;
  scope: any;
  constructor(private router: Router) {

  }
  ngOnInit() { }

  showWifiBand() {
    var width = 200;
    var height = 200;

    var svg = D3.select("#chart").append("svg");
    svg.attr("width", width)
      .attr("height", height);

    var dataset: any = [
      { name: '850 Mhz', value: 11 },
      { name: '1800 Mhz', value: 13 },
      { name: '2300 Mhz', value: 18 }
    ];

    var radius = width / 2;
    var innerRadius = 0;
    var arc: any = D3.arc()
      .innerRadius(30)
      .outerRadius(radius);

    // .innerRadius(width * 0.5 / 2)
    // .outerRadius(width * 0.75 / 2 + 30);

    var pie = D3.pie()
      .startAngle(90 * Math.PI / 180)
      .endAngle(270 * Math.PI / 180)
      .value(function (d) {
        return 15;
      })
      .padAngle(.05)
      .sort(null);

    var arcs = svg.selectAll("g.arc")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + radius + ", " + radius + ")");

    //Draw arc paths
    var color = D3.scaleOrdinal(['white', 'white', 'white'])
    arcs.append("path")
      // .attr("fill", (d, i: any) => { return color(i); })
      .attr("fill", function (d, i: any) {
        console.log(d);
        return color(i);
      })
      .attr("id", "arc")
      .attr("stroke", "lightgrey")
      .attr("d", arc)
      .on("click", (e, d) => {
        this.showWifiTabs = true;
        this.showPropTabs = false;
      })
    // .on("mousemove", function (d) {
    //   D3.select("#chart")
    //     .attr("stroke", "#fff")
    //     .attr("stroke-width", "2px")
    //     .style("filter", "url(#drop-shadow)");
    // })

    var newarc = D3.arc()
      .innerRadius(2 * radius / 3)
      .outerRadius(radius);

    // Place labels
    arcs.append("text")
      .attr("transform", (d: any) => {
        console.log("d", d);
        return "translate(" + newarc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .attr("fill", "blue")
      .attr('font-size', '4em')
      // .attr(" xlink:href", "#arc")
      .attr("xlink:href", (d, i) => {
        return "#arc" + i;
      })

      .text(function (d: any) {
        return d.data.name;
      });
  }

  tabChanged(evt) {
    // console.log("evt", evt);
    this.selectedTab = evt.tab.textLabel;
  }

  // showWifiBand(evt) {
  //   this.showWifiWidget = true
  // }
}