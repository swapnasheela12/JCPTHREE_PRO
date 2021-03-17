import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AdditionalSettingsModelsData } from '../additional-candidate-settings-popup/additional-candidate-settings-model/additional-candidate-setting-data.model';
import { AdditionalSettingsModelsOptions } from '../additional-candidate-settings-popup/additional-candidate-settings-model/additional-candidate-settings-options.model';
import { AdditionalSettingsFactoryService } from 'src/app/_services/additional-candidate-settings/additional-candidate-settings-factory.service';
import { AdditionalCandidateSettingsService } from 'src/app/_services/additional-candidate-settings/additional-candidate-settings.service';
import { GridOptions } from '@ag-grid-community/all-modules';
import { VerticaldotRendererComponent } from '../../modules/performance-management/kpi-editor/renderer/verticaldot-renderer.component';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { CustomFlagPopupComponent } from 'src/app/core/components/commonPopup/custom-flag-popup/custom-flag-popup.component';
import { SiteProposedConfigurationComponent } from 'src/app/core/components/commonPopup/site-proposed-configuration/site-proposed-configuration.component';

const ADDITIONAL_CANDIDATE_COLUMNDEFS = [
  {
    headerName: "SAP ID",
    field: "sapId",
    minWidth: 230,
    checkboxSelection: true
  },
  {
    headerName: "flag",
    field: "flagStatus",
    cellRenderer:'flagRenderComponent',
    headerClass: 'notShowHeader',
    minWidth: 30
  },
  {
    headerName: "",
    cellRenderer:'nominalGenerationRenderComponent',
    minWidth: 30,
    headerClass: 'notShowHeader',
    pinned: 'right',
    cellClass: 'vertical-dot-align'
  }
];

@Component({
  selector: 'app-additional-candidates-popup',
  templateUrl: './additional-candidates-popup.component.html',
  styleUrls: ['./additional-candidates-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AdditionalCandidatesPopupComponent implements OnInit, AfterViewInit {
  dialog: AdditionalCandidateSettingsService;
  @ViewChild('fibreStructureLayerSettingsPopup', { static: true }) fibreStructureLayerSettingsPopup: TemplateRef<any>;show: boolean;
  name;
  title = 'Additional Candidates';
  target = 'Target Sites'
  public gridAdditionalCandidateOptions: GridOptions;
  public additionalCandidateColumnDefs : any[];
  public additionalCandidateData;
  public frameworkComponentsAdditionalCandidate;
  searchGrid = '';

  ngOnInit(): void {
    if (this.name == 'nominal-validation') {
      this.title = 'Candidates For ACP';
      this.target = 'ACP Target';
    }
    this.dispatchDialog();
  }

  constructor(
    private additionalFactoryService: AdditionalSettingsFactoryService,
    private http: HttpClient
  ) {
    console.log(this.name);
    this.gridAdditionalCandidateOptions = <GridOptions>{};
    this.frameworkComponentsAdditionalCandidate = {
      'nominalGenerationRenderComponent': nominalGenerationRenderComponent,
      'flagRenderComponent': flagRenderComponent
    };
   
  }

  fitColumns() {
    if (this.gridAdditionalCandidateOptions.api && this.additionalCandidateData) {
      setTimeout(() => {
        this.gridAdditionalCandidateOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  ngAfterViewInit() {
    console.log(name);
    setTimeout(() => {
      this.createColumnDefs();
      this.getAdditionalCandidate();
    });
  }

  public createColumnDefs() {
    this.additionalCandidateColumnDefs = ADDITIONAL_CANDIDATE_COLUMNDEFS;
  }

  getAdditionalCandidate() {
    this.http.get("assets/data/layers/nominal-generation/nominal-site-distribution.json")
    .subscribe(data => {
      this.additionalCandidateData = data;
      this.fitColumns();
  });
  }
  
  toggleSearch() {
    this.show = !this.show;
  };


  
  onFilterChanged(value) {
    this.gridAdditionalCandidateOptions.api.setQuickFilter(value);
  };

  dispatchDialog() {
    this.openDialog({
      headerText: this.title,
      template: this.fibreStructureLayerSettingsPopup
    }, {
      width: 385,
      height: 500,
      backdropClass: '',
      position: {'bottom': '2px','right':'0px'},
      disableClose: false,
      hasBackdrop: false,
      panelClass: "table-view-layers-dialog-container",
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  private openDialog(dialogData: AdditionalSettingsModelsData, options: AdditionalSettingsModelsOptions): void {
    this.dialog = this.additionalFactoryService.open(dialogData, options);
  }
}

@Component({ 
  selector: 'nominal-3dot-button-renderer',
  template: `
  <div>
        <button mat-icon-button [matMenuTriggerFor]="kpiEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>
        <mat-menu #kpiEditorMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="editDetailsConf()">
                <span>Edit</span>
            </button>
            <button mat-menu-item (click)="viewDetailsConf()">
                <span>View</span>
            </button>
            <button mat-menu-item (click)="openFlagConf()">
                <span>Flag</span>
            </button>
        </mat-menu>
    </div>
    `,
    styles: [
        `
        .kpi-editor-menu-render .mat-menu-content .mat-menu-item:hover {
            background-color: #f3f7fc;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class nominalGenerationRenderComponent implements ICellRendererAngularComp {
  params;

  constructor(
    private matDialog: MatDialog
  ) {
  }

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  editDetailsConf() {
    const dialogRef = this.matDialog.open(SiteProposedConfigurationComponent, {
      width: "1023px",
      height:'474px',
      panelClass: "site-proposed-table-edit",
      data: {
        'sapId': this.params.data.sapId,
        'latitude': this.params.data.latitude,
        'longitude': this.params.data.longitude,
        'sector':this.params.data.sector
      }
    });
    dialogRef.componentInstance.mode = 'edit';
  }
  
  viewDetailsConf() {

    const dialogRef = this.matDialog.open(SiteProposedConfigurationComponent, {
      width: "1023px",
      height:'474px',
      panelClass: "site-proposed-table-view",
      data: {
        'sapId': this.params.data.sapId,
        'latitude': this.params.data.latitude,
        'longitude': this.params.data.longitude,
        'sector':this.params.data.sector
      }
    });
    dialogRef.componentInstance.mode = 'view';

  }
  
  openFlagConf() {
    const dialogRef = this.matDialog.open(CustomFlagPopupComponent, {
      width: "535px",
      height:'475px',
      panelClass: "material-dialog-container"
    });
  }
  
}

@Component({ 
  selector: 'flag-renderer',
  template: `
    <div *ngIf="flagStatus == 'warning'">
      <i class="fas fa-flag green"></i>
    </div>
    <div *ngIf="flagStatus == 'alert'">
      <i class="fas fa-flag red"></i>
    </div>
    `,
    styles: [
        `
        .red {
          color: #D80000;
        }
        .green {
          color: #11D800;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class flagRenderComponent implements ICellRendererAngularComp {
  params;
  flagStatus;

  constructor(
  ) {
  }

  agInit(params): void {
    this.params = params;
    this.flagStatus = this.params.data.flagStatus;
  }

  refresh(params?: any): boolean {
    return true;
  }
  
}