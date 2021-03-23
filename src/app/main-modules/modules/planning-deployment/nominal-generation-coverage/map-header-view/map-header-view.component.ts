import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { SavePolygonPopupComponent } from 'src/app/core/components/commonPopup/save-polygon-popup/save-polygon-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { COVERAGE_PLANNING, CAPACITY_PLANNING, VALIDATION_PLANNING } from './map-header.constant';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-map-header-view',
  templateUrl: './map-header-view.component.html',
  styleUrls: ['./map-header-view.component.scss']
})
export class MapHeaderViewComponent implements OnInit, AfterContentChecked {
  headerData;
  showHeader;
  layerName: any;
  source: any;
  showSetting:Boolean = false;
  showChart:Boolean = false;
  showSummary:Boolean = false;
  headerSettingData;
  mainLayerRef: {};
  constructor(
    private datashare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private router: Router,
    public matDialog: MatDialog,
    private cdref: ChangeDetectorRef,
    public location: Location
  ) {
    this.datashare.layernameObject.subscribe((layername) => {
      if (!(Object.keys(layername).length === 0) && !(layername.constructor === Object)) {
          this.layerName = layername[0].name;
          if (layername[0].source != undefined) {
            this.source = layername[0].source;
          }
      }
    });
    this.datashare.mainLayerMessage.subscribe(
      (test) => {
        this.mainLayerRef = test;
      }
    )
  }

  ngOnInit(): void {
    if (this.headerData.name == 'nominal-capacity') {
      this.showSetting = true;
      this.showChart = false;
      this.showSummary = false;
    }
    if(this.headerData.name == 'nominal-generation') {
      this.showSetting = true;
      this.showChart = true;
      this.showSummary = true;
    }

    if(this.headerData.name == 'nominal-validation') {
      this.showSetting = true;
      this.showChart = false;
      this.showSummary = true;
    }
    
  }

  async openPopup() {
    this.viewContainerRef.clear();
    const { AdditionalCandidatesPopupComponent } = await import('./../../../../main-layer/additional-candidates-popup/additional-candidates-popup.component');
    let additionalCandidate = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(AdditionalCandidatesPopupComponent)
    );
    additionalCandidate.instance.name = this.headerData.name;
    additionalCandidate.changeDetectorRef.detectChanges();
    this.cdref.detectChanges();
    $('.button-mat').addClass('active-button');

  }

  async openSettingPopup(name) {
    if (name == 'nominal-generation') {
      this.headerSettingData = COVERAGE_PLANNING;
    } else if(name == 'nominal-capacity') {
      this.headerSettingData = CAPACITY_PLANNING;
    } else if(name == 'nominal-validation') {
      this.headerSettingData = VALIDATION_PLANNING;
    } else {
      this.headerSettingData = COVERAGE_PLANNING;
    }
    console.log(this.headerSettingData);
    const { LayerPatchPopupComponent } = await import('./../../../../main-layer/layer-patch-popup/layer-patch-popup.component');
    let layerPatch = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(LayerPatchPopupComponent)
    );
    
    layerPatch.instance.settingData = this.headerSettingData;
    $('.button-mat').addClass('active-button');
  }

  async openSummary(name) {
    if (name == 'nominal-generation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Summary']);
    } else if (name == 'nominal-validation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Summary']);
    }
  }

  openChart(name) {
    if (name == 'nominal-generation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Performance-Summary']);
    } else if (name == 'nominal-validation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation/Performance-Summary'], {state: {data: {row: name, type: 'validation', tab: '', 'selectIndex': 4}}});
    }
  }

  async openDistributionSummary(){
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Site-Distribution-Summary']);
  }

  saveNominalPloy(){
    const dialogRef = this.matDialog.open(SavePolygonPopupComponent, {
      width: "500px",
      height:'190px',
      panelClass: "material-dialog-container",
    });
  }
  
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  backTo(name) {
    if (name == 'nominal-generation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation']);
    } else if (name == 'nominal-validation') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Validation']);
    }
  }
}
