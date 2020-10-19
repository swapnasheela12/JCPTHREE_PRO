import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertiesComponent } from 'src/app/modules/components/properties/properties.component';

@Component({
  selector: 'app-route-popup',
  templateUrl: './route-popup.component.html',
  styleUrls: ['./route-popup.component.scss']
})
export class RoutePopupComponent implements OnInit {
  routeName;
  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    console.log(this.routeName)
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: "1000px",
      height: "531.47px",
      position: {
        left: "18.5rem",
        top: "4rem"
      },
      hasBackdrop: false,
      disableClose: false,
      panelClass: "material-dialog-container",
    });
  }

}
