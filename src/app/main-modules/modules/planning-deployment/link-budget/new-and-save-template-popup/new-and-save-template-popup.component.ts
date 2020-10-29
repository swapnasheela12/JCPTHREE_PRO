import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarToastComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';

import { dropdown, ClutterType, City } from './dropdown-value';

@Component({
  selector: 'app-new-and-save-template-popup',
  templateUrl: './new-and-save-template-popup.component.html',
  styleUrls: ['./new-and-save-template-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewAndSaveTemplatePopupComponent implements OnInit {
  title: string;
  newSaveTempFormControl: FormGroup;
  notKnownYet = FormControl;
  cityName: string = "Mumbai";
  clutterTypeName: string = "DU";
  additionalValue: string = "";
  inputValue: string = this.cityName + "_" + this.clutterTypeName;
  finalValue: string;
  protected _onDestroy = new Subject<void>();
    // Clutter Type Dropdown 
    @ViewChild('clutterTypeControlSelect') clutterTypeControlSelect: MatSelect;
    protected clutterTypeData = ClutterType;
    public clutterTypeControl: FormControl = new FormControl();
    public clutterTypeFilterControl: FormControl = new FormControl();
    public clutterTypeFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
    // Clutter Type Dropdown 

     // City Dropdown
  @ViewChild('cityControlSelect') cityControlSelect: MatSelect;
  protected cityData = City;
  public cityControl: FormControl = new FormControl();
  public cityFilterControl: FormControl = new FormControl();
  public cityFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // City Dropdown 
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewAndSaveTemplatePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: NewAndSaveTemplatePopupModel, private datashare: DataSharingService,  private _snackBar: MatSnackBar) {
    this.title = data.title;
  }

  onCityChanged(item) {
    console.log(item.value.name)
    this.cityName = item.value.name;
    this.inputValue = this.cityName + "_" + this.clutterTypeName
  }
  onClutterTypeChanged(item) {
    console.log(item)
    this.clutterTypeName = item.value.name;
    this.inputValue = this.cityName + "_" + this.clutterTypeName
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
    // Clutter Type Dropdown 
    this.clutterTypeControl.setValue(this.clutterTypeData[0]);
    this.clutterTypeFilter.next(this.clutterTypeData.slice());
    this.clutterTypeFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.clutterTypeData,
          this.clutterTypeFilterControl,
          this.clutterTypeFilter
        );
      });
    // Clutter Type Dropdown 

    // City Dropdown 
    this.cityControl.setValue(this.cityData[0]);
    this.cityFilter.next(this.cityData.slice());
    this.cityFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.cityData,
          this.cityFilterControl,
          this.cityFilter
        );
      });
    // City Dropdown 
  }
  protected filterData(listData, filterCtrl, filterSubject) {
    if (!listData) {
      return;
    }

    let search = filterCtrl.value;
    if (!search) {
      filterSubject.next(
        listData.slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }

    filterSubject.next(
      listData.filter(
        data => data.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
export class NewAndSaveTemplatePopupModel {
  constructor(
    public title: string
  ) {
  }
}