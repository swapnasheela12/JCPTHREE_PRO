import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable, Observer} from 'rxjs';
import { Router } from '@angular/router';
import { CreateReportComponent } from 'src/app/main-modules/reports-dashboards/reports-wizard/create-report/create-report.component';

export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessfulComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSuccessful,private router: Router, public dialog: MatDialog) { 
      router.events.subscribe((url: any) => console.log(url));
      console.log(router.url)
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickGoMyReport(): void{
    this.dialogRef.close();
    this.router.navigate(['/JCP/Reports-and-Dashboard/My-Reports']);
  }

  animal: string;
  name: string;
  clickCreateNewReport(): void{
    this.dialogRef.close();
    const dialogRef = this.dialog.open(CreateReportComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }


}
