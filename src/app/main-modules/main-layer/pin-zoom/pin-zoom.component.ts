import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

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
  constructor(private dataShare: DataSharingService, private dialogRef: MatDialogRef<PinZoomComponent>, public dialog: MatDialog,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data?: any,
  ) {
  }

  private inited;
  ngOnInit(): void {
    console.log(this.data);
    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  createNewPinDetails() {
    console.log("this.user", this.pinGroupDetails.value);
    this.dataShare.changeMessage(this.pinGroupDetails.value);
  }

}
