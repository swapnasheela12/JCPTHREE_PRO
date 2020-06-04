import { Component, OnInit, ElementRef, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

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
  parentNode: any;
  hoverLayer0: any = '';
  level: any = 1;
  isChecked:any=false;

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

  private transformer = (node: SideNavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      link: node.link
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  isLevelZero = (_: number, node: ExampleFlatNode) => node.level === 0 && node.expandable;
  isLevelOne = (_: number, node: ExampleFlatNode) => node.level === 1 && node.expandable;
  isLevelGreterThanOne = (_: number, node: ExampleFlatNode) => node.level > 1 && node.expandable;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     console.log(params);
    });
  }

  layersLevelHover(node, iconlayers) {
    this.hoverLayer0 = '';
    this.hoverLayer0 = 'layers-menu-0';
    const levelNode = this.treeControl.getLevel(node);
    if (iconlayers != '') {
      if (levelNode < 2 ) {
        iconlayers._elementRef.nativeElement.style.marginLeft = '20px';
      } else {
        iconlayers._elementRef.nativeElement.style.marginLeft = -(levelNode*16)+'px';
      }
    }
  }

  layersLevelHoverLeave(node, iconlayers) {
    const levelNode = this.treeControl.getLevel(node);
    if (iconlayers != '') {
      const treeNode = iconlayers._elementRef.nativeElement.parentNode.parentNode.parentNode.classList;
      if (treeNode.contains('layer-0')) {
          iconlayers._elementRef.nativeElement.style.marginLeft= '0px';
      } else if (treeNode.contains('active-layer')) {
        iconlayers._elementRef.nativeElement.style.marginLeft= '20px';
      } else {
        if (levelNode === 1) {
          iconlayers._elementRef.nativeElement.style.marginLeft= '0px';
        } else {
          iconlayers._elementRef.nativeElement.style.marginLeft=-(levelNode*24)+'px';
        }
      }
    }
  }

  activenode(node, iconlayers) {
    if (this.treeControl.isExpanded(node) == true) {
      const levelNode = this.treeControl.getLevel(node);

      this.parentNode = node;
      this.treeControl.collapseAll();
      if (levelNode == 0){
          this.treeControl.expand(this.treeControl.dataNodes[this.treeControl.dataNodes.indexOf(node)]);
      } else {
        for (let i=0; i<=levelNode; i++) {
          if (this.parentNode != null) {
            this.treeControl.expand(this.treeControl.dataNodes[this.treeControl.dataNodes.indexOf(this.parentNode)]);
            this.parentNode = this.getParent(this.parentNode);
          }
        }
      }
    }
  }

  todoItemSelectionToggle(checked, node, activeCheckbox) {
    node.selected = checked;
    this.router.navigate([node.link]);
  }
  onCheckBoxClick(link) {
  //   console.log(link);
  //   this.isChecked = true;
  }

  /**
   * Iterate over each node in reverse order and return the first node that has a lower level than the passed node.
   */
  getParent(node) {
    const { treeControl } = this;
    const currentLevel = treeControl.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];
      if (treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }
}
