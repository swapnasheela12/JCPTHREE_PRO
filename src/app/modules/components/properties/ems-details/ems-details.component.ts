import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ems-details',
  templateUrl: './ems-details.component.html',
  styleUrls: ['./ems-details.component.scss']
})
export class EmsDetailsComponent implements OnInit, OnChanges {
  // emsDetails = [
  //   {
  //     label: "",
  //     value: ""
  //   },
  //   {
  //     label: "",
  //     value: ""
  //   },
  //   {
  //     label: "",
  //     value: ""
  //   },
  //   {
  //     label: "",
  //     value: ""
  //   },
  //   {
  //     label: "",
  //     value: ""
  //   },
  //   {
  //     label: "",
  //     value: ""
  //   }
  // ];

  emsDetails;
  ems;
  oam;
  signalling;
  bearer;
  url: string = "assets/data/modules/properties/ems-details.json";
  showTab: boolean = false;
  @Input('selectedTab') public selectedTab;
  constructor(private httpClient: HttpClient) {
  }
  ngOnChanges() {
    if (this.selectedTab === "EMS DETAILS") {
      this.showTab = true;
      this.getEMSDetails();
    }
  }


  getEMSDetails() {
    this.httpClient.get(this.url).subscribe((result: any) => {
      this.emsDetails = result;
      this.ems = result.ems;
      this.oam = result.oam;
      this.signalling = result.signalling;
      this.bearer = result.bearer;
    });
  }



  ngOnInit(): void {
  }

  setEmsDialog(evt) {
    if (evt.value) {
      this.getEMSDetails();
    }
  }

}
