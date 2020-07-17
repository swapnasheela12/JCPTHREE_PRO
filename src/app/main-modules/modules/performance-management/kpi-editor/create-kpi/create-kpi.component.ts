import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DOMAIN, NODE, dropdown } from './create-kpi-constant';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss'],
  encapsulation: ViewEncapsulation.None



  
})
export class CreateKpiComponent implements OnInit {
  selectNodeCtrl: FormGroup;
  counterKPICtrl: FormGroup;
  defineFormulaCtrl: FormGroup;
  protected _onDestroy = new Subject<void>();
  stepperLabelText = 'Select Node & Counter';

  @ViewChild('domainCtrlSelect') domainCtrlSelect: MatSelect;
  protected domainListData = DOMAIN;
  public domainCtrl: FormControl = new FormControl();
  public domainFilterCtrl: FormControl = new FormControl();
  public domainFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);

  @ViewChild('nodeMultiCtrlSelect') nodeMultiCtrlSelect: MatSelect;
  protected nodeMultiListData = NODE;
  public nodeMultiCtrl: FormControl = new FormControl();
  public nodeMultiFilterCtrl: FormControl = new FormControl();
  public nodeMultiFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.selectNodeCtrl = this._formBuilder.group({
      keyName: ['', Validators.required]
    });
    this.counterKPICtrl = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.defineFormulaCtrl = this._formBuilder.group({})
    
    this.domainCtrl.setValue(this.domainListData[1]);
    this.domainFilter.next(this.domainListData.slice());
    this.domainFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.domainListData,
          this.domainFilterCtrl,
          this.domainFilter
        );
    });

    this.nodeMultiCtrl.setValue(this.nodeMultiListData[1]);
    this.nodeMultiFilter.next(this.nodeMultiListData.slice());
    this.nodeMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.nodeMultiListData,
          this.nodeMultiFilterCtrl,
          this.nodeMultiFilter
        );
    });
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

    filterSubject.next (
      listData.filter (
        data => data.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  selectNodeStepper(event) {
    console.log(event)
    if (event.selectedIndex == 1) {
      this.stepperLabelText = 'Counter KPI/List '
    } else if (event.selectedIndex == 2) {
      this.stepperLabelText = 'Define Formula';
    } else {
      this.stepperLabelText = 'Select Node & Counter';
    }
  }


}
