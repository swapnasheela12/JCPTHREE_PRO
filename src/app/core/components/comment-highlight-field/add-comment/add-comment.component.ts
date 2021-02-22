  import { Component, Inject, OnInit } from '@angular/core';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
  export interface DialogDataSuccessful {
    gotomyreportInterface: string;
    newreportInterface: string;
  }
  export interface DialogData {
    animal: string;
    name: string;
  }
  @Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.scss']
  })
  export class AddCommentComponent implements OnInit{
    message ="";
    showActionBtn: boolean = true;
    showMyTasks: boolean = true;

    constructor(public dialogRef: MatDialogRef<AddCommentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public datashare: DataSharingService,public dialog: MatDialog) {
      router.events.subscribe((url: any) => console.log(url));
    }
 
    ngOnInit() {
      console.log("adat", this.data )
    }
  
    closeDialog(): void {
      this.dialogRef.close(true);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    clickYes(): void {
      if(this.message != "") {
        console.log("comment is added forom add comp")
        this.datashare.addedComment({"message": this.message, element : this.data})
      }
      this.dialogRef.close();
    }
  
    clickNo(): void {
      this.dialogRef.close();
    }
  }
  
  
  
