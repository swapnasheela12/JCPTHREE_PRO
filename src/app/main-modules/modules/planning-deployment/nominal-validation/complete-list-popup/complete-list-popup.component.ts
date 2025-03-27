import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSelectionList } from '@angular/material/list';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-complete-list-popup',
  templateUrl: './complete-list-popup.component.html',
  styleUrls: ['./complete-list-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompleteListPopupComponent implements OnInit {
  search = new FormControl();
  completedListControl = new FormControl();
  searchInList;
  selectedOptions=[];
  selectedOption: any;
  @ViewChild('completeProjectList') completeProjectListSelectionList: MatSelectionList;
  
  constructor(
    private dialogRef: MatDialogRef<CompleteListPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataShare: DataSharingService
  ) {
    this.searchInList = this.search.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      switchMap((res: string) => {
        if (!res) return of(this.data['list']);
        res = res.toLowerCase();
        return of(
          this.data['list'].filter(x => x.toLowerCase().indexOf(res) >= 0)
        );
      })
    );
    console.log( this.searchInList);
  }

  ngOnInit(): void {
    // console.log(this.data['list'][0].sapId);
    console.log( this.searchInList);
  }
 
  onSelectionChange() {
  }

  getSelected() {
    return this.completeProjectListSelectionList.selectedOptions.selected.map(s => s.value);
  }

  getUnselected() {
    const differ = [];
    const selected = this.getSelected();
    for(let i = 0; i < this.data['list'].length; i ++) {
      if (selected.indexOf(this.data['list'][i]) === -1) {
        differ.push(this.data['list'][i])
      }
    }
    return differ;
  }
  addToSourceProject() {
    this.dialogRef.close();
    let selectedList = this.getSelected();
    this.dataShare.addProjectList(selectedList);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
