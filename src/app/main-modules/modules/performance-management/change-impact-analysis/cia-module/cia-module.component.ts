import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { fileUploadPopupModel, FileUploadPopupComponent } from 'src/app/core/components/commanPopup/file-upload-popup/file-upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { dropdown, R4GState, JC } from './cia-module-dropdown';
import { ReplaySubject, Subject } from 'rxjs';
@Component({
  selector: 'app-cia-module',
  templateUrl: './cia-module.component.html',
  styleUrls: ['./cia-module.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CiaModuleComponent implements OnInit {
  selectedRadio = "Custom";
  showSuccessFailure: boolean = false;
  selectJcCircleLevelFormControl: FormGroup;
  protected _onDestroy = new Subject<void>();
  // R4G Circle Dropdown 
  @ViewChild('cityControlSelect') cityControlSelect: MatSelect;
  protected circleData = R4GState;
  public r4gCircleControl: FormControl = new FormControl();
  public r4gFilterControl: FormControl = new FormControl();
  public r4gFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // R4G Circle Dropdown 

  // Select JC Dropdown 
  @ViewChild('selectJcControlSelect') selectJcControlSelect: MatSelect;
  protected jcData = JC;
  public selectJcControl: FormControl = new FormControl();
  public selectJcFilterControl: FormControl = new FormControl();
  public selectJcFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  // Select JC Dropdown 

  public radioTypeList: any[] = [
    { 'name': 'Custom' },
    { 'name': 'JC Circle Level' }
  ];
  constructor(public dialog: MatDialog,private _formBuilder: FormBuilder) { }
  openFileUploadPopup(): void {
    const title = `Upload Nodes`;
    var showExample = true;
    const dialogData = new fileUploadPopupModel(title, showExample);
    const dialogRef = this.dialog.open(FileUploadPopupComponent, {
      width: '700px',
      height: '290px',
      data: dialogData,
      panelClass: 'file-upload-dialog'
    });
    dialogRef.afterClosed().subscribe(data=>{
      if(data == 'uploadClicked'){
        this.showSuccessFailure = true;
      }
  })
  }
  ngOnInit(): void {
    this.selectJcCircleLevelFormControl = this._formBuilder.group({
    });
     // R4G Circle Dropdown 
     this.r4gCircleControl.setValue(this.circleData[1]);
     this.r4gFilter.next(this.circleData.slice());
     this.r4gFilterControl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterData(
           this.circleData,
           this.r4gFilterControl,
           this.r4gFilter
         );
       });
     // R4G Circle Dropdown 

     // Select JC Dropdown 
     this.selectJcControl.setValue(this.jcData[1]);
     this.selectJcFilter.next(this.jcData.slice());
     this.selectJcFilterControl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterData(
           this.jcData,
           this.selectJcFilterControl,
           this.selectJcFilter
         );
       });
     // Select JC Dropdown 
  }
  protected filterData(listData, filterCtrl, filterSubject) {
    if (!listData) {
      return;
    }

    let search = filterCtrl.value;
    if (!search) {
      filterSubject.next(
        listData.slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }

    filterSubject.next(
      listData.filter(
        data => data.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

}
