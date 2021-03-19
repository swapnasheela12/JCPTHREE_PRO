import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-np-create-popup',
  templateUrl: './np-create-popup.component.html',
  styleUrls: ['./np-create-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NpCreatePopupComponent implements OnInit {
  public selectedRadio: string = 'Capacity';
  constructor(public dialogRef: MatDialogRef<NpCreatePopupComponent>,
    private router: Router,) { }

  ngOnInit(): void {
  }

  routeAction(): void {
    // console.log(this.selectedRadio)
    if (this.selectedRadio == 'Capacity') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task']);
    } else if (this.selectedRadio == 'Coverage') {
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Generation/Create']);
    } else {
      this.router.navigate(['/JCP/Modules/Network-Planning/RF-Planning/Nominal-Strategic']);
    }
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}

export class NpCreatePopupDialogModel {
  constructor() {
  }
}
