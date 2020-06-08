import { Component, OnInit, ViewChild, HostListener, Renderer2, ElementRef, ɵCurrencyIndex } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

declare var $: any;

export interface SideNavNode  {
  name: string;
  link: string;
  icon: string;
  classId? :String
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
      link: node.link,
      classId: node.classId,
      children: node.children
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
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
  getChildren = (node: SideNavNode) => {
    return node.children;
  };

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
      // if (levelNode >= 0 ) {
        iconlayers._elementRef.nativeElement.style.marginLeft = '20px';
      // } else {
        // iconlayers._elementRef.nativeElement.style.marginLeft = -(levelNode*16)+'px';
      // }
    }
  }

  layersLevelHoverLeave(node, iconlayers) {
    const levelNode = this.treeControl.getLevel(node);
    if (iconlayers != '') {
      const treeNode = iconlayers._elementRef.nativeElement.parentNode.parentNode.parentNode.classList;
      if (treeNode.contains('layer-0')) {
          iconlayers._elementRef.nativeElement.style.marginLeft= '0px';
      } else if (treeNode.contains('active-nested-layer')) {
        // if (levelNode >= 2 ) {
          iconlayers._elementRef.nativeElement.style.marginLeft= '0px';
        // }
      } else {
        // if (levelNode === 1) {
          iconlayers._elementRef.nativeElement.style.marginLeft= '0px';
        // } else {
          // iconlayers._elementRef.nativeElement.style.marginLeft=-(levelNode*24)+'px';
        // }
      }
    }
  }

  recNode(arr:any[], data:any[], index:number, maxIndex:number):any[]{
    if (arr === undefined)
      arr = [];
    for (let i = 0; i < data.length; i++){
          index++
          if (index ===  maxIndex){
            return ([true, index, arr]);
          }
          if (data[i].children.length) {
            let res = this.recNode(arr, data[i].children, index, maxIndex)
            index = res[1];
            if (res[0] === true)
            {
              arr.splice(0, 0, (i !== (data.length - 1)));
              return ([true, index, arr]);
            }
        }
    }
    return ([false, index, arr]);
  }

  activenode(node, horizontalLine) {
    const levelNode = this.treeControl.getLevel(node);
    const currentIndexNode = this.treeControl.dataNodes.indexOf(node);
    let test = this.treeControl.dataNodes[this.treeControl.getDescendants(node).length+currentIndexNode + 1];

    if (this.treeControl.isExpanded(node) == true) {
      if (typeof test != 'undefined') {
        if (test.name == 'Prediction Layers') {
          $('#prediction-layer-border').css({'border-top': '1px solid #eaecec'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        } else if (test.name == 'Measured Layers') {
          $('#measured-layer-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        } else if (test.name == 'Hybrid Layers') {
          $('#hybrid-layer-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        } else if (test.name == 'Alarms') {
          $('#alarms-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        } else if (test.name == 'Analytics') {
          $('#analytics-layer-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        }else if (test.name == 'Topologies') {
          $('#topologies-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        }else if (test.name == 'Locations and Boundaries') {
          $('#locations-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#base-map-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        }else if (test.name == 'Base Maps') {
          $('#base-map-border').css({'border-top': '1px solid #eaecec'});
          $('#prediction-layer-border').css({'border-top': 'none'});
          $('#measured-layer-border').css({'border-top': 'none'});
          $('#hybrid-layer-border').css({'border-top': 'none'});
          $('#alarms-border').css({'border-top': 'none'});
          $('#analytics-layer-border').css({'border-top': 'none'});
          $('#topologies-border').css({'border-top': 'none'});
          $('#locations-border').css({'border-top': 'none'});
          $('#my-layers-border').css({'border-top': 'none'});
        }
      }
      else if (currentIndexNode == 277) {
        $('#my-layers-border').css({'border-top': '1px solid #eaecec'});
        $('#prediction-layer-border').css({'border-top': 'none'});
        $('#measured-layer-border').css({'border-top': 'none'});
        $('#hybrid-layer-border').css({'border-top': 'none'});
        $('#alarms-border').css({'border-top': 'none'});
        $('#analytics-layer-border').css({'border-top': 'none'});
        $('#topologies-border').css({'border-top': 'none'});
        $('#locations-border').css({'border-top': 'none'});
        $('#base-map-border').css({'border-top': 'none'});
      }
    
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
    } else {
      if ( currentIndexNode != 7 && test.name == 'Prediction Layers') {
        $('#prediction-layer-border').css({'border-top': 'none'});
      } 
      else if (currentIndexNode != 38 && test.name == 'Measured Layers') {
        $('#measured-layer-border').css({'border-top': 'none'});
      } else if (currentIndexNode != 135 && test.name == 'Hybrid Layers') {
        $('#hybrid-layer-border').css({'border-top': 'none'});
      } else if (currentIndexNode != 192 && test.name == 'Alarms') {
        $('#alarms-border').css({'border-top': 'none'});
      } else if (test.name == 'Analytics') {
        $('#analytics-layer-border').css({'border-top': 'none'});
      }else if (test.name == 'Topologies') {
        $('#topologies-border').css({'border-top': 'none'});
      }else if (currentIndexNode != 261 && test.name == 'Locations and Boundaries') {
        $('#locations-border').css({'border-top': 'none'});
      }else if (test.name == 'Base Maps') {
        $('#base-map-border').css({'border-top': 'none'});
      }else if (test.name == 'My Layers') {
        $('#my-layers-border').css({'border-top': 'none'});
      }
      
    }
  }

  todoItemSelectionToggle(checked, node, activeCheckbox) {
    node.selected = checked;
    this.router.navigate([node.link]);
    if (node.selected == true) {
      this.renderer.addClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    } else {
      this.renderer.removeClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    }
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
