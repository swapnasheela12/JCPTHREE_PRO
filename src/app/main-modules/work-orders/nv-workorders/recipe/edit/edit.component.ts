import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedDevice= "123456678";
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  saveRow() {
    this.dialogRef.close();
    const message = {
      message: `Workorder assigned Successfully.`,
      showDefaultActionBar: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
