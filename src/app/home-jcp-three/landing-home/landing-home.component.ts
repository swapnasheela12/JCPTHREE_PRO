import { Component, OnInit } from '@angular/core';
// import * as Highcharts from 'highcharts';
// import { Chart } from "angular-highcharts";

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


}
