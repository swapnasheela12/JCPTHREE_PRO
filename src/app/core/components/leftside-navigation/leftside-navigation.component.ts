import { Component, OnInit, ElementRef, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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
export class LeftsideNavigationComponent implements OnInit {
  public menuListAll: SideNavNode[] = LEFTSIDE_MENU_LIST;
  isParentLevel = false;
  routeArray = [];
  treeControl = new NestedTreeControl<SideNavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SideNavNode>();
  level: any = 1;
  @ViewChild('recursiveListTmpl') recursiveListTmpl;

  @HostListener('click', ['$event']) onClick(btn) {
    if (typeof btn.target.children[0] != 'undefined') {
      if (btn.target.children[0].classList[1] == 'ic-layers-01') {
        this.router.navigate(['/JCP/Layers']);
      }
    } else if (btn.target.classList[1] != 'undefined')  {
      if (btn.target.classList[1] == 'ic-layers-01') {
        this.router.navigate(['/JCP/Layers']);
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource.data = LAYERS_DATA;
  }

  parentIconClick(mmenuDirective, level) {
    if (level == 0) {
      mmenuDirective.menu.API.closeAllPanels()
    }
  }
  
  hasChild = (_: number, node: SideNavNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     console.log(params);
    });
  }
}
