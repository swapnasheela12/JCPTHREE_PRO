import { Component, OnInit } from '@angular/core';
import { DataSharHttpService } from '../data-shar-http.service';

export class GroupLevel {
  level = 0;
  field = '';
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  woHeader = [
    {
      "label": "Category",
      "value": "Sector Misalignment"
    },
    {
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      "label": "Template",
      "value": "Sector Misalignment"
    },
    {
      "label": "Work Order Creation Date",
      "value": "24 Sep, 2019"
    }
  ];
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}