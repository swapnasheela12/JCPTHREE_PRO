import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backhaul-violators',
  templateUrl: './backhaul-violators.component.html',
  styleUrls: ['./backhaul-violators.component.scss']
})
export class BackhaulViolatorsComponent implements OnInit {

  listBackhaulViolators=[
    {
      icon:"ic ic-Active-Users",
      trend:"+35.50%",
      trendStatus:"up",
      trendColor:"#30D436",
      count:"2700",
      desc:"Outage",
    },
    {
      icon:"ic ic-Active-Users",
      trend:"+35.50%",
      trendStatus:"down",
      trendColor:"#F32323",
      count:"2800",
      desc:"Outage",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
