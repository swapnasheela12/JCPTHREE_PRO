
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'translate3d(-5px,0,0) rotate(-45deg)',
        transformOrigin: 'right'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'translate3d(-5px,1px,0) rotate(45deg)',
        transformOrigin: 'right'
      })),
      transition('* => *', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  toggleActive = true;
  state: string = 'default';
  isHamburguer = true;
  displayHomeHeader = false;
  route: string;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  constructor(private router: Router, private location: Location, private sidenavService: SideNavService, private datashare: DataSharingService) {
    // router.events.subscribe((url: any) => console.log(url,"HOME Page"));

    router.events.subscribe(val => {
      // console.log(val,"val");
      console.log(router.url,"<<<<<<")
      // this.routeUrlLinkPage = router.url;
      if (location.path() != "") {
        this.route = location.path();
        if (this.route == "/JCP/Layers") {
          this.displayHomeHeader = true;
          $("#headerIdHome").removeClass("jcp-toolbar-main-container");
          $("#headerIdHome").addClass("jcp-toolbar-main-container-layers");
          $( "#header-container-id" ).removeClass( "header-jcp-container" );
          $( "#header-container-id" ).addClass( "header-jcp-container-layers" );
          $("#route-outlet-id").removeClass("px-3");
          $("#route-outlet-id").addClass("p-0 h-100").removeClass("active-jcp-page-route");
        } else {
          this.displayHomeHeader = false;
          $("#headerIdHome").addClass("jcp-toolbar-main-container");
          $("#headerIdHome").removeClass("jcp-toolbar-main-container-layers");
          $("#header-container-id").addClass("header-jcp-container");
          $("#header-container-id").removeClass("header-jcp-container-layers");
          $("#route-outlet-id").addClass("px-3");
          $("#route-outlet-id").removeClass("p-0 h-100").addClass("active-jcp-page-route");
        }
      } else {
        this.route = "Home";
      }
    });

  }

  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    this.datashare.changeMessage(this.toggleActive)
   
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
  toggle() {
    this.expanded = !this.expanded;
  }

  changeIcon() {
    this.isHamburguer = !this.isHamburguer;
    // this.state = (this.state === 'default' ? 'rotated' : 'default');
    // console.log( this.state);
    // if (this.state === 'default') {
    //   this.state = 'rotated';
    //   hamburgerIcon.className = 'zmdi zmdi-close';
    // } else {
    //   this.state = 'default';
    //     hamburgerIcon.className = 'ic ic-menu-01';
    // }
  }
  // tiles: Tile[] = [
  //   { text: "app/home-jcp-three/daily-traffic.html", cols: 8, rows: 2, color: "lightpink" },
  //   { text: "three", cols: 4, rows: 3, color: "#DDBDF1" },
  //   { text: "two", cols: 8, rows: 2, color: "lightpink" },
  //   { text: "Four", cols: 4, rows: 1, color: "#DDBDF1" }
  // ];





}
