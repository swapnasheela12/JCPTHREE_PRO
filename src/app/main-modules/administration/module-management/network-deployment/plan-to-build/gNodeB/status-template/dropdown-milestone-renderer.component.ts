import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'dropdown-renderer',
  template: `
  
    <mat-form-field class="form-field-selected-query" style="width: 75%;">
    <mat-select disableOptionCentering [(value)]="milestone[0]"
    style="font-family: lato Regular; font-size: 14px;" [disabled]="disable">
    <mat-option class="sector-title" *ngFor="let mile of milestone" [value]="mile">
        {{mile}}</mat-option>
</mat-select>
    </mat-form-field>
    `,
  styles: [
    `

    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class dropdownMilestoneRendererComponent implements ICellRendererAngularComp, OnInit {
  params: any;
  label: string;
  selectedColor: string;
  milestone = [ "Nominal Finalisation" , "Nominal Finalisation"];
  task = ["Assignment of Proposed Nominal", "Assignment of Proposed Nominal"];
  disable: boolean = true;

  constructor(public datashare: DataSharingService) {

  }
   agInit(params): void {
    this.selectedColor = params.data.ptype;
    this.params = params;
    console.log("patra", params);
    this.label = this.params.label || null;
  }

  ngOnInit() {
    this.datashare.currentMessage.subscribe((data: any) => {
      if (data.type === "edit") {
        this.disable = false;
      }
    })
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

  colors = ['P1', 'P2', 'P3'];

  onChange(value) {
    this.selectedColor = value;
  }

}