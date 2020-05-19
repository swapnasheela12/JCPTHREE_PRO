import { Component, AfterViewChecked, OnInit, ElementRef, Renderer2, ViewChildren } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import Mmenu from "mmenu-js/dist/core/oncanvas/mmenu.oncanvas";
import * as DOM from 'mmenu-js/dist/_modules/dom';

declare var $: any;

export interface SideNavNode  {
  name: string;
  link: string;
  icon: string;
  children?: SideNavNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const LAYERS_DATA = LEFTSIDE_MENU_LIST[1].children;

@Component({
  selector: 'app-leftside-navigation',
  templateUrl: './leftside-navigation.component.html',
  styleUrls: ['./leftside-navigation.component.scss']
})
export class LeftsideNavigationComponent implements AfterViewChecked, OnInit {
  public menuListAll: SideNavNode[] = LEFTSIDE_MENU_LIST;
  isParentLevel = false;
  routeArray = [];
  treeControl = new NestedTreeControl<SideNavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SideNavNode>();
  level: any;
  @ViewChildren('myname') input:ElementRef; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.dataSource.data = LAYERS_DATA;
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(route);
    //   }
    // });
    

  }

  parentIconClick() {
   
  }
  hasChild = (_: number, node: SideNavNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     console.log(params);
    });
  }
  highlightActiveNode(node: SideNavNode): void {
    console.log(node);
  }

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
