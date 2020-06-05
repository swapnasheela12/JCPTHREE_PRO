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
      nameCard: "Alarms Live (2/3)",
      vision: true,
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
      nameCard: "Performance KPI  (4/5)",
      vision: true,
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
      nameCard: "Planning: On- Air Site  (5/6)",
      vision: true,
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
      nameCard: "Backhaul Violators  (0/2)",
      vision: false,
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
      nameCard: "Customers  (2/5)",
      vision: false,
      itemsListAlarms: [
        { name: "Macro​", disabled: false },
        { name: "ESC", disabled: false },
        { name: "ISC", disabled: false },
        { name: "OSC", disabled: false },
        { name: "IBS/DAS", disabled: false },
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

  showHideCardFun(item) {
    console.log(item, "item");
    // if (item.vision == true) {
    //   item.vision = false;
    // }else{
    //   item.vision = true;
    // }
    item.vision = !item.vision;
  }

  openExpandPanelFun(e,item) {
    console.log(e, "e");
    console.log(item, "item");
    console.log(item.vision, "item");
    item.vision = !item.vision;
  }



  constructor(private renderer: Renderer2, private elemRef: ElementRef) { }



  ngOnInit(): void {
  }

}
