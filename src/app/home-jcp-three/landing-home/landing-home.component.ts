import { Component, OnInit,Optional } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from "angular-highcharts";
import { first } from 'rxjs/operators';
import { Options } from 'highcharts';
import * as _ from 'lodash';


@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sitesListArr = [
    {
    iconsite: "ic ic-Macro-Sites",
    namesite: "Macro Sites",
    countsite: "289137"
  },
    {
    iconsite: "ic ic-small-Cells",
    namesite: "Small Cells",
    countsite: "293456"
  },
    {
    iconsite: "ic ic-ESC",
    namesite: "ESC",
    countsite: "2345"
  },
    {
    iconsite: "ic ic-COW",
    namesite: "COW",
    countsite: "2345"
  },
    {
    iconsite: "ic ic-FTTX",
    namesite: "FTTX",
    countsite: "122345"
  },
    {
    iconsite: "ic ic-Wifi",
    namesite: "WI-FI APS",
    countsite: "271420"
  },
];


chart1 = new Chart({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: "transparent",
    // spacingTop: 30,
    height: 250
  },
  title: {
    text: null
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  legend: {
    // labelFormatter: function () {
    //   return '<div style="min-width:165px;" class="row m-0 justify-content-start align-items-center"><div class="legend-title col p-0">' + this.name + '</div>'
    //     + '<div class="legend-value">' + this.y + '%</div></div>';
    // },
    itemStyle: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "14px"
    },
    useHTML: true,
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical',
    itemMarginTop: 9,
    itemMarginBottom: 9,
    symbolHeight: 18,
    symbolWidth: 18,
    symbolRadius: 0,
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      borderWidth: 0,
      dataLabels: {
        enabled: false,
        distance: -50,
        style: {
          fontWeight: "bold",
          color: "white"
        }
      },
      startAngle: -180,
      endAngle: 180,
      center: ["50%", "50%"],
      size: "100%",
      showInLegend: true
    }
  },
  series: [
    {
      type: "pie",
      name: "Browser share",
      innerSize: "70%",
      data: [
        {
          name: "Jio Security",
          color: "#f7931e",
          y: 30
        },
        {
          name: "Jio Manhole Safety",
          color: "#29abe2",
          y: 31
        },
        {
          name: "Jio Smart Meter",
          color: "#39b54a",
          y: 20
        },
        {
          name: "Jio Smart Parking",
          color: "#ed1e79",
          y: 12
        },
        {
          name: "Jio Integrated Energy",
          color: "#7f89e6",
          y: 7
        }
      ]
    }
  ]
});





}
