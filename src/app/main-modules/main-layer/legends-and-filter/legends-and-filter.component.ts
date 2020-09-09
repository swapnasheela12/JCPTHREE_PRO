import { CustomLegendsComponent } from './custom-legends/custom-legends.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';

import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';

// declare var $: any;

@Component({
  selector: 'app-legends-and-filter',
  templateUrl: './legends-and-filter.component.html',
  styleUrls: ['./legends-and-filter.component.scss']
})
export class LegendsAndFilterComponent implements OnInit {

  public items = [
    { value: 1, legend: '#F44336' },
    { value: 3, legend: '#FF9800' },
    { value: 5, legend: '#8BC34A' },
    { value: 8, legend: '#3F51B5' },
    { value: 9, legend: '#03A9F4' }
  ];
  public value: number = 10;
  public minValue: number = 40;
  public maxValue: number = 80;
  public options: Options = {
    floor: -140,
    ceil: -40,
    step: 20,
    showSelectionBarFromValue: 0,
    showTicks: true,
    getLegend: (value: number): string => {
      return '<b></b>' + value;
    },
  };
  
  // ///////datepicker//////////
  public form = this.fb.group({
    selected: [
      {
        startDate: '2019-12-11T18:30:00.000Z',
        endDate: '2019-12-12T18:29:59.000Z',
      },
      Validators.required,
    ],
  });
  public locale: LocaleConfig = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'YYYY-MM-DD',
    applyLabel: 'Ok',
    clearLabel:'Clear'

  };

  public inited;

  public layers: any = [
    { value: 'Analytics - RF In Bulding', viewValue: 'Analytics - RF In Bulding' },
    { value: 'Analytics - RF In Bding', viewValue: 'Analytics - RF In Bding' },
    { value: 'Analytics - RF In B', viewValue: 'Analytics - RF In B' },
  ];
  public date = new FormControl(new Date());
  public serializedDate = new FormControl((new Date()).toISOString());
  constructor(public dialog: MatDialog,public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<LegendsAndFilterComponent>) { }

  ngOnInit(): void {

    this.dialogRef.afterOpened().subscribe(() => {
      this.inited = true;
    })

  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  customLegendsSettingPopFun(){
    var customLegendsSettingListDialogRef = {
      width: '536px',
      height: '965px',
      position: { bottom: '0px', right: "0px" },
      panelClass: "customLegends-setting-layers-dialog-container",
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disableClose: true,
      hasBackdrop: true
    }
    const dialogRef = this.dialog.open(CustomLegendsComponent, customLegendsSettingListDialogRef);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

}