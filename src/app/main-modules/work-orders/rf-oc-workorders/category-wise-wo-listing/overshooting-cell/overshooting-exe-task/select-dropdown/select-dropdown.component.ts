import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";


interface SiteParameters {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  siteparameters: SiteParameters[] = [
    {value: 'Azimuth(Deg)', viewValue: 'Azimuth(Deg)'},
    {value: 'Antenna Height(meters)', viewValue: 'Antenna Height(meters)'},
    {value: 'M-tilt (Deg)', viewValue: 'M-tilt (Deg)'},
    {value: 'E-tilt (Deg)', viewValue: 'E-tilt (Deg)'}
  ];
  selectedSiteParameter = this.siteparameters[0].value;
  
}
