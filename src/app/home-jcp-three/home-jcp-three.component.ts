
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';
import * as moment from 'moment';
declare var $: any;

interface DataObject {
  [key: string]: any;
}


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
  public expanded: boolean;
  public toggleActive:boolean = true;
  public state: string = 'default';
  public isHamburguer:boolean = true;
  public displayHomeHeader:boolean = false;
  public route: string;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;


  public initialEnter:any = '';
  public currentPage:string = '';
  public timeSpentOnPages:DataObject = [];
  public moment:DataObject = moment;
  public pageUrlVar:string;
  public timeSpendVar:number;

  constructor(private router: Router, private location: Location, private sidenavService: SideNavService, private datashare: DataSharingService) {
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
        if (this.route == "/JCP/Layers") {
          this.displayHomeHeader = true;
          $("#headerIdHome").removeClass("jcp-toolbar-main-container");
          $("#headerIdHome").addClass("jcp-toolbar-main-container-layers");
          $("#header-container-id").removeClass("header-jcp-container");
          $("#header-container-id").addClass("header-jcp-container-layers");
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


    this.router.events.subscribe((event: any) => {
      if (!this.currentPage) {
        this.currentPage = event.url;
        this.initialEnter = Date.now();
      }
      if (this.currentPage !== event.url) {
        const timeSpent = Date.now() - this.initialEnter;
        const timeLeave = Date.now();
        const timeEnter = this.initialEnter;
        const pageInfo = {
          pageUrl: this.currentPage,
          timeEnter,
          timeSpent,
          timeLeave
        }
        this.timeSpentOnPages.push(pageInfo);
        this.initialEnter = Date.now();
        this.currentPage = event.url;
      }
    })
  }


  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    if(this.toggleActive == false){
      window.dispatchEvent(new Event('resize'));
    }
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
  }
}

