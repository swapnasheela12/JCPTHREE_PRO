import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarToastComponent } from 'src/app/core/components/commanPopup/common-popup/common-popup.component';

interface templateDropdown {
  name: string;
}

var TEMPLATE_GALLERY: templateDropdown[] = [
  { name: 'MUMBAI_SU' },
  { name: 'MUMBAI_RU', },
  { name: 'PUNE_DU' },
  { name: 'PUNE_SU' },
  { name: 'PUNE_RU' },
  { name: 'MUMBAI_DU' }
];

@Component({
  selector: 'app-template-dropdown',
  templateUrl: './template-dropdown.component.html',
  styleUrls: ['./template-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateDropdownComponent implements OnInit {
  public templateGallery = TEMPLATE_GALLERY;
  templateGalleryForm: FormGroup;
  templateGallerySearch = new FormControl();
  searchTemplateList: any;
  templateGalleryFilter: Observable<any[]>;
  subscription: Subscription;
  submittedValue: any;
  templateGalleryChecked: number = 0;
  formDataPushed: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private datashare: DataSharingService,
    private _snackBar: MatSnackBar
  ) {
    this.templateGalleryForm = this.formBuilder.group({
      templateGalleryArray: this.formBuilder.array(this.templateGallery.map(x => false))
    }, { validator: this.minOneChecked.bind(this) }
    );
    this.templateGalleryFilter = this.templateGallerySearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.templateGallery.slice()))
    );
  }

  ngOnInit(): void {
    const checkboxControl = (this.templateGalleryForm.get('templateGalleryArray') as FormArray);
    this.datashare.templateRemoveMessage.subscribe(
      (template) => {
        if (Object.keys(template).length !== 0) {
          checkboxControl.controls.forEach((item, i) => {
            item.enable();
            if (this.templateGallery[i].name == template) {
              checkboxControl.controls[i].setValue(false);
              this.templateGalleryChecked--;
            }
          });
        }
      }
    );
    this.datashare.templateGalleryValueMessage.subscribe((value) => {
      if (Object.keys(value).length !== 0) {
        if (this.templateGallery.findIndex(list => list.name === value) == -1) {
          this.templateGallery.push({ 'name': value.toString() })
          this.templateGallerySearch.patchValue('')
          const answerFormArray = this.templateGalleryForm.get('templateGalleryArray') as FormArray;
          this.templateGalleryArray.push(this.formBuilder.control(false))
          this._snackBar.openFromComponent(snackBarToastComponent, {
            duration: 4000,
            data: {
              snackbarMode: "success",
              snackbarText: "Success: Name added to Template Gallery.",
            },
            panelClass: ["success"]
          });
        } else {
          this._snackBar.openFromComponent(snackBarToastComponent, {
            duration: 4000,
            data: {
              snackbarMode: "warning",
              snackbarText: "Name Already exists in Gallery",
            },
            panelClass: ["warning"]
          });
        }
      }
    });
  }

  templateFilter(name: string) {
    return this.templateGallery.filter(
      template => template.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  minOneChecked(control) {
    return this.templateGalleryChecked === 0 ? { minOneChecked: true } : null;
  }
  templateGalleryCheckChange(checked: boolean) {
    this.formDataPushed = [];
    const checkboxControl = (this.templateGalleryForm.controls.templateGalleryArray as FormArray);
    checkboxControl.controls.forEach((item, i) => {
      if (item.value) {
        this.formDataPushed.push(this.templateGallery[i].name);
      }
    })
    this.datashare.templateGalleryApplyMessage(this.formDataPushed);
    checked ? this.templateGalleryChecked++ : this.templateGalleryChecked--;
    const answerFormArray = this.templateGalleryForm.get('templateGalleryArray') as FormArray;
    if (this.templateGalleryChecked >= 4) {
      answerFormArray.controls.forEach((item) => {
        if (!item.value) item.disable()
      })
    } else {
      answerFormArray.controls.forEach((item) => {
        if (!item.value) item.enable()
      })
    }
  }
  get templateGalleryArray() {
    return this.templateGalleryForm.get('templateGalleryArray') as FormArray;
  }
}