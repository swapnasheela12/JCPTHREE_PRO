import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-wostatus',
  template: ` 
  <button class="success-button" *ngIf="show">{{status}}</button>
  <button class="progress-button" *ngIf="!show">{{status}}</button>
  `,
  styles: [`.success-button {
    background-color: #60DD5C;
    width: 72px;
    height: 24px;
    margin-top: 10px;
    border-radius: 4px;
    border: none;
    padding: 0px;
    line-height: 2;
    color: white;
}
.progress-button {
  background-color: #F8C93A;
  width: 72px;
  height: 24px;
  margin-top: 10px;
  border-radius: 4px;
  border: none;
  padding: 0px;
  line-height: 2;
  color: white;`]
})
export class WostatusComponent implements ICellRendererAngularComp {
  params;
  status: string;
  inprogress: boolean = false;
  successful: boolean = false;
  show: boolean;

  agInit(params): void {
    this.params = params
    this.status = this.params.data.status;
    this.status = this.params.data.status || null;
    if (this.params.data.status === "Successful") {
      this.show = true;
    } else if (this.params.data.status === "In Progress") {
      this.show = false;
    }
  }

  refresh(params?: any): boolean {
    return true;
  }
}
