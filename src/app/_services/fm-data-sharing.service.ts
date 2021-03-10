import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FmDataSharingService {
  private messageSourceTitle = new BehaviorSubject({});
  currentMessageTitle = this.messageSourceTitle.asObservable();
  constructor() { }
  changeMessageTitle(messages: Object) {
    this.messageSourceTitle.next(messages);
  }
}
