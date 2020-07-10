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

  constructor() { }

  changeMessage(messages: Object) {
    this.messageSource.next(messages);
  }

  chechboxChangeMessage(checkBox: Object) {
    this.checkBoxSource.next(checkBox);

  }
}
