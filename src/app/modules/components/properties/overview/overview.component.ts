import { Component, OnInit, ViewChild } from '@angular/core';
// import { CarouselComponent } from 'ngx-bootstrap';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  // @ViewChild(CarouselComponent) myCarousel: CarouselComponent;
  products = [
    { source: "../../assets/images/factory.jpg" },
    // { source: "../../assets/images/factory1.jpg" },
    // { source: "../../assets/images/factory2.jpg" }
  ]
  sitesimages = [{
    // imageurl: "assets/images/layers/sector-property/2.png"
    imageurl: "assets/images/Layers/sites-expand/sitesexpand2.jpg"
  }, {
    // imageurl: "assets/images/layers/sector-property/3.png"
    imageurl: "assets/images/Layers/sites-expand/sitesexpand3.jpg"
  }, {
    // imageurl: "assets/images/layers/sector-property/4.png"
    imageurl: "assets/images/Layers/sites-expand/sitesexpand4.jpg"
  }, {
    // imageurl: "assets/images/layers/sector-property/4.png"
    imageurl: "assets/images/Layers/sites-expand/sitesexpand6.jpg"
  },
  {
    // imageurl: "assets/images/layers/sector-property/4.png"
    imageurl: "assets/images/Layers/sites-expand/sitesexpand7.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand8.jpg"
  }
  ];
  slides = [[]]
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

  multiList = ['https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/6.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/7.jpg',
    'https://valor-software.com/ngx-bootstrap/assets/images/nature/8.jpg',
  ];
  constructor() { }

  // ngOnInit(): void {
  //   this.slides = this.chunk(this.signals, 3);
  // }
  // chunk(arr, chunkSize) {
  //   let R = [];
  //   for (let i = 0, len = arr.length; i < len; i += chunkSize) {
  //     R.push(arr.slice(i, i + chunkSize));
  //   }
  //   return R;
  // }

  ngOnInit() {

  }
  loopcomplete: boolean = false;
  itemsPerSlide = 2;
  singleSlideOffset = true;
  noWrap = true;
  activeRange = 0;
  gotRangeChange() {
    if (!this.loopcomplete) {

      if (this.activeRange + 2 < this.multiList.length) {
        this.activeRange = this.activeRange + 2;
        // this.imagesArray = this.imagesArray.concat(this.masterArray[this.activeRange]);
        // this.imagesArray = this.imagesArray.concat(this.masterArray[this.activeRange + 1]);
      } else {
        this.loopcomplete = true;
      }
    }

  }

}
