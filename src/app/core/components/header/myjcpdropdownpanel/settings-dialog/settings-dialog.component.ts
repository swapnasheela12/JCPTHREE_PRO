import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmPopupComponent } from '../../../commonPopup/confirm-popup/confirm-popup.component';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { stateList, STATELISTS } from './constants/state-list.constant';
import { jiocenterlist, JIOCENTERLISTS } from './constants/jiocenter-list.contant';
import { panIndiaList, PANINDIALISTS } from './constants/panindia-list.constant';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  showGeography: string;

  @ViewChild('panIndiaSelect') panIndiaSelect: MatSelect;
  protected panIndialistData: panIndiaList[] = PANINDIALISTS;
  public panIndiaCtrl: FormControl = new FormControl();
  public panIndiaFilterCtrl: FormControl = new FormControl();
  public panIndiaFilter: ReplaySubject<panIndiaList[]> = new ReplaySubject<panIndiaList[]>(1);

  @ViewChild('jioStateSelect') jioStateSelect: MatSelect;
  protected jioStateListData: stateList[] = STATELISTS;
  public jioStateCtrl: FormControl = new FormControl();
  public jioStateFilterCtrl: FormControl = new FormControl();
  public jioStateFilter: ReplaySubject<stateList[]> = new ReplaySubject<stateList[]>(1);

  @ViewChild('jioCenterSelect') jioCenterSelect: MatSelect;
  protected jioCenterListData: jiocenterlist[] = JIOCENTERLISTS;
  public jioCenterCtrl: FormControl = new FormControl();
  public jioCenterFilterCtrl: FormControl = new FormControl();
  public jioCenterFilter: ReplaySubject<jiocenterlist[]> = new ReplaySubject<jiocenterlist[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    public dialog: MatDialog
  ) {
    this.dialogRef.updateSize('300vw','400vw')
  }

  ngOnInit() {
    this.showGeography = 'PAN India';
    this.panIndiaCtrl.setValue(this.panIndialistData[1]);
    this.panIndiaFilter.next(this.panIndialistData.slice());
    this.panIndiaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.panIndialistData,
          this.panIndiaFilterCtrl,
          this.panIndiaFilter
        );
    });

    this.jioStateCtrl.setValue(this.jioStateListData[1]);
    this.jioStateFilter.next(this.jioStateListData.slice());
    this.jioStateFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jioStateListData,
          this.jioStateFilterCtrl,
          this.jioStateFilter
        );
    });

    this.jioCenterCtrl.setValue(this.jioCenterListData[1]);
    this.jioCenterFilter.next(this.jioCenterListData.slice());
    this.jioCenterFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData(
          this.jioCenterListData,
          this.jioCenterFilterCtrl,
          this.jioCenterFilter
        );
      })
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

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    if (typeof(this.panIndiaSelect) !== 'undefined') {
        this.panIndiaFilter
          .pipe(take(1), takeUntil(this._onDestroy))
          .subscribe(() => {
            this.panIndiaSelect.compareWith = 
            (pan1: panIndiaList, pan2: panIndiaList) => pan1 && pan2 && pan1.name === pan2.name;
        });
    }

    if (typeof(this.jioStateSelect) !== 'undefined') {
      this.jioStateFilter
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.jioStateSelect.compareWith = 
          (s1: stateList, s2: stateList) => s1 && s2 && s1.name === s2.name;
      });
    }

    if (typeof(this.jioCenterSelect) !== 'undefined') {
      this.jioCenterFilter
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.jioCenterSelect.compareWith = 
          (jc1: jiocenterlist, jc2: jiocenterlist) => jc1 && jc2 && jc1.name === jc2.name;
      });
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onApplySettings(): void {
    const message = `My JCP will be reverted to the default Layout`;
    const dialogData = new ConfirmDialogModel("Revert to Default?", message);
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      maxWidth: "500px",
      data: dialogData,
      width:'350px'
    });
    this.dialogRef.close(true);
  }

  changeComboo(event) {
  }
}