
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import { Observable } from 'rxjs';
// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
// }
@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  toggleActive = true;

  constructor(private router: Router, private sidenav: SideNavService, private datashare: DataSharingService) {
    router.events.subscribe((url: any) => console.log(url));
    // console.log(router.url)


  }

  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    this.datashare.changeMessage(this.toggleActive)
  }

  ngOnInit() {
  }
  toggle() {
    this.expanded = !this.expanded;
  }
  changeIconIn(hamburgerIcon: HTMLElement) {
    hamburgerIcon.className = 'zmdi zmdi-close';
  }
  changeIconOut(hamburgerIcon: HTMLElement) {
    hamburgerIcon.className = 'ic ic-menu-01';
  }

  // tiles: Tile[] = [
  //   { text: "app/home-jcp-three/daily-traffic.html", cols: 8, rows: 2, color: "lightpink" },
  //   { text: "three", cols: 4, rows: 3, color: "#DDBDF1" },
  //   { text: "two", cols: 8, rows: 2, color: "lightpink" },
  //   { text: "Four", cols: 4, rows: 1, color: "#DDBDF1" }
  // ];





}
