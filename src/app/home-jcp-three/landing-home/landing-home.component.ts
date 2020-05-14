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

  sitesListArr = [{
    icon: "",
    name: "",
    countsite: ""
  }];


}
