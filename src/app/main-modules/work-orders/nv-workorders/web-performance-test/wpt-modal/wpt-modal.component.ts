import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wpt-modal',
  templateUrl: './wpt-modal.component.html',
  styleUrls: ['./wpt-modal.component.scss']
})
export class WptModalComponent implements OnInit {
  iMEIs = [
    "Rahul49.singh@ril.com",
    "yogeshwar.bargal@ril.com",
    "Priyanshi.asawara@ril.com",
    "prempraksh.b@ril.com",
    "Rohit.malviya@ril.com"
  ];
  showWPTWO: boolean = false;
  showRecipeWO: boolean = false;

  constructor(public dialogRef: MatDialogRef<WptModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
  }
  
  ngOnInit(): void {
    if(this.router.url === "/JCP/Work-Orders/NV-Workorders/Recipe-Workorders/Create-New-Workorder") {
      this.showRecipeWO = true;
    } else if(this.router.url === "/JCP/Work-Orders/NV-Workorders/Web-Performance-Test/Create-New-Workorder") {
      this.showWPTWO = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickYes(): void {
    this.dialogRef.close();
    if(this.router.url === "/JCP/Work-Orders/NV-Workorders/Recipe-Workorders/Create-New-Workorder") {
      this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Recipe-Workorders/View-Workorder"]);
    } else if(this.router.url === "/JCP/Work-Orders/NV-Workorders/Web-Performance-Test/Create-New-Workorder") {
      this.router.navigate(["/JCP/Work-Orders/NV-Workorders/Web-Performance-Test/View-Workorder"]);
    }
  }

}
