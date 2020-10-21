import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SuccessfulModalComponent } from 'src/app/core/components/commanPopup/successful-modal/successful-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pin-zoom',
  templateUrl: './pin-zoom.component.html',
  styleUrls: ['./pin-zoom.component.scss']
})
export class PinZoomComponent implements OnInit {
  pinGroupDetails = this.fb.group({
    pinName: ['Lorem Ipsum'],
    latitude: ['27.2048° N'],
    longitude: ['77.4975° E'],
    comment: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'],
    newGroup: [false],
    existingGroup: [true],
    groupName: ['ConvertCSV']
  });
  @Output() public pinZoomClosed = new EventEmitter();
  constructor(private dataShare: DataSharingService, private dialogRef: MatDialogRef<PinZoomComponent>,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data?: any,
  ) {
  }

  private inited;
  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dataShare.changeMessage("pin-zoom-closed");
      this.dialogRef.close();
    }
  }

  deletePin() {
    if (this.pinGroupDetails.value) {
      this._snackBar.open('Please Complete the form', "", {
        duration: 2000,
        verticalPosition: 'top'
      });
    } else {
      this.dataShare.changeMessage("pin-zoom-closed");
      this.dialogRef.close();
    }

  }

  createNewPinDetails() {
    this.dialogRef.close();
  }

  saveNewPin() {
    this.dialogRef.close();
    this.dataShare.changeMessage(this.pinGroupDetails.value);
    const message = {
      message: `Pin group created successfully.`,
      showActionBtn: false
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

}
