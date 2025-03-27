
import { GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs'; import { AnchorRendererComponent } from 'src/app/core/components/ag-grid-renders/anchor-renderer.component';
import { SuccessfulModalComponent } from 'src/app/core/components/commonPopup/successful-modal/successful-modal.component';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { StatusRendererComponent } from 'src/app/main-modules/modules/performance-management/kpi-editor/renderer/status-renderer.component';
import { COLUMN_DEFS } from 'src/app/main-modules/work-orders/rf-oc-workorders/category-wise-wo-listing/sector-misalignment/wo-sector-misalignment/wo-column-defs.constants';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { ThreeDotSLARenderer } from './threedot-sla-renderer.component';

@Component({
  selector: 'app-create-sla-configuration',
  templateUrl: './create-sla-configuration.component.html',
  styleUrls: ['./create-sla-configuration.component.scss']
})
export class CreateSlaConfigurationComponent implements OnInit {
  url: string = "assets/data/administration/site-sla-configuration/create-sla/create-sla-configuration.json";

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  /////
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public sidenavBarStatus;
  public rowData: any;
  public columnDefs: any[];
  public frameworkComponentsDetails = {
    'anchorRenderer': AnchorRendererComponent,
    'threeDotSLARenderer': ThreeDotSLARenderer
  };
  public searchGrid = '';
  public show;
  public paginationValues: number[] = [10, 20, 30, 40];
  public formControlPageCount = new FormControl();
  public gridFilterValueServices = {};
  public showGlobalOperation: boolean = true;
  public destroySubscription: Subscription = new Subscription();

  public projectTypeSelected = "Customer Complain";
  @ViewChild(MatSelect, { static: true }) _mySelect: MatSelect;
  r4gStateList: any[] = [
    { value: 'Andhra pradesh', viewValue: 'Andhra pradesh' },
    { value: 'Maharastra', viewValue: 'Maharastra' },
    { value: 'Delhi', viewValue: 'Delhi' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Kolkata', viewValue: 'Kolkata' },
  ];

  maintentancePointName = [
    { value: 'Anantpur', viewValue: 'Anantpur' },
    { value: 'Thane', viewValue: 'Thane' },
    { value: 'Anantpur', viewValue: 'Anantpur' }
  ];
  jioCenter = [
    { value: 'All', viewValue: 'All' },
    { value: 'All', viewValue: 'All' },
    { value: 'All', viewValue: 'All' },
  ]

  sapId = [
    { value: 'All', viewValue: 'All' },
    { value: 'All', viewValue: 'All' },
    { value: 'All', viewValue: 'All' },
  ]

  siteType = [{
    value: "New Site Planning",
  },
  { value: "On Existing Rooftop Pole_Smart Pole" },
  { value: "On Existing RTT_RTP_GBT_GBM" },
  {
    value: "On Street Pole"
  }
  ]
  showFullScreen: boolean = false;
  searchGeographyListValue;
  searchMaintentancePointNameValue;
  searchJioCenterValue;
  searchSapIDValue;
  searchSapTypeValue;
  hideDefaultBtn: boolean = true;

  constructor(private datashare: DataSharingService, private router: Router, private httpClient: HttpClient,
    private dialog: MatDialog) {
    router.events.subscribe();
    this.destroySubscription = this.datashare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
    });

    //API call to get WO Service details
    this.httpClient.get(this.url)
      .subscribe(data => {
        this.rowData = data;
        this.columnDefs = [
          {
            headerName: " ",
            field: "grouplist",
            pinned: 'left',
            width: 70,
          },
          {
            headerName: "Milestone",
            field: "milestone",
            width: 200,
            pinned: "left"
          },
          {
            headerName: "Task",
            field: "task",
            width: 180,
          },
          {
            headerName: "Responsible",
            field: "responsible",
            width: 150,
            cellRenderer: 'dropdownResponsible',
          },
          {
            headerName: "Position",
            field: "position",
            width: 150,
            cellRenderer: 'dropdownPosition'
          },
          {
            headerName: "Owner Name",
            field: "ownerName",
            width: 170,
            cellRenderer: 'dropdownOwner'
          },
          {
            headerName: "SLA Days",
            field: "slaDays",
            width: 250,
            cellRenderer: function (params) {
              console.log("param sla", params)
              if (params.data.slaDays) {
                return '<input type="text" style="height: 30px; border: transparent; border-bottom: 1px solid; width: 20px;" value="' + params.data.slaDays + '">' + '<span>' + "Days" + '</span>';
              }
            }
          },
          {
            headerName: "SLA Email No…",
            field: "slaEmailNo",
            width: 170,
            cellRenderer: 'toggleButton'
          },
          {
            headerName: "Task Email No…",
            field: "ruleID",
            width: 250,
            cellRenderer: 'toggleButton'
          },
          {
            headerName: "",
            cellRenderer: 'threeDotSLARenderer',
            width: 100,
            pinned: 'right'
          }
        ];
        //this.datatable.columnDefsServices = this.columnDefs;;
      });

  }
  
  ngOnInit() {
    this.datashare.currentMessage.subscribe((data) => {
      if(data === "Config_Template") {
        this.hideDefaultBtn =  false;
      }
    })
  }

  openedChange(sda) {
    this.searchGeographyListValue = '';
    this.searchMaintentancePointNameValue = '';
    this.searchJioCenterValue = '';
    this.searchSapIDValue = '';
    this.searchSapTypeValue = ';'
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };
  show: any;
  toggleSearch() {
    this.show = !this.show;
  };

  cellClickedDetails(evt) {
    console.log("proposedIndoorColDef", evt)
    if (evt.value) {
      this.router.navigate(["JCP/Modules/Network-Deployment/Plan-To-Build/gNodeB/Site-Database/Site-Id-Details"]);
    }
  }

  setAsDefault() {
    const message = {
      message: 'SLA Configuration template for "gNodeB-New Site" has been successfully created !',
      showMyTasks: true
    }
    this.dialog.open(SuccessfulModalComponent, {
      data: message,
    });
  }

  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Sector-Misalignment'])
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}


