import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workorders',
  templateUrl: './workorders.component.html',
  styleUrls: ['./workorders.component.scss']
})
export class WorkordersComponent implements OnInit {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listBackhaulViolators, event.previousIndex, event.currentIndex);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
