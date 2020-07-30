import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cia-module',
  templateUrl: './cia-module.component.html',
  styleUrls: ['./cia-module.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CiaModuleComponent implements OnInit {
  frequencyGroup = "Per Day";
  public frequencyList: any[] = [
    { 'name': 'Custom' },
    { 'name': 'JC Circle Level' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
