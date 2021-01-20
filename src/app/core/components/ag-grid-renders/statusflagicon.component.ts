import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPopupComponent } from '../../../modules/components/capacity/question-popup/question-popup.component'

@Component({
  selector: 'app-genhelpicon',
  template: `<div class="icon-help icon-button" id="helpicon-render" (click)="openDialoghelp()">
  <div [ngStyle]="{'color': flagStatus=='completed'? '#11D800' : '#D80000'}" class="zmdi zmdi-flag"></div>
  <!-- <div ng-class="{red: flagStatus == 'Not completed', green: flagStatus == 'completed'}" class="zmdi zmdi-flag"></div> -->
</div>`,
  styles: [` .icon-button {
    float: right;
    padding: 0px 11px;
    font-size: 18px;
    text-align: center;
    width: 50px !important;
    height: 50px !important;
    border-radius: 25px;
    background: none;
}

.red {
    color: #D80000; 
}

.green {
    color: #11D800;
}

.zmdi-help {
    font-size: 20px;
    color:#777777;
}`  ]
})
export class statusflagiconRenderComponent {

  constructor(public dialog: MatDialog) { }
  params;
  public flagStatus;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }

  agInit(params): void {
    this.params = params;
    console.log(this.params,"this.params");
    this.flagStatus=params.data.flag;
  };

  openDialoghelp(): void {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: "500px",
      height: "350px",
      panelClass: "material-dialog-container",
    });
  };
}
