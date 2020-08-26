import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
// import { CarouselComponent } from 'ngx-bootstrap';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnChanges {
  // @ViewChild(CarouselComponent) myCarousel: CarouselComponent;
  products = [
    { source: "../../assets/images/factory.jpg" },
    // { source: "../../assets/images/factory1.jpg" },
    // { source: "../../assets/images/factory2.jpg" }
  ]
  sitesimages = [{
    imageurl: "assets/images/Layers/sites-expand/sitesexpand2.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand3.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand4.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand6.jpg"
  },
  {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand7.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand8.jpg"
  }
  ];

  slides: any = [[]];
  signals = [
    {
      type: "Alpha",
      icon: true,
      date: "01 Sep, 2017",
      signalStrength: "20+ 10 MHz"
    },
    {
      type: "Beta",
      icon: true,
      date: "02 Sep, 2017",
      signalStrength: "20+ 10 MHz"
    },
    {
      type: "Gamma",
      icon: true,
      date: "03 Sep, 2017",
      signalStrength: "10 Hz"
    },
    {
      type: "Beta",
      icon: true,
      date: "02 Sep, 2017",
      signalStrength: "20+ 10 MHz"
    },
    {
      type: "Gamma",
      icon: true,
      date: "03 Sep, 2017",
      signalStrength: "10 Hz"
    }
  ];

  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'abc', field: 'abc' }
  ];


  statusDetails1 = [
    {
      key: "Status",
      value: "OnAir"
    },
    {
      key: "REF SAP ID",
      value: "I-MP-ABGR-ENB-9011"
    },
    {
      key: "Morphology",
      value: "Urban"
    },
    {
      key: "JCP Phase",
      value: "93K"
    },
    {
      key: "Site Category",
      value: "eNodeB"
    },
    {
      key: "Site Type",
      value: "Indoor"
    },
    {
      key: "NE ID",
      value: "INMPABGRABGRTW6002"
    },
    {
      key: "No of Cells",
      value: "9"
    }
  ];

  statusDetails2 = [
    {
      key: "Vendor",
      value: "Samsung"
    },
    {
      key: "Planned Latitude",
      value: "20.7758321"
    },
    {
      key: "Planned Longitude",
      value: "80.742771"
    },
    {
      key: "JCP Phase",
      value: "93K"
    },
    {
      key: "Planned Scope",
      value: "eNodeB-Connected_Fibre"
    },
    {
      key: "Planned Band",
      value: "2300, 1800, 850"
    },
    {
      key: "Candidate ID",
      value: "C1"
    },
    {
      key: "No of Carriers",
      value: "3"
    }
  ];


  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;

  slidesChangeMessage = '';
  // showTab: boolean = false;
  // @Input('selectedTab') public selectedTab;
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

  ngOnChanges() {
    // if (this.selectedTab === "OVERVIEW") {
    //   this.showTab = true;
    // }
  }

  ngOnInit(): void {
    this.slides = this.chunk(this.signals, 3);
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}