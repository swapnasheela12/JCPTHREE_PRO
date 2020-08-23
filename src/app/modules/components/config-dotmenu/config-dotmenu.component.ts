import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { HistoryPopupComponent } from '../configuration/history-popup/history-popup.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { InfoPopupComponent } from '../configuration/info-popup/info-popup.component'
@Component({
  selector: 'app-config-dotmenu',
  templateUrl: './config-dotmenu.component.html',
  styleUrls: ['./config-dotmenu.component.scss']
})
export class ConfigDotmenuComponent implements ICellRendererAngularComp {
public frameworkComponentsConfigmenu;

constructor(public matDialog: MatDialog, public matselect: MatSelectModule, public datashare: DataSharingService,


  private http: HttpClient, public dialogRef: MatDialogRef<HistoryPopupComponent>


) {
}
  ngOnInit(): void {
  }
  params;
  enabled: Boolean;
  public showGlobalOperation: Boolean = false;

  refresh(params?: any): boolean {
    return true;
  }


 
  agInit(params): void {
    this.params = params;
   
    };
  
    openDialogHistory(): void {
      const dialogRef = this.matDialog.open(HistoryPopupComponent, {
        width: "850px",
        panelClass: "material-dialog-container",
       
      });
  
     
    };
  
  
    openDialogInfo(): void {
      const dialogRef = this.matDialog.open(InfoPopupComponent, {
        width: "500px",
        panelClass: "material-dialog-container",
      
      });
  
   
  
    };
  
    close() {
      this.dialogRef.close();
    }
  
}
