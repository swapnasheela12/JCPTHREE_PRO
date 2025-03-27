import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateReportComponent } from 'src/app/main-modules/reports-dashboards/reports-wizard/create-report/create-report.component';

@Component({
  selector: 'app-odsc-rfi-survey-form',
  templateUrl: './odsc-rfi-survey-form.component.html',
  styleUrls: ['./odsc-rfi-survey-form.component.scss']
})
export class OdscRfiSurveyFormComponent {
  woHeader: Array<any> = [
    {
      "label": "Circle Name",
      "value": "Mumbai"
    },
    {
      "label": "Site Name",
      "value": "I-MU-MUMB-ENB-4505"
    },
    {
      "label": "Site ID",
      "value": "MU-NVMB-JC24-0024"
    },
    {
      "label": "Priority",
      "value": "P1"
    },
    {
      "label": "Date of Survey",
      "value": "10 Oct 2020"
    },
    {
      "label": "Any Obstruction",
      "value": "Yes"
    },
    {
      "label": "Coordinates (Longitude)",
      "value": "78.852402"
    },
    {
      "label": "Coordinates (Latitude)",
      "value": "21.269661"
    }
  ];

  siteIds = [
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505",
    "I-MU-MUMB-ENB-4505"
  ]
  constructor(public dialogRef: MatDialogRef<OdscRfiSurveyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog) {
    router.events.subscribe((url: any) => console.log(url));
    console.log(router.url)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickGoMyReport(): void {
    this.dialogRef.close();
    this.router.navigate(['/JCP/Reports-and-Dashboard/My-Reports']);
  }

  animal: string;
  name: string;
  clickCreateNewReport(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(CreateReportComponent, {
      width: "700px",
      panelClass: "material-dialog-container",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

