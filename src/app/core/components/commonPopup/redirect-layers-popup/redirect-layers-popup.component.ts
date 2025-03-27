import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-redirect-layers-popup',
  templateUrl: './redirect-layers-popup.component.html',
  styleUrls: ['./redirect-layers-popup.component.scss']
})
export class RedirectLayersPopupComponent {

  constructor(public datashare :DataSharingService, public dialogRef: MatDialogRef<RedirectLayersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSuccessful, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url);
    console.log("data>>>>>??????", data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickGoMyReport(): void {
    this.dialogRef.close(this.data);
    this.datashare.changeMessageDialog(this.data);
    this.router.navigate(['/JCP/Layers']);
  }

  animal: string;
  name: string;
  clickCreateNewReport(): void {
    this.dialogRef.close();
    // const dialogRef = this.dialog.open(CreateReportComponent, {
    //   width: "700px",
    //   panelClass: "material-dialog-container",
    //   data: { name: this.name, animal: this.animal }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.animal = result;
    // });
  }

}
