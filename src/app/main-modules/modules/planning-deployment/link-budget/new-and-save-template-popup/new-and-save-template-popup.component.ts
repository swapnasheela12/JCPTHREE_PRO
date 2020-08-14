import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarToastComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';

@Component({
  selector: 'app-new-and-save-template-popup',
  templateUrl: './new-and-save-template-popup.component.html',
  styleUrls: ['./new-and-save-template-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewAndSaveTemplatePopupComponent implements OnInit {
  title: string;
  newSaveTempFormControl: FormGroup;
  stateCityName;
  notKnownYet = FormControl;
  stateCityModel: string = "Mumbai";
  subName: string = "DU";
  additionalValue: string;
  inputValue: string = this.stateCityModel + "_" + this.subName;
  finalValue: string;
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewAndSaveTemplatePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: NewAndSaveTemplatePopupModel, private datashare: DataSharingService,  private _snackBar: MatSnackBar) {
    this.title = data.title;
  }

  onStateCityChanged(item) {
    console.log(item)
    this.stateCityModel = item;
    this.inputValue = this.stateCityModel + "_" + this.subName
  }
  onSubNameChanged(item) {
    console.log(item)
    this.subName = item;
    this.inputValue = this.stateCityModel + "_" + this.subName
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  doneButton(): void {
    this.finalValue = this.inputValue + this.additionalValue;
    this.dialogRef.close(this.finalValue);
    this.datashare.templateGalleryValue(this.finalValue)
  }
  saveButton(item): void {
    this.dialogRef.close();
    this._snackBar.openFromComponent(snackBarToastComponent, {
      duration: 4000,
      data: {
        snackbarMode: "success",
        snackbarText: "Success: Template " + item + " saved Successfully.",
      },
      panelClass: ["success"]
    });
  }
  ngOnInit(): void {
  }

}
export class NewAndSaveTemplatePopupModel {
  constructor(
    public title: string
  ) {
  }
}