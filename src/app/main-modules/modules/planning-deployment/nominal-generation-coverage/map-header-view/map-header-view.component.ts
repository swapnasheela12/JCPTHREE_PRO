import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { SavePolygonPopupComponent } from 'src/app/core/components/commonPopup/save-polygon-popup/save-polygon-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { COVERAGE_PLANNING, CAPACITY_PLANNING } from './map-header.constant';

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
  constructor(
    private datashare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private router: Router,
    public matDialog: MatDialog,
    private cdref: ChangeDetectorRef
  ) {
    this.datashare.layernameObject.subscribe((layername) => {
      if (!(Object.keys(layername).length === 0) && !(layername.constructor === Object)) {
          this.layerName = layername[0].name;
          if (layername[0].source != undefined) {
            this.source = layername[0].source;
          }
      }
    });
  }

  ngOnInit(): void {
    if (this.headerData.name == 'nominal-capacity') {
      this.showSetting = true;
    }
    if(this.headerData.name == 'nominal-generation'){
      this.showSetting = true;
      this.showChart = true;
      this.showSummary = true;
    }
  }

  async openPopup() {
    const { AdditionalCandidatesPopupComponent } = await import('./../../../../main-layer/additional-candidates-popup/additional-candidates-popup.component');
    this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(AdditionalCandidatesPopupComponent)
    );
    $('.button-mat').addClass('active-button');
  }

  async openSettingPopup(name) {
    console.log(name)
    if (name == 'nominal-generation') {
      this.headerSettingData = COVERAGE_PLANNING;
    } else if(name == 'nominal-capacity') {
      this.headerSettingData = CAPACITY_PLANNING;
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

  async openSummary() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Summary']);
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

  backTo() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation']);
  }
}
