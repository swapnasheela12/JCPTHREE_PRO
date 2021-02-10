import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharePopupComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  shareWith: string[] = ['Karan.Dubey@ril.com'];
  allFruits: string[] = ['Arun.Nair@ril.com', 'Abhishek12.Jain@ril.com', 'Vikram7.Singh@ril.com', 'Sandeep.Rawat@ril.com'];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  
  constructor(public dialogRef: MatDialogRef<SharePopupComponent>,) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.shareWith.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.shareWith.indexOf(fruit);

    if (index >= 0) {
      this.shareWith.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.shareWith.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  shareList = [
    { name: 'Karan.Dubey@ril.com' },
    { name: 'Haresh.Ambaliya@ril.comG2' },
    { name: 'Niraj1.Verma@ril.com' },
    { name: 'Arun.Nair@ril.com' },
    { name: 'Karan.Dubey@ril.com' },
    { name: 'Haresh.Ambaliya@ril.comG2' },
    { name: 'Niraj1.Verma@ril.com' },
    { name: 'Arun.Nair@ril.com' },
  ];
  ngOnInit(): void {
  }
  deleteRow(d){
    const index = this.shareList.indexOf(d);
    this.shareList.splice(index, 1);
}
  closeDialog(): void {
    this.dialogRef.close(true);
  }
}

export class SharePopupDialogModel {
  constructor() {
  }
}
