import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @Input('label')public label;
  @Input('value')public value;
  @Input('type')public type;
  @Input('id')public id;
  showCommentOnHover: boolean = false;
  removeSelect;
  editMode;
  checkComment = typeof(this.comment);
  showEditable: string;
  @ViewChild('field', {static: true}) public element;
  @ViewChild('myModal', {static: true}) public myModal;
  @ViewChild('tooltip', {static: true}) public tooltip;
  constructor(public dialog: MatDialog,private datashare: DataSharingService, private renderer : Renderer2) { }
  sapIdMapping = [
    {
      "label": "Circle",
      "value": "Mumbai"
    ,"type": "input" },
    {
      "label": "Site Name",
      "value": "I-MU-MUMB-ENB-4505"
    ,"type": "input" },
    {
      "label": "Site ID",
      "value": "MU-NVMB-JC24-0024"
    ,"type": "input" },
    {
      "label": "Priority",
      "value": "P1"
    ,"type": "input" },
    {
      "label": "Date of Survey",
      "value": "10 Oct 2020"
    ,"type": "input" },
    {
      "label": "Any Obstruction",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "Coordinates (Longitude)",
      "value": "78.852402"
    ,"type": "input" },
    {
      "label": "Coordinates (Latitude)",
      "value": "21.269661"
    ,"type": "input" },
    {
      "label": "Azimuth and height Details",
      "value": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  "
    ,"type": "input" },
    {
      "label": "Restricted area like Hospital, Airport, School(with in 100m)",
      "value": "No"
    ,"type": "input" },
    {
      "label": "Site Address",
      "value": "TC-23 RELIANCE CORPORATE PARK PHASE IV A- WING GATE NO A GHANSOLI 400701"
    ,"type": "input" },
    {
      "label": "Any Structure/Rooftop/Ground/Flyover within 20m distance",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "No. of Operators",
      "value": "2"
    ,"type": "input" },
    {
      "label": "Any other operator on same building",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "No. Of Floors",
      "value": "15"
    ,"type": "input" },
    {
      "label": "Tower/Pole Height (In Meters)",
      "value": "60"
    ,"type": "input" },
    {
      "label": "GPS Picture",
      "value": "assets/images/layer-settings/Small.png"
    ,"type": "image" },
    {
      "label": "Site Location Picture",
      "value": "assets/images/layer-settings/Small.png"
    ,"type": "image" },
    {
      "label": "Proposed Azimuth",
      "value": "2"
    ,"type": "input" },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
    ,"type": "input" },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
    ,"type": "input" },
    {
      "label": "Antenna Tilt",
      "value": "10"
    ,"type": "input" },
    {
      "label": "Proposed Azimuth",
      "value": "2"
    ,"type": "input" },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
    ,"type": "input" },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
    ,"type": "input" },
    {
      "label": "Antenna Tilt",
      "value": "10"
    ,"type": "input" },
    {
      "label": "Proposed Azimuth",
      "value": "2"
    ,"type": "input" },
    {
      "label": "Proposed Height (Meter)",
      "value": "60"
    ,"type": "input" },
    {
      "label": "Antenna Type",
      "value": "Lorem Ipsum is simply dummy text"
    ,"type": "input" },
    {
      "label": "Antenna Tilt",
      "value": "10"
    ,"type": "input" },
    {
      "label": "Panoramic Photos (Degree)",
      "value": "360"
    ,"type": "input" },
    {
      "label": "DG Space Availability Status",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "OD/ID Space Status",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "Battery Bank Space Available",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "360"
    ,"type": "input" },
    {
      "label": "Mount Required",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "RF Agreed AGL (In Meters)",
      "value": "30"
    ,"type": "input" },
    {
      "label": "Mount Required",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "No. of Mounts req (If applicable)",
      "value": "Yes"
    ,"type": "input" },
    {
      "label": "MW Antenna Height Given by Infra Check",
      "value": "Yes"
      ,"type": "input" },
    {
      "label": "Nearby 5 Sites ID",
      "value": "I-MU-MUMB-ENB-4505"
      ,"type": "input" }
  ]


  ngOnInit(): void {
    this.datashare.addCommentSource.subscribe((data: any) => {
      this.comment = data.message;
    });
    this.datashare.currentMessage.subscribe((data:any) => {
      this.removeSelect = data.perform;
      if(this.removeSelect === "remove-selection") {
        this.element.nativeElement.style.border = "none";
       }
    });
    this.datashare.toggleEditModeSource.subscribe((data: any) => {
      this.showEditable = data;
      if(this.showEditable === "Make Editable") {
        this.editMode = true
      } else {
        this.editMode = false;
        this.element.nativeElement.style.border = "none";
      }     
    });
  }

  addSelection() {
    console.log(this.element);
    if(this.showEditable === "Make Editable") {
      this.editMode = true;
      this.showSelection = true;
      this.element.nativeElement.style.border = "1.5px solid red";
      this.element.nativeElement.style.position = "relative";
      this.element.nativeElement.style.paddingLeft = "3px";
      sessionStorage.setItem("lastname", "Smith");
      this.sapIdMapping[this.id - 1]["editable"] = true;
      this.sapIdMapping[this.id - 1]["comment"] = this.comment;
    } else {
      this.editMode = false;
      this.showSelection = false;
      this.element.nativeElement. style.border = "none";

    }

    console.log(sessionStorage)
  }

  threeDotSelection() {
    if(this.comment && this.comment != "") {
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
   if(this.comment && this.comment != "") {
    this.showTooltip =  true;
    //this.showSelection = false;
   } else {
    this.showTooltip =  false;
   }
  }
  mouseOut() {
    this.showTooltip =  false;
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
    this.comment =  this.message;
    this.myModal.nativeElement.style.display = "none";
  }
}
