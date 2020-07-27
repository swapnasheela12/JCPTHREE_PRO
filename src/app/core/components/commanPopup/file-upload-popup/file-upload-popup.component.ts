import { Component, OnInit, Inject, ViewChild, ViewEncapsulation, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadService } from  'src/app/_services/file-upload.service';
import { takeUntil,  catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
@Component({
  selector: 'app-file-upload-popup',
  templateUrl: './file-upload-popup.component.html',
  styleUrls: ['./file-upload-popup.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class FileUploadPopupComponent{
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  kpiGroupFormControl: FormGroup;
  title: string;
  fileName;
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
      catchError((error: HttpErrorResponse) => { 
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
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
   const file = fileUpload.files[0];  
   this.files.push({ data: file});  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}
  constructor(
    private fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<FileUploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: fileUploadPopupModel
  ) {
    this.title = data.title;
  }
  ngOnInit(): void {}
  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
export class fileUploadPopupModel {
  constructor(
    public title: string, 
    ) {
  }
}