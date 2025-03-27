import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from "@angular/common/http";
import { GridOptions, GridCore } from "@ag-grid-community/all-modules";
import { MatDialog } from '@angular/material/dialog';
import { DropdownComponent } from '../renderer/wostatus/dropdown.component';
import { TextfieldComponent } from '../renderer/wostatus/textfield.component';
import { SubmitWorkordedPopupComponent } from '../submit-workorded-popup.component';
import { Router } from '@angular/router';
import { DeleteRendererComponent } from 'src/app/core/components/ag-grid-renders/delete-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonDialogModel, CommonPopupComponent } from 'src/app/core/components/commonPopup/common-popup/common-popup.component';
import { Subscribable, Subscription } from 'rxjs';

interface sitep {
  value: string;
  viewValue: string;
}
interface taskclosures {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ian-lead',
  templateUrl: './ian-lead.component.html',
  styleUrls: ['./ian-lead.component.scss']
})
export class IanLeadComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  public gridApi;
  public gridColumnApi;
  public gridCore: GridCore;
  public gridOptions: GridOptions;
  public gridOptionsImpl: GridOptions;
  public gridOptionsSite: GridOptions;
  public columnDefswo;
  public rowDatawo;
  public rowExecutionTask;
  public spdetailsColumndata;
  public spdetailsRowdata;
  public frameworkComponentsos;
  impParameterDetailsColumndata;
  public imppdetailsRowdata;
  public imppdetailsColumndata;
  public implnRowdata;
  public physicalParameterColumndata;
  public physicalParameterrowdata;
  public pspRowdata: any;
  public destroySubscription: Subscription = new Subscription();

  constructor(
    public flexlayout: FlexLayoutModule, private http: HttpClient, private router: Router, public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{};
    this.gridOptionsImpl = <GridOptions>{};
    this.gridOptionsImpl = <GridOptions>{};
  }

  ngOnInit(): void {
    this.gridOptions = <GridOptions>{};
    this.createColumndata();
    this.createRowdata();
    this.createspdetailsColumndata();
    this.createspdetailsRowdata();
    this.createimppdetailsColumndata();
    this.createImplRowdata();

  }
  private createColumndata() {
    this.columnDefswo = [
      {
        headerName: "Date",
        field: "date",
        width: 200
      }, {
        headerName: "Reason for Reassignmenet",
        field: "reasonforreassignment",
        width: 400
      }, {
        headerName: "Remarks",
        field: "remarks",
        width: 400
      }
    ]
  }

  private createRowdata() {
    this.http.get("assets/data/layers/workorders/execution-task.json")
      .subscribe(data => {
        console.log(data);
        this.rowExecutionTask = data;
      });
  }

  private createspdetailsColumndata() {
    this.spdetailsColumndata = [
      {
        headerName: "Site Parameter",
        field: "siteparameter",
        width: 300
      },
      {
        headerName: "Current Value",
        field: "currentvalue",
        width: 300
      }
    ]


  }
  private createspdetailsRowdata() {
    this.http.get("assets/data/layers/workorders/site-parameter-data.json")
      .subscribe(data => {
        console.log(data);
        this.spdetailsRowdata = data;
      });
  }

  siteps: sitep[] = [
    { value: 'p-0', viewValue: 'E-Tilt(deg)' },
    { value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)' },
    { value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)' }
  ];

  sitepos: sitep[] = [
    { value: 'p-0', viewValue: 'E-Tilt(deg)' },
    { value: 'p-1', viewValue: 'Tx-Atenuation-Port1(db)' },
    { value: 'p-2', viewValue: 'Tx-Atenuation-Port2(db)' },
    { value: 'p-3', viewValue: 'Tx-Atenuation-Port2(db)' }
  ];

  uploadedImg = [];
  showFileUploadwidget: boolean = false;
  taskClosureRemarks = ["DataMismatch", "Site Access Issue", "Space Constraints", "Material Required", "Required based on cluuter", "Implementation done"]
  onReadyModeUpdate(params) {
    this.calculateRowCount();
  }

  public onReady(params) {
    this.gridApi = params.api;
    this.calculateRowCount();
  }
  public calculateRowCount() {
    if (this.gridOptions.api && this.gridOptionsImpl.api && this.gridOptionsSite.api) {
      setTimeout(() => {
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptionsImpl.api.sizeColumnsToFit();
        this.gridOptionsSite.api.sizeColumnsToFit();
      }, 1000);
    }
  }

  private createimppdetailsColumndata() {
    this.impParameterDetailsColumndata = [
      {
        headerName: "Site Paraameter*",
        field: "siteparameter",
        width: 400,
        cellRendererFramework: DropdownComponent
      },
      {
        headerName: "New Value*",
        field: "newvalue",
        width: 400,
        cellRendererFramework: TextfieldComponent
      },
      {
        headerName: "",
        field: "",
        width: 300,
        cellRendererFramework: DeleteRendererComponent
      }
    ]


  }


  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  // }
  // onAddRowimpl()
  //    {
  //      this.agGrid.api.addItems([{ siteparameter: '', newvalue: '', delete: '' }]);

  //    }


  private createImplRowdata() {
    this.http.get("assets/data/layers/workorders/impl-details.json")
      .subscribe(data => {
        console.log(data);
        this.implnRowdata = data;
      });
  }

  taskclosures: taskclosures[] = [
    { value: '0', viewValue: 'Antenna Pole Mount Uptilt corrected' },
    { value: '1', viewValue: 'Site Access Issues' },
    { value: '2', viewValue: 'Space Constraint' },
    { value: '3', viewValue: 'Material Required' },
    { value: '4', viewValue: 'Implementation Done' }
  ];

  // gotoPrevview(details) {

  //   this.route.navigate(['/Overshooting-Cell/WO-Overshooting-Cell'], { relativeTo: this.route });
  // }
  openSuccessPopup() {
    const dialogRef = this.dialog.open(SubmitWorkordedPopupComponent, {
      width: '700px',
      height: '290px',
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      //console.log(data);
    });
  }
  goBack() {
    this.router.navigate(['/JCP/Work-Orders/Rf-Oc-Workorders/Category-Wise-Workorder-Listing/Overshooting-Cell/WO-Overshooting-Cell'])
  }



  defaultColDef = { resizable: true };
  searchGrid = '';
  onFilterChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
    this.gridOptionsImpl.api.setQuickFilter(value);
    this.gridOptionsSite.api.setQuickFilter(value);
  };
  show: any;

  toggleSearch() {
    this.show = !this.show;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onAddRowimpl() {
    this.agGrid.api.addItems([{ siteparameter: '', newvalue: '', delete: '' }]);

  }









  fileName;
  uploadFile(file) {
    this.fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    let obj;
    if (file) {
      //this.uploadedImg = [];
      this.showFileUploadwidget = true;
      let url = `../../../../../../../assets/images/logo/${this.fileName}`
      obj = {
        src: url
      }
      this.uploadedImg.push(obj);
    }
  }



  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.files = file;
      //this.files.push({ data: file });
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.files);
  }


  openUpdateDialog(): void {
    const message = `Are you sure you want to submit the workorder ??`;
    const image = 'warning';
    const snackbarMode = 'success';
    const snackbarText = 'Workorder submitted Successfully.';
    const dialogData = new CommonDialogModel("Warning!", message, image, snackbarMode, snackbarText);
    const dialogRef = this.dialog.open(CommonPopupComponent, {
      data: dialogData
    });
  }

  ngOnDestroy() {
    this.destroySubscription.unsubscribe();
  }
}

