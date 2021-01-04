import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { GridOptions, GridApi } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AllCommunityModules, Module} from '@ag-grid-community/all-modules';
import { InfoRendererComponent } from './renderer/info-renderer.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { Subject } from 'rxjs';

interface twampDashboard {
  value: string;
  viewValue: string;
}

export const fadeInOut = (name = 'fadeInOut') =>
  trigger(name, [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ])

const CUSTOM_DASHBOARD_REPORTS = [
  {
    headerName: "Dashboard Name",
    field: "name",
    width: 240,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "Category",
    field: 'category',
    width: 240,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "Sub-Category",
    field: 'sub_category',
    width: 240,
    valueFormatter: function(params){
      if (!params.value) {
        return '-'
      } 
    }
  },
  {
    headerName: "Created Date",
    field: 'createddate',
    width: 225,
    valueFormatter: function(params){
      return moment(params.value).format('LL')
    }
  },
  {
    headerName: "",
    suppressMenu: true,
    suppressSorting: true,
    width: 90,
    colId: 'dots-id'
  }
];

@Component({
  selector: 'app-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
   animations: [
    fadeInOut('fadeInOut-1')
  ]
})
export class CustomDashboardComponent implements OnInit, AfterViewInit {
  public reportSelected = 'RF Planning';
  public gridCustomDashboardGridOptions: GridOptions;
  public customDashboardColumnDefs : any[];
  public gridCustomDashboardData;
  public gridApi: any;
  public gridColumnApi: any;
  public gridOptions: GridOptions;
  public rowData;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  private paginationPageSize = 10;
  public sidenavBarStatus;
  searchGrid = '';
  gridFilterValueServices= {};
  show: any;
  public url: string = "assets/data/report/reports-and-dashboard/all-custom-dashboard.json";
  modules: Module[] = AllCommunityModules;
  public displayInfoData;
  @ViewChild('likeCell') likeCell: TemplateRef<any>;
  public displayInfoFlex =100;
  showRightHolder: boolean = true;

  reportsMeasureList: twampDashboard[] = [
    { value: 'RF Planning', viewValue: 'RF Planning' },
    { value: 'Configuration Management', viewValue: 'Configuration Management' },
    { value: 'LSMR', viewValue: 'LSMR' },
    { value: 'Performance Management', viewValue: 'Performance Management' },
    { value: 'Work Orders', viewValue: 'Work Orders' }
  ];
  frameworkComponentsCustomDashboards: {};
 
  constructor(
    private datatable: TableAgGridService,
    private http: HttpClient,
    private dataShare: DataSharingService,
    private router: Router
  ) {
    this.gridCustomDashboardGridOptions = <GridOptions>{};
    this.paginationPageSize = 10;
    this.dataShare.currentMessage.subscribe((message) => {
      this.sidenavBarStatus = message;
      this.fitColumns();
    });
    this.frameworkComponentsCustomDashboards = {
      'InfoRenderer': InfoRendererComponent
    };
    this.createColumnDefs();
    this.getCustomDashboardData();
    // this.httpClient.get(this.url)
    //   .subscribe((data: Array<ISector_Grid>) => {
    //          });
  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createColumnDefs();
      this.getCustomDashboardData();
    });
  }

  public createColumnDefs() {
    this.customDashboardColumnDefs = CUSTOM_DASHBOARD_REPORTS;
    this.customDashboardColumnDefs[4].cellRenderer = 'InfoRenderer';
    this.customDashboardColumnDefs[4].cellRendererParams = {
      ngTemplate: this.likeCell
    }
    this.datatable.columnDefsServices = this.customDashboardColumnDefs;
    console.log(this.customDashboardColumnDefs)
  }

  public getCustomDashboardData() {
    this.http.get(this.url)
      .subscribe(data => {
       // this.gridCustomDashboardData = data;   
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
    });
  }

  public fitColumns() {
    if (this.gridCustomDashboardGridOptions.api && this.gridCustomDashboardData) {
      setTimeout(() => {
        this.gridCustomDashboardGridOptions.api.sizeColumnsToFit();
      }, 500);
    }
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridCustomDashboardGridOptions.api.sizeColumnsToFit();
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };

  toggleSearch() {
    this.show = !this.show;
  };

  cellClickedDetails(evt) {
    if (evt.event.target.localName == 'mat-icon') {
      return false;
    }
    console.log(evt)
    if(evt.data.router_link){
      console.log(evt.data.router_link)
      this.router.navigate(
        [evt.data.router_link],
        { state:
          {
            display_name: evt.data.display_name,
            json_url: evt.data.json_url
          }
        }
      );
    }
  }

  displayInfo(row: any){
    setTimeout(() => {
      this.gridCustomDashboardGridOptions.api.sizeColumnsToFit();
    });
    this.displayInfoFlex = 70;
    this.displayInfoData = row;
  }

  showRightHolderToggle() {
    setTimeout(() => {
      console.log(this.gridCustomDashboardGridOptions.api.sizeColumnsToFit())
    }, 500);
    this.displayInfoData = !this.displayInfoData;
    if (!this.displayInfoData) {
      this.displayInfoFlex = 100;
    } else {
      this.displayInfoFlex = 70;
    }
  }
}
