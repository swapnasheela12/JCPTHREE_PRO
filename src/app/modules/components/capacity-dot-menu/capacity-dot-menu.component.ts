import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
//import { CommonPopupComponent, CommonDialogModel } from '../../../../../core/components/commanPopup/common-popup/common-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
@Component({
  selector: 'app-capacity-dot-menu',
  templateUrl: './capacity-dot-menu.component.html',
  styleUrls: ['./capacity-dot-menu.component.scss']
})
export class CapacityDotMenuComponent implements ICellRendererAngularComp  {
  params;
  enabled: Boolean;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params): void {
    this.params = params;
    // this.datashare.checkboxMessage.subscribe((checkbox) => {
    //   this.dataTest = checkbox;
    };
  }



