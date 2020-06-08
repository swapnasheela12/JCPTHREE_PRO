import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-myjcpdropdownpanel',
  templateUrl: './myjcpdropdownpanel.component.html',
  styleUrls: ['./myjcpdropdownpanel.component.scss']
})
export class MyjcpdropdownpanelComponent implements OnInit {

  panelOpenState = false;

  cardListMyJcpSettings = [
    {
      id: 0,
      nameCard: "Alarms Live",
      vision: true,
      countNode: 6,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "ESC", disabled: false },
        { name: "ISC", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 1,
      nameCard: "Performance KPI",
      vision: true,
      countNode: 4,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 2,
      nameCard: "Planning: On- Air Site",
      vision: true,
      countNode: 6,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "ESC", disabled: false },
        { name: "ISC", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 3,
      nameCard: "Backhaul Violators",
      vision: false,
      countNode: 1,
      itemsListAlarms: [
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    },
    {
      id: 4,
      nameCard: "Customers",
      vision: false,
      countNode: 3,
      itemsListAlarms: [
        { name: "Macro​", disabled: true },
        { name: "ISC", disabled: true },
        { name: "Wi- Fi AP’s​", disabled: true }
      ]
    }
  ]


  // closeExpandView(val) {
  //   console.log(val.vision, "val.vision");

  // }

  // openExpandView(valtex) {
  //   console.log(valtex, "valtex");
  //   if (valtex.vision) {
  //     valtex.vision = false
  //   }

  // }

  // showHideCardFun(item) {
  //   console.log(item, "item");
  //   // if (item.vision == true) {
  //   //   item.vision = false;
  //   // }else{
  //   //   item.vision = true;
  //   // }
  //   item.vision = !item.vision;
  // }

  cardListNumber(index, item) {
    // console.log(item, "item");

    // console.log(index, "index");

    return item.nameCard;
  }

  contentClass = false;
  nodeEnableDisable(item, val, idx, index) {
    console.log(item, "item");
    console.log(val, "val");
    console.log(idx, "idx");
    console.log(index, "index");
    item.disabled = !item.disabled;
    console.log(item.disabled, "item.disabled");

    //  

    if (val.id == idx) {
      console.log("currect id");

      
      // val.itemsListAlarms.forEach(element => {
      //   console.log(element,"element");
      //    if (item.disabled == true) {
      //   console.log("yeye");
      //   this.contentClass = true;
      //   $("#mat-expansion-panel-header-"+idx).removeClass("bgAndColor-My-jcp-Add");
      //   $("#mat-expansion-panel-header-"+idx).addClass("bgAndColor-My-jcp-Remove");
      //   $("#cdk-accordion-child-"+idx).removeClass("bgAndColor-My-jcp-Add");
      //   $("#cdk-accordion-child-"+idx).addClass("bgAndColor-My-jcp-Remove");
      // } 
      // else {
      //   console.log("no");
      //   this.contentClass = false;
      //   $("#mat-expansion-panel-header-"+idx).addClass("bgAndColor-My-jcp-Add");
      //   $("#mat-expansion-panel-header-"+idx).removeClass("bgAndColor-My-jcp-Remove");
      //   $("#cdk-accordion-child-"+idx).addClass("bgAndColor-My-jcp-Add");
      //   $("#cdk-accordion-child-"+idx).removeClass("bgAndColor-My-jcp-Remove");
      // }
      // });
      if (item.disabled == true) {
        console.log("yeye");
        this.contentClass = true;
        $("#mat-expansion-panel-header-" + idx).removeClass("bgAndColor-My-jcp-Add");
        $("#mat-expansion-panel-header-" + idx).addClass("bgAndColor-My-jcp-Remove");
        $("#cdk-accordion-child-" + idx).removeClass("bgAndColor-My-jcp-Add");
        $("#cdk-accordion-child-" + idx).addClass("bgAndColor-My-jcp-Remove");
      }
      else {
        console.log("no");
        this.contentClass = false;
        $("#mat-expansion-panel-header-" + idx).addClass("bgAndColor-My-jcp-Add");
        $("#mat-expansion-panel-header-" + idx).removeClass("bgAndColor-My-jcp-Remove");
        $("#cdk-accordion-child-" + idx).addClass("bgAndColor-My-jcp-Add");
        $("#cdk-accordion-child-" + idx).removeClass("bgAndColor-My-jcp-Remove");
      }
    }
  }

  constructor(private renderer: Renderer2, private elemRef: ElementRef) { }



  ngOnInit(): void {
  }

}
