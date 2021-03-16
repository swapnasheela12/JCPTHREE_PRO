import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
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
    "Candidate ID", "SAP ID"
  ];
  remark = ["Lorem Ipsum is simply dummy text of the printing and typesetting",
    "Lorem Ipsum is simply dummy text of the printing and typesetting"];
  constructor(public dialogRef: MatDialogRef<RejectTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datashare: DataSharingService
    , private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
  }

  makeFormEditable() {
    this.dialogRef.close();
    this.datashare.changeMessage("Make Editable");
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
  }

  rejectForm(): void {
    this.dialogRef.close();
    const message = {
      message: `Candidate Rejected successfully.`,
      goToTask: 'ShowMyTask',
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }
}


