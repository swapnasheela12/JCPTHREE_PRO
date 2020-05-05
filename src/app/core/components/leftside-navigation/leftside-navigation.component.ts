import { Component, OnInit, ɵConsole, AfterViewChecked } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { Router, RouterModule } from '@angular/router';
import { HomeJcpThreeComponent } from 'src/app/home-jcp-three/home-jcp-three.component';

declare var $: any;

export interface SideNavNode  {
  name: string;
  link: string;
  icon: string;
  children?: SideNavNode[];
}

@Component({
  selector: 'app-leftside-navigation',
  templateUrl: './leftside-navigation.component.html',
  styleUrls: ['./leftside-navigation.component.scss']
})
export class LeftsideNavigationComponent implements AfterViewChecked {
  public menuListAll: SideNavNode[] = LEFTSIDE_MENU_LIST;
  routeArray = [];
  
  constructor(
    private router: Router
  ) {}

  ngAfterViewChecked() {
    // let data = this.menuRoutes(this.menuListAll);
    // this.router.resetConfig(data);
  }

  menuRoutes(routesArray) {
    if (routesArray.length > 0) {
      for (let i=0; i < routesArray.length; i++) {
        this.routeArray.push(
          {
            path: routesArray[i].link,
            component: routesArray[i].component
          }
        );
        if (routesArray[i].children.length > 0) {
          this.menuRoutes(routesArray[i].children);
        }
      }
    }
    return this.routeArray;
  }
}
