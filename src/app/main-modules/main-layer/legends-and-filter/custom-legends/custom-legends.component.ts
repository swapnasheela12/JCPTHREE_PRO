
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-custom-legends',
  templateUrl: './custom-legends.component.html',
  styleUrls: ['./custom-legends.component.scss']
})
export class CustomLegendsComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CustomLegendsComponent>,) { }

  private inited;
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

  technologyList: any = [
    { value: '5G', viewValue: '5G' },
    { value: '4G', viewValue: '4G' }
  ];
  kpiList: any = [
    { value: 'Coverage', viewValue: 'Coverage' },
    { value: 'RSRP', viewValue: 'RSRP' },
    { value: 'SINR', viewValue: 'SINR' },
    { value: 'RSRQ', viewValue: 'RSRQ' },
    { value: 'UL TX Power', viewValue: 'UL TX Power' },
  ];
  bandList: any = [
    { value: '850 MHz', viewValue: '850 MHz' },
    { value: '1800 MHz', viewValue: '1800 MHz' },
    { value: '2300 MHz', viewValue: '2300 MHz' },
  ];
  paletteList: any = [
    {
      value: 'NPE View',
      viewValue: 'NPE View',
      colorList: [
        { colorName: "#F44336" },
        { colorName: "#FF9800" },
        { colorName: "#8BC34A" },
        { colorName: "#4CAF50" },
        { colorName: "#03A9F4" },
        { colorName: "#3F51B5" },
      ]
    }
  ];


}
