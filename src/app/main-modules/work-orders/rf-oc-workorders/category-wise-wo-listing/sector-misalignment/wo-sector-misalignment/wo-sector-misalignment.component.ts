import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from './wo-column-defs.constants'; import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';

const COLUMNDEFS = COLUMN_DEFS;
@Component({
  selector: 'app-wo-sector-misalignment',
  templateUrl: './wo-sector-misalignment.component.html',
  styleUrls: ['./wo-sector-misalignment.component.scss']
})
export class WoSectorMisalignmentComponent {
  url: string = "assets/data/report/sector-misalignment/wo-sector-misalignment.json"
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public sidenavBarStatus;
  public rowData: any;
  public columnDefs: any[];
  public frameworkComponentsWOSectorComponent = {
    statusFlagRenderer: StatusRendererComponent,
  };
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  woHeader = [
    {
      "label": "Category",
      "value": "Sector Misalignment"
    },
    {
      "label": "SAP ID",
      "value": "I-MU-MUMB-0306"
    },
    {
      "label": "Template",
      "value": "Sector Misalignment"
    },
    {
      "label": "Work Order Creation Date",
      "value": "24 Sep, 2019"
    },
    {
      "label": "Planned End Date",
      "value": "30 Sep, 2019"
    },
    {
      "label": "Work Order Status",
      "value": "In Progress"
    }
  ];
  constructor(private datatable: TableAgGridService, private datashare: DataSharingService, private router: Router, private route: ActivatedRoute, private overlayContainer: OverlayContainer, private httpClient: HttpClient) {
    router.events.subscribe((url: any) => console.log(url));
    this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.columnDefs = COLUMNDEFS;
      });

  }
}
