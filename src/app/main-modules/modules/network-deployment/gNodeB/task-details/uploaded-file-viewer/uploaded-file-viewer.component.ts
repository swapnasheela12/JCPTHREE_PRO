import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploaded-file-viewer',
  templateUrl: './uploaded-file-viewer.component.html',
  styleUrls: ['./uploaded-file-viewer.component.scss']
})
export class UploadedFileViewerComponent implements OnInit {
  sitesimages = [{
    imageurl: "assets/images/Layers/sites-expand/sitesexpand2.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand3.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand4.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand6.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand7.jpg"
  }, {
    imageurl: "assets/images/Layers/sites-expand/sitesexpand8.jpg"
  }
  ];
  constructor(public dialogRef: MatDialogRef<UploadedFileViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
