import { Component, ViewEncapsulation } from '@angular/core';
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
  params;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }
}
