import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-reject-task',
  templateUrl: './reject-task.component.html',
  styleUrls: ['./reject-task.component.scss']
})
export class RejectTaskComponent {
  message;
  showActionBtn: boolean = true;
  showMyTasks: boolean = true;

  reject = [
    "Digital Form", "SAP ID"
  ];
  remark = [ "Lorem Ipsum is simply dummy text of the printing and typesetting",
"Lorem Ipsum is simply dummy text of the printing and typesetting"];
  constructor(public dialogRef: MatDialogRef<RejectTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private datashare: DataSharingService
    , private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));

    // if (!data.showActionBtn) {
    //   this.showActionBtn = false;
    //   this.message = data.message;
    // } else if (!data.showMyTasks) {
    //   this.showMyTasks = false;
    // }
    // this.message = data.message;

  }

  makeFormEditable() {
    this.datashare.toggle("Make Editable");
  }
  

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
  }

  clickNo(): void {
    this.dialogRef.close();
  }
}


