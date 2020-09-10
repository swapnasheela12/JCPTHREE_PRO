import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPopupComponent } from '../../../../app/modules/components/capacity/question-popup/question-popup.component'

@Component({
  selector: 'app-genhelpicon',
  template: `<div   class="icon-help icon-button" id="helpicon-render" (click)="openDialoghelp()">
  <div class="zmdi zmdi-help"></div>
</div>`,
  styles: [` .icon-button {
    float: right;
    padding: 10px 11px;
    text-align: center;
    width: 50px !important;
    height: 50px !important;
    border-radius: 25px;
    background: none;
}

.zmdi-help {
    font-size: 20px;
    color:#777777;
}`  ]
})
export class GenhelpiconComponent {

  constructor(public dialog: MatDialog) { }
  params;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }

  agInit(params): void {
    this.params = params;
  };

  openDialoghelp(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: "500px",
      height: "350px",
      panelClass: "material-dialog-container",
    });
  };
}
