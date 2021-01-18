import { Inject, ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-polygon-popup',
  templateUrl: './save-polygon-popup.component.html',
  styleUrls: ['./save-polygon-popup.component.scss']
})
export class SavePolygonPopupComponent implements OnInit {
  polyName = 'Mumbai All Clutter';
  constructor(
    public dialogRef: MatDialogRef<SavePolygonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(true);
  }
  onApply(): void {
    this.dialogRef.close(false);
  }

}
