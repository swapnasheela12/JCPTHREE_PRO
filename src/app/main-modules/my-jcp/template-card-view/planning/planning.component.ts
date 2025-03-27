import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  sitesListArr = [
    {
      iconsite: "ic ic-Macro-Sites",
      namesite: "Macro Sites",
      trend: "+35.50%",
      trendStatus: "up",
      trendColor: "#30D436",
      countsite: "289137"
    },
    {
      iconsite: "ic ic-small-Cells",
      namesite: "Small Cells", 
      trend:"+35.50%",
      trendStatus:"down",
      trendColor:"#F32323",
      countsite: "293456"
    },
    {
      iconsite: "ic ic-ESC",
      namesite: "ESC", 
      trend: "+35.50%",
      trendStatus: "up",
      trendColor: "#30D436",
      countsite: "2345"
    },
    
    
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sitesListArr, event.previousIndex, event.currentIndex);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
