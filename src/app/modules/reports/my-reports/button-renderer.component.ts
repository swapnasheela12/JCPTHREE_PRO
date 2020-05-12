import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: `
   <button mat-icon-button [matMenuTriggerFor]="aggridMenu" aria-label="Example icon-button with a menu">
  <mat-icon style="line-height: 0;"><span class="zmdi zmdi-more-vert"></span></mat-icon>
</button>
<mat-menu #aggridMenu="matMenu" class="aggridMenuPanelRender">
  <button mat-menu-item>
    <div class="pr-3 fas fa-trash-alt"></div>
    <span>Delete</span>
  </button>
  <button mat-menu-item disabled>
    <div class="pr-3 fas fa-download"></div>
    <span>Download</span>
  </button>
</mat-menu>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}