import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-selected-layer-menu',
  templateUrl: './selected-layer-menu.component.html',
  styleUrls: ['./selected-layer-menu.component.scss']
})
export class SelectedLayerMenuComponent implements OnInit,OnDestroy {

  public listSelectedLayerArr: any = [];
  public dataShareSub: Subscription;
  constructor(private datashare: DataSharingService,) {
    this.dataShareSub = datashare.currentMessage.subscribe((val) => {
      this.listSelectedLayerArr = val;
    });
  }

  ngOnInit(): void {
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
  }

}
