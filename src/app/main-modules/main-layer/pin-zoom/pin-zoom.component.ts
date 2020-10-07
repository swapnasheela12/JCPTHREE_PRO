import { Component, OnInit, Inject, ViewChild, TemplateRef, ViewContainerRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NavigationSettingsService } from 'src/app/_services/navigation-settings/navigation-settings.service';
import { LeftsideSettingsModelsData } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-data.model';
import { NavigationSettingsFactoryService } from 'src/app/_services/navigation-settings/navigation-settings-factory.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LeftsideSettingsModelsOptions } from 'src/app/core/components/leftside-settings-popup/leftside-settings-models/leftside-settings-models-options.model';
import { THEMATIC_LIST, HOVER_LIST } from 'src/app/core/components/leftside-settings-popup/leftside-settings-popup.constant';
import { Options } from 'ng5-slider/options';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-pin-zoom',
  templateUrl: './pin-zoom.component.html',
  styleUrls: ['./pin-zoom.component.scss']
})
export class PinZoomComponent implements OnInit {
  pinGroupDetails = this.fb.group({
    pinName: ['Lorem Ipsum'],
    latitude: ['27.2048° N'],
    longitude: ['77.4975° E'],
    comment: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'],
    newGroup: [false],
    existingGroup: [true],
    groupName: ['ConvertCSV']
  });
  constructor(private dialogRef: MatDialogRef<PinZoomComponent>, public dialog: MatDialog,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data?: any,
  ) {
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

  createNewPinDetails() {
    console.log("this.user", this.pinGroupDetails.value);
  }

}
