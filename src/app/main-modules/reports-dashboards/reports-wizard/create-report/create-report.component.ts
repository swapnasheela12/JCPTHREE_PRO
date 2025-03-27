import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable, Observer} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var require: any;

export interface DialogDataSuccessful {
  gotomyreportInterface: string;
  newreportInterface: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
export interface ExampleTab {
  label: string;
  content: string;
  formName: string;
  formCtrlName1: string;
  formCtrlName2: string;
}
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  reportWizardForm: FormGroup;
  pmReportBuilderForm: FormGroup;
  cmReportBuilderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataSuccess: DialogDataSuccessful) {
      dialogRef.disableClose = true;

      this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
        setTimeout(() => {
          observer.next([
            {label: 'Report Wizard', content: 'Report Wizard Content 1',formName:"reportWizardForm",formCtrlName1:"reportMeasureCtrl",formCtrlName2:"reportCategoryCtrl"},
            {label: 'PM Report Builder', content: 'PM Report Builder Content 2',formName:"pmReportBuilderForm",formCtrlName1:"reportMeasureCtrl",formCtrlName2:"reportCategoryCtrl"},
            {label: 'CM Report Builder', content: ' CM Report Builder Content 3',formName:"cmReportBuilderForm",formCtrlName1:"reportMeasureCtrl",formCtrlName2:"reportCategoryCtrl"},
          ]);
        }, 500);
      });


     }

 
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.stepperReportW();
  }

  stepperReportW() {
   

    this.reportWizardForm = this.formBuilder.group({
      reportMeasureCtrl: ['RF Analysis', Validators.required],
      reportCategoryCtrl: ['All Selected', Validators.required]
    });
    this.pmReportBuilderForm = this.formBuilder.group({
      reportMeasureCtrl: ['RF Analysis', Validators.required],
      reportCategoryCtrl: ['All Selected', Validators.required]
    });
    this.cmReportBuilderForm = this.formBuilder.group({
      reportMeasureCtrl: ['RF Analysis', Validators.required],
      reportCategoryCtrl: ['All Selected', Validators.required]
    });


  }

}
