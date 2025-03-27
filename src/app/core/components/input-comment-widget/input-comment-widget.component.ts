import { Component, Input, Output, OnInit, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AddCommentComponent } from '../comment-highlight-field/add-comment/add-comment.component';


@Component({
  selector: 'app-input-comment-widget',
  templateUrl: './input-comment-widget.component.html',
  styleUrls: ['./input-comment-widget.component.scss']
})
export class InputCommentWidgetComponent implements OnInit {
  // label: string = "Name";
  // value: string = "Pooja Das"
  showSelection: boolean = false;
  comment = "";
  message = "";
  addNewComment: boolean = true;
  editAddedComment: boolean = false;
  showTooltip: boolean = false;
  @Input('rejectionFormData') public rejectFormField;
  @Input('label') public label;
  @Input('value') public value;
  @Input('type') public type;
  @Input('id') public id;
  @Output('state') state = new EventEmitter();
  showCommentOnHover: boolean = false;
  removeSelect;
  editMode;
  checkComment = typeof (this.comment);
  showEditable: string;
  @ViewChild('field', { static: true }) public element;
  @ViewChild('myModal', { static: true }) public myModal;
  @ViewChild('tooltip', { static: true }) public tooltip;
  constructor(public dialog: MatDialog, private datashare: DataSharingService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.datashare.addCommentSource.subscribe((data: any) => {
      this.comment = data.message;
    });
    this.datashare.currentMessage.subscribe((data: any) => {
      this.removeSelect = data.perform;
      if (this.removeSelect === "remove-selection") {
        this.element.nativeElement.style.border = "none";
      }
    });
    this.datashare.toggleEditModeSource.subscribe((data: any) => {
      this.showEditable = data;
      if (this.showEditable === "Make Editable") {
        this.editMode = true
      } else {
        this.editMode = false;
        this.element.nativeElement.style.border = "none";
      }
    });
  }

  addSelection() {
    console.log(this.element);
    if (this.showEditable === "Make Editable") {
      this.editMode = true;
      this.showSelection = true;
      this.element.nativeElement.style.border = "1.5px solid red";
      this.element.nativeElement.style.position = "relative";
      this.element.nativeElement.style.paddingLeft = "3px";
      // sessionStorage.setItem("lastname", "Smith");
      // this.sapIdMapping[this.id - 1]["editable"] = true;
      // this.sapIdMapping[this.id - 1]["comment"] = this.comment;
      this.state.emit({
        isEditable: true,
        element: this.element,
        addedComment: this.comment
      })
    } else {
      this.editMode = false;
      this.showSelection = false;
      this.element.nativeElement.style.border = "none";
    }
    console.log(sessionStorage)
  }

  threeDotSelection() {
    if (this.comment && this.comment != "") {
      this.editAddedComment = true;
      this.addNewComment = false;
    } else {
      this.editAddedComment = false;
      this.addNewComment = true;
      this.comment = "";
      this.message = "";
    }
  }
  onHover() {
    if (this.comment && this.comment != "") {
      this.showTooltip = true;
      //this.showSelection = false;

      this.datashare.changeMessage({
        isEditable: true,
        // element: this.element,
        addedComment: this.comment,
        id: this.id
      });
    } else {
      this.showTooltip = false;
    }
  }
  mouseOut() {
    this.showTooltip = false;
  }

  addComment() {
    this.myModal.nativeElement.style.display = "block";
  }

  editComment() {
    this.myModal.nativeElement.style.display = "block";
  }

  clickNo() {
    this.myModal.nativeElement.style.display = "none";
  }

  closeModal() {
    this.myModal.nativeElement.style.display = "none";
  }

  removeSelection(evt) {
    this.showSelection = false;
    this.element.nativeElement.style.border = "none";
    this.element.nativeElement.classList.remove('input-comment-wrapper');
    this.comment = "";
  }

  addCommentToTooltip() {
    this.element.nativeElement.classList.add('input-comment-wrapper');
    this.comment = this.message;
    this.myModal.nativeElement.style.display = "none";
  }
}
