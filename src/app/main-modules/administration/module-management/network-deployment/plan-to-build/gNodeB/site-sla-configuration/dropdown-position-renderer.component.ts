import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { dropdown } from 'src/app/core/components/common-elements/type-dropdown-modulelist';

@Component({
    selector: 'app-drp-position-renderer',
    template: `
                <mat-form-field *ngIf="params.value != ''" class="form-field-container">
                  <mat-select [formControl]="nodeMultiCtrl" disableOptionCentering [multiple]="true"
                    ngDefaultControl  #nodeMultiCtrlSelect style="width: 90%">
                    <mat-option>
                      <ngx-mat-select-search  [formControl]="nodeMultiFilterCtrl" placeholderLabel="Select Node"
                        noEntriesFoundLabel="no matching found" ngDefaultControl>
                      </ngx-mat-select-search>
                    </mat-option>
                    <mat-option *ngFor="let item of drpValue" [value]="item.value">
                      {{item.value}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
`
})

export class DropdownPositionRendererComponent implements ICellRendererAngularComp {
    params: any;
    ngModelLable: string;
    selectedColor: string;
    searchDropdownValue;
    drpValue = [];
    public nodeMultiCtrl: FormControl = new FormControl();
    public nodeMultiFilterCtrl: FormControl = new FormControl();
    @ViewChild('nodeMultiCtrlSelect') nodeMultiCtrlSelect: MatSelect;
    public nodeMultiFilter: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
    protected _onDestroy = new Subject<void>();

    openedChange(evt) {
        this.searchDropdownValue = '';
    }

    agInit(params): void {
        this.drpValue = [
            { value: 'State RE Head' },
            { value: 'State RE Head 1' },
            { value: 'State RE Head 2' },
            { value: 'State RE Head 3' }
        ];
        this.nodeMultiCtrl.setValue([this.drpValue[0].value]);
        this.nodeMultiFilter.next(this.drpValue.slice());
        this.nodeMultiFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterData(
                    this.drpValue,
                    this.nodeMultiFilterCtrl,
                    this.nodeMultiFilter
                );
            });
        this.params = params;
        this.ngModelLable = params.value || null;
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

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        if (this.params.onClick instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            }
            this.params.onClick(params);

        }
    }

    // colors = ['#ffff00', '#ff3300', '#0000ff'
    // ];

    onChange(value) {
        this.selectedColor = value;
    }
}