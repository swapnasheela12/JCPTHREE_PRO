
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';


@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeJcpThreeComponent implements OnInit {
  expanded: boolean;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  @Input() sideNavName: HomeJcpThreeComponent;
  // opened: any = true;

  constructor(private router: Router,private sideNavService: SideNavService, private datashare: DataSharingService) {
    router.events.subscribe((url: any) => console.log(url));
    // console.log(router.url)
  }
  // toggleActive = false;
  sharingData: object;
  ngOnInit() {
    console.log(this.sidenav,"this.sidenav");
    this.datashare.changeMessage(this.sidenav.opened)
    this.datashare.currentMessage.subscribe(message => this.sharingData = message);
   console.log(this.datashare,"this.datashareNNNNNN");
   
    // console.log(this.sidenav.opened,"this.sidenav.opened");
    // console.log(this.sideNavService,"this.sideNavService");
    // this.sideNavService.setDrawer(this.sidenav);
    // console.log(this.sidenav._opened,"this.sidenav");
    this.sideNavService.sideNavToggleSubject.subscribe((val)=> {
      console.log(val,"val___________");
      
      // this.toggleActive = !this.toggleActive;
      // console.log(this.toggleActive,"this.toggleActive");
     
      console.log(this.sidenav.opened,"RRRRRRRR");
      
        this.sidenav.toggle();
    });
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

}
