import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-textfield',
  template: `
      <div class="flex" fxFlex="100">
           <input value="" style="width: 100%; border: 0px; border-bottom: 1px solid lightgray; height: 34px;">
      </div>
    `,
  encapsulation: ViewEncapsulation.None
})
export class TextfieldComponent implements ICellRendererAngularComp {

  constructor() { }

  ngOnInit(): void {
  }
  params;
  // <mat-form-field fxFlex="100" style="max-width: 100%">
  //    <input type="text"  value="' + params.value + '" aria-label="NewValue">
  //   </mat-form-field>


  agInit(params): void {
    this.params = params;
    console.log(params)
    // this.columnName = params.column.colDef.headerName;
    // this.rowIndex = params.rowIndex;
    // this.daysImprovementVal = this.daysImprovementList[this.rowIndex];
  }

  refresh(params?: any): boolean {
    return true;
  }


}
