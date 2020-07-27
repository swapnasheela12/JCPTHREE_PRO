import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  private checkBoxSource = new BehaviorSubject({});
  checkboxMessage = this.checkBoxSource.asObservable();

  private leftGridOptionsSource = new BehaviorSubject({});
  leftGridMessage = this.leftGridOptionsSource.asObservable();

  private fifteenMinsKpiGridOptionsSource = new BehaviorSubject({});
  fifteenMinsKpiGridMessage = this.fifteenMinsKpiGridOptionsSource.asObservable();

  private rightGridOptionsSource = new BehaviorSubject({});
  rightGridMessage = this.rightGridOptionsSource.asObservable();
  constructor() { }

  changeMessage(messages: Object) {
    this.messageSource.next(messages);
  }

  chechboxChangeMessage(checkBox: Object) {
    this.checkBoxSource.next(checkBox);

  }
  leftGridOptionMessage(leftgridOption: Object, rightgridOption: Object) {
    this.leftGridOptionsSource.next(leftgridOption);
    this.rightGridOptionsSource.next(rightgridOption);
  }
  
  fifteenMinsKpiOptionMessage(fifteenMinsKpiGridOptions: Object, rightgridOption: Object) {
    this.fifteenMinsKpiGridOptionsSource.next(fifteenMinsKpiGridOptions);
    this.rightGridOptionsSource.next(rightgridOption);
  }

  rightGridOptionMessage(gridOption: Object) {
    this.rightGridOptionsSource.next(gridOption);
  }
}
