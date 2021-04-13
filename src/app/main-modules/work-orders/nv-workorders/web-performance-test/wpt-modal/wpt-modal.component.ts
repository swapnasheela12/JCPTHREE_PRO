import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wpt-modal',
  templateUrl: './wpt-modal.component.html',
  styleUrls: ['./wpt-modal.component.scss']
})
export class WptModalComponent implements OnInit {
  iMEIs = [ "Rahul49.singh@ril.com", "yogeshwar.bargal@ril.com", "Priyanshi.asawara@ril.com",
"prempraksh.b@ril.com", "Rohit.malviya@ril.com"];
  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<WptModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
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

}
