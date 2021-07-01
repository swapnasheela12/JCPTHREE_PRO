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

export const FLY_PREDICTION = [
  { fly_prediction: 'Maharashtra-NP-CV-121020_V1' },
  { fly_prediction: 'Maharashtra-NP-CV-121020_V3' },
  { fly_prediction: 'Maharashtra-NP-CV-121020_V1' },
  { fly_prediction: 'Maharashtra-NP-CV-121020_V2' },
  { fly_prediction: 'Maharashtra-NP-CV-121020_V1' }
];

export const COVERAGE_PREDICTION_SETTINGS =  {
    "Band": [
      {
        name: "3500 MHz",
        selected: false,
        type: "radio"
      },
      {
        name: "Combined",
        selected: false,
        type: "radio"
      },
      {
        name: "28 Ghz",
        selected: true,
        type: "radio"
      }
    ],
    "Site Status" : [
      {
        name: "Proposed Nominal",
        selected: false,
        type: "radio"
      },
      {
        name: "Planned",
        selected: true,
        type: "radio"
      },
      {
        name: "Approved Nominal",
        selected: false,
        type: "radio"
      },
      {
        name: "On - Air",
        selected: true,
        type: "radio"
      }
    ],
    "Prediction Type" : [
      {
        name: "RSRP",
        selected: false,
        type: "checkbox"
      },
      {
        name: "Spectral Efficiency",
        selected: false,
        type: "checkbox"
      },
      {
        name: "SINR",
        selected: true,
        type: "checkbox"
      },
      {
        name: "Best Server Plot",
        selected: false,
        type: "checkbox"
      },
      {
        name: "DL Throughput",
        selected: false,
        type: "checkbox"
      }
    ]
  };


@Component({
  selector: 'app-prediction-setting-popup',
  templateUrl: './prediction-setting-popup.component.html',
  styleUrls: ['./prediction-setting-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PredictionSettingPopupComponent implements OnInit, AfterViewInit {
  dialog: LayerSettingsSettingsService;
  settingsDetails= COVERAGE_PREDICTION_SETTINGS;
  settingsSelection;
  @ViewChild('layerPredictionSettingsPopup', { static: true }) layerPredictionSettingsPopup: TemplateRef<any>;
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

  selectFlyPredictionValue: string = FLY_PREDICTION[0].fly_prediction;
  selectFlyPredictionList = FLY_PREDICTION;
  searchselectFlyPredictionListVal;
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


  constructor(
    private layerPatchFactoryService: LayerSettingsFactoryService,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private dataShare: DataSharingService
  ) {
    // this.settingsDetails.forEach((settings) => {
    //   console.log(settings);
    //   this.settingsSelection = settings;
    //   Object.keys(settings).map((key) => console.log(settings[key]));
    // })
  }

  ngOnInit(): void {
    this.dispatchDialog();

  }

  ngAfterViewInit() {
    // this.treeControl.expandAll()
    // this.treeControl.expand(this.treeControl.dataNodes[0]);
    // let firstNodeDescendentLength = this.treeControl.getDescendants(this.treeControl.dataNodes[0]).length;
    // this.treeControl.expand(this.treeControl.dataNodes[firstNodeDescendentLength+1]);
  }

  dispatchDialog() {
    this.openDialog({
      headerText: 'Coverage Prediction Setting',
      template: this.layerPredictionSettingsPopup
    }, {
      width: 391,
      height: 450,
      backdropClass: '',
      position: {'right':'10px'},
      disableClose: false,
      hasBackdrop: false,
      panelClass: "table-view-layers-dialog-container",
    });

    // this.settingsDetails.forEach((data) => {
    //   console.log(data);
    //   this.settingsSelection = data;
    //   Object.keys(data).map((key) => console.log(data[key]));
    // })
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
    if (iconlayers != '') {
      iconlayers._elementRef.nativeElement.style.marginLeft = '20px';
    }
  }

  layersLevelHoverLeave(node, iconlayers) {
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


  removeLayerComponent(layerToRemove) {
    if ('' !== layerToRemove) {
      this.dataShare.removeLayer(layerToRemove)
    }
  }
}