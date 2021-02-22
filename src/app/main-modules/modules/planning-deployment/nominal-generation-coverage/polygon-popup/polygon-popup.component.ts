import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-polygon-popup',
  templateUrl: './polygon-popup.component.html',
  styleUrls: ['./polygon-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PolygonPopupComponent implements OnInit {
  polygonList = [
    { name :'None'},
    { name: 'CombineG'}
  ];

  plannedTypeList = [
    { name :'None'},
    { name: 'Coverage'}
  ];

  environmentList = [
    { name :'None'},
    { name: 'Outdoor'}
  ];

  checkboxList = [
    {name: 'RSRP', option: 'Area', nameValue: '-105', optionValue: '80'},
    {name: 'SINR', option: 'Area', nameValue: '5', optionValue: '80'}
  ]
  polygonDefault = 'CombineG';
  typeDefault = 'Coverage';
  environmentDefault = 'Outdoor';

  constructor(
    private dialogRef: MatDialogRef<PolygonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
