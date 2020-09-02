import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-layer-menu',
  templateUrl: './selected-layer-menu.component.html',
  styleUrls: ['./selected-layer-menu.component.scss']
})
export class SelectedLayerMenuComponent implements OnInit {

  listSelectedLayerArr: any = [];

  constructor(private datashare: DataSharingService,) {
    datashare.currentMessage.subscribe((val) => {
      console.log(val, "DDDDDDD");

      this.listSelectedLayerArr = val;


    });
  }

  ngOnInit(): void {
  }

}
