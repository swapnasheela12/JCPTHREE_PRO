import { Component, Inject, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { SuccessfulModalComponent } from '../successful-modal/successful-modal.component';
@Component({
  selector: 'app-file-upload-popup',
  templateUrl: './file-upload-popup.component.html',
  styleUrls: ['./file-upload-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadPopupComponent {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  kpiGroupFormControl: FormGroup;
  title: string;
  showExample: boolean;
  fileName: string;
  showFileDownload = true;
  showCSVText = false;
  uploadFile(file) {
    this.fileName = file.data.name;
    const formData = new FormData();
    formData.append('file', file.data);
    this.fileUploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError(() => {
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
        }
      });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      console.log("file", file)
      this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }
  constructor(
    private fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<FileUploadPopupComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: fileUploadPopupModel
  ) {
    console.log(data);
    this.title = data.title;
    this.showExample = data.showExample;
    this.showFileDownload = data.showFileDownload;
    this.showCSVText = data.showCSVText;
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  uploadAndClose(): void {
    if(this.data.title === "Upload Call Plan(s)") {
      const message = {
        message: `Call Plan Uploaded Successfully`,
        showDefaultActionBar: true,
        navigation: "CALL_PLAN"
      }
      this.dialog.open(SuccessfulModalComponent, {
        data: message,
      });
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close('uploadClicked');
    }
  }

}
export class fileUploadPopupModel {
  constructor(
    public title: string,
    public showExample: boolean,
    public showFileDownload?: boolean,
    public showCSVText?: boolean
  ) {
  }
}