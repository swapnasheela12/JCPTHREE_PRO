import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {
  //////////breadcrums///////////////
  breadcrumbLinksList: string;
  urlPathPage: string;
  //////////breadcrums///////////////
  constructor(private location: Location, private router: Router) {
    // router.events.subscribe((url: any) => console.log(url));
    // console.log(router.url)
    // /////////////breadcrums////////////////////

    // this.urlPathPage = router.url;

    // this.breadcrumbLinksList = this.urlPathPage.split('/').join("<i class='fa fa-chevron-right pl-1 pr-1'></i>")
    // console.log(this.breadcrumbLinksList, "this.breadcrumbLinksList");

    // /////////////breadcrums////////////////////
  }

  ngOnInit() {
  }

}
