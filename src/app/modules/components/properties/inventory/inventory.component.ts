import { Component, ViewChild, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnChanges {
  radioSelected: string = "lte";
  @ViewChild('active') public active;
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;

  ngOnChanges() {
    if (this.selectedTab === "INVENTORY") {
      this.showTab = true;
    }
  }

  onChange(evt) {
    this.radioSelected = evt.value;
  }
}
