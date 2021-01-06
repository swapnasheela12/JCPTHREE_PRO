import { LogicalConnectivitySettingComponent } from './../../../main-modules/main-layer/layer-list/topologies/fibre/logicaltopology/logical-connectivity-setting/logical-connectivity-setting.component';
//\9
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, OnInit, ViewChild, HostListener, Renderer2, ViewEncapsulation, TemplateRef, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, Input } from '@angular/core';
import { LEFTSIDE_MENU_LIST } from './leftside-navigation-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { MatRadioButton } from '@angular/material/radio';

declare var $: any;

export class SideNavNode {
  name: string;
  link: string;
  icon?: string;
  eventName?: string;
  classId?: String;
  level?: number;
  parentToChild?: String;
  children?: SideNavNode[];
  component?: Component;
  componentLayer?: Component;
  disabled?: Boolean;
  show?: Boolean;
  show0?: Boolean;
}

class ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  show: Boolean;
}

const LAYERS_DATA = LEFTSIDE_MENU_LIST[1].children;

@Component({
  selector: 'app-leftside-navigation',
  templateUrl: './leftside-navigation.component.html',
  styleUrls: ['./leftside-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftsideNavigationComponent implements OnInit, AfterViewInit {
  public menuListAll: SideNavNode[] = LEFTSIDE_MENU_LIST;
  parentNode: ExampleFlatNode;
  nodeType = 'TEST';
  @ViewChild('activeCheckbox', { static: false }) activeCheckbox;
  // @Input() checked: Boolean;
  @ViewChild('female', { static: true }) femaleRB: MatRadioButton;
  frequencyGroup = "Streets Colored";
  hoverLayer0: String = '';
  dataChange = new BehaviorSubject<SideNavNode[]>([]);
  treeData: ExampleFlatNode[];
  get data(): SideNavNode[] { return this.dataChange.value; }

  dialog: NavigationSettingsService;
  /**Layers navigation functionality */
  @HostListener('click', ['$event']) onClick(btn) {
    $('.hide-menu-item-nav').parent().css({ 'display': 'none' });
    $('.disabled-menu-item-nav').parent().css({'color': 'gray','cursor': 'not-allowed','pointer-events': 'none'});
    if (typeof btn.target.children[0] != 'undefined') {
      if (btn.target.children[0].classList[1] == 'ic-layers-01') {
        this.router.navigate(['/JCP/Layers']);
      }
    } else if (btn.target.classList[1] != 'undefined') {
      if (btn.target.classList[1] == 'ic-layers-01') {
        this.router.navigate(['/JCP/Layers']);
      }
    }
    if (btn.target.innerText == "Layers") {
      this.router.navigate(['/JCP/Layers']);
    }
  }

  private transformer = (node: SideNavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      link: node.link,
      classId: node.classId,
      eventName: node.eventName,
      parentToChild: node.parentToChild,
      children: node.children,
      component: node.component,
      componentLayer: node.componentLayer,
      disabled: node.disabled,
      show: node.show,
      show0: node.show0
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private datashare: DataSharingService,
    private router: Router,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
    this.dataSource.data = LAYERS_DATA;

    // this.datashare.currentMessage.subscribe((data: any) => {
    //   console.log(data)
    //   let addPin: any = {
    //     name: data.pinName,
    //     icon: "fas fa-user fa-3",
    //     link: "Pins",
    //     eventName: 'new-pin',
    //     component: 'ImportKmlComponent'
    //   };
    //   console.log("data", LAYERS_DATA);
    //   if (data) {
    //     this.dataSource.data[9].children[1].children.push(addPin);
    //     console.log("pins", this.dataSource.data[9].children[1].children);
    //   }
    // });
  }

  ngAfterViewInit() {
    $('.hide-menu-item-nav').parent().parent().css({ 'display': 'none' });
    $('.hide-parent-menu-item-nav').parent().parent().css({ 'display': 'none' });
    $('.disabled-menu-item-nav').parent().css({'color': 'gray','cursor': 'not-allowed','pointer-events': 'none'});
  }
  parentIconClick(mmenuDirective, level) {
    if (level == 0) {
      mmenuDirective.menu.API.closeAllPanels()
    }
  }
  // [ngClass]="{'hide-menu-item-nav': (item.show == false), 'disabled-menu-item-nav':(item.disabled == true) }"
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  isLevelZero = (_: number, node: ExampleFlatNode) => node.level === 0 && node.expandable;
  isLevelOne = (_: number, node: ExampleFlatNode) => node.level === 1 && node.expandable && node.show != false;
  isLevelGreterThanOne = (_: number, node: ExampleFlatNode) => node.level > 1 && node.expandable;
  hasNoContent = (_: number, node: ExampleFlatNode) => !node.expandable;
  getChildren = (node: SideNavNode) => {
    return node.children;
  };

  ngOnInit() {
    $('.hide-menu-item-nav').parent().css({ 'display': 'none' });
    this.datashare.currentMessage.subscribe((data: any) => {
      if (Object.keys(data).length !== 0) {
        const addPin: any = {
          name: data.pinName,
          link: 'CREATE-PIN',
          eventName: 'sites-outdoor-esc',
          children: [],
          component: 'PinGroupSettingComponent'
        };
        if (data.pinName) {
          let dataChange = this.dataSource.data;
          dataChange[9].children[1].children.push(addPin);
          this.dataSource.data = [];
          this.dataSource.data = dataChange;
        } else { }
      }
    });
  }

  layersLevelHover(node, iconlayers) {
    this.hoverLayer0 = '';
    this.hoverLayer0 = 'layers-menu-0';
    const levelNode = this.treeControl.getLevel(node);
    if (iconlayers != '') {
      iconlayers._elementRef.nativeElement.style.marginLeft = '20px';
    }
  }

  layersLevelHoverLeave(node, iconlayers) {
    const levelNode = this.treeControl.getLevel(node);
    if (iconlayers != '') {
      const treeNode = iconlayers._elementRef.nativeElement.parentNode.parentNode.parentNode.classList;
      if (treeNode.contains('layer-0')) {
        iconlayers._elementRef.nativeElement.style.marginLeft = '0px';
      } else if (treeNode.contains('active-nested-layer')) {
        iconlayers._elementRef.nativeElement.style.marginLeft = '0px';
      } else {
        iconlayers._elementRef.nativeElement.style.marginLeft = '0px';
      }
    }
  }

  recNode(arr: any[], data: any[], index: number, maxIndex: number): any[] {
    if (arr === undefined)
      arr = [];
    if (data.length != 0){
    for (let i = 0; i < data.length; i++) {
      index++
      if (index === maxIndex) {
        return ([true, index, arr]);
      }
      if (data[i].children != undefined){
        if (data[i].children.length || data[i]) {
          let res = this.recNode(arr, data[i].children, index, maxIndex);
          index = res[1];
          if (res[0] === true) {
            arr.splice(0, 0, (i !== (data.length - 1)));
            return ([true, index, arr]);
          }
        }
      }
    }
  }
    return ([false, index, arr]);
  }

  activenode(node, horizontalLine) {
    this.nodeType = node.name;
    const levelNode = this.treeControl.getLevel(node);
    const currentIndexNode = this.treeControl.dataNodes.indexOf(node);
    let test = this.treeControl.dataNodes[this.treeControl.getDescendants(node).length + currentIndexNode + 1];

    if (this.treeControl.isExpanded(node) == true) {
      if (typeof test != 'undefined') {
        if (test.name == 'Prediction Layers') {
          $('#prediction-layer-border').css({ 'border-top': '1px solid #eaecec' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Measured Layers') {
          $('#measured-layer-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Hybrid Layers') {
          $('#hybrid-layer-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Alarms') {
          $('#alarms-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Analytics') {
          $('#analytics-layer-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Topologies') {
          $('#topologies-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Locations and Boundaries') {
          $('#locations-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#base-map-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        } else if (test.name == 'Base Maps') {
          $('#base-map-border').css({ 'border-top': '1px solid #eaecec' });
          $('#prediction-layer-border').css({ 'border-top': 'none' });
          $('#measured-layer-border').css({ 'border-top': 'none' });
          $('#hybrid-layer-border').css({ 'border-top': 'none' });
          $('#alarms-border').css({ 'border-top': 'none' });
          $('#analytics-layer-border').css({ 'border-top': 'none' });
          $('#topologies-border').css({ 'border-top': 'none' });
          $('#locations-border').css({ 'border-top': 'none' });
          $('#my-layers-border').css({ 'border-top': 'none' });
        }
      }
      else if (currentIndexNode == 277) {
        $('#my-layers-border').css({ 'border-top': '1px solid #eaecec' });
        $('#prediction-layer-border').css({ 'border-top': 'none' });
        $('#measured-layer-border').css({ 'border-top': 'none' });
        $('#hybrid-layer-border').css({ 'border-top': 'none' });
        $('#alarms-border').css({ 'border-top': 'none' });
        $('#analytics-layer-border').css({ 'border-top': 'none' });
        $('#topologies-border').css({ 'border-top': 'none' });
        $('#locations-border').css({ 'border-top': 'none' });
        $('#base-map-border').css({ 'border-top': 'none' });
      }

      this.parentNode = node;
      this.treeControl.collapseAll();
      if (levelNode == 0) {
        this.treeControl.expand(this.treeControl.dataNodes[this.treeControl.dataNodes.indexOf(node)]);
      } else {
        for (let i = 0; i <= levelNode; i++) {
          if (this.parentNode != null) {
            this.treeControl.expand(this.treeControl.dataNodes[this.treeControl.dataNodes.indexOf(this.parentNode)]);
            this.parentNode = this.getParent(this.parentNode);
          }
        }
      }
    } else {
      if (currentIndexNode != 7 && test.name == 'Prediction Layers') {
        $('#prediction-layer-border').css({ 'border-top': 'none' });
      }
      else if (currentIndexNode != 38 && test.name == 'Measured Layers') {
        $('#measured-layer-border').css({ 'border-top': 'none' });
      } else if (currentIndexNode != 135 && test.name == 'Hybrid Layers') {
        $('#hybrid-layer-border').css({ 'border-top': 'none' });
      } else if (currentIndexNode != 192 && test.name == 'Alarms') {
        $('#alarms-border').css({ 'border-top': 'none' });
      } else if (test.name == 'Analytics') {
        $('#analytics-layer-border').css({ 'border-top': 'none' });
      } else if (test.name == 'Topologies') {
        $('#topologies-border').css({ 'border-top': 'none' });
      } else if (currentIndexNode != 261 && test.name == 'Locations and Boundaries') {
        $('#locations-border').css({ 'border-top': 'none' });
      } else if (test.name == 'Base Maps') {
        $('#base-map-border').css({ 'border-top': 'none' });
      } else if (test.name == 'My Layers') {
        $('#my-layers-border').css({ 'border-top': 'none' });
      }

    }
  }

  todoItemSelectionToggle(checked, node, activeCheckbox) {
    node.selected = checked;
    if (node.selected == true) {
      this.renderer.addClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
      this.router.navigate([node.link]);
    } else {
      this.renderer.removeClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    }

  }

  /**
   * Iterate over each node in reverse order and return the first node 
   * that has a lower level than the passed node.
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

  selectedLayerArr: any = [];

  onChangeTree(selected, node, activeCheckbox, eventChecked) {
    if (activeCheckbox._elementRef.nativeElement.tagName === 'MAT-RADIO-BUTTON') {
      this.onRadioChecked(selected, node, activeCheckbox, eventChecked);
    } else {
      this.onChecked(selected, node, activeCheckbox, eventChecked);
    }
  }
  onRadioChecked(selected, node, activeCheckbox, eventChecked) {
    this.selectedLayerArr.push(node);
    this.datashare.changeMessage(this.selectedLayerArr);
    this.datashare.leftSideNavLayerSelection(this.selectedLayerArr);
    this.renderer.addClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    if ('' !== node.componentLayer) {
      this.renderLayerComponent(node.componentLayer);
    }
  }
  onSelectionChange(event) {
    //
  }
  onChecked(selected, node, activeCheckbox, eventChecked) {
    event.preventDefault();
    if (eventChecked != 'no') {
      node.selected = eventChecked;
    } else {
      node.selected = !selected;
    }

    if (node.selected == true) {
      this.selectedLayerArr.push(node);
      this.datashare.changeMessage(this.selectedLayerArr);
      this.datashare.leftSideNavLayerSelection(this.selectedLayerArr);
      this.renderer.addClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
      if ('' !== node.componentLayer) {
        this.renderLayerComponent(node.componentLayer);
      }
    } else {
      for (let item of this.selectedLayerArr) {
        if (item.selected == node.selected) {
          this.selectedLayerArr.splice(this.selectedLayerArr.indexOf(item), 1);
          break;
        }
      }
      if ('' !== node.componentLayer) {
        this.removeLayerComponent(node.componentLayer);
      }
      this.datashare.changeMessage(this.selectedLayerArr);
      this.renderer.removeClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    }
  }

  navigationTrackBy(index, item) {
    if (!item) return null;
    return index;
  }

  async openSettingsDialog(node, event) {
    event.stopPropagation();
    console.log(node.component)
    this.viewContainerRef.clear();
    if (node.component == 'TownBoundaryDialogComponent') {
      const { TownBoundaryDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/location-and-boundaries/CensusData/TownBoundary/town-boundary-dialog/town-boundary-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(TownBoundaryDialogComponent)
      );
    } else if (node.component == 'ZonesJioDialogComponent') {
      const { ZonesJioDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/location-and-boundaries/Jio/Zones/zones-dialog/zones-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(ZonesJioDialogComponent)
      );
    } else if (node.component == 'DenseUrbanDialogComponent') {
      const { DenseUrbanDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/location-and-boundaries/Morphology/DenseUrban/dense-urban-dialog/dense-urban-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(DenseUrbanDialogComponent)
      );
    } else if (node.component == 'TacNetworkDialogComponent') {
      const { TacNetworkDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/location-and-boundaries/Network/TAL/tal-dialog/tal-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(TacNetworkDialogComponent)
      );
    } else if (node.component == 'NominalMacroDialogComponent') {
      const { NominalMacroDialogComponent } = await import('./../../../main-modules/main-layer/layer-list/sites/nominal/macro-dialog/macro-dialog.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(NominalMacroDialogComponent)
      );
    }
    else if (node.component == 'PinGroupSettingComponent') {
      const { PinGroupSettingComponent } = await import('./../../../main-modules/main-layer/pin-group-setting/pin-group-setting.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(PinGroupSettingComponent)
      );
    }
    else if (node.component == 'CmcSettingsPopupComponent') {
      const { CmcSettingsPopupComponent } = await import('./../../../main-modules/main-layer/layer-list/hybrid-layers/cmc-settings-popup/cmc-settings-popup.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(CmcSettingsPopupComponent)
      );
    }
    else if (node.component == 'FibreRouteSettingsPopupComponent') {
      const { FibreRouteSettingsPopupComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/fibre/route/settings-popup/settings-popup.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(FibreRouteSettingsPopupComponent)
      );
    } else if (node.component == 'StructurePlannedSettingsPopupComponent') {
      const { StructurePlannedSettingsPopupComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/structure/structure-planned-fibre-core/structure-planned-settings-popup/structure-planned-settings-popup.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(StructurePlannedSettingsPopupComponent)
      );
    }
    else if (node.component == 'LogicalConnectivitySettingComponent') {
      const { LogicalConnectivitySettingComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/fibre/logicaltopology/logical-connectivity-setting/logical-connectivity-setting.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(LogicalConnectivitySettingComponent)
      );
    }
    else if (node.component == 'EquipmentSettingsPopupComponent') {
      const { StructurePlannedSettingsPopupComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/structure/structure-planned-fibre-core/structure-planned-settings-popup/structure-planned-settings-popup.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(StructurePlannedSettingsPopupComponent)
      );
    }
  }

  layerComponent;
  async renderLayerComponent(layersToShow) {
    this.viewContainerRef.clear();
    if (layersToShow == 'RoutePlannedFibreCoreComponent') {
      const { RoutePlannedFibreCoreComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/fibre/route/route-planned-fibre-core/route-planned-fibre-core.component');
      this.layerComponent = this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(RoutePlannedFibreCoreComponent)
      );
    } else if(layersToShow == 'RouteReadyFibreCoreComponent') {
      const { RouteReadyFibreCoreComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/fibre/route/route-ready-fibre-core/route-ready-fibre-core.component');
      this.layerComponent = this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(RouteReadyFibreCoreComponent)
      );
    } else if(layersToShow == 'StructurePlannedFibreCoreComponent') {
      const { StructurePlannedFibreCoreComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/structure/structure-planned-fibre-core/structure-planned-fibre-core.component');
      this.layerComponent = this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(StructurePlannedFibreCoreComponent)
      );
    } else if(layersToShow == 'EquipmentsPlannedFibreCoreComponent') {
      const { EquipmentsPlannedFibreCoreComponent } = await import('./../../../main-modules/main-layer/layer-list/topologies/equipments/equipments-planned-fibre-core/equipments-planned-fibre-core.component');
      this.layerComponent = this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(EquipmentsPlannedFibreCoreComponent)
      );
    }
  }



  removeLayerComponent(layerToRemove) {
    if ('' !== layerToRemove) {
      this.datashare.removeLayer(layerToRemove)
    }
  }
}