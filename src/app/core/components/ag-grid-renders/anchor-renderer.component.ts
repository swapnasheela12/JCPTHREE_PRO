import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { EquipmentComponent } from 'src/app/main-modules/main-layer/layer-list/topologies/fibre/logicaltopology/logical-topology-spider-view/equipment/equipment.component';
import { StructureComponent } from 'src/app/main-modules/main-layer/layer-list/topologies/fibre/logicaltopology/logical-topology-spider-view/structure/structure.component';


@Component({
  selector: 'anchor-renderer',
  template: `
  <a  title="anchorlink" class="anchor" (click)="anchorClick($event)">{{params.value}}</a>
  `,
  styles: [
    `
    .anchor {
      border-bottom: 1px dotted #0070db;
      color: #0070db !important;
      cursor: pointer;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class AnchorRendererComponent implements ICellRendererAngularComp {
  params;
  enabled: Boolean;
  dataTest: any = false;
  routerLink: string = "";

  constructor(public dialog: MatDialog, public datashare: DataSharingService) { }

  agInit(params): void {
    console.log("param", params)
    this.params = params;
  }

  refresh(): boolean {
    return true;
  }

  openWarningDialog(): void {
    const message = `Are you Sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Action Performed Successfully';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  deleteRow(evt) {
    let deletedRow = this.params.node.data;
    this.params.api.updateRowData({ remove: [deletedRow] })
  }

  anchorClick(evt) {
    if (this.params.data.hasOwnProperty("RJ_STRUCTURE_TYPE")) {
      this.routerLink = "";
      const dialogRef = this.dialog.open(EquipmentComponent, {
        width: "75vw",
        height: "90vh",
        maxWidth: "97vw",
        panelClass: "material-dialog-container",
      });


    } else if (this.params.data.hasOwnProperty("rjEquipmentRJID")) {
      this.routerLink = "";
      this.dialog.open(StructureComponent, {
        width: "75vw",
        height: "90vh",
        maxWidth: "97vw",
        panelClass: "material-dialog-container",
      });
    }
  }
}