import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridCore, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  { createPage: "/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task" }
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

  constructor(private changeDetectorRef: ChangeDetectorRef, 
    private router: Router,) { }

  ngOnInit(): void {
    this.layerRoute = PATHS[0].layersPage;
    this.createRoute = PATHS[1].createPage;
    this.paginator._intl.itemsPerPageLabel="Rows Per Page:";
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  onFilterChanged(value) {
  };
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
