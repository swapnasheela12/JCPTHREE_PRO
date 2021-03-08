import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, Renderer2, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayerSettingsSettingsService } from 'src/app/_services/layer-patch-settings/layer-patch-settings.service';
import { LayerSettingsFactoryService } from 'src/app/_services/layer-patch-settings/layer-patch-settings-factory.service';
import { LayerPatchSettingsModelsData } from '../layer-patch-settings-popup/layer-patch-settings-model/layer-patch-settings-data.model';
import { LayerPatchSettingsModelsOptions } from '../layer-patch-settings-popup/layer-patch-settings-model/layer-patch-settings-options.model';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

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

const SITES_SITES_LIST_COVERAGE =[
  {
    name: "P1",
    icon: "fas fa-users fa-3",
    link: "p1",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "RP1",
    icon: "fas fa-users fa-3",
    link: "rp1",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "IP Colo",
    icon: "fas fa-users fa-3",
    link: "ipcolo",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "Additional Candidates",
    icon: "fas fa-users fa-3",
    link: "p1",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  }
];

const SITES_PREDICTION_LAYERS_LIST_COVERAGE = [
  {
    name: "RSRP",
    icon: "fas fa-users fa-3",
    link: "rsrp",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "SINR",
    icon: "fas fa-users fa-3",
    link: "sinr",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "DL Throughput",
    icon: "fas fa-users fa-3",
    link: "dl-throughput",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  },
  {
    name: "Spectral Efficiency",
    icon: "fas fa-users fa-3",
    link: "Spectral-Efficiency",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: []
  }
];

const COVERAGE_PLANNING= [
  {
    name: "Sites",
    icon: "fas fa-users fa-3",
    link: "Sites",
    eventName: 'sites-outdoor-esc',
    show:true,
    children: SITES_SITES_LIST_COVERAGE
  },
  {
      name: "Prediction Layers",
      icon: "fas fa-users fa-3",
      link: "Prediction-Layers",
      eventName: 'sites-outdoor-esc',
      show:true,
      children: SITES_PREDICTION_LAYERS_LIST_COVERAGE,
      classId: 'prediction-layer-border'
  }
];
@Component({
  selector: 'app-layer-patch-popup',
  templateUrl: './layer-patch-popup.component.html',
  styleUrls: ['./layer-patch-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayerPatchPopupComponent implements OnInit, AfterViewInit {
  dialog: LayerSettingsSettingsService;
  @ViewChild('layerPatchSettingsPopup', { static: true }) layerPatchSettingsPopup: TemplateRef<any>;
  @ViewChild('activeCheckbox', { static: false }) activeCheckbox;
  show: boolean;
  selectedLayerArr: any = [];
  nodeType = 'TEST';
  parentNode: ExampleFlatNode;
  hoverLayer0: String = '';
  dataChange = new BehaviorSubject<SideNavNode[]>([]);
  treeData: ExampleFlatNode[];
  settingData;
  get data(): SideNavNode[] { return this.dataChange.value; }

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
    private layerPatchFactoryService: LayerSettingsFactoryService,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private dataShare: DataSharingService
  ) {
    // console.log(this.settingData)
    // this.dataSource.data = this.settingData;
    // this.treeControl.expand(this.treeControl.dataNodes[0]);
    // let firstNodeDescendentLength = this.treeControl.getDescendants(this.treeControl.dataNodes[0]).length;
    // this.treeControl.expand(this.treeControl.dataNodes[firstNodeDescendentLength+1]);
    // this.dataShare.patchLayerObject.subscribe((settingData: any) => {
    //   if (Object.keys(settingData).length !== 0) {
    //     this.dataSource.data = settingData;
    //   }
    // });

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  isLevelZero = (_: number, node: ExampleFlatNode) => node.level === 0 && node.expandable;
  isLevelOne = (_: number, node: ExampleFlatNode) => node.level === 1 && node.expandable && node.show != false;
  isLevelGreterThanOne = (_: number, node: ExampleFlatNode) => node.level > 1 && node.expandable;
  hasNoContent = (_: number, node: ExampleFlatNode) => !node.expandable;
  getChildren = (node: SideNavNode) => {
    return node.children;
  };

  ngOnInit(): void {
    this.dispatchDialog();
  }

  ngAfterViewInit() {
    this.dataSource.data = this.settingData;
    this.treeControl.expandAll()
    // this.treeControl.expand(this.treeControl.dataNodes[0]);
    // let firstNodeDescendentLength = this.treeControl.getDescendants(this.treeControl.dataNodes[0]).length;
    // this.treeControl.expand(this.treeControl.dataNodes[firstNodeDescendentLength+1]);
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Coverage Planning',
      template: this.layerPatchSettingsPopup
    }, {
      width: 287,
      height: 500,
      backdropClass: '',
      position: {'bottom': '2px','right':'0px'},
      disableClose: false,
      hasBackdrop: false,
      panelClass: "table-view-layers-dialog-container",
    });
  }

  closeDialog() {
    $('.active-button').removeClass(['active-button']);
    this.dialog.close();
  }

  private openDialog(
    dialogData: LayerPatchSettingsModelsData,
    options: LayerPatchSettingsModelsOptions
  ): void {
    this.dialog = this.layerPatchFactoryService.open(dialogData, options);
  }

  onChangeTree(selected, node, activeCheckbox, eventChecked) {
    if (activeCheckbox._elementRef.nativeElement.tagName === 'MAT-RADIO-BUTTON') {
      this.onRadioChecked(selected, node, activeCheckbox, eventChecked);
    } else {
      this.onChecked(selected, node, activeCheckbox, eventChecked);
    }
  }

  onRadioChecked(selected, node, activeCheckbox, eventChecked) {
    this.selectedLayerArr.push(node);
    this.dataShare.changeMessage(this.selectedLayerArr);
    this.dataShare.leftSideNavLayerSelection(this.selectedLayerArr);
    this.renderer.addClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    if ('' !== node.componentLayer) {
      this.renderLayerComponent(node.componentLayer);
    }
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
      this.dataShare.changeMessage(this.selectedLayerArr);
      this.dataShare.leftSideNavLayerSelection(this.selectedLayerArr);
      this.dataShare.layerNameFunc(this.selectedLayerArr);
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
      this.dataShare.changeMessage(this.selectedLayerArr);
      this.renderer.removeClass(activeCheckbox._elementRef.nativeElement, 'menu-active-layers');
    }
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

  layerComponent;
  async renderLayerComponent(layersToShow) {
    this.viewContainerRef.clear();
    if (layersToShow == 'CoveredAreaLayerComponent') {
      const { CoveredAreaLayerComponent } = await import('./../../../main-modules/modules/planning-deployment/nominal-capacity/layer/covered-area-layer/covered-area-layer.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(CoveredAreaLayerComponent)
      );
    } else if (layersToShow == 'MacroLayerComponent') {
      const { MacroLayerComponent } = await import('./../../../main-modules/modules/planning-deployment/nominal-capacity/layer/macro-layer/macro-layer.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(MacroLayerComponent)
      );
    } else if (layersToShow == 'OdscLayerComponent') {
      const { OdscLayerComponent } = await import('./../../../main-modules/modules/planning-deployment/nominal-capacity/layer/odsc-layer/odsc-layer.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(OdscLayerComponent)
      );
    }
  }

  async openSettingsDialog(node, event) {
    event.stopPropagation();
    this.viewContainerRef.clear();
  }

  removeLayerComponent(layerToRemove) {
    if ('' !== layerToRemove) {
      this.dataShare.removeLayer(layerToRemove)
    }
  }
}