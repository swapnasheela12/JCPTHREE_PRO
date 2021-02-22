import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { SavePolygonPopupComponent } from 'src/app/core/components/commonPopup/save-polygon-popup/save-polygon-popup.component';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-map-header-view',
  templateUrl: './map-header-view.component.html',
  styleUrls: ['./map-header-view.component.scss']
})
export class MapHeaderViewComponent implements OnInit {
  headerData;
  showHeader;
  layerName: any;
  source: any;
  constructor(
    private datashare: DataSharingService,
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private router: Router,
    public matDialog: MatDialog
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
    console.log(this.headerData);
  }

  async openPopup() {
    const { AdditionalCandidatesPopupComponent } = await import('./../../../../main-layer/additional-candidates-popup/additional-candidates-popup.component');
    this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(AdditionalCandidatesPopupComponent)
    );
    $('.button-mat').addClass('active-button');
  }

  async openSettingPopup() {
      const { LayerPatchPopupComponent } = await import('./../../../../main-layer/layer-patch-popup/layer-patch-popup.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(LayerPatchPopupComponent)
      );
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

  backTo() {
    this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation']);
  }
}
