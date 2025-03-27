import { SuccessfulComponent } from './../successful/successful.component';
import { Router } from '@angular/router';
import { Inject, ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-save-polygon-popup',
  templateUrl: './save-polygon-popup.component.html',
  styleUrls: ['./save-polygon-popup.component.scss']
})
export class SavePolygonPopupComponent implements OnInit {
  polyName = 'Mumbai All Clutter';
  constructor(
    public dialogRef: MatDialogRef<SavePolygonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private router: Router, public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(true);
  }

  public transferDataList;
  onApply(): void {
    this.transferDataList={
      subtitle:'Are you sure you want save the changes',
      buttonOne:"Cancel",
      buttonTwo:"Save",
      sideNav:this.polyName
    }
    this.dialogRef.close(false);
    const dialogRef = this.dialog.open(SuccessfulComponent, {
      width: "470px",
      panelClass: "material-dialog-container",
      data: { transferData :this.transferDataList }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

}
