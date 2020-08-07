import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COLUMN_DEFS } from './overshooting-column-defs-constants'; 
import { MatSidenav } from '@angular/material/sidenav';
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { viewHistoryRendererComponent } from 'src/app/core/components/ag-grid-renders/view-history-renderer.component';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dropDownThreeDotRendererComponent } from 'src/app/core/components/ag-grid-renders/dropDownThreeDot-renderer.component';

@Component({
  selector: 'app-wo-overshooting-cell',
  templateUrl: './wo-overshooting-cell.component.html',
  styleUrls: ['./wo-overshooting-cell.component.scss']
})
export class WoOvershootingCellComponent  {


 url: string = "assets/data/layers/workorders/wo-overshooting-cell-data.json"
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
      "value": "Overshooting Cell"
    },
    {
      "label": "Priority",
      "value": "Critical"
    },
    {
      "label": "SAPID",
      "value": "I_MU-MUMB-006",
      
    },
    {
      "label": "Template",
      "value": "OvershootingCell",
    },
    {
      "label": "Work Order Creation Date",
      "value": "01 Aug, 2018"
    },
    {
      "label": "Planned End Date",
      "value": "Aug 04, 2018"
    },
    {
      "label": "Work Order Status",
      "value": "In Progress"
    },

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
        this.columnDefs = COLUMN_DEFS;
      });

  }

  cellClickedDetails(evt) {
    console.log(evt,"evt?????");
    
    if (evt.value) {
      this.router.navigate(["/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell/WO-Overshooting-Cell/Execution-Task"]);
    }

  }







}
