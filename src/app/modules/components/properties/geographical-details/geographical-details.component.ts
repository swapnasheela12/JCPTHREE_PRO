import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-geographical-details',
  templateUrl: './geographical-details.component.html',
  styleUrls: ['./geographical-details.component.scss']
})
export class GeographicalDetailsComponent implements OnChanges {
  zone = [
    {
      label: "Zone",
      value: "West"
    },
    {
      label: "R4G State",
      value: "Chhattisgarh"
    },
    {
      label: "Circle",
      value: "Madhya Pradesh"
    },
    {
      label: "State",
      value: "Chhattisgarh"
    },
    {
      label: "District Name",
      value: "Rajnandgaon"
    },
    {
      label: "District Code",
      value: "RJDG"
    }
  ];
  jc = [
    {
      label: "JC Name",
      value: "CG-RJDG-JC01-0213"
    },
    {
      label: "JC RJID",
      value: "MP-RJDG-JC0-001"
    },
    {
      label: "JC SAP ID",
      value: "I-MP-RJDG-JC0-0001"
    },
    {
      label: "JC Code",
      value: "JC01"
    },
    {
      label: "MP Name",
      value: "Durg Bhilainagar"
    },
    {
      label: "Mp Code",
      value: "INCGDGBG01"
    }
  ];
  city = [
    {
      label: "City Name",
      value: "Ambikapur"
    },
    {
      label: "City Code",
      value: "ABKP"
    },
    {
      label: "City Bank",
      value: "347"
    },
    {
      label: "Taluka Name",
      value: "Ambagarah"
    },
    {
      label: "Taluka Code",
      value: "ABGR"
    },
    {
      label: "Village Name",
      value: "Ambagarah Chowki"
    },
    {
      label: "Village Census",
      value: "220900008"
    },
    {
      label: "Mophology",
      value: "Urban"
    }
  ];
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;

  ngOnChanges() {
    if (this.selectedTab === "GEOGRAPHICAL DETAILS") {
      this.showTab = true;
    }
  }
}
