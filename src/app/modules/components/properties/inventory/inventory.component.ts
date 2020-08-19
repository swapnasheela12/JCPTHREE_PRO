import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  radioSelected: string = "lte";
  @ViewChild('active') public active;
  constructor() { }

  ngOnInit(): void {
    console.log("active", this.active);
  }

  onChange(evt) {
    console.log("evt", evt);
    this.radioSelected = evt.value;
  }

}
