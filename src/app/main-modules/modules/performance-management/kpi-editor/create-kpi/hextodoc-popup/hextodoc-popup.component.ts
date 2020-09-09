import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hextodoc-popup',
  templateUrl: './hextodoc-popup.component.html',
  styleUrls: ['./hextodoc-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HextodocPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HextodocPopupComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
