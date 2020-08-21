import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-screenshot-preview',
  templateUrl: './screenshot-preview.component.html',
  styleUrls: ['./screenshot-preview.component.scss']
})
export class ScreenshotPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ScreenshotPreviewComponent>,public dialog: MatDialog) { 
    setTimeout(() => {
      var img: any = document.createElement('img');

      img.src = this.data.imageDataURL;
      var imgDiv = document.getElementById('screens').prepend(img);
      $('img').addClass('MyClass');

    }, 2000);
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

} 