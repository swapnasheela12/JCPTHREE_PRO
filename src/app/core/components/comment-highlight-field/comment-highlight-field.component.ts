import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AddCommentComponent } from './add-comment/add-comment.component';

@Component({
  selector: 'app-comment-highlight-field',
  templateUrl: './comment-highlight-field.component.html',
  styleUrls: ['./comment-highlight-field.component.scss']
})
export class CommentHighlightFieldComponent implements OnInit {
  addedComment: string = "";
  showCommentField =  false;
  showThreeDotsWidget= true;
  element;
  form = "assets/data/modules/network_deployment/gNodeB/registry.json";

  elements =  [];
  constructor(public dialog: MatDialog,private dataShare: DataSharingService) {
    console.log("directive is triggered")
   }

  ngOnInit(): void {
    // this.dataShare.elementSource.subscribe((data: any) => {
    //   if(data.element) {
    //     this.element = data; 
    //     this.form = data.formdata; 
    //     let index = Number(data.element.nativeElement.id);
    //     this.form[index]["element"] = data.element
          
    //   }

    //  console.log("data.formdata", this.form) 
    //  console.log("data.element", data.element); 
    // });
    // let elementAdded = {element: this.element.element.nativeElement, id: this.element.element.nativeElement.id}
    // this.elements.push(elementAdded);
    // console.log("this.elements", this.elements)
  }

  addComment() {
    this.dialog.open(AddCommentComponent, {
      width: "470px",
      height: "218px",
      panelClass: "material-dialog-container",
      data: this.element
    });
  }

  removeSelection() {
    this.dataShare.changeMessage({perform: "remove-selection", element: this.element});
  }
}
