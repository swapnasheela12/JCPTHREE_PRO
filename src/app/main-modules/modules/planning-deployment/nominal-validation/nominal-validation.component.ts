import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { NpCreatePopupDialogModel, NpCreatePopupComponent } from '../nominal-capacity/np-create-popup/np-create-popup.component';
import { MatDialog } from '@angular/material/dialog';

export interface Card {
  area: string;
  place: string;
  category: string;
  id: string;
  status?: string;
  text: string;
  createdUser: string;
  createdDate: string;
  createdTime: string;
  modifiedUser: string;
  modifiedDate: string;
  modifiedTime: string;
};

const DATA: Card[] = [
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'In Progress',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Draft',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun Nath Arun Nath',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan Dubey',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'In Progress',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Validation',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: ' Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy  copy pease do not read this. This is a dummy copy pease do not read this',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
  },
];

const PATHS = [
  { createNominalGeneration: "JCP/Modules/Planning-Deployment/Nominal-Validation/Create" }
]

@Component({
  selector: 'app-nominal-validation',
  templateUrl: './nominal-validation.component.html',
  styleUrls: ['./nominal-validation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NominalValidationComponent implements OnInit {
  searchGrid = '';
  showInputField: boolean;
  paths;
  public layerRoute: String;
  public createRoute: String;
  show: any;
  status = "Completed";
  plan = "Coverage";
  zone = "North";
  r4gStates = "-";
  jioCenter = "-";
  city = "-";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.paths = PATHS;
    this.paginator._intl.itemsPerPageLabel="Rows Per Page:";
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  onFilterChanged(value) {
  };

  toggleSearch() {
    this.showInputField = !this.showInputField;
  };

  

  async redirectToLayer() {
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    const { NominalValidationLayerComponent } = await import('./../nominal-validation/nominal-validation-layer/nominal-validation-layer.component');
    let nominalGenerationLandingPage = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(NominalValidationLayerComponent)
    );
    nominalGenerationLandingPage.changeDetectorRef.detectChanges();
  }

  createPopup(): void {
    const dialogData = new NpCreatePopupDialogModel();
    const dialogRef = this.dialog.open(NpCreatePopupComponent, {
      data: dialogData,  
      width: '500px',
      height: '200px',
      panelClass: 'np-create-popup-dialog'
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  redirectToValidate() {
    this.router.navigate([this.paths[0].createNominalGeneration], { state: { validate: 'true' } });
  }

}
