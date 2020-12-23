import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";






import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
//import { dropdown, R4GState, JC } from './cia-module-dropdown';
import { ReplaySubject, Subject } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
//import { DeleteRendererComponent } from './renderer/delete-renderer.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
//import { CustomHeaderComponent } from './renderer/custom-header.component';







interface Domain {
  value: string;
  viewValue: string;
}



interface Technology {
  value: string;
  viewValue: string;
}


interface Vendor {
  value: string;
  viewValue: string;
}


interface Software {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-alarm',
  templateUrl: './add-alarm.component.html',
  styleUrls: ['./add-alarm.component.scss']
})




export class AddAlarmComponent implements OnInit {
   //default value
  //bulkupload: boolean;
 selectedRadio = "Bulk Upload";
  showSuccessFailure: boolean = false;
  showSuccessKpiFailure: Boolean = false;
  selectJcCircleLevelFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();
  //manual: boolean;
   BulkUpload: boolean;
   Manual: boolean;
  showBulk: boolean = true;
  // R4G Circle Dropdown 




  // Select JC Dropdown 
  trackByRadioButtonType(index: number, type: any): string {
    return type.name;
  }
  trackByChipsPost(index: number, postValue: any): string {
    return postValue;
  }
  trackByChipsPre(index: number, preValue: any): string {
    return preValue;
  }
  trackByRadioButtonFrequency(index: number, frequency: any): string {
    return frequency;
  }
  public radioTypeList: any[] = [
    { 'name': 'Bulk Upload' },
    { 'name': 'Manual' }
  ];
  frequencySelected = "Per Day";
  public frequencyData: any[] = [
    'Per Day',
    'BBH',
    'NBH',
    'Hourly'
  ]; selectedValue: string = "RAN";
  type: any;
  show: boolean = true;
 switchthedivs(ev){ 
   if (ev.value == 'Bulk Upload') {
     this.showBulk = true
   } else {
     this.showBulk = false
   }
   console.log(ev)
 }
  options: any;

  domains: Domain[] = [
    { value: 'RAN', viewValue: 'RAN' },
    { value: 'IP-1', viewValue: 'IP-1' },

  ];


  techSelectedValue: string = "5G"
  techs: Technology[] = [
    { value: '5G', viewValue: '5G' },


  ];
  vendor: string = "JIO";
  vendors: Vendor[] = [
    { value: 'JIO', viewValue: 'JIO' },
    { value: 'IP-3', viewValue: 'IP-3' }

  ];
  softwareversion: any = "7.0.0.0";
  softwares: Software[] = [
    { value: '7.0.0.0', viewValue: '7.0.0.0' },
    { value: 'IP-4', viewValue: 'IP-4' },

  ];
  constructor(public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public datashare: DataSharingService) { }

  ngOnInit(): void {

  }


  toggleShow() {
    this.show === !this.show;
  }
  showUpload() {


    this.show === !this.show;
  }

  manualUpload() {
    !this.show === this.show;
  }

  openFileUploadPopup(): void {
    const title = `Upload Files`;
    var showExample = true;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'uploadClicked') {
        this.showSuccessFailure = true;
      }
    })
  }


  option1 = true;
  option2 = false;

  changediv(divswitch) {
    //console.log(this.$event);
    if (divswitch === "BulkUpload") {
      this.BulkUpload = true;
      this.Manual = false;
    }
    else if (divswitch === "Manual") {
      this.BulkUpload = false;
      this.Manual = true;
    }

  }

  radioButtonChanged($event) {
    // if you need the event source and value it can be accessed.
    console.log(this.selectedRadio);
    // if ($event.value == this.BulkUpload) {
    //   this.BulkUpload = true;
    //   this.Manual = false;
    // } else if($event.value == this.Manual) {
    //   this.Manual = true;
    //  this.BulkUpload = false;
    // }
  
   }


  
}
