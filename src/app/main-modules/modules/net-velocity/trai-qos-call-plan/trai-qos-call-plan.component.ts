import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GridApi, GridCore, GridOptions } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import { TableAgGridService } from 'src/app/core/components/table-ag-grid/table-ag-grid.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';


@Component({
  selector: 'app-trai-qos-call-plan',
  templateUrl: './trai-qos-call-plan.component.html',
  styleUrls: ['./trai-qos-call-plan.component.scss']
})
export class TraiQosCallPlanComponent implements OnDestroy {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;
  public sidenavBarStatus: boolean;
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public rowData: Array<any>;
  public columnDefs: any[];
  public rowCount: string;
  public defaultColDef = { resizable: true };
  public searchGrid = '';
  public gridFilterValueServices = {};
  tableCompData = {};
  public destroySubscription: Subscription = new Subscription();
  public formControlPageCount = new FormControl();

  public showGlobalOperation: Boolean = false;
  private paginationPageSize = 10;
  public url: string = "assets/data/modules/net-velocity/trai-qos-call-pan.json";

  //select dropdown
  searchCallPlan;
  public callPlanSelected = "Delhi - 1";
  callPlanList = [
    { value: 'Delhi - 1', viewValue: 'Delhi - 1' },
    { value: 'Rajasthan - 2', viewValue: 'Rajasthan - 2' },
    { value: 'Uttar Pradesh (East) - 1', viewValue: 'Uttar Pradesh (East) - 1' },
    { value: 'Uttarakhand - 1', viewValue: 'Uttarakhand - 1' }
  ];


  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  constructor(private datatable: TableAgGridService,
     private datashare: DataSharingService,
     private router: Router,
     private httpClient: HttpClient,
     private overlayContainer: OverlayContainer,
     private dialog: MatDialog) {
    router.events.subscribe();
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();

    this.destroySubscription = this.datashare.currentMessage.subscribe((message: boolean) => {
      this.sidenavBarStatus = message;
    });

    this.httpClient.get(this.url)
      .subscribe((data: Array<any>) => {
        this.rowData = data;
        this.datatable.rowDataURLServices = this.url;
        this.datatable.typeOfAgGridTable = "Default-Ag-Grid";
        this.datatable.rowDataServices = this.rowData;
        this.datatable.gridOptionsServices = this.gridOptions;
        this.datatable.defaultColDefServices = this.defaultColDef;
      });
  }

  getSelection() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Sr No.",
        field: "srno",
        width: 140,
        pinned: "left"
      },
      {
        headerName: "LSA",
        field: "lsa",
        width: 200
      },
      {
        headerName: "User Name",
        field: "username",
        width: 100,
      },
      {
        headerName: "Call Plan Number",
        field: "callPlanNo",
        width: 120,
      },
      {
        headerName: "Call Plan Description",
        field: "callPlanDescription",
        width: 260,
      },
      {
        headerName: "Published Min DL Speed(Kpbs)",
        field: "publishedMinDLSpeed",
        width: 140,
      },
      {
        headerName: "From Eff. Date (DD-MM-YY)",
        field: "fromEffectiveDate",
        width: 140,
      },
      {
        headerName: "From Eff. Date (DD-MM-YY)",
        field: "toEffectiveDate",
        width: 150,
        pinned: "right"
      }
    ];
    this.datatable.columnDefsServices = this.columnDefs;
  }

  public eventsSubject: Subject<any> = new Subject();
  onFilterChanged(evt) {
    this.gridFilterValueServices["filter"] = evt.target.value;
    this.eventsSubject.next(this.gridFilterValueServices);
  };

  show: boolean;
  toggleSearch() {
    this.show = !this.show;
  };

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  //END table search//////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(4);
  }

  get PaginationPageSize(): number {
    return this.paginationPageSize;
  }

  get gridAPI(): GridApi {
    return this.gridApi;
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize.value));
  }

  openFileUpload() {
    let showExample = false;
    let showFileDownload = false;
    let showCSVText = true;
    const dialogData = new fileUploadPopupModel("Upload Call Plan(s)", showExample, showFileDownload, showCSVText);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'uploadClicked') {
      
      }
    })
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }

}

