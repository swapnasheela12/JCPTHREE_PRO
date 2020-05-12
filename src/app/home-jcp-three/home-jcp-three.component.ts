
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import { Observable } from 'rxjs';


@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  sideNavIsOpen: boolean = true;
  

  constructor(private router: Router,private sideNavService: SideNavService, private datashare: DataSharingService) {
    router.events.subscribe((url: any) => console.log(url));
    // console.log(router.url)
  }
  
  ngOnInit() {}
  toggle() {
    this.expanded = !this.expanded;
  }
  changeIconIn(hamburgerIcon: HTMLElement) {
    hamburgerIcon.className = 'zmdi zmdi-close';
  }
  changeIconOut(hamburgerIcon: HTMLElement) {
    hamburgerIcon.className = 'ic ic-menu-01';
  }

}
