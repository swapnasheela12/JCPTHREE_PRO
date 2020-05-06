
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @Input()
  openNav: boolean;

  constructor(private router: Router) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)
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
