import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { SiteProposedConfigurationComponent } from 'src/app/core/components/commonPopup/site-proposed-configuration/site-proposed-configuration.component';

@Component({ 
  selector: 'cp-button-renderer',
  template: `
  <div>
        <button mat-icon-button [matMenuTriggerFor]="kpiEditorMenu" aria-label="Example icon-button with a menu">
            <mat-icon style="line-height: 0;color:black !important;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
        </button>

        <mat-menu #kpiEditorMenu="matMenu" class="kpi-editor-menu-render" xPosition="before">
            <button mat-menu-item (click)="viewDetails()">
                <span>View</span>
            </button>
            <button mat-menu-item (click)="editDetails()">
                <span>Edit</span>
            </button>
            <button mat-menu-item (click)="deleteRow()">
                <span>Delete</span>
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
export class CoveragePredictionRendererComponent implements ICellRendererAngularComp {
  params;

  constructor( private matDialog: MatDialog ) {}

  agInit(params): void {
      console.log(params)
    this.params = params; 
  }

  refresh(params?: any): boolean {
    return true;
  }

  editDetails() {
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

  viewDetails() {

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

  deleteRow() { }
  
}