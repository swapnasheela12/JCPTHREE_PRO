import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { inputRendererComponent } from 'src/app/core/components/ag-grid-renders/input-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  showFileUploadwidget = false;
  uploadedImg = []
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];



  constructor(public dialogRef: MatDialogRef<UploadDocumentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private httpClient: HttpClient, private datatable: TableAgGridService) {
   
  }

  ngOnInit(): void { }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files = file;
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.files);
  }

  fileName;
  uploadFile(file) {
    this.fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    let obj;
    if (file) {
       this.showFileUploadwidget = true;
      let url = `../../../../../../assets/images/logo/${this.fileName}`
      obj = {
        src: url,
        name: this.fileName
      }
      this.uploadedImg.push(obj);
    }
  }

  upload() {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


