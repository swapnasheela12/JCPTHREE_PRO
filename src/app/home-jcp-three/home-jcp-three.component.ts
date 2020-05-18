
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
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
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'translate3d(0,12px,0) rotate(-50deg)', 
        transformOrigin: 'left'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'translate3d(12px,0,0) rotate(-130deg)',
        transformOrigin: 'left'
      })),
      transition('* => *', [
        animate('0.3s')
      ]),
    ]),
  ]
  // animations: [
  //   trigger('transitionIcon',[
  //     state(
  //       'default',
  //       style({ transform: 'rotate(0)'})
  //     ),
  //     state(
  //       'rotated',
  //       style({ transform: 'rotate(-90deg)'})
  //     ),
  //     transition(
  //       'rotated => default',
  //       animate('1000ms 0.5s ease-out')
  //     ),
  //     transition(
  //       'default => rotated',
  //       animate('1000ms 0.5s ease-in')
  //     )
  //   ])
  // ]
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  toggleActive = true;
  state: string = 'default';
  isHamburguer = true;

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
