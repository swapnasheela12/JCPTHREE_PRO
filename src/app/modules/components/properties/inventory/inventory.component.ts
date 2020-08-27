import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnChanges {
  radioSelected: string = "lte";
  @ViewChild('active') public active;
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;
  constructor() { }


  ngOnChanges() {
    if (this.selectedTab === "INVENTORY") {
      this.showTab = true;
    }
  }
  ngOnInit(): void {
    console.log("active", this.active);
  }

  onChange(evt) {
    console.log("evt", evt);
    this.radioSelected = evt.value;
  }

}
