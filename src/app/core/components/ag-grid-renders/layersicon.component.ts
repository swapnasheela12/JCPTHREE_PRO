import { style } from '@angular/animations';
import { RedirectLayersPopupComponent } from './../commonPopup/redirect-layers-popup/redirect-layers-popup.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPopupComponent } from '../../../modules/components/capacity/question-popup/question-popup.component'

@Component({
  selector: 'app-genhelpicon',
  template: `<div class="icon-help icon-button" id="helpicon-render" (click)="openDialoghelp()">
  <!-- <div [ngStyle]="{'color': flagStatus=='completed'? '#11D800' : '#D80000'}" class="zmdi zmdi-flag"></div> -->
  <div style="color:#707070;" class="ic ic-layers-01"></div>
  <!-- <div ng-class="{red: flagStatus == 'Not completed', green: flagStatus == 'completed'}" class="zmdi zmdi-flag"></div> -->
</div>`,
  styles: [` .icon-button {
    /* float: right; */
    padding: 15px 10px;
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

.blue{
  color: #002AD8;
}

.zmdi-help {
    font-size: 20px;
    color:#777777;
}`  ]
})
export class layersIconRenderComponent {

  constructor(public dialog: MatDialog) { }
  public params;
  public flagStatus;
  public numberFalgId;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }

  agInit(params): void {
    this.params = params;
    this.flagStatus = params.data.flag;
    this.numberFalgId = params.data.flagid;
  };

  public dataPolygon = {
    'checked': false,
    'name': 'Polygon_Mum_1 - ',
    'date': '20 th Nov 2020',
    'polydata': {
      "type": "Feature",
      "properties": {
        "shape": "Rectangle",
        "name": "Unnamed Layer",
        "category": "default"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [19.045527, 72.902422],
          [19.045527, 72.905597],
          [19.049482, 72.905597],
          [19.049482, 72.902422],
          [19.045527, 72.902422]

        ]
      },
      "id": "15f0843f-24c2-4cce-8d73-b2b79c769eb5"
    }
  }



  openDialoghelp(): void {
    // const dialogRef = this.dialog.open(QuestionPopupComponent, {
    //   width: "500px",
    //   height: "350px",
    //   panelClass: "material-dialog-container",
    // });
    const dialogRef = this.dialog.open(RedirectLayersPopupComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { transferDataPoly: this.dataPolygon, headerNominal: true }
    });

    dialogRef.afterClosed().subscribe(result => {

      // this.gotomyreport = result;
    });
  };

  getColor(mycolor: string): string {
    switch (mycolor) {
      case 'Not completed': return '#D80000';
      case 'completed': return '#11D800';
      case 'In Process': return '#FFD700'
      case 'other': return '#777777'
    }
  }

  // colorFlag(mycolorid: number): string {
  //   let color = '';
  //   switch (mycolorid) {
  //     case 1: color = 'lightgray'; break;
  //     case 2: color = 'lightblue'; break;
  //     case 3: color = 'orange'; break;
  //     case 4: color = 'yellow'; break;
  //     case 5: color = '#11D800'; break;
  //     case 6: color = 'purple'; break;
  //     case 7: color = 'gray'; break;
  //     case 8: color = '#002AD8'; break;
  //     case 9: color = '#D80000'; break;
  //     case 10: color = 'black'; break;
  //   }
  //   return color;
  // }

}
