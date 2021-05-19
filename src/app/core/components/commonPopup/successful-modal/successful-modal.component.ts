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
  selector: 'app-successful-modal',
  templateUrl: './successful-modal.component.html',
  styleUrls: ['./successful-modal.component.scss']
})
export class SuccessfulModalComponent {
  message;
  showActionBtn: boolean = true;
  showMyTasks: boolean = true;
  showDefaultActionBar: boolean = true;
  constructor(public dialogRef: MatDialogRef<SuccessfulModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log("data .....success", data);
    if (data.showActionBtn) {
      this.showActionBtn = false;
      this.showDefaultActionBar = false;
      this.message = data.message;
    } else if (data.showMyTasks) {
      this.showMyTasks = false;
      this.showDefaultActionBar = false;
    } else if(data.showDefaultActionBar) {
      this.showActionBtn = false;
      this.showMyTasks = false;
    }
    this.message = data.message;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    if (this.data.goToTask === "ShowMyTask") {
      this.router.navigate(['JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Task-Details']);
    }
    this.dialogRef.close();
  }

  clickOk() {
    this.dialogRef.close();
    this.router.navigate(["/JCP/Work-Orders/Nv-Workorders/Regulatory-Reporting"])
  }

  clickNo(): void {
    this.dialogRef.close();
  }
}
