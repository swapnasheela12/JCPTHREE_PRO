import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import {requireCheckboxesToBeCheckedValidator} from './../validators/require-checkboxes-to-be-checked.validator';

interface templateDropdown {
  name: string;
  id: string;
}

const TEMPLATE_GALLERY: templateDropdown[] = [
  { name: 'MUMBAI_SU', id: 'mumbai-su' },
  { name: 'MUMBAI_RU', id: 'mumbai-ru' },
  { name: 'PUNE_DU', id: 'pune-du' },
  { name: 'PUNE_SU', id: 'pune-mu' },
  { name: 'PUNE_RU', id: 'pune-ru' },
  { name: 'MUMBAI_DU', id: 'mumbai-du' }
];

@Component({
  selector: 'app-template-dropdown',
  templateUrl: './template-dropdown.component.html',
  styleUrls: ['./template-dropdown.component.scss']
})
export class TemplateDropdownComponent implements OnInit {
  public templateGallery = TEMPLATE_GALLERY;
  templateGalleryForm: FormGroup;
  templateGallerySearch  = new FormControl();
  searchTemplateList: any;
  templateGalleryFilter: Observable<any[]>;
  subscription: Subscription;
  submittedValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private datashare: DataSharingService
  ) {
    this.templateGalleryForm = this.formBuilder.group({
      templateGalleryArray: this.formBuilder.array(this.templateGallery.map(x => false))
    } 
    );

    const checkboxControl = (this.templateGalleryForm.controls.templateGalleryArray as FormArray)
    this.subscription = checkboxControl.valueChanges.subscribe(checkbox => {
      checkboxControl.setValue(
        checkboxControl.value.map((value, i) => value ? this.templateGallery[i].name : false),
        { emitEvent: false }
      );
    });
    console.log(this.subscription)

    this.templateGalleryFilter = this.templateGallerySearch.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.templateFilter(state) : this.templateGallery.slice()))
    );
  }

  ngOnInit(): void {
  }

  templateFilter(name: string) {
    return this.templateGallery.filter(
      template => template.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  submit() {
    // console.log(this.templateGalleryForm.controls.templateGalleryArray)
    const checkboxControl = (this.templateGalleryForm.controls.templateGalleryArray as FormArray);
    const formValue = {
      ...this.templateGalleryForm.value,
      templateGalleryArray: checkboxControl.value.filter(value => !!value)
    }
    this.submittedValue = formValue;
    this.datashare.templateGalleryApplyMessage(this.submittedValue.templateGalleryArray);
  }
}