import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridCore, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SharePopupComponent, SharePopupDialogModel } from 'src/app/core/components/commonPopup/share-popup/share-popup.component';
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
}
const PATHS = [
  { layersPage: "/JCP/Layers" },
  { createPage: "/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task" },
  { createPageStrategy: "/JCP/Modules/Network-Planning/RF-Planning/Nominal-Strategic" }
];
const DATA: Card[] = [
  {
    area: 'R4G',
    place: 'Maharashtra',
    category: 'Coverage / Capacity / Strategic',
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
    category: 'Coverage / Capacity / Strategic',
    id: ' Maharashtra-NP-CV-121-20_V1',
    status: 'Draft',
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
    category: 'Coverage / Capacity / Strategic',
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
    category: 'Coverage / Capacity / Strategic',
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
    category: 'Coverage / Capacity / Strategic',
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
    category: 'Coverage / Capacity / Strategic',
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
    category: 'Coverage / Capacity / Strategic',
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

@Component({
  selector: 'app-nominal-capacity',
  templateUrl: './nominal-capacity.component.html',
  styleUrls: ['./nominal-capacity.component.scss']
})
export class NominalCapacityComponent implements OnInit {
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

  constructor(private changeDetectorRef: ChangeDetectorRef, 
    private router: Router, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.layerRoute = PATHS[0].layersPage;
    this.createRoute = PATHS[1].createPage;
    this.createRouteStrategy = PATHS[2].createPageStrategy;
    this.paginator._intl.itemsPerPageLabel="Rows Per Page:";
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
}
