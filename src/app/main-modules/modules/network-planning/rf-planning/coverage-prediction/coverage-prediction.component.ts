import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridCore, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SharePopupComponent, SharePopupDialogModel } from 'src/app/core/components/commonPopup/share-popup/share-popup.component';
import { NpCreatePopupComponent, NpCreatePopupDialogModel } from '../../../planning-deployment/nominal-capacity/np-create-popup/np-create-popup.component';

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
  predictionType: string;
}
const PATHS = [
  { layersPage: "/JCP/Layers" },
  { createPage: "/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task" },
  { createPageStrategy: "/JCP/Modules/Network-Planning/RF-Planning/Nominal-Strategic" },
  { summaryPage: "/JCP/Modules/Planning-Deployment/Nominal-Generation/Summary" }
];
const DATA: Card[] = [
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: '3500 MHz /Proposed Nominal',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'In Progress',
    text: 'Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy copy',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
    predictionType: 'RSRP / SINR'
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: '3500 MHz /Proposed Nominal',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: 'Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy copy',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
    predictionType: 'RSRP / SINR / Best Server Plot'
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: '3500 MHz /Proposed Nominal',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'In Progress',
    text: 'Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy copy',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
    predictionType: 'RSRP / Best Server Plot'
  },
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: '3500 MHz /Proposed Nominal',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Completed',
    text: 'Generate 5G Nominal Plan to cover dense urban area with RSRP >=95dBm. This is a dummy copy',
    createdUser: ' Arun',
    createdDate: ' 12th Oct 2020',
    createdTime: ' 9:30 IST',
    modifiedUser: ' Karan',
    modifiedDate: ' 6 Jan 2021',
    modifiedTime: ' 10:00 IST',
    predictionType: 'SINR'
  }
];

@Component({
  selector: 'app-coverage-prediction',
  templateUrl: './coverage-prediction.component.html',
  styleUrls: ['./coverage-prediction.component.scss']
})
export class CoveragePredictionComponent implements OnInit {
  searchGrid = '';
  public layerRoute: String;
  public createRoute: String;
  public createRouteStrategy: String;
  zone = "";
  circle = "";
  jioState = "-";
  jioCenter = "-";
  r4gStates = "-";
  city = "-";
  plan = "-";
  status = "-";
  show;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);
  summaryRoute: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.layerRoute = PATHS[0].layersPage;
    this.createRoute = PATHS[1].createPage;
    this.createRouteStrategy = PATHS[2].createPageStrategy;
    this.summaryRoute = PATHS[2].summaryPage;
    console.log(this.layerRoute);
    console.log(this.createRoute);
    console.log(this.createRouteStrategy);
    this.paginator._intl.itemsPerPageLabel = "Rows Per Page:";
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  onFilterChanged(value) {
  };

  openUpdateDialog(): void {
    const message = `Are you sure you want to perform this action?`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Admin Settings Updated Successfully.';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  sharePopup(): void {
    const dialogData = new SharePopupDialogModel();
    const dialogRef = this.dialog.open(SharePopupComponent, {
      data: dialogData,
      width: '900px',
      height: '500px',
      panelClass: 'share-popup-dialog'
    });
  }

  createPopup(): void {
    this.router.navigate(['/JCP/Modules/Network-Planning/RF-Planning/Create']);
  }

  asdasd(value) {
    console.log("jhghj")
    this.router.navigate(['/JCP/Layers']);
    console.log(this.router)

  };
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  toggleSearch() {
    this.show = !this.show;
  };

  async redirectToNominalCapacityLayer() {
    this.router.navigate([this.layerRoute]);
    this.router.navigate(['/JCP/Layers']);
    this.viewContainerRef.clear();
    // const { CoveragePredictionLayerC
    const { CoveragePredictionLayerComponent } = await import('./coverage-prediction-layer/coverage-prediction-layer.component');
    let nominalGenerationLandingPage = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(CoveragePredictionLayerComponent)
    );
    nominalGenerationLandingPage.changeDetectorRef.detectChanges();
  }
}

