import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selected-layer-menu',
  templateUrl: './selected-layer-menu.component.html',
  styleUrls: ['./selected-layer-menu.component.scss']
})
export class SelectedLayerMenuComponent implements OnInit, OnDestroy {

  public listSelectedLayerArr: any = [];
  public dataShareSub: Subscription;
  onAddDropDown = new EventEmitter();
  constructor(private datashare: DataSharingService,) {
    this.dataShareSub = datashare.currentMessage.subscribe((val) => {
      console.log(val, "val>>>Selected");

      this.listSelectedLayerArr = val;
    });
  }

  ngOnInit(): void {
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
  }

  removeSelectedLayer(item) {
    console.log(item, "item");
    console.log(item.selected, "item.selected");
    console.log(this.listSelectedLayerArr, "this.listSelectedLayerArr");
    item.selected = !item.selected;
    console.log(item.selected, "item.selected After");
    for (let iter of this.listSelectedLayerArr) {
      console.log(iter,"iter");
      if (iter.selected == false) {
        this.listSelectedLayerArr.splice(this.listSelectedLayerArr.indexOf(iter),1);
        this.onAddDropDown.emit(this.listSelectedLayerArr);
        break;
      }
    }

    // this.dataShareSub = this.datashare.currentMessage.subscribe((val) => {
    //   console.log(val, "val>>>Selected>>>>");

    //   // this.listSelectedLayerArr = val;
    //   // for (let iter of this.listSelectedLayerArr) {
    //   //   console.log(iter,"iter");
    //   //   if (iter.selected == false) {
    //   //     this.listSelectedLayerArr.splice(this.listSelectedLayerArr.indexOf(iter),1);
    //   //     break;
    //   //   }
    //   // }
    // });

  }

}
