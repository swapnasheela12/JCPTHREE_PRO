import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ont-serial-number',
  templateUrl: './ont-serial-number.component.html',
  styleUrls: ['./ont-serial-number.component.scss']
})
export class OntSerialNumberComponent implements OnInit {
  iMEIs = [
    "RAROTAF00067271",
    "RAROTAF00067271",
    "RAROTAF00067271",
    "RAROTAF00067271",
    "RAROTAF00067271",
    "RAROTAF00067271",
    "RAROTAF00067271"
  ];
  showWPTWO: boolean = false;
  showRecipeWO: boolean = false;

  constructor(public dialogRef: MatDialogRef<OntSerialNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
  }

  ngOnInit(): void {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
    this.router.navigate(["/JCP/Work-Orders/NV-Workorders/ONT-Workorders/View-Workorder"]);
  }

}

